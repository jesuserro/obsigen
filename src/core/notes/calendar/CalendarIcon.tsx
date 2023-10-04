import { TFile } from 'obsidian';
import React from 'react';
import { useApp } from './../../hooks/useApp';

import { AiFillHeart } from 'react-icons/ai';
import { BsFillCloudRainHeavyFill, BsFillPersonFill, BsSnow3, BsWordpress, BsFilm as IconoCinema, BsGraphUpArrow as IconoPrice } from 'react-icons/bs';
import { CiPill } from 'react-icons/ci';
import { FaAmazon, FaBirthdayCake, FaBook, FaBookReader, FaCarSide, FaChess, FaCode, FaCross, FaFileInvoiceDollar, FaGithub, FaGlobe, FaHiking, FaInstagram, FaLinkedin, FaLungsVirus, FaMoneyBillWave, FaPhone, FaPodcast, FaPrayingHands, FaQuestionCircle, FaQuoteLeft, FaRss, FaStar, FaTelegram, FaTemperatureHigh, FaVenus, FaYoutube, FaBible as IconoBible, FaEuroSign as IconoPayroll } from 'react-icons/fa';
import { FaStaffSnake } from 'react-icons/fa6';
import { GiChurch, GiCommercialAirplane, GiKneeling, GiPerspectiveDiceThree, GiPrayerBeads, GiPumpkinMask, GiSandsOfTime, GiSparkSpirit, GiThermometerCold, GiTombstone, GiWheat } from 'react-icons/gi';
import { ImWoman } from 'react-icons/im';
import { IoIosPaper, IoMdBasket, IoMdMusicalNotes } from 'react-icons/io';
import { MdBuild, MdDirectionsRun, MdFavorite, MdGroup, MdLocalBar, MdLocalHospital, MdPeople, MdRestaurant } from 'react-icons/md';
import { PiFishSimpleBold as IconoPlentyoffish, PiNotePencilBold } from 'react-icons/pi';
import { SiTinder as IconoTinder, SiSpotify, SiTwitter, SiWhatsapp } from 'react-icons/si';
import { TbZzz } from 'react-icons/tb';

