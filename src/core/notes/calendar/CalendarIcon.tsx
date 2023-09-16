import { TFile } from 'obsidian';
import React from 'react';
import { FaCalendarDay, FaQuestionCircle } from 'react-icons/fa';

export class CalendarIcon {
  static getIcon(note: TFile): React.ReactNode {
    if (note.path.includes('Anna')) {
      return <FaCalendarDay size={12} style={{ color: '#FFD700' }} />;
    } else {
      return <FaQuestionCircle size={12} style={{ color: '#A9A9A9' }} />;
    }
  }
}