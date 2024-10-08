import { App } from 'obsidian';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import { GoodreadsApiBase } from './GoodreadsApiBase';

export class GoodreadsRssItemApi extends GoodreadsApiBase {
    
    private static readonly REVIEWS_RSS = 'review/list_rss/$userId?key=$apikey&shelf=$shelf&page=$page&per_page=$perPage';

    constructor(app: App) {
        super(app);
    }

    private async fetchShelfRss(shelf: string, page: number): Promise<string | null> {
        const { goodreads_user, goodreads_apikey }: MyPluginSettings = this.getGoodreadsSettings();
        const url = `${GoodreadsApiBase.BASE_URL}/${GoodreadsRssItemApi.REVIEWS_RSS}`
            .replace('$userId', goodreads_user)
            .replace('$apikey', goodreads_apikey)
            .replace('$shelf', shelf)
            .replace('$page', page.toString())
            .replace('$perPage', '100');

        const xmlString = await this.fetchXml(url);

        // console.log(xmlString);

        return xmlString;
    }

    private parseReviewElement(element: Element, selector: string): string | null {
        return element.querySelector(selector)?.textContent ?? null;
    }

    private parseItem(review: Element): any {
        const description = this.turndownService.turndown(this.parseReviewElement(review, ':scope > book_description') ?? '');
        const dateAdded = this.parseReviewElement(review, ':scope > user_date_added');

        return {
            review_id: this.extractReviewId(review),
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
            num_pages: this.parseReviewElement(review, ':scope > book > num_pages'),
            average_rating: this.parseReviewElement(review, ':scope > average_rating'),
            ratings_count: this.parseReviewElement(review, ':scope > user_ratings_count'),
            text_reviews_count: this.parseReviewElement(review, ':scope > text_reviews_count'),
            country_code: this.parseReviewElement(review, ':scope > country_code'),
            locations: this.parseReviewElement(review, ':scope > user_statuses > user_status > location'),
            book_published: this.parseReviewElement(review, ':scope > book_published'),
        };
    }

    private parseItems(xmlString: string): any[] {
        const xmlDoc = this.parser.parseFromString(xmlString, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');
        return Array.from(items).map(item => this.parseItem(item));
    }

    public async getShelfList(shelf: string, page: number = 1): Promise<any[]> {
        const xmlString = await this.fetchShelfRss(shelf, page);
        if (!xmlString) return [];
    
        const reviews = this.parseItems(xmlString);
        // console.log(`Num reviews: ${reviews.length} for shelf: ${shelf}`);
        // console.log(`Review: ${JSON.stringify(reviews[0])}`); // Muestra el primer libro de la página especificada
        // new Review(this.app, reviews[0]).createNote();
    
        return reviews; // Puedes devolver los datos o hacer otras operaciones aquí
    }

    public async countPagesInShelf(shelf: string): Promise<number> {
        let totalPages = 0;
        let currentPage = 1;
    
        while (true) {
            const xmlString = await this.fetchShelfRss(shelf, currentPage);
            if (!xmlString) break;
    
            const reviews = this.parseItems(xmlString);
            const numBooks = reviews.length;
    
            if (numBooks === 0) break;
    
            totalPages++;
            currentPage++;
        }

        console.log(`Total pages in shelf ${shelf}: ${totalPages}`);
    
        return totalPages;
    }
    

    public async getLastPageLastBook(shelf: string) {
        let page = 1;
        let lastPageBooks: any[] = [];

        while (true) {
            const xmlString = await this.fetchShelfRss(shelf, page);
            if (!xmlString) break;

            const reviews = this.parseItems(xmlString);
            if (reviews.length === 0) break;

            lastPageBooks = reviews; // Sobrescribe con los libros de la última página
            page++;
        }

        const lastBookOfLastPage = lastPageBooks[lastPageBooks.length - 1]; // Último libro de la última página
        console.log(`Last book of last page: ${JSON.stringify(lastBookOfLastPage)}`);

        return lastBookOfLastPage; // Devuelve el último libro de la última página
    }

    protected getShelves(element: Element, baseTag: string = ''): string[] {
        const shelves: string[] = [GoodreadsApiBase.GLOBAL_TAG];
    
        // Obtener todos los elementos 'user_shelves' dentro del elemento dado
        const shelfElements = element.querySelectorAll('user_shelves');
    
        // Iterar sobre cada elemento 'user_shelves'
        shelfElements.forEach(shelf => {
            // Obtener el contenido del elemento 'user_shelves'
            const shelvesText = shelf.textContent?.trim() || '';
    
            // Dividir el contenido por comas para obtener los tags individuales
            const shelfNames = shelvesText.split(',').map(tag => tag.trim());
    
            // Agregar los tags individuales al arreglo de estanterías
            shelfNames.forEach(tag => {
                const shelfName = tag;
                const basePath = `${GoodreadsApiBase.BASE_TAG}/${shelfName}`;
                const fullPath = baseTag ? `${GoodreadsApiBase.BASE_TAG}/${baseTag}/${shelfName}` : basePath;
                shelves.push(fullPath);
            });
        });
    
        return shelves;
    }

    // Get review_id from guid tag. For example, review_id = 4926202654 in: "<item><guid><![CDATA[https://www.goodreads.com/review/show/4926202654?utm_medium=api&utm_source=rss]]></guid>"
    private extractReviewId(review: Element): string | null {
        const reviewGuid = this.parseReviewElement(review, ':scope > guid');
        if (!reviewGuid) return null;
    
        // Extrae el review_id del GUID usando una expresión regular para simplificar
        const match = reviewGuid.match(/\/review\/show\/(\d+)\?/);
        return match ? match[1] : null;
    }

    public async getReviewRssItemByReviewId(reviewId: string) {
        
        // Get all reviews from the 'read' shelf
        const rewiesFromReadShelf = await this.getShelfList('read', 1);

        // Get review by id from the list
        const review = rewiesFromReadShelf.find(review => review.review_id === reviewId);

        // await new Review(this.app, review).createNote();

        return review;

    }
    
}
