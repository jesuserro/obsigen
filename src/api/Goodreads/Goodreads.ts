import { App, requestUrl } from 'obsidian';
import { Review } from 'src/api/Goodreads/Review';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import TurndownService from 'turndown';

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
        this.showReview(review);
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
        this.showReview(review);
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
        this.showReview(review);
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

    private async showReview(review: any) {
        new Review(this.app, review).createNote();
        // console.log('Detalles de la revisión seleccionada:');
        Object.entries(review).forEach(([key, value]) => {
            // console.log(`${key}: ${value}`);
        });
    }
}
