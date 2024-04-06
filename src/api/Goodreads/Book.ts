import { App } from 'obsidian';
import { renderToString } from 'react-dom/server';
import { NoteGenerator } from 'src/core/notes/NoteGenerator';
import { DATA_YAML_BOOK_DEFAULT } from 'src/core/shared/interface/iYaml';
import { Yaml } from 'src/core/shared/templates/Yaml';

export class Book {
  private app: App;
  private noteGenerator: NoteGenerator;
  private id: string;
  private isbn: string;
  private isbn13: string;
  private asin: string;
  private yaml: string;
  private title: string;
  private description: string;
  private fileName: string;
  private cover: string;
  private rating: number;
  private year: number;
  private month: number;
  private day: number;
  private locations: string;
  private urls: string;
  private tags: string;
  private twitterRegexp: RegExp = new RegExp('https?://(?:mobile\\.)?twitter\\.com/.*');
  private youtubeRegexp: RegExp = new RegExp('https?://(?:www\\.)?(?:youtube\\.com/.*|youtu\\.be/.*|.*\\.youtube\\.com/.*shorts)');
  private content: string = '';
  private date: Date = new Date();
  private num_pages: number = 0;
  private average_rating: number = 0;
  private ratings_count: number = 0;
  private country_code: string = '';

  constructor(app: App, book: Book) {
    this.app = app;
    this.noteGenerator = new NoteGenerator(this.app);

    const bookDate = new Date(book.date);

    this.title = this.getTitle(book.title);
    this.id = book.id;
    this.isbn = book.isbn;
    this.isbn13 = book.isbn13;
    this.asin = book.asin;
    this.description = book.description;
    this.year = bookDate.getFullYear();
    this.month = bookDate.getMonth() + 1;
    this.day = bookDate.getDate();
    this.rating = book.rating * 2;
    this.cover = book.cover;
    this.locations = '';
    this.urls = this.cleanUrls(book.urls) || '';
    this.tags = book.tags || '';
    this.num_pages = book.num_pages || 0;
    this.average_rating = book.average_rating || 0;
    this.ratings_count = book.ratings_count || 0;
    this.country_code = book.country_code || '';
    this.setYaml();
    this.fileName = this.getFilename(this.title);
    this.setContent(book.description);
  }

  async createNote() {
    const path = this.getPath();
    await this.noteGenerator.createNote(this.fileName, this.content, path);
  }

  private setYaml() {
    const link = `"[[${this.getCurrentDate()}]]"`;
    const data = {
      ...DATA_YAML_BOOK_DEFAULT,
      title: this.title.replace(/[*"\\\/<>:|?¿,.;#]/g, ''),
      id: this.id,
      isbn: this.isbn,
      isbn13: this.isbn13,
      asin: this.asin,
      date: this.convertDateToIsoString(this.date),
      links: [...DATA_YAML_BOOK_DEFAULT.links, link],
      locations: this.getListForYamlProperty(this.locations, true),
      urls: this.getListForYamlProperty(this.urls),
      tags: [...DATA_YAML_BOOK_DEFAULT.tags, this.tags],
      cover: this.cover,
      cssclasses: [...DATA_YAML_BOOK_DEFAULT.cssclasses, 'book'],
      rating: this.rating,
      num_pages: this.num_pages,
      average_rating: this.average_rating,
      ratings_count: this.ratings_count,
      country_code: this.country_code
    };

    let yaml = renderToString(Yaml({ data }));
    yaml = yaml.replace(/&quot;/g, '"');
    yaml = yaml.replace(/&amp;/g, '&');
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  private convertDateToIsoString(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  private cleanUrls(urls: string) {
    return urls.split(',').map(url => this.cleanUrl(url)).join(',');
  }

  private setContent(description: string) {
    this.content = `${this.yaml}\n# ${this.title}\n${description}`;
  }

  private getListForYamlProperty(yamlPropertyText: string, isQuoted: boolean = false): string {
    if (!yamlPropertyText) return "";
  
    const yamlUrls = yamlPropertyText
      .split(',')
      .map((url: string) => {
        const formattedUrl = isQuoted ? `"${this.filterParamsFromUrl(url.trim())}"` : this.filterParamsFromUrl(url.trim());
        return `- ${formattedUrl}`;
      })
      .join('\n');
  
    return `\n${yamlUrls}`;
  }

  private getTitle(title: string) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return `${title}`;
  }

  private getFilename(title: string) {
    // File name cannot contain any of the following characters: *"\/<>:|?¿,.;
    title = title.replace(/[*"\\\/<>:|?¿,.;#]/g, '');
    return `${this.getFilePrefix()} ${title}`;
  }

  private getFilePrefix() {
    return `${this.getCurrentDate()}${this.getCurrentTime()}`;
  }

  private getCurrentTime() {
    const hour = this.date.getHours().toString().padStart(2, '0');
    const minute = this.date.getMinutes().toString().padStart(2, '0');
    return `${hour}${minute}`;
  }

  private getCurrentDate() {
    const year = this.date.getFullYear().toString();
    const month = (this.date.getMonth() + 1).toString().padStart(2, '0');
    const day = this.date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }

  private getPath() {
    const pathFechaMomento = `100 Calendar/${this.year}/${this.month.toString().padStart(2, '0')}/${this.day.toString().padStart(2, '0')}`;
    return pathFechaMomento;
  }

  private cleanUrl(url: string) {
    url = this.filterParamsFromUrl(url);

    if (this.twitterRegexp.test(url) || this.youtubeRegexp.test(url)) {
      if (this.youtubeRegexp.test(url)) {
        url = url.replace(/(\?|&)si=[^&]*$/, "");
        url = url.replace(/\/(?:shorts|live)\//, "/embed/");
      }
    }
    return url.trim();
  }

  private filterParamsFromUrl(url: string): string {
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
    if(this.twitterRegexp.test(url)){
      return urlParts[0];
    }
    return url;
  }
}
