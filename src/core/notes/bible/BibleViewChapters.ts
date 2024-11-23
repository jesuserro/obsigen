import { App } from 'obsidian'; // Asegúrate de que tienes acceso al objeto `App`
import { BibleImage } from './BibleViewStructure';

const IMAGE_FOLDER = '050 Anexos';

interface ChapterImage extends BibleImage {
  verseRange: [number, number];
  pericopeTitle: string; // Añadir el título de la perícopa
}

export function getChapterImages(chapterInfo: any, app: App): ChapterImage[] {
  const images: ChapterImage[] = [];
  for (const pericope of chapterInfo.pericopes) {
    if (pericope.images && pericope.images.length > 0) {
      const validImages = pericope.images
        .filter((image: BibleImage) => image.path && image.path.trim() !== '')
        .map((image: BibleImage) => {
          if (image.type === 'local') {
            // Construir la ruta completa para imágenes locales
            const fullPath = `${IMAGE_FOLDER}/${image.path}`;
            const file = app.vault.getAbstractFileByPath(fullPath);
            if (file) {
              return { ...image, path: app.vault.adapter.getResourcePath(fullPath), verseRange: pericope.verseRange, pericopeTitle: pericope.title };
            }
          }
          return { ...image, verseRange: pericope.verseRange, pericopeTitle: pericope.title }; // Mantener imágenes externas sin cambios
        })
        .filter((image: ChapterImage) => image.path); // Filtrar imágenes locales no encontradas

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
    const noteFile = files.find(file => file.basename.includes(verseRangeString));
  
    if (noteFile) {
      app.workspace.openLinkText(noteFile.path, '', true);
    } else {
      console.log(`No se encontró ninguna nota con el rango de versículos ${verseRangeString} en ${folderPath}`);
    }
  }