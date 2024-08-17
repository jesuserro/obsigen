import { useState } from "react";

interface CalendarYearSelectProps {
  currentYear: number;
  onChange: (year: number) => void;
}

function CalendarYearSelect({ currentYear, onChange }: CalendarYearSelectProps): JSX.Element {
  const [year, setYear] = useState<number | string>(currentYear);
  const [yearHistory, setYearHistory] = useState<(number | string)[]>([currentYear]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Manejar el cambio de año en el input
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value); // Permite cualquier valor en el input (incluyendo negativos y diferentes longitudes)
  };

  // Guardar el año en el historial cuando el usuario salga del input
  const handleYearBlur = () => {
    const newYear = parseInt(year.toString(), 10);
    if (!isNaN(newYear)) {
      const newHistory = yearHistory.slice(0, currentIndex + 1); // Corta el historial en el índice actual
      setYearHistory([...newHistory, newYear]);
      setCurrentIndex(newHistory.length); // Actualiza el índice al final del nuevo historial
      setYear(newYear); // Asegura que el estado se actualiza al valor correcto
      onChange(newYear); // Asegura que se pasa un número a onChange
    }
  };

  // Manejar el botón de limpiar
  const handleClear = () => {
    const currentYear = new Date().getFullYear();
    const newHistory = yearHistory.slice(0, currentIndex + 1);
    setYearHistory([...newHistory, currentYear]);
    setCurrentIndex(newHistory.length);
    setYear(currentYear);
    onChange(currentYear); // Asegura que se pasa un número a onChange
  };

  // Manejar el botón de revertir
  const handleRevert = () => {
    if (currentIndex > 0) {
      const previousYear = yearHistory[currentIndex - 1];
      if (typeof previousYear === 'number') {
        setYear(previousYear);
        setCurrentIndex(currentIndex - 1);
        onChange(previousYear); // Asegura que se pasa un número a onChange
      } else {
        const parsedYear = parseInt(previousYear.toString(), 10);
        if (!isNaN(parsedYear)) {
          setYear(parsedYear);
          setCurrentIndex(currentIndex - 1);
          onChange(parsedYear); // Asegura que se pasa un número a onChange
        }
      }
    }
  };

  // Manejar el botón de redo
  const handleRedo = () => {
    if (currentIndex < yearHistory.length - 1) {
      const nextYear = yearHistory[currentIndex + 1];
      if (typeof nextYear === 'number') {
        setYear(nextYear);
        setCurrentIndex(currentIndex + 1);
        onChange(nextYear); // Asegura que se pasa un número a onChange
      } else {
        const parsedYear = parseInt(nextYear.toString(), 10);
        if (!isNaN(parsedYear)) {
          setYear(parsedYear);
          setCurrentIndex(currentIndex + 1);
          onChange(parsedYear); // Asegura que se pasa un número a onChange
        }
      }
    }
  };

  return (
    <>
      <button onClick={handleRevert} className="revert-button" disabled={currentIndex === 0}>
        &#8592;
      </button>
      <input
        type="text"
        placeholder="Enter year"
        value={year}
        onChange={handleYearChange}
        onBlur={handleYearBlur} // Se guarda el año al salir del input
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
