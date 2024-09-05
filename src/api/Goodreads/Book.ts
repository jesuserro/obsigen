import { App } from 'obsidian';
import { renderToString } from 'react-dom/server';
import { NoteGenerator } from 'src/core/notes/NoteGenerator';
import { Book as BookInterface, DATA_YAML_BOOK_DEFAULT } from 'src/core/shared/interface/iYaml';
import { Yaml } from 'src/core/shared/templates/Yaml';
import { Duration } from './../../core/notes/momento/Duration';
import { GoodreadsApiBase } from './GoodreadsApiBase';

export class Book extends GoodreadsApiBase {
    private noteGenerator: NoteGenerator;
    private goodreadsBookId: string;
    private yaml: string;
    private fileName: string;
    private content: string = '';
    private date: Date = new Date();
    private dateEnd: Date = new Date();
    private duration: Duration | null;

    // Propiedades del libro
    private title: string;
    private authors: string[];
    private isbn: string;
    private isbn13: string;
    private asin: string;
    private cover: string;
    private rating: number;
    private year: number;
    private month: number;
    private day: number;
    private locations: string;
    private urls: string;
    private tags: string[];
    private num_pages: number;
    private average_rating: number;
    private ratings_count: number;
    private text_reviews_count: number;
    private country_code: string;
    private description: string;

    private twitterRegexp: RegExp = new RegExp('https?://(?:mobile\\.)?twitter\\.com/.*');
    private youtubeRegexp: RegExp = new RegExp('https?://(?:www\\.)?(?:youtube\\.com/.*|youtu\\.be/.*|.*\\.youtube\\.com/.*shorts)');

    constructor(app: App, book: BookInterface) {
        super(app);
        this.noteGenerator = new NoteGenerator(this.app);
        this.goodreadsBookId = book.goodreads_book_id;
        this.initializeData(book);
        this.setYaml();
        this.fileName = this.getFilename(this.title);
        this.setContent(book.description);
    }

    private initializeData(book: BookInterface) {
        this.title = this.formatTitle(book.title);
        this.authors = book.authors;
        this.isbn = book.isbn;
        this.isbn13 = book.isbn13;
        this.asin = book.asin;
        this.description = book.description;
        this.date = new Date(book.date);
        this.dateEnd = new Date(book.dateEnd);
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.day = this.date.getDate();
        this.rating = book.rating * 2;
        this.cover = book.cover;
        this.locations = book.locations || '';
        this.urls = this.cleanUrls(book.urls, this.twitterRegexp, this.youtubeRegexp) || '';
        this.tags = book.tags || [];
        this.num_pages = book.num_pages || 0;
        this.average_rating = book.average_rating || 0;
        this.ratings_count = book.ratings_count || 0;
        this.text_reviews_count = book.text_reviews_count || 0;
        this.country_code = book.country_code || '';

        this.duration = null;
        if (this.date && this.dateEnd) {
            const durationMinutes = Math.floor((this.dateEnd.getTime() - this.date.getTime()) / (1000 * 60)); // Duración en minutos
            this.duration = new Duration(durationMinutes); // Duración en días, horas y minutos
        } 
    }

    private setYaml() {
        const link = `"[[${this.getCurrentDate()}]]"`;
        const title = this.title.replace(/[*"\\\/<>:|?¿,.;#]/g, '');
        const cover = `"![${title}](${this.cover})"`;
        const data = {
            ...DATA_YAML_BOOK_DEFAULT,
            title: title,
            aliases: [],
            authors: this.authors,
            goodreads_book_id: this.goodreadsBookId,
            isbn: this.isbn,
            isbn13: this.isbn13,
            asin: this.asin,
            date: this.convertDateToIsoString(this.date),
            dateEnd: this.dateEnd ? this.convertDateToIsoString(this.dateEnd) : "",
            duration: this.duration,
            links: [...DATA_YAML_BOOK_DEFAULT.links, link],
            locations: this.getListForYamlProperty(this.locations, true),
            urls: this.getListForYamlProperty(this.urls),
            tags: [...DATA_YAML_BOOK_DEFAULT.tags, ...this.tags],
            cover: cover,
            cssclasses: [...DATA_YAML_BOOK_DEFAULT.cssclasses, 'book'],
            rating: this.rating,
            num_pages: this.num_pages,
            average_rating: this.average_rating,
            ratings_count: this.ratings_count,
            text_reviews_count: this.text_reviews_count,
            country_code: this.country_code
        };

        let yaml = renderToString(Yaml({ data }));
        yaml = yaml.replace(/&quot;/g, '"');
        yaml = yaml.replace(/&amp;/g, '&');
        this.yaml = yaml.replace(/<!-- -->/g, '');
    }

    private setContent(description: string) {
        this.content = `${this.yaml}\n# ${this.title}\n\n${description}\n`;

        if (this.cover) {
            this.content = `${this.yaml}\n# ${this.title}\n\n![](${this.cover})\n\n${description}\n\n`;
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
