import { App, MetadataCache, TFile } from 'obsidian';
import { CalendarEvent } from './CalendarEvent';
import { CalendarIcon } from './CalendarIcon';

interface CalendarDayProps {
  year: number;
  month: number;
  dayCounter: number;
  hasNote: string | false;
  anniversaryNote: TFile | undefined;
  dayNotes: TFile[] | false;
  app: App
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

const getCalendarEvent = (year: number, month: number, dayCounter: number, index: number, note: TFile, metadataCache: MetadataCache) => {

  const mykey = `${year}-${month}-${dayCounter}${index}`;

  const frontmatter = metadataCache.getFileCache(note)?.frontmatter;
  const cssClasses = frontmatter?.cssclasses || [];

  const icon = CalendarIcon.getIconByNote(cssClasses, note, 18);

  const isHoliday = cssClasses.includes("holiday");

  const dayContainerClasses = `day-event-container ${isHoliday ? 'holiday' : ''}`;
 
  return (
    <div key={mykey} className={dayContainerClasses}>
      <a
        href={`obsidian://open?file=${encodeURIComponent(note.path)}`}
        title={getFileName(note.path)}
      >
        {icon}
        <span className="icon-description">{getFileName(note.path)}</span>
      </a>
    </div>
  );
};

const CalendarDay = ({ year, month, dayCounter, hasNote, anniversaryNote, dayNotes, app }: CalendarDayProps) => {
  
    const fnEventForm = async () => {
        // Crear manualmente la fecha para años menores a 1000 d.C.
        const date = new Date();
        date.setFullYear(year);  // Ajustamos el año manualmente
        date.setMonth(month - 1);  // Restamos 1 porque los meses en JavaScript son de 0 a 11
        date.setDate(dayCounter);  // Ajustamos el día
    
        // Aseguramos que las horas, minutos y segundos estén en cero para evitar problemas de hora
        date.setHours(0, 0, 0, 0);
    
        console.log('date', `${year}-${month}-${dayCounter}`, date);
    
        await new CalendarEvent(app, date).openModal();
    };

  const icon = CalendarIcon.getIcon("add", 18);

  const btn = (
    <div onClick={fnEventForm}>
      {icon}
    </div>
  );

  const notePath = hasNote ? `obsidian://open?file=${encodeURIComponent(hasNote)}` : '';
  const anniversary = anniversaryNote ? getCalendarEvent(year, month, dayCounter, generateEventIndex(anniversaryNote), anniversaryNote, app.metadataCache) : null;
  const notesOfTheDay = dayNotes ? dayNotes.map((note, index) => getCalendarEvent(year, month, dayCounter, generateEventIndex(note), note, app.metadataCache)) : null;

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