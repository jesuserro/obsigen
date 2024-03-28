import fetch from 'node-fetch';

// Definir las credenciales de la API de Goodreads
const GOODREADS_USER: string = '40291334';
const GOODREADS_API_KEY: string = 'DkLO3yfzNSM1JLOIJFXL3A';

// Método para obtener la información de un libro desde la API de Goodreads
export async function getReviews(shelf: string): Promise<String | null> {
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

