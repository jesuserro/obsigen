import { TFile } from 'obsidian';
import React from 'react';
import { useApp } from './../../hooks/useApp';

import { BiLogoGmail } from 'react-icons/bi';
import { BsFillCalendar2WeekFill, BsFillCloudRainHeavyFill, BsFillPersonFill, BsSnow3, BsWordpress, BsFilm as IconoCinema, BsGraphUpArrow as IconoPrice } from 'react-icons/bs';
import { CiPill } from 'react-icons/ci';
import { FaAmazon, FaAws, FaBirthdayCake, FaBook, FaBookReader, FaBookmark, FaCarSide, FaChess, FaCode, FaCross, FaFileInvoiceDollar, FaFutbol, FaGithub, FaGoodreads, FaHeadSideCough, FaHiking, FaInstagram, FaKey, FaLinkedin, FaMapMarkerAlt, FaMoneyBillWave, FaPhone, FaPodcast, FaPrayingHands, FaQuestionCircle, FaQuoteLeft, FaRss, FaSmile, FaStar, FaTelegram, FaTemperatureHigh, FaTired, FaTree, FaVenus, FaVoteYea, FaYoutube, FaBible as IconoBible, FaEuroSign as IconoPayroll } from 'react-icons/fa';
import { FaBasketball, FaPeopleGroup, FaStaffSnake, FaUserDoctor } from 'react-icons/fa6';
import { GiChurch, GiCommercialAirplane, GiHammerSickle, GiItalia, GiKneeling, GiPerspectiveDiceThree, GiPrayerBeads, GiPumpkinMask, GiSandsOfTime, GiSoccerBall, GiSparkSpirit, GiThermometerCold, GiTombstone, GiVillage, GiWheat } from 'react-icons/gi';
import { HiReceiptTax } from 'react-icons/hi';
import { ImSad2, ImWoman } from 'react-icons/im';
import { IoIosPaper, IoMdBasket, IoMdMusicalNotes } from 'react-icons/io';
import { IoHardwareChipOutline } from 'react-icons/io5';
import { MdBuild, MdDirectionsRun, MdFavorite, MdGroup, MdLocalBar, MdOutlineSportsGymnastics, MdPeople, MdPsychology, MdRestaurant, MdSick } from 'react-icons/md';
import { PiFishSimpleBold as IconoPlentyoffish, PiNotePencilBold, PiNumberCircleEightBold, PiNumberCircleNineBold, PiNumberCircleSevenBold, PiNumberCircleSixBold, PiNumberCircleThreeBold, PiNumberCircleZeroBold } from 'react-icons/pi';
import { SiTinder as IconoTinder, SiSpotify, SiTwitter, SiWhatsapp } from 'react-icons/si';
import { TbZzz } from 'react-icons/tb';

