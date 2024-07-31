import React, { useEffect, useState } from 'react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [value, setValue] = useState(selectedIcon);

  useEffect(() => {
    // Update the selected icon based on the search term
    const matchingIcon = Object.keys(icons).find((iconName) =>
      iconName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchingIcon) {
      setValue(matchingIcon);
      onChange(matchingIcon);
    }
  }, [searchTerm, icons, onChange]);

  const handleIconChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    onChange(selectedValue);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);
  };

  const SelectedIconComponent = icons[value];

  return (
    <div className="obs-picker">
      <label className="form-label">Icon Picker</label>

      <div className="horizontal-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search icon"
          className="form-input"
        />

        <select value={value} onChange={handleIconChange} className="form-select">
          {Object.keys(icons).map((iconName) => (
            <option key={iconName} value={iconName}>
              {iconName}
            </option>
          ))}
        </select>
      </div>

      <div className="selected-icon-preview">
        {SelectedIconComponent && <SelectedIconComponent size={32} />}
      </div>
    </div>
  );
}
