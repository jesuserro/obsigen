import { App, TFile } from 'obsidian';
import { CalendarIcon } from './../calendar/CalendarIcon';
import { getExternalBiblePassages } from './ExternalBiblePassagesBar'; // Importar función para obtener los pasajes externos

interface EventNote {
    title: string;
    path: string;
    icon?: React.ReactNode;
    externalPassagesCount: number;
}

export function getCalendarEvents(files: TFile[]): EventNote[] {
    return files.map(file => {
        const fileName = file.name.replace(/\.md$/, '');
        const cssClasses = ['bible', 'event']; // Ejemplo de cómo asignar una clase de evento
        const icon = CalendarIcon.getIconByNote(cssClasses, file, 18); // Obtener el icono del evento

        // Obtener los pasajes externos
        const externalPassagesCount = getExternalBiblePassages({ path: file.path, title: fileName }).length;

        return {
            title: fileName,
            path: file.path,
            icon,
            externalPassagesCount,
        };
    });
}

export function handleNoteClick(app: App, notePath: string) {
    const file = app.vault.getAbstractFileByPath(notePath);

    if (file instanceof TFile) {
        app.workspace.getLeaf().openFile(file);
    } else {
        console.error(`File not found: ${notePath}`);
    }
}
