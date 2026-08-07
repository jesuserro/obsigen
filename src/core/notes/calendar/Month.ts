import { App, MetadataCache, TFile } from 'obsidian';
import { useEffect, useState } from 'react';

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

export interface CalendarYearIndex {
    dailyNoteByDate: Map<string, string>;
    anniversaryByMonthDay: Map<string, TFile>;
    eventsByDate: Map<string, TFile[]>;
}

export interface CalendarMonthViewModel extends CalendarMonthProps {
    cssCurrentMonth: string;
    monthNameAndYear: string;
    daysGrid: MonthGridProps['daysGrid'];
}

function pad2(value: number): string {
    return String(value).padStart(2, '0');
}

function calendarDateKey(year: number, month: number, day: number): string {
    return `${year}-${pad2(month)}-${pad2(day)}`;
}

function monthDayKey(month: number, day: number): string {
    return `${pad2(month)}-${pad2(day)}`;
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

// Reference helper retained to protect the historical lookup semantics.
export function getAnniversaryNote(dayIndex: number, files: TFile[], month: number): TFile | undefined {
    const anniversaryPath = `/Aniversaries/${String(month).padStart(2, '0')}/${String(month).padStart(2, '0')}${String(dayIndex).padStart(2, '0')}.md`;
    return files.find(file => file.path.includes(anniversaryPath));
}

// Reference helper retained to protect the historical lookup semantics.
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

// Reference helper retained to protect the historical lookup semantics.
export function getDayNotes(app: App, metadataCache: MetadataCache, files: TFile[], dayIndex: number, year: number, month: number): TFile[] {
    const dayPadded = String(dayIndex).padStart(2, '0');
    const monthPadded = String(month).padStart(2, '0');
    const dailyPath = `100 Calendar/${year}/${monthPadded}/${dayPadded}.md`;

    const dayNotes = files.filter((file) => {
        const path = file.path;
        const fileName = path.split('/').pop();
        const regex = /^\d{8}\.md$/;

        if (regex.test(fileName!)) {
            return false;
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

// Reference grid retained for equivalence and performance regression tests.
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
    let currentDay = 1;
    let nextMonthDay = 1;
    const prevMonthLastDay = getLastDayOfMonth(year, month - 1).getDate();

    for (let row = 0; row < numRows; row++) {
        const cells: MonthGridProps['daysGrid'][0] = [];

        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            const cellDay = row * 7 + dayOfWeek - dayOffset + 1;
            let dayIndex: number;
            let isWithinMonth: boolean;

            if (cellDay < 1) {
                dayIndex = prevMonthLastDay + cellDay;
                isWithinMonth = false;
            } else if (currentDay > numDaysInMonth) {
                dayIndex = nextMonthDay++;
                isWithinMonth = false;
            } else {
                dayIndex = currentDay++;
                isWithinMonth = true;
            }

            cells.push({
                year,
                month,
                dayIndex,
                isWithinMonth,
                hasNote: getDailyNote(dayIndex, files, year, month),
                anniversaryNote: getAnniversaryNote(dayIndex, files, month),
                dayNotes: getDayNotes(app, metadataCache, files, dayIndex, year, month),
                className: isWithinMonth ? 'within-month' : 'outside-month',
                app
            });
        }

        daysGrid.push(cells);
    }

    return daysGrid;
}

export function buildCalendarYearIndex(
    files: TFile[],
    metadataCache: MetadataCache,
    year: number
): CalendarYearIndex {
    const dailyNoteByDate = new Map<string, string>();
    const anniversaryByMonthDay = new Map<string, TFile>();
    const eventsByDate = new Map<string, TFile[]>();

    for (const file of files) {
        const path = file.path;
        const eventDate = metadataCache.getFileCache(file)?.frontmatter?.date;

        const dailyMatch = path.match(
            /^100 Calendar\/(\d{4})\/(\d{2})\/(\d{4})(\d{2})(\d{2})\.md$/
        );
        if (dailyMatch) {
            const folderYear = parseInt(dailyMatch[1]);
            const folderMonth = parseInt(dailyMatch[2]);
            const fileYear = parseInt(dailyMatch[3]);
            const fileMonth = parseInt(dailyMatch[4]);
            const fileDay = parseInt(dailyMatch[5]);
            const survivesMonthlyFilter =
                typeof eventDate === 'string' &&
                eventDate.includes(`${year}-${pad2(folderMonth)}`);

            if (
                folderYear === year &&
                fileYear === year &&
                folderMonth === fileMonth &&
                survivesMonthlyFilter
            ) {
                const key = calendarDateKey(year, fileMonth, fileDay);
                if (!dailyNoteByDate.has(key)) {
                    dailyNoteByDate.set(key, path);
                }
            }
        }

        const anniversaryMatch = path.match(
            /\/Aniversaries\/(\d{2})\/(\d{2})(\d{2})\.md/
        );
        if (anniversaryMatch) {
            const folderMonth = parseInt(anniversaryMatch[1]);
            const fileMonth = parseInt(anniversaryMatch[2]);
            const day = parseInt(anniversaryMatch[3]);
            if (folderMonth === fileMonth) {
                const key = monthDayKey(folderMonth, day);
                if (!anniversaryByMonthDay.has(key)) {
                    anniversaryByMonthDay.set(key, file);
                }
            }
        }

        const fileName = path.split('/').pop();
        if (
            /^\d{8}\.md$/.test(fileName!) ||
            path.includes('/Aniversaries/') ||
            typeof eventDate !== 'string'
        ) {
            continue;
        }

        const eventYear = parseInt(eventDate.substring(0, 4));
        const eventMonth = parseInt(eventDate.substring(5, 7));
        const eventDay = parseInt(eventDate.substring(8, 10));
        const dailyPath = `100 Calendar/${year}/${pad2(eventMonth)}/${pad2(eventDay)}.md`;
        const survivesMonthlyFilter = eventDate.includes(
            `${year}-${pad2(eventMonth)}`
        );

        if (
            eventYear !== year ||
            !survivesMonthlyFilter ||
            path === dailyPath
        ) {
            continue;
        }

        const key = calendarDateKey(eventYear, eventMonth, eventDay);
        const events = eventsByDate.get(key);
        if (events) {
            events.push(file);
        } else {
            eventsByDate.set(key, [file]);
        }
    }

    return {
        dailyNoteByDate,
        anniversaryByMonthDay,
        eventsByDate,
    };
}

export function createDaysGridFromIndex({
    app,
    index,
    numRows,
    numDaysInMonth,
    dayOffset,
    year,
    month
}: {
    app: App;
    index: CalendarYearIndex;
    numRows: number;
    numDaysInMonth: number;
    dayOffset: number;
    year: number;
    month: number;
}): MonthGridProps['daysGrid'] {
    const daysGrid: MonthGridProps['daysGrid'] = [];
    let currentDay = 1;
    let nextMonthDay = 1;
    const prevMonthLastDay = getLastDayOfMonth(year, month - 1).getDate();

    for (let row = 0; row < numRows; row++) {
        const cells: MonthGridProps['daysGrid'][0] = [];

        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            const cellDay = row * 7 + dayOfWeek - dayOffset + 1;
            let dayIndex: number;
            let isWithinMonth: boolean;

            if (cellDay < 1) {
                dayIndex = prevMonthLastDay + cellDay;
                isWithinMonth = false;
            } else if (currentDay > numDaysInMonth) {
                dayIndex = nextMonthDay++;
                isWithinMonth = false;
            } else {
                dayIndex = currentDay++;
                isWithinMonth = true;
            }

            const dateKey = calendarDateKey(year, month, dayIndex);
            const events = index.eventsByDate.get(dateKey);
            cells.push({
                year,
                month,
                dayIndex,
                isWithinMonth,
                hasNote: index.dailyNoteByDate.get(dateKey) || false,
                anniversaryNote: index.anniversaryByMonthDay.get(
                    monthDayKey(month, dayIndex)
                ),
                dayNotes: events ? [...events] : [],
                className: isWithinMonth ? 'within-month' : 'outside-month',
                app
            });
        }

        daysGrid.push(cells);
    }

    return daysGrid;
}

export function createCalendarYearMonths(
    app: App,
    index: CalendarYearIndex,
    year: number
): CalendarMonthViewModel[] {
    return Array.from({ length: 12 }, (_, monthIndex) => {
        const month = monthIndex + 1;
        const firstDayOfMonth = getFirstDayOfMonth(year, month - 1);
        const lastDayOfMonth = getLastDayOfMonth(year, month - 1);
        const numDaysInMonth = lastDayOfMonth.getDate();
        const dayOffset = getDayOffset(firstDayOfMonth.getDay());
        const numRows = calculateNumRows(numDaysInMonth, dayOffset);
        const daysGrid = createDaysGridFromIndex({
            app,
            index,
            numRows,
            numDaysInMonth,
            dayOffset,
            year,
            month,
        });
        const monthName = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })}`;
        const monthNameFirstCase = monthName.charAt(0).toUpperCase() + monthName.slice(1);
        const monthNameAndYear = `${monthNameFirstCase} ${year}`;
        const currentMonth = new Date().getMonth() + 1;
        const cssCurrentMonth = currentMonth === month ? 'obs-current-month' : '';

        return {
            year,
            month,
            monthNameAndYear,
            cssCurrentMonth,
            daysGrid,
        };
    });
}

export function useCalendarYearLogic(app: App | undefined, year: number) {
    const [files, setFiles] = useState<TFile[]>(
        () => app?.vault.getMarkdownFiles() || []
    );

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

    if (!app) {
        return { months: [] as CalendarMonthViewModel[] };
    }

    const index = buildCalendarYearIndex(files, app.metadataCache, year);
    const months = createCalendarYearMonths(app, index, year);

    return { months };
}
