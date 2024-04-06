import { App } from 'obsidian';
import { renderToString } from 'react-dom/server';
import { NoteGenerator } from 'src/core/notes/NoteGenerator';
import { DATA_YAML_REVIEW_DEFAULT } from 'src/core/shared/interface/iYaml';
import { Yaml } from 'src/core/shared/templates/Yaml';

export class Review {
  private app: App;
  private noteGenerator: NoteGenerator;
  private guid: string;
  private isbn: string;
  private yaml: string;
  private title: string;
  private content: string;
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
  private date: Date = new Date();

  constructor(app: App, review: Review) {
    this.app = app;
    this.noteGenerator = new NoteGenerator(this.app);

    const reviewDate = new Date(review.date);

    this.title = this.getTitle(review.title);
    this.guid = review.guid;
    this.isbn = review.isbn;
    this.content = review.content;
    this.year = reviewDate.getFullYear();
    this.month = reviewDate.getMonth() + 1;
    this.day = reviewDate.getDate();
    this.rating = review.rating * 2;
    this.cover = review.cover;
    this.locations = '';
    this.urls = this.cleanUrls(review.urls) || '';
    this.tags = review.tags || '';
    this.setYaml();
    this.fileName = this.getFilename(this.title);
    this.setContent(review.content);
  }

  async createNote() {
    const path = this.getPath();
    await this.noteGenerator.createNote(this.fileName, this.content, path);
  }

  private setYaml() {
    const link = `"[[${this.getCurrentDate()}]]"`;
    const data = {
      ...DATA_YAML_REVIEW_DEFAULT,
      title: this.title.replace(/[*"\\\/<>:|?¿,.;#]/g, ''),
      guid: this.guid,
      isbn: this.isbn,
      date: this.convertDateToIsoString(this.date),
      links: [...DATA_YAML_REVIEW_DEFAULT.links, link],
      locations: this.getListForYamlProperty(this.locations, true),
      urls: this.getListForYamlProperty(this.urls),
      tags: [...DATA_YAML_REVIEW_DEFAULT.tags, this.tags],
      cover: this.cover,
      cssclasses: [...DATA_YAML_REVIEW_DEFAULT.cssclasses, 'review'],
      rating: this.rating
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

  private setContent(content: string) {
    this.content = `${this.yaml}\n# ${this.title}\n${content}`;
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
