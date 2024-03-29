import fetch from 'node-fetch';
import { App } from 'obsidian';
import { Review } from 'src/api/Goodreads/Review';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';

export module Goodreads {

    // Método para obtener el feed de reviews desde la API de Goodreads
    export async function getReviews(app: App, shelf: string): Promise<string | null> {
        
        const { goodreads_user, goodreads_apikey }: MyPluginSettings = (app as any).setting.pluginTabs.find((tab: any) => tab.id === 'obsigen')?.plugin?.settings ?? {};

        const url = `https://www.goodreads.com/review/list_rss/${goodreads_user}?key=${goodreads_apikey}&shelf=${shelf}`;
        
        try {
            const respuesta = await fetch(url);
            if (!respuesta.ok) {
                console.error(`Error al obtener la información de reviews: ${respuesta.status}`);
                return null; 
            }
            
            const textoRespuesta = await respuesta.text();
            return textoRespuesta;

        } catch (error) {
            console.error(`Error de red al obtener la información de reviews: ${error}`);
            return null;
        }
    }

    // Función para parsear el XML y extraer la información de cada revisión
    export async function parseReviews(xmlString: string): Promise<any[]> {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            
            const items = xmlDoc.querySelectorAll('item');
            const reviews = Array.from(items).map(item => {
                const shelvesElement = item.querySelector('user_shelves');
                const shelves = shelvesElement ? shelvesElement.textContent?.split(',').map(shelf => shelf.trim()) : [];

                return {
                    guid: item.querySelector('guid')?.textContent,
                    title: item.querySelector('title')?.textContent,
                    authors: item.querySelector('author_name')?.textContent,
                    rating: item.querySelector('user_rating')?.textContent,
                    date: item.querySelector('user_read_at')?.textContent,
                    tags: shelves,
                    urls: item.querySelector('link')?.textContent,
                    book_id: item.querySelector('book_id')?.textContent,
                    cover: item.querySelector('book_large_image_url')?.textContent,
                    user_review: item.querySelector('user_review')?.textContent
                };
            });
            
            return reviews;
        } catch (error) {
            console.error(`Error al parsear el XML: ${error}`);
            return [];
        }
    }

    // Función principal para mostrar el número total de revisiones y detalles de una revisión al azar
    export async function getRandomReview(app: App) {
        const xmlString = await getReviews(app, 'read');
        if (!xmlString) return;

        const reviews = await parseReviews(xmlString);

        console.log(`Número total de revisiones: ${reviews.length}`);

        // Mostrar detalles de una revisión al azar
        const randomIndex = Math.floor(Math.random() * reviews.length);
        const randomReview = reviews[randomIndex];

        const date = new Date(randomReview.date);

        new Review(date).createNote(
            'Moment',
            app,
            randomReview.title, 
            randomReview.user_review,  
            randomReview.cover, 
            randomReview.user_review,
            '',
            randomReview.urls,
            randomReview.tags
        );

        console.log('Detalles de la revisión seleccionada al azar:');
        Object.entries(randomReview).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    }
}
