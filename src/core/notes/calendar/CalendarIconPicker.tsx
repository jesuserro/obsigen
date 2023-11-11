import React, { useState } from 'react';

export interface CalendarIconPickerProps {
  selectedIcon: string;
  onChange: (icon: string) => void;
  icons: { [key: string]: (props: { size: number }) => JSX.Element };
}

export function CalendarIconPicker({
  selectedIcon,
  onChange,
  icons,
}: CalendarIconPickerProps): JSX.Element {
  const [value, setValue] = useState(selectedIcon);

  const handleIconChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
    setValue(selectedValue);
  };

  return (
    <div className="calendar-icon-picker">
      <label className="form-label">Icon Picker</label>

      <select
        value={value}
        onChange={handleIconChange}
        className="form-select"
      >
        {Object.keys(icons).map((iconName) => (
          <option key={iconName} value={iconName}>
            {iconName}
          </option>
        ))}
      </select>
    </div>
  );
}
