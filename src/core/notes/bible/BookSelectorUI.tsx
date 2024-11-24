import React from 'react';
import { bibleStructure } from './BibleViewStructure';
import { scrollToBook } from './BookSelector';

interface Props {
    bookRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}

const BookSelector: React.FC<Props> = ({ bookRefs }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBook = event.target.value;
        scrollToBook(selectedBook, bookRefs.current);
    };

    return (
        <div className="book-selector">
            <select onChange={handleSelectChange}>
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