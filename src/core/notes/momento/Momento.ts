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
  locations: string;
  urls: string;

  constructor(app: App) {
    this.app = app;
    this.noteGenerator = new NoteGenerator(this.app);
    this.startDate = new Date();
    this.icon = "";
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    this.day = this.date.getDate();
    this.hour = this.date.getHours();
    this.minute = this.date.getMinutes();
    this.locations = "";
    this.urls = "";
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
      locations: [...DATA_YAML_DEFAULT.locations, this.locations],
      urls: [...DATA_YAML_DEFAULT.urls, this.urls]
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

  async createNote(path: string, title: string, content: string, startDate?: Date, icon?: string, description?: string, locations?: string, urls:string = '') {
    
    if(path === '') {
      path = `100 Calendar/${this.year}/${this.month.toString().padStart(2, '0')}/${this.day.toString().padStart(2, '0')}`;
    }
    
    this.title = this.getTitle(title);
    this.startDate = startDate || null;
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
    this.setYaml();
    this.fileName = this.getFilename(this.title);
    this.setContent(content);
    
    await this.noteGenerator.createNote(this.fileName, this.content, path);
  }

  setContent(content: string) {
    let mediaContent = "";
    // For each this.urls array element, get the media content
    this.urls.split(',').forEach((url: string) => {
      mediaContent += this.getMedia(url) + "\n";
    });
    this.content = `${this.yaml}\n# ${this.title}\n${mediaContent}\n${content}`;
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