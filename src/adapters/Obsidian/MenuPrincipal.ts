import { App, Menu } from 'obsidian';
import { Yearly } from 'src/core/notes/yearly/Yearly';
import { Aniversario } from '../../core/notes/aniversario/Aniversario';
import { Calendar } from '../../core/notes/calendar/Calendar';
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
        new Daily(this.app).createNote();
      }
    });

    let year = new Date().getFullYear();
    const yearSelect = document.getElementById("obs-year-picker") as HTMLSelectElement;
    if (yearSelect) {
      year = parseInt(yearSelect.value, 10);
    }
    this.addMenuItem({
      title: "Nota anual",
      icon: "calendar-days",
      onClick: () => {
        new Yearly(this.app).createNote(year);
      }
    });

    this.addSeparator();

    this.addMenuItem({
      title: "Aniversario",
      icon: "cake",
      onClick: () => {
        new Aniversario(this.app).createNote();
      }
    });

    this.addSeparator();

    this.addMenuItem({
      title: "Calendar",
      icon: "calendar-plus",
      onClick: () => {
        new Calendar(this.app); 
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
