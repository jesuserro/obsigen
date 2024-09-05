import { App } from 'obsidian';
import { renderToString } from 'react-dom/server';
import { NoteGenerator } from 'src/core/notes/NoteGenerator';
import { Author as AuthorInterface, DATA_YAML_AUTHOR_DEFAULT } from 'src/core/shared/interface/iYaml';
import { Yaml } from 'src/core/shared/templates/Yaml';
import { Duration } from './../../core/notes/momento/Duration';
import { GoodreadsApiBase } from './GoodreadsApiBase';

export class Author extends GoodreadsApiBase {
    private noteGenerator: NoteGenerator;
    private goodreadsBookId: string;
    private yaml: string;
    private fileName: string;
    private content: string = '';
    private date: Date = new Date();
    private dateEnd: Date = new Date();
    private duration: Duration | null;;
    private born_at: Date = new Date();
    private died_at: Date = new Date();

    // Author properties
    private goodreads_author_id: string;
    private title: string;
    private name: string;
    private authors: string[];
    private cover: string;
    private rating: number;
    private year: number;
    private month: number;
    private day: number;
    private locations: string;
    private urls: string;
    private tags: string[];
    private hometown: string;
    private works_count: number;
    private fans_count : number;
    private country_code: string;
    private about: string;
    private image: string;
    private influences: string[];

    private twitterRegexp: RegExp = new RegExp('https?://(?:mobile\\.)?twitter\\.com/.*');
    private youtubeRegexp: RegExp = new RegExp('https?://(?:www\\.)?(?:youtube\\.com/.*|youtu\\.be/.*|.*\\.youtube\\.com/.*shorts)');

    constructor(app: App, author: AuthorInterface) {
        super(app);
        this.noteGenerator = new NoteGenerator(this.app);
        this.initializeData(author);
        this.setYaml();
        this.fileName = this.getFilename(this.title);
        this.setContent(author.about);
    }

    private initializeData(author: AuthorInterface) {
        this.goodreads_author_id = author.goodreads_author_id;
        this.title = this.formatTitle(author.name);
        this.name = this.formatTitle(author.name);
        this.authors = author.authors;
        this.about = author.about;
        this.date = new Date(author.date);
        this.dateEnd = new Date(author.dateEnd);
        this.born_at = new Date(author.born_at);
        this.died_at = new Date(author.died_at);
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.day = this.date.getDate();
        this.image = author.image;
        this.rating = author.rating * 2 || 0;
        this.cover = author.image;
        this.locations = author.locations || '';

        this.duration = null;
        if (this.date && this.dateEnd) {
            const durationMinutes = Math.floor((this.dateEnd.getTime() - this.date.getTime()) / (1000 * 60)); // Duración en minutos
            this.duration = new Duration(durationMinutes); // Duración en días, horas y minutos
        } 
    
        // Extract only hrefs from influences with hyphens
        this.influences = author.influences || [];
        this.urls = this.cleanUrls(author.urls, this.twitterRegexp, this.youtubeRegexp) || '';
        this.urls += '\n' + this.influences.map((influence) => {
        const urlMatch = influence.match(/\[(.*?)\]\((.*?)\)/); // Updated regex
        return urlMatch ? `- ${urlMatch[2]}` : ''; // Add hyphen before href
        }).filter(Boolean).join('\n'); // Filter out empty strings
    
        this.tags = author.tags || [];
        this.tags.push('people/authors');

        this.hometown = author.hometown || '';
        this.works_count = author.works_count || 0;
        this.fans_count = author.fans_count || 0;
        this.country_code = author.country_code || '';
      }

    private setYaml() {
        const link = `"[[${this.getCurrentDate()}]]"`;
        const title = this.title.replace(/[*"\\\/<>:|?¿,.;#]/g, '');
        const cover = `"![${title}](${this.cover})"`;

        // If died_at is not a valid date, we don't want to show it in the YAML
        if (isNaN(this.died_at.getTime())) {
            this.died_at = new Date();
        }
        
        const data = {
            ...DATA_YAML_AUTHOR_DEFAULT,
            title: title,
            name: title,
            aliases: [],
            goodreads_author_id: this.goodreads_author_id,
            authors: this.authors,
            date: this.convertDateToIsoString(this.date),
            dateEnd: this.convertDateToIsoString(this.dateEnd),
            duration: this.duration,
            born_at: this.convertDateToIsoString(this.born_at),
            died_at: this.convertDateToIsoString(this.died_at),
            links: [...DATA_YAML_AUTHOR_DEFAULT.links, link],
            locations: this.getListForYamlProperty(this.locations, true),
            urls: this.getListForYamlProperty(this.urls),
            tags: [...DATA_YAML_AUTHOR_DEFAULT.tags, ...this.tags],
            cover: cover,
            cssclasses: [...DATA_YAML_AUTHOR_DEFAULT.cssclasses, 'person'],
            rating: this.rating,
            works_count: this.works_count,
            fans_count : this.fans_count ,
            hometown: this.hometown,

            // Add the influences in a list format getting onñy the names of the authors
            influences: this.influences.map((influence: string) => {
                const urlMatch = influence.match(/\[(.*?)\]\((.*?)\)/);
                return urlMatch ? urlMatch[1] : '';
            }),

            // influences: this.getListForYamlProperty(this.influences.join(','), true),
              
        };

        let yaml = renderToString(Yaml({ data }));
        yaml = yaml.replace(/&quot;/g, '"');
        yaml = yaml.replace(/&amp;/g, '&');
        this.yaml = yaml.replace(/<!-- -->/g, '');
    }

    private setContent(description: string) {
        this.content = `${this.yaml}\n# ${this.title}\n\n${description}\n`;

        if (this.cover) {
            this.content = `${this.yaml}\n# ${this.title}\n\n![](${this.cover})\n\n${description}\n`;
        }

        if (this.influences.length > 0) {
            this.content += `\n\n## Influences\n\n${this.influences.map((influence: string) => `- ${influence}`).join('\n')}`;
        }
    }

    async createNote() {
        const path = this.getPath();
        await this.noteGenerator.createNote(this.fileName, this.content, path);
    }

    private getListForYamlProperty(yamlPropertyText: string, isQuoted: boolean = false): string {
        if (!yamlPropertyText) return "";

        const yamlUrls = yamlPropertyText
            .split(',')
            .map((url: string) => {
                const formattedUrl = isQuoted ? `"${this.filterParamsFromUrl(url.trim())}"` : this.filterParamsFromUrl(url.trim());
                return `- ${formattedUrl}`;
            })
            .join('\n');

        return `\n${yamlUrls}`;
    }

    private formatTitle(title: string) {
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    private getFilename(title: string) {
        title = title.replace(/[*"\\\/<>:|?¿,.;#]/g, '');
        return `${title}`;
    }

    private getFilePrefix() {
        return `${this.getCurrentDate()}${this.getCurrentTime()}`;
    }

    private getCurrentTime() {
        const hour = this.date.getHours().toString().padStart(2, '0');
        const minute = this.date.getMinutes().toString().padStart(2, '0');
        return `${hour}${minute}`;
    }

    private getCurrentDate() {
        const year = this.date.getFullYear().toString();
        const month = (this.date.getMonth() + 1).toString().padStart(2, '0');
        const day = this.date.getDate().toString().padStart(2, '0');
        return `${year}${month}${day}`;
    }

    private getPath() {
        return `100 Calendar/${this.year}/${this.month.toString().padStart(2, '0')}/${this.day.toString().padStart(2, '0')}`;
    }
}
