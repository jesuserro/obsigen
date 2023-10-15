import { App, TFile } from 'obsidian';
import { useApp } from 'src/core/hooks/useApp';
import { Momento } from './../momento/Momento';
import { CalendarEvent } from './CalendarEvent';
import { CalendarIcon } from './CalendarIcon';


interface CalendarDayProps {
  year: number;
  month: number;
  dayCounter: number;
  hasNote: string | false;
  anniversaryNote: TFile | undefined; // Nueva prop para la nota de aniversario
  dayNotes: TFile[] | false;
}

function getCalendarEvent(index: number, note: TFile) {
  const icon = CalendarIcon.getIconByNote(note, 14);
  return (
    <a
      key={index}
      href={`obsidian://open?file=${encodeURIComponent(note.path)}`}
      title={getFileName(note.path)}
    >
      {icon}
      <span className="icon-description">{getFileName(note.path)}</span>
    </a>
  );
}

function getCalendarButton(calendarEvent: CalendarEvent, app: App) {
  
  const icon = CalendarIcon.getIcon("add", 14);
  
  const newEvent = async () => {
    
    await calendarEvent.openModal();
    const values = calendarEvent.getFormValues();
    await new Momento(app).createNote(values.title, values.description, values.startDate, values.selectedIcon);

  }

  return (
    <div onClick={newEvent}>
      {icon}
    </div>
  );
}

function CalendarDay({ year, month, dayCounter, hasNote, anniversaryNote, dayNotes }: CalendarDayProps): JSX.Element {

  const app = useApp() as App;
  const calendarEvent = new CalendarEvent(app, year, month, dayCounter);

  // Generamos un índice único para cada evento basado en su ruta
  const generateEventIndex = (note: TFile): number => {
    const hash = note.path.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return hash;
  };

  const btn = getCalendarButton(calendarEvent, app);
  const notePath = hasNote ? `obsidian://open?file=${encodeURIComponent(hasNote)}` : '';
  const anniversary = anniversaryNote ? getCalendarEvent(generateEventIndex(anniversaryNote), anniversaryNote) : null;
  const notesOfTheDay = dayNotes ? dayNotes.map((note, index) => getCalendarEvent(index, note)) : null;

  return (
    <>
      <div className="day-container">
        {hasNote && !dayNotes ? (
          <>
            <a href={notePath} title={getFileName(hasNote)}>
              <div className="day-number">{dayCounter}</div>
            </a>
            {btn}
            {anniversaryNote && (
              <div className="anniversary-note">{anniversary}</div>
            )}
          </>
        ) : hasNote && dayNotes ? (
          <>
            <div className="day-header">
              {anniversaryNote && (
                <div className="anniversary-note">{anniversary}</div>
              )}
              <a href={notePath} title={getFileName(hasNote)}>
                <div className="day-number">{dayCounter}</div>
              </a>
              {btn}
            </div>
            <div className="calendar-icons">
              {notesOfTheDay}
            </div>
          </>
        ) : dayNotes ? (
          <>
            <div className="day-header">
              {anniversaryNote && (
                <div className="anniversary-note">{anniversary}</div>
              )}
              <div className="day-number">{dayCounter}</div>
              {btn}
            </div>
            <div className="calendar-icons">
              {notesOfTheDay}
            </div>
          </>
        ) : (
          <>
            <div className="day-number">{dayCounter}</div>
            {anniversaryNote && (
              <div className="anniversary-note">{anniversary}</div>
            )}
            {btn}
          </>
        )}
      </div>
    </>
  );
}

function getFileName(path: string): string {
  // Extract the file name from the path
  const parts = path.split('/');
  return parts[parts.length - 1];
}

export default CalendarDay;