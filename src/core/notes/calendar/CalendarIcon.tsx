import { App, TFile } from 'obsidian';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BsFillCloudRainHeavyFill, BsSnow3, BsWordpress } from 'react-icons/bs';
import { CiPill } from 'react-icons/ci';
import { FaBirthdayCake, FaCross, FaGlobe, FaMoneyBillWave, FaPodcast, FaQuestionCircle } from 'react-icons/fa';
import { GiChurch, GiCommercialAirplane, GiPumpkinMask, GiSandsOfTime, GiThermometerCold } from 'react-icons/gi';
import { IoIosPaper, IoMdBasket, IoMdMusicalNotes } from 'react-icons/io';
import { MdBuild, MdDirectionsRun, MdFavorite, MdGroup, MdLocalBar, MdLocalHospital, MdPeople, MdRestaurant } from 'react-icons/md';
import { PiNotePencilBold } from 'react-icons/pi';
import { SiSpotify, SiTwitter, SiWhatsapp, SiYoutube } from 'react-icons/si';
import { TbZzz } from 'react-icons/tb';

export class CalendarIcon {
  static getIcon(note: TFile, app: App): React.ReactNode {
    const path = note.path;
    const size = 14;

    const tags = app.metadataCache.getFileCache(note)?.frontmatter?.tags;
    
    if (tags) {
      if (tags.includes('rain')) {
        return <BsFillCloudRainHeavyFill size={size} style={{ color: '#6dc8f2' }} />;
      }
      if (tags.includes('dream')) {
        return <TbZzz size={size} style={{ color: '#3876f2' }} />;
      }
      if (tags.includes('travel')) {
        return <GiCommercialAirplane size={size} style={{ color: '#1199c2' }} />;
      }
      if (tags.includes('finances')) {
        return <FaMoneyBillWave size={size} style={{ color: '#069d3e' }} />;
      }
      if (tags.includes('weather')) {
        return <GiThermometerCold size={size} style={{ color: '#6dc8f2' }} />;
      }
      if (tags.includes('catholic')) {
        return <FaCross size={size} style={{ color: '#ad6df2' }} />;
      }
      if (tags.includes('snow')) {
        return <BsSnow3 size={size} style={{ color: '#6dc8f2' }} />;
      }
      if (tags.includes('writing')) {
        return <PiNotePencilBold size={size} style={{ color: '#fcaa62' }} />;
      }
      if (tags.includes('youtube')) {
        return <SiYoutube size={size} style={{ color: '#FF0000' }} />;
      }
      if (tags.includes('twitter')) {
        return <SiTwitter size={size} style={{ color: '#1DA1F2' }} />;
      }
      if (tags.includes('blogpost')) {
        return <BsWordpress size={size} style={{ color: '#117ac9' }} />;
      }
      if (tags.includes('agriculture')) {
        return <IoMdBasket size={size} style={{ color: '#008000' }} />;
      }
      if (tags.includes('pill')) {
        return <CiPill size={size} style={{ color: '#c2a411' }} />;
      }
      if (tags.includes('pumpkin')) {
        return <GiPumpkinMask size={size} style={{ color: '#fc6203' }} />;
      }
      if (tags.includes('sick')) {
        return <GiThermometerCold size={size} style={{ color: '#FF0000' }} />;
      }
      if (tags.includes('euro')) {
        return <IoIosPaper size={size} style={{ color: '#008000' }} />;
      }
      if (tags.includes('car')) {
        return <IoMdBasket size={size} style={{ color: '#0000FF' }} />;
      }
      if (tags.includes('confession')) {
        return <FaCross size={size} style={{ color: '#ad6df2' }} />;
      }
      if (tags.includes('buy')) {
        return <IoMdBasket size={size} style={{ color: '#008000' }} />;
      }
      if (tags.includes('spotify')) {
        return <SiSpotify size={size} style={{ color: '#1DB954' }} />;
      }
      if (tags.includes('music')) {
        return <IoMdMusicalNotes size={size} style={{ color: '#798aed' }} />;
      }
      if (tags.includes('podcast')) {
        return <FaPodcast size={size} style={{ color: '#1DB954' }} />;
      }
      if (tags.includes('family')) {
        return <MdGroup size={size} style={{ color: '#800080' }} />;
      }
      if (tags.includes('sport')) {
        return <MdDirectionsRun size={size} style={{ color: '#FF8C00' }} />;
      }
      if (tags.includes('funeral')) {
        return <FaCross size={size} style={{ color: '#000000' }} />;
      }
      if (tags.includes('doctor')) {
        return <MdLocalHospital size={size} style={{ color: '#FF0000' }} />;
      }
      if (tags.includes('gastronomy')) {
        return <MdRestaurant size={size} style={{ color: '#FFD700' }} />;
      }
      if (tags.includes('beer')) {
        return <MdLocalBar size={size} style={{ color: '#FF4500' }} />;
      }
      if (tags.includes('repairs')) {
        return <MdBuild size={size} style={{ color: '#A9A9A9' }} />;
      }
      if (tags.includes('people')) {
        return <MdPeople size={size} style={{ color: '#FFD700' }} />;
      }
      if (tags.includes('inlove')) {
        return <MdFavorite size={size} style={{ color: '#FF1493' }} />;
      }
      if (tags.includes('friends')) {
        return <MdGroup size={size} style={{ color: '#c4be3d' }} />;
      }
      if (tags.includes('whatsapp')) {
        return <SiWhatsapp size={size} style={{ color: '#25d366' }} />;
      }
    }

    if (path.includes('Anna') || path.includes("Nieves")) {
      return <AiFillHeart size={size} style={{ color: '#FF69B4' }} />;
    } else if (path.includes('TO -')) {
      return <GiChurch size={size} style={{ color: '#ad6df2' }} />;
    } else if (path.includes('/Aniversaries')) {
      return <FaBirthdayCake size={size} style={{ color: '#78B7D0' }} />;
    } else if (path.includes('/Moments')) {
      return <GiSandsOfTime size={size} style={{ color: '#FFFF99' }} />;
    } else if (path.includes('/Captures')) {
      return <FaGlobe size={size} style={{ color: '#1877F2' }} />;
    } else {
      return <FaQuestionCircle size={size} style={{ color: '#A9A9A9' }} />;
    }
  }
}
