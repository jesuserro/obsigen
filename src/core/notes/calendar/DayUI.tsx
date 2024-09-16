// src/core/notes/calendar/DayUI.tsx
import { CalendarIcon } from './CalendarIcon';
import { CalendarDayProps, getCalendarDayProps, getFileName, handleEventForm } from './Day';

const DayUI = ({ year, month, dayCounter, hasNote, anniversaryNote, dayNotes, app }: CalendarDayProps): JSX.Element => {
    const { notePath, anniversary, notesOfTheDay } = getCalendarDayProps({
        year,
        month,
        dayCounter,
        hasNote,
        anniversaryNote,
        dayNotes,
        app,
    });

    const btn = (
        <div onClick={() => handleEventForm(app, year, month, dayCounter)}>
            {CalendarIcon.getIcon("add", 18)}
        </div>
    );

    return (
        <div className="day-container">
            {hasNote && !dayNotes ? (
                <>
                    <a href={notePath} title={getFileName(hasNote)}>
                        <div className="day-number">{dayCounter}</div>
                    </a>
                    {btn}
                    {anniversaryNote && (
                        <div className="anniversary-note">
                            {anniversary && (
                                <div key={anniversary.mykey} className={anniversary.dayContainerClasses}>
                                    <a href={`obsidian://open?file=${encodeURIComponent(anniversary.path)}`} title={anniversary.fileName}>
                                        {anniversary.icon}
                                        <span className="icon-description">{anniversary.fileName}</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : hasNote && notesOfTheDay ? (
                <>
                    <div className="day-header">
                        {anniversaryNote && (
                            <div className="anniversary-note">
                                {anniversary && (
                                    <div key={anniversary.mykey} className={anniversary.dayContainerClasses}>
                                        <a href={`obsidian://open?file=${encodeURIComponent(anniversary.path)}`} title={anniversary.fileName}>
                                            {anniversary.icon}
                                            <span className="icon-description">{anniversary.fileName}</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                        <a href={notePath} title={getFileName(hasNote)}>
                            <div className="day-number">{dayCounter}</div>
                        </a>
                        {btn}
                    </div>
                    <div className="calendar-icons">
                        {notesOfTheDay?.map(note => (
                            <div key={note.mykey} className={note.dayContainerClasses}>
                                <a href={`obsidian://open?file=${encodeURIComponent(note.path)}`} title={note.fileName}>
                                    {note.icon}
                                    <span className="icon-description">{note.fileName}</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </>
            ) : dayNotes ? (
                <>
                    <div className="day-header">
                        {anniversaryNote && (
                            <div className="anniversary-note">
                                {anniversary && (
                                    <div key={anniversary.mykey} className={anniversary.dayContainerClasses}>
                                        <a href={`obsidian://open?file=${encodeURIComponent(anniversary.path)}`} title={anniversary.fileName}>
                                            {anniversary.icon}
                                            <span className="icon-description">{anniversary.fileName}</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="day-number">{dayCounter}</div>
                        {btn}
                    </div>
                    <div className="calendar-icons">
                        {notesOfTheDay?.map(note => (
                            <div key={note.mykey} className={note.dayContainerClasses}>
                                <a href={`obsidian://open?file=${encodeURIComponent(note.path)}`} title={note.fileName}>
                                    {note.icon}
                                    <span className="icon-description">{note.fileName}</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="day-number">{dayCounter}</div>
                    {anniversaryNote && (
                        <div className="anniversary-note">
                            {anniversary && (
                                <div key={anniversary.mykey} className={anniversary.dayContainerClasses}>
                                    <a href={`obsidian://open?file=${encodeURIComponent(anniversary.path)}`} title={anniversary.fileName}>
                                        {anniversary.icon}
                                        <span className="icon-description">{anniversary.fileName}</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                    {btn}
                </>
            )}
        </div>
    );
};

export default DayUI;
