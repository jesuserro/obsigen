import { App } from 'obsidian';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import { Book as BookInterface } from 'src/core/shared/interface/iYaml';
import { GoodreadsApiBase } from './GoodreadsApiBase';


export class GoodreadsBookApi extends GoodreadsApiBase {
    private static readonly BOOK_URL_TEMPLATE = 'book/show?format=xml&key=$apikey&id=$bookId';

    constructor(app: App) {
        super(app);
    }

    private async fetchBookById(bookId: string): Promise<string | null> {
        const { goodreads_apikey }: MyPluginSettings = this.getGoodreadsSettings();
        const url = `${GoodreadsApiBase.BASE_URL}/${GoodreadsBookApi.BOOK_URL_TEMPLATE}`
            .replace('$apikey', goodreads_apikey)
            .replace('$bookId', bookId);

        return this.fetchXml(url);
    }

    private parseBook(xmlString: string): BookInterface | null {
        const bookElement = this.parseXml(xmlString, 'book');
        if (!bookElement) return null;

        return {
            title: this.getTextContent(bookElement, ['title']),
            goodreads_book_id: this.getTextContent(bookElement, ['id']),
            isbn: this.getTextContent(bookElement, ['isbn']),
            isbn13: this.getTextContent(bookElement, ['isbn13']),
            asin: this.getTextContent(bookElement, ['asin']),
            date: new Date(this.getTextContent(bookElement, ['publication_year'], '1970')),
            creation: new Date(),
            updated: new Date(),
            links: [],
            urls: this.getTextContent(bookElement, ['link']),
            authors: this.getAuthors(bookElement),
            locations: '',
            tags: this.getTags(bookElement),
            publish: false,
            permalink: '',
            description: this.turndownService.turndown(this.getTextContent(bookElement, ['description'])),
            image: this.getTextContent(bookElement, ['image_url']),
            cover: this.getTextContent(bookElement, ['image_url']),
            num_pages: parseInt(this.getTextContent(bookElement, ['num_pages'], '0'), 10),
            average_rating: parseFloat(this.getTextContent(bookElement, ['average_rating'], '0')),
            ratings_count: parseInt(this.getTextContent(bookElement, ['ratings_count'], '0'), 10),
            text_reviews_count: parseInt(this.getTextContent(bookElement, ['text_reviews_count'], '0'), 10),
            country_code: this.getTextContent(bookElement, ['country_code']),
            cssclasses: [],
            rating: parseFloat(this.getTextContent(bookElement, ['rating'], '0')),
            emotion: 0,
            favorite: false
        };
    }

    private getAuthors(bookElement: Element): string[] {
        const authors: string[] = [];
        const authorElements = bookElement.querySelectorAll('authors author name');
        authorElements.forEach(author => {
            authors.push(author.textContent || '');
        });
        return authors;
    }

    private getTags(bookElement: Element): string[] {
        const tags: string[] = [];
        const tagElements = bookElement.querySelectorAll('popular_shelves shelf');
        tagElements.forEach(tag => {
            tags.push(tag.getAttribute('name') || '');
        });
        return tags;
    }

    public async getBookById(bookId: string): Promise<BookInterface | null> {
        const xmlString = await this.fetchBookById(bookId);
        if (!xmlString) return null;

        return this.parseBook(xmlString);
    }
}
