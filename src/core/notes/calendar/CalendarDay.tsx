import { TFile } from 'obsidian';
import React from 'react';
import { FaCalendarDay } from 'react-icons/fa';

interface CalendarDayProps {
  dayCounter: number;
  hasNote: string | false;
  dayNotes: TFile[] | false;
}

function CalendarDay({ dayCounter, hasNote, dayNotes }: CalendarDayProps) {
  let notePath = '';
  if (hasNote) {
    notePath = `obsidian://open?file=${encodeURIComponent(hasNote)}`;
  }

  return (
    <div className="day-container">
      {hasNote && !dayNotes ? (
        <a href={notePath} title={getFileName(hasNote)}>
          <div className="day-number">{dayCounter}</div>
        </a>
      ) : hasNote && dayNotes ? (
        <>
          <a href={notePath} title={getFileName(hasNote)}>
            <div className="day-number">{dayCounter}</div>
          </a>
          <div className="calendar-icons">
            {dayNotes.map((note, index) => (
              <a
                key={index}
                href={`obsidian://open?file=${encodeURIComponent(note.path)}`}
                title={getFileName(note.path)}
              >
                <FaCalendarDay key={index} size={12} style={{ color: getRandomColor() }} />
              </a>
            ))}
          </div>
        </>
      ) : dayNotes ? (
        <>
          <div className="day-number">{dayCounter}</div>
          <div className="calendar-icons">
            {dayNotes.map((note, index) => (
              <a
                key={index}
                href={`obsidian://open?file=${encodeURIComponent(note.path)}`}
                title={getFileName(note.path)}
              >
                <FaCalendarDay key={index} size={12} style={{ color: getRandomColor() }} />
              </a>
            ))}
          </div>
        </>
      ) : (
        <div className="day-number">{dayCounter}</div>
      )}
    </div>
  );
}

function getRandomColor() {
  // Generate a random color in hexadecimal format
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function getFileName(path: string): string {
  // Extract the file name from the path
  const parts = path.split('/');
  return parts[parts.length - 1];
}

export default CalendarDay;
