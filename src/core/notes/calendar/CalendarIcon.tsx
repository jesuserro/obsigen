import { TFile } from 'obsidian';
import React from 'react';

import { BiLogoGmail } from 'react-icons/bi';
import { BsBookmarkStar, BsClockFill, BsFillCalendar2WeekFill, BsFillCheckCircleFill, BsFillCloudRainHeavyFill, BsFillHeartbreakFill, BsPersonCircle, BsSnow3, BsWordpress, BsFilm as IconoCinema, BsGraphUpArrow as IconoPrice } from 'react-icons/bs';
import { CiPill } from 'react-icons/ci';
import { FaAmazon, FaAws, FaBirthdayCake, FaBook, FaBookReader, FaBookmark, FaCarSide, FaChess, FaCode, FaCross, FaFileInvoiceDollar, FaGitSquare, FaGithub, FaGoodreads, FaGrinTongueWink, FaHeadSideCough, FaHiking, FaInstagram, FaKey, FaLinkedin, FaMapMarkerAlt, FaMoneyBillWave, FaPhone, FaPiggyBank, FaPodcast, FaPrayingHands, FaQuestionCircle, FaQuoteLeft, FaRss, FaSkype, FaSmile, FaStar, FaTelegram, FaTemperatureHigh, FaTired, FaTree, FaVenus, FaVoteYea, FaYoutube, FaBible as IconoBible, FaEuroSign as IconoPayroll } from 'react-icons/fa';
import { FaBasketball, FaCamera, FaPeopleGroup, FaUserDoctor } from 'react-icons/fa6';
import { FcCalendar } from 'react-icons/fc';
import { GiAncientRuins, GiBank, GiChurch, GiCommercialAirplane, GiCrownCoin, GiDeathSkull, GiDevilMask, GiGluttony, GiHammerSickle, GiHealthDecrease, GiHealthIncrease, GiHealthNormal, GiKneeling, GiPalmTree, GiPeaceDove, GiPerspectiveDiceThree, GiPrayerBeads, GiPumpkinMask, GiSandsOfTime, GiSoccerBall, GiSparkSpirit, GiThermometerCold, GiVillage, GiWheat } from 'react-icons/gi';
import { HiReceiptTax } from 'react-icons/hi';
import { ImSad2, ImWoman } from 'react-icons/im';
import { IoIosBeer, IoIosPaper, IoMdBasket, IoMdMusicalNotes, IoMdSunny } from 'react-icons/io';
import { IoFootsteps, IoHardwareChipOutline } from 'react-icons/io5';
import { MdBuild, MdDirectionsRun, MdFavorite, MdGroup, MdOutlineAddCircle, MdOutlineSportsGymnastics, MdPeople, MdPsychology, MdRestaurant, MdSick } from 'react-icons/md';
import { PiFishSimpleBold as IconoPlentyoffish, PiNotePencilBold, PiNumberCircleEightBold, PiNumberCircleNineBold, PiNumberCircleSevenBold, PiNumberCircleSixBold, PiNumberCircleThreeBold, PiNumberCircleZeroBold, PiThermometerCold } from 'react-icons/pi';
import { RiEarthquakeFill } from "react-icons/ri";
import { SiTinder as IconoTinder, SiGimp, SiOpenai, SiSpotify, SiTwitter, SiWhatsapp } from 'react-icons/si';
import { SlPicture } from "react-icons/sl";
import { TbBulbFilled, TbPills, TbZzz } from 'react-icons/tb';

// https://github.com/madebybowtie/FlagKit/blob/master/Assets/Flags.md
import Flag from 'react-flagkit';

import CustomIcon from '../../../ui/CustomIcon';


export class CalendarIcon {
  
  static getIcon(key: string, size: number): React.ReactNode | null {
    if (iconMap[key]) {
      return iconMap[key]({ size });
    }

    // Si la clave no se encuentra en el iconMap, puedes devolver nulo o un valor predeterminado.
    return null;
  }

  static getIconByCssClass(cssClass: string, size: number): React.ReactNode | null {
    if (iconMap.hasOwnProperty(cssClass)) {
      return iconMap[cssClass]({ size });
    }

    // Si la clave no se encuentra en el iconMap, puedes devolver nulo o un valor predeterminado.
    return null;
  }

