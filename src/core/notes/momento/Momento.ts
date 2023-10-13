import { App } from 'obsidian';
import { NoteGenerator } from './../NoteGenerator';

import { renderToString } from 'react-dom/server';
import { DATA_YAML_DEFAULT } from './../../shared/interface/iYaml';
import { Yaml } from './../../shared/templates/Yaml';

export class Momento extends NoteGenerator {

  app: App;
  yaml: string;
  title: string;
  subheader: string;
  content: string;
  fileName: string;
  callout: string;
  startDate: string | null;
  icon: string | null;
  description: string;

  constructor(app: App, startDate: string | null = null, icon: string | null = null) {
    super(app);
    this.startDate = startDate;
    this.icon = icon;
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

  setYaml() {
    const link = `"[[${this.getCurrentDate()}]]"`;
    const data = {
      ...DATA_YAML_DEFAULT,
      title: this.title,
      links: [...DATA_YAML_DEFAULT.links, link],
    };
    if (this.startDate) {
      data.date = new Date(this.startDate);
    }
    if (this.icon) {
      data.cssclasses.push(this.icon);
    }
    let yaml = renderToString(Yaml({ data }));
    yaml = yaml.replace(/&quot;/g, '"');
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  async createNote(title: string, content: string, startDate?: string, icon?: string, description?: string) {
    this.title = this.getTitle(title);
    this.startDate = startDate || null;
    this.icon = icon || null;
    this.description = description || '';
    this.setYaml();
    this.fileName = this.getFilename(this.title);
    this.setContent(content);
    await super.createNote(this.fileName, this.content, `100 Calendar/Moments`);
  }

  setContent(content: string) {
    this.content = `${this.yaml}\n# ${this.title}\n${content}`;
  }

  getTitle(title: string) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return `${title}`;
  }

  getFilename(title: string) {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    
    let datePart = this.startDate || this.getCurrentDateTime();
    if (this.startDate) {
      const [startYear, startMonth, startDay] = this.startDate.split('-');
      return `${startYear}${startMonth.padStart(2, '0')}${startDay.padStart(2, '0')}${hour}${minute} ${title}`;
    }
  
    return `${datePart} ${title}`;
  }
  
  
  getContent() {
    return ``;
  }
}