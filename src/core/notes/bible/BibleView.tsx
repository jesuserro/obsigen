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
                const notesForPericope = notes.filter(note => {
                    return note.verseStart !== undefined &&
                           note.verseStart >= pericope.verseRange[0] &&
                           note.verseStart <= pericope.verseRange[1];
                });
                pericope.notes = notesForPericope;
            });
        });

        setBibleNotes(updatedBibleStructure);
    }, [app, metadataCache, files]);

    // Función para manejar el click en una nota
    const handleNoteClick = (noteTitle: string, chapterNumber: number) => {
        // Asumimos que noteTitle ya incluye el prefijo, así que no lo duplicamos
        const notePath = `333 Biblia/San Juan/${chapterNumber}/${noteTitle}.md`;

        // Buscar el archivo en el vault usando la ruta completa
        const file = app.vault.getAbstractFileByPath(notePath);

        if (file instanceof TFile) {
            // Si el archivo existe, abrirlo
            app.workspace.getLeaf().openFile(file);
        } else {
            console.error(`File not found: ${notePath}`);
        }
    };

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
                                                                    onClick={() => handleNoteClick(note.title, parseInt(chapterNumber))} // Añadir el evento onClick
                                                                    style={{ cursor: 'pointer' }} // Cambiar el cursor al pasar sobre la nota
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
