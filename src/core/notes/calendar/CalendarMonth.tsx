import React from 'react';

// Function to create the calendar grid
function createDaysGrid() {
  const daysGrid = [];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  // Calculate the number of rows needed for the calendar
  const numRows = Math.ceil((daysInMonth + firstDayOfWeek) / 7);

  for (let row = 0; row < numRows; row++) {
    const cells = [];

    for (let day = 0; day < 7; day++) {
      const dayIndex = row * 7 + day + 1 - firstDayOfWeek;

      if (dayIndex >= 1 && dayIndex <= daysInMonth) {
        // Create a cell for each day in the month
        cells.push(<td key={dayIndex}>{dayIndex}</td>);
      } else {
        // Create empty cells for days outside the current month
        cells.push(<td key={`empty-${row}-${day}`}></td>);
      }
    }

    // Create a row with the cells
    daysGrid.push(<tr key={row}>{cells}</tr>);
  }

  return (
      <tbody>{daysGrid}</tbody>
  );
}

function CalendarMonth() {
  return (
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
      <tbody>{createDaysGrid()}</tbody>
    </table>
  );
}

export default CalendarMonth;





