
interface CalendarYearSelectProps {
  currentYear: number;
  onChange: (year: number) => void;
}

function CalendarYearSelect({ currentYear, onChange }: CalendarYearSelectProps): JSX.Element {
  
  return (
    <>
      <input
        type="number"
        placeholder="Enter year"
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      />
    </>
  );
}

export default CalendarYearSelect;
