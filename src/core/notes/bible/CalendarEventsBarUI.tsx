import { App } from 'obsidian';
import React from 'react';
import { openVaultNote } from '../../../adapters/Obsidian/openVaultNote';
import { CalendarIcon } from './../calendar/CalendarIcon';

interface CalendarEventsBarProps {
  app: App;
  events: Array<{ title: string; path: string; icon?: React.ReactNode; externalPassagesCount: number }>;
}

const CalendarEventsBar: React.FC<CalendarEventsBarProps> = ({ app, events }) => {
  if (!events || events.length === 0) {
    return null; // No renderizar nada si no hay eventos
  }

  const handleOpenNote = (
    event: React.MouseEvent<HTMLAnchorElement>,
    filePath: string,
  ): void => {
    event.preventDefault();
    const file = app.vault.getAbstractFileByPath(filePath);
    void openVaultNote(app, file, '', filePath);
  };

  return (
    <div className="events-container">
      {events.map((event, index) => (
        <div key={index} className="event-icon-wrapper">
          <a
            href="#"
            onClick={(clickEvent) => handleOpenNote(clickEvent, event.path)}
            title={event.title} // Tooltip gestionado por Obsidian
          >
            <div className="event-icon">
              {event.icon || CalendarIcon.getIcon('calendar', 12)}
              {event.externalPassagesCount > 0 && (
                <span className="event-badge">{event.externalPassagesCount}</span> // Mostrar el número de pasajes externos
              )}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default CalendarEventsBar;
