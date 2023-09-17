import { ItemView } from 'obsidian';
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
        const files = this.app.vault.getMarkdownFiles();
        const htmlTitle = renderToString(CalendarTitle());
        const htmlMonth = renderToString(CalendarMonth(files));
        container.innerHTML = htmlMonth;
        
        return container;
    }
}
