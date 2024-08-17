import { useState } from "react";

interface CalendarYearSelectProps {
  currentYear: number;
  onChange: (year: number) => void;
}

function CalendarYearSelect({ currentYear, onChange }: CalendarYearSelectProps): JSX.Element {
  const [year, setYear] = useState<number | string>(currentYear);

  const handleClear = () => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
    onChange(currentYear);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setYear(value);
    onChange(value);
  };

  return (
    <>
      <input
        type="number"
        placeholder="Enter year"
        value={year}
        onChange={handleChange}
      />
      <button onClick={handleClear} className="clear-button">
        &#10006;
      </button>
    </>
  );
}

export default CalendarYearSelect;
