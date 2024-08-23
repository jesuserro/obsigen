import { App, MetadataCache, TFile } from 'obsidian';

interface Note {
    title: string;
    date?: string;
    verseStart?: number;  // Versículo inicial
    verseEnd?: number;    // Versículo final (opcional)
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

        // Actualizamos la expresión regular para manejar casos como "Jn-04_5-42"
        const verseMatch = fileName.match(/Jn-\d{2}_(\d+)(-(\d+))?/);
        const verseStart = verseMatch ? parseInt(verseMatch[1], 10) : null;
        const verseEnd = verseMatch && verseMatch[3] ? parseInt(verseMatch[3], 10) : null;

        const noteTitle = fileName.replace(/^Jn-\d{2}_(\d+)(-(\d+))?__?/, '');

        const note: Note = {
            title: noteTitle,
            verseStart: verseStart || undefined,
            verseEnd: verseEnd || undefined,
        };

        chapterNotes.push(note);
    });

    return chapterNotes;
}
