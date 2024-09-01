import { App, MetadataCache, TFile } from 'obsidian';
import { useEffect, useRef, useState } from 'react';

export interface CalendarMonthProps {
    year: number;
    month: number;
}

export interface MonthGridProps {
    daysGrid: {
        year: number;
        month: number;
        dayIndex: number;
        isWithinMonth: boolean;
        hasNote: string | false;
        anniversaryNote: TFile | undefined;
        dayNotes: TFile[];
        className: string;
        app: App;
    }[][];
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

export function createDaysGrid({ 
    app, 
    metadataCache, 
    files, 
    numRows, 
    numDaysInMonth, 
    dayOffset, 
    year, 
    month 
}: {
    app: App;
    metadataCache: MetadataCache;
    files: TFile[];
    numRows: number;
    numDaysInMonth: number;
    dayOffset: number;
    year: number;
    month: number;
}): MonthGridProps['daysGrid'] {
    const daysGrid: MonthGridProps['daysGrid'] = [];

    for (let row = 0; row < numRows; row++) {
        const cells: MonthGridProps['daysGrid'][0] = [];

        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            const dayIndex = row * 7 + dayOfWeek + 1 - dayOffset;
            const isWithinMonth = dayIndex >= 1 && dayIndex <= numDaysInMonth;

            const hasNote = getDailyNote(dayIndex, files, year, month);
            const anniversaryNote = getAnniversaryNote(dayIndex, files, month);
            const dayNotes = getDayNotes(app, metadataCache, files, dayIndex, year, month);

            cells.push({
                year,
                month,
                dayIndex,
                isWithinMonth,
                hasNote,
                anniversaryNote,
                dayNotes,
                className: isWithinMonth ? 'within-month' : 'outside-month',
                app
            });
        }

        daysGrid.push(cells);
    }

    return daysGrid;
}

export function useMonthLogic(app: App | undefined, year: number, month: number) {
    const [files, setFiles] = useState<TFile[]>(app?.vault.getMarkdownFiles() || []);

    useEffect(() => {
        if (!app) return;

        const updateFiles = () => {
            setFiles(app.vault.getMarkdownFiles() || []);
        };

        app.vault.on('create', updateFiles);
        app.vault.on('delete', updateFiles);
        app.metadataCache.on('changed', updateFiles);

        return () => {
            app.vault.off('create', updateFiles);
            app.vault.off('delete', updateFiles);
            app.metadataCache.off('changed', updateFiles);
        };
    }, [app]);

    const metadataCache = app?.metadataCache;
    const monthStr = month < 10 ? '0' + month : month.toString();
    const dateStr = `${year}-${monthStr}`;

    const filteredFiles = files.filter((file) => {
        const eventDate = metadataCache?.getFileCache(file)?.frontmatter?.date;
        const anniversaryPath = `/Aniversaries/${String(month).padStart(2, '0')}`;

        return (typeof eventDate === 'string' && eventDate.includes(dateStr)) || file.path.includes(anniversaryPath);
    });

    const firstDayOfMonth = getFirstDayOfMonth(year, month - 1);
    const lastDayOfMonth = getLastDayOfMonth(year, month);
    const numDaysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const dayOffset = getDayOffset(firstDayOfWeek);
    const numRows = calculateNumRows(numDaysInMonth, dayOffset);

    const daysGrid = createDaysGrid({ 
        app: app as App, 
        metadataCache: metadataCache as MetadataCache, 
        files: filteredFiles, 
        numRows, 
        numDaysInMonth, 
        dayOffset, 
        year, 
        month 
    });

    const monthName = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })}`;
    const monthNameFirstCase = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    const monthNameAndYear = `${monthNameFirstCase} ${year}`;

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    let cssCurrentMonth = '';
    if (currentMonth === month) {
        cssCurrentMonth = 'obs-current-month';
    }

    const monthRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (cssCurrentMonth === 'obs-current-month' && monthRef.current) {
            monthRef.current.scrollIntoView();
        }
    }, [cssCurrentMonth]);

    return {
        monthRef,
        cssCurrentMonth,
        monthNameAndYear,
        daysGrid,
    };
}