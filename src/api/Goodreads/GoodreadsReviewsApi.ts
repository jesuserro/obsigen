import { App } from 'obsidian';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import { GoodreadsApiBase } from './GoodreadsApiBase';
import { GoodreadsAuthorApi } from './GoodreadsAuthorApi';
import { GoodreadsBookApi } from './GoodreadsBookApi';
import { Review } from './Review';

export class GoodreadsReviewsApi extends GoodreadsApiBase {

    private static readonly REVIEWS_URL_TEMPLATE = 'review/list/$authorId.xml?key=$apikey&v=2';
    private static readonly REVIEW_SHOW_URL_TEMPLATE = 'review/show/$reviewId.xml?key=$apikey';

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
        const dateAdded = this.parseReviewElement(review, ':scope > date_added');

        return {
            review_id: this.parseReviewElement(review, ':scope > id'),
            book_id: this.parseReviewElement(review, ':scope > book > id'),
            author_id: this.parseReviewElement(review, ':scope > book > authors > author > id'),
            isbn: this.parseReviewElement(review, ':scope > book > isbn'),
            title: this.parseReviewElement(review, ':scope > book > title'),
            authors: this.parseReviewElement(review, ':scope > book > authors > author > name'),
            rating: this.parseReviewElement(review, 'rating'),
            date: dateAdded,
            date_added: dateAdded,
            date_updated: this.parseReviewElement(review, ':scope > date_updated'),
            tags: this.getShelves(review, 'My-Tags'),
            urls: this.parseReviewElement(review, ':scope > link'),
            cover: this.parseReviewElement(review, ':scope > book > image_url'),
            description: description,
            votes: this.parseReviewElement(review, ':scope > votes'),
            read_count: this.parseReviewElement(review, 'read_count'),
            comments_count: this.parseReviewElement(review, 'comments_count'),
        };
    }

    private parseReviews(xmlString: string): any[] {
        const xmlDoc = this.parser.parseFromString(xmlString, 'text/xml');
        const items = xmlDoc.querySelectorAll('review');
        return Array.from(items).map(item => this.parseReview(item));
    }

    private getFirstReview(reviews: any[]): any {
        if (reviews.length === 0) {
            console.error(`No reviews found in 'to-read' shelf`);
            return null;
        }

        const review = reviews[0];
        console.log(`Review: ${JSON.stringify(review)}`);
        new Review(this.app, review).createNote();
        return review;
    }

    private async fetchBookDetails(review: any): Promise<any> {
        const goodreadsBookApi = new GoodreadsBookApi(this.app);
        const book = await goodreadsBookApi.getBookById(review.book_id);

        console.log(`Book: ${JSON.stringify(book)}`);
        if (!book) {
            console.error(`Failed to fetch book details for book_id: ${review.book_id}`);
            return null;
        }
        return book;
    }

    private async fetchPrimaryAuthor(book: any): Promise<any> {
        const goodreadsAuthorApi = new GoodreadsAuthorApi(this.app);
        for (const authorId of book.authors_id) {
            const author = await goodreadsAuthorApi.getAuthorById(authorId);
            if (!author) {
                console.error(`Failed to fetch author details for author_id: ${authorId}`);
                continue;
            }
            console.log(`Author: ${JSON.stringify(author)}`);

            return author;
        }
    }

    public async getLastBookFromToReadShelf() {
        const xmlString = await this.fetchToReadShelfBooks();
        if (!xmlString) return;

        const reviews = this.parseReviews(xmlString);
        const review = this.getFirstReview(reviews);
        if (!review) return;

        const book = await this.fetchBookDetails(review);
        if (!book) return;

        await this.fetchPrimaryAuthor(book);
    }

    // Nuevo método para obtener una review por su ID
    public async getReviewById(reviewId: string): Promise<any> {
        const { goodreads_apikey }: MyPluginSettings = this.getGoodreadsSettings();
        const url = `${GoodreadsApiBase.BASE_URL}/${GoodreadsReviewsApi.REVIEW_SHOW_URL_TEMPLATE}`
            .replace('$reviewId', reviewId)
            .replace('$apikey', goodreads_apikey);

        const xmlString = await this.fetchXml(url);
        if (!xmlString) return null;

        const xmlDoc = this.parser.parseFromString(xmlString, 'text/xml');
        const reviewElement = xmlDoc.querySelector('review');
        if (!reviewElement) return null;

        const review = this.parseReview(reviewElement);

        await new Review(this.app, review).createNote();

        // Add book from review
        const book = await this.fetchBookDetails(review);
        if (!book) return null;

        // await new Book(this.app, book).createNote();

        // Add primary author from book
        const author = await this.fetchPrimaryAuthor(book);
        if (!author) return null;

        // await new Author(this.app, author).createNote();
        

        return review;
    }
}
