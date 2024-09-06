export interface BiblePassage {
    book: string;
    chapter: number;
    verse_range: [number, number];
}

// Filtrar los pasajes que no pertenecen al libro actual.
export function getExternalBiblePassages(note: any): BiblePassage[] {
    const passages = note?.bible_passages || [];
    return passages.filter((passage: BiblePassage) => passage.book !== 'San Juan');
}

export function generatePassageLink(passage: BiblePassage): string {
    const fileName = `${passage.book} ${passage.chapter}`; // Generar nombre del archivo basado en libro y capítulo
    const verseStart = passage.verse_range[0]; // Versículo de inicio

    // Crear el hash con el formato que apunte directamente al número del versículo
    const hash = verseStart ? `#${verseStart}` : ''; // Simplemente apunta al número del versículo

    // Generar el enlace completo
    const link = `obsidian://open?file=${encodeURIComponent(fileName)}${hash}`;

    return link;
}
