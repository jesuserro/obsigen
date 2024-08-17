import { useState } from "react";

interface CalendarYearSelectProps {
  currentYear: number;
  onChange: (year: number) => void;
}

function CalendarYearSelect({ currentYear, onChange }: CalendarYearSelectProps): JSX.Element {
  const [year, setYear] = useState<number | string>(currentYear);
  const [yearHistory, setYearHistory] = useState<number[]>([currentYear]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(e.target.value, 10);
    if (!isNaN(newYear) && e.target.value.length === 4) {
      const newHistory = yearHistory.slice(0, currentIndex + 1); // Corta el historial en el índice actual
      setYearHistory([...newHistory, newYear]);
      setCurrentIndex(newHistory.length); // Actualiza el índice al final del nuevo historial
      setYear(newYear);
      onChange(newYear);
    } else {
      setYear(e.target.value); // Permite que el usuario siga escribiendo hasta llegar a 4 dígitos
    }
  };

  const handleClear = () => {
    const currentYear = new Date().getFullYear();
    const newHistory = yearHistory.slice(0, currentIndex + 1);
    setYearHistory([...newHistory, currentYear]);
    setCurrentIndex(newHistory.length);
    setYear(currentYear);
    onChange(currentYear);
  };

  const handleRevert = () => {
    if (currentIndex > 0) {
      const previousYear = yearHistory[currentIndex - 1];
      setYear(previousYear);
      setCurrentIndex(currentIndex - 1);
      onChange(previousYear);
    }
  };

  const handleRedo = () => {
    if (currentIndex < yearHistory.length - 1) {
      const nextYear = yearHistory[currentIndex + 1];
      setYear(nextYear);
      setCurrentIndex(currentIndex + 1);
      onChange(nextYear);
    }
  };

  return (
    <>
      <button onClick={handleRevert} className="revert-button" disabled={currentIndex === 0}>
        &#8592;
      </button>
      <input
        type="number"
        placeholder="Enter year"
        value={year}
        onChange={handleYearChange}
      />
      <button onClick={handleRedo} className="redo-button" disabled={currentIndex >= yearHistory.length - 1}>
        &#8594;
      </button>
      <button onClick={handleClear} className="clear-button">
        &#10006;
      </button>
    </>
  );
}

export default CalendarYearSelect;
