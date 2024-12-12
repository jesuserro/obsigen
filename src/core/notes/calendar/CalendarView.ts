import { ItemView, WorkspaceLeaf } from "obsidian";
import React from "react";
import ReactDOM from "react-dom/client";
import BibleChaptersView from "../bible/BibleViewChaptersUI";
import TimelineView from "../timeline/TimelineUI";
import { AppContext } from "./../../shared/appContext";
import { bibleStructure } from "./../bible/BibleViewStructure";
import ViewSwitcher from "./../ViewSwitcher";
import CalendarYear from "./CalendarYear";

export const CALENDAR_VIEW_TYPE = "obsigen-calendar-view";
export const CONTAINER_ID = "obsigen-calendar-container";

export class CalendarView extends ItemView {
    private reactComponent: React.ReactElement;
    private root: ReactDOM.Root;
    private currentYear: number;
    private today: Date;
    private isBibleView: boolean;
    private isTimelineView: boolean; // Añadir esta línea
    private bookRefs: React.MutableRefObject<{
        [key: string]: HTMLDivElement | null;
    }>;
    private selectedBook: string;
    private scrollPosition: number = 0;
    private forceUpdate: boolean = false; // Añadir esta línea

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
        this.today = new Date();
        this.currentYear = this.today.getFullYear();
        this.isBibleView = false;
        this.isTimelineView = false; // Añadir esta línea
        this.bookRefs = { current: {} } as React.MutableRefObject<{
            [key: string]: HTMLDivElement | null;
        }>;
        this.selectedBook = Object.keys(bibleStructure)[0]; // Default to the first book
        this.root = ReactDOM.createRoot(this.contentEl as HTMLElement);
    }

    private handleAddEvent = async () => {
        // Your existing code
    };

    private handleYearChange = (selectedYear: number) => {
        this.currentYear = selectedYear;
        this.renderComponent();
    };

    private handleBookClick = () => {
        this.isBibleView = !this.isBibleView;
        this.isTimelineView = false; // Añadir esta línea
        this.renderComponent();
    };

    private handleTimelineClick = () => {
        this.isTimelineView = !this.isTimelineView; // Añadir esta línea
        this.isBibleView = false; // Añadir esta línea
        this.renderComponent();
    };

    private setSelectedBook = (book: string) => {
        this.selectedBook = book;
        this.renderComponent();
    };

    private saveScrollPosition = () => {
        const container = this.contentEl.querySelector(".bible-view-chapters");
        if (container) {
            this.scrollPosition = container.scrollTop;
        }
    };

    private restoreScrollPosition = () => {
        const container = this.contentEl.querySelector(".bible-view-chapters");
        if (container) {
            container.scrollTop = this.scrollPosition;
        }
    };

    // Reemplaza CalendarHeader con ViewSwitcher en el método renderComponent
    private renderComponent() {
        this.reactComponent = React.createElement(
            AppContext.Provider,
            { value: this.app },
            React.createElement(ViewSwitcher, {
                currentYear: this.currentYear,
                onAddEvent: this.handleAddEvent,
                onYearChange: this.handleYearChange,
                onBookClick: this.handleBookClick,
                onTimelineClick: this.handleTimelineClick, // Añadir esta línea
                isBibleView: this.isBibleView,
                isTimelineView: this.isTimelineView, // Añadir esta línea
                bookRefs: this.bookRefs,
                selectedBook: this.selectedBook,
                setSelectedBook: this.setSelectedBook,
            }),
            this.isBibleView
                ? React.createElement(BibleChaptersView, {
                        app: this.app,
                        bookRefs: this.bookRefs,
                        selectedBook: this.selectedBook,
                        setSelectedBook: this.setSelectedBook,
                  })
                : this.isTimelineView // Añadir esta línea
                ? React.createElement(TimelineView, { // Añadir esta línea
                        app: this.app, // Añadir esta línea
                        bookRefs: this.bookRefs, // Añadir esta línea
                        selectedBook: this.selectedBook, // Añadir esta línea
                        setSelectedBook: this.setSelectedBook, // Añadir esta línea
                  }) // Añadir esta línea
                : React.createElement(CalendarYear, {
                        key: this.currentYear,
                        year: this.currentYear,
                  })
        );
        this.root.render(this.reactComponent);
        this.restoreScrollPosition();
    }

    getViewType(): string {
        return CALENDAR_VIEW_TYPE;
    }

    getDisplayText(): string {
        return "Month Calendar";
    }

    getIcon(): string {
        return "calendar-days";
    }

    async onOpen() {
        this.forceUpdate = true; // Añadir esta línea
        this.renderComponent();
    }

    async onClose() {
        this.saveScrollPosition(); // Guardar la posición del scroll antes de cerrar
    }
}