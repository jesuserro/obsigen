import { TFile } from 'obsidian';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BsFillCloudRainHeavyFill, BsFillPersonFill, BsSnow3, BsWordpress } from 'react-icons/bs';
import { CiPill } from 'react-icons/ci';
import { FaBirthdayCake, FaBook, FaBookReader, FaCarSide, FaChess, FaCode, FaCross, FaFileInvoiceDollar, FaGithub, FaGlobe, FaHiking, FaInstagram, FaLinkedin, FaLungsVirus, FaMoneyBillWave, FaPhone, FaPodcast, FaQuestionCircle, FaRss, FaStar, FaTelegram, FaTemperatureHigh, FaVenus, FaYoutube } from 'react-icons/fa';
import { GiChurch, GiCommercialAirplane, GiPrayerBeads, GiPumpkinMask, GiSandsOfTime, GiSparkSpirit, GiThermometerCold, GiTombstone, GiWheat } from 'react-icons/gi';
import { IoIosPaper, IoMdBasket, IoMdMusicalNotes } from 'react-icons/io';
import { MdBuild, MdDirectionsRun, MdFavorite, MdGroup, MdLocalBar, MdLocalHospital, MdPeople, MdRestaurant } from 'react-icons/md';
import { PiNotePencilBold } from 'react-icons/pi';
import { SiSpotify, SiTwitter, SiWhatsapp } from 'react-icons/si';
import { TbZzz } from 'react-icons/tb';
import { useApp } from './../../hooks/useApp';



