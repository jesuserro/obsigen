import { App, Menu } from 'obsidian';
import { GoodreadsRssItemApi } from 'src/api/Goodreads/GoodreadsRssItemApi';
import { Yearly } from 'src/core/notes/yearly/Yearly';
import { Aniversario } from '../../core/notes/aniversario/Aniversario';
import { Calendar } from '../../core/notes/calendar/Calendar';
import { CalendarEvent } from '../../core/notes/calendar/CalendarEvent';
import { Daily } from '../../core/notes/daily/Daily';
import { Favorites } from '../../core/notes/favorites/Favorites';


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
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const selectedDate = new Date(`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`);

    this.addMenuItem({
        title: "Goodreads - Get To Read Shelf",
        icon: "book-open",
        onClick: async () => {
            const goodreadsRssShelf = new GoodreadsRssItemApi(app as App);
            await goodreadsRssShelf.getShelfList('to-read', 11);
            // await goodreadsRssShelf.countPagesInShelf('to-read');
        }
    });

    /*
    this.addMenuItem({
        title: "Goodreads - Get Last Review",
        icon: "book-open",
        onClick: async () => {
            const goodreadsReviews = new GoodreadsReviewsApi(app as App);
            await goodreadsReviews.getLastBookFromToReadShelf();
            // await goodreadsReviews.getReviewById('6585220665'); // El diario de la felicidad
            // await goodreadsReviews.getReviewById('2322591776'); // El Hombre Eterno
        }
    });
    */

    this.addSeparator();

    this.addMenuItem({
      title: "Momentazo",
      icon: "calendar-plus",
      onClick: async () => {
        await new CalendarEvent(app, selectedDate).openModal();
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

    this.addMenuItem({
      title: "Favoritos",
      icon: "calendar-heart",
      onClick: () => {
        new Favorites(this.app).createNote();
      }
    });

    this.addSeparator();

    this.addMenuItem({
      title: "Refresh",
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
