import CalendarMonth from './CalendarMonth';

interface CalendarYearProps {
  year: number;
}

function CalendarYear({ year }: CalendarYearProps): JSX.Element {
  
  const monthsGrid = Array.from({ length: 12 }, (_, month) => {
    month = month + 1;
    const monthKey = `${year}-${(month).toString().padStart(2, '0')}`;
    
    return (
      <CalendarMonth key={monthKey} year={year} month={month} />
    );
  });

  return (
    <>
      <div className='months-container'>{monthsGrid}</div>
    </>
  );

}

export default CalendarYear;