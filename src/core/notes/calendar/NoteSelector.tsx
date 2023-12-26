import { TFile } from 'obsidian';
import React, { useEffect, useState } from 'react';

export interface NoteSelectorProps {
  selectedNote: string;
  onChange: (notePath: string) => void;
  notes: TFile[];
}

export function NoteSelector({
  selectedNote,
  onChange,
  notes,
}: NoteSelectorProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [matchingFiles, setMatchingFiles] = useState<TFile[]>([]);

  useEffect(() => {
    // Update matching files based on the search term
    if (searchTerm.length > 2) {
      const files = searchFiles(searchTerm);
      setMatchingFiles(files);
    } else {
      setMatchingFiles([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  const searchFiles = (query: string): TFile[] => {
    // Filtrar los archivos que coinciden con la consulta y están en el path "300 Geo/"
    const matchingFiles = notes.filter((file: TFile) => {
      const isMatchingName = file.basename.toLowerCase().includes(query.toLowerCase());
      return isMatchingName;
    });

    return matchingFiles;
  };

  return (
    <div className="obs-picker">
      <label className="form-label">Note Selector</label>

      <div className="horizontal-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search note"
          className="form-input"
        />

        <select value={selectedNote} onChange={handleNoteChange} className="form-select">
          {matchingFiles.map((file) => (
            <option key={file.path} value={file.basename}>
              {file.basename}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
