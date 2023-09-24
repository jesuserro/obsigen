import { ItemView, WorkspaceLeaf } from 'obsidian';
export const CALENDAR_VIEW_TYPE = 'obsigen-calendar-view';
export const CONTAINER_ID = "obsigen-calendar-container";

import CalendarYear from './CalendarYear';

import React from "react";
import ReactDOM from "react-dom/client";
import { AppContext } from "./../../shared/appContext";

export class CalendarView extends ItemView {
    calendarEl: HTMLElement;

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

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
        this.contentEl.id = CONTAINER_ID;
    }
}