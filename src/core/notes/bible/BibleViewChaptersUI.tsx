import { App } from 'obsidian'; // Importar el tipo App
import React from 'react';
import { getChapterImages } from './BibleViewChapters';
import { bibleStructure } from './BibleViewStructure';

interface Props {
  app: App; // Objeto de la aplicación
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
                        {images.map((image, index) => (
                          <img
                            key={index}
                            src={image.path}
                            alt={image.altText || `Imagen del capítulo ${chapterNumber}`}
                            className="thumbnail"
                          />
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
