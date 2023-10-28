import React from 'react';
import YearSelect from './YearSelect';

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
    <div className="header-container">
      <button onClick={onAddEvent}>Add Event</button>
      <YearSelect currentYear={currentYear} onChange={onYearChange} />
    </div>
  );
};

export default CalendarHeader;
