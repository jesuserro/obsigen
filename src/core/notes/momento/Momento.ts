import { App } from "obsidian";
import { renderToString } from "react-dom/server";
import { DATA_YAML_DEFAULT } from "./../../shared/interface/iYaml";
import { Yaml } from "./../../shared/templates/Yaml";
import { NoteGenerator } from "./../NoteGenerator";
import { Duration } from "./Duration";

export class Momento {
    app: App;
    noteGenerator: NoteGenerator;

    yaml: string;
    title: string;
    filePrefix: string;
    date: Date;
    dateEnd: Date | null;
    duration: Duration | null;
    subheader: string;
    content: string;
    fileName: string;
    callout: string;
    icon: string | null;
    description: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    seconds: number;
    locations: string;
    urls: string;
    type: string;
    path: string;
    tags: string;
    twitterRegexp: RegExp;
    youtubeRegexp: RegExp;

    constructor(date: Date, dateEnd: Date | null = null) {
        this.icon = "";

        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
        this.hour = date.getHours();
        this.minute = date.getMinutes();
        this.seconds = date.getSeconds();
        this.locations = "";
        this.urls = "";
        this.type = "";
        this.path = "/";
        this.tags = "";

        this.date = date;
        this.dateEnd = dateEnd;

        // Calcular la duración si se proporciona una fecha de fin
        this.duration = null;
        if (this.date && this.dateEnd) {
            const durationMinutes = Math.floor((this.dateEnd.getTime() - this.date.getTime()) / (1000 * 60)); // Duración en minutos
            this.duration = new Duration(durationMinutes); // Duración en días, horas y minutos
        }

        this.twitterRegexp = new RegExp(
            "https?://(?:mobile\\.)?(?:twitter\\.com|x\\.com)/.*"
        );
        this.youtubeRegexp = new RegExp(
            "https?://(?:www\\.)?(?:youtube\\.com/.*|youtu\\.be/.*|.*\\.youtube\\.com/.*shorts)"
        );
    }

    getCurrentTime() {
        const now = this.date;
        const hour = now.getHours().toString().padStart(2, "0");
        const minute = now.getMinutes().toString().padStart(2, "0");
        return `${hour}${minute}`;
    }

    getCurrentDate() {
        const now = this.date;
        const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Mes con dos dígitos
        const day = now.getDate().toString().padStart(2, "0"); // Día con dos dígitos
        return `${month}${day}`;
    }

    getFullDate() {
        const now = this.date;
        const year = now.getFullYear().toString().padStart(4, "0");
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");
        return `${year}${month}${day}`;
    }

    getCurrentAniversary() {
        const now = this.date;
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");
        return `${month}${day}`;
    }

    getDayOfWeek() {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return days[this.date.getDay()];
    }

    setYaml() {
        const link = `"[[${this.getCurrentDate()}]]"`; // Comillas dobles añadidas
        const anniversary = `"[[${this.getCurrentAniversary()}]]"`; // Comillas dobles añadidas
        const fullDateLink = `"[[${this.getFullDate()}]]"`; // Comillas dobles añadidas para el enlace completo YYYYMMDD
        const dayOfWeek = this.getDayOfWeek();

        const data = {
            ...DATA_YAML_DEFAULT,
            title: this.title,
            date: this.convertDateToIsoString(this.date),
            dateEnd: this.dateEnd ? this.convertDateToIsoString(this.dateEnd) : "",
            duration: this.duration ? this.duration.toString() : "",
            dayOfWeek: dayOfWeek,
            links: Array.from(new Set([...DATA_YAML_DEFAULT.links, link, anniversary, fullDateLink])), // Evitar duplicados en los enlaces
            locations: this.getListForYamlProperty(this.locations, true),
            urls: this.getListForYamlProperty(this.urls),
            tags: [...DATA_YAML_DEFAULT.tags, this.tags],
        };

        data.cssclasses = [];
        if (this.icon) {
            data.cssclasses.push(this.icon);
        }
        this.yaml = this.renderYaml(data);
    }

