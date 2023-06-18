import { App, Menu, Notice } from 'obsidian';
import { NoteGenerator } from './NoteGenerator';

interface MenuItem {
  title: string;
  icon: string;
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
      onClick: async () => {
        new Notice(`Creando ${this.menuItems[0].title}`);
        await new NoteGenerator(this.app).createNote("Test", "Lorem ipsum dolor sit amet.");
      }
    });

    this.addSeparator(); 

    this.addMenuItem({
      title: "Aniversario",
      icon: "cake",
      onClick: () => {
        new Notice(`Creando ${this.menuItems[1].title}`);
      }
    });

    this.addMenuItem({
      title: "Nota de hoy",
      icon: "calendar",
      onClick: () => {
        new Notice(`Creando ${this.menuItems[2].title}`);
      }
    });

    this.addMenuItem({
      title: "Simple Mass",
      icon: "church",
      onClick: () => {
        new Notice(`Creando ${this.menuItems[3].title}`);
      }
    });
  }

  addMenuItem(item: MenuItem & { onClick: () => void }) {
    this.menuItems.push(item);
    this.addItem((menu) =>
      menu
        .setTitle(item.title)
        .setIcon(item.icon)
        .onClick(() => item.onClick())
    );
  }

  onOpen() {}

  onClose() {}
}
