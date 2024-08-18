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
        <button onClick={onAddEvent}>+</button>
        <div className="year-selector-container">
          <CalendarYearSelect currentYear={currentYear} onChange={onYearChange} />
        </div>
      </div>
    </>
  );
};

export default CalendarHeader;
