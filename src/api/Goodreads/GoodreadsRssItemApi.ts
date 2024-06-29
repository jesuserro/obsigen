import { App } from 'obsidian';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import { GoodreadsApiBase } from './GoodreadsApiBase';

export class GoodreadsRssItemApi extends GoodreadsApiBase {
    
    private static readonly REVIEWS_RSS = 'review/list_rss/$userId?key=$apikey&shelf=$shelf';

    constructor(app: App) {
        super(app);
    }

    private async fetchShelfRss(shelf: string): Promise<string | null> {
        const { goodreads_user, goodreads_apikey }: MyPluginSettings = this.getGoodreadsSettings();
        const url = `${GoodreadsApiBase.BASE_URL}/${GoodreadsRssItemApi.REVIEWS_RSS}`
            .replace('$userId', goodreads_user)
            .replace('$apikey', goodreads_apikey)
            .replace('$shelf', shelf);

        return this.fetchXml(url);
    }

    private parseReviewElement(element: Element, selector: string): string | null {
        return element.querySelector(selector)?.textContent ?? null;
    }

    private parseItem(review: Element): any {
        const description = this.turndownService.turndown(this.parseReviewElement(review, ':scope > book_description') ?? '');
        const dateAdded = this.parseReviewElement(review, ':scope > user_date_added');

        return {
            review_id: this.parseReviewElement(review, ':scope > guid'),
            book_id: this.parseReviewElement(review, ':scope > book_id'),
            author_id: this.parseReviewElement(review, ':scope > book > authors > author > id'),
            isbn: this.parseReviewElement(review, ':scope > isbn'),
            title: this.parseReviewElement(review, ':scope > title'),
            authors: this.parseReviewElement(review, ':scope > author_name'),
            rating: this.parseReviewElement(review, ':scope > average_rating'),
            date: dateAdded,
            date_added: dateAdded,
            date_updated: this.parseReviewElement(review, ':scope > date_updated'),
            tags: this.getShelves(review, 'My-Tags'),
            urls: this.parseReviewElement(review, ':scope > link'),
            cover: this.parseReviewElement(review, ':scope > book_large_image_url'),
            description: description,
            votes: this.parseReviewElement(review, ':scope > votes'),
            read_count: this.parseReviewElement(review, 'read_count'),
            comments_count: this.parseReviewElement(review, 'comments_count'),
        };
    }

    private parseItems(xmlString: string): any[] {
        const xmlDoc = this.parser.parseFromString(xmlString, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');
        return Array.from(items).map(item => this.parseItem(item));
    }

    public async getShelfList(shelf: string) {
        const xmlString = await this.fetchShelfRss(shelf);
        if (!xmlString) return;

        const reviews = this.parseItems(xmlString);
        // reviews.forEach(review => {
        //     console.log(`Review: ${JSON.stringify(review)}`);
        //     // new Review(this.app, review).createNote();
        // });
        // Take the first review and create a note
        //new Review(this.app, reviews[0]).createNote();

        console.log(`Num reviews: ${reviews.length} for shelf: ${shelf}`);
        console.log(`Review: ${JSON.stringify(reviews[0])}`);

    }
}
