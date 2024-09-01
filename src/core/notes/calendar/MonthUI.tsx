import { TFile } from 'obsidian';
import { useEffect, useRef, useState } from 'react';
import { useApp } from './../../hooks/useApp';
import { calculateNumRows, CalendarMonthProps, getDayOffset, getFirstDayOfMonth, getLastDayOfMonth } from './Month';
import { createDaysGrid } from './MonthGrid';

function MonthUI({ year, month }: CalendarMonthProps): JSX.Element {
    const app = useApp();
    
    if (!app) {
        return <div>Error: La aplicación no está disponible.</div>;
    }

    const [files, setFiles] = useState<TFile[]>(app.vault.getMarkdownFiles() || []);

    useEffect(() => {
        const updateFiles = () => {
            setFiles(app.vault.getMarkdownFiles() || []);
        };

        // Escuchar tanto eventos de creación como de eliminación de archivos
        app.vault.on('create', updateFiles);
        app.vault.on('delete', updateFiles);
        app.metadataCache.on('changed', updateFiles);

        return () => {
            app.vault.off('create', updateFiles);
            app.vault.off('delete', updateFiles);
            app.metadataCache.off('changed', updateFiles);
        };
    }, [app]);

    const metadataCache = app.metadataCache;
    const monthStr = month < 10 ? '0' + month : month.toString();
    const dateStr = `${year}-${monthStr}`;

    const filteredFiles = files.filter((file) => {
        const eventDate = metadataCache.getFileCache(file)?.frontmatter?.date;
        const anniversaryPath = `/Aniversaries/${String(month).padStart(2, '0')}`;

        return typeof eventDate === 'string' && eventDate.includes(dateStr) || file.path.includes(anniversaryPath);
    });

    const firstDayOfMonth = getFirstDayOfMonth(year, month - 1);
    const lastDayOfMonth = getLastDayOfMonth(year, month);
    const numDaysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const dayOffset = getDayOffset(firstDayOfWeek);
    const numRows = calculateNumRows(numDaysInMonth, dayOffset);

    const daysGrid = createDaysGrid({ 
        app, 
        metadataCache, 
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

    return (
        <div ref={monthRef} className={`obs-month ${cssCurrentMonth}`}>
            <h2>{monthNameAndYear}</h2>
            <table className="calendar-table">
                <thead>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody>{daysGrid}</tbody>
            </table>
        </div>
    );
}

export default MonthUI;
