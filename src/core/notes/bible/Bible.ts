import { App, MetadataCache, TFile } from 'obsidian';

interface Note {
    title: string;
    date?: string;
}

export function getChapterNotes(app: App, metadataCache: MetadataCache, files: TFile[] | undefined, chapterNumber: number): Note[] {
    if (!files) {
        // Retornar un array vacío si `files` no está definido
        return [];
    }

    const chapterPath = `333 Biblia/San Juan/${chapterNumber}/`;
    const chapterNotes: Note[] = [];

    // Filtrar archivos que pertenecen al capítulo actual
    const chapterFiles = files.filter(file => file.path.startsWith(chapterPath));

    chapterFiles.forEach(file => {
        // Extraer título de la nota desde el nombre del archivo
        const fileName = file.name;
        const noteTitle = fileName.replace(/\.md$/, ''); // Quitar la extensión ".md"

        // Crear una nota con el título extraído
        const note: Note = {
            title: noteTitle,
        };

        chapterNotes.push(note);
    });

    return chapterNotes;
}
