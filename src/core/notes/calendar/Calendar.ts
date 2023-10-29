import { App } from 'obsidian';
import { CALENDAR_VIEW_TYPE } from './CalendarView';

export class Calendar {
    app: App;

    constructor(app: App) {

        this.app = app;

        this.addCalendarView();
    }

    addCalendarView() {

        this.app.workspace.detachLeavesOfType(CALENDAR_VIEW_TYPE);

        const leaf = this.app.workspace.getRightLeaf(false);
        

        leaf.setViewState({
            type: CALENDAR_VIEW_TYPE,
            active: true,   
        });

        this.app.workspace.revealLeaf(leaf);
    }
}
