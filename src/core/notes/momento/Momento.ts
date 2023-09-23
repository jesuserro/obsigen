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
  
  constructor(app: App) {
    super(app);
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

  setYaml(): void {
    const link = `"[[${this.getCurrentDate()}]]"`;
    const data = {
      ...DATA_YAML_DEFAULT,
      title: this.title,
      links: [...DATA_YAML_DEFAULT.links, link] 
    };
    let yaml = renderToString(Yaml({ data }));
    yaml = yaml.replace(/&quot;/g, '"');
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  async createNote(title: string, content: string) {
    this.title = this.getTitle(title);
    this.setYaml();
    this.fileName = this.getFilename(this.title);
    this.setContent(content);
    await super.createNote(this.fileName, this.content, `100 Calendar/Moments`);
  }

  setContent(content: string): void {
    this.content = `${this.yaml}\n# ${this.title}\n${content}`;
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
}








