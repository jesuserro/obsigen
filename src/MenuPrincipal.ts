import { App, Menu, Notice } from 'obsidian';
import { NoteGenerator } from './NoteGenerator';
import { DATA_YAML } from './interface/Yaml';

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
    
    await new NoteGenerator(this.app, DATA_YAML).createNote("Patata", "Lorem Ipsum");
    // await new NoteGenerator(this.app).createNoteFromYamlFile(this.data);
  }

  onClickNotaDelDia() {
    new Notice("Creando Nota del Día");
  }

	onOpen() {
		
	}

	onClose() {
		
	}
}