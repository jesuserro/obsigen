import { TFile } from 'obsidian';
import React from 'react';
import Flag from 'react-flagkit';
import { BiLogoGmail } from 'react-icons/bi';
import { BsBookmarkStar, BsChatLeftQuoteFill, BsClockFill, BsCloudHaze2, BsFillCloudRainHeavyFill, BsFillHeartbreakFill, BsPersonCircle, BsSnow3, BsWordpress, BsFilm as IconoCinema, BsGraphUpArrow as IconoPrice } from 'react-icons/bs';
import { CiPill } from 'react-icons/ci';
import { FaAmazon, FaAngry, FaAws, FaBaby, FaBirthdayCake, FaBookReader, FaBuilding, FaBus, FaCarSide, FaChalkboardTeacher, FaChess, FaCode, FaCross, FaDog, FaEuroSign, FaFileInvoiceDollar, FaGitSquare, FaGithub, FaGoodreads, FaGrinTongueWink, FaHeadSideCough, FaHiking, FaHome, FaInstagram, FaKey, FaLaptop, FaLinkedin, FaPhone, FaPiggyBank, FaPodcast, FaPrayingHands, FaQuestionCircle, FaQuoteLeft, FaRss, FaScroll, FaSkype, FaSmile, FaSwimmingPool, FaTelegram, FaTired, FaTrain, FaTree, FaVenus, FaVoteYea, FaWpforms, FaYoutube, FaBible as IconoBible, FaEuroSign as IconoPayroll } from 'react-icons/fa';
import { FaBasketball, FaCamera, FaGift, FaPeopleGroup, FaUserDoctor, FaVirusCovid } from 'react-icons/fa6';
import { FcAndroidOs, FcCalendar, FcDataBackup, FcGoogle } from 'react-icons/fc';
import { GiAncientRuins, GiBank, GiCakeSlice, GiChampions, GiChurch, GiCommercialAirplane, GiCook, GiCrownCoin, GiDeathSkull, GiDevilMask, GiEclipse, GiFarmer, GiFemaleLegs, GiFriedEggs, GiGluttony, GiHammerSickle, GiHealthDecrease, GiHealthIncrease, GiHealthNormal, GiKneeling, GiMiracleMedecine, GiMoneyStack, GiPalmTree, GiPeaceDove, GiPerspectiveDiceThree, GiPrayerBeads, GiPumpkinMask, GiSoccerBall, GiSparkSpirit, GiSpikyExplosion, GiStrong, GiTheaterCurtains, GiThermometerCold, GiThreeFriends, GiVillage, GiWheat } from 'react-icons/gi';
import { HiReceiptTax } from 'react-icons/hi';
import { ImSad2, ImWoman } from 'react-icons/im';
import { IoIosBeer, IoMdBasket, IoMdBatteryCharging, IoMdCafe, IoMdMusicalNotes, IoMdSunny } from 'react-icons/io';
import { IoFootsteps, IoThunderstorm } from 'react-icons/io5';
import { LuPartyPopper } from 'react-icons/lu';
import { MdBackup, MdBuild, MdCancel, MdCardTravel, MdDirectionsRun, MdFavorite, MdGroup, MdOutlineAddCircle, MdOutlineSportsGymnastics, MdPeople, MdPsychology, MdRestaurant, MdSick } from 'react-icons/md';
import { PiFishSimpleBold as IconoPlentyoffish, PiNotePencilBold, PiNumberCircleEightBold, PiNumberCircleNineBold, PiNumberCircleSevenBold, PiNumberCircleSixBold, PiNumberCircleThreeBold, PiNumberCircleZeroBold, PiPackageBold, PiThermometerCold, PiThermometerHot } from 'react-icons/pi';
import { RiEarthquakeFill, RiMentalHealthFill } from "react-icons/ri";
import { SiTinder as IconoTinder, SiDell, SiGimp, SiGooglemeet, SiInsomnia, SiLenovo, SiObsidian, SiOpenai, SiSamsung, SiSpotify, SiTwitter, SiWhatsapp } from 'react-icons/si';
import { SlPicture } from "react-icons/sl";
import { TbAppsFilled, TbBulbFilled, TbFishChristianity, TbPillOff, TbPills, TbZoomMoney, TbZzz } from 'react-icons/tb';
import CustomIcon from '../../../ui/CustomIcon';

