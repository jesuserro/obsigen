import { App } from 'obsidian';
import { renderToString } from 'react-dom/server';
import { NoteGenerator } from '../NoteGenerator';
import { DATA_YAML_DEFAULT } from './../../shared/interface/iYaml';
import { Yaml } from './../../shared/templates/Yaml';

export class CaptureUrl {

  app: App;
  yaml: string;
  title: string;
  content: string;
  fileName: string;
  noteGenerator: NoteGenerator;

  
  constructor(app: App) {
    this.app = app;
    this.noteGenerator = new NoteGenerator(this.app);
  }

  getCurrentDateTime() {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${this.getCurrentDate()}${hour}${minute}`;
  }

  getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }

  setYaml(url: string): void {
    url = this.filterParamsFromUrl(url);
    url = `"${url}"`;
    const link = `"[[${this.getCurrentDate()}]]"`;
    const data = {
      ...DATA_YAML_DEFAULT,
      title: this.title,
      date: this.convertDateToIsoString(new Date()),
      links: [...DATA_YAML_DEFAULT.links, link], 
      urls: [...DATA_YAML_DEFAULT.urls, url] 
    };
    let yaml = renderToString(Yaml({ data }));
    yaml = yaml.replace(/&quot;/g, '"');
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  async createNote(title: string, url: string) {
    this.title = this.getTitle(title);
    url = this.filterParamsFromUrl(url);
    this.setYaml(url);
    this.fileName = this.getFilename(this.title);
    this.setContent(url);
    await this.noteGenerator.createNote(this.fileName, this.content, `000 Inbox/Captures`);
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

  setContent(url: string): void {
    this.content = `${this.yaml}\n# ${this.title}\n${this.getContent(url)}\n`;
  }

  getTitle(title: string) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return `${title}`;
  }

  getFilename(title: string) {
    return `${this.getCurrentDateTime()} ${title}`;
  }

  getContent(url: string) {  
    
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

  filterParamsFromUrl(url: string): string {
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








