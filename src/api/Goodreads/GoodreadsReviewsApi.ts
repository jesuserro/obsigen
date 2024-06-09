import { App } from 'obsidian';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import { GoodreadsApiBase } from './GoodreadsApiBase';
import { Review } from './Review';

export class GoodreadsReviewsApi extends GoodreadsApiBase {
    private static readonly REVIEWS_URL_TEMPLATE = 'review/list/$authorId.xml?key=$apikey&v=2';

    constructor(app: App) {
        super(app);
    }

    private async fetchToReadShelfBooks(): Promise<string | null> {
        const { goodreads_user, goodreads_apikey }: MyPluginSettings = this.getGoodreadsSettings();
        const url = `${GoodreadsApiBase.BASE_URL}/${GoodreadsReviewsApi.REVIEWS_URL_TEMPLATE}`
            .replace('$authorId', goodreads_user)
            .replace('$apikey', goodreads_apikey);

        return this.fetchXml(url);
    }

    private getGoodreadsSettings(): MyPluginSettings {
        return (this.app as any).setting.pluginTabs.find((tab: any) => tab.id === 'obsigen')?.plugin?.settings ?? {};
    }

    private parseReviews(xmlString: string): any[] {
        const xmlDoc = this.parser.parseFromString(xmlString, 'text/xml');
        const items = xmlDoc.querySelectorAll('review');
        return Array.from(items).map(item => this.parseReview(item));
    }

    private parseReview(review: Element): any {
        const shelves = this.getShelves(review);
        const content = this.turndownService.turndown(review.querySelector('book > description')?.textContent ?? '');
        const dateAdded = this.formatDate(review.querySelector('date_added')?.textContent ?? '');
        const dateUpdated = this.formatDate(review.querySelector('date_updated')?.textContent ?? '');

        return {
            guid: review.querySelector('id')?.textContent?.match(/\d+/)?.[0] || null,
            isbn: review.querySelector('book > isbn')?.textContent,
            title: review.querySelector('book > title')?.textContent,
            authors: review.querySelector(':scope > book > authors > author > name')?.textContent,
            rating: review.querySelector('rating')?.textContent,
            date: dateAdded,
            date_updated: dateUpdated,
            tags: shelves,
            urls: review.querySelector('link')?.textContent,
            book_id: review.querySelector('book_id')?.textContent,
            cover: review.querySelector('image_url')?.textContent,
            description: content,
            votes: review.querySelector('votes')?.textContent,
            read_count: review.querySelector('read_count')?.textContent,
            comments_count: review.querySelector('comments_count')?.textContent,
        };
    }

    private getShelves(review: Element): string[] {
        const shelvesElement = review.querySelector('shelves');
        return shelvesElement ? Array.from(shelvesElement.querySelectorAll('shelf')).map(shelf => `Goodreads/Reviews/${shelf.getAttribute('name')?.trim() ?? ''}`) : [];
    }

    public async getLastBookFromToReadShelf() {
        const xmlString = await this.fetchToReadShelfBooks();
        if (!xmlString) return;

        const reviews = this.parseReviews(xmlString);
        console.log(`Total reviews: ${reviews.length}`);

        const review = reviews[0];
        if (!review) {
            console.error(`No reviews found in 'to-read' shelf`);
            return;
        }

        new Review(this.app, review).createNote();
    }
}
