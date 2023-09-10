import { TFile } from 'obsidian';
import React from 'react';
import CalendarDay from './CalendarDay';



function getFirstDayOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1);
}

function getLastDayOfMonth(year: number, month: number): Date {
  return new Date(year, month + 1, 0);
}

function getDayOffset(dayOfWeek: number): number {
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
}

function calculateNumRows(numDaysInMonth: number, dayOffset: number): number {
  return Math.ceil((numDaysInMonth + dayOffset) / 7);
}

function createDaysGrid(numRows: number, numDaysInMonth: number, dayOffset: number, files: TFile[]): JSX.Element[] {
  const daysGrid = [];

  for (let row = 0; row < numRows; row++) {
    const cells = [];

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      const dayIndex = row * 7 + dayOfWeek + 1 - dayOffset;
      const isWithinMonth = dayIndex >= 1 && dayIndex <= numDaysInMonth;

      const hasNote = checkIfNoteExistsForDay(dayIndex, files);

      cells.push(
        <td key={dayOfWeek} className={isWithinMonth ? 'within-month' : 'outside-month'}>
          {dayIndex > 0 && dayIndex <= numDaysInMonth ? (
            <CalendarDay dayCounter={dayIndex} hasNote={hasNote} />
          ) : (
            <span className="empty-day">{''}</span>
          )}
        </td>
      );
    }

    daysGrid.push(<tr key={row}>{cells}</tr>);
  }

  return daysGrid;
}

function checkIfNoteExistsForDay(dayIndex: number, files: TFile[]): string | false {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const dayDate = `${year}${String(month).padStart(2, '0')}${String(dayIndex).padStart(2, '0')}`;
  const notePath = `100 Calendar/Daily/${year}/${dayDate}.md`;

  const note = files.find(file => file.path === notePath);

  if (note?.path) {
    return note.path;
  }

  return false;
}

function CalendarMonth(files: TFile[] ) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const lastDayOfMonth = getLastDayOfMonth(currentYear, currentMonth);
  const numDaysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const dayOffset = getDayOffset(firstDayOfWeek);
  const numRows = calculateNumRows(numDaysInMonth, dayOffset);

  const daysGrid = createDaysGrid(numRows, numDaysInMonth, dayOffset, files);

  return (
    <table className="calendar-table">
      <thead>
        <tr>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
      </thead>
      <tbody>{daysGrid}</tbody>
    </table>
  );
}

export default CalendarMonth;