export class CalendarIcon {
  static getIcon(note: TFile): React.ReactNode {
    const path = note.path;
    const size = 14;
    const app = useApp();

    const cssClasses = app?.metadataCache.getFileCache(note)?.frontmatter?.cssclasses;

    const iconMap: { [key: string]: (props: { size: number }) => JSX.Element } = {
      agriculture: ({ size }) => <IoMdBasket size={size} style={{ color: '#8B4513' }} />, 
      agro: ({ size }) => <GiWheat size={size} style={{ color: '#8B4513' }} />, 
      amazon: ({ size }) => <FaAmazon size={size} style={{ color: '#FF9900' }} />,
      beer: ({ size }) => <MdLocalBar size={size} style={{ color: '#FF4500' }} />,
      bible: ({ size }) => <IconoBible size={size} style={{ color: '#8A2BE2' }} />,
      bills: ({ size }) => <FaFileInvoiceDollar size={size} style={{ color: '#f74a4a' }} />, 
      blogpost: ({ size }) => <BsWordpress size={size} style={{ color: '#117ac9' }} />,
      book: ({ size }) => <FaBook size={size} style={{ color: '#fff' }} />, 
      buy: ({ size }) => <IoMdBasket size={size} style={{ color: '#008000' }} />,
      car: ({ size }) => <FaCarSide size={size} style={{ color: '#800080' }} />, 
      catholic: ({ size }) => <FaCross size={size} style={{ color: '#ad6df2' }} />,
      chess: ({ size }) => <FaChess size={size} style={{ color: '#fff' }} />, 
      cinema: ({ size }) => <IconoCinema size={size} style={{ color: '#FFA500' }} />,
      confession: ({ size }) => <GiKneeling size={size} style={{ color: '#ad6df2' }} />,
      cough: ({ size }) => <FaLungsVirus size={size} style={{ color: '#FFA500' }} />, 
      doctor: ({ size }) => <MdLocalHospital size={size} style={{ color: '#f74a4a' }} />,
      dream: ({ size }) => <TbZzz size={size} style={{ color: '#3876f2' }} />,
      euro: ({ size }) => <IoIosPaper size={size} style={{ color: '#008000' }} />,
      family: ({ size }) => <MdGroup size={size} style={{ color: '#FFD700' }} />, 
      favorite: ({ size }) => <FaStar size={size} style={{ color: '#FFD700' }} />, 
      fever: ({ size }) => <FaTemperatureHigh size={size} style={{ color: '#FFA500' }} />, 
      finances: ({ size }) => <FaMoneyBillWave size={size} style={{ color: '#069d3e' }} />,
      friends: ({ size }) => <MdGroup size={size} style={{ color: '#c4be3d' }} />,
      funeral: ({ size }) => <GiTombstone size={size} style={{ color: '#74757a' }} />,
      gastronomy: ({ size }) => <MdRestaurant size={size} style={{ color: '#FFD700' }} />,
      github: ({ size }) => <FaGithub size={size} style={{ color: '#fff' }} />, 
      health: ({ size }) => <FaStaffSnake size={size} style={{ color: '#47ff6c' }} />, 
      hiking: ({ size }) => <FaHiking size={size} style={{ color: '#008000' }} />, 
      inlove: ({ size }) => <MdFavorite size={size} style={{ color: '#f542ef' }} />,
      inspiration: ({ size }) => <GiSparkSpirit size={size} style={{ color: '#f2a83f' }} />,
      instagram: ({ size }) => <FaInstagram size={size} style={{ color: '#E4405F' }} />, 
      kindle: ({ size }) => <FaBookReader size={size} style={{ color: '#FFA500' }} />, 
      linkedin: ({ size }) => <FaLinkedin size={size} style={{ color: '#0077B5' }} />, 
      mass: ({ size }) => <GiChurch size={size} style={{ color: '#ad6df2' }} />,
      music: ({ size }) => <IoMdMusicalNotes size={size} style={{ color: '#798aed' }} />,
      payroll: ({ size }) => <IconoPayroll size={size} style={{ color: '#FFD700' }} />,
      people: ({ size }) => <MdPeople size={size} style={{ color: '#FFD700' }} />,
      perspective: ({ size }) => <GiPerspectiveDiceThree size={size} style={{ color: '#FFA500' }} />,
      person: ({ size }) => <BsFillPersonFill size={size} style={{ color: '#add8e6' }} />,
      phone: ({ size }) => <FaPhone size={size} style={{ color: '#fff' }} />, 
      pill: ({ size }) => <CiPill size={size} style={{ color: '#c2a411' }} />,
      plentyoffish: ({ size }) => <IconoPlentyoffish size={size} style={{ color: '#FF69B4' }} />,
      podcast: ({ size }) => <FaPodcast size={size} style={{ color: '#fc7f03' }} />,
      prayer: ({ size }) => <FaPrayingHands size={size} style={{ color: '#ad6df2' }} />,
      price: ({ size }) => <IconoPrice size={size} style={{ color: '#fc0303' }} />,
      programming: ({ size }) => <FaCode size={size} style={{ color: '#FFA500' }} />, 
      pumpkin: ({ size }) => <GiPumpkinMask size={size} style={{ color: '#fc6203' }} />,
      quote: ({ size }) => <FaQuoteLeft size={size} style={{ color: '#FFD700' }} />,
      rain: ({ size }) => <BsFillCloudRainHeavyFill size={size} style={{ color: '#6dc8f2' }} />,
      repairs: ({ size }) => <MdBuild size={size} style={{ color: '#A9A9A9' }} />,
      rosary: ({ size }) => <GiPrayerBeads size={size} style={{ color: '#ad6df2' }} />,
      rss: ({ size }) => <FaRss size={size} style={{ color: '#FFA500' }} />, 
      sex: ({ size }) => <FaVenus size={size} style={{ color: '#f542ef' }} />,
      sick: ({ size }) => <GiThermometerCold size={size} style={{ color: '#f74a4a' }} />,
      snow: ({ size }) => <BsSnow3 size={size} style={{ color: '#6dc8f2' }} />,
      sport: ({ size }) => <MdDirectionsRun size={size} style={{ color: '#008000' }} />, 
      spotify: ({ size }) => <SiSpotify size={size} style={{ color: '#1DB954' }} />,
      telegram: ({ size }) => <FaTelegram size={size} style={{ color: '#0088CC' }} />, 
      tinder: ({ size }) => <IconoTinder size={size} style={{ color: '#FE3C72' }} />,
      travel: ({ size }) => <GiCommercialAirplane size={size} style={{ color: '#1199c2' }} />,
      twitter: ({ size }) => <SiTwitter size={size} style={{ color: '#1DA1F2' }} />,
      weather: ({ size }) => <GiThermometerCold size={size} style={{ color: '#6dc8f2' }} />,
      whatsapp: ({ size }) => <SiWhatsapp size={size} style={{ color: '#25d366' }} />, 
      woman: ({ size }) => <ImWoman size={size} style={{ color: '#f542ef' }} />, 
      writing: ({ size }) => <PiNotePencilBold size={size} style={{ color: '#fcaa62' }} />,
      youtube: ({ size }) => <FaYoutube size={size} style={{ color: '#f74a4a' }} />
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
      return <AiFillHeart size={size} style={{ color: '#f542ef' }} />;
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