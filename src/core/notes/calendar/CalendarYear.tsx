import { App } from 'obsidian';
import { useApp } from './../../hooks/useApp';
import CalendarMonth from './CalendarMonth';

function CalendarYear(): JSX.Element {
  const currentYear = new Date().getFullYear();

  const app = useApp() as App;
  const files = app.vault.getFiles();

  const monthsGrid = Array.from({ length: 12 }, (_, month) => (
    <CalendarMonth key={String(month).padStart(2, '0')} year={currentYear} month={month} files={files} />
  ));

  return (
    <>
      <div>{monthsGrid}</div>
    </>
  );

}

export default CalendarYear;