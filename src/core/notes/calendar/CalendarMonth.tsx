import { App, MetadataCache, TFile } from 'obsidian';
import { useEffect, useRef, useState } from 'react';
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
  return new Date(year, month, 0);
}

function getDayOffset(dayOfWeek: number): number {
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
}

function calculateNumRows(numDaysInMonth: number, dayOffset: number): number {
  return Math.ceil((numDaysInMonth + dayOffset) / 7);
}

function createDaysGrid(app:App, metadataCache: MetadataCache, files: TFile[], numRows: number, numDaysInMonth: number, dayOffset: number, year: number, month:number): JSX.Element[] {
  
  const daysGrid = [];

  for (let row = 0; row < numRows; row++) {
    const cells = [];

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      const dayIndex = row * 7 + dayOfWeek + 1 - dayOffset;
      const isWithinMonth = dayIndex >= 1 && dayIndex <= numDaysInMonth;

      const hasNote = getDailyNote(dayIndex, files, year, month);
      const anniversaryNote = getAnniversaryNote(dayIndex, files, month);

      const dayNotes = getDayNotes(app, metadataCache, files, dayIndex, year, month);
      // Order dayNotes by date just if dayNotes has more than one note
      if (dayNotes.length > 1){
        dayNotes.sort((a, b) => {
          const aDate = metadataCache.getFileCache(a)?.frontmatter?.date;
          const bDate = metadataCache.getFileCache(b)?.frontmatter?.date;
          if (aDate && bDate) {
            return aDate.localeCompare(bDate);
          }
          return 0;
        });
      }

      cells.push(
        <td key={`cell-${year}-${String(month).padStart(2, '0')}-${row}-${dayOfWeek}`} className={isWithinMonth ? 'within-month' : 'outside-month'}>
          {dayIndex > 0 && dayIndex <= numDaysInMonth ? (
            <CalendarDay
              key={`${year}-${String(month).padStart(2, '0')}-${String(dayIndex).padStart(2, '0')}`}
              year = {year}
              month = {month}
              dayCounter={dayIndex}
              hasNote={hasNote}
              anniversaryNote={anniversaryNote} 
              dayNotes={dayNotes}
              app={app}
            />
          ) : (
            <span className="empty-day">{''}</span>
          )}
        </td>
      );
    }

    daysGrid.push(<tr key={`row-${year}-${String(month).padStart(2, '0')}-${row}`}>{cells}</tr>);
  }

  return daysGrid;
}

/**
 * Función de estado (state function) que comprueba si una nota está relacionada con un día en particular
 * @param metadataCache
 * @param note
 * @param year
 * @param month
 * @param dayCounter
 * @returns
 * @description
 * 1. Obtiene la fecha del frontmatter de la nota
 * 2. Extrae el año, mes y día de la fecha de la nota
 * 3. Compara con la fecha deseada
 */
function isNoteRelatedToDay(metadataCache: MetadataCache, note: TFile, year: number, month: number, dayCounter: number): boolean {
  // Obtiene la fecha del frontmatter de la nota
  const noteDate = metadataCache.getFileCache(note)?.frontmatter?.date;

  if (typeof noteDate === 'string') {
    // Extrae el año, mes y día de la fecha de la nota
    const noteYear = parseInt(noteDate.substring(0, 4));
    const noteMonth = parseInt(noteDate.substring(5, 7));
    const noteDay = parseInt(noteDate.substring(8, 10));

    // Compara con la fecha deseada
    return noteYear === year && noteMonth === month && noteDay === dayCounter;
  }else{
    // Necesario para el delete de eventos. Si no existe la nota porque se ha borrado:
    const dayDate = `${year}${String(month).padStart(2, '0')}${String(dayCounter).padStart(2, '0')}`;
    return note.path.includes(`/${dayDate}`);
  }

}

function isNoteRelatedToDayDelete(note: TFile, year: number, month: number, dayCounter: number): boolean {
  // Construye la ruta esperada para la nota del día actual
  const dayDate = `${year}${String(month).padStart(2, '0')}${String(dayCounter).padStart(2, '0')}`;
  return note.path.includes(`/${dayDate}`);
}

function createDayState(file: TFile, year: number, month: number, day: number, cssclasses: []) {
  return {
    file,
    year,
    month,
    day,
    cssclasses: cssclasses || [],
  };
}

