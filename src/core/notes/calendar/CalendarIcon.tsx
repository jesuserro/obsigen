import { App, TFile } from 'obsidian';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BsFillCloudRainHeavyFill, BsSnow3, BsWordpress } from 'react-icons/bs';
import { CiPill } from 'react-icons/ci';
import { FaBirthdayCake, FaCarSide, FaCross, FaGlobe, FaMoneyBillWave, FaPodcast, FaQuestionCircle } from 'react-icons/fa';
import { GiChurch, GiCommercialAirplane, GiPumpkinMask, GiSandsOfTime, GiThermometerCold, GiTombstone } from 'react-icons/gi';
import { IoIosPaper, IoMdBasket, IoMdMusicalNotes } from 'react-icons/io';
import { MdBuild, MdDirectionsRun, MdFavorite, MdGroup, MdLocalBar, MdLocalHospital, MdPeople, MdRestaurant } from 'react-icons/md';
import { PiNotePencilBold } from 'react-icons/pi';
import { SiSpotify, SiTwitter, SiWhatsapp, SiYoutube } from 'react-icons/si';
import { TbZzz } from 'react-icons/tb';

export class CalendarIcon {
  static getIcon(note: TFile, app: App): React.ReactNode {
    const path = note.path;
    const size = 14;

    const cssClasses = app.metadataCache.getFileCache(note)?.frontmatter?.cssClasses;

    const iconMap: { [key: string]: (props: { size: number }) => JSX.Element } = {
      rain: ({ size }) => <BsFillCloudRainHeavyFill size={size} style={{ color: '#6dc8f2' }} />,
      dream: ({ size }) => <TbZzz size={size} style={{ color: '#3876f2' }} />,
      travel: ({ size }) => <GiCommercialAirplane size={size} style={{ color: '#1199c2' }} />,
      finances: ({ size }) => <FaMoneyBillWave size={size} style={{ color: '#069d3e' }} />,
      weather: ({ size }) => <GiThermometerCold size={size} style={{ color: '#6dc8f2' }} />,
      catholic: ({ size }) => <FaCross size={size} style={{ color: '#ad6df2' }} />,
      snow: ({ size }) => <BsSnow3 size={size} style={{ color: '#6dc8f2' }} />,
      writing: ({ size }) => <PiNotePencilBold size={size} style={{ color: '#fcaa62' }} />,
      youtube: ({ size }) => <SiYoutube size={size} style={{ color: '#FF0000' }} />,
      twitter: ({ size }) => <SiTwitter size={size} style={{ color: '#1DA1F2' }} />,
      blogpost: ({ size }) => <BsWordpress size={size} style={{ color: '#117ac9' }} />,
      agriculture: ({ size }) => <IoMdBasket size={size} style={{ color: '#008000' }} />,
      pill: ({ size }) => <CiPill size={size} style={{ color: '#c2a411' }} />,
      pumpkin: ({ size }) => <GiPumpkinMask size={size} style={{ color: '#fc6203' }} />,
      sick: ({ size }) => <GiThermometerCold size={size} style={{ color: '#FF0000' }} />,
      euro: ({ size }) => <IoIosPaper size={size} style={{ color: '#008000' }} />,
      car: ({ size }) => <FaCarSide size={size} style={{ color: '#FF0000' }} />,
      confession: ({ size }) => <FaCross size={size} style={{ color: '#ad6df2' }} />,
      buy: ({ size }) => <IoMdBasket size={size} style={{ color: '#008000' }} />,
      spotify: ({ size }) => <SiSpotify size={size} style={{ color: '#1DB954' }} />,
      music: ({ size }) => <IoMdMusicalNotes size={size} style={{ color: '#798aed' }} />,
      podcast: ({ size }) => <FaPodcast size={size} style={{ color: '#1DB954' }} />,
      family: ({ size }) => <MdGroup size={size} style={{ color: '#800080' }} />,
      sport: ({ size }) => <MdDirectionsRun size={size} style={{ color: '#FF8C00' }} />,
      funeral: ({ size }) => <GiTombstone size={size} style={{ color: '#74757a' }} />,
      doctor: ({ size }) => <MdLocalHospital size={size} style={{ color: '#FF0000' }} />,
      gastronomy: ({ size }) => <MdRestaurant size={size} style={{ color: '#FFD700' }} />,
      beer: ({ size }) => <MdLocalBar size={size} style={{ color: '#FF4500' }} />,
      repairs: ({ size }) => <MdBuild size={size} style={{ color: '#A9A9A9' }} />,
      people: ({ size }) => <MdPeople size={size} style={{ color: '#FFD700' }} />,
      inlove: ({ size }) => <MdFavorite size={size} style={{ color: '#FF1493' }} />,
      friends: ({ size }) => <MdGroup size={size} style={{ color: '#c4be3d' }} />,
      whatsapp: ({ size }) => <SiWhatsapp size={size} style={{ color: '#25d366' }} />,
    };

    if (cssClasses) {
      const cssClassIcons = cssClasses
        .filter((cssclass: string) => iconMap.hasOwnProperty(cssclass))
        .map((cssclass: string) => iconMap[cssclass]({ size }));

      if (cssClassIcons.length > 0) {
        return cssClassIcons[0]; // Devuelve el primer icono coincidente
      }
    }

    if (path.includes('Anna') || path.includes("Nieves")) {
      return <AiFillHeart size={size} style={{ color: '#FF69B4' }} />;
    } else if (path.includes(' TO ')) {
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