    renderYaml(data: any) {
        let yaml = renderToString(Yaml({ data }));
        yaml = yaml.replace(/&quot;/g, '"');
        yaml = yaml.replace(/&amp;/g, "&");
        yaml = yaml.replace(/&lt;/g, '<'); // Reemplazamos entidades HTML con los caracteres reales
        yaml = yaml.replace(/&gt;/g, '>');
        yaml = yaml.replace(/&#x27;/g, "'"); // Reemplazamos entidades HTML con los caracteres reales
        yaml = yaml.replace(/&apos;/g, "'");
        yaml = yaml.replace(/&nbsp;/g, " ");
        yaml = yaml.replace(/<!-- -->/g, "");
        return yaml;
    }

    convertDateToIsoString(date: Date) {
        // Manejo del año: si es AC, se representa como negativo en ISO 8601
        const year = (date.getFullYear() < 0 ? `-${Math.abs(date.getFullYear()).toString().padStart(4, "0")}` : date.getFullYear().toString().padStart(4, "0"));
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    async createNote(
        type: string,
        app: App,
        title: string,
        content: string,
        icon?: string,
        description?: string,
        locations?: string,
        urls: string = "",
        tags: string = ""
    ) {
        this.app = app;
        this.noteGenerator = new NoteGenerator(this.app);

        this.title = this.getTitle(title);

        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.day = this.date.getDate();

        this.icon = icon || null;
        this.description = description || "";
        this.locations = locations || "";
        this.urls = this.cleanUrls(urls) || "";
        this.tags = tags || "";
        this.setYaml();
        this.fileName = this.getFilename(this.title);
        this.setContent(content);

        this.path = this.getPath(type);

        await this.noteGenerator.createNote(
            this.fileName,
            this.content,
            this.path
        );
    }

    getPath(type: string) {
        // Asegura que el año tenga 4 dígitos y usa "_" para años AC
        const paddedYear = (this.year < 0 ? `_${Math.abs(this.year).toString().padStart(4, "0")}` : this.year.toString().padStart(4, "0"));
        const pathFechaMomento = `100 Calendar/${paddedYear}/${this.month
            .toString()
            .padStart(2, "0")}/${this.day.toString().padStart(2, "0")}`;
        if (type == "Moment") {
            return pathFechaMomento;
        } else if (type == "Capture") {
            return `000 Inbox/Captures`;
        } else if (type == "Content Map") {
            return `200 Content Maps`;
        } else if (type == "Person") {
            return pathFechaMomento;
        }
        return "/";
    }

    private cleanUrls(urls: string) {
        return urls
            .split(",")
            .map((url) => this.cleanUrl(url))
            .join(",");
    }

    setContent(content: string): void {
        const mediaContent = this.getMediaContent();
        const dataviewBlock = this.generateDataviewBlock();
        this.content = `${this.yaml}\n${dataviewBlock}\n# ${this.title}\n${mediaContent}\n${content}\n\n`;
    }

    generateDataviewBlock(): string {
        return `
\`\`\`dataviewjs
const eventDate = dv.date(dv.current().date);
const now = dv.date(DateTime.now());
const diff = now.diff(eventDate, ['years', 'months', 'days', 'hours', 'minutes']);

function calculateTimePassed(diff) {
    const units = [
        { label: 'años', value: diff.years },
        { label: 'meses', value: diff.months },
        { label: 'días', value: diff.days },
        { label: 'horas', value: diff.hours },
        { label: 'minutos', value: Math.round(diff.minutes) }
    ];

    return units
        .filter(({ value }) => value > 0)
        .map(({ value, label }) => \`\${value} \${label}\`)
        .join(' y ');
}

dv.table(["Tiempo transcurrido"], [
    [calculateTimePassed(diff)]
]);
\`\`\`
    `;
    }

    private getListForYamlProperty(
        yamlPropertyText: string,
        isQuoted: boolean = false
    ): string {
        if (!yamlPropertyText) return "";

        const yamlUrls = yamlPropertyText
            .split(",")
            .map((url: string) => {
                const formattedUrl = isQuoted
                    ? `"${this.filterParamsFromUrl(url.trim())}"`
                    : this.filterParamsFromUrl(url.trim());
                return `- ${formattedUrl}`;
            })
            .join("\n");

        return `\n${yamlUrls}`;
    }

    private getMediaContent() {
        if (this.urls === "") return "";
        return this.urls
            .split(",")
            .map((url) => this.getUrlForContent(url.trim()))
            .join("\n");
    }

    getTitle(title: string) {
        title = title.charAt(0).toUpperCase() + title.slice(1);
        return `${title}`;
    }

    getFilename(title: string) {
        return `${this.getFilePrefix()} ${title}`;
    }

    getFilePrefix() {
        // Asegura que el año tenga 4 dígitos y usa "_" para años BC
        const paddedYear = (this.year < 0 ? `_${Math.abs(this.year).toString().padStart(4, "0")}` : this.year.toString().padStart(4, "0"));
        // Concatena el año con la fecha completa (mes y día)
        return `${paddedYear}${this.getCurrentDate()}${this.getCurrentTime()}`;
    }

    getContent() {
        return ``;
    }

    getUrlForContent(url: string) {
        if (this.twitterRegexp.test(url) || this.youtubeRegexp.test(url)) {
            if (this.youtubeRegexp.test(url)) {
                return `![${this.title}](${url})`;
            }
        }

        return "";
    }

    cleanUrl(url: string) {
        url = this.filterParamsFromUrl(url);

        if (this.twitterRegexp.test(url) || this.youtubeRegexp.test(url)) {
            if (this.youtubeRegexp.test(url)) {
                url = url.replace(/(\?|&)si=[^&]*$/, "");
                url = url.replace(/\/(?:shorts|live)\//, "/embed/");
            }
        }
        return url.trim();
    }

    filterParamsFromUrl(url: string): string {
        url = url.replace(/"/g, "");
        const urlParts = url.split("?");
        if (urlParts.length === 2) {
            const queryParams = urlParts[1].split("&");
            const numericTParamFound = queryParams.some((param) => {
                const [name, value] = param.split("=");
                return name === "t" && !isNaN(Number(value));
            });
            if (numericTParamFound) return url;
        }
        if (this.twitterRegexp.test(url)) {
            return urlParts[0];
        }
        return url;
    }
}
