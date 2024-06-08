import { App } from 'obsidian';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import { Book } from './Book';
import { GoodreadsBase } from './GoodreadsBase';

export class GoodreadsReviews extends GoodreadsBase {
    private static readonly GOODREADS_RSS_REVIEWS_URL_V2 = 'review/list/$authorId.xml?key=$apikey&v=2';

    constructor(app: App) {
        super(app);
    }

    private async fetchBooksByShelf2(): Promise<string | null> {
        const { goodreads_user, goodreads_apikey }: MyPluginSettings = (this.app as any).setting.pluginTabs.find((tab: any) => tab.id === 'obsigen')?.plugin?.settings ?? {};
        let url = `${GoodreadsBase.GOODREADS_URL_BASE}/${GoodreadsReviews.GOODREADS_RSS_REVIEWS_URL_V2}`;
        const urlWithParams = url.replace('$authorId', goodreads_user).replace('$apikey', goodreads_apikey);

        return this.fetchXmlString(urlWithParams);
    }

    private parseBooksFromReviews(xmlString: string): any[] {
        const xmlDoc = this.parser.parseFromString(xmlString, 'text/xml');
        const items = xmlDoc.querySelectorAll('review');
        return Array.from(items).map(item => this.parseBookFromReviewItem(item));
    }

    private parseBookFromReviewItem(review: Element): any {
        const shelvesElement = review.querySelector(':scope > shelves');
        const shelves = shelvesElement 
            ? Array.from(shelvesElement.querySelectorAll('shelf')).map(shelf => `Goodreads/Reviews/${shelf.getAttribute('name')?.trim() ?? ''}`) : [];
        let content = review.querySelector(':scope > book > description')?.textContent ?? '';
        content = this.turndownService.turndown(content);

        let date_added = review.querySelector(':scope > date_added')?.textContent;
        if (date_added) {
            date_added = new Date(date_added).toISOString().split('T')[0];
        }
        const pubDate = this.getBookDate(review);
        let date = date_added || pubDate;
        if (date) {
            date = new Date(date).toISOString().split('T')[0];
        }

        return {
            guid: review.querySelector(':scope > id')?.textContent?.match(/\d+/)?.[0] || null,
            isbn: review.querySelector(':scope > book > isbn')?.textContent,
            title: review.querySelector(':scope > book > title')?.textContent,
            authors: review.querySelector('author_name')?.textContent,
            rating: review.querySelector('user_rating')?.textContent,
            date: date,
            date_pub: pubDate,
            date_added: date_added,
            tags: shelves,
            urls: review.querySelector('link')?.textContent,
            book_id: review.querySelector('book_id')?.textContent,
            cover: review.querySelector('image_url')?.textContent,
            description: content,
        };
    }

    private getBookDate(item: Element): string {
        const year = this.getTextContent(item, ['publication_year', 'work > original_publication_year'], '');
        const month = parseInt(this.getTextContent(item, ['publication_month', 'work > original_publication_month'], ''), 10);
        const day = parseInt(this.getTextContent(item, ['publication_day', 'work > original_publication_day'], ''), 10);

        const paddedMonth = month.toString().padStart(2, '0');
        const paddedDay = day.toString().padStart(2, '0');
        const defaultYear = year || new Date().getFullYear().toString();

        return `${defaultYear}-${paddedMonth}-${paddedDay}`;
    }

    private getTextContent(item: Element, selectors: string[], defaultValue: string): string {
        return selectors
            .map(selector => item.querySelector(selector)?.textContent?.trim())
            .find(textContent => textContent) || defaultValue;
    }

    public async getLastBookFromToReadShelf() {
        const xmlString = await this.fetchBooksByShelf2();
        if (!xmlString) return;

        const reviews = this.parseBooksFromReviews(xmlString);
        console.log(`Número total de revisiones: ${reviews.length}`);

        const review = reviews[0];
        console.log(review);

        if (!review) {
            console.error(`No se encontró ninguna revisión en la estantería 'to-read'`);
            return;
        }

        new Book(this.app, review).createNote();
    }
}
