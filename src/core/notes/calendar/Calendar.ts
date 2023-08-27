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

        const daysInMonth = this.getDaysInCurrentMonth();

        for (let day = 1; day <= daysInMonth; day++) {
            const daySquare = document.createElement('div');
            daySquare.className = 'day-square';
            daySquare.textContent = day.toString();
            container.appendChild(daySquare);
        }

        return container;
    }

    getDaysInCurrentMonth() {
        // Calculate the number of days in the current month
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        return new Date(currentYear, currentMonth + 1, 0).getDate();
    }
}
