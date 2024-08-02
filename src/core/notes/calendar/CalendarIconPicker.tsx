import React, { useEffect, useState } from 'react';
import { iconData } from './CalendarIcon'; // Importar iconData desde CalendarIcon

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

  const handleIconClick = (iconName: string) => {
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

        <div className="selected-icon-preview" onClick={() => setIsModalOpen(true)}>
          {SelectedIconComponent && <SelectedIconComponent size={32} />}
        </div>
      </div>

      {isModalOpen && (
        <div className="icon-modal" onClick={() => setIsModalOpen(false)}>
          <div className="icon-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="icon-modal-header">
              <button onClick={() => setIsModalOpen(false)}>X</button>
            </div>
            <h1>Seleccione un icono</h1>
            {Object.entries(iconData).map(([groupName, iconsInGroup]) => (
              <div key={groupName}>
                <h2>{groupName}</h2>
                <div className="icon-grid">
                  {Object.keys(iconsInGroup).map((iconName) => (
                    <div key={iconName} className="icon-item" onClick={() => handleIconClick(iconName)}>
                      {iconsInGroup[iconName] && iconsInGroup[iconName]({ size: 32 })}
                      <span>{iconName}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
