import React from 'react';
import { FaBookOpen, FaCalendarAlt } from 'react-icons/fa'; // Import icons
import BookSelector from './bible/BookSelectorUI';
import CalendarYearSelect from './calendar/CalendarYearSelect';

interface ViewSwitcherProps {
    currentYear: number;
    onAddEvent: () => void;
    onYearChange: (selectedYear: number) => void;
    onBookClick: () => void;
    isBibleView: boolean;
    bookRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
    selectedBook: string;
    setSelectedBook: (book: string) => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
    currentYear,
    onAddEvent,
    onYearChange,
    onBookClick,
    isBibleView,
    bookRefs,
    selectedBook,
    setSelectedBook,
}) => {
    return (
        <div className="view-switcher-container">
            <div className="left-section">
                <button
                    onClick={() => !isBibleView && onBookClick()}
                    className={`switcher-button ${!isBibleView ? 'active' : ''}`}
                >
                    <FaCalendarAlt />
                </button>
                <button
                    onClick={() => isBibleView && onBookClick()}
                    className={`switcher-button ${isBibleView ? 'active' : ''}`}
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