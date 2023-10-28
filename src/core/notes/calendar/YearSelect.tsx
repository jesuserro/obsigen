import React from 'react';

interface YearSelectProps {
  currentYear: number;
  onChange: (year: number) => void;
}

function YearSelect({ currentYear, onChange }: YearSelectProps): JSX.Element {
  const years = Array.from({ length: 2026 - 1974 }, (_, index) => 2025 - index + 1); 

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(event.target.value, 10);
    onChange(selectedYear);
  };

  return (
    <>
      <select value={currentYear} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </>
  );
}

export default YearSelect;
