import { App, Menu, Notice } from 'obsidian';
import { NoteGenerator } from './NoteGenerator';

interface MenuItem {
  title: string;
  icon: string;
  action: () => void;
}

export class MenuPrincipal extends Menu {
  app: App;
  menuItems: MenuItem[];

  constructor(app: App) {
    super();
    this.app = app;
    this.menuItems = [];

    this.addMenuItem({
      title: "Test",
      icon: "test-tube-2",
      action: () => this.onClickTest()
    });

    this.addSeparator();

    this.addMenuItem({
      title: "Aniversario",
      icon: "cake",
      action: () => this.onClickAniversario()
    });

    this.addMenuItem({
      title: "Nota de hoy",
      icon: "calendar",
      action: () => this.onClickNotaDelDia()
    });

    this.addMenuItem({
      title: "Simple Mass",
      icon: "church",
      action: () => this.onClickSimpleMass()
    });
  }

  addMenuItem(item: MenuItem) {
    this.menuItems.push(item);
    this.addItem((menu) =>
      menu
        .setTitle(item.title)
        .setIcon(item.icon)
        .onClick(() => item.action())
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

  onOpen() {}

  onClose() {}
}
