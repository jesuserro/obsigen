import React from 'react';
import { bibleStructure } from './bibleStructure'; // Importamos la estructura de la Biblia

const BibleView: React.FC = () => {
  return (
    <div className="bible-view-container">
      {/* <h1>Biblia</h1> */}
      <div className="books-grid">
        {Object.entries(bibleStructure).map(([book, data]) => (
          <div key={book} className="book-container">
            {/* Título del libro con el número de capítulos entre paréntesis */}
            <h2>{book} ({data.chapterCount})</h2>
            <div className="chapters-grid">
              {Object.entries(data.chapters).map(([chapterNumber, chapterInfo]) => (
                <div key={chapterNumber} className="chapter-container">
                  {/* Mostrar el número del capítulo con el número de versículos en un subíndice */}
                  <h3>
                    {chapterNumber}
                    <sub>{chapterInfo.verseCount}</sub> {chapterInfo.title}
                  </h3>
                  <div className="events-container">
                    {/* Mostrar los eventos como puntos de colores con un tooltip */}
                    {chapterInfo.events.length > 0 ? (
                      chapterInfo.events.map((event, index) => (
                        <div
                          key={index}
                          className="event-icon"
                          title={event.title} // Tooltip con el texto del evento
                        />
                      ))
                    ) : (
                      <span>Sin eventos</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BibleView;
