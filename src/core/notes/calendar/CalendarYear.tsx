import { App, TFile } from 'obsidian';
import React from 'react';
import CalendarMonth from './CalendarMonth';

function createMonthsGrid(files: TFile[], app: App): JSX.Element[] {
  const monthsGrid = [];

  for (let month = 0; month < 12; month++) {
    monthsGrid.push(
      <CalendarMonth key={month.toString().padStart(2, '0')} year={new Date().getFullYear()} month={month} app={app} files={files} />
    );
  }

  return monthsGrid;
}

function CalendarYear(files: TFile[], app: App) {
  const monthsGrid = createMonthsGrid(files, app);

  return (
    <div>
      <h2>{new Date().getFullYear()}</h2>
      {monthsGrid}
    </div>
  );
}

export default CalendarYear;
