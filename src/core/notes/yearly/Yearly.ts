import { App } from 'obsidian';
import { NoteGenerator } from '../NoteGenerator';

import { renderToString } from 'react-dom/server';
import { DATA_YAML_DEFAULT } from '../../shared/interface/iYaml';
import { Yaml } from '../../shared/templates/Yaml';


export class Yearly {
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

  getTitle(year: number) {
    return `Resumen del año ${year}`;
  }

  getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  setYaml(year: number): void {
    const title = `"${this.getTitle(year)}"`;
    const data = {
      ...DATA_YAML_DEFAULT,
      title: title,
    };
    let yaml = renderToString(Yaml({ data }));
    yaml = yaml.replace(/&quot;/g, '"');
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  async createNote(year: number) {
    this.title = this.getTitle(year);
    this.setYaml(year);
    this.fileName = this.getFilename(year);
    this.setContent(year);
    await this.noteGenerator.createNote(this.fileName, this.content, `100 Calendar`);
  }

  setContent(year: number): void {
    const monthsContent = this.getMonthsContent(year);
    this.content = `${this.yaml}\n${monthsContent}`;
  }

  getFilename(year: number) {
    return `${year} Summary`;
  }

  getMonthsContent(year: number): string {
    let monthsContent = '';

    for (let month = 1; month <= 12; month++) {
      const paddedMonth = month.toString().padStart(2, '0');
      const monthName = new Date(`${year}-${paddedMonth}-01`).toLocaleString('default', { month: 'long' });

      const dataview = this.getMonthDataview(year, month);
      const monthSection = `## ${monthName}\n${dataview}\n`;

      monthsContent += monthSection;
    }

    return monthsContent;
  }

  getMonthDataview(year: number, month: number): string {
    const paddedMonth = month.toString().padStart(2, '0');
    return `\`\`\` dataview\nTABLE date, rating FROM "/" WHERE (rating > 7 OR favorite = true) AND contains(date,"${year}-${paddedMonth}") SORT date\n\`\`\``;
  }
}

