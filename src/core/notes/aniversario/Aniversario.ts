import { App } from 'obsidian';
import { NoteGenerator } from './../NoteGenerator';

import { renderToString } from 'react-dom/server';
import { DATA_YAML_DEFAULT } from './../../shared/interface/iYaml';
import { AniversarioYaml } from './AniversarioYaml';

import { AniversarioSubheader } from './AniversarioSubheader';

export class Aniversario extends NoteGenerator {

  app: App;
  yaml: string;
  title: string;
  subheader: string;
  content: string;
  fileName: string;
  
  constructor(app: App) {
    super(app);
    this.setYaml();
    this.subheader = new AniversarioSubheader('').getContent();
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
    const data = { ...DATA_YAML_DEFAULT, title: this.title };
    let yaml = renderToString(AniversarioYaml({data}));
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  async createNote() {
    this.title = this.getCurrentDate();
    this.fileName = this.getFilename();
    this.setContent();
    await super.createNote(this.fileName, this.content);
  }

  setContent(): void {
    this.content = `${this.yaml}\n# ${this.title}\n${this.subheader}\n\n${this.getBody()}`;
  }

  getFilename() {
    return `${this.getCurrentDate()}`;
  }

  getBody() {  
    return `## Santoral\n\n## Evangelio\n\n## Cumpleaños\n\n## Eventos\n\n## Meteo\n\n## Agro\n\n## Aniversarios\n### ![[${this.getCurrentDateLong()}]]`;
  }
}








