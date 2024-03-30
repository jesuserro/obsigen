import { App, requestUrl } from 'obsidian';
import { Review } from 'src/api/Goodreads/Review';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import TurndownService from 'turndown';


export module Goodreads {

    /**
     * Get reviews from Goodreads API
     * @param app Obsidian app instance
     * @param shelf Shelf to get reviews from
     * @returns XML string with reviews
     * @throws Error if network request fails
     * @returns null if network request fails
     * @see https://forum.obsidian.md/t/make-http-requests-from-plugins/15461/19
     */
    export async function getReviews(app: App, shelf: string): Promise<string | null> {
        
        const { goodreads_user, goodreads_apikey }: MyPluginSettings = (app as any).setting.pluginTabs.find((tab: any) => tab.id === 'obsigen')?.plugin?.settings ?? {};

        const url = `https://www.goodreads.com/review/list_rss/${goodreads_user}?key=${goodreads_apikey}&shelf=${shelf}`;
        
        try {
            const response = await requestUrl(url);
            return response.text;
        
        } catch (error) {
            console.error(`Error de red al obtener la información de reviews: ${error}`);
            return null;
        }
    }

    // Función para parsear el XML y extraer la información de cada revisión
    export async function parseReviews(xmlString: string): Promise<any[]> {
        try {
            const turndownService = new TurndownService();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');

            const reviews = Array.from(items).map(item => {
                const shelvesElement = item.querySelector('user_shelves');
                const shelves = shelvesElement ? shelvesElement.textContent?.split(',').map(shelf => shelf.trim()) : [];

                // Utilizar una expresión regular para capturar solo los dígitos del GUID
                const guidMatch = item.querySelector('guid')?.textContent?.match(/\d+/);
                const guid = guidMatch ? guidMatch[0] : null;

                let content = item.querySelector('user_review')?.textContent ?? '';
                content = turndownService.turndown(content);

                return {
                    guid: guid,
                    title: item.querySelector('title')?.textContent,
                    authors: item.querySelector('author_name')?.textContent,
                    rating: item.querySelector('user_rating')?.textContent,
                    date: item.querySelector('user_read_at')?.textContent,
                    tags: shelves,
                    urls: item.querySelector('link')?.textContent,
                    book_id: item.querySelector('book_id')?.textContent,
                    cover: item.querySelector('book_large_image_url')?.textContent,
                    content: content
                };
            });
            
            return reviews;
        } catch (error) {
            console.error(`Error al parsear el XML: ${error}`);
            return [];
        }
    }

    // Función principal para mostrar el número total de revisiones y detalles de una revisión al azar
    // guid = 2333083521 (Mi Corazón Triunfará)
    // guid = 2305880095 (Mero Cristianismo)
    // guid = 2337479160 (Jesús Nazareth Resurrección)
    export async function getRandomReview(app: App) {
        const xmlString = await getReviews(app, 'read');
        if (!xmlString) return;

        const reviews = await parseReviews(xmlString);
        // console.log(reviews);

        console.log(`Número total de revisiones: ${reviews.length}`);

        // Randomly get a review
        const randomIndex = Math.floor(Math.random() * reviews.length);
        const randomReview = reviews[randomIndex];

        // const randomReview = reviews.find(review => review.guid == '2305880095');
        const date = new Date(randomReview.date);

        new Review(date).createNote(app, randomReview);

        console.log('Detalles de la revisión seleccionada al azar:');
        Object.entries(randomReview).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    }
}
