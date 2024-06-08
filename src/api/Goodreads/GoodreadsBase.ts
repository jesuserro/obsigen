import { App, requestUrl } from 'obsidian';
import TurndownService from 'turndown';

export class GoodreadsBase {
    protected app: App;
    protected turndownService: TurndownService;
    protected parser: DOMParser;

    protected static readonly GOODREADS_URL_BASE = 'https://www.goodreads.com';

    constructor(app: App) {
        this.app = app;
        this.turndownService = new TurndownService();
        this.parser = new DOMParser();
    }

    protected async fetchXmlString(url: string): Promise<string | null> {
        try {
            const response = await requestUrl(url);
            return response.text;
        } catch (error) {
            console.error(`Error de red al obtener la información: ${error}`);
            return null;
        }
    }

    protected parseXmlString(xmlString: string, selector: string): Element | null {
        const xmlDoc = this.parser.parseFromString(xmlString, 'text/xml');
        return xmlDoc.querySelector(selector);
    }
}