  static getIconByNote(cssClasses:[], note: TFile, size: number): React.ReactNode {
    const path = note.path;

    if (cssClasses) {
      // Asegúrate de que cssClasses sea un array
      const cssClassesArray = Array.isArray(cssClasses) ? cssClasses : [cssClasses];
    
      const cssClassIcons = cssClassesArray
        .filter((cssclass: string) => iconMap.hasOwnProperty(cssclass))
        .map((cssclass: string) => iconMap[cssclass]({ size }));
    
      if (cssClassIcons.length > 0) {
        return cssClassIcons[0];
      }
    }

    if (path.includes('/Misas/')) {
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
      return iconMap['readwise']({ size });
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
    } else if (path.includes('/Captures/')) {
      return iconMap['blogpost']({ size });
    } else {
      return iconMap['question']({ size });
    }
  }
}

export const iconMap: { [key: string]: (props: { size: number }) => JSX.Element } = {
  achelm: ({ size }) => <CustomIcon size={size} className="pink" iconName="Achelm" />,
  add: ({ size }) => <MdOutlineAddCircle size={size} className="green" />,
  adoration: ({ size }) => <CustomIcon size={size} className="blue sky" iconName="Adoration" />,
  advent: ({ size }) => <CustomIcon size={size} className="blue sky" iconName="Advent" />,
  agenda2030: ({ size }) => <GiHammerSickle size={size} className="red communism" />,
  agriculture: ({ size }) => <IoMdBasket size={size} className="brown" />, 
  agro: ({ size }) => <GiWheat size={size} className="brown" />, 
  amazon: ({ size }) => <FaAmazon size={size} className="orange amazon" />,
  annas: ({ size }) => <CustomIcon size={size} className="pink" iconName="AnnaS" />,
  arburua: ({ size }) => <CustomIcon size={size} className="blue sky" iconName="Arburua" />,
  archeology: ({ size }) => <GiAncientRuins size={size} className="grey" />,
  argentina: ({ size }) => <Flag country='AR' size={size} className="" />,
  aws: ({ size }) => <FaAws size={size} className="orange aws" />,
  bank: ({ size }) => <GiBank size={size} className="red" />,
  barber: ({ size }) => <CustomIcon size={size} className="blue" iconName="Barber" />,
  basketball: ({ size }) => <FaBasketball size={size} className="orange" />,
  beer: ({ size }) => <IoIosBeer size={size} className="yellow" />,
  bible: ({ size }) => <IconoBible size={size} className="pink purple" />,
  bills: ({ size }) => <FaFileInvoiceDollar size={size} className="red" />, 
  birthday: ({ size }) => <FaBirthdayCake size={size} className="blue ui" />, 
  blogpost: ({ size }) => <BsWordpress size={size} className="blue wordpress" />,
  book: ({ size }) => <FaBook size={size} className="blue kindle" />, 
  bookmark: ({ size }) => <FaBookmark size={size} className="blue cobalt" />,
  buy: ({ size }) => <IoMdBasket size={size} className="red" />,
  calendar: ({ size }) => <BsFillCalendar2WeekFill size={size} className="blue ui" />, 
  camera: ({ size }) => <FaCamera size={size} className="blue sky" />, 
  car: ({ size }) => <FaCarSide size={size} className="red c3" />, 
  catholic: ({ size }) => <FaCross size={size} className="pink purple" />,
  cdr: ({ size }) => <CustomIcon size={size} className="orange" iconName="Cdr" />,
  cemetery: ({ size }) => <CustomIcon size={size} className="grey" iconName="Cemetery" />,
  charo: ({ size }) => <CustomIcon size={size} className="yellow" iconName="Charo" />,
  chess: ({ size }) => <FaChess size={size} className="blue chesscom" />, 
  christ: ({ size }) => <CustomIcon size={size} className="blue sky" iconName="Christ" />, 
  cinema: ({ size }) => <IconoCinema size={size} className="white" />,
  clock: ({ size }) => <BsClockFill size={size} className="orange" />,
  coin: ({ size }) => <GiCrownCoin size={size} className="grey" />,
  cold: ({ size }) => <PiThermometerCold size={size} className="blue aws" />,
  communism: ({ size }) => <GiHammerSickle size={size} className="red communism" />,
  confession: ({ size }) => <GiKneeling size={size} className="pink purple" />,
  cough: ({ size }) => <FaHeadSideCough size={size} className="yellow emoji" />, 
  dad: ({ size }) => <CustomIcon size={size} className="yellow" iconName="Dad" />,
  death: ({ size }) => <GiDeathSkull size={size} className="grey" />,
  doctor: ({ size }) => <FaUserDoctor size={size} className="green" />,
  dream: ({ size }) => <TbZzz size={size} className="blue cobalt" />,
  earthquake: ({ size }) => <RiEarthquakeFill size={size} className="red" />,
  elections: ({ size }) => <FaVoteYea size={size} className="orange" />,
  email: ({ size }) => <BiLogoGmail size={size} className="red" />,
  emaus: ({ size }) => <CustomIcon size={size} className="blue sky" iconName="Emaus" />,
  euro: ({ size }) => <IoIosPaper size={size} className="yellow" />,
  evil: ({ size }) => <GiDevilMask size={size} className="red" />,
  family: ({ size }) => <MdGroup size={size} className="yellow" />, 
  fatigue: ({ size }) => <FaGrinTongueWink size={size} className="yellow emoji" />, 
  fatima: ({ size }) => <CustomIcon size={size} className="blue sky" iconName="Fatima" />,
  favorite: ({ size }) => <FaStar size={size} className="yellow" />, 
  fever: ({ size }) => <FaTemperatureHigh size={size} className="yellow emoji" />, 
  finances: ({ size }) => <FaMoneyBillWave size={size} className="red" />,
  foot: ({ size }) => <IoFootsteps size={size} className="blue aws" />,
  friends: ({ size }) => <MdGroup size={size} className="yellow" />,
  funeral: ({ size }) => <GiChurch size={size} className="grey" />,
  funeralhome: ({ size }) => <CustomIcon size={size} className="grey" iconName="FuneralHome" />,
  garabandal: ({ size }) => <CustomIcon size={size} className="blue sky" iconName="Garabandal" />,
  gastronomy: ({ size }) => <MdRestaurant size={size} style={{ color: '#FFD700' }} />,
  gimp: ({ size }) => <SiGimp size={size} className='orange' />, 
  git: ({ size }) => <FaGitSquare size={size} className='orange' />, 
  github: ({ size }) => <FaGithub size={size} style={{ color: '#fff' }} />, 
  gluttony: ({ size }) => <GiGluttony size={size} className='yellow emoji' />, 
  gonzalo: ({ size }) => <CustomIcon size={size} className="yellow" iconName="Gonzalo" />,
  goodreads: ({ size }) => <FaGoodreads size={size} className="brown goodreads" />,
  gospa: ({ size }) => <CustomIcon size={size} className="blue sky" iconName="Gospa" />,
  gym: ({ size }) => <MdOutlineSportsGymnastics size={size} className="green" />,
  hacienda: ({ size }) => <CustomIcon size={size} className="red" iconName="Hacienda" />,
  happiness: ({ size }) => <FaSmile size={size} className="yellow" />,
  hardware: ({ size }) => <IoHardwareChipOutline size={size} className="orange" />,
  health: ({ size }) => <GiHealthNormal size={size} className="yellow emoji" />, 
  healthok: ({ size }) => <GiHealthIncrease size={size} className="green" />, 
  healthko: ({ size }) => <GiHealthDecrease size={size} className="red" />, 
  heartbreak: ({ size }) => <BsFillHeartbreakFill size={size} className="red" />, 
  hiking: ({ size }) => <FaHiking size={size} className="green" />, 
  holiday: ({ size }) => <GiPalmTree size={size} className="green" />, 
  holyspirit: ({ size }) => <CustomIcon size={size} className="blue sky" iconName="HolySpirit" />,
  idea: ({ size }) => <TbBulbFilled size={size} className="yellow" />,
  inlove: ({ size }) => <MdFavorite size={size} className="pink" />,
  inspiration: ({ size }) => <GiSparkSpirit size={size} style={{ color: '#f2a83f' }} />,
  instagram: ({ size }) => <FaInstagram size={size} className="pink instagram" />,
  irene: ({ size }) => <CustomIcon size={size} className="pink" iconName="Irene" />,
  israel: ({ size }) => <Flag country='IL' size={size} className="" />, 
  italy: ({ size }) => <Flag country='IT' size={size} className="" />,
  itv: ({ size }) => <CustomIcon size={size} className="orange" iconName="Itv" />,
  josefita: ({ size }) => <CustomIcon size={size} className="yellow" iconName="Josefita" />,
  josemi: ({ size }) => <CustomIcon size={size} className="yellow" iconName="Josemi" />,
  key: ({ size }) => <FaKey size={size} className="yellow" />, 
  kindle: ({ size }) => <FaBookReader size={size} className="blue kindle" />, 
  kote: ({ size }) => <CustomIcon size={size} className="yellow" iconName="Kote" />,
  linkedin: ({ size }) => <FaLinkedin size={size} className="blue linkedin" />, 
  lottery: ({ size }) => <CustomIcon size={size} className="red" iconName="Lottery" />,
  luis: ({ size }) => <CustomIcon size={size} className="yellow" iconName="Luis" />,
  marker: ({ size }) => <FaMapMarkerAlt size={size} className="brown" />,
  mass: ({ size }) => <GiChurch size={size} className="pink purple" />,
  meeting: ({ size }) => <FaPeopleGroup size={size} className="orange" />,
  mom: ({ size }) => <CustomIcon size={size} className="yellow" iconName="Mom" />,
  music: ({ size }) => <IoMdMusicalNotes size={size} className="indigo" />,
  natalia: ({ size }) => <CustomIcon size={size} className="yellow" iconName="Natalia" />,
  nieves: ({ size }) => <CustomIcon size={size} className="pink" iconName="Nieves" />,
  num0: ({ size }) => <PiNumberCircleZeroBold size={size} style={{ color: '#fff' }} />,
  num3: ({ size }) => <PiNumberCircleThreeBold size={size} style={{ color: '#fff' }} />,
  num6: ({ size }) => <PiNumberCircleSixBold size={size} style={{ color: '#fff' }} />,
  num7: ({ size }) => <PiNumberCircleSevenBold size={size} style={{ color: '#fff' }} />,
  num8: ({ size }) => <PiNumberCircleEightBold size={size} style={{ color: '#fff' }} />,
  num9: ({ size }) => <PiNumberCircleNineBold size={size} style={{ color: '#fff' }} />,
  nun: ({ size }) => <CustomIcon size={size} className="pink purple" iconName="Nun" />,
  ok: ({ size }) => <BsFillCheckCircleFill size={size} className="green" />,
  openai: ({ size }) => <SiOpenai size={size} className="green openai" />,
  payroll: ({ size }) => <IconoPayroll size={size} className="yellow" />,
  peace: ({ size }) => <GiPeaceDove size={size} className="white" />,
  people: ({ size }) => <MdPeople size={size} className="grey" />,
  perspective: ({ size }) => <GiPerspectiveDiceThree size={size} className="yellow" />,
  person: ({ size }) => <BsPersonCircle size={size} className="grey" />,
  phone: ({ size }) => <FaPhone size={size} className="white" />, 
  picture: ({ size }) => <SlPicture size={size} className="yellow" />,
  pilar: ({ size }) => <CustomIcon size={size} className="pink" iconName="Pilar" />,
  pill: ({ size }) => <CiPill size={size} className="yellow" />,
  plentyoffish: ({ size }) => <IconoPlentyoffish size={size} className="pink" />,
  podcast: ({ size }) => <FaPodcast size={size} className="orange" />,
  poland: ({ size }) => <Flag country='PL' size={size} className="" />,
  pope: ({ size }) => <CustomIcon size={size} className="pink purple" iconName="Pope" />,
  prayer: ({ size }) => <FaPrayingHands size={size} className="pink purple" />,
  price: ({ size }) => <IconoPrice size={size} className="red" />,
  priest: ({ size }) => <CustomIcon size={size} className="pink purple" iconName="Priest" />,
  programming: ({ size }) => <FaCode size={size} className="orange" />, 
  psychology: ({ size }) => <MdPsychology size={size} className="green" />,
  pumpkin: ({ size }) => <GiPumpkinMask size={size} className="orange" />,
  question: ({ size }) => <FaQuestionCircle size={size} className="orange" />,
  quote: ({ size }) => <FaQuoteLeft size={size} className="yellow" />,
  rain: ({ size }) => <BsFillCloudRainHeavyFill size={size} className="blue sky" />,
  ramon: ({ size }) => <CustomIcon size={size} className="yellow" iconName="Ramon" />,
  readwise: ({ size }) => <CustomIcon size={size} className="white" iconName="Readwise" />,
  realmadrid: ({ size }) => <CustomIcon size={size} className="green" iconName="RealMadrid" />,
  repairs: ({ size }) => <MdBuild size={size} className="orange" />,
  review: ({ size }) => <BsBookmarkStar size={size} className="yellow" />,
  romania: ({ size }) => <Flag country='RO' size={size} className="" />,
  rosary: ({ size }) => <GiPrayerBeads size={size} className="pink purple" />,
  rss: ({ size }) => <FaRss size={size} className="orange" />,  
  russia: ({ size }) => <Flag country='RU' size={size} className="" />, 
  sadness: ({ size }) => <ImSad2 size={size} className="yellow emoji" />,
  saint: ({ size }) => <CustomIcon size={size} className="blue sky" iconName="Saint" />,
  saintwoman: ({ size }) => <CustomIcon size={size} className="blue sky" iconName="SaintWoman" />,
  saving: ({ size }) => <FaPiggyBank size={size} className="green" />,
  sex: ({ size }) => <FaVenus size={size} className="pink" />,
  sick: ({ size }) => <MdSick size={size} className="yellow emoji" />,
  skype: ({ size }) => <FaSkype size={size} style={{ color: '#00AFF0' }} />,
  snow: ({ size }) => <BsSnow3 size={size} className="white" />,
  soccer: ({ size }) => <GiSoccerBall size={size} className="green" />,
  spain: ({ size }) => <Flag country='ES' size={size} className="" />,
  sport: ({ size }) => <MdDirectionsRun size={size} className="green" />, 
  spotify: ({ size }) => <SiSpotify size={size} className="green spotify" />,
  sunny: ({ size }) => <IoMdSunny size={size} className="yellow" />,
  supplement: ({ size }) => <TbPills size={size} className="yellow" />,
  tax: ({ size }) => <HiReceiptTax size={size} style={{ color: '#fc0303' }} />, 
  telegram: ({ size }) => <FaTelegram size={size} className="blue telegram" />, 
  timothy: ({ size }) => <CustomIcon size={size} className="yellow" iconName="Timothy" />,
  tinder: ({ size }) => <IconoTinder size={size} style={{ color: '#FE3C72' }} />,
  tired: ({ size }) => <FaTired size={size} style={{ color: '#FFC83D' }} />,
  travel: ({ size }) => <GiCommercialAirplane size={size} style={{ color: '#1199c2' }} />,
  tree: ({ size }) => <FaTree size={size} style={{ color: '#228B22' }} />,
  twitter: ({ size }) => <SiTwitter size={size} className="blue twitter" />,
  vatican: ({ size }) => <Flag country='VA' size={size} className="" />,
  victor: ({ size }) => <CustomIcon size={size} className="yellow" iconName="Victor" />,
  village: ({ size }) => <GiVillage size={size} style={{ color: '#47ff6c' }} />,
  visa: ({ size }) => <CustomIcon size={size} className="red" iconName="Visa" />,
  watchsand: ({ size }) => <GiSandsOfTime size={size} style={{ color: '#FFFF99' }} />,
  weather: ({ size }) => <GiThermometerCold size={size} style={{ color: '#6dc8f2' }} />,
  whatsapp: ({ size }) => <SiWhatsapp size={size} className="green whatsapp" />, 
  woman: ({ size }) => <ImWoman size={size} className="pink" />, 
  writing: ({ size }) => <PiNotePencilBold size={size} style={{ color: '#fcaa62' }} />,
  year: ({ size }) => <FcCalendar size={size} className="red youtube" />,
  youtube: ({ size }) => <FaYoutube size={size} className="red youtube" />
};