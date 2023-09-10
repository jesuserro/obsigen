import React from 'react';

// Function to generate the dynamic title
function generateTitle() {
  const currentDate = new Date();
  const year = currentDate.toLocaleDateString('en-US', { year: 'numeric' });
  const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
  return `${month} ${year}`;
}

// Function to build the calendar table rows and cells
function buildCalendarRowsAndCells() {
  const calendarRows = [];

  // Logic to generate calendar rows and cells goes here
  // You can use nested loops to generate rows and cells

  for (let i = 0; i < 6; i++) {
    const calendarCells = [];

    for (let j = 0; j < 7; j++) {
      // Generate your <td> elements here
      const cell = <td key={`cell-${i}-${j}`}>Day</td>;
      calendarCells.push(cell);
    }

    // Generate the <tr> element with calendar cells
    const row = <tr key={`row-${i}`}>{calendarCells}</tr>;
    calendarRows.push(row);
  }

  return calendarRows;
}

// Function for the UI
function CalendarMonth() {
  const title = generateTitle(); // Get the dynamic title
  const calendarRows = buildCalendarRowsAndCells(); // Get the calendar rows and cells

  return (
    <div className="calendar-title">
      <h2>{title}</h2>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{calendarRows}</tbody>
      </table>
    </div>
  );
}

export default CalendarMonth;





