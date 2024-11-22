import { BibleImage } from './BibleViewStructure';

// Obtener todas las imágenes válidas de un capítulo
export function getChapterImages(chapterInfo: any): BibleImage[] {
  const images: BibleImage[] = [];
  for (const pericope of chapterInfo.pericopes) {
    if (pericope.images && pericope.images.length > 0) {
      const validImages = pericope.images.filter((image: BibleImage) => image.path && image.path.trim() !== '');
      images.push(...validImages);
    }
  }
  return images;
}
