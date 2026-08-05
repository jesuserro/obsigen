import { App, TFile } from 'obsidian';
import { openVaultNote } from '../../../adapters/Obsidian/openVaultNote';
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

export async function handleNoteClick(app: App, notePath: string): Promise<void> {
    const file = app.vault.getAbstractFileByPath(notePath);

    await openVaultNote(app, file, '', notePath);
}
