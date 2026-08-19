import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  ChevronUp, 
  ArrowDown, 
  Utensils 
} from "lucide-react";
import Countdown from "./components/Countdown";
import VenueMap from "./components/VenueMap";
import FallingPetals from "./components/FallingPetals";
import Preloader from "./components/Preloader";
import { useLanguage } from "./LanguageContext";
import mandalaBg from "./assets/images/mandala_wide_bg_1786985434645.jpg";
import mandalaBgPortrait from "./assets/images/gold_mandala_bg_1786985421996.jpg";
const raLogo =
  "https://drive.google.com/thumbnail?id=1KNEA68mx7n7Ogg1YvWeHaXT_LWEepxnK&sz=w1600";
  
// Sacred traditional swastika/ganesha prosperity symbol
function SacredSymbol() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="w-10 h-10 text-amber-600/85 fill-none mx-auto mb-3"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 20 6 L 20 34 M 6 20 L 34 20 M 20 6 L 30 6 M 34 20 L 34 30 M 20 34 L 10 34 M 6 20 L 6 10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      <circle cx="26" cy="14" r="1.5" fill="currentColor" />
      <circle cx="26" cy="26" r="1.5" fill="currentColor" />
      <circle cx="14" cy="26" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Center golden ornamental flourish at the bottom of each card
function CardFlourish() {
  return (
    <div className="flex items-center justify-center space-x-2 pt-6 pb-1 w-full select-none">
      <span className="flex-1 max-w-[42px] sm:max-w-[56px] h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-amber-500" />
      <svg className="w-7 h-5 text-amber-600 drop-shadow-sm flex-shrink-0" viewBox="0 0 36 20" fill="none">
        <path d="M18 2 L25 10 L18 18 L11 10 Z" fill="#d97706" />
        <circle cx="18" cy="10" r="2.5" fill="#fef3c7" />
        <path d="M11 10 C7 6, 2 8, 0 10 C3 12, 7 14, 11 10 Z" fill="#b45309" opacity="0.9" />
        <path d="M25 10 C29 6, 34 8, 36 10 C33 12, 29 14, 25 10 Z" fill="#b45309" opacity="0.9" />
        <circle cx="18" cy="1" r="1.2" fill="#f59e0b" />
        <circle cx="18" cy="19" r="1.2" fill="#f59e0b" />
      </svg>
      <span className="flex-1 max-w-[42px] sm:max-w-[56px] h-[1px] bg-gradient-to-l from-transparent via-amber-400 to-amber-500" />
    </div>
  );
}

