import { App, Menu } from 'obsidian';
import { Yearly } from 'src/core/notes/yearly/Yearly';
import { Aniversario } from '../../core/notes/aniversario/Aniversario';
import { Calendar } from '../../core/notes/calendar/Calendar';
import { CalendarEvent } from '../../core/notes/calendar/CalendarEvent';
import { CaptureUrl } from '../../core/notes/captureUrl/CaptureUrl';
import { CaptureUrlModal } from '../../core/notes/captureUrl/CaptureUrlModal';
import { Daily } from '../../core/notes/daily/Daily';

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

    const date = new Date();
    let year = date.getFullYear();
    const yearSelect = document.getElementById("obs-year-picker") as HTMLSelectElement;
    if (yearSelect) {
      year = parseInt(yearSelect.value, 10);
    }
    const month = date.getMonth() + 1;
    const day = date.getDate();

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
        await new CalendarEvent(app, year, month, day).openModal();
      }
    });

    this.addMenuItem({
      title: "Nota de hoy",
      icon: "calendar",
      onClick: () => {
        new Daily(this.app).createNote();
      }
    });

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
      title: "Refresh Calendar",
      icon: "calendar-check-2",
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
