import { App } from 'obsidian';
import { NoteGenerator } from '../NoteGenerator';

import { renderToString } from 'react-dom/server';
import { DATA_YAML_DEFAULT } from './../../shared/interface/iYaml';
import { Yaml } from './../../shared/templates/Yaml';


export class Daily {
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

  getTitle() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const monthName = monthNames[now.getMonth()];
    const year = now.getFullYear().toString();
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const dayName = dayNames[now.getDay()];
    return `${dayName}, ${day} ${monthName} ${year}`;
  }

  getCurrentDate() {
    return this.formatDate(new Date(), '');
  }

  getCurrentDateDashed() {
    return this.formatDate(new Date(), '-');
  }

  formatDate(date: Date, separator: string) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${separator}${month}${separator}${day}`;
  }

  setYaml(): void {
    const title = `"${this.getCurrentDate()}"`;
    const links = `${this.getDailyCrumbs()}`;
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
    this.title = this.getTitle();
    this.setYaml();
    this.subheader = `${this.subheader}\n${this.getDailyCrumbs()}`;
    this.fileName = this.getFilename();
    this.setContent();
    const now = new Date();
    const year = now.getFullYear().toString();
    await this.noteGenerator.createNote(this.fileName, this.content, `100 Calendar/Daily/${year}`);
  }

  setContent(): void {
    this.content = `${this.yaml}\n# ${this.title}\n${this.getBody()}`;
  }

  getFilename() {
    return this.getCurrentDate();
  }

  getBody() {
    return `## Notas del día\n${this.getDataview()}\n`;
  }

  getDataview() {
    return `\`\`\` dataview\nTABLE date, rating FROM "/" WHERE contains(date,"${this.getCurrentDateDashed()}") AND file.name != this.file.name SORT date\n\`\`\``;
  }

  getDailyCrumbs() {
    const now = new Date();
    const yesterday = new Date(now.setDate(now.getDate() - 1));
    const tomorrow = new Date(now.setDate(now.getDate() + 2));
    const yesterdayDate = this.formatDate(yesterday, '');
    const tomorrowDate = this.formatDate(tomorrow, '');
    return `"[[${yesterdayDate}]]", "[[${this.getCurrentDate().substring(4)}]]", "[[${tomorrowDate}]]"`;
  }
}
