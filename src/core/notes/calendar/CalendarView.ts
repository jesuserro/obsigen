import { ItemView, WorkspaceLeaf } from 'obsidian';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppContext } from './../../shared/appContext';
import { CalendarEvent, FormValues } from './CalendarEvent';
import CalendarYear from './CalendarYear';
import YearSelect from './YearSelect';

export const CALENDAR_VIEW_TYPE = 'obsigen-calendar-view';
export const CONTAINER_ID = 'obsigen-calendar-container';

export class CalendarView extends ItemView {
  private reactComponent: React.ReactElement;
  private root: ReactDOM.Root;
  private currentYear: number;
  private today: Date;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
    this.today = new Date();
    this.currentYear = this.today.getFullYear();
    this.root = ReactDOM.createRoot(this.contentEl as HTMLElement);
  }

  private handleAddEvent = async () => {
    await new CalendarEvent(this.app, this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate())
      .openModal()
      .then((values: FormValues) => {
        // Manejar los valores del evento si es necesario
        // console.log(values);
      })
      .catch((error) => {
        // Manejar el error si es necesario
        console.error(error);
      });
  };

  private handleYearChange = (selectedYear: number) => {
    this.currentYear = selectedYear; // Actualizar el año seleccionado
    this.renderComponent();
  };

  private renderComponent() {
    
    this.reactComponent = React.createElement(
      AppContext.Provider,
      { value: this.app },
      React.createElement('button', { onClick: this.handleAddEvent }, 'Add Event'),
      React.createElement(YearSelect, { currentYear: this.currentYear, onChange: this.handleYearChange }),
      React.createElement(CalendarYear, { year: this.currentYear })
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
