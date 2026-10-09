import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function RoyaltyMeter({ score = 100, onComplete }) {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 2;
      if (start >= score) {
        setCurrentScore(score);
        clearInterval(interval);
        if (onComplete) onComplete();
      } else {
        setCurrentScore(start);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [score]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/85 rounded-3xl border-3 border-pink-300 shadow-xl max-w-sm mx-auto my-4 text-center">
      <h3 className="font-extrabold text-xl text-rose-800 mb-3 flex items-center gap-2">
        <span>👑</span> BIRTHDAY ROYALTY SCAN
      </h3>

      <div className="relative w-40 h-40 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-pink-100"
            strokeWidth="14"
            fill="transparent"
          />
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-rose-400"
            strokeWidth="14"
            strokeCap="round"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transition={{ ease: "easeOut" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="font-extrabold text-3xl text-rose-700">
            {currentScore}%
          </span>
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wide">
            ROYAL CUTENESS
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-3 bg-pink-100 px-4 py-2 rounded-full border border-pink-300 font-bold text-sm text-rose-700 shadow-sm"
      >
        ✨ 100% CERTIFIED QUEEN ✨
      </motion.div>
    </div>
  );
}
