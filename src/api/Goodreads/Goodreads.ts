import { App, requestUrl } from 'obsidian';
import { Review } from 'src/api/Goodreads/Review';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import TurndownService from 'turndown';
import { Book } from './Book';

export class Goodreads {
    private app: App;
    private turndownService: TurndownService;
    private parser: DOMParser;
    private static readonly GOODREADS_URL_BASE = 'https://www.goodreads.com';
    private static readonly GOODREADS_RSS_REVIEWS_URL = 'review/list_rss';
    private static readonly GOODREADS_RSS_BOOK_URL = "book/show?format=xml&key=$apikey&id=$bookId";
    private static readonly GOODREADS_RSS_AUTHOR_URL = "author/show.xml?key=$apikey&id=$authorId";

    constructor(app: App) {
        this.app = app;
        this.turndownService = new TurndownService();
        this.parser = new DOMParser();
    }

    public async getFeedReviewsByShelf(shelf: string): Promise<string | null> {
        const xmlString = await this.fetchReviewsXmlString(shelf);
        return xmlString;
    }

    public async getRandomReview() {
        const xmlString = await this.getFeedReviewsByShelf('read');
        if (!xmlString) return;

        const reviews = await this.parseReviews(xmlString);
        console.log(`Número total de revisiones: ${reviews.length}`);
        const randomIndex = Math.floor(Math.random() * reviews.length);
        const review = reviews[randomIndex];
        new Review(this.app, review).createNote();
    }

    public async getReviewByGuid(guid: string) {
        const xmlString = await this.getFeedReviewsByShelf('read');
        if (!xmlString) return;

        const reviews = await this.parseReviews(xmlString);
        console.log(`Número total de revisiones: ${reviews.length}`);
        const review = reviews.find(review => review.guid === guid);
        if (!review) {
            console.error(`No se encontró ninguna revisión con el GUID: ${guid}`);
            return;
        }
        // new Review(this.app, review).createNote();

        // BOOK INFORMATION
        // 1. Show book information in the console for debugging purposes
        const bookXmlString = await this.fetchBookXmlString(review.book_id);
        if (!bookXmlString) return;

        // 2. Parse book item and show it in the console for debugging purposes
        const bookItem = this.parser.parseFromString(bookXmlString, 'text/xml').querySelector('book') as Element;
        console.log(bookItem);
        // Parse bookItem Element into a Book object
        const book = new Book(this.app, this.parseBookItem(bookItem));
        // console.log(book);

        new Book(this.app, book).createNote();
    }

    public async getReviewByIsbn(isbn: string) {
        const xmlString = await this.getFeedReviewsByShelf('read');
        if (!xmlString) return;

        const reviews = await this.parseReviews(xmlString);
        console.log(`Número total de revisiones: ${reviews.length}`);
        const review = reviews.find(review => review.isbn === isbn);
        if (!review) {
            console.error(`No se encontró ninguna revisión con el ISBN: ${isbn}`);
            return;
        }
        new Review(this.app, review).createNote();
    }

    private async fetchReviewsXmlString(shelf: string): Promise<string | null> {
        const { goodreads_user, goodreads_apikey }: MyPluginSettings = (this.app as any).setting.pluginTabs.find((tab: any) => tab.id === 'obsigen')?.plugin?.settings ?? {};
        const url = `${Goodreads.GOODREADS_URL_BASE}/${Goodreads.GOODREADS_RSS_REVIEWS_URL}/${goodreads_user}?key=${goodreads_apikey}&shelf=${shelf}`;

        try {
            const response = await requestUrl(url);
            return response.text;
        } catch (error) {
            console.error(`Error de red al obtener la información de reviews: ${error}`);
            return null;
        }
    }

    private async fetchBookXmlString(bookId: string): Promise<string | null> {
        const { goodreads_apikey }: MyPluginSettings = (this.app as any).setting.pluginTabs.find((tab: any) => tab.id === 'obsigen')?.plugin?.settings ?? {};
        const url = `${Goodreads.GOODREADS_URL_BASE}/${Goodreads.GOODREADS_RSS_BOOK_URL.replace('$apikey', goodreads_apikey).replace('$bookId', bookId)}`;

        try {
            const response = await requestUrl(url);
            return response.text;
        } catch (error) {
            console.error(`Error de red al obtener la información del libro: ${error}`);
            return null;
        }
    }

