import fetch from 'node-fetch';
import { App } from 'obsidian';

// Método para obtener la información de un libro desde la API de Goodreads
export async function getReviews(app:App, shelf: string): Promise<String | null> {

    const setting = (app as any).setting;
    const pluginTab = setting.pluginTabs.find((tab: any) => tab.id === 'obsigen');
    const plugin = pluginTab.plugin;
    const GOODREADS_USER = plugin.settings.goodreads_user;
    const GOODREADS_APIKEY = plugin.settings.goodreads_apikey;

    const url = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER}?key=${GOODREADS_APIKEY}&shelf=${shelf}`;

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

