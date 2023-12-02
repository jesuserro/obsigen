import React, { useState } from 'react';
import { iconMap } from './CalendarIcon';
import { CalendarIconPicker } from './CalendarIconPicker';

interface CalendarEventFormProps {
  year: number;
  month: number;
  day: number;
  onFormSubmit: (formData: FormValues) => void;
}

export interface FormValues {
  title: string;
  url: string;
  description: string;
  startDate: string;
  endDate: string;
  selectedIcon: string;

  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}

export const CalendarEventForm: React.FC<CalendarEventFormProps> = ({ year, month, day, onFormSubmit }) => {
  
  const [formData, setFormData] = useState<FormValues>({
    title: '',
    url: '',
    description: '',
    startDate: '',
    endDate: '',
    selectedIcon: 'default-icon',
    year: year.toString(),
    month: month.toString(),
    day: day.toString(),
    hour: '00',
    minute: '00'
  });

  const handleInputChange = (field: string, value: string) => {
    if (field === 'year' || field === 'month' || field === 'day' || field === 'hour' || field === 'minute') {
      // Actualiza startDate si se modifica un campo de fecha o hora
      const { year, month, day, hour, minute } = formData;
      const selectedTime = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
      const newStartDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${selectedTime}`;
      console.log(newStartDate, selectedTime);
      setFormData({
        ...formData,
        startDate: newStartDate,
        [field]: value,
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };
  

  const handleFormSubmit = () => {
    // Puedes realizar validación aquí antes de enviar el formulario
    onFormSubmit(formData);
  };

  const years = [];
  for (let i = 1974; i <= 2025; i++) {
    years.push(i);
  }

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 25 }, (_, i) => i);
  const minutes = Array.from({ length: 13 }, (_, i) => i * 5);

  return (
    <div className="form-container">

      <fieldset className="form-element">
        <legend>Tile/URL:</legend>
        
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-input"
          placeholder="Type title here"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />

        <label className="form-label">URL</label>
        <input
          type="text"
          className="form-input"
          placeholder="Type URL here"
          value={formData.url}
          onChange={(e) => handleInputChange('url', e.target.value)}
        />
      </fieldset>

      <fieldset className="form-element date-fieldset">
        <legend>Start Date</legend>
        <label className="form-label">Year</label>
        <select
          value={year}
          onChange={(e) => handleInputChange('startDate', e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label className="form-label">Month</label>
        <select
          value={month}
          onChange={(e) => handleInputChange('startDate', e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <label className="form-label">Day</label>
        <select
          value={day}
          onChange={(e) => handleInputChange('startDate', e.target.value)}
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <label className="form-label">Hour</label>
        <select
          onChange={(e) => handleInputChange('startDate', e.target.value)}
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>

        <label className="form-label">Minute</label>
        <select
          onChange={(e) => handleInputChange('startDate', e.target.value)}
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </fieldset>

      <div className="form-element">
        <CalendarIconPicker
          selectedIcon={formData.selectedIcon}
          onChange={(selectedIcon) => handleInputChange('selectedIcon', selectedIcon)}
          icons={iconMap}
        />
      </div>

      <fieldset className="form-element">
        <legend>Description</legend>
        <textarea
          className="form-input"
          placeholder="Type description here"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </fieldset>

      <div className="form-button-container">
        <button className="form-submit-button" onClick={handleFormSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
