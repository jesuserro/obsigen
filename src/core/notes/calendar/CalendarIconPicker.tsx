
export interface CalendarIconPickerProps {
  selectedIcon: string;
  onChange: (icon: string) => void;
  icons:{ [key: string]: (props: { size: number }) => JSX.Element } // Un objeto que contiene los iconos
}

export function CalendarIconPicker({
  selectedIcon,
  onChange,
  icons,
}: CalendarIconPickerProps): JSX.Element {
  return (
    <div className="calendar-icon-picker">
      <label className="form-label">Icon Picker</label>
      
      <select
        value={selectedIcon}
        onChange={(e) => onChange(e.target.value)}
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

