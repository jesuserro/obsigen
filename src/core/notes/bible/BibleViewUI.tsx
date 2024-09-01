import { App, MetadataCache, TFile } from 'obsidian';
import React from 'react';
import { getChapterNotes, handleNoteClick, useBibleViewLogic } from './BibleView'; // Importamos la lógica y el manejador de clics


interface Props {
    app: App;
    metadataCache: MetadataCache;
    files: TFile[];
}

const BibleView: React.FC<Props> = ({ app, metadataCache, files }) => {
    const { bibleNotes } = useBibleViewLogic(app, metadataCache, files);

    return (
        <div className="bible-view-container">
            <div className="books-grid">
                {Object.entries(bibleNotes).map(([book, data]) => (
                    <div key={book} className="book-container">
                        <h2>{book}</h2>
                        <div className="chapters-grid">
                            {Object.entries(data.chapters).map(([chapterNumber, chapterInfo]) => (
                                <div key={chapterNumber} className="chapter-container">
                                    <h3>{chapterNumber} {chapterInfo.title}</h3>
                                    <div className="pericopes-container">
                                        {chapterInfo.pericopes.map((pericope, index) => {
                                            const notesForPericope = getChapterNotes(app, metadataCache, files, parseInt(chapterNumber))
                                                .filter(note => note.verseStart !== undefined &&
                                                    note.verseStart >= pericope.verseRange[0] &&
                                                    note.verseStart <= pericope.verseRange[1]);

                                            return (
                                                <div key={index} className="pericope-container">
                                                    <h4>{pericope.title} ({pericope.verseRange[0]}-{pericope.verseRange[1]})</h4>
                                                    <div className="events-container">
                                                        {notesForPericope.length > 0 ? (
                                                            notesForPericope.map((note, noteIndex) => (
                                                                <div
                                                                    key={noteIndex}
                                                                    className="event-icon"
                                                                    title={note.title}
                                                                    onClick={() => handleNoteClick(app, note.path)} // Usar la lógica importada
                                                                />
                                                            ))
                                                        ) : (
                                                            <span>Sin notas</span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
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
