import { TFile } from 'obsidian';
import React from 'react';
import Flag from 'react-flagkit';
import { BiLogoGmail } from 'react-icons/bi';
import { BsBookmarkStar, BsChatLeftQuoteFill, BsClockFill, BsCloudHaze2, BsFillCloudRainHeavyFill, BsFillHeartbreakFill, BsPersonCircle, BsSnow3, BsWordpress, BsFilm as IconoCinema, BsGraphUpArrow as IconoPrice } from 'react-icons/bs';
import { CiBookmark, CiCalendar, CiHeadphones, CiPill } from 'react-icons/ci';
import { FaAmazon, FaAngry, FaAws, FaBaby, FaBirthdayCake, FaBook, FaBookReader, FaBuilding, FaBus, FaCarSide, FaChalkboardTeacher, FaCheck, FaChess, FaCode, FaCross, FaDatabase, FaDog, FaEnvelope, FaEuroSign, FaFileInvoiceDollar, FaGitSquare, FaGithub, FaGoodreads, FaGrinTongueWink, FaHandshake, FaHeadSideCough, FaHiking, FaHome, FaHotel, FaInstagram, FaKey, FaLaptop, FaLinkedin, FaMapMarkerAlt, FaPhone, FaPiggyBank, FaPizzaSlice, FaPodcast, FaPrayingHands, FaQuestionCircle, FaQuoteLeft, FaRss, FaRunning, FaScroll, FaShip, FaSkype, FaSmile, FaSms, FaStar, FaSwimmingPool, FaTabletAlt, FaTaxi, FaTelegram, FaTired, FaTractor, FaTrain, FaTree, FaVenus, FaVoteYea, FaWpforms, FaYoutube, FaBible as IconoBible, FaEuroSign as IconoPayroll } from 'react-icons/fa';
import { FaBasketball, FaCamera, FaGift, FaHillRockslide, FaPeopleGroup, FaScissors, FaUserDoctor, FaVirusCovid } from 'react-icons/fa6';
import { FcAndroidOs, FcCalendar, FcDataBackup, FcGoogle, FcPodiumWithSpeaker, FcSportsMode } from 'react-icons/fc';
import { FiSmartphone } from 'react-icons/fi';
import { GiAncientRuins, GiAngelWings, GiBank, GiCakeSlice, GiChampions, GiChurch, GiCommercialAirplane, GiCook, GiCrownCoin, GiDeathSkull, GiDevilMask, GiEclipse, GiFarmer, GiFemaleLegs, GiFriedEggs, GiGardeningShears, GiGluttony, GiHammerSickle, GiHealthDecrease, GiHealthIncrease, GiHealthNormal, GiKneeling, GiMiracleMedecine, GiMoneyStack, GiPalmTree, GiPeaceDove, GiPerspectiveDiceThree, GiPrayerBeads, GiPumpkinMask, GiSandsOfTime, GiSoccerBall, GiSparkSpirit, GiSpikyExplosion, GiStrong, GiTheaterCurtains, GiThermometerCold, GiThreeFriends, GiTomato, GiVillage, GiWheat } from 'react-icons/gi';
import { HiReceiptTax } from 'react-icons/hi';
import { ImSad2, ImWoman } from 'react-icons/im';
import { IoIosBeer, IoIosRose, IoMdBasket, IoMdBatteryCharging, IoMdCafe, IoMdFlower, IoMdMusicalNotes, IoMdSunny } from 'react-icons/io';
import { IoFootsteps, IoHardwareChip, IoRestaurant, IoThunderstorm } from 'react-icons/io5';
import { LuPartyPopper } from 'react-icons/lu';
import { MdBackup, MdBuild, MdCancel, MdCardTravel, MdCastle, MdFavorite, MdGroup, MdOutlineAddCircle, MdOutlineSportsGymnastics, MdOutlineSportsTennis, MdPeople, MdPiano, MdPsychology, MdRestaurant, MdSick } from 'react-icons/md';
import { PiFishSimpleBold as IconoPlentyoffish, PiButterflyFill, PiNotePencilBold, PiNumberCircleEightBold, PiNumberCircleNineBold, PiNumberCircleSevenBold, PiNumberCircleSixBold, PiNumberCircleThreeBold, PiNumberCircleZeroBold, PiPackageBold, PiThermometerCold, PiThermometerHot } from 'react-icons/pi';
import { RiEarthquakeFill, RiFridgeFill, RiMentalHealthFill } from "react-icons/ri";
import { SiTinder as IconoTinder, SiDell, SiGimp, SiGooglemeet, SiInsomnia, SiLenovo, SiObsidian, SiOpenai, SiPlex, SiSamsung, SiSpotify, SiSynology, SiTwitter, SiWhatsapp } from 'react-icons/si';
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
        baby: ({ size }: IconProps) => <FaBaby size={size} className="blue ui" />,
        birthday: ({ size }: IconProps) => <FaBirthdayCake size={size} className="blue ui" />,
        dance: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Dance" />,
        family: ({ size }: IconProps) => <MdGroup size={size} className="yellow" />,
        friends: ({ size }: IconProps) => <GiThreeFriends size={size} className="orange" />,
        handshake: ({ size }: IconProps) => <FaHandshake size={size} className="yellow emoji" />,
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
        woman: ({ size }: IconProps) => <ImWoman size={size} className="pink" />
    },
    Health: {
        anxiety: ({ size }: IconProps) => <RiMentalHealthFill size={size} className="yellow emoji" />,
        cough: ({ size }: IconProps) => <FaHeadSideCough size={size} className="yellow emoji" />,
        doctor: ({ size }: IconProps) => <FaUserDoctor size={size} className="green" />,
        dream: ({ size }: IconProps) => <TbZzz size={size} className="blue cobalt" />,
        fatigue: ({ size }: IconProps) => <FaGrinTongueWink size={size} className="yellow emoji" />,
        fever: ({ size }: IconProps) => <MdSick size={size} className="yellow emoji" />,
        foot: ({ size }: IconProps) => <IoFootsteps size={size} className="blue aws" />,
        health: ({ size }: IconProps) => <GiHealthNormal size={size} className="yellow emoji" />,
        healthko: ({ size }: IconProps) => <GiHealthDecrease size={size} className="red" />,
        healthok: ({ size }: IconProps) => <GiHealthIncrease size={size} className="green" />,
        heartbreak: ({ size }: IconProps) => <BsFillHeartbreakFill size={size} className="red" />,
        insomnia: ({ size }: IconProps) => <SiInsomnia size={size} className="grey" />,
        legs: ({ size }: IconProps) => <GiFemaleLegs size={size} className="yellow emoji" />,
        nightmare: ({ size }: IconProps) => <CustomIcon size={size} className="grey" iconName="Nightmare" />,
        pill: ({ size }: IconProps) => <CiPill size={size} className="yellow" />,
        pilloff: ({ size }: IconProps) => <TbPillOff size={size} className="grey" />,
        sick: ({ size }: IconProps) => <MdSick size={size} className="yellow emoji" />,
        strong: ({ size }: IconProps) => <GiStrong size={size} className="green" />,
        supplement: ({ size }: IconProps) => <TbPills size={size} className="yellow" />,
        tired: ({ size }: IconProps) => <FaTired size={size} style={{ color: '#FFC83D' }} />,
        virus: ({ size }: IconProps) => <FaVirusCovid size={size} className="red" />
    },
    People: {
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
        margarita: ({ size }: IconProps) => <CustomIcon size={size} className="pink" iconName="Margarita" />,
        mom: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Mom" />,
        natalia: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Natalia" />,
        nieves: ({ size }: IconProps) => <CustomIcon size={size} className="pink" iconName="Nieves" />,
        pilar: ({ size }: IconProps) => <CustomIcon size={size} className="pink" iconName="Pilar" />,
        ramon: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Ramon" />,
        sophie: ({ size }: IconProps) => <CustomIcon size={size} className="pink" iconName="Sophie" />,
        timothy: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Timothy" />,
        victor: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Victor" />
    },
    Weather: {
        cold: ({ size }: IconProps) => <PiThermometerCold size={size} className="blue aws" />,
        earthquake: ({ size }: IconProps) => <RiEarthquakeFill size={size} className="red" />,
        eclipse: ({ size }: IconProps) => <GiEclipse size={size} className="yellow" />,
        haze: ({ size }: IconProps) => <BsCloudHaze2 size={size} className="grey" />,
        hot: ({ size }: IconProps) => <PiThermometerHot size={size} className="red" />,
        rain: ({ size }: IconProps) => <BsFillCloudRainHeavyFill size={size} className="blue sky" />,
        snow: ({ size }: IconProps) => <BsSnow3 size={size} className="white" />,
        storm: ({ size }: IconProps) => <IoThunderstorm size={size} className="blue sky" />,
        sunny: ({ size }: IconProps) => <IoMdSunny size={size} className="yellow" />,
        weather: ({ size }: IconProps) => <GiThermometerCold size={size} style={{ color: '#6dc8f2' }} />
    },
    Economy: {
        amazon: ({ size }: IconProps) => <FaAmazon size={size} className="orange amazon" />,
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
    SocialMediaAndComunications: {
        blogpost: ({ size }: IconProps) => <BsWordpress size={size} className="blue wordpress" />,
        email: ({ size }: IconProps) => <BiLogoGmail size={size} className="red" />,
        envelope: ({ size }: IconProps) => <FaEnvelope size={size} className="white" />,
        github: ({ size }: IconProps) => <FaGithub size={size} style={{ color: '#fff' }} />,
        googlemeet: ({ size }: IconProps) => <SiGooglemeet size={size} className="yellow intense" />,
        goodreads: ({ size }: IconProps) => <FaGoodreads size={size} className="brown goodreads" />,
        instagram: ({ size }: IconProps) => <FaInstagram size={size} className="pink instagram" />,
        linkedin: ({ size }: IconProps) => <FaLinkedin size={size} className="blue linkedin" />,
        meeting: ({ size }: IconProps) => <FaPeopleGroup size={size} className="orange" />,
        phone: ({ size }: IconProps) => <FaPhone size={size} className="white" />,
        plentyoffish: ({ size }: IconProps) => <IconoPlentyoffish size={size} className="pink" />,
        podcast: ({ size }: IconProps) => <FaPodcast size={size} className="orange" />,
        publicspeaker: ({ size }: IconProps) => <FcPodiumWithSpeaker size={size} className="yellow emoji" />,
        rss: ({ size }: IconProps) => <FaRss size={size} className="orange" />,
        skype: ({ size }: IconProps) => <FaSkype size={size} style={{ color: '#00AFF0' }} />,
        sms: ({ size }: IconProps) => <FaSms size={size} className="white" />,
        spotify: ({ size }: IconProps) => <SiSpotify size={size} className="green spotify" />,
        telegram: ({ size }: IconProps) => <FaTelegram size={size} className="blue telegram" />,
        tinder: ({ size }: IconProps) => <IconoTinder size={size} style={{ color: '#FE3C72' }} />,
        twitter: ({ size }: IconProps) => <SiTwitter size={size} className="blue twitter" />,
        whatsapp: ({ size }: IconProps) => <SiWhatsapp size={size} className="green whatsapp" />,
        writing: ({ size }: IconProps) => <PiNotePencilBold size={size} style={{ color: '#fcaa62' }} />,
        youtube: ({ size }: IconProps) => <FaYoutube size={size} className="red youtube" />
    },
    IT: {
        android: ({ size }: IconProps) => <FcAndroidOs size={size} className="" />,
        aws: ({ size }: IconProps) => <FaAws size={size} className="orange aws" />,
        backup: ({ size }: IconProps) => <FcDataBackup size={size} className="green spotify" />,
        backup_cloud: ({ size }: IconProps) => <MdBackup size={size} className="green spotify" />,
        database: ({ size }: IconProps) => <FaDatabase size={size} className="orange" />,
        dell: ({ size }: IconProps) => <SiDell size={size} className="blue linkedin" />,
        gimp: ({ size }: IconProps) => <SiGimp size={size} className='orange' />,
        git: ({ size }: IconProps) => <FaGitSquare size={size} className='orange' />,
        google: ({ size }: IconProps) => <FcGoogle size={size} className="yellow intense" />,
        gpt: ({ size }: IconProps) => <TbAppsFilled size={size} className="green" />,
        hardware: ({ size }: IconProps) => <IoHardwareChip size={size} className="orange" />,
        headphones: ({ size }: IconProps) => <CiHeadphones size={size} className="orange" />,
        kindle: ({ size }: IconProps) => <FaBookReader size={size} className='blue kindle' />,
        laptop: ({ size }: IconProps) => <FaLaptop size={size} className="orange" />,
        lenovo: ({ size }: IconProps) => <SiLenovo size={size} className="red youtube" />,
        obsidian: ({ size }: IconProps) => <SiObsidian size={size} className="violet" />,
        openai: ({ size }: IconProps) => <SiOpenai size={size} className="green openai" />,
        programming: ({ size }: IconProps) => <FaCode size={size} className="orange" />,
        plex: ({ size }: IconProps) => <SiPlex size={size} className="orange" />,
        readwise: ({ size }: IconProps) => <CustomIcon size={size} className="white" iconName="Readwise" />,
        samsung: ({ size }: IconProps) => <SiSamsung size={size} className="blue cobalt" />,
        smartphone: ({ size }: IconProps) => <FiSmartphone size={size} className="orange" />,
        synology: ({ size }: IconProps) => <SiSynology size={size} className="orange" />,
        tablet: ({ size }: IconProps) => <FaTabletAlt size={size} className="orange" />
    },
    Agro: {
        agriculture: ({ size }: IconProps) => <IoMdBasket size={size} className="brown" />,
        agro: ({ size }: IconProps) => <GiWheat size={size} className="brown" />,
        butterfly: ({ size }: IconProps) => <PiButterflyFill size={size} className="blue sapphire" />,
        dog: ({ size }: IconProps) => <FaDog size={size} className="brown" />,
        farmer: ({ size }: IconProps) => <GiFarmer size={size} className="brown" />,
        flower: ({ size }: IconProps) => <IoMdFlower size={size} className="yellow" />,
        prunning: ({ size }: IconProps) => <GiGardeningShears size={size} className="green tree" />,
        rose: ({ size }: IconProps) => <IoIosRose size={size} className="red" />,
        tree: ({ size }: IconProps) => <FaTree size={size} className='green tree' />,
        tomato: ({ size }: IconProps) => <GiTomato size={size} className="red youtube" />,
        tractor: ({ size }: IconProps) => <FaTractor size={size} className="brown" />,
        village: ({ size }: IconProps) => <GiVillage size={size} style={{ color: '#47ff6c' }} />
    },
    Sport: {
        basketball: ({ size }: IconProps) => <FaBasketball size={size} className="orange" />,
        champions: ({ size }: IconProps) => <GiChampions size={size} className="yellow" />,
        chess: ({ size }: IconProps) => <FaChess size={size} className="white" />,
        gym: ({ size }: IconProps) => <MdOutlineSportsGymnastics size={size} className="green" />,
        hiking: ({ size }: IconProps) => <FaHiking size={size} className="green" />,
        olympics: ({ size }: IconProps) => <CustomIcon size={size} className="green" iconName="Olympics" />,
        orejona: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Orejona" />,
        pool: ({ size }: IconProps) => <FaSwimmingPool size={size} className="blue sapphire" />,
        realmadrid: ({ size }: IconProps) => <CustomIcon size={size} className="green" iconName="RealMadrid" />,
        running: ({ size }: IconProps) => <FaRunning size={size} className="green" />,
        soccer: ({ size }: IconProps) => <GiSoccerBall size={size} className="white" />,
        sport: ({ size }: IconProps) => <FcSportsMode size={size} className="green" />,
        tennis: ({ size }: IconProps) => <MdOutlineSportsTennis size={size} className="white" />
    },
    Flags: {
        argentina: ({ size }: IconProps) => <Flag country='AR' size={size} className="" />,
        australia: ({ size }: IconProps) => <Flag country='AU' size={size} className="" />,
        bosnia: ({ size }: IconProps) => <Flag country='BA' size={size} className="" />,
        brazil: ({ size }: IconProps) => <Flag country='BR' size={size} className="" />,
        china: ({ size }: IconProps) => <Flag country='CN' size={size} className="" />,
        colombia: ({ size }: IconProps) => <Flag country='CO' size={size} className="" />,
        cuba: ({ size }: IconProps) => <Flag country='CU' size={size} className="" />,
        egipt: ({ size }: IconProps) => <Flag country='EG' size={size} className="" />,
        eu: ({ size }: IconProps) => <Flag country='EU' size={size} className="" />,
        france: ({ size }: IconProps) => <Flag country='FR' size={size} className="" />,
        gb: ({ size }: IconProps) => <Flag country='GB' size={size} className="" />,
        germany: ({ size }: IconProps) => <Flag country='DE' size={size} className="" />,
        hungary: ({ size }: IconProps) => <Flag country='HU' size={size} className="" />,
        india: ({ size }: IconProps) => <Flag country='IN' size={size} className="" />,
        iran: ({ size }: IconProps) => <Flag country='IR' size={size} className="" />,
        israel: ({ size }: IconProps) => <Flag country='IL' size={size} className="" />,
        italy: ({ size }: IconProps) => <Flag country='IT' size={size} className="" />,
        japan: ({ size }: IconProps) => <Flag country='JP' size={size} className="" />,
        marocco: ({ size }: IconProps) => <Flag country='MA' size={size} className="" />,
        poland: ({ size }: IconProps) => <Flag country='PL' size={size} className="" />,
        portugal: ({ size }: IconProps) => <Flag country='PT' size={size} className="" />,
        romania: ({ size }: IconProps) => <Flag country='RO' size={size} className="" />,
        russia: ({ size }: IconProps) => <Flag country='RU' size={size} className="" />,
        saudi: ({ size }: IconProps) => <Flag country='SA' size={size} className="" />,
        spain: ({ size }: IconProps) => <Flag country='ES' size={size} className="" />,
        turkey: ({ size }: IconProps) => <Flag country='TR' size={size} className="" />,
        usa: ({ size }: IconProps) => <Flag country='US' size={size} className="" />,
        vatican: ({ size }: IconProps) => <Flag country='VA' size={size} className="" />,
        venezuela: ({ size }: IconProps) => <Flag country='VE' size={size} className="" />
    },
    Christian: {
        adoration: ({ size }: IconProps) => <CustomIcon size={size} className="blue sky" iconName="Adoration" />,
        advent: ({ size }: IconProps) => <CustomIcon size={size} className="blue sky" iconName="Advent" />,
        agenda2030: ({ size }: IconProps) => <CustomIcon size={size} className="red" iconName="Agenda2030" />,
        angel: ({ size }: IconProps) => <GiAngelWings size={size} className="pink purple" />,
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
    Gastronomy: {
        beer: ({ size }: IconProps) => <IoIosBeer size={size} className="yellow emoji" />,
        cafe: ({ size }: IconProps) => <IoMdCafe size={size} className="yellow emoji" />,
        cake: ({ size }: IconProps) => <GiCakeSlice size={size} className="yellow emoji" />,
        cook: ({ size }: IconProps) => <GiCook size={size} className="white" />,
        friedeggs: ({ size }: IconProps) => <GiFriedEggs size={size} className="white" />,
        gastronomy: ({ size }: IconProps) => <MdRestaurant size={size} className='yellow emoji' />,
        pancake: ({ size }: IconProps) => <CustomIcon size={size} iconName="Pancake" />,
        pizza: ({ size }: IconProps) => <FaPizzaSlice size={size} className="yellow emoji" />,
        restaurant: ({ size }: IconProps) => <IoRestaurant size={size} className="yellow emoji" />
    },
    Transport: {
        bus: ({ size }: IconProps) => <FaBus size={size} className="brown" />,
        car: ({ size }: IconProps) => <FaCarSide size={size} className="red c3" />,
        plane: ({ size }: IconProps) => <GiCommercialAirplane size={size} className='blue kindle' />,
        ship: ({ size }: IconProps) => <FaShip size={size} className="blue kindle" />,
        taxi: ({ size }: IconProps) => <FaTaxi size={size} className="yellow emoji"/>,
        train: ({ size }: IconProps) => <FaTrain size={size} className="brown" />,
        travel: ({ size }: IconProps) => <MdCardTravel size={size} className="brown" />
    },
    Others: {
        add: ({ size }: IconProps) => <MdOutlineAddCircle size={size} className="green" />,
        archeology: ({ size }: IconProps) => <GiAncientRuins size={size} className="grey" />,
        battery: ({ size }: IconProps) => <IoMdBatteryCharging size={size} className="red" />,
        book: ({ size }: IconProps) => <FaBook size={size} className="blue sky" />,
        bookmark: ({ size }: IconProps) => <CiBookmark size={size} className="blue sky" />,
        building: ({ size }: IconProps) => <FaBuilding size={size} className="brown" />,
        calendar: ({ size }: IconProps) => <CiCalendar size={size} className="blue sky" />,
        camera: ({ size }: IconProps) => <FaCamera size={size} className="blue sky" />,
        cancel: ({ size }: IconProps) => <MdCancel size={size} className="red" />,
        castle: ({ size }: IconProps) => <MdCastle size={size} className="grey" />,
        cdr: ({ size }: IconProps) => <CustomIcon size={size} className="yellow" iconName="Cdr" />,
        cinema: ({ size }: IconProps) => <IconoCinema size={size} className="white" />,
        clock: ({ size }: IconProps) => <BsClockFill size={size} className="orange" />,
        elections: ({ size }: IconProps) => <FaVoteYea size={size} className="orange" />,
        favorite: ({ size }: IconProps) => <FaStar size={size} className="yellow" />,
        fireworks: ({ size }: IconProps) => <GiSpikyExplosion size={size} className="yellow" />,
        form: ({ size }: IconProps) => <FaWpforms size={size} className="orange" />,
        fridge: ({ size }: IconProps) => <RiFridgeFill  size={size} className="white" />,
        hillrock: ({ size }: IconProps) => <FaHillRockslide size={size} className="brown" />,
        holiday: ({ size }: IconProps) => <GiPalmTree size={size} className="green" />,
        home: ({ size }: IconProps) => <FaHome size={size} className="brown" />,
        hotel: ({ size }: IconProps) => <FaHotel size={size} className="brown" />,
        idea: ({ size }: IconProps) => <TbBulbFilled size={size} className="yellow" />,
        key: ({ size }: IconProps) => <FaKey size={size} className="yellow" />,
        marker: ({ size }: IconProps) => <FaMapMarkerAlt size={size} className="brown" />,
        meme: ({ size }: IconProps) => <BsChatLeftQuoteFill size={size} className="blue facebook" />,
        music: ({ size }: IconProps) => <IoMdMusicalNotes size={size} className="indigo" />,
        num0: ({ size }: IconProps) => <PiNumberCircleZeroBold size={size} style={{ color: '#fff' }} />,
        num3: ({ size }: IconProps) => <PiNumberCircleThreeBold size={size} style={{ color: '#fff' }} />,
        num6: ({ size }: IconProps) => <PiNumberCircleSixBold size={size} style={{ color: '#fff' }} />,
        num7: ({ size }: IconProps) => <PiNumberCircleSevenBold size={size} style={{ color: '#fff' }} />,
        num8: ({ size }: IconProps) => <PiNumberCircleEightBold size={size} style={{ color: '#fff' }} />,
        num9: ({ size }: IconProps) => <PiNumberCircleNineBold size={size} style={{ color: '#fff' }} />,
        ok: ({ size }: IconProps) => <FaCheck size={size} className="green" />,
        package: ({ size }: IconProps) => <PiPackageBold size={size} className="brown" />,
        piano: ({ size }: IconProps) => <MdPiano size={size} className="white" />,
        picture: ({ size }: IconProps) => <SlPicture size={size} className="yellow" />,
        perspective: ({ size }: IconProps) => <GiPerspectiveDiceThree size={size} className="yellow" />,
        question: ({ size }: IconProps) => <FaQuestionCircle size={size} className="orange" />,
        quote: ({ size }: IconProps) => <FaQuoteLeft size={size} className="yellow" />,
        review: ({ size }: IconProps) => <BsBookmarkStar size={size} className="yellow" />,
        scissors: ({ size }: IconProps) => <FaScissors size={size} className="orange" />,
        theater: ({ size }: IconProps) => <GiTheaterCurtains size={size} className="violet" />,
        watchsand: ({ size }: IconProps) => <GiSandsOfTime size={size} className="yellow" />,
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
