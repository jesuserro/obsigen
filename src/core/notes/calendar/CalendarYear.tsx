import React from 'react';
import CalendarMonth from './CalendarMonth';

const CalendarYear: React.FC = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();

  const monthsGrid = Array.from({ length: 12 }, (_, month) => (
    <CalendarMonth key={String(month).padStart(2, '0')} year={currentYear} month={month} />
  ));

  return <div>{monthsGrid}</div>;
}

export default CalendarYear;