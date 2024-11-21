import { BibleImage } from './BibleViewStructure';

export function getChapterImage(chapterInfo: any): BibleImage | undefined {
    for (const pericope of chapterInfo.pericopes) {
        if (pericope.images && pericope.images.length > 0) {
            return pericope.images[0]; // Retornar la primera imagen encontrada
        }
    }
    return undefined;
}
