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
    const fileName = `${passage.book} ${passage.chapter}`; // Crear el nombre del archivo de capítulo, como 'Ezequiel 37'
    return `obsidian://open?file=${encodeURIComponent(fileName)}`; // Generar el enlace directo al archivo del capítulo
}