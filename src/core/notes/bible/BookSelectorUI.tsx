import React from 'react';
import { bibleStructure } from './BibleViewStructure';
import { scrollToBook } from './BookSelector';

interface Props {
    bookRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
    selectedBook: string;
    setSelectedBook: (book: string) => void;
}

const BookSelector: React.FC<Props> = ({ bookRefs, selectedBook, setSelectedBook }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBook = event.target.value;
        setSelectedBook(selectedBook);
        scrollToBook(selectedBook, bookRefs.current);
    };

    return (
        <div className="book-selector">
            <select value={selectedBook} onChange={handleSelectChange}>
                {Object.keys(bibleStructure).map((book) => (
                    <option key={book} value={book}>
                        {book}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BookSelector;