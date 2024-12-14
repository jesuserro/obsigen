import { App } from 'obsidian';
import React, { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Note, fetchChapterNotes, openNote } from './BibleViewChapters';
import { bibleStructure } from './BibleViewStructure';

interface Props {
    app: App;
    bookRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
    selectedBook: string;
    setSelectedBook: (book: string) => void;
}

const getRatingClass = (rating: number) => {
    if (rating === 10) return 'rating-10';
    if (rating === 9) return 'rating-9';
    if (rating === 8) return 'rating-8';
    if (rating === 7) return 'rating-7';
    if (rating === 6) return 'rating-6';
    if (rating === 5) return 'rating-5';
    return '';
};

const BibleChaptersView: React.FC<Props> = ({ app, bookRefs, selectedBook, setSelectedBook }) => {
    const [chapterNotes, setChapterNotes] = useState<{ [key: string]: Note[] }>({});
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchNotes = async () => {
            const notes = await fetchChapterNotes(app);
            setChapterNotes(notes);
        };
        fetchNotes();
    }, [app]);

    useEffect(() => {
        const selectedBookRef = bookRefs.current[selectedBook];
        if (selectedBookRef) {
            selectedBookRef.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }, [selectedBook, bookRefs, chapterNotes]);

    // Añadir este efecto para forzar la actualización del componente
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollTop;
        }
    }, [containerRef.current]);

    // Añadir este efecto para ajustar el scroll al libro seleccionado cada vez que se renderiza la vista
    useEffect(() => {
        const selectedBookRef = bookRefs.current[selectedBook];
        if (selectedBookRef) {
            selectedBookRef.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }, [bookRefs, selectedBook]);

    return (
        <div className="bible-view-chapters" ref={containerRef}>
            <div className="books-grid">
                {Object.entries(bibleStructure).map(([book, data]) => (
                    <div key={book} className="book-container" ref={(el) => (bookRefs.current[book] = el)} data-book={book}>
                        <h2>{book}</h2>
                        <div className="chapters-grid">
                            {Object.entries(data.chapters).map(([chapterNumber, chapterInfo]) => {
                                const notes = chapterNotes[`${book}-${chapterNumber}`] || [];

                                return (
                                    <div key={chapterNumber} className="chapter-container">
                                        <h3>
                                            {chapterNumber} {chapterInfo.title}
                                        </h3>
                                        {notes.length > 0 && (
                                            <div className="image-gallery">
                                                {notes.map((note: Note, index) => (
                                                    <div
                                                        key={index}
                                                        className="image-container"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            openNote(app, book, chapterNumber, note.verseRange);
                                                        }}
                                                    >
                                                        <img
                                                            src={note.cover}
                                                            alt={note.alt}
                                                            className="thumbnail"
                                                        />
                                                        {note.rating !== undefined && note.rating !== null && (
                                                            <div className={`rating-overlay ${getRatingClass(note.rating)}`}>
                                                                {note.rating}
                                                            </div>
                                                        )}
                                                        <div className="verse-range-overlay">
                                                            {note.verseRange[0]}-{note.verseRange[1]}
                                                        </div>
                                                        {note.coordinates && (
                                                            <div className="map-overlay" onClick={(e) => e.stopPropagation()}>
                                                                <a href={`obsidian://mapview?do=open&centerLat=${note.coordinates[0]}&centerLng=${note.coordinates[1]}&chosenMapSource=0&linkColor=red&mapZoom=13&name=Default&query=&showLinks=true&fitBounds=true&showName=true&showPins=true&pinColor=red`} target="_blank" title={note.locations ? note.locations[0].replace(/\[\[|\]\]/g, '') : ''}>
                                                                    <FaMapMarkerAlt /> {/* Usamos el icono de marcador */}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BibleChaptersView;