export class CalendarIcon {
  static getIcon(note: TFile): React.ReactNode {
    const path = note.path;
    const size = 14;
    const app = useApp();

    const cssClasses = app?.metadataCache.getFileCache(note)?.frontmatter?.cssclasses;

    const iconMap: { [key: string]: (props: { size: number }) => JSX.Element } = {
      rain: ({ size }) => <BsFillCloudRainHeavyFill size={size} style={{ color: '#6dc8f2' }} />,
      dream: ({ size }) => <TbZzz size={size} style={{ color: '#3876f2' }} />,
      travel: ({ size }) => <GiCommercialAirplane size={size} style={{ color: '#1199c2' }} />,
      finances: ({ size }) => <FaMoneyBillWave size={size} style={{ color: '#069d3e' }} />,
      weather: ({ size }) => <GiThermometerCold size={size} style={{ color: '#6dc8f2' }} />,
      catholic: ({ size }) => <FaCross size={size} style={{ color: '#ad6df2' }} />,
      snow: ({ size }) => <BsSnow3 size={size} style={{ color: '#6dc8f2' }} />,
      writing: ({ size }) => <PiNotePencilBold size={size} style={{ color: '#fcaa62' }} />,
      youtube: ({ size }) => <FaYoutube size={size} style={{ color: '#FF0000' }} />, 
      twitter: ({ size }) => <SiTwitter size={size} style={{ color: '#1DA1F2' }} />,
      blogpost: ({ size }) => <BsWordpress size={size} style={{ color: '#117ac9' }} />,
      agriculture: ({ size }) => <IoMdBasket size={size} style={{ color: '#8B4513' }} />, 
      pill: ({ size }) => <CiPill size={size} style={{ color: '#c2a411' }} />,
      pumpkin: ({ size }) => <GiPumpkinMask size={size} style={{ color: '#fc6203' }} />,
      sick: ({ size }) => <GiThermometerCold size={size} style={{ color: '#FF0000' }} />,
      euro: ({ size }) => <IoIosPaper size={size} style={{ color: '#008000' }} />,
      car: ({ size }) => <FaCarSide size={size} style={{ color: '#800080' }} />, 
      family: ({ size }) => <MdGroup size={size} style={{ color: '#FFD700' }} />, 
      linkedin: ({ size }) => <FaLinkedin size={size} style={{ color: '#0077B5' }} />, 
      instagram: ({ size }) => <FaInstagram size={size} style={{ color: '#E4405F' }} />, 
      telegram: ({ size }) => <FaTelegram size={size} style={{ color: '#0088CC' }} />, 
      rss: ({ size }) => <FaRss size={size} style={{ color: '#FFA500' }} />, 
      chess: ({ size }) => <FaChess size={size} style={{ color: '#000' }} />, 
      kindle: ({ size }) => <FaBookReader size={size} style={{ color: '#FFA500' }} />, 
      book: ({ size }) => <FaBook size={size} style={{ color: '#000' }} />, 
      sport: ({ size }) => <MdDirectionsRun size={size} style={{ color: '#008000' }} />, 
      hiking: ({ size }) => <FaHiking size={size} style={{ color: '#008000' }} />, 
      phone: ({ size }) => <FaPhone size={size} style={{ color: '#000' }} />, 
      programming: ({ size }) => <FaCode size={size} style={{ color: '#FFA500' }} />, 
      bills: ({ size }) => <FaFileInvoiceDollar size={size} style={{ color: '#FF0000' }} />, 
      github: ({ size }) => <FaGithub size={size} style={{ color: '#000' }} />, 
      agro: ({ size }) => <GiWheat size={size} style={{ color: '#8B4513' }} />, 
      woman: ({ size }) => <FaVenus size={size} style={{ color: 'pink' }} />, 
      cough: ({ size }) => <FaLungsVirus size={size} style={{ color: '#FFA500' }} />, 
      fever: ({ size }) => <FaTemperatureHigh size={size} style={{ color: '#FFA500' }} />, 
      favorite: ({ size }) => <FaStar size={size} style={{ color: '#FFD700' }} />, 
      confession: ({ size }) => <FaCross size={size} style={{ color: '#ad6df2' }} />,
      buy: ({ size }) => <IoMdBasket size={size} style={{ color: '#008000' }} />,
      spotify: ({ size }) => <SiSpotify size={size} style={{ color: '#1DB954' }} />,
      music: ({ size }) => <IoMdMusicalNotes size={size} style={{ color: '#798aed' }} />,
      podcast: ({ size }) => <FaPodcast size={size} style={{ color: '#1DB954' }} />,
      funeral: ({ size }) => <GiTombstone size={size} style={{ color: '#74757a' }} />,
      doctor: ({ size }) => <MdLocalHospital size={size} style={{ color: '#FF0000' }} />,
      gastronomy: ({ size }) => <MdRestaurant size={size} style={{ color: '#FFD700' }} />,
      beer: ({ size }) => <MdLocalBar size={size} style={{ color: '#FF4500' }} />,
      repairs: ({ size }) => <MdBuild size={size} style={{ color: '#A9A9A9' }} />,
      people: ({ size }) => <MdPeople size={size} style={{ color: '#FFD700' }} />,
      inlove: ({ size }) => <MdFavorite size={size} style={{ color: '#FF1493' }} />,
      friends: ({ size }) => <MdGroup size={size} style={{ color: '#c4be3d' }} />,
      whatsapp: ({ size }) => <SiWhatsapp size={size} style={{ color: '#25d366' }} />,
      mass: ({ size }) => <GiChurch size={size} style={{ color: '#ad6df2' }} />,
      person: ({ size }) => <BsFillPersonFill size={size} style={{ color: '#add8e6' }} />,
      prayer: ({ size }) => <GiPrayerBeads size={size} style={{ color: '#866df7' }} />,
      inspiration: ({ size }) => <GiSparkSpirit size={size} style={{ color: '#f7c34a' }} />
    };

    if (cssClasses) {
      const cssClassIcons = cssClasses
        .filter((cssclass: string) => iconMap.hasOwnProperty(cssclass))
        .map((cssclass: string) => iconMap[cssclass]({ size }));

      if (cssClassIcons.length > 0) {
        return cssClassIcons[0]; 
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