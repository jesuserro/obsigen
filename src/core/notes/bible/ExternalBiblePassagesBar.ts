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
    const vaultName = "vault"; // Nombre de tu bóveda
    const fileName = `${passage.book} ${passage.chapter}.md`; // Nombre del archivo basado en libro y capítulo (incluye la extensión .md)
    const verseStart = passage.verse_range[0]; // Versículo de inicio

    // Si se especifica un versículo, usamos el número del versículo como heading. Si no, usamos el capítulo.
    const heading = verseStart ? `${verseStart}` : `${passage.book} ${passage.chapter}`;

    // Generar el enlace completo usando filepath (ruta simple basada en el archivo) y heading
    const link = `obsidian://adv-uri?vault=${encodeURIComponent(vaultName)}&filepath=${encodeURIComponent(fileName)}&heading=${encodeURIComponent(heading)}`;

    return link;
}