// Subtle golden pointed bottom bracket contour
function CardBottomBracket() {
  return (
    <div className="absolute -bottom-[5px] inset-x-0 flex justify-center pointer-events-none z-10 overflow-hidden">
      <svg
        className="w-full max-w-[340px] h-3.5 drop-shadow-[0_2px_4px_rgba(180,120,40,0.2)]"
        viewBox="0 0 340 14"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 1 Q 85 4, 150 7 L 170 13 L 190 7 Q 255 4, 340 1"
          stroke="url(#cardGoldRim)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <defs>
          <linearGradient id="cardGoldRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Elegant traditional separator curves/swirls
function ElegantDivider() {
  return (
    <div className="flex items-center justify-center space-x-3 my-6 text-[#b36fb4]/70">
      <svg viewBox="0 0 100 20" className="w-28 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 40 10 C 30 10 25 15 20 10 C 15 5 10 12 5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="10" r="3.5" fill="currentColor" />
        <circle cx="43" cy="10" r="1.8" fill="currentColor" />
        <circle cx="57" cy="10" r="1.8" fill="currentColor" />
        <path d="M 60 10 C 70 10 75 15 80 10 C 85 5 90 12 95 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const weddingCouple = "https://drive.google.com/thumbnail?id=1sbLeIjjfYSoPf9CYT45Jx-eUuhRSocyv&sz=w1600";

export default function App() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const weddingDateStr = "2026-08-30T10:00:00";

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-800 selection:bg-purple-200 selection:text-purple-900 relative antialiased overflow-x-hidden">
      {/* Royal Wedding Page Loader */}
      <Preloader logoSrc={raLogo} />
      
      {/* 1. STICKY PREMIUM HEADER NAVIGATION */}
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 py-3 px-4 sm:px-6 md:px-8 flex items-center justify-between ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-[0_4px_25px_rgba(82,22,89,0.04)]" 
          : "bg-transparent border-b border-transparent"
      }`}>
        {/* Monogram Logo */}
        <a 
          href="#" 
          className="flex items-center select-none group transition-transform duration-300 hover:scale-105"
          aria-label="Rasika & Amal"
        >
          <img 
            src={raLogo} 
            alt="Rasika & Amal Monogram Logo" 
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm"
            referrerPolicy="no-referrer"
          />
        </a>
      </header>

      {/* Floating Back-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={handleScrollTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 left-6 z-50 p-3.5 bg-purple-900 text-white hover:bg-purple-950 border border-purple-800 rounded-full shadow-[0_10px_25px_rgba(82,22,89,0.12)] transition-colors cursor-pointer"
            title={t("backToTop")}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="w-4.5 h-4.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. HERO / COVER SECTION (KEPT LAYOUT, ARTWORK, THEME EXACTLY AS SPECIFIED) */}
      <section
        className="relative w-full min-h-[640px] sm:min-h-screen flex flex-col items-center justify-between pt-28 sm:pt-36 md:pt-24 lg:pt-20 pb-12 px-4"
        style={{
          backgroundImage: "url('https://drive.google.com/thumbnail?id=1EadDidzBWJ1Ko0cbNbVmBTM5uGha80Ma&sz=w1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Interactive falling lavender petals */}
        <FallingPetals />

        <div className="max-w-5xl w-full mx-auto relative z-10 px-4 mt-4 md:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="py-4 md:py-2 relative overflow-hidden"
          >
            <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto">
              <div className="text-center flex flex-col justify-center items-center space-y-6 md:space-y-4">
                <div className="space-y-2 md:space-y-1.5 text-center w-full">
                  <span className="font-sans text-[11px] sm:text-xs md:text-[11px] font-bold tracking-[0.3em] md:tracking-[0.35em] text-[#521659] uppercase block">
                    {t("togetherWithFamilies")}
                  </span>
                  <div className="w-12 h-[1.5px] bg-amber-500 mx-auto mt-2.5 md:mt-1.5" />
                </div>

                <div className="text-center w-full py-2">
                  <h1 className="font-serif text-[36px] sm:text-[64px] md:text-[72px] font-semibold text-[#521659] tracking-wide leading-tight select-none">
                    Rasika & Amal
                  </h1>
                </div>

                <div className="space-y-1.5 md:space-y-1 text-center w-full pt-2">
                  <p className="font-sans text-[17px] sm:text-[24px] font-semibold tracking-[0.2em] text-[#9d6d37] uppercase">
                    {t("weddingDate")}
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-stone-600/95 tracking-[0.15em] font-medium uppercase">
                    {t("weddingDayTime")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Centered couple portrait positioned completely inside the hero banner at the bottom edge */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center pointer-events-none">
          <div
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-[40vh] sm:h-[45vh] md:h-[50vh] max-h-[280px] sm:max-h-[420px] md:max-h-[500px] lg:max-h-[560px] flex justify-center items-end"
          >
            <motion.img
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
              src={weddingCouple}
              alt="Rasika and Amal"
              className="h-full w-auto object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>


      </section>

      {/* 3. WEDDING DETAILS SECTION WITH MANDALA BACKGROUND */}
      <section 
        id="details-sec" 
        className="py-20 sm:py-28 md:py-32 relative overflow-hidden bg-[#f7edf8]"
      >
        {/* Mandala Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <picture>
            <source media="(max-width: 640px)" srcSet={mandalaBgPortrait} />
            <img 
              src={mandalaBg} 
              alt="Mandala Background" 
              className="w-full h-full object-cover object-center opacity-65 mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7edf8]/80 via-[#faf2fb]/40 to-[#f7edf8]/85" />
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14 sm:mb-16">
            <SacredSymbol />
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#521659] mb-4">
              {t("weddingDetailsTitle")}
            </h3>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4" />
            <p className="font-sans text-sm sm:text-base text-stone-700 max-w-xl mx-auto leading-relaxed font-medium">
              {t("weddingDetailsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-6 lg:gap-8 pt-10 pb-4 items-stretch">
            {/* Card 1: Wedding Date */}
            <motion.div 
              className="relative bg-gradient-to-b from-[#ffffff] via-[#fffbfe] to-[#faf1f9] rounded-t-[32px] rounded-b-[26px] pt-12 sm:pt-14 pb-5 sm:pb-6 px-5 sm:px-7 border border-purple-100/90 border-b-2 border-b-amber-400/80 shadow-[0_16px_36px_rgba(74,21,75,0.07)] hover:shadow-[0_22px_48px_rgba(74,21,75,0.13)] hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-between items-center h-full group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Top floating circle badge */}
              <div className="absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 z-20">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-b from-[#4d1653] to-[#340b38] border-[2.5px] border-amber-300 shadow-[0_8px_20px_rgba(52,11,56,0.38)] flex items-center justify-center text-amber-300 ring-2 ring-amber-100/60">
                  <Calendar className="w-7 h-7 stroke-[1.8]" />
                </div>
              </div>

              {/* Header with whisker lines & dot */}
              <div className="space-y-2 w-full relative z-10 pt-1">
                <div className="flex items-center justify-center space-x-2">
                  <span className="w-4 sm:w-6 h-[1px] bg-amber-500/60" />
                  <h4 className="font-sans font-bold tracking-[0.22em] text-[11px] sm:text-xs uppercase text-[#521659]">
                    {t("weddingDateTitle")}
                  </h4>
                  <span className="w-4 sm:w-6 h-[1px] bg-amber-500/60" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mx-auto shadow-xs" />
              </div>

              {/* Main Date Value */}
              <div className="my-auto py-3 relative z-10">
                <p className="font-serif text-2xl sm:text-[26px] md:text-2xl lg:text-[28px] font-normal text-[#3b0b3e] leading-snug">
                  August 30, 2026
                </p>
              </div>

              {/* Bottom Gold Flourish & Bracket */}
              <div className="w-full relative z-10">
                <CardFlourish />
              </div>
              <CardBottomBracket />
            </motion.div>

            {/* Card 2: Muhurtham */}
            <motion.div 
              className="relative bg-gradient-to-b from-[#ffffff] via-[#fffbfe] to-[#faf1f9] rounded-t-[32px] rounded-b-[26px] pt-12 sm:pt-14 pb-5 sm:pb-6 px-5 sm:px-7 border border-purple-100/90 border-b-2 border-b-amber-400/80 shadow-[0_16px_36px_rgba(74,21,75,0.07)] hover:shadow-[0_22px_48px_rgba(74,21,75,0.13)] hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-between items-center h-full group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 z-20">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-b from-[#4d1653] to-[#340b38] border-[2.5px] border-amber-300 shadow-[0_8px_20px_rgba(52,11,56,0.38)] flex items-center justify-center text-amber-300 ring-2 ring-amber-100/60">
                  <Clock className="w-7 h-7 stroke-[1.8]" />
                </div>
              </div>

              <div className="space-y-2 w-full relative z-10 pt-1">
                <div className="flex items-center justify-center space-x-2">
                  <span className="w-4 sm:w-6 h-[1px] bg-amber-500/60" />
                  <h4 className="font-sans font-bold tracking-[0.22em] text-[11px] sm:text-xs uppercase text-[#521659]">
                    {t("muhurthamTitle")}
                  </h4>
                  <span className="w-4 sm:w-6 h-[1px] bg-amber-500/60" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mx-auto shadow-xs" />
              </div>

              <div className="my-auto py-3 relative z-10">
                <p className="font-serif text-2xl sm:text-[26px] md:text-2xl lg:text-[28px] font-normal text-[#3b0b3e] leading-snug">
                  10:00 AM – 11:00 AM
                </p>
              </div>

              <div className="w-full relative z-10">
                <CardFlourish />
              </div>
              <CardBottomBracket />
            </motion.div>

            {/* Card 3: Thalikettu Location */}
            <motion.div 
              className="relative bg-gradient-to-b from-[#ffffff] via-[#fffbfe] to-[#faf1f9] rounded-t-[32px] rounded-b-[26px] pt-12 sm:pt-14 pb-5 sm:pb-6 px-5 sm:px-7 border border-purple-100/90 border-b-2 border-b-amber-400/80 shadow-[0_16px_36px_rgba(74,21,75,0.07)] hover:shadow-[0_22px_48px_rgba(74,21,75,0.13)] hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-between items-center h-full group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 z-20">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-b from-[#4d1653] to-[#340b38] border-[2.5px] border-amber-300 shadow-[0_8px_20px_rgba(52,11,56,0.38)] flex items-center justify-center text-amber-300 ring-2 ring-amber-100/60">
                  <MapPin className="w-7 h-7 stroke-[1.8]" />
                </div>
              </div>

              <div className="space-y-2 w-full relative z-10 pt-1">
                <div className="flex items-center justify-center space-x-2">
                  <span className="w-4 sm:w-6 h-[1px] bg-amber-500/60" />
                  <h4 className="font-sans font-bold tracking-[0.22em] text-[11px] sm:text-xs uppercase text-[#521659]">
                    {t("thalikettuLocationTitle")}
                  </h4>
                  <span className="w-4 sm:w-6 h-[1px] bg-amber-500/60" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mx-auto shadow-xs" />
              </div>

              <div className="my-auto py-3 relative z-10">
                <p className="font-serif text-2xl sm:text-[26px] md:text-2xl lg:text-[28px] font-normal text-[#3b0b3e] leading-snug">
                  Thriprayar Temple
                </p>
              </div>

              <div className="w-full relative z-10">
                <CardFlourish />
              </div>
              <CardBottomBracket />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. COUNTDOWN TIMER SECTION */}
      <section id="countdown-sec" className="py-20 sm:py-28 md:py-32 bg-purple-50/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(154,61,163,0.03)_0%,transparent_75%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Countdown targetDate={weddingDateStr} />
        </div>
      </section>

      {/* 6. VENUE & DIRECTIONS SECTION */}
      <section id="venue-sec" className="py-20 sm:py-28 md:py-32 bg-white border-y border-purple-100/30">
        <VenueMap />
      </section>

      {/* 8. VISUAL BANNER / SIGN-OFF */}
      <section className="py-20 sm:py-28 bg-[#f5eef6] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div 
            className="bg-white rounded-[32px] sm:rounded-[40px] py-14 sm:py-18 px-6 sm:px-12 md:px-16 shadow-[0_20px_50px_rgba(74,21,75,0.07)] border border-purple-100/60 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Top Gold Heart & Whiskers */}
            <div className="flex items-center justify-center space-x-3 mb-5 sm:mb-6">
              <span className="w-8 sm:w-10 h-[1px] bg-amber-400" />
              <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span className="w-8 sm:w-10 h-[1px] bg-amber-400" />
            </div>

            {/* Subtitle */}
            <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#3b0b3e] uppercase mb-6 sm:mb-8">
              WITH ALL OUR HEARTS
            </p>

            {/* Names */}
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide text-[#521659] uppercase">
              <span className="text-[#521659]">RASIKA</span>
              <span className="font-serif italic font-normal text-amber-500 lowercase mx-2 sm:mx-3">&amp;</span>
              <span className="text-[#521659]">AMAL</span>
            </h2>

            {/* Golden Dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mx-auto my-7 sm:my-8" />

            {/* Poetic Message */}
            <div className="space-y-4 max-w-lg mx-auto text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Two hearts, one beautiful beginning,<br />
                and a lifetime of moments waiting to unfold.
              </p>
              <div className="w-8 h-[1px] bg-stone-300 mx-auto my-3" />
              <p>
                Your presence will make our celebration<br />
                even more special.
              </p>
            </div>

            {/* Date Pill Container */}
            <div className="my-7 sm:my-8 inline-block">
              <div className="rounded-full border border-purple-200/90 bg-purple-50/40 px-6 sm:px-8 py-2.5 sm:py-3 flex items-center space-x-3.5 shadow-xs">
                <Calendar className="w-4.5 h-4.5 text-[#3b0b3e] stroke-[1.8]" />
                <span className="h-4 w-[1px] bg-purple-200" />
                <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.2em] text-[#2e0931] uppercase">
                  AUGUST 30, 2026
                </span>
              </div>
            </div>

            {/* Bottom Gold Heart & Whiskers */}
            <div className="flex items-center justify-center space-x-3 mb-3 sm:mb-4">
              <span className="w-8 sm:w-10 h-[1px] bg-amber-400" />
              <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span className="w-8 sm:w-10 h-[1px] bg-amber-400" />
            </div>

            {/* Italic Sign-off */}
            <p className="font-serif italic text-stone-700 text-sm sm:text-base">
              Come share the joy of our forever with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 11. FOOTER COPYRIGHT */}
      <footer className="py-8 bg-stone-950 text-stone-500 text-center font-sans text-[10px] tracking-widest uppercase border-t border-stone-900 leading-loose">
        {t("footerCopyright")}
      </footer>
    </div>
  );
}
