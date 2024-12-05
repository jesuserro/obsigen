import { App, FileView, TFile } from "obsidian"; // Asegúrate de que tienes acceso al objeto `App`
import { BibleImage } from "./BibleViewStructure";

const IMAGE_FOLDER = "050 Anexos";

interface ChapterImage extends BibleImage {
    verseRange: [number, number];
    pericopeTitle: string;
    title: string;
    alt: string;
    rating?: number; // Añadir el rating
}

async function getNoteRating(app: App, book: string, chapterNumber: string, verseRange: [number, number]): Promise<number | null> {
    // Ajustar la ruta de la carpeta para el caso especial de "Salmos"
    const folderPath = book === 'Salmos' ? `333 Biblia/${book}` : `333 Biblia/${book}/${chapterNumber}`;
    const files = app.vault.getFiles().filter(file => file.path.startsWith(folderPath));
  
    const verseRangeString = `${verseRange[0]}-${verseRange[1]}`;
    const chapterString = `${chapterNumber}`;
    const noteFile = files.find(file => file.basename.includes(verseRangeString) && file.basename.includes(chapterString));
  
    if (!noteFile) {
        console.log(`No se encontró ninguna nota con el rango de versículos ${verseRangeString} en ${folderPath}`);
        return null;
    }

    const content = await app.vault.read(noteFile);
    const yaml = app.metadataCache.getFileCache(noteFile)?.frontmatter;
    return yaml?.rating || null;
}

export async function getChapterImages(chapterInfo: any, app: App, book: string, chapterNumber: string): Promise<ChapterImage[]> {
    const images: ChapterImage[] = [];
    for (const pericope of chapterInfo.pericopes) {
        if (pericope.images && pericope.images.length > 0) {
            const validImages = await Promise.all(pericope.images
                .filter((image: BibleImage) => image.path && image.path.trim() !== "")
                .map(async (image: BibleImage) => {
                    const reference = `${book} ${chapterNumber}:${pericope.verseRange[0]}-${pericope.verseRange[1]}`;
                    const title = `${pericope.title} (${reference})`;
                    const alt = `${image.altText} (${reference})`;

                    let rating = null;
                    if (image.type === "local") {
                        const fullPath = `${IMAGE_FOLDER}/${image.path}`;
                        const file = app.vault.getAbstractFileByPath(fullPath);
                        if (file) {
                            rating = await getNoteRating(app, book, chapterNumber, pericope.verseRange);
                            return {
                                ...image,
                                path: app.vault.adapter.getResourcePath(fullPath),
                                verseRange: pericope.verseRange,
                                pericopeTitle: pericope.title,
                                title,
                                alt,
                                rating,
                            };
                        }
                    } else {
                        rating = await getNoteRating(app, book, chapterNumber, pericope.verseRange);
                        return {
                            ...image,
                            verseRange: pericope.verseRange,
                            pericopeTitle: pericope.title,
                            title,
                            alt,
                            rating,
                        };
                    }
                    return null;
                })
                .filter((image: ChapterImage | null): image is ChapterImage => image !== null)
            );

            images.push(...validImages);
        }
    }
    return images;
}

export function openNote(app: App, book: string, chapterNumber: string, verseRange: [number, number]) {
    // Ajustar la ruta de la carpeta para el caso especial de "Salmos"
    const folderPath = book === 'Salmos' ? `333 Biblia/${book}` : `333 Biblia/${book}/${chapterNumber}`;
    const files = app.vault.getFiles().filter(file => file.path.startsWith(folderPath));
  
    const verseRangeString = `${verseRange[0]}-${verseRange[1]}`;
    const chapterString = `${chapterNumber}`;
    const noteFile = files.find(file => file.basename.includes(verseRangeString) && file.basename.includes(chapterString));
  
    if (!noteFile) {
        console.log(`No se encontró ninguna nota con el rango de versículos ${verseRangeString} en ${folderPath}`);
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

export function subscribeToMetadataChanges(app: App, callback: (file: TFile) => void) {
    app.metadataCache.on("changed", (file) => {
        callback(file);
    });
}