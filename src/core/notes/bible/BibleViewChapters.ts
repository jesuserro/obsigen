import { App } from 'obsidian'; // Asegúrate de que tienes acceso al objeto `App`
import { BibleImage } from './BibleViewStructure';

const IMAGE_FOLDER = '050 Anexos';

export function getChapterImages(chapterInfo: any, app: App): BibleImage[] {
  const images: BibleImage[] = [];
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
              return { ...image, path: app.vault.adapter.getResourcePath(fullPath) };
            }
          }
          return image; // Mantener imágenes externas sin cambios
        })
        .filter((image: BibleImage) => image.path); // Filtrar imágenes locales no encontradas

      images.push(...validImages);
    }
  }
  return images;
}