    private async fetchAuthorXmlString(authorId: string): Promise<string | null> {
        const { goodreads_apikey }: MyPluginSettings = (this.app as any).setting.pluginTabs.find((tab: any) => tab.id === 'obsigen')?.plugin?.settings ?? {};
        const url = `${Goodreads.GOODREADS_URL_BASE}/${Goodreads.GOODREADS_RSS_AUTHOR_URL.replace('$apikey', goodreads_apikey).replace('$authorId', authorId)}`;

        try {
            const response = await requestUrl(url);
            return response.text;
        } catch (error) {
            console.error(`Error de red al obtener la información del autor: ${error}`);
            return null;
        }
    }

    private async parseReviews(xmlString: string): Promise<any[]> {
        try {
            const xmlDoc = this.parser.parseFromString(xmlString, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');
            const reviews = Array.from(items).map(item => this.parseReviewItem(item));
            return reviews;
        } catch (error) {
            console.error(`Error al parsear el XML: ${error}`);
            return [];
        }
    }

    private parseReviewItem(item: Element): any {
        const shelvesElement = item.querySelector('user_shelves');
        const shelves = shelvesElement ? shelvesElement.textContent?.split(',').map(shelf => shelf.trim()) : [];

        let content = item.querySelector('user_review')?.textContent ?? '';
        content = this.turndownService.turndown(content);

        return {
            guid: item.querySelector('guid')?.textContent?.match(/\d+/)?.[0] || null,
            isbn: item.querySelector('isbn')?.textContent,
            title: item.querySelector('title')?.textContent,
            authors: item.querySelector('author_name')?.textContent,
            rating: item.querySelector('user_rating')?.textContent,
            date: item.querySelector('user_read_at')?.textContent,
            tags: shelves,
            urls: item.querySelector('link')?.textContent,
            book_id: item.querySelector('book_id')?.textContent,
            cover: item.querySelector('book_large_image_url')?.textContent,
            content: content
        };
    }

    private parseBookItem(item: Element): any {
        const shelvesElement = item.querySelector('popular_shelves');
        const shelves = shelvesElement ? shelvesElement.textContent?.split(',').map(shelf => shelf.trim()) : [];

        let description = item.querySelector('description')?.textContent ?? '';
        description = this.turndownService.turndown(description);

        const year = item.querySelector('publication_year')?.textContent || '2024';
        let month = item.querySelector('publication_month')?.textContent || '01';
        // pad month with 0
        if (month.length === 1) month = `0${month}`;
        let day = item.querySelector('publication_day')?.textContent || '01';
        // pad day with 0
        if (day.length === 1) day = `0${day}`;

        return {
            id: item.querySelector('id')?.textContent?.match(/\d+/)?.[0] || null,
            isbn: item.querySelector('isbn')?.textContent,
            isbn13: item.querySelector('isbn13')?.textContent,
            asin: item.querySelector('asin')?.textContent,
            kindle_asin: item.querySelector('kindle_asin')?.textContent,
            title: item.querySelector('title')?.textContent,
            authors: item.querySelector('author_name')?.textContent,
            rating: item.querySelector('user_rating')?.textContent,
            date: this.getBookDate(year, month, day),
            tags: shelves,
            urls: item.querySelector('link')?.textContent,
            book_id: item.querySelector('book_id')?.textContent,
            cover: item.querySelector('image_url')?.textContent,
            description: description,
            num_pages: item.querySelector('num_pages')?.textContent,
            average_rating: item.querySelector('average_rating')?.textContent,
            ratings_count: item.querySelector('ratings_count')?.textContent,
            country_code: item.querySelector('country_code')?.textContent,
        };
    }

    // Create new fn getBookDate(year, month, day) to get the date of the book
    private getBookDate(year: string | null, month: string | null, day: string | null): string {
        if (!year) return '';
        if (!month) return year;
        if (!day) return `${year}-${month}`;
        return `${year}-${month}-${day}`;
    }
}
