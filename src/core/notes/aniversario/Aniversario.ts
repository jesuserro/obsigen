import { App } from 'obsidian';
import { NoteGenerator } from '../NoteGenerator';

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

  constructor(app: App) {
    super(app);
    this.title = this.getTitle();
    this.setYaml();
    this.subheader = new AniversarioSubheader('').getContent();
    this.content = this.getContent();
    this.setContent();
  }

  setYaml(): void {
    const data = { ...DATA_YAML_DEFAULT, title: this.title };
    let yaml = renderToString(AniversarioYaml({data}));
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  async createNote() {
    await super.createNote(this.title, this.content);
  }

  setContent(): void {
    this.content = `${this.yaml}\n# ${this.title}\n${this.subheader}\n\n${this.content}`;
  }

  getTitle() {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${month}${day}`;
  }

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }

  getContent() {  
    return `## Santoral\n\n## Evangelio\n\n## Cumpleaños\n\n## Eventos\n\n## Meteo\n\n## Agro\n\n## Aniversarios\n### ![[${this.getCurrentDate()}]]`;
  }
}

