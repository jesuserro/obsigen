import { useState } from "react";

interface CalendarYearSelectProps {
  currentYear: number;
  onChange: (year: number) => void;
  onAddEvent: () => void;  // Añadir esta prop para manejar el evento de añadir
}

function CalendarYearSelect({ currentYear, onChange, onAddEvent }: CalendarYearSelectProps): JSX.Element {
  const [year, setYear] = useState<number | string>(currentYear);
  const [yearHistory, setYearHistory] = useState<(number | string)[]>([currentYear]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const saveYear = () => {
    const newYear = parseInt(year.toString(), 10);
    if (!isNaN(newYear)) {
      const newHistory = yearHistory.slice(0, currentIndex + 1);
      if (!newHistory.includes(newYear)) {
        setYearHistory([...newHistory, newYear]);
        setCurrentIndex(newHistory.length);
      } else {
        setCurrentIndex(newHistory.indexOf(newYear));
      }
      setYear(newYear);
      onChange(newYear);
    }
  };

  const handleYearBlur = () => saveYear();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveYear();
    }
  };

  const handleClear = () => {
    const currentYear = new Date().getFullYear();
    const newHistory = yearHistory.slice(0, currentIndex + 1);
    if (!newHistory.includes(currentYear)) {
      setYearHistory([...newHistory, currentYear]);
      setCurrentIndex(newHistory.length);
    } else {
      setCurrentIndex(newHistory.indexOf(currentYear));
    }
    setYear(currentYear);
    onChange(currentYear);
  };

  const handleRevert = () => {
    if (currentIndex > 0) {
      const previousYear = yearHistory[currentIndex - 1];
      const parsedYear = typeof previousYear === 'number' ? previousYear : parseInt(previousYear.toString(), 10);
      if (!isNaN(parsedYear)) {
        setYear(parsedYear);
        setCurrentIndex(currentIndex - 1);
        onChange(parsedYear);
      }
    }
  };

  const handleRedo = () => {
    if (currentIndex < yearHistory.length - 1) {
      const nextYear = yearHistory[currentIndex + 1];
      const parsedYear = typeof nextYear === 'number' ? nextYear : parseInt(nextYear.toString(), 10);
      if (!isNaN(parsedYear)) {
        setYear(parsedYear);
        setCurrentIndex(currentIndex + 1);
        onChange(parsedYear);
      }
    }
  };

  return (
    <div className="calendar-year-select">
      <button onClick={onAddEvent} className="add-event-button">+</button>
      <button onClick={handleRevert} className="revert-button" disabled={currentIndex === 0}>
        &#8592;
      </button>
      <input
        type="text"
        placeholder="Enter year"
        value={year}
        onChange={handleYearChange}
        onBlur={handleYearBlur}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleRedo} className="redo-button" disabled={currentIndex >= yearHistory.length - 1}>
        &#8594;
      </button>
      <button onClick={handleClear} className="clear-button">
        &#10006;
      </button>
    </div>
  );
}

export default CalendarYearSelect;
