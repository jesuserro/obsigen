import { useApp } from './../../hooks/useApp';
import { useCalendarYearLogic } from './Month';
import MonthUI from './MonthUI';

interface CalendarYearProps {
  year: number;
}

function CalendarYear({ year }: CalendarYearProps): JSX.Element {
  const app = useApp();
  const { months } = useCalendarYearLogic(app, year);
  const monthsGrid = months.map((monthData) => {
    const monthKey = `${year}-${monthData.month.toString().padStart(2, '0')}`;

    return <MonthUI key={monthKey} {...monthData} />;
  });

  return (
    <>
      <div className='months-container'>{monthsGrid}</div>
    </>
  );
}

export default CalendarYear;
