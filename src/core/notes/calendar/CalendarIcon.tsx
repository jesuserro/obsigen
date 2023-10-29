import { TFile } from 'obsidian';
import React from 'react';
import { useApp } from './../../hooks/useApp';

import { BiLogoGmail } from 'react-icons/bi';
import { BsFillCalendar2WeekFill, BsFillCloudRainHeavyFill, BsFillPersonFill, BsSnow3, BsWordpress, BsFilm as IconoCinema, BsGraphUpArrow as IconoPrice } from 'react-icons/bs';
import { CiPill } from 'react-icons/ci';
import { FaAmazon, FaAws, FaBirthdayCake, FaBook, FaBookReader, FaBookmark, FaCarSide, FaChess, FaCode, FaCross, FaFileInvoiceDollar, FaFutbol, FaGithub, FaGoodreads, FaHeadSideCough, FaHiking, FaInstagram, FaKey, FaLinkedin, FaMapMarkerAlt, FaMoneyBillWave, FaPhone, FaPodcast, FaPrayingHands, FaQuestionCircle, FaQuoteLeft, FaRss, FaSmile, FaStar, FaTelegram, FaTemperatureHigh, FaTired, FaTree, FaVenus, FaVoteYea, FaYoutube, FaBible as IconoBible, FaEuroSign as IconoPayroll } from 'react-icons/fa';
import { FaBasketball, FaPeopleGroup, FaStaffSnake, FaUserDoctor } from 'react-icons/fa6';
import { GiAncientRuins, GiChurch, GiCommercialAirplane, GiHammerSickle, GiKneeling, GiPerspectiveDiceThree, GiPrayerBeads, GiPumpkinMask, GiSandsOfTime, GiSoccerBall, GiSparkSpirit, GiThermometerCold, GiTombstone, GiVillage, GiWheat } from 'react-icons/gi';
import { HiReceiptTax } from 'react-icons/hi';
import { ImSad2, ImWoman } from 'react-icons/im';
import { IoIosPaper, IoMdBasket, IoMdMusicalNotes } from 'react-icons/io';
import { IoHardwareChipOutline } from 'react-icons/io5';
import { MdBuild, MdDirectionsRun, MdFavorite, MdGroup, MdLocalBar, MdOutlineAddCircle, MdOutlineSportsGymnastics, MdPeople, MdPsychology, MdRestaurant, MdSick } from 'react-icons/md';
import { PiFishSimpleBold as IconoPlentyoffish, PiNotePencilBold, PiNumberCircleEightBold, PiNumberCircleNineBold, PiNumberCircleSevenBold, PiNumberCircleSixBold, PiNumberCircleThreeBold, PiNumberCircleZeroBold } from 'react-icons/pi';
import { SiTinder as IconoTinder, SiSpotify, SiTwitter, SiWhatsapp } from 'react-icons/si';
import { TbZzz } from 'react-icons/tb';

import Flag from 'react-flagkit';


import Achelm from './../../../ui/icons/Achelm';

export class CalendarIcon {
  
  static getIcon(key: string, size: number): React.ReactNode | null {
    if (iconMap[key]) {
      return iconMap[key]({ size });
    }

    // Si la clave no se encuentra en el iconMap, puedes devolver nulo o un valor predeterminado.
    return null;
  }

  static getIconByNote(note: TFile, size: number): React.ReactNode {
    const path = note.path;
    const app = useApp();

    const cssClasses = app?.metadataCache.getFileCache(note)?.frontmatter?.cssclasses;

    if (cssClasses) {
      const cssClassIcons = cssClasses
        .filter((cssclass: string) => iconMap.hasOwnProperty(cssclass))
        .map((cssclass: string) => iconMap[cssclass]({ size }));

      if (cssClassIcons.length > 0) {
        return cssClassIcons[0];
      }
    }

    if (path.includes('Anna') || path.includes("Nieves")) {
      return iconMap['inlove']({ size });
    } else if (path.includes('/Misas/')) {
      return iconMap['mass']({ size });
    } else if (path.includes('/Biblia/')) {
      return iconMap['bible']({ size });
    } else if (path.includes('005 Synch/Readwise/Books/')) {
      return iconMap['book']({ size });
    } else if (path.includes('005 Synch/Readwise/Tweets/')) {
      return iconMap['twitter']({ size });
    } else if (path.includes('005 Synch/Readwise/Podcasts/')) {
      return iconMap['podcast']({ size });
    } else if (path.includes('005 Synch/Readwise/Articles/')) {
      return iconMap['bookmark']({ size });
    } else if (path.includes('005 Synch/goodsidian/')) {
      return iconMap['goodreads']({ size });
    } else if (path.includes('005 Synch/Kindtocs/')) {
      return iconMap['kindle']({ size });
    } else if (path.includes('500 Gente/Chicas/')) {
      return iconMap['woman']({ size });
    } else if (path.includes('500 Gente/')) {
      return iconMap['person']({ size });
    } else if (path.includes('300 Geo/')) {
      return iconMap['marker']({ size });
    } else if (path.includes('200 Content Maps/')) {
      return iconMap['key']({ size });
    } else if (path.includes('/Aniversaries/')) {
      return iconMap['birthday']({ size });
    } else if (path.includes('/Moments/')) {
      return iconMap['watchsand']({ size });
    } else if (path.includes('/Captures/')) {
      return iconMap['blogpost']({ size });
    } else {
      return iconMap['question']({ size });
    }
  }
}

