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
  
  constructor(app: App) {
    super(app);
    this.setYaml();
    this.subheader = new MomentoSubheader('').getContent();
  }

  getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${year}${month}${day}${hour}${minute}`;
  }

  setYaml(): void {
    const data = { ...DATA_YAML_DEFAULT, title: this.title };
    let yaml = renderToString(MomentoYaml({data}));
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  async createNote(title: string, content: string) {
    this.title = this.getTitle(title);
    this.fileName = this.getFilename(title);
    this.setContent(content);
    await super.createNote(this.fileName, this.content);
  }

  setContent(content: string): void {
    this.content = `${this.yaml}\n# ${this.title}\n${this.subheader}\n\n${content}`;
  }

  getTitle(title: string) {
    return `${title}`;
  }

  getFilename(title: string) {
    return `${this.getCurrentDate()} ${title}`;
  }

  getContent() {  
    return ``;
  }
}








