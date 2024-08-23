import { App, MetadataCache, TFile } from 'obsidian';

interface Note {
    title: string;
    date?: string;
    verseStart?: number;  // Agregar campo para el versículo inicial
}

export function getChapterNotes(app: App, metadataCache: MetadataCache, files: TFile[] | undefined, chapterNumber: number): Note[] {
    if (!files || files.length === 0) {
        return [];
    }

    const chapterPath = `333 Biblia/San Juan/${chapterNumber}/`;
    const chapterNotes: Note[] = [];

    const chapterFiles = files.filter(file => file.path.startsWith(chapterPath));

    chapterFiles.forEach(file => {
        const fileName = file.name.replace(/\.md$/, '');

        // Extraer el versículo inicial del nombre del archivo
        const verseMatch = fileName.match(/Jn-\d{2}_(\d{2})/);
        const verseStart = verseMatch ? parseInt(verseMatch[1], 10) : null;

        const noteTitle = fileName.replace(/^Jn-\d{2}_\d{2} - /, '');

        const note: Note = {
            title: noteTitle,
            verseStart: verseStart || undefined, // Asignar versículo inicial si está disponible
        };

        chapterNotes.push(note);
    });

    return chapterNotes;
}
