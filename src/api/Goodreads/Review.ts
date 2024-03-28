import fetch from 'node-fetch';
import { App } from 'obsidian';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import * as xml2js from 'xml2js';

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
        // console.log(textoRespuesta);
        return textoRespuesta;

    } catch (error) {
        console.error(`Error de red al obtener la información de reviews: ${error}`);
        return null;
    }
}

// Función para parsear el XML y extraer la información de cada revisión
export async function parseReviews(xmlString: string): Promise<any[]> {
    try {
        const parser = new xml2js.Parser({ explicitArray: false });
        const result = await parser.parseStringPromise(xmlString);
        
        const items = result.rss.channel.item;
        const reviews = items.map((item: any) => ({
            guid: item.guid,
            title: item.title,
            author: item.author_name,
            rating: item.user_rating,
            readAt: item.user_read_at,
            shelves: item.user_shelves.split(',').map((shelf: string) => shelf.trim()),
            link: item.link,
            book_id: item.book_id,
            book_large_image_url: item.book_large_image_url,
            user_review: item.user_review
        }));
        
        return reviews;
    } catch (error) {
        console.error(`Error al parsear el XML: ${error}`);
        return [];
    }
}

// Función principal para mostrar el número total de revisiones y detalles de una revisión al azar
export async function mainGoodreads(app:App) {
    const xmlString = await getReviews(app, 'read');
    if (!xmlString) return;

    const reviews = await parseReviews(xmlString);

    console.log(`Número total de revisiones: ${reviews.length}`);

    // Mostrar detalles de una revisión al azar
    const randomIndex = Math.floor(Math.random() * reviews.length);
    const randomReview = reviews[randomIndex];

    console.log('Detalles de la revisión seleccionada al azar:');
    Object.entries(randomReview).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
}



