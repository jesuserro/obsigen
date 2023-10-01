import { TFile } from 'obsidian';
import { CalendarIcon } from './CalendarIcon';

interface CalendarDayProps {
  dayCounter: number;
  hasNote: string | false;
  dayNotes: TFile[] | false;
}

function getCalendarEvent(index: number, note: TFile) {
  const icon = CalendarIcon.getIcon(note);
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


function CalendarDay({ dayCounter, hasNote, dayNotes }: CalendarDayProps): JSX.Element {
  let notePath = '';
  if (hasNote) {
    notePath = `obsidian://open?file=${encodeURIComponent(hasNote)}`;
  }
  
  const boundGetCalendarEvent = getCalendarEvent.bind(this);

  return (
    <>
      <div className="day-container">
        {hasNote && !dayNotes ? (
          <>
            <a href={notePath} title={getFileName(hasNote)}>
              <div className="day-number">{dayCounter}</div>
            </a>
          </>
        ) : hasNote && dayNotes ? (
          <>
            <a href={notePath} title={getFileName(hasNote)}>
              <div className="day-number">{dayCounter}</div>
            </a>
            <div className="calendar-icons">
              {dayNotes.map((note, index) => (
                boundGetCalendarEvent(index, note)
              ))}
            </div>
          </>
        ) : dayNotes ? (
          <>
            <div className="day-number">{dayCounter}</div>
            <div className="calendar-icons">
              {dayNotes.map((note, index) => (
                boundGetCalendarEvent(index, note)
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="day-number">{dayCounter}</div>
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