import { App, TFile } from 'obsidian';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaBirthdayCake, FaGlobe, FaQuestionCircle } from 'react-icons/fa'; // Import the FaSun icon for weather
import { GiChurch, GiSandsOfTime, GiThermometerCold } from 'react-icons/gi';

export class CalendarIcon {
  static getIcon(note: TFile, app: App): React.ReactNode {
    const path = note.path;
    const size = 14;

    const tags = app.metadataCache.getFileCache(note)?.frontmatter?.tags;
    if (tags) {
      if(tags.includes('weather')){
        return <GiThermometerCold size={size} style={{ color: '#6dc8f2' }} />; 
      }
    }

    if (path.includes('Anna') || path.includes("Nieves")) {
      return <AiFillHeart size={size} style={{ color: '#FF69B4' }} />;
    } else if (path.includes('TO -')) {
      return <GiChurch size={size} style={{ color: '#ad6df2' }} />;
    } else if (path.includes('/Aniversaries')) {
      return <FaBirthdayCake size={size} style={{ color: '#9e5010' }} />;
    } else if (path.includes('/Moments')) {
      return <GiSandsOfTime size={size} style={{ color: '#FFFF99' }} />;
    } else if (path.includes('/Captures')) {
      return <FaGlobe size={size} style={{ color: '#1877F2' }} />;
    } else {
      return <FaQuestionCircle size={size} style={{ color: '#A9A9A9' }} />;
    }
  }
}
