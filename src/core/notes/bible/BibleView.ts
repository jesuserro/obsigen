import { App, MetadataCache, TFile } from 'obsidian';

interface Note {
    title: string;
    path: string; // Añadimos el path para identificar la ruta completa
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
            path: file.path, // Guardamos la ruta completa del archivo
            verseStart,
            verseEnd,
        };
    });

    // Filtrar y mapear notas en el calendario que contienen las propiedades YAML relevantes
    const calendarNotes = files
        .filter(file => {
            const cache = metadataCache.getCache(file.path);
            if (!cache || !cache.frontmatter) return false;

            const { bible_book, bible_chapter } = cache.frontmatter;
            return (
                typeof bible_book === 'string' && // Asegurarse de que bible_book es un string
                bible_chapter === chapterNumber &&
                Array.isArray(cache.frontmatter.bible_verse_range)
            );
        })
        .map(file => {
            const cache = metadataCache.getCache(file.path);
            if (!cache || !cache.frontmatter) return null;

            const verseRange = cache.frontmatter.bible_verse_range;

            return {
                title: file.name.replace(/\.md$/, ''),
                path: file.path, // Guardamos la ruta completa del archivo
                verseStart: verseRange ? verseRange[0] : undefined,
                verseEnd: verseRange ? verseRange[1] : undefined,
            };
        })
        .filter(note => note !== null); // Filtra posibles nulls que se hayan retornado

    // Unir ambas colecciones de notas
    return [...bibleNotes, ...calendarNotes];
}
