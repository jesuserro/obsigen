import React, { useEffect, useState } from 'react';
import { iconMap } from './CalendarIcon'; // Importar iconMap desde CalendarIcon

export interface CalendarIconPickerProps {
  selectedIcon: string;
  onChange: (icon: string) => void;
  icons: { [key: string]: (props: { size: number }) => JSX.Element };
}

const iconGroups = {
  Emojis: ['angry', 'anxiety', 'baby', 'birthday', 'cough', 'dance', 'family', 'fatigue', 'fever', 'friends', 'gluttony', 'happiness', 'inlove', 'insomnia', 'learning', 'party', 'people', 'psychology', 'pumpkin', 'sadness', 'sex', 'sick', 'tired', 'woman'],
  Gente: ['achelm', 'annas', 'charo', 'dad', 'gonzalo', 'irene', 'josefita', 'josemi', 'kote', 'luis', 'mom', 'natalia', 'nieves', 'person', 'pilar', 'ramon', 'sophie', 'timothy', 'victor'],
  Tiempo: ['cold', 'earthquake', 'eclipse', 'haze', 'rain', 'snow', 'storm', 'sunny', 'weather'],
  Economía: ['bank', 'barber', 'bbva', 'bills', 'buy', 'coin', 'euro', 'finances', 'gift', 'hacienda', 'itv', 'lottery', 'payroll', 'price', 'repairs', 'saving', 'tax', 'visa'],
  IT: ['amazon', 'android', 'aws', 'blogpost', 'dell', 'email', 'git', 'github', 'google', 'googlemeet', 'goodreads', 'gpt', 'instagram', 'kindle', 'lenovo', 'linkedin', 'meeting', 'obsidian', 'openai', 'phone', 'plentyoffish', 'podcast', 'readwise', 'rss', 'samsung', 'skype', 'spotify', 'telegram', 'tinder', 'twitter', 'whatsapp', 'writing', 'youtube'],
  Agro: ['agriculture', 'agro', 'dog', 'farmer', 'tree', 'village'],
  Deportes: ['basketball', 'champions', 'chess', 'gym', 'hiking', 'olympics', 'orejona', 'pool', 'realmadrid', 'soccer', 'sport'],
  Banderas: ['argentina', 'france', 'israel', 'italy', 'poland', 'romania', 'russia', 'spain', 'usa', 'vatican', 'venezuela'],
  Religión: ['adoration', 'advent', 'agenda2030', 'arburua', 'bible', 'catholic', 'cemetery', 'christ', 'communism', 'confession', 'death', 'diosidencia', 'emaus', 'evil', 'fatima', 'funeral', 'funeralhome', 'garabandal', 'gospa', 'holyspirit', 'inspiration', 'islam', 'mass', 'miracle', 'nun', 'orthodox', 'peace', 'pope', 'prayer', 'priest', 'prophecy', 'rosary', 'saint', 'saintwoman', 'wedding'],
  Gastronomía: ['beer', 'cafe', 'cook', 'friedeggs', 'gastronomy', 'pancake'],
  Transporte: ['bus', 'car', 'plane', 'train', 'travel'],
  Salud: ['doctor', 'dream', 'foot', 'health', 'healthko', 'healthok', 'heartbreak', 'insomnia', 'legs', 'pill', 'pilloff', 'strong', 'supplement', 'virus'],
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
            <div className="icon-modal-header">
              <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
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
          </div>
        </div>
      )}
    </div>
  );
}
