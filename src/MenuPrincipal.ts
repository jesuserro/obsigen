import { App, Menu, Notice } from 'obsidian';
import { NoteGenerator } from './NoteGenerator';
import { iYaml } from './interface/Yaml';

export class MenuPrincipal extends Menu {
	
  app: App;
  data: iYaml;
  
  constructor(app: App, data: iYaml) {
		super();

    this.app = app;
    this.data = data;

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
    
    await new NoteGenerator(this.app).createNote(this.data);
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