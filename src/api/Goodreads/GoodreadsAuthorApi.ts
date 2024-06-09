import { App } from 'obsidian';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';
import { Author as AuthorInterface } from 'src/core/shared/interface/iYaml';
import { GoodreadsApiBase } from './GoodreadsApiBase';

export class GoodreadsAuthorApi extends GoodreadsApiBase {
    private static readonly AUTHOR_URL_TEMPLATE = 'author/show.xml?key=$apikey&id=$authorId';

    constructor(app: App) {
        super(app);
    }

    private async fetchAuthorById(authorId: string): Promise<string | null> {
        const { goodreads_apikey }: MyPluginSettings = this.getGoodreadsSettings();
        const url = `${GoodreadsApiBase.BASE_URL}/${GoodreadsAuthorApi.AUTHOR_URL_TEMPLATE}`
            .replace('$apikey', goodreads_apikey)
            .replace('$authorId', authorId);

        console.log(url);

        return this.fetchXml(url);
    }

    private parseAuthor(xmlString: string): any {
        const authorElement = this.parseXml(xmlString, 'author');
        if (!authorElement) return null;

        return {
            goodreads_author_id: this.getTextContent(authorElement, ['id']),
            name: this.getTextContent(authorElement, ['name']),
            image: this.getTextContent(authorElement, ['image_url']),
            urls: this.getTextContent(authorElement, ['link']),
            average_rating: parseFloat(this.getTextContent(authorElement, ['average_rating'], '0')),
            ratings_count: parseInt(this.getTextContent(authorElement, ['ratings_count'], '0'), 10),
            text_reviews_count: parseInt(this.getTextContent(authorElement, ['text_reviews_count'], '0'), 10),
            works_count: parseInt(this.getTextContent(authorElement, ['works_count'], '0'), 10),
            date: new Date(this.getTextContent(authorElement, ['born_at'])),
            born_at: new Date(this.getTextContent(authorElement, ['born_at'])),
            died_at: new Date(this.getTextContent(authorElement, ['died_at'])),
            about: this.turndownService.turndown(this.getTextContent(authorElement, ['about'])),
            influences: this.getTextContent(authorElement, ['influences']),
            gender: this.getTextContent(authorElement, ['gender']),
            hometown: this.getTextContent(authorElement, ['hometown']),
            birthplace: this.getTextContent(authorElement, ['birthplace']),
            website: this.getTextContent(authorElement, ['website'])
        };
    }

    public async getAuthorById(authorId: string): Promise<AuthorInterface | null> {
        const xmlString = await this.fetchAuthorById(authorId);
        if (!xmlString) return null;

        return this.parseAuthor(xmlString);
    }
}
