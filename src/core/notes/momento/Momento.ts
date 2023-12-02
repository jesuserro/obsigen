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
  startDate: string | null;
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
    this.startDate = "";
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
    
    let locations = '';
    if (this.locations) {
      locations = `"[[${this.locations}]]"`;
    }
    let urls = '';
    if (this.urls) {
      urls = `"[[${this.urls}]]"`;
    }
    const link = `"[[${this.getCurrentDate()}]]"`;
    // Mon Dec 04 2023 10:35:00 GMT+0100 (hora estándar de Europa central)
    // console.log(this.date);
    
    const data = {
      ...DATA_YAML_DEFAULT,
      title: this.title,
      date: this.date,
      links: [...DATA_YAML_DEFAULT.links, link],
      locations: [...DATA_YAML_DEFAULT.locations, locations],
      urls: [...DATA_YAML_DEFAULT.urls, urls],
    };
    
    if (this.icon) {
      data.cssclasses.push(this.icon);
    }
    let yaml = renderToString(Yaml({ data }));
    yaml = yaml.replace(/&quot;/g, '"');
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  async createNote(title: string, content: string, startDate?: string, icon?: string, description?: string, locations?: string, urls:string = '') {
    this.title = this.getTitle(title);
    this.startDate = startDate || null;
    if (this.startDate) {
      this.date = new Date(this.startDate);
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth();
      this.day = this.date.getDate();
    }
    this.icon = icon || null;
    this.description = description || '';
    this.locations = locations || '';
    this.urls = urls || '';
    this.setYaml();
    this.fileName = this.getFilename(this.title);
    this.setContent(content);
    await this.noteGenerator.createNote(this.fileName, this.content, `100 Calendar/Moments`);
  }

  setContent(content: string) {
    this.content = `${this.yaml}\n# ${this.title}\n${content}`;
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
}