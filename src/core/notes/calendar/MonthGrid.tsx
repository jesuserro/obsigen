import { App, MetadataCache, TFile } from 'obsidian';
import CalendarDay from './CalendarDay';
import { getAnniversaryNote, getDailyNote, getDayNotes } from './Month';

interface MonthGridProps {
    app: App;
    metadataCache: MetadataCache;
    files: TFile[];
    numRows: number;
    numDaysInMonth: number;
    dayOffset: number;
    year: number;
    month: number;
}

export function createDaysGrid({
    app,
    metadataCache,
    files,
    numRows,
    numDaysInMonth,
    dayOffset,
    year,
    month,
}: MonthGridProps): JSX.Element[] {

    const daysGrid = [];

    for (let row = 0; row < numRows; row++) {
        const cells = [];

        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            const dayIndex = row * 7 + dayOfWeek + 1 - dayOffset;
            const isWithinMonth = dayIndex >= 1 && dayIndex <= numDaysInMonth;

            const hasNote = getDailyNote(dayIndex, files, year, month);
            const anniversaryNote = getAnniversaryNote(dayIndex, files, month);

            const dayNotes = getDayNotes(app, metadataCache, files, dayIndex, year, month);
            if (dayNotes.length > 1) {
                dayNotes.sort((a, b) => {
                    const aDate = metadataCache.getFileCache(a)?.frontmatter?.date;
                    const bDate = metadataCache.getFileCache(b)?.frontmatter?.date;
                    if (aDate && bDate) {
                        return aDate.localeCompare(bDate);
                    }
                    return 0;
                });
            }

            cells.push(
                <td key={`cell-${year}-${String(month).padStart(2, '0')}-${row}-${dayOfWeek}`} className={isWithinMonth ? 'within-month' : 'outside-month'}>
                    {dayIndex > 0 && dayIndex <= numDaysInMonth ? (
                        <CalendarDay
                            key={`${year}-${String(month).padStart(2, '0')}-${String(dayIndex).padStart(2, '0')}`}
                            year={year}
                            month={month}
                            dayCounter={dayIndex}
                            hasNote={hasNote}
                            anniversaryNote={anniversaryNote}
                            dayNotes={dayNotes}
                            app={app}
                        />
                    ) : (
                        <span className="empty-day">{''}</span>
                    )}
                </td>
            );
        }

        daysGrid.push(<tr key={`row-${year}-${String(month).padStart(2, '0')}-${row}`}>{cells}</tr>);
    }

    return daysGrid;
}

export default createDaysGrid;
