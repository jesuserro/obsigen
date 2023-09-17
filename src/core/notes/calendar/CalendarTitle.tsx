// CalendarTitle.tsx
import React from 'react';

// Function to generate the dynamic title
function generateTitle() {
  return "Obsigen";
}

function CalendarTitle() {
  const title = generateTitle(); // Get the dynamic title
  return (
    <h2>{title}</h2>
  );
}

export default CalendarTitle;



