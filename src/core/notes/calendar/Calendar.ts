import { App } from 'obsidian';
import { NoteGenerator } from '../NoteGenerator';

export class Calendar extends NoteGenerator {
    constructor(app: App) {
        super(app);
        this.app = app;
        this.addCalendarView();
    }

    addCalendarView() {
        const calendarView = this.createCalendarView();

        const newLeaf = this.app.workspace.getLeaf();
        if (newLeaf) {
            const contentContainer = newLeaf.view.containerEl;
            contentContainer.empty(); // Clear existing content if any
            contentContainer.appendChild(calendarView);
        }
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
                    dayNumber.innerHTML = `<a href="100 Calendar/Daily/2023/${dayDate}.md">${dayCounter}</a><br />[${dayCounter}](${dayDate})`; // Use the file-path attribute

                    // Create the icon container
                    const iconContainer = document.createElement('div');
                    iconContainer.setAttribute('width', '24');
                    iconContainer.setAttribute('height', '24');
                    iconContainer.className = 'clickable-icon side-dock-ribbon-action my-plugin-ribbon-class';
                    iconContainer.setAttribute('class', 'clickable-icon side-dock-ribbon-action my-plugin-ribbon-class');
                    iconContainer.setAttribute('aria-label', 'Icon');
                    iconContainer.setAttribute('data-tooltip-position', 'top');
                    iconContainer.setAttribute('data-tooltip-delay', '300');

                    // Create the SVG icon
                    const customIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    customIcon.setAttribute('width', '24');
                    customIcon.setAttribute('height', '24');
                    customIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                    customIcon.setAttribute('viewBox', '0 0 24 24');
                    customIcon.setAttribute('fill', 'none');
                    customIcon.setAttribute('stroke', 'currentColor');
                    customIcon.setAttribute('stroke-width', '2');
                    customIcon.setAttribute('stroke-linecap', 'round');
                    customIcon.setAttribute('stroke-linejoin', 'round');
                    customIcon.setAttribute('class', 'svg-icon lucide-calendar');

                    // Append the SVG icon to the container
                    iconContainer.appendChild(customIcon);
                    dayCell.appendChild(iconContainer);

                    

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = 'Event';
                    dayCell.appendChild(dayNumber);
                    dayCell.appendChild(input);

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
