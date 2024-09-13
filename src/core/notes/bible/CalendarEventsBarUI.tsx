import React from 'react';
import { CalendarIcon } from './../calendar/CalendarIcon';

interface CalendarEventsBarProps {
  events: Array<{ title: string; path: string; icon?: React.ReactNode; externalPassagesCount: number }>;
  onEventClick: (path: string) => void;
}

const CalendarEventsBar: React.FC<CalendarEventsBarProps> = ({ events, onEventClick }) => {
  if (!events || events.length === 0) {
    return null; // No renderizar nada si no hay eventos
  }

  return (
    <div className="events-container">
      {events.map((event, index) => (
        <div key={index} className="event-icon-wrapper">
          <a
            href={`obsidian://open?file=${encodeURIComponent(event.path)}`}
            title={event.title} // Tooltip gestionado por Obsidian
          >
            <div className="event-icon" onClick={() => onEventClick(event.path)}>
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
