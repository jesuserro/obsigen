import React, { useEffect, useState } from 'react';
import { iconMap } from './CalendarIcon'; // Importar iconMap desde CalendarIcon

export interface CalendarIconPickerProps {
  selectedIcon: string;
  onChange: (icon: string) => void;
  icons: { [key: string]: (props: { size: number }) => JSX.Element };
}

const iconGroups = {
  Emojis: ['fatigue', 'sadness', 'happiness', 'angry', 'tired', 'sick', 'insomnia', 'anxiety', 'cough', 'fever', 'gluttony', 'inlove', 'pumpkin', 'sex', 'dance', 'party', 'woman'],
  Gente: ['person', 'achelm', 'annas', 'charo', 'dad', 'gonzalo', 'natalia', 'timothy', 'josefita', 'mom', 'irene', 'kote', 'luis', 'pilar', 'nieves', 'josemi', 'ramon', 'victor', 'sophie'],
  Tiempo: ['sunny', 'storm', 'haze', 'rain', 'snow', 'weather', 'cold', 'earthquake', 'eclipse'],
  Economía: ['buy', 'bills', 'euro', 'coin', 'bank', 'bbva', 'finances', 'tax', 'saving', 'price', 'visa'],
  IT: ['blogpost', 'google', 'lenovo', 'spotify', 'github', 'goodreads', 'amazon', 'instagram', 'linkedin', 'kindle', 'aws', 'git', 'android', 'googlemeet', 'openai', 'gpt', 'obsidian', 'whatsapp', 'tinder', 'plentyoffish', 'youtube', 'twitter', 'dell', 'plex', 'telegram', 'skype', 'samsung' ],
  Deportes: ['soccer', 'basketball', 'champions', 'hiking', 'gym', 'chess', 'orejona', 'realmadrid', 'olympics', 'sport', 'pool'],
  Banderas: ['argentina', 'france', 'israel', 'italy', 'vatican', 'usa', 'venezuela', 'romania', 'poland', 'spain', 'russia'],
  Religión: ['arburua', 'prayer', 'confession', 'inspiration', 'miracle', 'fatima', 'christ', 'mass', 'bible', 'prophecy', 'funeral', 'priest', 'garabandal', 'gospa', 'funeralhome', 'saint', 'saintwoman', 'nun', 'catholic', 'rosary', 'adoration', 'advent', 'emaus', 'islam', 'diosidencia', 'holyspirit', 'orthodox', 'pope', 'peace', 'wedding', 'death', 'cemetery', 'evil'],
  Gastronomía: ['cafe', 'cook', 'beer', 'pancake', 'friedeggs', 'gastronomy'],
  Transporte: ['car', 'train', 'bus', 'plane', 'travel'],
  Salud: ['strong', 'healthok', 'healthko', 'heartbreak', 'dream', 'insomnia', 'legs', 'pill', 'pilloff', 'supplement', 'doctor', 'health', 'foot', 'virus'],
  Otros: [] as string[],
};

// Clasifica los iconos en sus respectivos grupos, y coloca los no clasificados en "Otros"
Object.keys(iconMap).forEach(iconName => {
  let found = false;
  for (const groupName in iconGroups) {
    if (iconGroups[groupName as keyof typeof iconGroups].includes(iconName)) {
      found = true;
      break;
    }
  }
  if (!found) {
    iconGroups.Otros.push(iconName);
  }
});

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
            <h1>Seleccione un icono</h1>
            {Object.entries(iconGroups).map(([groupName, iconsInGroup]) => (
              <div key={groupName}>
                <h2>{groupName}</h2>
                <div className="icon-grid">
                  {iconsInGroup.map((iconName) => (
                    <div key={iconName} className="icon-item" onClick={() => handleIconClick(iconName)}>
                      {icons[iconName] && icons[iconName]({ size: 32 })}
                      <span>{iconName}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
