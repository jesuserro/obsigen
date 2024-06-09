import { App } from 'obsidian';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import { Author } from './Author';
import { GoodreadsApiBase } from './GoodreadsApiBase';
import { GoodreadsAuthorApi } from './GoodreadsAuthorApi';
import { GoodreadsBookApi } from './GoodreadsBookApi';

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

    private parseReviews(xmlString: string): any[] {
        const xmlDoc = this.parser.parseFromString(xmlString, 'text/xml');
        const items = xmlDoc.querySelectorAll('review');
        return Array.from(items).map(item => this.parseReview(item));
    }

    private parseReview(review: Element): any {
        const description = this.turndownService.turndown(review.querySelector(':scope > book > description')?.textContent ?? '');
        let dateAdded = this.formatDate(review.querySelector('date_added')?.textContent ?? '');
        dateAdded = new Date(dateAdded).toISOString().split('T')[0];
        const dateUpdated = this.formatDate(review.querySelector('date_updated')?.textContent ?? '');

        return {
            review_id: review.querySelector('id')?.textContent?.match(/\d+/)?.[0],
            book_id: review.querySelector(':scope > book > id')?.textContent,
            author_id: review.querySelector(':scope > book > authors > author > id')?.textContent,
            isbn: review.querySelector(':scope > book > isbn')?.textContent,
            title: review.querySelector(':scope > book > title')?.textContent,
            authors: review.querySelector(':scope > book > authors > author > name')?.textContent,
            rating: review.querySelector('rating')?.textContent,
            date: dateAdded,
            date_added: dateAdded,
            date_updated: dateUpdated,
            tags: this.getShelves(review),
            urls: review.querySelector('link')?.textContent,
            cover: review.querySelector('image_url')?.textContent,
            description: description,
            votes: review.querySelector('votes')?.textContent,
            read_count: review.querySelector('read_count')?.textContent,
            comments_count: review.querySelector('comments_count')?.textContent,
        };
    }

    public async getLastBookFromToReadShelf() {
        const xmlString = await this.fetchToReadShelfBooks();
        if (!xmlString) return;

        const reviews = this.parseReviews(xmlString);
        const review = reviews[0];
        // new Review(this.app, review).createNote();

        if (!review) {
            console.error(`No reviews found in 'to-read' shelf`);
            return;
        }

        console.log(`Review: ${JSON.stringify(review)}`);

        const goodreadsBookApi = new GoodreadsBookApi(this.app);
        const book = await goodreadsBookApi.getBookById(review.book_id);

        console.log(`Book: ${JSON.stringify(book)}`);

        if (book) {
            // new Book(this.app, book).createNote();

            const goodreadsAuthorApi = new GoodreadsAuthorApi(this.app);
            for (const authorId of book.authors_id) {
                const author = await goodreadsAuthorApi.getAuthorById(authorId);
                if (author) {
                    // console.log(`Author: ${JSON.stringify(author)}`);
                    new Author(this.app, author).createNote();
                    // exit after first author
                    break;
                } else {
                    console.error(`Failed to fetch author details for author_id: ${authorId}`);
                }
            }

        } else {
            console.error(`Failed to fetch book details for book_id: ${review.book_id}`);
        }
    }
}
