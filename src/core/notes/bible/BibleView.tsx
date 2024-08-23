import { App, MetadataCache, TFile } from 'obsidian';
import React, { useEffect, useState } from 'react';
import { getChapterNotes } from './Bible';
import { bibleStructure } from './bibleStructure';

interface Props {
    app: App;
    metadataCache: MetadataCache;
    files: TFile[];
}

const BibleView: React.FC<Props> = ({ app, metadataCache, files }) => {
    const [bibleNotes, setBibleNotes] = useState(bibleStructure);

    useEffect(() => {
        if (!app || !metadataCache || !files || files.length === 0) {
            return;
        }

        const updatedBibleStructure = { ...bibleNotes };

        Object.entries(updatedBibleStructure["San Juan"].chapters).forEach(([chapterNumber, chapterInfo]) => {
            const notes = getChapterNotes(app, metadataCache, files, parseInt(chapterNumber));

            chapterInfo.pericopes.forEach(pericope => {
                // Filtrar las notas que corresponden al rango de versículos de la perícopa
                const notesForPericope = notes.filter(note => {
                    // Asignar la nota al perícope si su versículo inicial cae dentro del rango de la perícopa
                    return note.verseStart !== undefined &&
                           note.verseStart >= pericope.verseRange[0] &&
                           note.verseStart <= pericope.verseRange[1];
                });
                pericope.notes = notesForPericope;
            });
        });

        setBibleNotes(updatedBibleStructure);
    }, [app, metadataCache, files]);

    return (
        <div className="bible-view-container">
            <div className="books-grid">
                {Object.entries(bibleNotes).map(([book, data]) => (
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
                                                        {pericope.notes.length > 0 ? (
                                                            pericope.notes.map((note, noteIndex) => (
                                                                <div
                                                                    key={noteIndex}
                                                                    className="event-icon"
                                                                    title={note.title}
                                                                />
                                                            ))
                                                        ) : (
                                                            <span>Sin notas</span>
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
