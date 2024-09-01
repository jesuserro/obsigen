import { App, MetadataCache, TFile } from 'obsidian';
import { useEffect, useState } from 'react';
import { bibleStructure } from './BibleViewStructure';

interface Note {
    title: string;
    path: string;
    date?: string;
    verseStart?: number;
    verseEnd?: number;
}

export function getChapterNotes(app: App, metadataCache: MetadataCache, files: TFile[] | undefined, chapterNumber: number): Note[] {
    if (!files || files.length === 0) {
        return [];
    }

    const chapterPath = `333 Biblia/San Juan/${chapterNumber}/`;

    // Filtrar notas en el capítulo específico
    const chapterFiles = files.filter(file => file.path.startsWith(chapterPath));

    const bibleNotes = chapterFiles.map(file => {
        const fileName = file.name.replace(/\.md$/, '');
        const verseMatch = fileName.match(/Jn-\d{2}_(\d+)(-(\d+))?/);
        const verseStart = verseMatch ? parseInt(verseMatch[1], 10) : undefined;
        const verseEnd = verseMatch && verseMatch[3] ? parseInt(verseMatch[3], 10) : undefined;

        return {
            title: fileName,
            path: file.path,
            verseStart,
            verseEnd,
        };
    });

    // Filtrar y mapear notas en el calendario que contienen las propiedades YAML relevantes
    const calendarNotes: Note[] = files
        .map(file => {
            const cache = metadataCache.getCache(file.path);
            if (!cache || !cache.frontmatter) return null;

            const { bible_book, bible_chapter, bible_verse_range } = cache.frontmatter;
            if (
                typeof bible_book === 'string' &&
                bible_chapter === chapterNumber &&
                Array.isArray(bible_verse_range)
            ) {
                return {
                    title: file.name.replace(/\.md$/, ''),
                    path: file.path,
                    verseStart: bible_verse_range[0],
                    verseEnd: bible_verse_range[1],
                };
            }
            return null;
        })
        .filter(note => note !== null) as Note[]; // Filtra posibles nulls que se hayan retornado y asegura el tipo

    return [...bibleNotes, ...calendarNotes]; // Combinar notas
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
