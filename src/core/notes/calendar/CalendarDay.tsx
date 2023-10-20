import { App, TFile } from 'obsidian';
import { useApp } from 'src/core/hooks/useApp';
import { Momento } from './../momento/Momento';
import { CalendarEvent, FormValues } from './CalendarEvent';
import { CalendarIcon } from './CalendarIcon';

interface CalendarDayProps {
  year: number;
  month: number;
  dayCounter: number;
  hasNote: string | false;
  anniversaryNote: TFile | undefined;
  dayNotes: TFile[] | false;
}

const getFileName = (path: string) => {
  const parts = path.split('/');
  return parts[parts.length - 1];
};

const hashCode = (str: string) => {
  let hash = 0;
  if (str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }

  return hash;
};

const generateEventIndex = (note: TFile): number => {
  return hashCode(note.path);
};

const getCalendarEvent = (index: number, note: TFile) => {
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
};

const getCalendarButton = (app: App, year: number, month: number, dayCounter: number) => {
  
  const fnEventForm = async () => {
    await new CalendarEvent(app, year, month, dayCounter).openModal()
    .then((values: FormValues) => {
      new Momento(app).createNote(values.title, values.description, values.startDate, values.selectedIcon);
    })
    .catch((error) => {
      // Manejar el error si es necesario
      console.log(error);
    });
  };

  const icon = CalendarIcon.getIcon("add", 14);

  return (
    <div onClick={fnEventForm}>
      {icon}
    </div>
  );
};

const CalendarDay = ({ year, month, dayCounter, hasNote, anniversaryNote, dayNotes }: CalendarDayProps) => {
  const app = useApp() as App;
  const btn = getCalendarButton(app, year, month, dayCounter);
  const notePath = hasNote ? `obsidian://open?file=${encodeURIComponent(hasNote)}` : '';
  const anniversary = anniversaryNote ? getCalendarEvent(generateEventIndex(anniversaryNote), anniversaryNote) : null;
  const notesOfTheDay = dayNotes ? dayNotes.map((note, index) => getCalendarEvent(generateEventIndex(note), note)) : null;

  return (
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
  );
};

export default CalendarDay;