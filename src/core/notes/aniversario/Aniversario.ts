import { App } from 'obsidian';
import { NoteGenerator } from './../NoteGenerator';

import { renderToString } from 'react-dom/server';
import { DATA_YAML_DEFAULT } from './../../shared/interface/iYaml';
import { Yaml } from './../../shared/templates/Yaml';

export class Aniversario {

  app: App;
  noteGenerator: NoteGenerator;
  
  yaml: string;
  title: string;
  subheader: string;
  content: string;
  fileName: string;
  
  constructor(app: App) {
    this.app = app;
    this.noteGenerator = new NoteGenerator(this.app);
  }

  getCurrentDate() {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${month}${day}`;
  }

  getCurrentDateLong() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }

  setYaml(): void {
    const title = `"${this.getCurrentDate()}"`;
    const links = `${this.getAniversarioCrumbs()}`;
    const data = {
      ...DATA_YAML_DEFAULT,
      title: title,
      links: [...DATA_YAML_DEFAULT.links, links] 
    };
    let yaml = renderToString(Yaml({ data }));
    yaml = yaml.replace(/&quot;/g, '"');
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  async createNote() {
    this.title = this.getCurrentDate();
    this.setYaml();
    this.fileName = this.getFilename();
    this.setContent();
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    await this.noteGenerator.createNote(this.fileName, this.content, `100 Calendar/Aniversaries/${month}`);
  }

  setContent(): void {
    this.content = `${this.yaml}\n# ${this.title}\n${this.getBody()}\n`;
  }

  getFilename() {
    return `${this.getCurrentDate()}`;
  }

  getBody() {  
    return `## Santoral\n\n## Evangelio\n\n## Cumpleaños\n\n## Eventos\n\n## Meteo\n\n## Agro\n\n## Aniversarios\n### ![[${this.getCurrentDateLong()}]]`;
  }

  getAniversarioCrumbs() {
    const now = new Date();
    const yesterday = new Date(now.setDate(now.getDate() - 1));
    const tomorrow = new Date(now.setDate(now.getDate() + 2));
    const yesterdayDate = this.formatDate(yesterday, '');
    const tomorrowDate = this.formatDate(tomorrow, '');
    return `"[[${yesterdayDate}]]", "[[${tomorrowDate}]]"`;
  }

  formatDate(date: Date, separator: string) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}${separator}${day}`;
  }
}








