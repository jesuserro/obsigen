// CalendarTitle.tsx
import React from 'react';

// Function to generate the dynamic title
function generateTitle() {
  const currentDate = new Date();
  const locale = 'es-ES';
  const year = currentDate.toLocaleDateString(locale, { year: 'numeric' });
  const month = currentDate.toLocaleDateString(locale, { month: 'long' });
  return `${month} ${year}`;
}

function CalendarTitle() {
  const title = generateTitle(); // Get the dynamic title
  return (
    <div className="calendar-title">
      <h2>{title}</h2>
    </div>
  );
}

export default CalendarTitle;



