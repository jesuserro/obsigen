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

    // Filtramos y mapeamos las notas que contengan bible_passages en el YAML
    const biblePassagesNotes: Note[] = files
        .map(file => {
            const cache = metadataCache.getCache(file.path);
            if (!cache || !cache.frontmatter) return null;

            const { bible_passages } = cache.frontmatter;
            if (Array.isArray(bible_passages)) {
                // Verificamos si alguna de las entradas en bible_passages coincide con el capítulo actual
                const matchingPassages = bible_passages.filter((passage: any) => {
                    return passage.book === "San Juan" && passage.chapter === chapterNumber;
                });

                if (matchingPassages.length > 0) {
                    // Si encontramos coincidencias, las convertimos en notas
                    return matchingPassages.map((passage: any) => ({
                        title: file.name.replace(/\.md$/, ''),
                        path: file.path,
                        verseStart: passage.verse_range[0] ? parseInt(passage.verse_range[0], 10) : undefined,
                        verseEnd: passage.verse_range[1] ? parseInt(passage.verse_range[1], 10) : undefined,
                    }));
                }
            }
            return null;
        })
        .flat() // Aplanamos el array para manejar múltiples coincidencias en bible_passages
        .filter(note => note !== null) as Note[]; // Filtramos posibles nulls que se hayan retornado y aseguramos el tipo

    return biblePassagesNotes;
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
