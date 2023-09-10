import React from 'react';

function CalendarMonth() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const numDaysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

  // Calculate the difference in starting days between Sunday (0) and Monday (1)
  const dayOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  // Calculate the number of rows needed for the calendar
  const numRows = Math.ceil((numDaysInMonth + dayOffset) / 7);

  const createDaysGrid = () => {
    const daysGrid = [];

    for (let row = 0; row < numRows; row++) {
      const cells = [];

      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const dayIndex = row * 7 + dayOfWeek + 1 - dayOffset;
        const isWithinMonth = dayIndex >= 1 && dayIndex <= numDaysInMonth;

        cells.push(
          <td key={dayOfWeek} className={isWithinMonth ? 'within-month' : 'outside-month'}>
            {isWithinMonth ? dayIndex : ''}
          </td>
        );
      }

      daysGrid.push(<tr key={row}>{cells}</tr>);
    }

    return <tbody>{daysGrid}</tbody>;
  };

  return (
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
      {createDaysGrid()}
    </table>
  );
}

export default CalendarMonth;
