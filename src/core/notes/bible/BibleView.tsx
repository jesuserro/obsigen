import React from 'react';
import { bibleStructure } from './bibleStructure'; // Importamos la estructura de la Biblia

const BibleView: React.FC = () => {
  return (
    <div className="bible-view-container">
      <h1>Vista Biblia</h1>
      <div className="books-grid">
        {Object.entries(bibleStructure).map(([book, data]) => (
          <div key={book} className="book-container">
            <h2>{book}</h2>
            <div className="chapters-grid">
              {Array.from({ length: data.chapters }, (_, i) => i + 1).map((chapter) => (
                <div key={chapter} className="chapter-container">
                  <span>Capítulo {chapter}</span>
                  {/* Aquí eventualmente se añadirán los eventos del capítulo */}
                  <div className="events-container">
                    {data.events[chapter]?.map((event, index) => (
                      <div key={index} className="event-icon">
                        {/* Renderizar el icono del evento */}
                      </div>
                    )) || <span>Sin eventos</span>}
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
