import { ItemView, WorkspaceLeaf } from 'obsidian';
import React from 'react';
import ReactDOM from 'react-dom/client';
import BibleView from '../bible/BibleViewUI'; // Importar la vista de la Biblia
import { AppContext } from './../../shared/appContext'; // Contexto compartido
import { CalendarEvent, FormValues } from './CalendarEvent';
import CalendarHeader from './CalendarHeader';
import CalendarYear from './CalendarYear';

export const CALENDAR_VIEW_TYPE = 'obsigen-calendar-view';
export const CONTAINER_ID = 'obsigen-calendar-container';

export class CalendarView extends ItemView {
  private reactComponent: React.ReactElement;
  private root: ReactDOM.Root;
  private currentYear: number;
  private today: Date;
  private isBibleView: boolean;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
    this.today = new Date();
    this.currentYear = this.today.getFullYear();
    this.isBibleView = false;
    this.root = ReactDOM.createRoot(this.contentEl as HTMLElement);
  }

  private handleAddEvent = async () => {
    const strDate = `${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()}`;
    const date = new Date(strDate);
    await new CalendarEvent(this.app, date)
      .openModal()
      .then((values: FormValues) => {
        // Manejar los valores del evento si es necesario
      })
      .catch((error) => {
        console.error(error);
      });
  };

  private handleYearChange = (selectedYear: number) => {
    this.currentYear = selectedYear;
    this.renderComponent();
  };

  private handleBookClick = () => {
    this.isBibleView = !this.isBibleView;
    this.renderComponent();
  };

  private renderComponent() {
    // Obtener metadataCache y files
    const metadataCache = this.app.metadataCache;
    const files = this.app.vault.getMarkdownFiles(); // Obtener archivos de markdown del vault

    // Verificar que files y metadataCache estén correctamente inicializados
    if (!files || files.length === 0 || !metadataCache) {
      console.error("Archivos o metadataCache no disponibles");
      return;
    }

    this.reactComponent = React.createElement(
      AppContext.Provider,
      { value: this.app },
      React.createElement(CalendarHeader, {
        currentYear: this.currentYear,
        onAddEvent: this.handleAddEvent,
        onYearChange: this.handleYearChange,
        onBookClick: this.handleBookClick,
        isBibleView: this.isBibleView, // Pasar el estado actual de la vista
      }),
      this.isBibleView
        ? React.createElement(BibleView, {
            app: this.app,
            metadataCache: metadataCache,
            files: files,
          })
        : React.createElement(CalendarYear, { key: this.currentYear, year: this.currentYear })
    );
    this.root.render(this.reactComponent);
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
    this.renderComponent();
  }
}
