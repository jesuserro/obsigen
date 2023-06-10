import { App, Menu, Notice } from 'obsidian';
import { NoteGenerator } from './NoteGenerator';

export class MenuPrincipal extends Menu {
	
  app: App;
  
  constructor(app: App) {
		super();

    this.app = app;

    this.addItem((item) =>
      item
        .setTitle("Aniversario")
        .setIcon("cake")
        .onClick(() => this.onClickAniversario())
    );

    this.addItem((item) =>
      item
        .setTitle("Nota de hoy")
        .setIcon("calendar")
        .onClick(() => this.onClickNotaDelDia())
    );
	}

  async onClickAniversario() {
    new Notice("Creando Aniversario");
    await new NoteGenerator(this.app).createEmptyNote();
  }

  onClickNotaDelDia() {
    new Notice("Creando Nota del Día");
  }

	onOpen() {
		
	}

	onClose() {
		
	}
}