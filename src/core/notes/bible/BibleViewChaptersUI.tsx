import { App } from 'obsidian';
import React, { useEffect, useState } from 'react';
import { getChapterImages, openNote } from './BibleViewChapters';
import { BibleImage, bibleStructure } from './BibleViewStructure';

interface Props {
    app: App;
    bookRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}

interface ChapterImage extends BibleImage {
    verseRange: [number, number];
    pericopeTitle: string;
    title: string;
    alt: string;
    rating?: number;
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

const BibleChaptersView: React.FC<Props> = ({ app, bookRefs }) => {
    const [chapterImages, setChapterImages] = useState<{ [key: string]: ChapterImage[] }>({});

    useEffect(() => {
        const fetchImages = async () => {
            const images: { [key: string]: ChapterImage[] } = {};
            for (const [book, data] of Object.entries(bibleStructure)) {
                for (const [chapterNumber, chapterInfo] of Object.entries(data.chapters)) {
                    images[`${book}-${chapterNumber}`] = await getChapterImages(chapterInfo, app, book, chapterNumber);
                }
            }
            setChapterImages(images);
        };
        fetchImages();
    }, [app]);

    return (
        <div className="bible-view-chapters">
            <div className="books-grid">
                {Object.entries(bibleStructure).map(([book, data]) => (
                    <div key={book} className="book-container" ref={(el) => (bookRefs.current[book] = el)}>
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
                                                    <a
                                                        key={index}
                                                        href="#"
                                                        title={image.title}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            openNote(app, book, chapterNumber, image.verseRange);
                                                        }}
                                                        className="image-container"
                                                    >
                                                        <img
                                                            src={image.path}
                                                            alt={image.alt}
                                                            className="thumbnail"
                                                        />
                                                        {image.rating !== undefined && (
                                                            <div className={`rating-overlay ${getRatingClass(image.rating)}`}>
                                                                {image.rating}
                                                            </div>
                                                        )}
                                                    </a>
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