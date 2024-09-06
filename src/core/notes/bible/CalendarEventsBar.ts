import { App, TFile } from 'obsidian';
import { CalendarIcon } from './../calendar/CalendarIcon';

interface EventNote {
    title: string;
    path: string;
    icon?: React.ReactNode;
}

export function getCalendarEvents(files: TFile[]): EventNote[] {
    return files.map(file => {
        const fileName = file.name.replace(/\.md$/, '');
        const cssClasses = ['bible', 'event']; // Ejemplo de cómo asignar una clase de evento
        const icon = CalendarIcon.getIconByNote(cssClasses, file, 18); // Obtener el icono del evento

        return {
            title: fileName,
            path: file.path,
            icon,
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
