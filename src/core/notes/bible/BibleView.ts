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
}

export function getChapterNotes(app: App, metadataCache: MetadataCache, files: TFile[] | undefined, chapterNumber: number): Note[] {
    if (!files || files.length === 0) {
        return [];
    }

    const bibleNotes = files.map(file => {
        const fileName = file.name.replace(/\.md$/, '');
        const verseMatch = fileName.match(/Jn-\d{2}_(\d+)(-(\d+))?/);
        const verseStart = verseMatch ? parseInt(verseMatch[1], 10) : undefined;
        const verseEnd = verseMatch && verseMatch[3] ? parseInt(verseMatch[3], 10) : undefined;
        const cache = metadataCache.getFileCache(file);
        const cssClasses = cache?.frontmatter?.cssclasses || [];
        const icon = CalendarIcon.getIconByNote(cssClasses, file, 18);

        return verseStart !== undefined ? {
            title: fileName,
            path: file.path,
            verseStart,
            verseEnd,
            icon,
        } : null;  // Retornar null si verseStart es undefined
    }).filter(note => note !== null) as Note[]; // Filtrar las notas nulas

    const calendarNotes: Note[] = files
        .map(file => {
            const cache = metadataCache.getCache(file.path);
            if (!cache || !cache.frontmatter) return null;

            const { bible_passages } = cache.frontmatter;
            if (Array.isArray(bible_passages)) {
                return bible_passages.map(passage => {
                    if (
                        typeof passage.book === 'string' &&
                        passage.chapter === chapterNumber
                    ) {
                        const cssClasses = cache.frontmatter?.cssclasses || [];
                        const icon = CalendarIcon.getIconByNote(cssClasses, file, 18);
                        return {
                            title: file.name.replace(/\.md$/, ''),
                            path: file.path,
                            verseStart: parseInt(passage.verse_range[0], 10),
                            verseEnd: parseInt(passage.verse_range[1], 10),
                            icon,
                        };
                    }
                    return null;
                }).filter(note => note !== null);
            }
            return null;
        })
        .flat()
        .filter(note => note !== null) as Note[];

    return [...bibleNotes, ...calendarNotes];
}

export function handleNoteClick(app: App, notePath: string) {
    const file = app.vault.getAbstractFileByPath(notePath);

    if (file instanceof TFile) {
        app.workspace.getLeaf().openFile(file);
    } else {
        console.error(`File not found: ${notePath}`);
    }
}

// Función que encapsula la lógica de la vista de la Biblia
export function useBibleViewLogic(app: App, metadataCache: MetadataCache, files: TFile[]) {
    const [bibleNotes, setBibleNotes] = useState(bibleStructure);

    useEffect(() => {
        if (!app || !metadataCache || !files?.length) return;

        const updatedBibleStructure = { ...bibleNotes };

        Object.keys(updatedBibleStructure["San Juan"].chapters).forEach(chapterNumber => {
            const notes = getChapterNotes(app, metadataCache, files, parseInt(chapterNumber));
            // Asignar notas a perícopas si es necesario
        });

        setBibleNotes(updatedBibleStructure);
    }, [app, metadataCache, files]);

    return { bibleNotes };
}
