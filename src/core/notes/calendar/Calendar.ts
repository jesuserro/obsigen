import { App } from 'obsidian';
import { CALENDAR_VIEW_TYPE } from './CalendarView';

export class Calendar {
    app: App;

    constructor(app: App) {

        this.app = app;
    }

    async addCalendarView(): Promise<void> {
        this.app.workspace.detachLeavesOfType(CALENDAR_VIEW_TYPE);
    
        const leaf = this.app.workspace.getRightLeaf(false);
    
        // Maneja el caso donde 'leaf' es null y termina la función temprano
        if (leaf === null) {
            console.error("Unable to get right leaf.");
            return;
        }
    
        // Caso normal cuando 'leaf' no es null
        await leaf.setViewState({
            type: CALENDAR_VIEW_TYPE,
            active: true,   
        });
    
        await this.app.workspace.revealLeaf(leaf);
    }
    
}
