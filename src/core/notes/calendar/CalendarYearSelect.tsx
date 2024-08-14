import React from 'react';

interface CalendarYearSelectProps {
  currentYear: number;
  onChange: (year: number) => void;
}

const generateYears = (): string[] => {
  const years: string[] = [];

  // Agregar años antes de Cristo
  for (let i = 500; i >= 1; i--) {
    years.push(`${i} AC`);
  }

  // Agregar años después de Cristo
  for (let i = 1; i <= 2030; i++) {
    years.push(`${i} DC`);
  }

  return years;
};

function CalendarYearSelect({ currentYear, onChange }: CalendarYearSelectProps): JSX.Element {
  const years = generateYears();

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    let selectedYear: number;

    if (selectedValue.includes('AC')) {
      selectedYear = -parseInt(selectedValue.replace(' AC', ''), 10);
    } else {
      selectedYear = parseInt(selectedValue.replace(' DC', ''), 10);
    }

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
      <input
        type="number"
        placeholder="Enter year"
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      />
    </>
  );
}

export default CalendarYearSelect;
