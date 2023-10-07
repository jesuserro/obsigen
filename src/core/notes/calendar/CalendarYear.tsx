import { Notice } from 'obsidian';
import CalendarMonth from './CalendarMonth';

function CalendarYear(): JSX.Element {
  const currentYear = new Date().getFullYear();

  const monthsGrid = Array.from({ length: 12 }, (_, month) => (
    <CalendarMonth key={String(month).padStart(2, '0')} year={currentYear} month={month} />
  ));

  const handleAddEvent = () => {
    new Notice("Hello World!");
  };

  return (
    <>
      <div className="button-container">
        <button onClick={handleAddEvent}>Añadir <i className="icon-cross"></i></button>
      </div>
      <div>{monthsGrid}</div>
    </>
  );

}

export default CalendarYear;