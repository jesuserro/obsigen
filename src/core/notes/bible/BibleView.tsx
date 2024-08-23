import React from 'react';
import { bibleStructure } from './bibleStructure';

const BibleView: React.FC = () => {
  return (
    <div className="bible-view-container">
      <div className="books-grid">
        {Object.entries(bibleStructure).map(([book, data]) => (
          <div key={book} className="book-container">
            <h2>{book} ({data.chapterCount})</h2>
            <div className="chapters-grid">
              {Object.entries(data.chapters).map(([chapterNumber, chapterInfo]) => (
                <div key={chapterNumber} className="chapter-container">
                  <h3>
                    {chapterNumber}
                    <sub>{chapterInfo.verseCount}</sub> {chapterInfo.title}
                  </h3>
                  <div className="pericopes-container">
                    {chapterInfo.pericopes.length > 0 ? (
                      chapterInfo.pericopes.map((pericope, index) => (
                        <div key={index} className="pericope-container">
                          <h4>
                            {pericope.title} ({pericope.verseRange[0]}-{pericope.verseRange[1]})
                          </h4>
                          <div className="events-container">
                            {pericope.events.length > 0 ? (
                              pericope.events.map((event, eventIndex) => (
                                <div
                                  key={eventIndex}
                                  className="event-icon"
                                  title={event.title}
                                />
                              ))
                            ) : (
                              <span>Sin eventos</span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <span>Sin perícopas</span>
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
