// CalendarTitle.tsx
import React from 'react';

// Function to generate the dynamic title
function generateTitle() {
  const currentDate = new Date();
  const locale = 'es-ES';
  const year = currentDate.toLocaleDateString(locale, { year: 'numeric' });
  const month = currentDate.toLocaleDateString(locale, { month: 'long' });
  const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
  return `${monthCapitalized} ${year}`;
}

function CalendarTitle() {
  const title = generateTitle(); // Get the dynamic title
  return (
    <h2>{title}</h2>
  );
}

export default CalendarTitle;



