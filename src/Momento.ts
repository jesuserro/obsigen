

import { App } from 'obsidian';
import { NoteGenerator } from './NoteGenerator';

export class Momento extends NoteGenerator {
  constructor(app: App) {
    super(app);
    this.title = `${this.getCurrentDate()}_Momento`;
  }

  getCurrentDate() {
    const now = new Date();
    const madridTime = now.toLocaleString('es-ES').replace(/[^\d]/g, '');
    return madridTime.slice(0, 12);
  }

  setFileName() {
    const fileName = `${this.getCurrentDate()} ${this.title}`;
    super.setFileName(fileName);
  }
}








