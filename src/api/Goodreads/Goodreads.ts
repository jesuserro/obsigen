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

    constructor(app: App) {
        this.app = app;
        this.turndownService = new TurndownService();
        this.parser = new DOMParser();
    }

    public async getFeedReviewsByShelf(shelf: string): Promise<string | null> {
        const { goodreads_user, goodreads_apikey }: MyPluginSettings = (this.app as any).setting.pluginTabs.find((tab: any) => tab.id === 'obsigen')?.plugin?.settings ?? {};

        const url = `${Goodreads.GOODREADS_URL_BASE}/${Goodreads.GOODREADS_RSS_REVIEWS_URL}/${goodreads_user}?key=${goodreads_apikey}&shelf=${shelf}`;

        try {
            const response = await requestUrl(url);
            // console.log(response.text);
            return response.text;

        } catch (error) {
            console.error(`Error de red al obtener la información de reviews: ${error}`);
            return null;
        }
    }

    public async parseReviews(xmlString: string): Promise<any[]> {
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

        const guidMatch = item.querySelector('guid')?.textContent?.match(/\d+/);
        const guid = guidMatch ? guidMatch[0] : null;

        let content = item.querySelector('user_review')?.textContent ?? '';
        content = this.turndownService.turndown(content);

        return {
            guid: guid,
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

    public async getRandomReview() {
        const xmlString = await this.getFeedReviewsByShelf('read');
        if (!xmlString) return;

        const reviews = await this.parseReviews(xmlString);
        console.log(`Número total de revisiones: ${reviews.length}`);

        const randomIndex = Math.floor(Math.random() * reviews.length);
        const randomReview = reviews[randomIndex];
        console.log(randomReview);

        const date = new Date(randomReview.date);

        new Review(date).createNote(this.app, randomReview);

        console.log('Detalles de la revisión seleccionada al azar:');
        Object.entries(randomReview).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    }

    public async getReviewByGuid(guid: string) {
        const xmlString = await this.getFeedReviewsByShelf('read');
        if (!xmlString) return;

        const reviews = await this.parseReviews(xmlString);
        const review = reviews.find(review => review.guid === guid);

        if (!review) {
            console.error(`No se encontró ninguna revisión con el GUID: ${guid}`);
            return;
        }

        const date = new Date(review.date);

        new Review(date).createNote(this.app, review);

        console.log('Detalles de la revisión seleccionada por GUID:');
        Object.entries(review).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    }

    public async getReviewByIsbn(isbn: string) {
        const xmlString = await this.getFeedReviewsByShelf('read');
        if (!xmlString) return;

        const reviews = await this.parseReviews(xmlString);
        const review = reviews.find(review => review.isbn === isbn);

        if (!review) {
            console.error(`No se encontró ninguna revisión con el ISBN: ${isbn}`);
            return;
        }

        const date = new Date(review.date);

        new Review(date).createNote(this.app, review);

        console.log('Detalles de la revisión seleccionada por ISBN:');
        Object.entries(review).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    }
}
