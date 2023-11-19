import React, { useEffect, useState } from 'react';

interface SuggestProps {
  suggestions: string[];
  onSelect: (selected: string) => void;
}

export function Suggest({ suggestions, onSelect }: SuggestProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // You can add additional logic here if needed when suggestions change
  }, [suggestions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);
  };

  const handleSuggestionClick = (selected: string) => {
    onSelect(selected);
    setSearchTerm(''); // Clear the search term after selecting
  };

  return (
    <div className="suggest-container">
      <label htmlFor="suggest-input">Locations 2</label>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search"
        className="suggest-input"
      />

      <ul className="suggestion-list">
        {suggestions.map((suggestion) => (
          <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}
