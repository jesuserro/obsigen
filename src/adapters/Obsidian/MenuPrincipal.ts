import { App, Menu, Notice } from 'obsidian';
import { Aniversario } from '../../core/notes/aniversario/Aniversario';
import { CaptureUrl } from '../../core/notes/captureUrl/CaptureUrl';
import { CaptureUrlModal } from '../../core/notes/captureUrl/CaptureUrlModal';
import { Daily } from '../../core/notes/daily/Daily';
import { Momento } from '../../core/notes/momento/Momento';
import { PromptModal } from './PromptModal';

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
      title: "Capture URL",
      icon: "link",
      onClick: async () => {
        new Notice(`Creating ${this.menuItems[0].title}`);
        const promptModal = new CaptureUrlModal("Capturar Url", "", "");
        await promptModal.openModal();
        const { title, url } = promptModal.getFormValues();
        await new CaptureUrl(this.app).createNote(title, url);
      }
    });

    this.addSeparator(); 

    this.addMenuItem({
      title: "Momentazo",
      icon: "calendar-plus",
      onClick: async () => {
        new Notice(`Creando ${this.menuItems[1].title}`);
        const promptModal = new PromptModal("Momentazo", "", false);
        await promptModal.openModal();
        const title = promptModal.getValue();
        await new Momento(this.app).createNote(title, ``);
      }
    });

    this.addMenuItem({
      title: "Nota de hoy",
      icon: "calendar",
      onClick: () => {
        new Notice(`Creando ${this.menuItems[2].title}`);
        new Daily(this.app).createNote();
      }
    });

    this.addMenuItem({
      title: "Aniversario",
      icon: "cake",
      onClick: () => {
        new Notice(`Creando ${this.menuItems[3].title}`);
        new Aniversario(this.app).createNote();
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
