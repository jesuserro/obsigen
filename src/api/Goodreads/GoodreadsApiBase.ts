import { App, requestUrl } from 'obsidian';
import TurndownService from 'turndown';

export class GoodreadsApiBase {
    protected app: App;
    protected turndownService: TurndownService;
    protected parser: DOMParser;

    protected static readonly BASE_URL = 'https://www.goodreads.com';

    constructor(app: App) {
        this.app = app;
        this.turndownService = new TurndownService();
        this.parser = new DOMParser();
    }

    protected async fetchXml(url: string): Promise<string | null> {
        try {
            const response = await requestUrl(url);
            return response.text;
        } catch (error) {
            console.error(`Network error fetching data: ${error}`);
            return null;
        }
    }

    protected parseXml(xmlString: string, selector: string): Element | null {
        const xmlDoc = this.parser.parseFromString(xmlString, 'text/xml');
        return xmlDoc.querySelector(selector);
    }

    protected getTextContent(item: Element, selectors: string[], defaultValue: string = ''): string {
        return selectors
            .map(selector => item.querySelector(selector)?.textContent?.trim())
            .find(textContent => textContent) || defaultValue;
    }

    protected formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    protected getFormattedDate(item: Element, yearSelectors: string[], monthSelectors: string[], daySelectors: string[]): string {
        const year = this.getTextContent(item, yearSelectors, new Date().getFullYear().toString());
        const month = this.padZero(parseInt(this.getTextContent(item, monthSelectors, '1'), 10));
        const day = this.padZero(parseInt(this.getTextContent(item, daySelectors, '1'), 10));

        return `${year}-${month}-${day}`;
    }

    private padZero(value: number): string {
        return value.toString().padStart(2, '0');
    }
}
