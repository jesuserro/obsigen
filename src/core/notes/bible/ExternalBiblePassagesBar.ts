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
