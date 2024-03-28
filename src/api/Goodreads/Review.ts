import fetch from 'node-fetch';
import { App } from 'obsidian';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';

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
        console.log('Texto de respuesta:', textoRespuesta);
        return textoRespuesta;

    } catch (error) {
        console.error(`Error de red al obtener la información de reviews: ${error}`);
        return null;
    }
}

