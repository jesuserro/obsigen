import { App, FileView, TFile } from "obsidian";

const IMAGE_FOLDER = "050 Anexos";

export interface ChapterImage {
    verseRange: [number, number];
    pericopeTitle: string;
    title: string;
    alt: string;
    rating?: number;
    verseTitle?: string;
    versePassage?: string;
    locations?: string[];
    coordinates?: [number, number];
    date?: string;
    path: string;
}

async function getNoteData(app: App, filePath: string): Promise<Partial<ChapterImage>> {
    const noteFile = app.vault.getAbstractFileByPath(filePath);
    if (!(noteFile instanceof TFile)) {
        console.log(`getNoteData: No se encontró ninguna nota en ${filePath}`);
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
        date: yaml.date || "",
        title: yaml.title || "",
        pericopeTitle: yaml.pericope_title || "",
        verseRange: yaml.verse_range || [0, 0],
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
    if (!(noteFile instanceof TFile)) {
        return null;
    }

    const yaml = app.metadataCache.getFileCache(noteFile)?.frontmatter;
    if (!yaml || !yaml.location) {
        return null;
    }

    return yaml.location;
}

export async function fetchChapterImages(app: App): Promise<{ [key: string]: ChapterImage[] }> {
    const images: { [key: string]: ChapterImage[] } = {};
    const files = app.vault.getFiles().filter(file => file.path.startsWith("333 Biblia"));

    for (const file of files) {
        const noteData = await getNoteData(app, file.path);
        if (noteData.path) {
            const key = file.path.split('/').slice(0, -1).join('/');
            if (!images[key]) {
                images[key] = [];
            }
            const coordinates = noteData.locations && noteData.locations.length > 0
                ? await getLocationCoordinates(app, noteData.locations[0])
                : null;

            images[key].push({
                ...noteData,
                coordinates,
                locations: noteData.locations?.map(location => location.replace(/\[\[|\]\]/g, '')) || [],
            } as ChapterImage);
        }
    }
    return images;
}

export function openNote(app: App, filePath: string) {
    const noteFile = app.vault.getAbstractFileByPath(filePath);
    if (!(noteFile instanceof TFile)) {
        console.log(`openNote: No se encontró ninguna nota en ${filePath}`);
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
    if (!(noteFile instanceof TFile)) {
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