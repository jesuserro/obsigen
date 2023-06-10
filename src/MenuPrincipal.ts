import { Menu, Notice } from 'obsidian';

export class MenuPrincipal extends Menu {
	constructor() {
		super();

    this.addItem((item) =>
      item
        .setTitle("Aniversario")
        .setIcon("cake")
        .onClick(() => {
          new Notice("Creando Aniversarioo");
        })
    );

    this.addItem((item) =>
      item
        .setTitle("Nota de hoy")
        .setIcon("calendar")
        .onClick(() => {
          new Notice("Creando nota del día");
        })
    );
	}

	onOpen() {
		
	}

	onClose() {
		
	}
}