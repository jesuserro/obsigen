import { App } from 'obsidian';
import { NoteGenerator } from '../NoteGenerator';

import { renderToString } from 'react-dom/server';
import { DATA_YAML_DEFAULT } from '../../shared/interface/iYaml';
import { Yaml } from '../../shared/templates/Yaml';

export class Favorites {
  app: App;
  noteGenerator: NoteGenerator;

  yaml: string;
  title: string;
  content: string;
  fileName: string;

  constructor(app: App) {
    this.app = app;
    this.noteGenerator = new NoteGenerator(this.app);
  }

  getTitle() {
    return `All time favorites`;
  }

  getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  setYaml(): void {
    const title = `"${this.getTitle()}"`;
    const data = {
      ...DATA_YAML_DEFAULT,
      title: title,
    };
    let yaml = renderToString(Yaml({ data }));
    yaml = yaml.replace(/&quot;/g, '"');
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  async createNote() {
    this.title = this.getTitle();
    this.setYaml();
    this.fileName = this.getFilename();
    this.setContent();
    await this.noteGenerator.createNote(this.fileName, this.content, `100 Calendar`);
  }

  setContent(): void {
    let body = `## Descripción\n`;
    body += `## Sumario\n`;

    // Generar un único dataview sin tener en cuenta la fecha
    const dataview = `\`\`\` dataview\nTABLE date, rating FROM "/" WHERE favorite = true SORT date DESC\n\`\`\``;

    body += dataview;

    this.content = `${this.yaml}\n${body}`;
  }

  // Eliminar el parámetro year de esta función
  getFilename() {
    return `Favorites`;
  }
}
