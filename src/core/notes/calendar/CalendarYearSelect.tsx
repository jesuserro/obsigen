import React from 'react';

interface CalendarYearSelectProps {
  currentYear: number;
  onChange: (year: number) => void;
}

function CalendarYearSelect({ currentYear, onChange }: CalendarYearSelectProps): JSX.Element {
  const years = Array.from({ length: 2030 - 1897 }, (_, index) => 2029 - index + 1); 

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(event.target.value, 10);
    onChange(selectedYear);
  };

  return (
    <>
      <select id="obs-year-picker" value={currentYear} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </>
  );
}

export default CalendarYearSelect;
