import { useApp } from './../../hooks/useApp'; // Importa useApp desde donde está definido
import CalendarDay from './CalendarDay'; // Asegúrate de que CalendarDay esté importado correctamente
import { CalendarMonthProps, useMonthLogic } from './Month'; // Asegúrate de importar useMonthLogic correctamente

function MonthUI({ year, month }: CalendarMonthProps): JSX.Element {
    const {
        monthRef,
        cssCurrentMonth,
        monthNameAndYear,
        daysGrid,
    } = useMonthLogic(useApp(), year, month);

    const daysGridElements = daysGrid.map((row, rowIndex) => (
        <tr key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
                <td key={`cell-${rowIndex}-${cellIndex}`} className={cell.className}>
                    {cell.dayIndex > 0 && cell.isWithinMonth ? (
                        <CalendarDay
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
    ));

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
                <tbody>{daysGridElements}</tbody>
            </table>
        </div>
    );
}

export default MonthUI;
