import fetch from 'node-fetch';
import { useApp } from './../../../src/core/hooks/useApp';

// Método para obtener la información de un libro desde la API de Goodreads
export async function getReviews(shelf: string): Promise<String | null> {

    const app = useApp() as any;
    const GOODREADS_USER = app.vault.config.get('goodreads_user');
    const GOODREADS_API_KEY = app.vault.config.get('goodreads_api_key');
    
    const url = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER}?key=${GOODREADS_API_KEY}&shelf=${shelf}`;

    console.log("url", url);
    
    try {
        
        const respuesta = await fetch(url);
        if (respuesta.ok) {
            const respuesta = await fetch(url);
            const textoRespuesta = await respuesta.text();
            console.log('Texto de respuesta:', textoRespuesta); 
            return textoRespuesta;
        } else {
            console.error(`Error al obtener la información de reviews: ${respuesta.status}`);
            return null;
        }
    } catch (error) {
        console.error(`Error de red al obtener la información de reviews: ${error}`);
        return null;
    }
}

