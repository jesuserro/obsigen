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
      aliases: ['alias1', 'alias2'],
      title: 'Note Title',
      date: new Date(),
      creation: new Date(),
      updated: new Date(),
      url: 'https://example.com/note',
      author: 'John Doe',
      people: 'Jane Smith',
      parent: ['parent1', 'parent2'],
      tags: ['tag1', 'tag2'],
      locations: ['location1', 'location2'],
      rating: 7,
      emotion: 8,
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