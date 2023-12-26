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
  callout: string;
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
  twitterRegexp: RegExp;
  youtubeRegexp: RegExp;

  constructor(date: Date) {
    
    this.icon = "";
    
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.seconds = date.getSeconds();
    this.locations = "";
    this.urls = "";
    this.type = "";
    this.path = "/";
    this.tags = "";

    this.startDate = date;
    this.date = this.startDate;

    this.twitterRegexp = new RegExp('https?://(?:mobile\\.)?twitter\\.com/.*');
    this.youtubeRegexp = new RegExp('https?://(?:www\\.)?(?:youtube\\.com/.*|youtu\\.be/.*|.*\\.youtube\\.com/.*shorts)');
  }

  getCurrentTime() {
    const now = this.date;
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${hour}${minute}`;
  }

  getCurrentDate() {
    const now = this.date;
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }

  setYaml() {
    
    const link = `"[[${this.getCurrentDate()}]]"`;
    const data = {
      ...DATA_YAML_DEFAULT,
      title: this.title,
      date: this.convertDateToIsoString(this.date),
      links: [...DATA_YAML_DEFAULT.links, link],
      locations: this.getListForYamlProperty(this.locations, true),
      urls: this.getListForYamlProperty(this.urls),
      tags: [...DATA_YAML_DEFAULT.tags, this.tags],
    };
    
    data.cssclasses = [];
    if (this.icon) {
      data.cssclasses.push(this.icon);
    }
    let yaml = renderToString(Yaml({ data }));
    yaml = yaml.replace(/&quot;/g, '"');
    yaml = yaml.replace(/&amp;/g, '&');
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  convertDateToIsoString(date: Date){
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  async createNote(type: string, app: App, title: string, content: string, icon?: string, description?: string, locations?: string, urls:string = '', tags: string = '') {
    
    this.app = app;
    this.noteGenerator = new NoteGenerator(this.app);

    this.title = this.getTitle(title);
    if (this.startDate) {
      this.date = this.startDate;
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth() + 1;
      this.day = this.date.getDate();
    }
    this.icon = icon || null;
    this.description = description || '';
    this.locations = locations || '';
    this.urls = this.cleanUrls(urls) || '';
    this.tags = tags || '';
    this.setYaml();
    this.fileName = this.getFilename(this.title);
    this.setContent(content);

    this.path = this.getPath(type);
    
    await this.noteGenerator.createNote(this.fileName, this.content, this.path);
  }

  getPath(type:string){
    const pathFechaMomento = `100 Calendar/${this.year}/${this.month.toString().padStart(2, '0')}/${this.day.toString().padStart(2, '0')}`;
    if(type == "Moment"){
      return pathFechaMomento;
    }else if(type == "Capture"){
      return `000 Inbox/Captures`;
    }else if(type == "Content Map"){
      return `200 Content Maps`;
    }else if(type == "Person"){
      return pathFechaMomento;
    }
    return "/";
  }

  private cleanUrls(urls: string) {
    return urls.split(',').map(url => this.cleanUrl(url)).join(',');
  }

  setContent(content: string) {
    const mediaContent = this.getMediaContent();
    this.content = `${this.yaml}\n# ${this.title}\n${mediaContent}\n${content}`;
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
  
  private getMediaContent() {
    if (this.urls === "") return "";
    return this.urls.split(',').map(url => this.getUrlForContent(url.trim())).join('\n');
  }

  getTitle(title: string) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return `${title}`;
  }

  getFilename(title: string) {
    return `${this.getFilePrefix()} ${title}`;
  }

  getFilePrefix() {
    return `${this.getCurrentDate()}${this.getCurrentTime()}`;
  }
  
  getContent() {
    return ``;
  }

  getUrlForContent(url: string) {

    if (this.twitterRegexp.test(url) || this.youtubeRegexp.test(url)) {
      if (this.youtubeRegexp.test(url)) {
        return `![${this.title}](${url})`;
      }
    }

    return '';
  }

  cleanUrl(url: string) {
    url = this.filterParamsFromUrl(url);

    if (this.twitterRegexp.test(url) || this.youtubeRegexp.test(url)) {
      if (this.youtubeRegexp.test(url)) {
        url = url.replace(/(\?|&)si=[^&]*$/, "");
        url = url.replace(/\/(?:shorts|live)\//, "/embed/");
      }
    }
    return url.trim();
  }

  filterParamsFromUrl(url: string): string {
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
    return urlParts[0];
  }
}
