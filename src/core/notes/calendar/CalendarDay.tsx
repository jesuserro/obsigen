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

const generateEventIndex = (note: TFile): string => {
    // Generar un índice único basado en el path del archivo y su contenido
    return `${note.path}-${note.stat.mtime}`; // Consideramos el path y el tiempo de modificación
};

const getCalendarEvent = (year: number, month: number, dayCounter: number, index: string, note: TFile, metadataCache: MetadataCache) => {
    const mykey = `${year}-${month}-${dayCounter}-${index}`;

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
        // Crear la fecha directamente con todos los componentes
        const date = new Date(year, month - 1, dayCounter, 0, 0, 0, 0); // Mes - 1 para ajustar el índice

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
    const notesOfTheDay = dayNotes ? dayNotes.map((note) => getCalendarEvent(year, month, dayCounter, generateEventIndex(note), note, app.metadataCache)) : null;

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
