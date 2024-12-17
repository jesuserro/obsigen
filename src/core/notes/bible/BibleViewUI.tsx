import { App, MetadataCache, TFile } from 'obsidian';
import React from 'react';
import { getChapterNotes, useBibleViewLogic } from './BibleView';
import { BibleImage } from './BibleViewStructure';
import CalendarEventsBar from './CalendarEventsBarUI';
import { getExternalBiblePassages } from './ExternalBiblePassagesBar';
import ExternalBiblePassagesBar from './ExternalBiblePassagesBarUI';

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
                                        {chapterInfo.pericopes?.map((pericope, index) => {
                                            const notesForPericope = getChapterNotes(app, metadataCache, files, "San Juan", parseInt(chapterNumber))
                                                .filter(note => note && note.verseStart !== undefined && note.verseStart !== null && note.verseStart >= pericope.verseRange[0] && note.verseStart <= pericope.verseRange[1]);

                                            return (
                                                <div key={index} className="pericope-wrapper">
                                                    <h4>{pericope.title} ({pericope.verseRange[0]}-{pericope.verseRange[1]})</h4>
                                                    <div className="pericope-container" style={getBackgroundStyle(pericope.images)}>
                                                        <CalendarEventsBar
                                                            events={notesForPericope.map(note => ({
                                                                title: note.title,
                                                                path: note.path,
                                                                icon: note.icon,
                                                                externalPassagesCount: getExternalBiblePassages(note).length, // Añadimos el número de pasajes externos
                                                            }))}
                                                            onEventClick={(path) => {
                                                                const file = app.vault.getAbstractFileByPath(path);
                                                                if (file instanceof TFile) {
                                                                    app.workspace.getLeaf().openFile(file);
                                                                }
                                                            }}
                                                        />
                                                        <ExternalBiblePassagesBar
                                                            externalPassages={notesForPericope.flatMap(note => getExternalBiblePassages(note))}
                                                        />
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
