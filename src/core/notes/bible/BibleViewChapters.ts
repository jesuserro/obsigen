import { App, FileView } from "obsidian";
import { BibleImage, bibleStructure } from "./BibleViewStructure";

const IMAGE_FOLDER = "050 Anexos";

interface ChapterImage extends BibleImage {
    verseRange: [number, number];
    pericopeTitle: string;
    title: string;
    alt: string;
    rating?: number;
    verseTitle?: string;
    versePassage?: string;
    locations?: string[];
    coordinates?: [number, number];
    date?: string; // Añadir esta línea
}

async function getNoteData(app: App, book: string, chapterNumber: string, verseRange: [number, number]): Promise<Partial<ChapterImage>> {
    const folderPath = book === 'Salmos' ? `333 Biblia/${book}` : `333 Biblia/${book}/${chapterNumber}`;
    const files = app.vault.getFiles().filter(file => file.path.startsWith(folderPath));
  
    const verseRangeString = `${verseRange[0]}-${verseRange[1]}`;
    const chapterString = `${chapterNumber}`;
    const noteFile = files.find(file => file.basename.includes(verseRangeString) && file.basename.includes(chapterString));
  
    if (!noteFile) {
        console.log(`getNoteData: No se encontró ninguna nota con el rango de versículos ${verseRangeString} en ${folderPath}`);
        return {};
    }

    const yaml = app.metadataCache.getFileCache(noteFile)?.frontmatter;
    if (!yaml) {
        return {};
    }

    return {
        rating: yaml.rating || null,
        verseTitle: yaml.verse_title || "",
        versePassage: yaml.verse_passage || "",
        locations: yaml.locations || [],
        path: yaml.cover ? app.vault.adapter.getResourcePath(yaml.cover) : "",
        alt: yaml.cover ? yaml.cover : "",
        date: yaml.date || "", // Añadir esta línea
    };
}

async function getLocationCoordinates(app: App, location: string): Promise<[number, number] | null> {
    const sanitizedLocation = location.replace(/\[\[|\]\]/g, '');
    const [mainLocation, alias] = sanitizedLocation.split('|');

    const files = app.vault.getFiles().filter(file => 
        file.basename.includes(mainLocation) || (alias && file.basename.includes(alias))
    );

    if (files.length === 0) {
        console.log(`getLocationCoordinates: No se encontró ninguna nota con el nombre ${sanitizedLocation}`);
        return null;
    }

    const noteFile = files[0];
    const yaml = app.metadataCache.getFileCache(noteFile)?.frontmatter;
    if (!yaml || !yaml.location) {
        return null;
    }

    return yaml.location;
}

export async function getChapterImages(chapterInfo: any, app: App, book: string, chapterNumber: string): Promise<ChapterImage[]> {
    const images: ChapterImage[] = [];
    for (const pericope of chapterInfo.pericopes) {
        const noteData = await getNoteData(app, book, chapterNumber, pericope.verseRange);
        if (noteData.path) {
            const reference = `${book} ${chapterNumber}:${pericope.verseRange[0]}-${pericope.verseRange[1]}`;
            const title = `${pericope.title} (${reference})`;
            const alt = `${noteData.alt} (${reference})`;

            const coordinates = noteData.locations && noteData.locations.length > 0
                ? await getLocationCoordinates(app, noteData.locations[0])
                : null;

            images.push({
                ...noteData,
                verseRange: pericope.verseRange,
                pericopeTitle: pericope.title,
                title,
                alt,
                coordinates,
                locations: noteData.locations?.map(location => location.replace(/\[\[|\]\]/g, '')) || [],
                date: noteData.date, 
            } as ChapterImage);
        }
    }
    return images;
}

export function openNote(app: App, book: string, chapterNumber: string, verseRange: [number, number]) {
    const folderPath = book === 'Salmos' ? `333 Biblia/${book}` : `333 Biblia/${book}/${chapterNumber}`;
    const files = app.vault.getFiles().filter(file => file.path.startsWith(folderPath));
  
    const verseRangeString = `${verseRange[0]}-${verseRange[1]}`;
    const chapterString = `${chapterNumber}`;
    const noteFile = files.find(file => file.basename.includes(verseRangeString) && file.basename.includes(chapterString));
  
    if (!noteFile) {
        console.log(`openNote: No se encontró ninguna nota con el rango de versículos ${verseRangeString} en ${folderPath}`);
        return;
    }

    const openLeaves = app.workspace.getLeavesOfType("markdown");
    const openFilePaths = openLeaves.map(leaf => leaf.view instanceof FileView ? leaf.view.file?.path : null).filter(path => path !== null);
  
    if (openFilePaths.includes(noteFile.path)) {
        const leaf = openLeaves.find(leaf => leaf.view instanceof FileView && leaf.view.file?.path === noteFile.path);
        if (leaf) {
            app.workspace.setActiveLeaf(leaf);
        }
    } else {
        app.workspace.openLinkText(noteFile.path, '', true);
    }
}

export function openLocationNote(app: App, location: string) {
    const sanitizedLocation = location.replace(/\[\[|\]\]/g, '');
    const [mainLocation, alias] = sanitizedLocation.split('|');

    const files = app.vault.getFiles().filter(file => 
        file.basename.includes(mainLocation) || (alias && file.basename.includes(alias))
    );
  
    if (files.length === 0) {
        console.log(`openLocationNote: No se encontró ninguna nota con el nombre ${sanitizedLocation}`);
        return;
    }

    const noteFile = files[0];
    const openLeaves = app.workspace.getLeavesOfType("markdown");
    const openFilePaths = openLeaves.map(leaf => leaf.view instanceof FileView ? leaf.view.file?.path : null).filter(path => path !== null);
  
    if (openFilePaths.includes(noteFile.path)) {
        const leaf = openLeaves.find(leaf => leaf.view instanceof FileView && leaf.view.file?.path === noteFile.path);
        if (leaf) {
            app.workspace.setActiveLeaf(leaf);
        }
    } else {
        app.workspace.openLinkText(noteFile.path, '', true);
    }
}

export async function fetchChapterImages(app: App): Promise<{ [key: string]: ChapterImage[] }> {
    const images: { [key: string]: ChapterImage[] } = {};
    for (const [book, data] of Object.entries(bibleStructure)) {
        for (const [chapterNumber, chapterInfo] of Object.entries(data.chapters)) {
            images[`${book}-${chapterNumber}`] = await getChapterImages(chapterInfo, app, book, chapterNumber);
        }
    }
    return images;
}