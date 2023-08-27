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

        const helloDiv = document.createElement('div');
        helloDiv.textContent = 'Hello World';
        container.appendChild(helloDiv);

        return container;
    }
}

