import { App } from 'obsidian';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import { Author } from './Author';
import { Book } from './Book';
import { GoodreadsApiBase } from './GoodreadsApiBase';
import { GoodreadsAuthorApi } from './GoodreadsAuthorApi';
import { GoodreadsBookApi } from './GoodreadsBookApi';
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

    private parseReviewElement(element: Element, selector: string): string | null {
        return element.querySelector(selector)?.textContent ?? null;
    }

    private parseReview(review: Element): any {
        const description = this.turndownService.turndown(this.parseReviewElement(review, ':scope > book > description') ?? '');
        let dateAdded = this.formatDate(this.parseReviewElement(review, 'date_added') ?? '');
        dateAdded = new Date(dateAdded).toISOString().split('T')[0];
        const dateUpdated = this.formatDate(this.parseReviewElement(review, 'date_updated') ?? '');

        return {
            review_id: this.parseReviewElement(review, 'id')?.match(/\d+/)?.[0],
            book_id: this.parseReviewElement(review, ':scope > book > id'),
            author_id: this.parseReviewElement(review, ':scope > book > authors > author > id'),
            isbn: this.parseReviewElement(review, ':scope > book > isbn'),
            title: this.parseReviewElement(review, ':scope > book > title'),
            authors: this.parseReviewElement(review, ':scope > book > authors > author > name'),
            rating: this.parseReviewElement(review, 'rating'),
            date: dateAdded,
            date_added: dateAdded,
            date_updated: dateUpdated,
            tags: this.getShelves(review, 'My-Tags'),
            urls: this.parseReviewElement(review, 'link'),
            cover: this.parseReviewElement(review, 'image_url'),
            description: description,
            votes: this.parseReviewElement(review, 'votes'),
            read_count: this.parseReviewElement(review, 'read_count'),
            comments_count: this.parseReviewElement(review, 'comments_count'),
        };
    }

    private parseReviews(xmlString: string): any[] {
        const xmlDoc = this.parser.parseFromString(xmlString, 'text/xml');
        const items = xmlDoc.querySelectorAll('review');
        return Array.from(items).map(item => this.parseReview(item));
    }

    private async fetchAndCreateReviewNotes(reviews: any[]) {
        if (reviews.length === 0) {
            console.error(`No reviews found in 'to-read' shelf`);
            return;
        }

        const review = reviews[0];
        console.log(`Review: ${JSON.stringify(review)}`);
        new Review(this.app, review).createNote();

        const goodreadsBookApi = new GoodreadsBookApi(this.app);
        const book = await goodreadsBookApi.getBookById(review.book_id);

        console.log(`Book: ${JSON.stringify(book)}`);
        if (!book) {
            console.error(`Failed to fetch book details for book_id: ${review.book_id}`);
            return;
        }
        new Book(this.app, book).createNote();

        const goodreadsAuthorApi = new GoodreadsAuthorApi(this.app);
        for (const authorId of book.authors_id) {
            const author = await goodreadsAuthorApi.getAuthorById(authorId);
            if (!author) {
                console.error(`Failed to fetch author details for author_id: ${authorId}`);
                continue;
            }
            console.log(`Author: ${JSON.stringify(author)}`);
            new Author(this.app, author).createNote();
            break;
        }
    }

    public async getLastBookFromToReadShelf() {
        const xmlString = await this.fetchToReadShelfBooks();
        if (!xmlString) return;

        const reviews = this.parseReviews(xmlString);
        await this.fetchAndCreateReviewNotes(reviews);
    }
}
