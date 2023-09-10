import { ItemView, TFile } from 'obsidian';
import { church_icon } from './../../../assets/church.js';
export const CALENDAR_VIEW_TYPE = 'calendar-view';

import { renderToString } from 'react-dom/server';
import CalendarMonth from './CalendarMonth';
import CalendarTitle from './CalendarTitle';



export class CalendarView extends ItemView {
    calendarEl: HTMLElement;

    getViewType(): string {
        return CALENDAR_VIEW_TYPE;
    }

    getDisplayText(): string {
        return 'Month Calendar';
    }

    getIcon(): string {
        return 'calendar-days';
    }

    async onOpen() {
        this.contentEl.empty();
        this.calendarEl = this.createCalendarView();
        this.contentEl.appendChild(this.calendarEl);
    }

    createCalendarView() {
        const container = document.createElement('div');
        container.className = 'calendar-container';

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        
        const htmlTitle = renderToString(CalendarTitle());
        container.innerHTML = htmlTitle;

        const htmlMonth = renderToString(CalendarMonth());
        container.innerHTML = htmlMonth;
        
        const table = document.createElement('table');
        table.className = 'calendar-table';
        table.appendChild(this.createHeaderRow());

        const files = this.app.vault.getMarkdownFiles();
        const { daysInMonth, firstDayOfWeek } = this.getDateInfo(currentDate);
        
        const daysGrid = this.createDaysGrid(files, daysInMonth, firstDayOfWeek, currentYear, currentDate);
        table.appendChild(daysGrid);

        container.appendChild(table);
        return container;
    }

    createHeaderRow(): HTMLElement {
        const headerRow = document.createElement('tr');
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            const dayName = this.getDayName(dayOfWeek);
            const headerCell = document.createElement('th');
            headerCell.textContent = dayName;
            headerRow.appendChild(headerCell);
        }
        return headerRow;
    }

    getDateInfo(date: Date) {
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const firstDayOfWeek = this.getFirstDayOfWeek(date);
        return { daysInMonth, firstDayOfWeek };
    }

    createDaysGrid(files: TFile[], daysInMonth: number, firstDayOfWeek: number, currentYear: number, currentDate: Date): HTMLElement {
        const daysGrid = document.createElement('tbody');
        let dayCounter = 1;
        const weeks = Math.ceil((daysInMonth + firstDayOfWeek) / 7);

        for (let week = 0; week < weeks; week++) {
            const weekRow = document.createElement('tr');
            for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
                const dayCell = document.createElement('td');
                if (week === 0 && dayOfWeek < firstDayOfWeek) {
                    dayCell.textContent = '';
                } else if (dayCounter <= daysInMonth) {
                    const dayNumber = this.createDayNumber(dayCounter, files, currentYear, currentDate);
                    dayCell.appendChild(dayNumber);
                    dayCounter++;
                }
                weekRow.appendChild(dayCell);
            }
            daysGrid.appendChild(weekRow);
        }
        return daysGrid;
    }

    createDayNumber(dayCounter: number, files: TFile[], currentYear: number, currentDate: Date): HTMLElement {
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        const dayDate = this.getDateString(currentDate.getFullYear(), currentDate.getMonth(), dayCounter);
        const note = files.find(file => file.path === `100 Calendar/Daily/${currentYear}/${dayDate}.md`);

        if (note) {
            const noteLink = this.createNoteLink(dayCounter, note.path);
            dayNumber.appendChild(noteLink);
        } else {
            dayNumber.textContent = dayCounter.toString();
        }

        
        // Create an <img> element
        const img = document.createElement('img');
        img.setAttribute('class', 'custom-icon');
        img.src = church_icon;
        dayNumber.appendChild(img);


        return dayNumber;
    }

    createNoteLink(dayCounter: number, notePath: string): HTMLElement {
        const noteLink = document.createElement('a');
        noteLink.href = `obsidian://open?vault=${encodeURIComponent(this.app.vault.getName())}&file=${encodeURIComponent(notePath)}`;
        noteLink.textContent = dayCounter.toString();
        noteLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.app.workspace.openLinkText(notePath, '', true);
        });
        return noteLink;
    }

    getFirstDayOfWeek(date: Date): number {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        let dayOfWeek = firstDayOfMonth.getDay();
        dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Monday as the first day
        return dayOfWeek;
    }

    getDayName(dayOfWeek: number): string {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days[dayOfWeek];
    }

    getDateString(year: number, month: number, day: number): string {
        const monthStr = (month + 1).toString().padStart(2, '0');
        const dayStr = day.toString().padStart(2, '0');
        return `${year}${monthStr}${dayStr}`;
    }

    getEventoIcon(): string {
        // const imagePath = '100 Calendar/Moments/Anexos/Screenshot_20230315-220809_YouTube.jpg';
        // img.src = `100 Calendar/Moments/Anexos/Screenshot_20230315-220809_YouTube.jpg`;
        // img.src = `obsidian://open?vault=vault&file=100%20Calendar%2FMoments%2FAnexos%2FScreenshot_20230315-220809_YouTube.jpg`;
        // img.src = `obsidian://advanced-uri?vault=vault&filepath=100%2520Calendar%252FMoments%252FAnexos%252FScreenshot_20230315-220809_YouTube.jpg`;
        // img.src = `obsidian://open?vault=vault&file=${encodeURIComponent(imagePath)}`;
        // img.src = `file://${encodeURIComponent(imagePath)}`;
        // img.src = `app://${encodeURIComponent(imagePath)}`;
        // img.src = `https://img.freepik.com/vector-gratis/jesucristo-personaje-religioso_24877-57385.jpg?w=1380&t=st=1693669773~exp=1693670373~hmac=6c4415e6bbc9fac841f7a5fc7c2c768597f2ab1e732f077fcd90e26fa2c93fa1`;

        let imagePath = 'vault/100 Calendar/Icons/church.svg';

        imagePath = `file://${encodeURIComponent(imagePath)}`;


        return imagePath;  
    }

    getNotasDeHoy() {
        /*
        const today = new Date().toISOString().slice(0, 10);
        const files = this.app.vault.getMarkdownFiles();
        // const files = this.app.vault.getFiles();
        const notasDeHoy = files.filter(file => {
            const cache = this.app.metadataCache.getFileCache(file);
            // Get todays date in format YYYY-MM-DD
            
            return cache?.frontmatter?.date?.toString()?.includes(today);
        });
        // console.log("Hoola", notasDeHoy);
        // Foreach notasDeHoy, add name and link to contentEl
        notasDeHoy.forEach(file => {
            const cache = this.app.metadataCache.getFileCache(file);
            const title = cache?.frontmatter?.title;
            const link = document.createElement('a');
            link.href = file.path;
            link.innerText = title;
            contentEl.appendChild(link);
            // Add a separator
            contentEl.appendChild(document.createElement('br'));
        });
        */
    }

    openLeafTutorial() {
        /*
        const newLeaf = this.app.workspace.getLeaf();
        if (newLeaf) {
            const contentContainer = newLeaf.view.containerEl;
            contentContainer.empty(); // Clear existing content if any
            contentContainer.appendChild(calendarView);
        }
        */
    }

    openSettingsTutorial() {
        //  new Setting(contentEl).setName('Calendar View').setDesc('This is a calendar view').addText(text => { text.setPlaceholder('Placeholder text').setValue('Initial value') });
    }
}
