import React from 'react';
import { FaCalendarDay } from 'react-icons/fa';

interface CalendarDayProps {
  dayCounter: number;
  hasNote: string | false;
}

function CalendarDay({ dayCounter, hasNote }: CalendarDayProps) {
  let notePath = '';
  if (hasNote) {
    notePath = `obsidian://open?file=${encodeURIComponent(hasNote)}`;
  }

  return (
    <div className="day-container">
      {hasNote ? (
        <a href={notePath}>
          <div className="day-number">{dayCounter}</div>
        </a>
      ) : (
        <div className="day-number">{dayCounter}</div>
      )}
      {hasNote && (
        <div className="calendar-icons">
          {[...Array(6)].map((_, index) => (
            <FaCalendarDay key={index} size={12} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CalendarDay;
