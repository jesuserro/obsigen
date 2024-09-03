import { App, MetadataCache, TFile } from 'obsidian';
import React from 'react';
import { getChapterNotes, handleNoteClick, useBibleViewLogic } from './BibleView';
import { BibleImage } from './BibleViewStructure';

interface Props {
    app: App;
    metadataCache: MetadataCache;
    files: TFile[];
}

const BibleView: React.FC<Props> = ({ app, metadataCache, files }) => {
    const { bibleNotes } = useBibleViewLogic(app, metadataCache, files);

    const getBackgroundStyle = (images: BibleImage[] | undefined) => {
        if (!images || images.length === 0) return {};
    
        const imageUrls = images.map((image: BibleImage) => `url(${image.path})`);
        switch (images.length) {
            case 1:
                return {
                    backgroundImage: imageUrls[0],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                };
            case 2:
                return {
                    backgroundImage: `${imageUrls[0]}, ${imageUrls[1]}`,
                    backgroundSize: '100% 50%',
                    backgroundPosition: 'top, bottom',
                    backgroundRepeat: 'no-repeat',
                };
            case 3:
                return {
                    backgroundImage: `${imageUrls[0]}, ${imageUrls[1]}, ${imageUrls[2]}`,
                    backgroundSize: '100% 50%, 50% 50%',
                    backgroundPosition: 'top, left bottom, right bottom',
                    backgroundRepeat: 'no-repeat',
                };
            case 4:
                return {
                    backgroundImage: `${imageUrls[0]}, ${imageUrls[1]}, ${imageUrls[2]}, ${imageUrls[3]}`,
                    backgroundSize: '50% 50%',
                    backgroundPosition: 'top left, top right, bottom left, bottom right',
                    backgroundRepeat: 'no-repeat',
                };
            default:
                return {};
        }
    };
    

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
                                                <div key={index} className="pericope-container" style={getBackgroundStyle(pericope.images)}>
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
