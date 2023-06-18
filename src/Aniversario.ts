import { App } from 'obsidian';
import { NoteGenerator } from './NoteGenerator';

export class Aniversario extends NoteGenerator {
  constructor(app: App) {
    super(app);
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.title = `${month}${day}`;
  }

  async createNote() {
    const content = 'Aniversario';
    this.title = this.getCurrentDate();
    this.content = content;
    this.setFileName();
    this.setYaml();
    this.prepareContent();
    await this.createNoteInVault();
  }

  getCurrentDate() {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${month}${day}`;
  }
}

