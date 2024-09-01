import { useApp } from './../../hooks/useApp';
import { CalendarMonthProps, useMonthLogic } from './Month';

function MonthUI({ year, month }: CalendarMonthProps): JSX.Element {
    const app = useApp();

    if (!app) {
        return <div>Error: La aplicación no está disponible.</div>;
    }

    const { monthRef, cssCurrentMonth, monthNameAndYear, daysGrid } = useMonthLogic(app, year, month);

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
