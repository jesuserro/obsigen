import { App, Menu, Notice } from 'obsidian';
import { NoteGenerator } from './NoteGenerator';

export class MenuPrincipal extends Menu {
	
  app: App;
  
  constructor(app: App) {
		super();

    this.app = app;

    this.addItem((item) =>
      item
        .setTitle("Test")
        .setIcon("test-tube-2")
        .onClick(() => this.onClickTest())
    );

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

    this.addItem((item) =>
      item
        .setTitle("Simple Mass")
        .setIcon("church")
        .onClick(() => this.onClickSimpleMass())
    );
	}

  async onClickTest() {
    new Notice("Creando Test");
    await new NoteGenerator(this.app).createNote("Test", "Lorem ipsum dolor sit amet.");
  }

  onClickAniversario() {
    new Notice("Creando Aniversario");
  }

  onClickNotaDelDia() {
    new Notice("Creando Nota del Día");
  }

  onClickSimpleMass() {
    new Notice("Creando Misa sencilla");
  }

	onOpen() {
		
	}

	onClose() {
		
	}
}