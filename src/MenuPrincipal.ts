import { App, Menu, Notice } from 'obsidian';
import { NoteGenerator } from './NoteGenerator';
import { iYaml } from './interface/Yaml';

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
    const data: iYaml = {
      title: 'Patata',
      aliases: ['alias1', 'alias2'],
      date: new Date()
    };
    await new NoteGenerator(this.app).createNote(data);
  }

  onClickNotaDelDia() {
    new Notice("Creando Nota del Día");
  }

	onOpen() {
		
	}

	onClose() {
		
	}
}