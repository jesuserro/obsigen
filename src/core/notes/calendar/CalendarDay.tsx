import { Notice, TFile } from 'obsidian';
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

function getCalendarButton(index: number) {
  const icon = CalendarIcon.getIcon("add", 14);
  const handleAddEvent = () => {
    new Notice(`Hello ${index}`);
  };
  return (
    <div onClick={handleAddEvent}>
      {icon}
    </div>
  );
}


function CalendarDay({ year, month, dayCounter, hasNote, anniversaryNote, dayNotes }: CalendarDayProps): JSX.Element {
  let notePath = '';
  if (hasNote) {
    notePath = `obsidian://open?file=${encodeURIComponent(hasNote)}`;
  }
  
  const boundGetCalendarEvent = getCalendarEvent.bind(this);
  const boundGetCalendarButton = getCalendarButton.bind(this);

  // Generamos un índice único para cada evento basado en su ruta
  const generateEventIndex = (note: TFile): number => {
    const hash = note.path.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    return hash;
  };

  return (
    <>
      <div className="day-container">
        {hasNote && !dayNotes ? (
          <>
            <a href={notePath} title={getFileName(hasNote)}>
              <div className="day-number">{dayCounter}</div>
            </a>
            {boundGetCalendarButton(`obs-add-"${dayCounter}-${month}-${year}"`)}
            {anniversaryNote && (
              <div className="anniversary-note">{boundGetCalendarEvent(generateEventIndex(anniversaryNote), anniversaryNote)}</div>
            )}
          </>
        ) : hasNote && dayNotes ? (
          <>
            <div className="day-header">
              {anniversaryNote && (
                <div className="anniversary-note">{boundGetCalendarEvent(generateEventIndex(anniversaryNote), anniversaryNote)}</div>
              )}
              <a href={notePath} title={getFileName(hasNote)}>
                <div className="day-number">{dayCounter}</div>
              </a>
              {boundGetCalendarButton(`obs-add-"${dayCounter}-${month}-${year}"`)}
            </div>
            <div className="calendar-icons">
              {dayNotes.map((note, index) => (
                boundGetCalendarEvent(index, note)
              ))}
            </div>
          </>
        ) : dayNotes ? (
          <>
            <div className="day-header">
              {anniversaryNote && (
                <div className="anniversary-note">{boundGetCalendarEvent(generateEventIndex(anniversaryNote), anniversaryNote)}</div>
              )}
              <div className="day-number">{dayCounter}</div>
              {boundGetCalendarButton(`obs-add-"${dayCounter}-${month}-${year}"`)}
            </div>
            <div className="calendar-icons">
              {dayNotes.map((note, index) => (
                boundGetCalendarEvent(index, note)
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="day-number">{dayCounter}</div>
            {anniversaryNote && (
              <div className="anniversary-note">{boundGetCalendarEvent(generateEventIndex(anniversaryNote), anniversaryNote)}</div>
            )}
            {boundGetCalendarButton(`obs-add-"${dayCounter}-${month}-${year}"`)}
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