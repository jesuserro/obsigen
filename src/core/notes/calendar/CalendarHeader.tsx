import React from 'react';
import CalendarYearSelect from './CalendarYearSelect';

interface CalendarHeaderProps {
  currentYear: number;
  onAddEvent: () => void;
  onYearChange: (selectedYear: number) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentYear,
  onAddEvent,
  onYearChange,
}) => {
  return (
    <>
      <div className="header-container">
        <button onClick={onAddEvent}>Add Event</button>
        <CalendarYearSelect currentYear={currentYear} onChange={onYearChange} />
      </div>
    </>
  );
};

export default CalendarHeader;
