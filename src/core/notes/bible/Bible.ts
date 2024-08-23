import { App, MetadataCache, TFile } from 'obsidian';

interface Note {
    title: string;
    date?: string;
}

export function getChapterNotes(app: App, metadataCache: MetadataCache, files: TFile[] | undefined, chapterNumber: number): Note[] {
    // Verificar si `files` está definido y no es null o undefined
    if (!files || files.length === 0) {
        return []; // Si no hay archivos, devolver un array vacío
    }

    const chapterPath = `333 Biblia/San Juan/${chapterNumber}/`;
    const chapterNotes: Note[] = [];

    // Filtrar archivos que pertenecen al capítulo actual
    const chapterFiles = files.filter(file => file.path.startsWith(chapterPath));

    chapterFiles.forEach(file => {
        // Extraer el nombre del archivo sin la extensión
        const fileName = file.name.replace(/\.md$/, '');

        // Eliminar el prefijo que sigue el formato "Jn-01_01 - "
        const noteTitle = fileName.replace(/^Jn-\d{2}_\d{2} - /, '');

        // Crear una nota con el título extraído
        const note: Note = {
            title: noteTitle,
        };

        chapterNotes.push(note);
    });

    return chapterNotes;
}
