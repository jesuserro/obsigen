import { App, requestUrl } from 'obsidian';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import TurndownService from 'turndown';

export class GoodreadsApiBase {
    protected app: App;
    protected turndownService: TurndownService;
    protected parser: DOMParser;

    protected static readonly BASE_URL = 'https://www.goodreads.com';
    protected static readonly BASE_TAG = 'Goodreads';

    constructor(app: App) {
        this.app = app;
        this.turndownService = new TurndownService();
        this.parser = new DOMParser();
    }

    protected getGoodreadsSettings(): MyPluginSettings {
        return (this.app as any).setting.pluginTabs.find((tab: any) => tab.id === 'obsigen')?.plugin?.settings ?? {};
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

    protected convertDateToIsoString(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    protected cleanUrls(urls: string, twitterRegexp: RegExp, youtubeRegexp: RegExp): string {
        return urls.split(',').map(url => this.cleanUrl(url, twitterRegexp, youtubeRegexp)).join(',');
    }

    protected cleanUrl(url: string, twitterRegexp: RegExp, youtubeRegexp: RegExp): string {
        url = this.filterParamsFromUrl(url);

        if (twitterRegexp.test(url) || youtubeRegexp.test(url)) {
            if (youtubeRegexp.test(url)) {
                url = url.replace(/(\?|&)si=[^&]*$/, "");
                url = url.replace(/\/(?:shorts|live)\//, "/embed/");
            }
        }
        return url.trim();
    }

    protected filterParamsFromUrl(url: string): string {
        url = url.replace(/"/g, '');
        const urlParts = url.split('?');
        if (urlParts.length === 2) {
            const queryParams = urlParts[1].split('&');
            const numericTParamFound = queryParams.some(param => {
                const [name, value] = param.split('=');
                return name === 't' && !isNaN(Number(value));
            });
            if (numericTParamFound) return url;
        }
        return url;
    }

    protected padZero(value: number): string {
        return value.toString().padStart(2, '0');
    }

    protected getShelves(element: Element): string[] {
        const shelves: string[] = [];
        const shelfElements = element.querySelectorAll('shelf');
        shelfElements.forEach(shelf => {
            shelves.push(`${GoodreadsApiBase.BASE_TAG}/${shelf.getAttribute('name') || ''}`);
        });
        return shelves;
    }
}
