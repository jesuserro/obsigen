import { App, requestUrl } from 'obsidian';
import { Review } from 'src/api/Goodreads/Review';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import TurndownService from 'turndown';
import { Author } from './Author';
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

    private async fetchBooksByShelf(shelf: string): Promise<string | null> {
        
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

    public async getReviewByGuid(guid: string) {
        const xmlString = await this.fetchBooksByShelf('read');
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
        // console.log(review, bookItem, parsedBookData);

        // 2.4. Mixing review/book data: if empty parsedBookData.cover then set parsedBookData.cover = review.cover
        if (!parsedBookData.cover) {
            parsedBookData.cover = review.cover;
        }
        // 2.5. Create Book Note
        const book = new Book(this.app, parsedBookData);
        // book.createNote();

        // AUTHOR INFORMATION
        // 3.1. Show author information in the console for debugging purposes
        const authorXmlString = await this.fetchAuthorXmlString(bookItem.querySelector('author > id')?.textContent ?? '');
        // console.log(authorXmlString);
        if (!authorXmlString){
            console.error(`No se encontró ninguna información del autor con el ID: ${bookItem.querySelector('author > id')?.textContent}`);
            return; 
        };
        const authorItem = this.parser.parseFromString(authorXmlString, 'text/xml').querySelector(':scope > author') as Element;
        const parsedAuthorData = this.parseAuthorItem(authorItem);
        // console.log(parsedAuthorData);
        // 3.2. Create Author Note
        const author = new Author(this.app, parsedAuthorData);
        author.createNote();

    }

    public async getReviewByIsbn(isbn: string) {
        const xmlString = await this.fetchBooksByShelf('read');
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

    public async getBookById(bookId: string) {
        const xmlString = await this.fetchBookXmlString(bookId);
        if (!xmlString) return;

        const bookItem = this.parser.parseFromString(xmlString, 'text/xml').querySelector('book') as Element;
        const parsedBookData = this.parseBookItem(bookItem);
        new Book(this.app, parsedBookData).createNote();
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

    private async parseBooksFromReviews(xmlString: string): Promise<any[]> {
        try {
            const xmlDoc = this.parser.parseFromString(xmlString, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');
            const reviews = Array.from(items).map(item => this.parseBookFromReviewItem(item));
            return reviews;
        } catch (error) {
            console.error(`Error al parsear el XML: ${error}`);
            return [];
        }
    }

    private parseBookFromReviewItem(review: Element): any {
        const shelvesElement = review.querySelector('user_shelves');
        const shelves = shelvesElement ? shelvesElement.textContent?.split(',').map(shelf => `Goodreads/Reviews/${shelf.trim()}`) : [];
    

        let content = review.querySelector('book_description')?.textContent ?? '';
        content = this.turndownService.turndown(content);
    
        // Obtener la fecha de lectura
        const pubDate = review.querySelector('pubDate')?.textContent;
        const user_read_at = review.querySelector('user_read_at')?.textContent;
        const currentDate = new Date().toISOString();

        let date = user_read_at || pubDate || currentDate;
        
        
        // <pubDate><![CDATA[Sat, 19 Nov 2022 11:50:50 -0800]]></pubDate> transform to 2022-11-19
        if (date) {
            date = new Date(date).toISOString().split('T')[0];
        }

        console.log('pubDate', pubDate, 'user_read_at', user_read_at, 'Date', date);
    
        return {
            guid: review.querySelector('guid')?.textContent?.match(/\d+/)?.[0] || null,
            isbn: review.querySelector('isbn')?.textContent,
            title: review.querySelector('title')?.textContent,
            authors: review.querySelector('author_name')?.textContent,
            rating: review.querySelector('user_rating')?.textContent,
            date: date,
            tags: shelves,
            urls: review.querySelector('link')?.textContent,
            book_id: review.querySelector('book_id')?.textContent,
            cover: review.querySelector('book_large_image_url')?.textContent,
            description: content
        };
    }

    private parseReviewItem(review: Element): any {
        const shelvesElement = review.querySelector('user_shelves');
        const shelves = shelvesElement ? shelvesElement.textContent?.split(',').map(shelf => `Goodreads/Reviews/${shelf.trim()}`) : [];
    
        let content = review.querySelector('user_review')?.textContent ?? '';
        content = this.turndownService.turndown(content);
    
        // Obtener la fecha de lectura
        let date = review.querySelector('user_read_at')?.textContent;
    
        // Si user_read_at está vacío, tomar pubDate
        if (!date) {
            date = review.querySelector('pubDate')?.textContent;

            // <pubDate><![CDATA[Sat, 19 Nov 2022 11:50:50 -0800]]></pubDate> transform to 2022-11-19
            if (date) {
                date = new Date(date).toISOString().split('T')[0];
            }
    
            // Si pubDate también está vacío o es null, tomar la fecha actual
            if (!date) {
                date = new Date().toISOString();
            }
        }
    
        return {
            guid: review.querySelector('guid')?.textContent?.match(/\d+/)?.[0] || null,
            isbn: review.querySelector('isbn')?.textContent,
            title: review.querySelector('title')?.textContent,
            authors: review.querySelector('author_name')?.textContent,
            rating: review.querySelector('user_rating')?.textContent,
            date: date,
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
            goodreads_book_id: book.querySelector('id')?.textContent?.match(/\d+/)?.[0] || null,
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
            rating: book.querySelector('user_rating')?.textContent || 0
        };
    }

    private parseAuthorItem(author: Element): any {
        const authorName = author.querySelector('name')?.textContent;
        const shelfNames = [ 'Goodreads/Authors' ];
    
        let description = author.querySelector('about')?.textContent ?? '';
        description = this.turndownService.turndown(description);
    
        let date = new Date().toISOString().split('T')[0];
        const bornDateXml = author.querySelector('born_at'); 
        if (bornDateXml !== null && bornDateXml.textContent !== "") {
            date = this.getBookDate( bornDateXml );
        }
        
        return {
            goodreads_id: author.querySelector('id')?.textContent?.match(/\d+/)?.[0] || null,
            title: authorName,
            authors: [ authorName ],
            date: date,
            tags: shelfNames.join(', '),
            urls: author.querySelector('link')?.textContent,
            book_id: author.querySelector('book_id')?.textContent,
            cover: author.querySelector('image_url')?.textContent,
            description: description,
            country_code: author.querySelector('country_code')?.textContent,
            rating: author.querySelector('user_rating')?.textContent || 0
        };
    }
    
    private getBookDate(item: Element): string {
        const year = this.getBookYear(item);
        const month = this.getBookMonth(item);
        const day = this.getBookDay(item);
    
        const paddedMonth = month.toString().padStart(2, '0');
        const paddedDay = day.toString().padStart(2, '0');
        const defaultYear = year || new Date().getFullYear().toString();
    
        return `${defaultYear}-${paddedMonth}-${paddedDay}`;
    }
    
    private getBookYear(item: Element): string {
        return this.getTextContent(item, ['publication_year', 'work > original_publication_year'], new Date().getFullYear().toString());
    }
    
    private getBookMonth(item: Element): number {
        return parseInt(this.getTextContent(item, ['publication_month', 'work > original_publication_month'], '1'), 10);
    }
    
    private getBookDay(item: Element): number {
        return parseInt(this.getTextContent(item, ['publication_day', 'work > original_publication_day'], '1'), 10);
    }
    
    private getTextContent(item: Element, selectors: string[], defaultValue: string): string {
        return selectors
            .map(selector => item.querySelector(selector)?.textContent?.trim())
            .find(textContent => textContent) || defaultValue;
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
        
        return authorNames;
    }

    // Based on the code above, create new method to get the last book from the shelf 'to-read' and create a note with the book information
    public async getLastBookFromToReadShelf() {

        const xmlString = await this.fetchBooksByShelf('to-read');
        if (!xmlString) return;

        // const reviews = await this.parseReviews(xmlString);
        const reviews = await this.parseBooksFromReviews(xmlString);
        // console.log(`Número total de revisiones: ${reviews.length}`);
        // console.log(reviews);
        const review = reviews[0];
        
        if (!review) {
            console.error(`No se encontró ninguna revisión en la estantería 'to-read'`);
            return;
        }

        // const bookXmlString = await this.fetchBookXmlString(review.book_id);
        // if (!bookXmlString) return;

        // const bookItem = this.parser.parseFromString(bookXmlString, 'text/xml').querySelector('book') as Element;
        // const parsedBookData = this.parseBookItem(bookItem);
        // new Book(this.app, parsedBookData).createNote();

        // await this.getBookById(review.book_id);

        new Book(this.app, review).createNote();
        
        
    }
    
}
