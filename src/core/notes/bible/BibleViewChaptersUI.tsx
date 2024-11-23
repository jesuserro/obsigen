import { App } from 'obsidian'; // Importar el tipo App
import React from 'react';
import { getChapterImages, openNote } from './BibleViewChapters';
import { BibleImage, bibleStructure } from './BibleViewStructure'; // Importar BibleImage desde BibleViewStructure

interface Props {
    app: App; // Objeto de la aplicación
}

interface ChapterImage extends BibleImage {
    verseRange: [number, number];
    pericopeTitle: string; // Añadir el título de la perícopa
}

const BibleChaptersView: React.FC<Props> = ({ app }) => {
    return (
        <div className="bible-view-chapters">
            <div className="books-grid">
                {Object.entries(bibleStructure).map(([book, data]) => (
                    <div key={book} className="book-container">
                        <h2>{book}</h2>
                        <div className="chapters-grid">
                            {Object.entries(data.chapters).map(([chapterNumber, chapterInfo]) => {
                                const images = getChapterImages(chapterInfo, app);

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
                                                        title={image.pericopeTitle} // Añadir el título de la perícopa como tooltip
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            openNote(app, book, chapterNumber, image.verseRange);
                                                        }}
                                                    >
                                                        <img
                                                            src={image.path}
                                                            alt={image.altText || `Imagen del capítulo ${chapterNumber}`}
                                                            className="thumbnail"
                                                        />
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