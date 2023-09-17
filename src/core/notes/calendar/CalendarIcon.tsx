import { App, TFile } from 'obsidian';
import React from 'react';

// Importa los iconos que necesitas de react-icons
import { AiFillHeart } from 'react-icons/ai';
import { BsFillCloudRainHeavyFill, BsSnow3, BsWordpress } from 'react-icons/bs';
import { CiPill } from 'react-icons/ci';
import { FaBirthdayCake, FaCross, FaGlobe, FaMoneyBillWave, FaPodcast, FaQuestionCircle } from 'react-icons/fa';
import { GiChurch, GiCommercialAirplane, GiPumpkinMask, GiSandsOfTime, GiThermometerCold, GiTombstone } from 'react-icons/gi';
import { IoIosPaper, IoMdBasket, IoMdMusicalNotes } from 'react-icons/io';
import { MdBuild, MdDirectionsRun, MdFavorite, MdGroup, MdLocalBar, MdLocalHospital, MdPeople, MdRestaurant } from 'react-icons/md';
import { PiNotePencilBold } from 'react-icons/pi';
import { SiSpotify, SiTwitter, SiWhatsapp, SiYoutube } from 'react-icons/si';
import { TbZzz } from 'react-icons/tb';

interface IconProps {
  size: number;
  color: string;
}

interface IconMap {
  [key: string]: (props: IconProps) => React.ReactNode;
}

const iconMap: IconMap = {
  rain: ({ size, color }) => <BsFillCloudRainHeavyFill size={size} style={{ color }} />,
  dream: ({ size, color }) => <TbZzz size={size} style={{ color }} />,
  travel: ({ size, color }) => <GiCommercialAirplane size={size} style={{ color }} />,
  finances: ({ size, color }) => <FaMoneyBillWave size={size} style={{ color }} />,
  weather: ({ size, color }) => <GiThermometerCold size={size} style={{ color }} />,
  catholic: ({ size, color }) => <FaCross size={size} style={{ color }} />,
  snow: ({ size, color }) => <BsSnow3 size={size} style={{ color }} />,
  writing: ({ size, color }) => <PiNotePencilBold size={size} style={{ color }} />,
  youtube: ({ size, color }) => <SiYoutube size={size} style={{ color }} />,
  twitter: ({ size, color }) => <SiTwitter size={size} style={{ color }} />,
  blogpost: ({ size, color }) => <BsWordpress size={size} style={{ color }} />,
  agriculture: ({ size, color }) => <IoMdBasket size={size} style={{ color }} />,
  pill: ({ size, color }) => <CiPill size={size} style={{ color }} />,
  pumpkin: ({ size, color }) => <GiPumpkinMask size={size} style={{ color }} />,
  sick: ({ size, color }) => <GiThermometerCold size={size} style={{ color }} />,
  euro: ({ size, color }) => <IoIosPaper size={size} style={{ color }} />,
  car: ({ size, color }) => <IoMdBasket size={size} style={{ color }} />,
  confession: ({ size, color }) => <FaCross size={size} style={{ color }} />,
  buy: ({ size, color }) => <IoMdBasket size={size} style={{ color }} />,
  spotify: ({ size, color }) => <SiSpotify size={size} style={{ color }} />,
  music: ({ size, color }) => <IoMdMusicalNotes size={size} style={{ color }} />,
  podcast: ({ size, color }) => <FaPodcast size={size} style={{ color }} />,
  family: ({ size, color }) => <MdGroup size={size} style={{ color }} />,
  sport: ({ size, color }) => <MdDirectionsRun size={size} style={{ color }} />,
  funeral: ({ size, color }) => <GiTombstone size={size} style={{ color }} />,
  doctor: ({ size, color }) => <MdLocalHospital size={size} style={{ color }} />,
  gastronomy: ({ size, color }) => <MdRestaurant size={size} style={{ color }} />,
  beer: ({ size, color }) => <MdLocalBar size={size} style={{ color }} />,
  repairs: ({ size, color }) => <MdBuild size={size} style={{ color }} />,
  people: ({ size, color }) => <MdPeople size={size} style={{ color }} />,
  inlove: ({ size, color }) => <MdFavorite size={size} style={{ color }} />,
  friends: ({ size, color }) => <MdGroup size={size} style={{ color }} />,
  whatsapp: ({ size, color }) => <SiWhatsapp size={size} style={{ color }} />,
};

export class CalendarIcon {
  static getIcon(note: TFile, app: App): React.ReactNode {
    const tags = app.metadataCache.getFileCache(note)?.frontmatter?.tags;
    const size = 14;

    if (tags) {
      for (const tag of tags) {
        const iconFunc = iconMap[tag];
        if (iconFunc) {
          return iconFunc({ size, color: getTagColor(tag) });
        }
      }
    }

    const path = note.path;
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

function getTagColor(tag: string): string {
  switch (tag) {
    case 'rain':
      return '#6dc8f2';
    case 'dream':
      return '#3876f2';
    case 'travel':
      return '#1199c2';
    case 'finances':
      return '#069d3e';
    case 'weather':
      return '#6dc8f2';
    case 'catholic':
      return '#ad6df2';
    case 'snow':
      return '#6dc8f2';
    case 'writing':
      return '#fcaa62';
    case 'youtube':
      return '#FF0000';
    case 'twitter':
      return '#1DA1F2';
    case 'blogpost':
      return '#117ac9';
    case 'agriculture':
      return '#008000';
    case 'pill':
      return '#c2a411';
    case 'pumpkin':
      return '#fc6203';
    case 'sick':
      return '#FF0000';
    case 'euro':
      return '#008000';
    case 'car':
      return '#0000FF';
    case 'confession':
      return '#ad6df2';
    case 'buy':
      return '#008000';
    case 'spotify':
      return '#1DB954';
    case 'music':
      return '#798aed';
    case 'podcast':
      return '#1DB954';
    case 'family':
      return '#800080';
    case 'sport':
      return '#FF8C00';
    case 'funeral':
      return '#74757a';
    case 'doctor':
      return '#FF0000';
    case 'gastronomy':
      return '#FFD700';
    case 'beer':
      return '#FF4500';
    case 'repairs':
      return '#A9A9A9';
    case 'people':
      return '#FFD700';
    case 'inlove':
      return '#FF1493';
    case 'friends':
      return '#c4be3d';
    case 'whatsapp':
      return '#25d366';
    default:
      return '#A9A9A9';
  }
}
