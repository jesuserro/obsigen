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
    // this.date = Mon Dec 04 2023 10:35:00 GMT+0100 (hora estándar de Europa central)
    
    const data = {
      ...DATA_YAML_DEFAULT,
      title: this.title,
      date: this.convertDateToIsoString(this.date),
      links: [...DATA_YAML_DEFAULT.links, link],
      locations: this.getListForYamlProperty(this.locations),
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
      this.date =this.startDate;
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth() + 1;
      this.day = this.date.getDate();
    }
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

  setContent(content: string) {
    let mediaContent = this.getMediaContent();
    this.content = `${this.yaml}\n# ${this.title}\n${mediaContent}${content}`;
  }

  private getListForYamlProperty(yamlPropertyText: string) {
    let yamlUrls = "";
    if (yamlPropertyText !== "") {
      yamlUrls = "\n";
      // For each this.urls array element, get the media content
      yamlPropertyText.split(',').forEach((url: string) => {
        url = url.trim();
        yamlUrls += `- ${this.filterParamsFromUrl(url)}\n`;
      });
    }
    // Remove last "\n" string
    yamlUrls = yamlUrls.slice(0, -1);
    return yamlUrls;
  }

  private getMediaContent() {
    let mediaContent = "";
    if (this.urls !== "") {
      // For each this.urls array element, get the media content
      this.urls.split(',').forEach((url: string) => {
        url = url.trim();
        mediaContent += this.getMedia(url) + "\n";
      });
    }
    return mediaContent;
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

  getMedia(url: string) {  
    url = this.filterParamsFromUrl(url);
    const twitterRegexp = new RegExp('https?:\\/\\/(?:mobile\\.)?twitter\\.com\\/.*');
    const youtubeRegexp = new RegExp('https?:\\/\\/(?:www\\.)?(?:youtube\\.com\\/.*|youtu\\.be\\/.*|.*\\.youtube\\.com\\/.*shorts)');

    if (twitterRegexp.test(url) || youtubeRegexp.test(url)) {
      if (youtubeRegexp.test(url)) {
        // Eliminar parámetros "si" de la URL
        url = url.replace(/(\?|\&)si=[^&]*$/, "");
        // Reemplazar "/shorts/" por "/embed/"
        url = url.replace("/shorts/", "/embed/");
        url = url.replace("/live/", "/embed/");
      }
      return `![${this.title}](${url})`;
    }
    return `[${this.title}](${url})`;
  }

  // app.js:1 Error: File name cannot contain any of the following characters: * " \ / < > : | ?
  filterParamsFromUrl(url: string): string {
    url = url.replace(/"/g, '');
    const urlParts = url.split('?'); // Dividir la URL en partes antes y después del signo de interrogación
    if (urlParts.length === 2) {
      const queryParams = urlParts[1].split('&'); // Dividir los parámetros de consulta
      let numericTParamFound = false;
  
      // Verificar cada parámetro de consulta
      for (let i = 0; i < queryParams.length; i++) {
        const param = queryParams[i];
        const paramNameValue = param.split('=');
        if (paramNameValue[0] === 't' && !isNaN(Number(paramNameValue[1]))) {
          // El parámetro "t" es numérico, mantenerlo y la URL
          numericTParamFound = true;
          break;
        }
        // Convert Youtube url like "https://www.youtube.com/watch?v=e4uWemSfpwk&t=300" to "https://www.youtube.com/embed/e4uWemSfpwk"
        // https://youtu.be/e4uWemSfpwk?si=lX1epb1wn2HSLHcM&t=201
        if (paramNameValue[0] === 'v') {
            return url;
        }
      }
  
      // Si se encontró un parámetro "t" numérico, mantener la URL completa
      if (numericTParamFound) {
        return url;
      }
    }
  
    // Si no se encontró un parámetro "t" numérico o no había parámetros de consulta, eliminar todos los parámetros
    return urlParts[0];
  } // Salida: "https://example.com/page"
}