export const iconMap: { [key: string]: (props: { size: number }) => JSX.Element } = {
  achelm: ({ size }) => <Achelm size={size} className="pink" />,
  add: ({ size }) => <MdOutlineAddCircle size={size} className="green" />,
  agenda2030: ({ size }) => <GiHammerSickle size={size} className="red communism" />,
  agriculture: ({ size }) => <IoMdBasket size={size} className="brown" />, 
  agro: ({ size }) => <GiWheat size={size} className="brown" />, 
  amazon: ({ size }) => <FaAmazon size={size} className="orange amazon" />,
  archeology: ({ size }) => <GiAncientRuins size={size} className="grey" />,
  aws: ({ size }) => <FaAws size={size} className="orange aws" />,
  basketball: ({ size }) => <FaBasketball size={size} className="orange" />,
  beer: ({ size }) => <MdLocalBar size={size} className="yellow" />,
  bible: ({ size }) => <IconoBible size={size} className="pink purple" />,
  bills: ({ size }) => <FaFileInvoiceDollar size={size} className="red" />, 
  birthday: ({ size }) => <FaBirthdayCake size={size} className="blue ui" />, 
  blogpost: ({ size }) => <BsWordpress size={size} className="blue wordpress" />,
  book: ({ size }) => <FaBook size={size} className="blue kindle" />, 
  bookmark: ({ size }) => <FaBookmark size={size} className="blue cobalt" />,
  buy: ({ size }) => <IoMdBasket size={size} className="red" />,
  calendar: ({ size }) => <BsFillCalendar2WeekFill size={size} className="blue ui" />, 
  car: ({ size }) => <FaCarSide size={size} className="red c3" />, 
  catholic: ({ size }) => <FaCross size={size} className="pink purple" />,
  chess: ({ size }) => <FaChess size={size} className="blue chesscom" />, 
  cinema: ({ size }) => <IconoCinema size={size} className="white" />,
  communism: ({ size }) => <GiHammerSickle size={size} className="red communism" />,
  confession: ({ size }) => <GiKneeling size={size} className="pink purple" />,
  cough: ({ size }) => <FaHeadSideCough size={size} className="yellow emoji" />, 
  doctor: ({ size }) => <FaUserDoctor size={size} className="green" />,
  dream: ({ size }) => <TbZzz size={size} className="blue cobalt" />,
  elections: ({ size }) => <FaVoteYea size={size} className="orange" />,
  email: ({ size }) => <BiLogoGmail size={size} className="red" />,
  euro: ({ size }) => <IoIosPaper size={size} className="yellow" />,
  family: ({ size }) => <MdGroup size={size} className="yellow" />, 
  favorite: ({ size }) => <FaStar size={size} className="yellow" />, 
  fever: ({ size }) => <FaTemperatureHigh size={size} className="yellow emoji" />, 
  finances: ({ size }) => <FaMoneyBillWave size={size} className="red" />,
  friends: ({ size }) => <MdGroup size={size} className="yellow" />,
  funeral: ({ size }) => <GiTombstone size={size} className="grey" />,
  gastronomy: ({ size }) => <MdRestaurant size={size} style={{ color: '#FFD700' }} />,
  github: ({ size }) => <FaGithub size={size} style={{ color: '#fff' }} />, 
  goodreads: ({ size }) => <FaGoodreads size={size} className="brown goodreads" />,
  gym: ({ size }) => <MdOutlineSportsGymnastics size={size} className="green" />,
  happiness: ({ size }) => <FaSmile size={size} className="yellow" />,
  hardware: ({ size }) => <IoHardwareChipOutline size={size} className="orange" />,
  health: ({ size }) => <FaStaffSnake size={size} className="green" />, 
  hiking: ({ size }) => <FaHiking size={size} className="green" />, 
  israel: ({ size }) => <Flag country='IL' size={size} className="" />,
  inlove: ({ size }) => <MdFavorite size={size} className="pink" />,
  inspiration: ({ size }) => <GiSparkSpirit size={size} style={{ color: '#f2a83f' }} />,
  instagram: ({ size }) => <FaInstagram size={size} className="pink instagram" />, 
  italy: ({ size }) => <Flag country='IT' size={size} className="" />,
  key: ({ size }) => <FaKey size={size} className="yellow" />, 
  kindle: ({ size }) => <FaBookReader size={size} className="blue kindle" />, 
  linkedin: ({ size }) => <FaLinkedin size={size} className="blue linkedin" />, 
  marker: ({ size }) => <FaMapMarkerAlt size={size} className="brown" />,
  mass: ({ size }) => <GiChurch size={size} className="pink purple" />,
  meeting: ({ size }) => <FaPeopleGroup size={size} className="orange" />,
  music: ({ size }) => <IoMdMusicalNotes size={size} className="indigo" />,
  num0: ({ size }) => <PiNumberCircleZeroBold size={size} style={{ color: '#fff' }} />,
  num3: ({ size }) => <PiNumberCircleThreeBold size={size} style={{ color: '#fff' }} />,
  num6: ({ size }) => <PiNumberCircleSixBold size={size} style={{ color: '#fff' }} />,
  num7: ({ size }) => <PiNumberCircleSevenBold size={size} style={{ color: '#fff' }} />,
  num8: ({ size }) => <PiNumberCircleEightBold size={size} style={{ color: '#fff' }} />,
  num9: ({ size }) => <PiNumberCircleNineBold size={size} style={{ color: '#fff' }} />,
  payroll: ({ size }) => <IconoPayroll size={size} className="yellow" />,
  people: ({ size }) => <MdPeople size={size} className="grey" />,
  perspective: ({ size }) => <GiPerspectiveDiceThree size={size} className="yellow" />,
  person: ({ size }) => <BsFillPersonFill size={size} className="grey" />,
  phone: ({ size }) => <FaPhone size={size} className="white" />, 
  pill: ({ size }) => <CiPill size={size} className="yellow" />,
  plentyoffish: ({ size }) => <IconoPlentyoffish size={size} className="pink" />,
  podcast: ({ size }) => <FaPodcast size={size} className="orange" />,
  poland: ({ size }) => <Flag country='PL' size={size} className="" />,
  prayer: ({ size }) => <FaPrayingHands size={size} className="pink purple" />,
  price: ({ size }) => <IconoPrice size={size} className="red" />,
  programming: ({ size }) => <FaCode size={size} className="orange" />, 
  psychology: ({ size }) => <MdPsychology size={size} className="green" />,
  pumpkin: ({ size }) => <GiPumpkinMask size={size} className="orange" />,
  question: ({ size }) => <FaQuestionCircle size={size} className="orange" />,
  quote: ({ size }) => <FaQuoteLeft size={size} className="yellow" />,
  rain: ({ size }) => <BsFillCloudRainHeavyFill size={size} className="blue sky" />,
  realmadrid: ({ size }) => <FaFutbol size={size} className="white" />,
  repairs: ({ size }) => <MdBuild size={size} className="orange" />,
  rosary: ({ size }) => <GiPrayerBeads size={size} className="pink purple" />,
  rss: ({ size }) => <FaRss size={size} className="orange" />, 
  russia: ({ size }) => <Flag country='RU' size={size} className="orange" />, 
  sadness: ({ size }) => <ImSad2 size={size} className="yellow emoji" />,
  sex: ({ size }) => <FaVenus size={size} className="pink" />,
  sick: ({ size }) => <MdSick size={size} className="yellow emoji" />,
  snow: ({ size }) => <BsSnow3 size={size} className="white" />,
  soccer: ({ size }) => <GiSoccerBall size={size} className="green" />,
  spain: ({ size }) => <Flag country='ES' size={size} className="" />,
  sport: ({ size }) => <MdDirectionsRun size={size} className="green" />, 
  spotify: ({ size }) => <SiSpotify size={size} className="green spotify" />,
  tax: ({ size }) => <HiReceiptTax size={size} style={{ color: '#fc0303' }} />, 
  telegram: ({ size }) => <FaTelegram size={size} className="blue telegram" />, 
  tinder: ({ size }) => <IconoTinder size={size} style={{ color: '#FE3C72' }} />,
  tired: ({ size }) => <FaTired size={size} style={{ color: '#FFC83D' }} />,
  travel: ({ size }) => <GiCommercialAirplane size={size} style={{ color: '#1199c2' }} />,
  tree: ({ size }) => <FaTree size={size} style={{ color: '#228B22' }} />,
  twitter: ({ size }) => <SiTwitter size={size} className="blue twitter" />,
  village: ({ size }) => <GiVillage size={size} style={{ color: '#47ff6c' }} />,
  watchsand: ({ size }) => <GiSandsOfTime size={size} style={{ color: '#FFFF99' }} />,
  weather: ({ size }) => <GiThermometerCold size={size} style={{ color: '#6dc8f2' }} />,
  whatsapp: ({ size }) => <SiWhatsapp size={size} className="green whatsapp" />, 
  woman: ({ size }) => <ImWoman size={size} className="pink" />, 
  writing: ({ size }) => <PiNotePencilBold size={size} style={{ color: '#fcaa62' }} />,
  youtube: ({ size }) => <FaYoutube size={size} className="red youtube" />
};