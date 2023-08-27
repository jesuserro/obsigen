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
        const daysInFirstWeek = 7 - firstDayOfWeek; // Days to be left blank in the first week

        const weeks = Math.ceil((daysInMonth - daysInFirstWeek) / 7) + 1; // Add 1 for the first week

        const table = document.createElement('table');
        table.className = 'calendar-table';

        const headerRow = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            const dayIndex = (i + firstDayOfWeek) % 7;
            const dayName = this.getDayName(dayIndex);
            const headerCell = document.createElement('th');
            headerCell.textContent = dayName;
            headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);

        let dayCounter = 1;
        for (let week = 0; week < weeks; week++) {
            const weekRow = document.createElement('tr');
            for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
                const dayIndex = (dayOfWeek + firstDayOfWeek) % 7;
                const dayCell = document.createElement('td');
                if (week === 0 && dayOfWeek < firstDayOfWeek) {
                    // Leave the cell empty in the first week if it's before the first day
                    dayCell.textContent = '';
                } else if (dayCounter <= daysInMonth) {
                    dayCell.textContent = dayCounter.toString();
                    dayCounter++;
                }
                weekRow.appendChild(dayCell);
            }
            table.appendChild(weekRow);
        }

        container.appendChild(table);
        return container;
    }

    getDaysInCurrentMonth() {
        // Calculate the number of days in the current month
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        return new Date(currentYear, currentMonth + 1, 0).getDate();
    }

    getFirstDayOfWeek(date: Date): number {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        let dayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, and so on

        // Adjust to consider Monday as the first day of the week
        dayOfWeek = (dayOfWeek + 6) % 7; // Convert Sunday (0) to 6 (Saturday), shift other days back

        return dayOfWeek;
    }


    getDayName(dayOfWeek: number): string {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days[dayOfWeek];
    }
}
