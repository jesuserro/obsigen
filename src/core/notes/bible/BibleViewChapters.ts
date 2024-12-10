import { App, FileView } from "obsidian";
import { BibleImage } from "./BibleViewStructure";

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
    };
}

export async function getChapterImages(chapterInfo: any, app: App, book: string, chapterNumber: string): Promise<ChapterImage[]> {
    const images: ChapterImage[] = [];
    for (const pericope of chapterInfo.pericopes) {
        const noteData = await getNoteData(app, book, chapterNumber, pericope.verseRange);
        if (noteData.path) {
            const reference = `${book} ${chapterNumber}:${pericope.verseRange[0]}-${pericope.verseRange[1]}`;
            const title = `${pericope.title} (${reference})`;
            const alt = `${noteData.alt} (${reference})`;

            images.push({
                ...noteData,
                verseRange: pericope.verseRange,
                pericopeTitle: pericope.title,
                title,
                alt,
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
    // Eliminar caracteres especiales de la localización y manejar alias
    const sanitizedLocation = location.replace(/\[\[|\]\]/g, '');
    const [mainLocation, alias] = sanitizedLocation.split('|');

    // Filtrar archivos que contengan el nombre de la localización o su alias
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
