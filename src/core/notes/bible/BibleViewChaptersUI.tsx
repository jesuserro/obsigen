import { App } from 'obsidian';
import React, { useEffect, useRef, useState } from 'react';
import { getChapterImages, openLocationNote, openNote } from './BibleViewChapters';
import { BibleImage, bibleStructure } from './BibleViewStructure';

interface Props {
    app: App;
    bookRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
    selectedBook: string;
    setSelectedBook: (book: string) => void;
}

interface ChapterImage extends BibleImage {
    verseRange: [number, number];
    pericopeTitle: string;
    title: string;
    alt: string;
    rating?: number;
    verseTitle?: string;
    versePassage?: string;
    locations?: string[];
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
    const [chapterImages, setChapterImages] = useState<{ [key: string]: ChapterImage[] }>({});
    const containerRef = useRef<HTMLDivElement>(null);

    const fetchImages = async () => {
        const images: { [key: string]: ChapterImage[] } = {};
        for (const [book, data] of Object.entries(bibleStructure)) {
            for (const [chapterNumber, chapterInfo] of Object.entries(data.chapters)) {
                images[`${book}-${chapterNumber}`] = await getChapterImages(chapterInfo, app, book, chapterNumber);
            }
        }
        setChapterImages(images);
    };

    useEffect(() => {
        fetchImages();
    }, [app]);

    useEffect(() => {
        const selectedBookRef = bookRefs.current[selectedBook];
        if (selectedBookRef) {
            selectedBookRef.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }, [selectedBook, bookRefs, chapterImages]);

    return (
        <div className="bible-view-chapters" ref={containerRef}>
            <div className="books-grid">
                {Object.entries(bibleStructure).map(([book, data]) => (
                    <div key={book} className="book-container" ref={(el) => (bookRefs.current[book] = el)} data-book={book}>
                        <h2>{book}</h2>
                        <div className="chapters-grid">
                            {Object.entries(data.chapters).map(([chapterNumber, chapterInfo]) => {
                                const images = chapterImages[`${book}-${chapterNumber}`] || [];

                                return (
                                    <div key={chapterNumber} className="chapter-container">
                                        <h3>
                                            {chapterNumber} {chapterInfo.title}
                                        </h3>
                                        {images.length > 0 && (
                                            <div className="image-gallery">
                                                {images.map((image: ChapterImage, index) => (
                                                    <div
                                                        key={index}
                                                        className="image-container"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            openNote(app, book, chapterNumber, image.verseRange);
                                                        }}
                                                    >
                                                        <img
                                                            src={image.path}
                                                            alt={image.alt}
                                                            className="thumbnail"
                                                        />
                                                        {image.rating !== undefined && image.rating !== null && (
                                                            <div className={`rating-overlay ${getRatingClass(image.rating)}`}>
                                                                {image.rating}
                                                            </div>
                                                        )}
                                                        <div className="verse-range-overlay">
                                                            {image.verseRange[0]}-{image.verseRange[1]}
                                                        </div>
                                                        {image.verseTitle && (
                                                            <div className="verse-title-overlay">
                                                                {image.verseTitle}
                                                            </div>
                                                        )}
                                                        {image.versePassage && (
                                                            <div className="verse-passage-overlay">
                                                                {image.versePassage}
                                                            </div>
                                                        )}
                                                        {image.locations && image.locations.length > 0 && (
                                                            <div className="locations-overlay">
                                                                {image.locations.map((location, locIndex) => (
                                                                    <a
                                                                        key={locIndex}
                                                                        className="location-link"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            openLocationNote(app, location);
                                                                        }}
                                                                    >
                                                                        {location}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        )}
                                                        <div className="map-overlay" onClick={(e) => e.stopPropagation()}>
                                                            <a href="obsidian://mapview?do=open&centerLat=31.248198284958146&centerLng=35.166091863065965&chosenMapSource=0&linkColor=red&mapZoom=10&name=Default&query=&showLinks=false" target="_blank">Map</a>
                                                        </div>
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