import { TFile } from 'obsidian';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaCalendarDay, FaQuestionCircle } from 'react-icons/fa';
import { GiChurch } from 'react-icons/gi';

export class CalendarIcon {
  static getIcon(note: TFile): React.ReactNode {
    const path = note.path;

    if (path.includes('Anna')) {
      return <AiFillHeart size={12} style={{ color: '#FF69B4' }} />;
    } else if (path.match(/\/(\d{8})\.md$/)) {
      return <FaCalendarDay size={12} style={{ color: '#8B4513' }} />;
    } else if (path.includes('TO -')) {
      return <GiChurch size={12} style={{ color: '#800080' }} />;
    } else {
      return <FaQuestionCircle size={12} style={{ color: '#A9A9A9' }} />;
    }
  }
}
