// src/core/notes/calendar/Day.ts
import { App, MetadataCache, TFile } from 'obsidian';
import { CalendarEvent } from './CalendarEvent';
import { CalendarIcon } from './CalendarIcon';

export interface CalendarDayProps {
    year: number;
    month: number;
    dayCounter: number;
    hasNote: string | false;
    anniversaryNote: TFile | undefined;
    dayNotes: TFile[] | false;
    app: App;
}

export function getFileName(path: string): string {
    const parts = path.split('/');
    return parts[parts.length - 1];
}

export function generateEventIndex(note: TFile): string {
    return `${note.path}-${note.stat.mtime}`;
}

export function getCalendarEvent(
    year: number,
    month: number,
    dayCounter: number,
    index: string,
    note: TFile,
    metadataCache: MetadataCache
) {
    const mykey = `${year}-${month}-${dayCounter}-${index}`;
    const frontmatter = metadataCache.getFileCache(note)?.frontmatter;

    // Extraemos la hora del evento del frontmatter YAML
    let eventTime: Date | null = null;
    if (frontmatter?.date) {
        eventTime = new Date(frontmatter.date);
    }

    const cssClasses = frontmatter?.cssclasses || [];
    const icon = CalendarIcon.getIconByNote(cssClasses, note, 18);
    const isHoliday = cssClasses.includes("holiday");
    const dayContainerClasses = `day-event-container ${isHoliday ? 'holiday' : ''}`;
    const fileName = getFileName(note.path);

    return {
        mykey,
        dayContainerClasses,
        icon,
        fileName,
        path: note.path,
        eventTime,  // Añadimos el tiempo del evento para ordenarlo más tarde
    };
}


export async function handleEventForm(app: App, year: number, month: number, dayCounter: number): Promise<void> {
    const date = new Date(year, month - 1, dayCounter, 0, 0, 0, 0);
    await new CalendarEvent(app, date).openModal();
}

export function getCalendarDayProps({
    year,
    month,
    dayCounter,
    hasNote,
    anniversaryNote,
    dayNotes,
    app
}: CalendarDayProps) {
    const notePath = hasNote ? `obsidian://open?file=${encodeURIComponent(hasNote)}` : '';
    const anniversary = anniversaryNote ? getCalendarEvent(year, month, dayCounter, generateEventIndex(anniversaryNote), anniversaryNote, app.metadataCache) : null;

    let notesOfTheDay = dayNotes ? dayNotes.map((note) => getCalendarEvent(year, month, dayCounter, generateEventIndex(note), note, app.metadataCache)) : null;

    // Ordenar los eventos por la hora (eventTime)
    if (notesOfTheDay) {
        notesOfTheDay = notesOfTheDay.sort((a, b) => {
            const timeA = a.eventTime ? a.eventTime.getTime() : 0;
            const timeB = b.eventTime ? b.eventTime.getTime() : 0;
            return timeA - timeB;  // Orden ascendente por hora
        });
    }

    return {
        notePath,
        anniversary,
        notesOfTheDay,
    };
}

