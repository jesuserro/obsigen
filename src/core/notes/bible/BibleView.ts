import { App, MetadataCache, TFile } from 'obsidian';
import { useEffect, useState } from 'react';
import { CalendarIcon } from './../calendar/CalendarIcon';
import { bibleStructure } from './BibleViewStructure';

interface Note {
    title: string;
    path: string;
    date?: string;
    verseStart?: number;
    verseEnd?: number;
    icon?: React.ReactNode;
    bible_passages?: BiblePassage[];
}

interface BiblePassage {
    book: string;
    chapter: number;
    verse_range: [number, number];
}

// Obtener notas del capítulo específico y libro.
export function getChapterNotes(
    app: App, 
    metadataCache: MetadataCache, 
    files: TFile[] | undefined, 
    book: string, 
    chapterNumber: number
): Note[] {
    if (!files || files.length === 0) return [];

    const bibleNotes = files.map(file => {
        const fileName = file.name.replace(/\.md$/, '');
        const cache = metadataCache.getFileCache(file);
        const cssClasses = cache?.frontmatter?.cssclasses || [];
        const icon = CalendarIcon.getIconByNote(cssClasses, file, 18);

        const { bible_passages } = cache?.frontmatter || {};
        if (Array.isArray(bible_passages)) {
            return bible_passages.map(passage => {
                if (
                    passage.book === book &&
                    passage.chapter === chapterNumber &&
                    passage.verse_range &&
                    passage.verse_range.length > 0
                ) {
                    const verseStart = parseInt(passage.verse_range[0], 10);
                    const verseEnd = passage.verse_range[1] ? parseInt(passage.verse_range[1], 10) : undefined;

                    return {
                        title: fileName,
                        path: file.path,
                        verseStart,
                        verseEnd,
                        icon,
                        bible_passages,
                    };
                }
                return null;
            }).filter(note => note !== null);
        }

        return null;
    }).filter(note => note !== null).flat() as Note[];

    return bibleNotes;
}

// Filtrar los pasajes que no pertenecen al libro actual.
export function getExternalBiblePassages(note: Note): BiblePassage[] {
    const passages = note?.bible_passages || [];
    return passages.filter(passage => passage.book !== 'San Juan');
}

// Abrir la nota correspondiente al hacer clic.
export function handleNoteClick(app: App, notePath: string) {
    const file = app.vault.getAbstractFileByPath(notePath);

    if (file instanceof TFile) {
        app.workspace.getLeaf().openFile(file);
    } else {
        console.error(`File not found: ${notePath}`);
    }
}

// Lógica principal del calendario bíblico.
export function useBibleViewLogic(app: App, metadataCache: MetadataCache, files: TFile[]) {
    const [bibleNotes, setBibleNotes] = useState(bibleStructure);

    useEffect(() => {
        if (!app || !metadataCache || !files?.length) return;

        const updatedBibleStructure = { ...bibleNotes };

        Object.keys(updatedBibleStructure["San Juan"].chapters).forEach(chapterNumber => {
            const notes = getChapterNotes(app, metadataCache, files, "San Juan", parseInt(chapterNumber));
            // Asignar notas a perícopas si es necesario
        });

        setBibleNotes(updatedBibleStructure);
    }, [app, metadataCache, files]);

    return { bibleNotes };
}
