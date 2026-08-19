import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CountdownTime } from "../types";
import { useLanguage } from "../LanguageContext";

interface CountdownProps {
  targetDate: string; // ISO or date string
}

export default function Countdown({ targetDate }: CountdownProps) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeftData: CountdownTime = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isCompleted: true,
      };

      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isCompleted: false,
        };
      }

      setTimeLeft(timeLeftData);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: t("days"), value: timeLeft.days },
    { label: t("hours"), value: timeLeft.hours },
    { label: t("minutes"), value: timeLeft.minutes },
    { label: t("seconds"), value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 max-w-3xl mx-auto">
      {/* Title block resembling the header of the reference image */}
      <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-black tracking-[0.15em] text-[#521659] uppercase mb-8 sm:mb-10 text-center select-none">
        {t("countdownTitle")}
      </h3>
      
      {/* The main countdown cards grid */}
      <div className="grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-2xl mx-auto">
        {timeBlocks.map((block) => (
          <div key={block.label} className="flex flex-col items-center">
            {/* Realistic Flip Card Container */}
            <div className="relative w-full aspect-[1.1/1] sm:aspect-square flex items-center justify-center bg-white rounded-xl sm:rounded-2xl border border-purple-100 shadow-[0_12px_24px_rgba(82,22,89,0.06)] overflow-hidden">
              {/* Inner highlight/shadow gradients */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-purple-50/[0.15] pointer-events-none" />
              
              {/* Hinge Pin - Left */}
              <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-[4px] h-[10px] sm:h-[14px] bg-purple-200 rounded-r border border-purple-300 z-20 shadow-sm" />
              {/* Hinge Pin - Right */}
              <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-[4px] h-[10px] sm:h-[14px] bg-purple-200 rounded-l border border-purple-300 z-20 shadow-sm" />
              
              {/* Middle Horizontal Split Lines */}
              <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-purple-100 z-10" />
              <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-white z-10 translate-y-[1px]" />
              
              {/* Digital Number with flip-on-change transition effect */}
              <motion.span
                key={block.value}
                initial={{ rotateX: -90, opacity: 0.3 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 15 }}
                style={{ transformOrigin: "center" }}
                className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#521659] tracking-tight select-none z-0"
              >
                {block.value.toString().padStart(2, "0")}
              </motion.span>
            </div>
            
            {/* Label styled exactly like reference image */}
            <span className="font-sans text-[9px] sm:text-xs font-bold tracking-[0.25em] text-purple-700 mt-4 uppercase">
              {block.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Subtitle/location details modeled after the reference image footer text */}
      <p className="font-sans text-[10px] sm:text-xs text-stone-600 text-center tracking-[0.05em] mt-8 sm:mt-10 max-w-lg leading-relaxed px-4">
        {t("countdownSubtitle")}
      </p>
      
      {timeLeft.isCompleted && (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-sans text-base sm:text-lg text-amber-600 mt-6 font-bold tracking-wider uppercase"
        >
          {t("celebrationBegun")}
        </motion.p>
      )}
    </div>
  );
}

