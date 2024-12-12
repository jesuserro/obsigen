import React from 'react';
import { FaBookOpen, FaCalendarAlt } from 'react-icons/fa';
import BookSelector from './bible/BookSelectorUI';
import CalendarYearSelect from './calendar/CalendarYearSelect';
import './ViewSwitcher.scss';

interface Props {
    currentYear: number;
    onAddEvent: () => void;
    onYearChange: (year: number) => void;
    onBookClick: () => void;
    isBibleView: boolean;
    bookRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
    selectedBook: string;
    setSelectedBook: (book: string) => void;
}

const ViewSwitcher: React.FC<Props> = ({
    currentYear,
    onAddEvent,
    onYearChange,
    onBookClick,
    isBibleView,
    bookRefs,
    selectedBook,
    setSelectedBook
}) => {
    return (
        <div className="view-switcher-container">
            <div className="left-section">
                <button
                    className={`switcher-button ${!isBibleView ? 'active' : ''}`}
                    onClick={onBookClick}
                    title="Calendar View"
                >
                    <FaCalendarAlt />
                </button>
                <button
                    className={`switcher-button ${isBibleView ? 'active' : ''}`}
                    onClick={onBookClick}
                    title="Bible View"
                >
                    <FaBookOpen />
                </button>
            </div>
            <div className="right-section">
                {isBibleView ? (
                    <BookSelector bookRefs={bookRefs} selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
                ) : (
                    <CalendarYearSelect currentYear={currentYear} onChange={onYearChange} onAddEvent={onAddEvent} />
                )}
            </div>
        </div>
    );
};

export default ViewSwitcher;