function getDayNotes(app: App, metadataCache: MetadataCache, files: TFile[], dayIndex: number, year: number, month: number): TFile[] {
  
  const dayPadded = String(dayIndex).padStart(2, '0');
  const monthPadded = String(month).padStart(2, '0');
  const dayDate = `${year}${monthPadded}${dayPadded}`;
  const dayDateDashed = `${year}-${monthPadded}-${dayPadded}`;
  const dailyPath = `100 Calendar/${year}/${monthPadded}/${dayDate}.md`;

  const [dayStates, setDayStates] = useState<({ file:TFile, year: number; month: number; day: number; cssclasses: [] })[]>([]);

  useEffect(() => {
    const handleNoteChange = (file: TFile) => {
      if (isNoteRelatedToDay(metadataCache, file, year, month, dayIndex)) {
        const cssclasses = metadataCache.getFileCache(file)?.frontmatter?.cssclasses || [];
        const state = createDayState(file, year, month, dayIndex, cssclasses || []);
        const dayStateIndex = dayStates.findIndex((dayState) =>
          isDayState(dayState) && // Comprobar si es un objeto de estado
          dayState.year === state.year &&
          dayState.month === state.month &&
          dayState.day === state.day &&
          dayState.cssclasses === state.cssclasses
        );

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

    app.vault.on("delete", (file) => {
        if (!(file instanceof TFile)) return;
        
        if (isNoteRelatedToDayDelete(file, year, month, dayIndex)) {
          // Llama a handleNoteChange para manejar la eliminación del archivo
          handleNoteChange(file);
        }
    })
    
    metadataCache.on('changed', handleNoteChange);

    return () => {
      metadataCache.off('changed', handleNoteChange);
    };
  }, [year, month, dayIndex, dayStates]);

  const dayNotes = files.filter((file) => {
    const path = file.path;
    if (path == dailyPath || path.includes('/Aniversaries/')) {
      return false;
    }
    const eventDate = metadataCache.getFileCache(file)?.frontmatter?.date;
    if (typeof eventDate === 'string' && eventDate.includes(dayDateDashed)) {
      return true;
    }

    return false;
  });

  // Crea un nuevo array que combina elementos de dayNotes con sus estados correspondientes
  const dayNotesWithStates = dayNotes.map((file) => {
    const dayState = dayStates.find((state) =>
      isDayState(state) && // Comprobar si es un objeto de estado
      state.year === year &&
      state.month === month &&
      state.day === dayIndex
    );

    if (dayState) {
      return {
        ...file,
        dayState: dayState as { year: number; month: number; day: number; cssclasses: [] }, // Cast a { year: number; month: number; day: number; cssclasses: [] }
      };
    } else {
      return file;
    }
  });

  return dayNotesWithStates;
}

// Función auxiliar para verificar si es un objeto de estado
function isDayState(obj: TFile | { year: number; month: number; day: number; cssclasses: [] }): obj is { year: number; month: number; day: number; cssclasses: [] } {
  return 'year' in obj && 'month' in obj && 'day' in obj;
}

// Nueva función para obtener la nota de aniversario
function getAnniversaryNote(dayIndex: number, files: TFile[], month: number): TFile | undefined {
  const anniversaryPath = `/Aniversaries/${String(month).padStart(2, '0')}/${String(month).padStart(2, '0')}${String(dayIndex).padStart(2, '0')}.md`;
  return files.find(file => file.path.includes(anniversaryPath));
}

function getDailyNote(dayIndex: number, files: TFile[], year: number, month:number): string | false {
  
  const dayPadded = String(dayIndex).padStart(2, '0');
  const monthPadded = String(month).padStart(2, '0');
  const dayDate = `${year}${monthPadded}${dayPadded}`;
  const notePath = `100 Calendar/${year}/${monthPadded}/${dayDate}.md`;

  const note = files.find(file => file.path === notePath);

  if (note?.path) {
    return note.path;
  }

  return false;
}

function CalendarMonth({ year, month }: CalendarMonthProps): JSX.Element {
  const app = useApp() as App;
  const metadataCache = app.metadataCache;
  const files = app?.vault.getMarkdownFiles();
  const monthStr = month < 10 ? '0' + month : month.toString();
  const dateStr = `${year}-${monthStr}`;

  const filteredFiles = files.filter((file) => {
    const eventDate = metadataCache.getFileCache(file)?.frontmatter?.date;
    
    const anniversaryPath = `/Aniversaries/${String(month).padStart(2, '0')}`;
    
    if (typeof eventDate === 'string' && (eventDate.includes(dateStr)) || file.path.includes(anniversaryPath)) {
      return true;
    }
  });
  
  const firstDayOfMonth = getFirstDayOfMonth(year, month - 1);
  const lastDayOfMonth = getLastDayOfMonth(year, month);
  const numDaysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const dayOffset = getDayOffset(firstDayOfWeek);
  const numRows = calculateNumRows(numDaysInMonth, dayOffset);

  // console.log(month, firstDayOfMonth, lastDayOfMonth, numDaysInMonth, filteredFiles.length);

  const daysGrid = createDaysGrid(app, metadataCache, filteredFiles, numRows, numDaysInMonth, dayOffset, year, month );

  const monthName = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })}`;
  const monthNameFirstCase = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const monthNameAndYear = `${monthNameFirstCase} ${year}`;

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  let cssCurrentMonth = '';
  if (currentMonth === month) {
    cssCurrentMonth = 'obs-current-month';
  }

  const monthRef = useRef<HTMLDivElement | null>(null); // Crea una referencia

  useEffect(() => {
    if (cssCurrentMonth === 'obs-current-month' && monthRef.current) {
      monthRef.current.scrollIntoView();
    }
  }, [cssCurrentMonth]);
  
  return (
    <>
      <div ref={monthRef} className={`obs-month ${cssCurrentMonth}`}>
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