export class CalendarIcon {
  static getIcon(note: TFile): React.ReactNode {
    const path = note.path;
    const size = 14;
    const app = useApp();

    const cssClasses = app?.metadataCache.getFileCache(note)?.frontmatter?.cssclasses;

    const iconMap: { [key: string]: (props: { size: number }) => JSX.Element } = {
      agenda2030: ({ size }) => <GiHammerSickle size={size} className="red communism" />,
      agriculture: ({ size }) => <IoMdBasket size={size} className="brown" />, 
      agro: ({ size }) => <GiWheat size={size} className="brown" />, 
      amazon: ({ size }) => <FaAmazon size={size} className="orange amazon" />,
      aws: ({ size }) => <FaAws size={size} className="orange aws" />,
      basketball: ({ size }) => <FaBasketball size={size} className="orange" />,
      beer: ({ size }) => <MdLocalBar size={size} className="yellow" />,
      bible: ({ size }) => <IconoBible size={size} className="violet" />,
      bills: ({ size }) => <FaFileInvoiceDollar size={size} className="red" />, 
      birthday: ({ size }) => <FaBirthdayCake size={size} className="blue ui" />, 
      blogpost: ({ size }) => <BsWordpress size={size} className="blue wordpress" />,
      book: ({ size }) => <FaBook size={size} className="blue" />, 
      bookmark: ({ size }) => <FaBookmark size={size} className="blue" />,
      buy: ({ size }) => <IoMdBasket size={size} className="red" />,
      calendar: ({ size }) => <BsFillCalendar2WeekFill size={size} className="blue ui" />, 
      car: ({ size }) => <FaCarSide size={size} className="red c3" />, 
      catholic: ({ size }) => <FaCross size={size} className="violet" />,
      chess: ({ size }) => <FaChess size={size} className="blue chesscom" />, 
      cinema: ({ size }) => <IconoCinema size={size} className="white" />,
      communism: ({ size }) => <GiHammerSickle size={size} className="red communism" />,
      confession: ({ size }) => <GiKneeling size={size} className="violet" />,
      cough: ({ size }) => <FaHeadSideCough size={size} className="yellow emoji" />, 
      doctor: ({ size }) => <FaUserDoctor size={size} style={{ color: '#008000' }} />,
      dream: ({ size }) => <TbZzz size={size} style={{ color: '#3876f2' }} />,
      elections: ({ size }) => <FaVoteYea size={size} style={{ color: '#FFA500' }} />,
      email: ({ size }) => <BiLogoGmail size={size} style={{ color: '#f74a4a' }} />,
      euro: ({ size }) => <IoIosPaper size={size} style={{ color: '#008000' }} />,
      family: ({ size }) => <MdGroup size={size} className="yellow" />, 
      favorite: ({ size }) => <FaStar size={size} style={{ color: '#FFD700' }} />, 
      fever: ({ size }) => <FaTemperatureHigh size={size} style={{ color: '#FFA500' }} />, 
      finances: ({ size }) => <FaMoneyBillWave size={size} className="red" />,
      friends: ({ size }) => <MdGroup size={size} style={{ color: '#c4be3d' }} />,
      funeral: ({ size }) => <GiTombstone size={size} style={{ color: '#74757a' }} />,
      gastronomy: ({ size }) => <MdRestaurant size={size} style={{ color: '#FFD700' }} />,
      github: ({ size }) => <FaGithub size={size} style={{ color: '#fff' }} />, 
      goodreads: ({ size }) => <FaGoodreads size={size} style={{ color: '#FFD700' }} />,
      gym: ({ size }) => <MdOutlineSportsGymnastics size={size} style={{ color: '#47ff6c' }} />,
      happiness: ({ size }) => <FaSmile size={size} style={{ color: '#FFC83D' }} />,
      hardware: ({ size }) => <IoHardwareChipOutline size={size} style={{ color: '#fc7f03' }} />,
      health: ({ size }) => <FaStaffSnake size={size} style={{ color: '#008000' }} />, 
      hiking: ({ size }) => <FaHiking size={size} style={{ color: '#008000' }} />, 
      inlove: ({ size }) => <MdFavorite size={size} style={{ color: '#f542ef' }} />,
      inspiration: ({ size }) => <GiSparkSpirit size={size} style={{ color: '#f2a83f' }} />,
      instagram: ({ size }) => <FaInstagram size={size} style={{ color: '#E4405F' }} />, 
      italy: ({ size }) => <GiItalia size={size} style={{ color: '#47ff6c' }} />,
      key: ({ size }) => <FaKey size={size} style={{ color: '#fc7f03' }} />, 
      kindle: ({ size }) => <FaBookReader size={size} style={{ color: '#FFA500' }} />, 
      linkedin: ({ size }) => <FaLinkedin size={size} style={{ color: '#0077B5' }} />, 
      marker: ({ size }) => <FaMapMarkerAlt size={size} style={{ color: '#8d4925' }} />,
      mass: ({ size }) => <GiChurch size={size} style={{ color: '#ad6df2' }} />,
      meeting: ({ size }) => <FaPeopleGroup size={size} style={{ color: '#199ef7' }} />,
      music: ({ size }) => <IoMdMusicalNotes size={size} style={{ color: '#798aed' }} />,
      num0: ({ size }) => <PiNumberCircleZeroBold size={size} style={{ color: '#fff' }} />,
      num3: ({ size }) => <PiNumberCircleThreeBold size={size} style={{ color: '#fff' }} />,
      num6: ({ size }) => <PiNumberCircleSixBold size={size} style={{ color: '#fff' }} />,
      num7: ({ size }) => <PiNumberCircleSevenBold size={size} style={{ color: '#fff' }} />,
      num8: ({ size }) => <PiNumberCircleEightBold size={size} style={{ color: '#fff' }} />,
      num9: ({ size }) => <PiNumberCircleNineBold size={size} style={{ color: '#fff' }} />,
      payroll: ({ size }) => <IconoPayroll size={size} style={{ color: '#FFD700' }} />,
      people: ({ size }) => <MdPeople size={size} style={{ color: '#FFD700' }} />,
      perspective: ({ size }) => <GiPerspectiveDiceThree size={size} style={{ color: '#FFA500' }} />,
      person: ({ size }) => <BsFillPersonFill size={size} style={{ color: '#add8e6' }} />,
      phone: ({ size }) => <FaPhone size={size} style={{ color: '#fff' }} />, 
      pill: ({ size }) => <CiPill size={size} style={{ color: '#c2a411' }} />,
      plentyoffish: ({ size }) => <IconoPlentyoffish size={size} style={{ color: '#FF69B4' }} />,
      podcast: ({ size }) => <FaPodcast size={size} style={{ color: '#fc7f03' }} />,
      prayer: ({ size }) => <FaPrayingHands size={size} style={{ color: '#ad6df2' }} />,
      price: ({ size }) => <IconoPrice size={size} className="red" />,
      programming: ({ size }) => <FaCode size={size} style={{ color: '#FFA500' }} />, 
      psychology: ({ size }) => <MdPsychology size={size} style={{ color: '#1ff2c1' }} />,
      pumpkin: ({ size }) => <GiPumpkinMask size={size} style={{ color: '#fc6203' }} />,
      question: ({ size }) => <FaQuestionCircle size={size} style={{ color: '#A9A9A9' }} />,
      quote: ({ size }) => <FaQuoteLeft size={size} style={{ color: '#FFD700' }} />,
      rain: ({ size }) => <BsFillCloudRainHeavyFill size={size} style={{ color: '#6dc8f2' }} />,
      realmadrid: ({ size }) => <FaFutbol size={size} style={{ color: '#FFD700' }} />,
      repairs: ({ size }) => <MdBuild size={size} style={{ color: '#A9A9A9' }} />,
      rosary: ({ size }) => <GiPrayerBeads size={size} style={{ color: '#FFD700' }} />,
      rss: ({ size }) => <FaRss size={size} style={{ color: '#FFA500' }} />, 
      sadness: ({ size }) => <ImSad2 size={size} className="yellow emoji" />,
      sex: ({ size }) => <FaVenus size={size} style={{ color: '#f542ef' }} />,
      sick: ({ size }) => <MdSick size={size} className="yellow emoji" />,
      snow: ({ size }) => <BsSnow3 size={size} style={{ color: '#6dc8f2' }} />,
      soccer: ({ size }) => <GiSoccerBall size={size} style={{ color: '#FFA500' }} />,
      sport: ({ size }) => <MdDirectionsRun size={size} style={{ color: '#008000' }} />, 
      spotify: ({ size }) => <SiSpotify size={size} className="green spotify" />,
      tax: ({ size }) => <HiReceiptTax size={size} style={{ color: '#fc0303' }} />, 
      telegram: ({ size }) => <FaTelegram size={size} style={{ color: '#0088CC' }} />, 
      tinder: ({ size }) => <IconoTinder size={size} style={{ color: '#FE3C72' }} />,
      tired: ({ size }) => <FaTired size={size} style={{ color: '#FFC83D' }} />,
      travel: ({ size }) => <GiCommercialAirplane size={size} style={{ color: '#1199c2' }} />,
      tree: ({ size }) => <FaTree size={size} style={{ color: '#228B22' }} />,
      twitter: ({ size }) => <SiTwitter size={size} className="blue twitter" />,
      village: ({ size }) => <GiVillage size={size} style={{ color: '#47ff6c' }} />,
      watchsand: ({ size }) => <GiSandsOfTime size={size} style={{ color: '#FFFF99' }} />,
      weather: ({ size }) => <GiThermometerCold size={size} style={{ color: '#6dc8f2' }} />,
      whatsapp: ({ size }) => <SiWhatsapp size={size} style={{ color: '#25d366' }} />, 
      woman: ({ size }) => <ImWoman size={size} style={{ color: '#f542ef' }} />, 
      writing: ({ size }) => <PiNotePencilBold size={size} style={{ color: '#fcaa62' }} />,
      youtube: ({ size }) => <FaYoutube size={size} className="red youtube" />
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