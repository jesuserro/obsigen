import { App, TFile } from 'obsidian';
import { useEffect, useState } from 'react';
import { useApp } from './../../hooks/useApp';
import CalendarDay from './CalendarDay';

interface CalendarMonthProps {
  year: number;
  month: number;
}

function getFirstDayOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1);
}

function getLastDayOfMonth(year: number, month: number): Date {
  return new Date(year, month + 1, 0);
}

function getDayOffset(dayOfWeek: number): number {
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
}

function calculateNumRows(numDaysInMonth: number, dayOffset: number): number {
  return Math.ceil((numDaysInMonth + dayOffset) / 7);
}

function createDaysGrid(numRows: number, numDaysInMonth: number, dayOffset: number, year: number, month:number): JSX.Element[] {
  const app = useApp() as App;
  const files = app?.vault.getMarkdownFiles() || [];
  const daysGrid = [];

  for (let row = 0; row < numRows; row++) {
    const cells = [];

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      const dayIndex = row * 7 + dayOfWeek + 1 - dayOffset;
      const isWithinMonth = dayIndex >= 1 && dayIndex <= numDaysInMonth;

      const hasNote = getDailyNote(dayIndex, files, year, month);
      const anniversaryNote = getAnniversaryNote(dayIndex, files, year, month);

      cells.push(
        <td key={dayOfWeek} className={isWithinMonth ? 'within-month' : 'outside-month'}>
          {dayIndex > 0 && dayIndex <= numDaysInMonth ? (
            <CalendarDay
              year = {year}
              month = {month + 1}
              dayCounter={dayIndex}
              hasNote={hasNote}
              anniversaryNote={anniversaryNote} 
              dayNotes={getDayNotes(dayIndex, files, year, month)}
            />
          ) : (
            <span className="empty-day">{''}</span>
          )}
        </td>
      );
    }

    daysGrid.push(<tr key={row}>{cells}</tr>);
  }

  return daysGrid;
}

// STATE fns
function isNoteRelatedToDay(note: TFile, year: number, month: number, dayCounter: number): boolean {
  // Construye la ruta esperada para la nota del día actual
  const dayDate = `${year}${String(month).padStart(2, '0')}${String(dayCounter).padStart(2, '0')}`;
  const notePath = `100 Calendar/Daily/${year}/${dayDate}.md`;

  // Compara la ruta de la nota con la ruta esperada
  return note.path === notePath;
}

function createDayState(year: number, month: number, day: number, cssclasses: []) {
  return {
    year,
    month,
    day,
    cssclasses: cssclasses || [],
  };
}

function getDayNotes(dayIndex: number, files: TFile[], year: number, month: number): TFile[] {
  month = month + 1;
  // const dayDateDashed = `${year}-${String(month).padStart(2,'0')}-${String(dayIndex).padStart(2, '0')`;

  const app = useApp() as App;
  const metadataCache = app.metadataCache;

  const [dayStates, setDayStates] = useState<TFile[]>([]); // Estado para el array de elementos dayNotes

  useEffect(() => {
    // Función que maneja los cambios en las notas
    const handleNoteChange = (file: TFile) => {
      // Verificar si la nota cambiada está relacionada con un día en el mes actual
      // Puedes hacer esto comprobando la fecha de la nota y comparándola con el mes y año actual.
      // Si es relevante, actualiza el estado del día correspondiente.
      if (isNoteRelatedToDay(file, year, month, dayIndex)) {
        // Actualiza el estado del día correspondiente
        const state = createDayState(year, month, dayIndex, file.frontmatter?.cssclasses || []);
        // Encuentra el índice del día correspondiente en el estado actual
        const dayStateIndex = dayStates.findIndex((dayState) =>
          dayState.year === state.year &&
          dayState.month === state.month &&
          dayState.day === state.day
        );

        // Si el día no existe en el estado, agrégalo. Si existe, actualiza el estado.
        if (dayStateIndex === -1) {
          setDayStates((prevStates) => [...prevStates, state]);
        } else {
          setDayStates((prevStates) => [
            ...prevStates.slice(0, dayStateIndex),
            state,
            ...prevStates.slice(dayStateIndex + 1),
          ]);
        }
      }
    };

    // Suscribirse al evento 'changed'
    metadataCache.on('changed', handleNoteChange);

    // Asegúrate de desuscribirte cuando el componente se desmonte
    return () => {
      metadataCache.off('changed', handleNoteChange);
    };
  }, [year, month, dayIndex, dayStates]);

  const dayNotes = files.filter((file) => {
    const path = file.path;
    if (path.includes('/Daily') || path.includes('/Aniversaries/')) {
      return false; // Excluye notas con '/Daily' en el path o '/Aniversaries/'
    }

    const eventDate = file.frontmatter?.date;
    if (typeof eventDate === 'string' && eventDate.includes(dayDateDashed)) {
      return true; // Incluye notas del día con YAML `date` coincidente
    }

    return false; // Excluye otras notas
  });

  return dayNotes.map((file) => {
    // Encuentra el estado correspondiente en el array de estados
    const dayState = dayStates.find((state) =>
      state.year === year &&
      state.month === month &&
      state.day === dayIndex
    );

    return {
      ...file,
      dayState: dayState,
    };
  });
}


// Nueva función para obtener la nota de aniversario
function getAnniversaryNote(dayIndex: number, files: TFile[], year: number, month: number): TFile | undefined {
  month = month + 1;
  const anniversaryPath = `/Aniversaries/${String(month).padStart(2, '0')}/${String(month).padStart(2, '0')}${String(dayIndex).padStart(2, '0')}.md`;
  return files.find(file => file.path.includes(anniversaryPath));
}

function getDailyNote(dayIndex: number, files: TFile[], year: number, month:number): string | false {
  
  month = month + 1;

  const dayDate = `${year}${String(month).padStart(2, '0')}${String(dayIndex).padStart(2, '0')}`;
  const notePath = `100 Calendar/Daily/${year}/${dayDate}.md`;

  const note = files.find(file => file.path === notePath);

  if (note?.path) {
    return note.path;
  }

  return false;
}

function CalendarMonth({year, month}: CalendarMonthProps): JSX.Element {
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const lastDayOfMonth = getLastDayOfMonth(year, month);
  const numDaysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const dayOffset = getDayOffset(firstDayOfWeek);
  const numRows = calculateNumRows(numDaysInMonth, dayOffset);
  const daysGrid = createDaysGrid(numRows, numDaysInMonth, dayOffset, year, month);

  let monthNameAndYear = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${year}`;
  monthNameAndYear = monthNameAndYear.charAt(0).toUpperCase() + monthNameAndYear.slice(1);

  return (
    <>
      <div>
        <h2>{monthNameAndYear}</h2>
        <table className="calendar-table">
          <thead>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead>
          <tbody>{daysGrid}</tbody>
        </table>
      </div>
    </>
  );
}

export default CalendarMonth;