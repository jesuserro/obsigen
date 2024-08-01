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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const matchingIcon = Object.keys(icons).find(
      (iconName) => iconName.toLowerCase() === searchTerm.toLowerCase()
    ) || Object.keys(icons).find(
      (iconName) => iconName.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handlePreviewClick = () => {
    setIsModalOpen(true);
  };

  const handleIconSelect = (iconName: string) => {
    setValue(iconName);
    onChange(iconName);
    setIsModalOpen(false);
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

        <div className="selected-icon-preview" onClick={handlePreviewClick}>
          {SelectedIconComponent && <SelectedIconComponent size={32} />}
        </div>
      </div>

      {isModalOpen && (
        <div className="icon-modal">
          <div className="icon-modal-content">
            <h3>Select an Icon</h3>
            <div className="icon-grid">
              {Object.keys(icons).map((iconName) => {
                const IconComponent = icons[iconName];
                return (
                  <div key={iconName} className="icon-item" onClick={() => handleIconSelect(iconName)}>
                    <IconComponent size={32} />
                    <span>{iconName}</span>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
