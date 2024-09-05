import DayUI from './DayUI';
import { MonthGridProps } from './Month';

export function MonthGrid({ daysGrid }: MonthGridProps): JSX.Element {
    return (
        <>
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
        </>
    );
}

export default MonthGrid;
