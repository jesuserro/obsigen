import { App, MetadataCache, TFile } from 'obsidian';

interface Note {
    title: string;
    date?: string;
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
        const noteTitle = fileName.replace(/^Jn-\d{2}_\d{2} - /, '');

        const note: Note = {
            title: noteTitle,
        };

        chapterNotes.push(note);
    });

    return chapterNotes;
}