interface IconProps {
  size: number;
}

interface IconGroup {
  [key: string]: (props: IconProps) => JSX.Element;
}

interface IconData {
  [key: string]: IconGroup;
}

export const iconData: IconData = {
    Emojis: {
      angry: ({ size }: IconProps) => <FaAngry size={size} className="red" />,
      anxiety: ({ size }: IconProps) => <RiMentalHealthFill size={size} className="yellow emoji" />,
      baby: ({ size }: IconProps) => <FaBaby size={size} className="blue ui" />,
      birthday: ({ size }: IconProps) => <FaBirthdayCake size={size} className="blue ui" />,
      cough: ({ size }: IconProps) => <FaHeadSideCough size={size} className="yellow emoji" />,
      dance: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Dance" />,
      family: ({ size }: IconProps) => <MdGroup size={size} className="yellow" />,
      fatigue: ({ size }: IconProps) => <FaGrinTongueWink size={size} className="yellow emoji" />,
      fever: ({ size }: IconProps) => <MdSick size={size} className="yellow emoji" />,
      friends: ({ size }: IconProps) => <GiThreeFriends size={size} className="orange" />,
      gluttony: ({ size }: IconProps) => <GiGluttony size={size} className="yellow emoji" />,
      happiness: ({ size }: IconProps) => <FaSmile size={size} className="yellow" />,
      inlove: ({ size }: IconProps) => <MdFavorite size={size} className="pink" />,
      learning: ({ size }: IconProps) => <FaChalkboardTeacher size={size} className="yellow" />,
      party: ({ size }: IconProps) => <LuPartyPopper size={size} className="violet" />,
      people: ({ size }: IconProps) => <MdPeople size={size} className="grey" />,
      person: ({ size }: IconProps) => <BsPersonCircle size={size} className="grey" />,
      psychology: ({ size }: IconProps) => <MdPsychology size={size} className="green" />,
      pumpkin: ({ size }: IconProps) => <GiPumpkinMask size={size} className="orange" />,
      sadness: ({ size }: IconProps) => <ImSad2 size={size} className="yellow emoji" />,
      sex: ({ size }: IconProps) => <FaVenus size={size} className="pink" />,
      sick: ({ size }: IconProps) => <MdSick size={size} className="yellow emoji" />,
      tired: ({ size }: IconProps) => <FaTired size={size} style={{ color: '#FFC83D' }} />,
      woman: ({ size }: IconProps) => <ImWoman size={size} className="pink" />
    },
    Gente: {
      achelm: ({ size }: IconProps) => <CustomIcon size={size} className="pink" iconName="Achelm" />,
      annas: ({ size }: IconProps) => <CustomIcon size={size} className="pink" iconName="AnnaS" />,
      charo: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Charo" />,
      dad: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Dad" />,
      gonzalo: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Gonzalo" />,
      irene: ({ size }: IconProps) => <CustomIcon size={size} className="pink" iconName="Irene" />,
      josefita: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Josefita" />,
      josemi: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Josemi" />,
      kote: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Kote" />,
      luis: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Luis" />,
      mom: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Mom" />,
      natalia: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Natalia" />,
      nieves: ({ size }: IconProps) => <CustomIcon size={size} className="pink" iconName="Nieves" />,
      pilar: ({ size }: IconProps) => <CustomIcon size={size} className="pink" iconName="Pilar" />,
      ramon: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Ramon" />,
      sophie: ({ size }: IconProps) => <CustomIcon size={size} className="pink" iconName="Sophie" />,
      timothy: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Timothy" />,
      victor: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Victor" />
    },
    Tiempo: {
      cold: ({ size }: IconProps) => <PiThermometerCold size={size} className="blue aws" />,
      earthquake: ({ size }: IconProps) => <RiEarthquakeFill size={size} className="red" />,
      eclipse: ({ size }: IconProps) => <GiEclipse size={size} className="yellow" />,
      haze: ({ size }: IconProps) => <BsCloudHaze2 size={size} className="grey" />,
      hot: ({ size }: IconProps) => <PiThermometerHot size={size} className="red" />,
      rain: ({ size }: IconProps) => <BsFillCloudRainHeavyFill size={size} className="blue sky" />,
      snow: ({ size }: IconProps) => <BsSnow3 size={size} className="white" />,
      storm: ({ size }: IconProps) => <IoThunderstorm size={size} className="blue aws" />,
      sunny: ({ size }: IconProps) => <IoMdSunny size={size} className="yellow" />,
      weather: ({ size }: IconProps) => <GiThermometerCold size={size} style={{ color: '#6dc8f2' }} />
    },
    Economía: {
      bank: ({ size }: IconProps) => <GiBank size={size} className="red" />,
      barber: ({ size }: IconProps) => <CustomIcon size={size} className="blue" iconName="Barber" />,
      bbva: ({ size }: IconProps) => <CustomIcon size={size} className="blue cobalt" iconName="Bbva" />,
      bills: ({ size }: IconProps) => <FaFileInvoiceDollar size={size} className="red" />,
      buy: ({ size }: IconProps) => <IoMdBasket size={size} className="red" />,
      coin: ({ size }: IconProps) => <GiCrownCoin size={size} className="grey" />,
      euro: ({ size }: IconProps) => <FaEuroSign size={size} className="yellow" />,
      finances: ({ size }: IconProps) => <TbZoomMoney size={size} className="orange" />,
      gift: ({ size }: IconProps) => <FaGift size={size} className='yellow' />,
      hacienda: ({ size }: IconProps) => <CustomIcon size={size} className="red" iconName="Hacienda" />,
      itv: ({ size }: IconProps) => <CustomIcon size={size} className="orange" iconName="Itv" />,
      lottery: ({ size }: IconProps) => <CustomIcon size={size} className="red" iconName="Lottery" />,
      money: ({ size }: IconProps) => <GiMoneyStack size={size} style={{ color: '#228B22' }} />,
      payroll: ({ size }: IconProps) => <IconoPayroll size={size} className="yellow" />,
      price: ({ size }: IconProps) => <IconoPrice size={size} className="red" />,
      repairs: ({ size }: IconProps) => <MdBuild size={size} className="orange" />,
      saving: ({ size }: IconProps) => <FaPiggyBank size={size} className="green" />,
      tax: ({ size }: IconProps) => <HiReceiptTax size={size} style={{ color: '#fc0303' }} />,
      visa: ({ size }: IconProps) => <CustomIcon size={size} className="red" iconName="Visa" />
    },
    IT: {
      amazon: ({ size }: IconProps) => <FaAmazon size={size} className="orange amazon" />,
      android: ({ size }: IconProps) => <FcAndroidOs size={size} className="" />,
      aws: ({ size }: IconProps) => <FaAws size={size} className="orange aws" />,
      blogpost: ({ size }: IconProps) => <BsWordpress size={size} className="blue wordpress" />,
      dell: ({ size }: IconProps) => <SiDell size={size} className="blue linkedin" />,
      email: ({ size }: IconProps) => <BiLogoGmail size={size} className="red" />,
      gimp: ({ size }: IconProps) => <SiGimp size={size} className='orange' />,
      git: ({ size }: IconProps) => <FaGitSquare size={size} className='orange' />,
      github: ({ size }: IconProps) => <FaGithub size={size} style={{ color: '#fff' }} />,
      google: ({ size }: IconProps) => <FcGoogle size={size} className="yellow intense" />,
      googlemeet: ({ size }: IconProps) => <SiGooglemeet size={size} className="yellow intense" />,
      goodreads: ({ size }: IconProps) => <FaGoodreads size={size} className="brown goodreads" />,
      gpt: ({ size }: IconProps) => <TbAppsFilled size={size} className="green" />,
      instagram: ({ size }: IconProps) => <FaInstagram size={size} className="pink instagram" />,
      kindle: ({ size }: IconProps) => <FaBookReader size={size} className="white" />,
      lenovo: ({ size }: IconProps) => <SiLenovo size={size} className="red youtube" />,
      linkedin: ({ size }: IconProps) => <FaLinkedin size={size} className="blue linkedin" />,
      meeting: ({ size }: IconProps) => <FaPeopleGroup size={size} className="orange" />,
      obsidian: ({ size }: IconProps) => <SiObsidian size={size} className="violet" />,
      openai: ({ size }: IconProps) => <SiOpenai size={size} className="green openai" />,
      phone: ({ size }: IconProps) => <FaPhone size={size} className="white" />,
      plentyoffish: ({ size }: IconProps) => <IconoPlentyoffish size={size} className="pink" />,
      podcast: ({ size }: IconProps) => <FaPodcast size={size} className="orange" />,
      readwise: ({ size }: IconProps) => <CustomIcon size={size} className="white" iconName="Readwise" />,
      rss: ({ size }: IconProps) => <FaRss size={size} className="orange" />,
      samsung: ({ size }: IconProps) => <SiSamsung size={size} className="blue cobalt" />,
      skype: ({ size }: IconProps) => <FaSkype size={size} style={{ color: '#00AFF0' }} />,
      spotify: ({ size }: IconProps) => <SiSpotify size={size} className="green spotify" />,
      telegram: ({ size }: IconProps) => <FaTelegram size={size} className="blue telegram" />,
      tinder: ({ size }: IconProps) => <IconoTinder size={size} style={{ color: '#FE3C72' }} />,
      twitter: ({ size }: IconProps) => <SiTwitter size={size} className="blue twitter" />,
      whatsapp: ({ size }: IconProps) => <SiWhatsapp size={size} className="green whatsapp" />,
      writing: ({ size }: IconProps) => <PiNotePencilBold size={size} style={{ color: '#fcaa62' }} />,
      youtube: ({ size }: IconProps) => <FaYoutube size={size} className="red youtube" />
    },
    Agro: {
      agriculture: ({ size }: IconProps) => <IoMdBasket size={size} className="brown" />,
      agro: ({ size }: IconProps) => <GiWheat size={size} className="brown" />,
      dog: ({ size }: IconProps) => <FaDog size={size} className="brown" />,
      farmer: ({ size }: IconProps) => <GiFarmer size={size} className="brown" />,
      tree: ({ size }: IconProps) => <FaTree size={size} style={{ color: '#228B22' }} />,
      village: ({ size }: IconProps) => <GiVillage size={size} style={{ color: '#47ff6c' }} />
    },
    Deportes: {
      basketball: ({ size }: IconProps) => <FaBasketball size={size} className="orange" />,
      champions: ({ size }: IconProps) => <GiChampions size={size} className="yellow" />,
      chess: ({ size }: IconProps) => <FaChess size={size} className="white" />,
      gym: ({ size }: IconProps) => <MdOutlineSportsGymnastics size={size} className="green" />,
      hiking: ({ size }: IconProps) => <FaHiking size={size} className="green" />,
      olympics: ({ size }: IconProps) => <CustomIcon size={size} className="green" iconName="Olympics" />,
      orejona: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Orejona" />,
      pool: ({ size }: IconProps) => <FaSwimmingPool size={size} className="blue sapphire" />,
      realmadrid: ({ size }: IconProps) => <CustomIcon size={size} className="green" iconName="RealMadrid" />,
      soccer: ({ size }: IconProps) => <GiSoccerBall size={size} className="white" />,
      sport: ({ size }: IconProps) => <MdDirectionsRun size={size} className="green" />
    },
    Banderas: {
      argentina: ({ size }: IconProps) => <Flag country='AR' size={size} className="" />,
      france: ({ size }: IconProps) => <Flag country='FR' size={size} className="" />,
      israel: ({ size }: IconProps) => <Flag country='IL' size={size} className="" />,
      italy: ({ size }: IconProps) => <Flag country='IT' size={size} className="" />,
      poland: ({ size }: IconProps) => <Flag country='PL' size={size} className="" />,
      romania: ({ size }: IconProps) => <Flag country='RO' size={size} className="" />,
      russia: ({ size }: IconProps) => <Flag country='RU' size={size} className="" />,
      spain: ({ size }: IconProps) => <Flag country='ES' size={size} className="" />,
      usa: ({ size }: IconProps) => <Flag country='US' size={size} className="" />,
      vatican: ({ size }: IconProps) => <Flag country='VA' size={size} className="" />,
      venezuela: ({ size }: IconProps) => <Flag country='VE' size={size} className="" />
    },
    Religión: {
      adoration: ({ size }: IconProps) => <CustomIcon size={size} className="blue sky" iconName="Adoration" />,
      advent: ({ size }: IconProps) => <CustomIcon size={size} className="blue sky" iconName="Advent" />,
      agenda2030: ({ size }: IconProps) => <CustomIcon size={size} className="red" iconName="Agenda2030" />,
      arburua: ({ size }: IconProps) => <CustomIcon size={size} className="blue sky" iconName="Arburua" />,
      bible: ({ size }: IconProps) => <IconoBible size={size} className="pink purple" />,
      catholic: ({ size }: IconProps) => <FaCross size={size} className="pink purple" />,
      cemetery: ({ size }: IconProps) => <CustomIcon size={size} className="grey" iconName="Cemetery" />,
      christ: ({ size }: IconProps) => <CustomIcon size={size} className="blue sky" iconName="Christ" />,
      communism: ({ size }: IconProps) => <GiHammerSickle size={size} className="red communism" />,
      confession: ({ size }: IconProps) => <GiKneeling size={size} className="pink purple" />,
      death: ({ size }: IconProps) => <GiDeathSkull size={size} className="grey" />,
      diosidencia: ({ size }: IconProps) => <TbFishChristianity size={size} className="violet" />,
      emaus: ({ size }: IconProps) => <CustomIcon size={size} className="blue sky" iconName="Emaus" />,
      evil: ({ size }: IconProps) => <GiDevilMask size={size} className="red" />,
      fatima: ({ size }: IconProps) => <CustomIcon size={size} className="blue sky" iconName="Fatima" />,
      funeral: ({ size }: IconProps) => <GiChurch size={size} className="grey" />,
      funeralhome: ({ size }: IconProps) => <CustomIcon size={size} className="grey" iconName="FuneralHome" />,
      garabandal: ({ size }: IconProps) => <CustomIcon size={size} className="blue sky" iconName="Garabandal" />,
      gospa: ({ size }: IconProps) => <CustomIcon size={size} className="blue sky" iconName="Gospa" />,
      holyspirit: ({ size }: IconProps) => <CustomIcon size={size} className="blue sky" iconName="HolySpirit" />,
      inspiration: ({ size }: IconProps) => <GiSparkSpirit size={size} style={{ color: '#f2a83f' }} />,
      islam: ({ size }: IconProps) => <CustomIcon size={size} className="green openai" iconName="Islam" />,
      mass: ({ size }: IconProps) => <GiChurch size={size} className="pink purple" />,
      miracle: ({ size }: IconProps) => <GiMiracleMedecine size={size} className="yellow" />,
      nun: ({ size }: IconProps) => <CustomIcon size={size} className="pink purple" iconName="Nun" />,
      orthodox: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Orthodox" />,
      peace: ({ size }: IconProps) => <GiPeaceDove size={size} className="white" />,
      pope: ({ size }: IconProps) => <CustomIcon size={size} className="pink purple" iconName="Pope" />,
      prayer: ({ size }: IconProps) => <FaPrayingHands size={size} className="pink purple" />,
      priest: ({ size }: IconProps) => <CustomIcon size={size} className="pink purple" iconName="Priest" />,
      prophecy: ({ size }: IconProps) => <FaScroll size={size} className="brown" />,
      rosary: ({ size }: IconProps) => <GiPrayerBeads size={size} className="pink purple" />,
      saint: ({ size }: IconProps) => <CustomIcon size={size} className="blue sky" iconName="Saint" />,
      saintwoman: ({ size }: IconProps) => <CustomIcon size={size} className="blue sky" iconName="SaintWoman" />,
      wedding: ({ size }: IconProps) => <CustomIcon size={size} className="pink" iconName="Wedding" />
    },
    Gastronomía: {
      beer: ({ size }: IconProps) => <IoIosBeer size={size} className="yellow" />,
      cafe: ({ size }: IconProps) => <IoMdCafe size={size} className="yellow" />,
      cake: ({ size }: IconProps) => <GiCakeSlice size={size} className="yellow" />,
      cook: ({ size }: IconProps) => <GiCook size={size} className="white" />,
      friedeggs: ({ size }: IconProps) => <GiFriedEggs size={size} className="white" />,
      gastronomy: ({ size }: IconProps) => <MdRestaurant size={size} style={{ color: '#FFD700' }} />,
      pancake: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Pancake" />
    },
    Transporte: {
      bus: ({ size }: IconProps) => <FaBus size={size} className="brown" />,
      car: ({ size }: IconProps) => <FaCarSide size={size} className="red c3" />,
      plane: ({ size }: IconProps) => <GiCommercialAirplane size={size} style={{ color: '#1199c2' }} />,
      train: ({ size }: IconProps) => <FaTrain size={size} className="brown" />,
      travel: ({ size }: IconProps) => <MdCardTravel size={size} className="brown" />
    },
    Salud: {
      doctor: ({ size }: IconProps) => <FaUserDoctor size={size} className="green" />,
      dream: ({ size }: IconProps) => <TbZzz size={size} className="blue cobalt" />,
      foot: ({ size }: IconProps) => <IoFootsteps size={size} className="blue aws" />,
      health: ({ size }: IconProps) => <GiHealthNormal size={size} className="yellow emoji" />,
      healthko: ({ size }: IconProps) => <GiHealthDecrease size={size} className="red" />,
      healthok: ({ size }: IconProps) => <GiHealthIncrease size={size} className="green" />,
      heartbreak: ({ size }: IconProps) => <BsFillHeartbreakFill size={size} className="red" />,
      insomnia: ({ size }: IconProps) => <SiInsomnia size={size} className="grey" />,
      legs: ({ size }: IconProps) => <GiFemaleLegs size={size} className="yellow emoji" />,
      pill: ({ size }: IconProps) => <CiPill size={size} className="yellow" />,
      pilloff: ({ size }: IconProps) => <TbPillOff size={size} className="grey" />,
      strong: ({ size }: IconProps) => <GiStrong size={size} className="green" />,
      supplement: ({ size }: IconProps) => <TbPills size={size} className="yellow" />,
      virus: ({ size }: IconProps) => <FaVirusCovid size={size} className="red" />
    },
    Otros: {
      add: ({ size }: IconProps) => <MdOutlineAddCircle size={size} className="green" />,
      archeology: ({ size }: IconProps) => <GiAncientRuins size={size} className="grey" />,
      backup: ({ size }: IconProps) => <FcDataBackup size={size} className="green spotify" />,
      backup_cloud: ({ size }: IconProps) => <MdBackup size={size} className="green spotify" />,
      battery: ({ size }: IconProps) => <IoMdBatteryCharging size={size} className="red" />,
      building: ({ size }: IconProps) => <FaBuilding size={size} className="brown" />,
      camera: ({ size }: IconProps) => <FaCamera size={size} className="blue sky" />,
      cancel: ({ size }: IconProps) => <MdCancel size={size} className="red" />,
      cdr: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Cdr" />,
      cinema: ({ size }: IconProps) => <IconoCinema size={size} className="white" />,
      clock: ({ size }: IconProps) => <BsClockFill size={size} className="orange" />,
      elections: ({ size }: IconProps) => <FaVoteYea size={size} className="orange" />,
      fireworks: ({ size }: IconProps) => <GiSpikyExplosion size={size} className="yellow" />,
      form: ({ size }: IconProps) => <FaWpforms size={size} className="orange" />,
      holiday: ({ size }: IconProps) => <GiPalmTree size={size} className="green" />,
      home: ({ size }: IconProps) => <FaHome size={size} className="brown" />,
      idea: ({ size }: IconProps) => <TbBulbFilled size={size} className="yellow" />,
      key: ({ size }: IconProps) => <FaKey size={size} className="yellow" />,
      laptop: ({ size }: IconProps) => <FaLaptop size={size} className="orange" />,
      meme: ({ size }: IconProps) => <BsChatLeftQuoteFill size={size} className="blue facebook" />,
      music: ({ size }: IconProps) => <IoMdMusicalNotes size={size} className="indigo" />,
      num0: ({ size }: IconProps) => <PiNumberCircleZeroBold size={size} style={{ color: '#fff' }} />,
      num3: ({ size }: IconProps) => <PiNumberCircleThreeBold size={size} style={{ color: '#fff' }} />,
      num6: ({ size }: IconProps) => <PiNumberCircleSixBold size={size} style={{ color: '#fff' }} />,
      num7: ({ size }: IconProps) => <PiNumberCircleSevenBold size={size} style={{ color: '#fff' }} />,
      num8: ({ size }: IconProps) => <PiNumberCircleEightBold size={size} style={{ color: '#fff' }} />,
      num9: ({ size }: IconProps) => <PiNumberCircleNineBold size={size} style={{ color: '#fff' }} />,
      package: ({ size }: IconProps) => <PiPackageBold size={size} className="brown" />,
      picture: ({ size }: IconProps) => <SlPicture size={size} className="yellow" />,
      perspective: ({ size }: IconProps) => <GiPerspectiveDiceThree size={size} className="yellow" />,
      programming: ({ size }: IconProps) => <FaCode size={size} className="orange" />,
      question: ({ size }: IconProps) => <FaQuestionCircle size={size} className="orange" />,
      quote: ({ size }: IconProps) => <FaQuoteLeft size={size} className="yellow" />,
      review: ({ size }: IconProps) => <BsBookmarkStar size={size} className="yellow" />,
      theater: ({ size }: IconProps) => <GiTheaterCurtains size={size} className="violet" />,
      year: ({ size }: IconProps) => <FcCalendar size={size} className="red youtube" />
    }
  };

