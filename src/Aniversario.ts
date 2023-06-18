import { App } from 'obsidian';
import { NoteGenerator } from './NoteGenerator';

export class Aniversario extends NoteGenerator {
  constructor(app: App) {
    super(app);
    this.title = this.getCurrentDate();
  }

  async createNote() {
    await super.createNote(this.getCurrentDate(), "");
  }

  getCurrentDate() {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${month}${day}`;
  }

  setFileName() {
    this.fileName = `${this.getCurrentDate()}.md`;
  }
}

