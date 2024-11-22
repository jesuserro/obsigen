import React from 'react';
import { getChapterImages } from './BibleViewChapters';
import { bibleStructure } from './BibleViewStructure';

const BibleChaptersView: React.FC = () => {
  return (
    <div className="bible-view-chapters">
      <div className="books-grid">
        {Object.entries(bibleStructure).map(([book, data]) => (
          <div key={book} className="book-container">
            <h2>{book}</h2>
            <div className="chapters-grid">
              {Object.entries(data.chapters).map(([chapterNumber, chapterInfo]) => {
                const images = getChapterImages(chapterInfo);

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
