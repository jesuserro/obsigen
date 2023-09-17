import { App, TFile } from 'obsidian';
import React from 'react';
import CalendarMonth from './CalendarMonth';

function CalendarYear(files: TFile[], app: App) {
  const currentYear = new Date().getFullYear();

  const monthsGrid = Array.from({ length: 12 }, (_, month) => (
    <CalendarMonth key={String(month).padStart(2, '0')} year={currentYear} month={month} app={app} files={files} />
  ));

  return <div>{monthsGrid}</div>;
}

export default CalendarYear;
