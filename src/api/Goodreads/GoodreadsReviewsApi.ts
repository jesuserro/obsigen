import { App } from 'obsidian';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import { Book } from './Book';
import { GoodreadsApiBase } from './GoodreadsApiBase';

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
        const pubDate = this.getFormattedDate(review, ['publication_year', 'work > original_publication_year'], ['publication_month', 'work > original_publication_month'], ['publication_day', 'work > original_publication_day']);

        return {
            guid: review.querySelector('id')?.textContent?.match(/\d+/)?.[0] || null,
            isbn: review.querySelector('book > isbn')?.textContent,
            title: review.querySelector('book > title')?.textContent,
            authors: review.querySelector('author_name')?.textContent,
            rating: review.querySelector('user_rating')?.textContent,
            date: dateAdded || pubDate,
            tags: shelves,
            urls: review.querySelector('link')?.textContent,
            book_id: review.querySelector('book_id')?.textContent,
            cover: review.querySelector('image_url')?.textContent,
            description: content,
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

        new Book(this.app, review).createNote();
    }
}
