import { App, MetadataCache, TFile } from 'obsidian';

interface Note {
    title: string;
    date?: string;
    verseStart?: number;
    verseEnd?: number;
}

export function getChapterNotes(app: App, metadataCache: MetadataCache, files: TFile[] | undefined, chapterNumber: number): Note[] {
    if (!files || files.length === 0) {
        return [];
    }

    const chapterPath = `333 Biblia/San Juan/${chapterNumber}/`;
    const chapterFiles = files.filter(file => file.path.startsWith(chapterPath));

    return chapterFiles.map(file => {
        const fileName = file.name.replace(/\.md$/, '');
        const verseMatch = fileName.match(/Jn-\d{2}_(\d+)(-(\d+))?/);
        const verseStart = verseMatch ? parseInt(verseMatch[1], 10) : undefined;
        const verseEnd = verseMatch && verseMatch[3] ? parseInt(verseMatch[3], 10) : undefined;

        return {
            title: fileName,
            verseStart,
            verseEnd,
        };
    });
}
