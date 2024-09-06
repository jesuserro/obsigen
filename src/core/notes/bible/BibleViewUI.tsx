import { App, MetadataCache, TFile } from 'obsidian';
import React from 'react';
import { CalendarIcon } from './../calendar/CalendarIcon';
import { getChapterNotes, getExternalBiblePassages, useBibleViewLogic } from './BibleView';
import { BibleImage } from './BibleViewStructure';
import CalendarEventsBar from './CalendarEventsBarUI'; // Importar el componente de la barra de eventos

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
        return {
            backgroundImage: imageUrls[0],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)',
        };
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
                                            const notesForPericope = getChapterNotes(app, metadataCache, files, "San Juan", parseInt(chapterNumber))
                                                .filter(note => note && note.verseStart !== undefined && note.verseStart !== null && note.verseStart >= pericope.verseRange[0] && note.verseStart <= pericope.verseRange[1]);

                                            const hasRelatedPassages = notesForPericope.some(note => getExternalBiblePassages(note).length > 0);

                                            return (
                                                <div key={index} className="pericope-wrapper">
                                                    <h4>{pericope.title} ({pericope.verseRange[0]}-{pericope.verseRange[1]})</h4>
                                                    <div className="pericope-container" style={getBackgroundStyle(pericope.images)}>
                                                        {/* Barra de eventos: Se usa solo si hay notas */}
                                                        <CalendarEventsBar
                                                            events={notesForPericope.map(note => ({
                                                                title: note.title,
                                                                path: note.path,
                                                                icon: note.icon
                                                            }))}
                                                            onEventClick={(path) => {
                                                                const file = app.vault.getAbstractFileByPath(path);
                                                                if (file instanceof TFile) {
                                                                    app.workspace.getLeaf().openFile(file);
                                                                }
                                                            }}
                                                        />

                                                        {/* Barra vertical con flechas: solo se muestra si hay pasajes relacionados */}
                                                        {hasRelatedPassages && (
                                                            <div className="related-passages-container">
                                                                {notesForPericope.map((note, noteIndex) => (
                                                                    <div key={noteIndex} className="related-passages">
                                                                        {getExternalBiblePassages(note).map((passage, passageIndex) => (
                                                                            <a
                                                                                key={passageIndex}
                                                                                href={`obsidian://open?file=${encodeURIComponent(passage.book)}#${passage.chapter}`}
                                                                                title={`Ver ${passage.book} ${passage.chapter}`} // Tooltip gestionado por Obsidian
                                                                                className="related-icon"
                                                                            >
                                                                                <div className="arrow-icon">
                                                                                    {CalendarIcon.getIcon('arrow_right', 15)}
                                                                                </div>
                                                                            </a>
                                                                        ))}
                                                                    </div>
                                                                ))}
                                                            </div>
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
