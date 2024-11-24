import React from 'react';
import CalendarYearSelect from './CalendarYearSelect';

interface CalendarHeaderProps {
  currentYear: number;
  onAddEvent: () => void;
  onYearChange: (selectedYear: number) => void;
  onBookClick: () => void;
  isBibleView: boolean;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentYear,
  onAddEvent,
  onYearChange,
  onBookClick,
  isBibleView,
}) => {
  return (
    <div className="header-container">
      <button onClick={onBookClick} className="switcher-button">
        {isBibleView ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-calendar"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 1 0V1zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-book-fill"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1h7a.5.5 0 0 1 0 1H1v12h6.5a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5v-13z"/>
            <path d="M2 2v12h6.5a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5H2z"/>
            <path d="M10.5 1h-1v14h1a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z"/>
          </svg>
        )}
      </button>

      {!isBibleView && (
        <div className="year-selector-container">
          <CalendarYearSelect 
            currentYear={currentYear} 
            onChange={onYearChange} 
            onAddEvent={onAddEvent}  // Pasar la prop onAddEvent
          />
        </div>
      )}
    </div>
  );
};

export default CalendarHeader;