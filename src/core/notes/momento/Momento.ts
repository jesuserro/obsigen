import { App } from 'obsidian';
import { renderToString } from 'react-dom/server';
import { DATA_YAML_DEFAULT } from './../../shared/interface/iYaml';
import { Yaml } from './../../shared/templates/Yaml';
import { NoteGenerator } from './../NoteGenerator';

export class Momento {

  app: App;
  noteGenerator: NoteGenerator;

  yaml: string;
  title: string;
  filePrefix: string;
  date: Date;
  subheader: string;
  content: string;
  fileName: string;
  startDate: Date | null;
  icon: string | null;
  description: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;
  locations: string;
  urls: string;
  type: string;
  path: string;
  tags: string;

  constructor(date: Date) {
    this.icon = "";
    this.initializeDateProperties(date);
    this.locations = "";
    this.urls = "";
    this.type = "";
    this.path = "/";
    this.tags = "";
    this.startDate = date;
    this.date = this.startDate;
  }

  private initializeDateProperties(date: Date) {
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.seconds = date.getSeconds();
  }

  getCurrentTime() {
    return this.formatTime(this.date);
  }

  getCurrentDate() {
    return this.formatDate(this.date);
  }

  formatDate(date: Date) {
    const padTwoDigits = (value: number) => value.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = padTwoDigits(date.getMonth() + 1);
    const day = padTwoDigits(date.getDate());
    return `${year}-${month}-${day}`;
  }

  formatTime(date: Date) {
    const padTwoDigits = (value: number) => value.toString().padStart(2, '0');
    const hours = padTwoDigits(date.getHours());
    const minutes = padTwoDigits(date.getMinutes());
    const seconds = padTwoDigits(date.getSeconds());
    return `${hours}${minutes}${seconds}`;
  }

  setYaml() {
    const link = `"[[${this.getCurrentDate()}]]"`;
    const data = {
      ...DATA_YAML_DEFAULT,
      title: this.title,
      date: this.convertDateToIsoString(this.date),
      links: [...DATA_YAML_DEFAULT.links, link],
      locations: this.getListForYamlProperty(this.locations),
      urls: this.getListForYamlProperty(this.urls),
      tags: [...DATA_YAML_DEFAULT.tags, this.tags],
    };
    data.cssclasses = this.icon ? [this.icon] : [];
    let yaml = renderToString(Yaml({ data }));
    this.yaml = this.cleanUpYaml(yaml);
  }

  convertDateToIsoString(date: Date) {
    const padTwoDigits = (value: number) => value.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = padTwoDigits(date.getMonth() + 1);
    const day = padTwoDigits(date.getDate());
    const hours = padTwoDigits(date.getHours());
    const minutes = padTwoDigits(date.getMinutes());
    const seconds = padTwoDigits(date.getSeconds());
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  private cleanUpYaml(yaml: string) {
    yaml = yaml.replace(/<!-- -->/g, '');
    return yaml.replace(/&quot;|&amp;/g, match => (match === '&quot;' ? '"' : '&'));
  }

  async createNote(type: string, app: App, title: string, content: string, icon?: string, description?: string, locations?: string, urls: string = '', tags: string = '') {
    this.app = app;
    this.noteGenerator = new NoteGenerator(this.app);
    this.title = this.getTitle(title);
    this.initializeDateProperties(this.startDate || new Date());
    this.icon = icon || null;
    this.description = description || '';
    this.locations = locations || '';
    this.urls = urls || '';
    this.tags = tags || '';
    this.setYaml();
    this.fileName = this.getFilename(this.title);
    this.setContent(content);
    this.path = this.getPath(type);
    await this.noteGenerator.createNote(this.fileName, this.content, this.path);
  }

  getPath(type: string) {
    if (type === "Moment") {
      return `100 Calendar/${this.year}/${this.month.toString().padStart(2, '0')}/${this.day.toString().padStart(2, '0')}`;
    } else if (type === "Capture") {
      return `000 Inbox/Captures`;
    } else if (type === "Content Map") {
      return `200 Content Maps`;
    } else if (type === "Person") {
      return `100 Calendar/${this.year}/${this.month.toString().padStart(2, '0')}/${this.day.toString().padStart(2, '0')}`;
    }
    return "/";
  }

  setContent(content: string) {
    const mediaContent = this.getMediaContent();
    this.content = `${this.yaml}\n# ${this.title}\n${mediaContent}${content}`;
  }

  private getListForYamlProperty(yamlPropertyText: string) {
    if (yamlPropertyText === "") return "";
    return "\n" + yamlPropertyText.split(',').map(url => `- ${this.filterParamsFromUrl(url.trim())}`).join('\n');
  }

  private getMediaContent() {
    if (this.urls === "") return "";
    return "\n" + this.urls.split(',').map(url => this.filterMediaUrl(url.trim())).join('\n');
  }

  getTitle(title: string) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  getFilename(title: string) {
    return `${this.getFilePrefix()} ${title}`;
  }

  getFilePrefix() {
    return `${this.getCurrentDate()}${this.getCurrentTime()}`;
  }

  getContent() {
    return "";
  }

  filterMediaUrl(url: string) {
    url = this.filterParamsFromUrl(url);
    const twitterRegexp = new RegExp('https?://(?:mobile\\.)?twitter\\.com/.*');
    const youtubeRegexp = new RegExp('https?://(?:www\\.)?(?:youtube\\.com/.*|youtu\\.be/.*|.*\\.youtube\\.com/.*shorts)');

    if (twitterRegexp.test(url) || youtubeRegexp.test(url)) {
      if (youtubeRegexp.test(url)) {
        url = url.replace(/(\?|&)si=[^&]*$/, "");
        url = url.replace(/\/(?:shorts|live)\//, "/embed/");
      }
      return `![${this.title}](${url})`;
    }
    return `[${this.title}](${url})`;
  }

  filterParamsFromUrl(url: string): string {
    url = url.replace(/"/g, '');
    const urlParts = url.split('?');
    if (urlParts.length === 2) {
      const queryParams = urlParts[1].split('&');
      let numericTParamFound = false;
      for (let param of queryParams) {
        const [name, value] = param.split('=');
        if (name === 't' && !isNaN(Number(value))) {
          numericTParamFound = true;
          break;
        }
        if (name === 'v') {
          return url;
        }
      }
      if (numericTParamFound) return url;
    }
    return urlParts[0];
  }
}
