import { App } from 'obsidian';
import { NoteGenerator } from './../NoteGenerator';

export class Momento extends NoteGenerator {
  constructor(app: App) {
    super(app);
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
  
  setFileName() {
    const fileName = `${this.getCurrentDate()} ${this.title}`;
    super.setFileName(fileName);
  }
}








