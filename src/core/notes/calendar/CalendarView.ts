import { ItemView } from 'obsidian';
export const CALENDAR_VIEW_TYPE = 'calendar-view';

import CalendarYear from './CalendarYear';

import React from "react";
import ReactDOM from "react-dom/client";
import { AppContext } from "./../../shared/appContext";

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
        const reactComponent = React.createElement(AppContext.Provider, { value: this.app }, React.createElement(CalendarYear));
        ReactDOM.createRoot(this.contentEl as HTMLElement).render(reactComponent);
    }
}