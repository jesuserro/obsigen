import { useEffect, useRef } from 'react';
import DayUI from './DayUI';
import { CalendarMonthViewModel } from './Month';

function MonthUI({
    cssCurrentMonth,
    daysGrid,
    monthNameAndYear,
}: CalendarMonthViewModel): JSX.Element {
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
                <tbody>
                    {daysGrid.map((row, rowIndex) => (
                        <tr key={`row-${rowIndex}`}>
                            {row.map((cell, cellIndex) => (
                                <td key={`cell-${rowIndex}-${cellIndex}`} className={cell.className}>
                                    {cell.dayIndex > 0 && cell.isWithinMonth ? (
                                        <DayUI
                                            key={`${cell.year}-${String(cell.month).padStart(2, '0')}-${String(cell.dayIndex).padStart(2, '0')}`}
                                            year={cell.year}
                                            month={cell.month}
                                            dayCounter={cell.dayIndex}
                                            hasNote={cell.hasNote}
                                            anniversaryNote={cell.anniversaryNote}
                                            dayNotes={cell.dayNotes}
                                            app={cell.app}
                                        />
                                    ) : (
                                        <span className="empty-day">{''}</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MonthUI;
