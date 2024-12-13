import React from 'react';
import { FaBookOpen, FaCalendarAlt, FaClock } from 'react-icons/fa';
import BookSelector from './bible/BookSelectorUI';
import CalendarYearSelect from './calendar/CalendarYearSelect';

interface Props {
    currentYear: number;
    onAddEvent: () => void;
    onYearChange: (year: number) => void;
    onBookClick: () => void;
    isBibleView: boolean;
    isTimelineView: boolean;
    bookRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
    selectedBook: string;
    setSelectedBook: (book: string) => void;
    onTimelineClick: () => void;
    onCalendarClick: () => void; // Añadimos esta función
}

const ViewSwitcher: React.FC<Props> = ({
    currentYear,
    onAddEvent,
    onYearChange,
    onBookClick,
    isBibleView,
    isTimelineView,
    bookRefs,
    selectedBook,
    setSelectedBook,
    onTimelineClick,
    onCalendarClick // Añadimos esta función
}) => {
    return (
        <div className="view-switcher-container">
            <div className="left-section">
                <button
                    className={`switcher-button ${!isBibleView && !isTimelineView ? 'active' : ''}`}
                    onClick={() => {
                        onCalendarClick();
                    }}
                    title="Calendar View"
                >
                    <FaCalendarAlt />
                </button>
                <button
                    className={`switcher-button ${isBibleView ? 'active' : ''}`}
                    onClick={() => {
                        onBookClick();
                    }}
                    title="Bible View"
                >
                    <FaBookOpen />
                </button>
                <button
                    className={`switcher-button ${isTimelineView ? 'active' : ''}`}
                    onClick={() => {
                        onTimelineClick();
                    }}
                    title="Timeline View"
                >
                    <FaClock />
                </button>
            </div>
            <div className="right-section">
                {isBibleView || isTimelineView ? (
                    <BookSelector bookRefs={bookRefs} selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
                ) : (
                    <CalendarYearSelect currentYear={currentYear} onChange={onYearChange} onAddEvent={onAddEvent} />
                )}
            </div>
        </div>
    );
};

export default ViewSwitcher;