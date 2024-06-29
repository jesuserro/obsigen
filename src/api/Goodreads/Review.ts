import { App } from 'obsidian';
import { renderToString } from 'react-dom/server';
import { NoteGenerator } from 'src/core/notes/NoteGenerator';
import { DATA_YAML_REVIEW_DEFAULT, Review as ReviewInterface } from 'src/core/shared/interface/iYaml';
import { Yaml } from 'src/core/shared/templates/Yaml';
import { GoodreadsApiBase } from './GoodreadsApiBase';

export class Review extends GoodreadsApiBase {
    private noteGenerator: NoteGenerator;
    private goodreadsBookId: string;
    private yaml: string;
    private fileName: string;
    private content: string = '';
    private date: Date = new Date();

    // Propiedades de la review
    private review_id: string;
    private book_id: string;
    private title: string;
    private authors: string[];
    private isbn: string;
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

    constructor(app: App, review: ReviewInterface) {
        super(app);
        this.noteGenerator = new NoteGenerator(this.app);
        this.initializeData(review);
        this.setYaml();
        this.fileName = this.getFilename(this.title);
        this.setContent(review.description);
    }

    private initializeData(review: ReviewInterface) {
        this.review_id = review.review_id;
        this.book_id = review.book_id;
        this.title = this.formatTitle(review.title);
        this.authors = review.authors;
        this.isbn = review.isbn;
        this.description = review.description;
        this.date = new Date(review.date);
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.day = this.date.getDate();
        this.rating = review.rating * 2;
        this.cover = review.cover;
        this.locations = review.locations || '';
        this.urls = this.cleanUrls(review.urls, this.twitterRegexp, this.youtubeRegexp) || '';
        this.tags = review.tags || [];
    }

    private setYaml() {
        const link = `"[[${this.getCurrentDate()}]]"`;
        const title = this.title.replace(/[*"\\\/<>:|?¿,.;#]/g, '');
        const cover = `"![${title}](${this.cover})"`;
        const data = {
            ...DATA_YAML_REVIEW_DEFAULT,
            title: title,
            aliases: [],
            authors: this.authors,
            isbn: this.isbn,
            date: this.convertDateToIsoString(this.date),
            creation: new Date(),
            updated: new Date(),
            links: [...DATA_YAML_REVIEW_DEFAULT.links, link],
            locations: this.getListForYamlProperty(this.locations, true),
            urls: this.getListForYamlProperty(this.urls),
            tags: [...DATA_YAML_REVIEW_DEFAULT.tags, ...this.tags],
            cover: cover,
            cssclasses: [...DATA_YAML_REVIEW_DEFAULT.cssclasses, 'review'],
            review_id: this.review_id,
            book_id: this.book_id,
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
        return `${this.getFilePrefix()} ${title}`;
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