export class CalendarIcon {
  static getIcon(key: string, size: number): React.ReactNode | null {
    for (const group in iconData) {
      if (iconData[group].hasOwnProperty(key)) {
        return iconData[group][key]({ size });
      }
    }
    return null;
  }

  static getIconByCssClass(cssClass: string, size: number): React.ReactNode | null {
    return this.getIcon(cssClass, size);
  }

  static getIconByNote(cssClasses: string[], note: TFile, size: number): React.ReactNode {
    const path = note.path;
    if (cssClasses) {
      const cssClassesArray = Array.isArray(cssClasses) ? cssClasses : [cssClasses];
      const cssClassIcons = cssClassesArray
        .map((cssclass: string) => this.getIcon(cssclass, size))
        .filter((icon) => icon !== null);
      if (cssClassIcons.length > 0) {
        return cssClassIcons[0];
      }
    }
    if (path.includes('/Misas/')) {
      return this.getIcon('mass', size);
    } else if (path.includes('/Biblia/')) {
      return this.getIcon('bible', size);
    } else if (path.includes('005 Synch/Readwise/Books/')) {
      return this.getIcon('book', size);
    } else if (path.includes('005 Synch/Readwise/Tweets/')) {
      return this.getIcon('twitter', size);
    } else if (path.includes('005 Synch/Readwise/Podcasts/')) {
      return this.getIcon('podcast', size);
    } else if (path.includes('005 Synch/Readwise/Articles/')) {
      return this.getIcon('readwise', size);
    } else if (path.includes('005 Synch/goodsidian/autores')) {
      return this.getIcon('person', size);
    } else if (path.includes('005 Synch/goodsidian/')) {
      return this.getIcon('goodreads', size);
    } else if (path.includes('005 Synch/Kindtocs/')) {
      return this.getIcon('kindle', size);
    } else if (path.includes('500 Gente/Chicas/')) {
      return this.getIcon('woman', size);
    } else if (path.includes('500 Gente/')) {
      return this.getIcon('person', size);
    } else if (path.includes('300 Geo/')) {
      return this.getIcon('marker', size);
    } else if (path.includes('200 Content Maps/')) {
      return this.getIcon('key', size);
    } else if (path.includes('/Aniversaries/')) {
      return this.getIcon('birthday', size);
    } else if (path.includes('/Captures/')) {
      return this.getIcon('blogpost', size);
    } else {
      return this.getIcon('question', size);
    }
  }
}
