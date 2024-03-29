import { App } from 'obsidian';
import { renderToString } from 'react-dom/server';
import { NoteGenerator } from 'src/core/notes/NoteGenerator';
import { DATA_YAML_DEFAULT } from 'src/core/shared/interface/iYaml';
import { Yaml } from 'src/core/shared/templates/Yaml';

export class Review {

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
  cover: string;
  rating: number;
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
    
    this.cover = "";
    
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.seconds = date.getSeconds();
    this.locations = "";
    this.urls = "";
    this.type = "Review";
    this.path = "/";
    this.tags = "";
    this.title = "";
    this.rating = 0;

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
      cover: this.cover,
      cssclasses: [...DATA_YAML_DEFAULT.cssclasses, 'review'],
      rating: this.rating
    };

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

  async createNote(app: App, review: Review) {
    
    this.app = app;
    this.noteGenerator = new NoteGenerator(this.app);

    this.title = this.getTitle(review.title);
    this.date = new Date(review.date);
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    this.day = this.date.getDate();
    this.rating = review.rating * 2;
    this.cover = review.cover;
    this.locations = '';
    this.urls = this.cleanUrls(review.urls) || '';
    this.tags = review.tags || '';
    this.setYaml();
    this.fileName = this.getFilename(this.title);
    this.setContent(review.content);

    this.path = this.getPath();
    
    await this.noteGenerator.createNote(this.fileName, this.content, this.path);
  }

  getPath(){
    const pathFechaMomento = `100 Calendar/${this.year}/${this.month.toString().padStart(2, '0')}/${this.day.toString().padStart(2, '0')}`;
    return pathFechaMomento;
  }

  private cleanUrls(urls: string) {
    return urls.split(',').map(url => this.cleanUrl(url)).join(',');
  }

  setContent(content: string) {
    const mediaContent = this.htmlToMarkdown(content);
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
  
  private htmlToMarkdown(htmlText: string): string {
    // Reemplazar espacios en blanco dentro de las etiquetas
    htmlText = htmlText.replace(/(<[^\/>]*>)\s+/g, '$1');

    // Reemplazar etiquetas <em> por `
    htmlText = htmlText.replace(/<em>/g, '`');
    htmlText = htmlText.replace(/<\/em>/g, '`');

    // Reemplazar etiquetas <strong> por **
    htmlText = htmlText.replace(/<strong>/g, '**');
    htmlText = htmlText.replace(/<\/strong>/g, '**');

    // Reemplazar etiquetas <b> por **
    htmlText = htmlText.replace(/<b>/g, '**');
    htmlText = htmlText.replace(/<\/b>/g, '**');

    // Reemplazar etiquetas <i> por _
    htmlText = htmlText.replace(/<i>/g, '_');
    htmlText = htmlText.replace(/<\/i>/g, '_');

    // Reemplazar etiquetas <a> por []()
    htmlText = htmlText.replace(/<a href="(.*?)"(?: rel=".*?")?>(.*?)<\/a>/g, '[$2]($1)');

    // Reemplazar saltos de línea <br> o <br /> por '\n'
    htmlText = htmlText.replace(/<br\s*\/?>/g, '\n');

    // Reemplazar etiquetas <blockquote>Text Here</blockquote> por > Text Here
    htmlText = htmlText.replace(/<blockquote>(.*?)<\/blockquote>/g, '> $1');

    return htmlText;
    }


  getTitle(title: string) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return `${title}`;
  }

  getFilename(title: string) {
    //  Error: File name cannot contain any of the following characters: *,",\,/,<,>,:,|,?,¿,,,;
    title = title.replace(/[*"\\\/<>:|?¿,;]/g, '');
    return `${this.getFilePrefix()} ${title}`;
  }

  getFilePrefix() {
    return `${this.getCurrentDate()}${this.getCurrentTime()}`;
  }
  
  getContent() {
    return ``;
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
    if(this.twitterRegexp.test(url)){
      return urlParts[0];
    }
    return url;
  }
}
