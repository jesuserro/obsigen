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
    setYear(e.target.value);
  };

  // Guardar el año en el historial cuando el usuario salga del input o presione ENTER
  const saveYear = () => {
    const newYear = parseInt(year.toString(), 10);
    if (!isNaN(newYear)) {
      const newHistory = yearHistory.slice(0, currentIndex + 1);

      // Solo agrega el año si no está ya en el historial
      if (!newHistory.includes(newYear)) {
        setYearHistory([...newHistory, newYear]);
        setCurrentIndex(newHistory.length); // Actualiza el índice al final del nuevo historial
      } else {
        // Si el año ya está en el historial, simplemente actualiza el índice
        setCurrentIndex(newHistory.indexOf(newYear));
      }

      setYear(newYear); // Asegura que el estado se actualiza al valor correcto
      onChange(newYear); // Asegura que se pasa un número a onChange
    }
  };

  // Manejar el evento onBlur (cuando el usuario sale del campo)
  const handleYearBlur = () => {
    saveYear();
  };

  // Manejar el evento onKeyDown (cuando el usuario presiona una tecla)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevenir el comportamiento predeterminado
      saveYear();
    }
  };

  // Manejar el botón de limpiar
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
    onChange(currentYear); // Asegura que se pasa un número a onChange
  };

  // Manejar el botón de revertir
  const handleRevert = () => {
    if (currentIndex > 0) {
      const previousYear = yearHistory[currentIndex - 1];
      const parsedYear = typeof previousYear === 'number' ? previousYear : parseInt(previousYear.toString(), 10);
      if (!isNaN(parsedYear)) {
        setYear(parsedYear);
        setCurrentIndex(currentIndex - 1);
        onChange(parsedYear); // Asegura que se pasa un número a onChange
      }
    }
  };

  // Manejar el botón de redo
  const handleRedo = () => {
    if (currentIndex < yearHistory.length - 1) {
      const nextYear = yearHistory[currentIndex + 1];
      const parsedYear = typeof nextYear === 'number' ? nextYear : parseInt(nextYear.toString(), 10);
      if (!isNaN(parsedYear)) {
        setYear(parsedYear);
        setCurrentIndex(currentIndex + 1);
        onChange(parsedYear); // Asegura que se pasa un número a onChange
      }
    }
  };

  return (
    <div className="calendar-year-select">
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
