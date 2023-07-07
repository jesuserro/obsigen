import { App } from 'obsidian';
import { NoteGenerator } from './../NoteGenerator';

import { renderToString } from 'react-dom/server';
import { DATA_YAML_DEFAULT } from './../../shared/interface/iYaml';
import { MomentoYaml } from './MomentoYaml';

import { MomentoSubheader } from './MomentoSubheader';

export class Momento extends NoteGenerator {

  app: App;
  yaml: string;
  title: string;
  subheader: string;
  content: string;
  fileName: string;
  callout: string;
  
  constructor(app: App) {
    super(app);
  }

  getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${year}${month}${day}${hour}${minute}`;
  }

  getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }

  setYaml(): void {
    const data = { ...DATA_YAML_DEFAULT, title: this.title };
    let yaml = renderToString(MomentoYaml({data}));
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  async createNote(title: string, content: string) {
    this.title = this.getTitle(title);
    this.setYaml();
    this.subheader = new MomentoSubheader('').getContent();
    this.fileName = this.getFilename(this.title);
    this.callout = this.getCallout();
    this.setContent(content);
    await super.createNote(this.fileName, this.content, `100 Calendar/Moments`);
  }

  setContent(content: string): void {
    this.content = `${this.yaml}\n${this.callout}\n# ${this.title}\n${this.subheader}\n\n${content}`;
  }

  getTitle(title: string) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return `${title}`;
  }

  getFilename(title: string) {
    return `${this.getCurrentDateTime()} ${title}`;
  }

  getContent() {  
    return ``;
  }

  getCallout() {  
    return `%%\n[[${this.getCurrentDate()}]], [[Tareas]], [[Erro Iribarren Jesús|mismemorias]], [[Momentazos]]\n%%`;
  }
}








