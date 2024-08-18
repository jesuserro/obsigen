import React from 'react';
import CalendarYearSelect from './CalendarYearSelect';

interface CalendarHeaderProps {
    currentYear: number;
    onAddEvent: () => void;
    onYearChange: (selectedYear: number) => void;
    onBookClick: () => void; // Nueva prop para manejar el clic en el botón del libro
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    currentYear,
    onAddEvent,
    onYearChange,
    onBookClick, // Recibe la nueva prop
}) => {
    return (
        <>
            <div className="header-container">
                <button onClick={onBookClick} className="book-button">
                    {/* Ícono de libro cerrado en SVG */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-book-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1h7a.5.5 0 0 1 0 1H1v12h6.5a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5v-13z" />
                        <path d="M2 2v12h6.5a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5H2z" />
                        <path d="M10.5 1h-1v14h1a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z" />
                    </svg>
                </button>
                <button onClick={onAddEvent}>+</button>
                <div className="year-selector-container">
                    <CalendarYearSelect currentYear={currentYear} onChange={onYearChange} />
                </div>
            </div>
        </>
    );
};

export default CalendarHeader;
