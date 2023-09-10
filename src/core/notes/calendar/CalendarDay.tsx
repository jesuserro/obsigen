// CalendarDay.tsx
import React from 'react';
import { church_icon } from './../../../assets/church.js';

interface CalendarDayProps {
  dayCounter: number;
  hasNote: string | false;
}

function CalendarDay({ dayCounter, hasNote }: CalendarDayProps) {
  let notePath = '';
  if (hasNote) {
    // Replace this with your Obsidian vault name
    const vaultName = encodeURIComponent('YourVaultName');
    notePath = `obsidian://open?file=${encodeURIComponent(hasNote)}`;
  }

  return (
    <div className="day-number">
      {hasNote ? (
        <div>
          <a href={notePath}>{dayCounter}</a>
          <img className="custom-icon" src={church_icon} alt="Icon" />
        </div>
      ) : (
        dayCounter
      )}
    </div>
  );
}

export default CalendarDay;
