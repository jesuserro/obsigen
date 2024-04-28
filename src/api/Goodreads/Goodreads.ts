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

        // 1. REVIEW INFORMATION
        const reviews = await this.parseReviews(xmlString);
        console.log(`Número total de revisiones: ${reviews.length}`);
        const review = reviews.find(review => review.guid === guid);
        if (!review) {
            console.error(`No se encontró ninguna revisión con el GUID: ${guid}`);
            return;
        }
        // 1.1. Create Review Note
        // new Review(this.app, review).createNote();

        // 2. BOOK INFORMATION
        // 2.1. Show book information in the console for debugging purposes
        const bookXmlString = await this.fetchBookXmlString(review.book_id);
        if (!bookXmlString) return;

        // 2.2. Parse book item and show it in the console for debugging purposes
        const bookItem = this.parser.parseFromString(bookXmlString, 'text/xml').querySelector('book') as Element;
        // 2.3. Parse bookItem Element into a Book object
        const parsedBookData = this.parseBookItem(bookItem);
        console.log(review, bookItem, parsedBookData);

        // 2.4. Mixing review/book data: if empty parsedBookData.cover then set parsedBookData.cover = review.cover
        if (!parsedBookData.cover) {
            parsedBookData.cover = review.cover;
        }
        // 2.5. Create Book Note
        const book = new Book(this.app, parsedBookData);
        book.createNote();

        // AUTHOR INFORMATION
        // 3.1. Show author information in the console for debugging purposes
        // const authorXmlString = await this.fetchAuthorXmlString(bookItem.querySelector('author > id')?.textContent ?? '');
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

    private parseReviewItem(review: Element): any {
        const shelvesElement = review.querySelector('user_shelves');
        const shelves = shelvesElement ? shelvesElement.textContent?.split(',').map(shelf => `Goodreads/Reviews/${shelf.trim()}`) : [];

        let content = review.querySelector('user_review')?.textContent ?? '';
        content = this.turndownService.turndown(content);

        return {
            guid: review.querySelector('guid')?.textContent?.match(/\d+/)?.[0] || null,
            isbn: review.querySelector('isbn')?.textContent,
            title: review.querySelector('title')?.textContent,
            authors: review.querySelector('author_name')?.textContent,
            rating: review.querySelector('user_rating')?.textContent,
            date: review.querySelector('user_read_at')?.textContent,
            tags: shelves,
            urls: review.querySelector('link')?.textContent,
            book_id: review.querySelector('book_id')?.textContent,
            cover: review.querySelector('book_large_image_url')?.textContent,
            content: content
        };
    }

    private parseBookItem(book: Element): any {
        const authorNames = this.getAuthorNames(book);
        const shelfNames = this.getShelfNames(book);
    
        let description = book.querySelector('description')?.textContent ?? '';
        description = this.turndownService.turndown(description);
    
        const date = this.getBookDate(book);
    
        return {
            id: book.querySelector('id')?.textContent?.match(/\d+/)?.[0] || null,
            isbn: book.querySelector('isbn')?.textContent,
            isbn13: book.querySelector('isbn13')?.textContent,
            asin: book.querySelector('asin')?.textContent,
            kindle_asin: book.querySelector('kindle_asin')?.textContent,
            title: book.querySelector('title')?.textContent,
            authors: authorNames.join(', '),
            date: date,
            tags: shelfNames.join(', '),
            urls: book.querySelector('link')?.textContent,
            book_id: book.querySelector('book_id')?.textContent,
            cover: book.querySelector('image_url')?.textContent,
            description: description,
            num_pages: book.querySelector('num_pages')?.textContent,
            average_rating: book.querySelector('average_rating')?.textContent,
            ratings_count: book.querySelector('ratings_count')?.textContent,
            country_code: book.querySelector('country_code')?.textContent,
            text_reviews_count: book.querySelector('text_reviews_count')?.textContent,
            rating: book.querySelector('user_rating')?.textContent
        };
    }
    
    private getBookDate(item: Element): string {
        const year = this.getYear(item);
        const month = this.getMonth(item);
        const day = this.getDay(item);
    
        // Pad month and day with leading zero if they are single digit
        const paddedMonth = month.toString().padStart(2, '0');
        const paddedDay = day.toString().padStart(2, '0');
    
        // If year is empty, use the current year
        const currentDate = new Date();
        const defaultYear = year || currentDate.getFullYear().toString();
    
        return `${defaultYear}-${paddedMonth}-${paddedDay}`;
    }
    
    private getYear(item: Element): string {
        const publicationYear = item.querySelector('publication_year');
        if (publicationYear !== null && publicationYear.textContent !== "") {
            return publicationYear.textContent ?? '';
        } else {
            const originalPublicationYear = item.querySelector('work > original_publication_year');
            return originalPublicationYear?.textContent ?? '';
        }
    }
    
    private getMonth(item: Element): number {
        const publicationMonth = item.querySelector('publication_month');
        if (publicationMonth !== null && publicationMonth.textContent !== "") {
            return parseInt(publicationMonth.textContent || '1', 10);
        } else {
            const originalPublicationMonth = item.querySelector('work > original_publication_month');
            return originalPublicationMonth ? parseInt(originalPublicationMonth.textContent ?? '1', 10) : 1;
        }
    }
    
    private getDay(item: Element): number {
        const publicationDay = item.querySelector('publication_day');
        if (publicationDay !== null && publicationDay.textContent !== "") {
            return parseInt(publicationDay.textContent || '1', 10);
        } else {
            const originalPublicationDay = item.querySelector('work > original_publication_day');
            return originalPublicationDay ? parseInt(originalPublicationDay.textContent ?? '1', 10) : 1;
        }
    }

    private getShelfNames(book: Element): string[] {
        const shelfElements = book.querySelectorAll('popular_shelves > shelf');
        const shelfNames: string[] = [];
        
        shelfElements.forEach((shelfElement) => {
            const shelfName = shelfElement.getAttribute('name');
            if (shelfName) {
                shelfNames.push(`Goodreads/Books/${shelfName}`);
            }
        });
        
        return shelfNames;
    }

    private getAuthorNames(book: Element): string[] {
        // Asegurarse de que solo se seleccionan autores directamente relacionados con el nodo principal del libro
        const authorElements = book.querySelectorAll(':scope > authors > author');
        const authorNames: string[] = [];
        
        authorElements.forEach((authorElement) => {
            const authorName = authorElement.querySelector('name')?.textContent?.trim();
            if (authorName) {
                authorNames.push(authorName);
            }
        });
    
        // console.log(authorNames);
        
        return authorNames;
    }
    
    
    
    
    
    
    
}
