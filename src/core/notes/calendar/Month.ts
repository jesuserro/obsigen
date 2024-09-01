// src/core/notes/calendar/Month.ts
import { App, MetadataCache, TFile } from 'obsidian';

export interface CalendarMonthProps {
    year: number;
    month: number;
}

export function getFirstDayOfMonth(year: number, month: number): Date {
    return new Date(year, month, 1);
}

export function getLastDayOfMonth(year: number, month: number): Date {
    return new Date(year, month + 1, 0);
}

export function getDayOffset(dayOfWeek: number): number {
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
}

export function calculateNumRows(numDaysInMonth: number, dayOffset: number): number {
    return Math.ceil((numDaysInMonth + dayOffset) / 7);
}

export function getDayNotes(app: App, metadataCache: MetadataCache, files: TFile[], dayIndex: number, year: number, month: number): TFile[] {
    const dayPadded = String(dayIndex).padStart(2, '0');
    const monthPadded = String(month).padStart(2, '0');
    const dailyPath = `100 Calendar/${year}/${monthPadded}/${dayPadded}.md`;

    const dayNotes = files.filter((file) => {
        const path = file.path;

        // Excluir archivos que sigan el patrón YYYYMMDD.md
        const fileName = path.split('/').pop(); // Obtén el nombre del archivo
        const regex = /^\d{8}\.md$/; // Expresión regular para YYYYMMDD.md

        if (regex.test(fileName!)) {
            return false; // Excluir archivos que coincidan con el patrón
        }

        if (path === dailyPath || path.includes('/Aniversaries/')) {
            return false;
        }

        const eventDate = metadataCache.getFileCache(file)?.frontmatter?.date;

        if (typeof eventDate === 'string') {
            const eventYear = parseInt(eventDate.substring(0, 4));
            const eventMonth = parseInt(eventDate.substring(5, 7));
            const eventDay = parseInt(eventDate.substring(8, 10));

            return eventYear === year && eventMonth === month && eventDay === dayIndex;
        }

        return false;
    });

    return dayNotes;
}

// Nueva función para obtener la nota de aniversario
export function getAnniversaryNote(dayIndex: number, files: TFile[], month: number): TFile | undefined {
    const anniversaryPath = `/Aniversaries/${String(month).padStart(2, '0')}/${String(month).padStart(2, '0')}${String(dayIndex).padStart(2, '0')}.md`;
    return files.find(file => file.path.includes(anniversaryPath));
}

export function getDailyNote(dayIndex: number, files: TFile[], year: number, month: number): string | false {
    const dayPadded = String(dayIndex).padStart(2, '0');
    const monthPadded = String(month).padStart(2, '0');
    const dayDate = `${year}${monthPadded}${dayPadded}`;
    const notePath = `100 Calendar/${year}/${monthPadded}/${dayDate}.md`;

    const note = files.find(file => file.path === notePath);

    if (note?.path) {
        return note.path;
    }

    return false;
}
