import { TFile } from 'obsidian';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaGlobe, FaQuestionCircle, FaRegClock } from 'react-icons/fa';
import { GiChurch } from 'react-icons/gi';

export class CalendarIcon {
  static getIcon(note: TFile): React.ReactNode {
    const path = note.path;

    const size = 14;

    if (path.includes('Anna') || path.includes("Nieves")) {
      return <AiFillHeart size={size} style={{ color: '#FF69B4' }} />;
    } else if (path.includes('TO -')) {
      return <GiChurch size={size} style={{ color: '#800080' }} />;
    } else if (path.includes('/Moments')) {
      return <FaRegClock size={size} style={{ color: '#FFFF99' }} />;
    } else if (path.includes('/Captures')) {
      return <FaGlobe size={size} style={{ color: '#1877F2' }} />;
    } else {
      return <FaQuestionCircle size={size} style={{ color: '#A9A9A9' }} />;
    }
  }
}
