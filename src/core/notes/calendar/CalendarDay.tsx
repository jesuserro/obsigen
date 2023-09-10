// CalendarDay.tsx
import React from 'react';
import { church_icon } from './../../../assets/church.js';

interface CalendarDayProps {
  dayCounter: number;
  hasNote: boolean;
}

function CalendarDay({ dayCounter, hasNote }: CalendarDayProps) {
  return (
    <div className="day-number">
      {hasNote ? <a href={`your_note_link_here`}>{dayCounter}</a> : dayCounter}
      <img className="custom-icon" src={church_icon} alt="Icon" />
    </div>
  );
}

export default CalendarDay;
