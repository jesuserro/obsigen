import CalendarMonth from './CalendarMonth';

interface CalendarYearProps {
  year: number;
}

function CalendarYear({ year }: CalendarYearProps): JSX.Element {
  
  const monthsGrid = Array.from({ length: 12 }, (_, month) => (
    <CalendarMonth key={String(month).padStart(2, '0')} year={year} month={month + 1} />
  ));

  return (
    <>
      <div>{monthsGrid}</div>
    </>
  );

}

export default CalendarYear;