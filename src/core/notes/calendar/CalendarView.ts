import { ItemView } from 'obsidian';

export const CALENDAR_VIEW_TYPE = 'calendar-view';

export class CalendarView extends ItemView {

    calendarEl: HTMLElement;
    
    getViewType(): string {
        return CALENDAR_VIEW_TYPE; // Set a unique identifier for your ItemView
    }


    getDisplayText(): string {
        return 'Month Calendar'; // Set the display text for your ItemView
    }

    async onOpen() {
        const { contentEl } = this;
        // contentEl.createEl("h1", { text: "Calendar View" });
        // contentEl.setText('Calendar View 2 [[20230901]]');

        contentEl.empty(); // Clear existing content if any

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


        this.calendarEl = this.createCalendarView();
        /*
        const newLeaf = this.app.workspace.getLeaf();
        if (newLeaf) {
            const contentContainer = newLeaf.view.containerEl;
            contentContainer.empty(); // Clear existing content if any
            contentContainer.appendChild(calendarView);
        }
        */

    //    new Setting(contentEl).setName('Calendar View').setDesc('This is a calendar view').addText(text => { text.setPlaceholder('Placeholder text').setValue('Initial value') });

        contentEl.appendChild(this.calendarEl);
    }

    createCalendarView() {
        const container = document.createElement('div');
        container.className = 'calendar-container';

        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
        const currentYear = currentDate.getFullYear();

        const title = document.createElement('h1');
        title.textContent = `${currentMonth} ${currentYear}`;
        container.appendChild(title);

        const daysInMonth = this.getDaysInCurrentMonth();
        const firstDayOfWeek = this.getFirstDayOfWeek(currentDate);

        const table = document.createElement('table');
        table.className = 'calendar-table';

        const headerRow = document.createElement('tr');
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            const dayName = this.getDayName(dayOfWeek);
            const headerCell = document.createElement('th');
            headerCell.textContent = dayName;
            headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);

        const files = this.app.vault.getMarkdownFiles();
        let dayCounter = 1;
        const weeks = Math.ceil((daysInMonth + firstDayOfWeek) / 7);
        for (let week = 0; week < weeks; week++) {
            const weekRow = document.createElement('tr');
            for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
                const dayCell = document.createElement('td');
                if (week === 0 && dayOfWeek < firstDayOfWeek) {
                    dayCell.textContent = '';
                } else if (dayCounter <= daysInMonth) {
                    const dayNumber = document.createElement('div');
                    dayNumber.className = 'day-number';
                    const dayDate = this.getDateString(currentDate.getFullYear(), currentDate.getMonth(), dayCounter);
        
                    // Find the note with the corresponding path
                    const note = files.find(file => file.path === `100 Calendar/Daily/${currentYear}/${dayDate}.md`);
                    
                    if (note) {
                        // If the note exists, create a link to it
                        const noteLink = document.createElement('a');
                        noteLink.href = `obsidian://open?vault=${encodeURIComponent(this.app.vault.getName())}&file=${encodeURIComponent(note.path)}`;
                        noteLink.textContent = dayCounter.toString();
                        noteLink.addEventListener('click', (e) => {
                            e.preventDefault();
                            this.app.workspace.openLinkText(note.path, '', true);
                        });
                        dayNumber.appendChild(noteLink);
                    } else {
                        // If the note doesn't exist, just print the day number
                        dayNumber.textContent = dayCounter.toString();
                    }
        
                    dayCell.appendChild(dayNumber);
                    dayCounter++;
                }
                weekRow.appendChild(dayCell);
            }
            table.appendChild(weekRow);
        }

        container.appendChild(table);
        return container;
    }

    getFirstDayOfWeek(date: Date): number {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        let dayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, and so on

        // Adjust to consider Monday as the first day of the week
        dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        return dayOfWeek;
    }

    getDayName(dayOfWeek: number): string {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days[dayOfWeek];
    }

    getDaysInCurrentMonth() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        return new Date(currentYear, currentMonth + 1, 0).getDate();
    }

    getDateString(year: number, month: number, day: number): string {
        const monthStr = (month + 1).toString().padStart(2, '0'); // Month is 0-based
        const dayStr = day.toString().padStart(2, '0');
        return `${year}${monthStr}${dayStr}`;
    }

}
