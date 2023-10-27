import { ItemView, WorkspaceLeaf } from 'obsidian';
export const CALENDAR_VIEW_TYPE = 'obsigen-calendar-view';
export const CONTAINER_ID = "obsigen-calendar-container";

import { CalendarEvent, FormValues } from './CalendarEvent';
import CalendarYear from './CalendarYear';

import React from "react";
import ReactDOM from "react-dom/client";
import { AppContext } from './../../shared/appContext';


export class CalendarView extends ItemView {
    private reactComponent: React.ReactElement;
    private today: Date;

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
        this.today = new Date();
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
        
        const handleAddEvent = async () => {
            await new CalendarEvent(this.app, this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate()).openModal()
            .then((values: FormValues) => {
                // Manejar los valores del evento si es necesario
                // console.log(values);
            })
            .catch((error) => {
                // Manejar el error si es necesario
                console.error(error);
            });
        };

        // Crear el botón y agregar el evento onClick
        const button = React.createElement('button', { onClick: handleAddEvent }, 'Add Event');
        
        const currentYear = new Date().getFullYear();
        
        // Modificar la salida global en el createRoot
        this.reactComponent = React.createElement(
            AppContext.Provider, { value: this.app }, 
            button, 
            React.createElement(CalendarYear, { year: currentYear })
        );

        ReactDOM.createRoot(this.contentEl as HTMLElement).render(this.reactComponent);
    }

}