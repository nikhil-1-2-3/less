import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/soundEffects';

export default function TeddyBear({ onClick, isSecret = false, label = "" }) {
  const [isWinking, setIsWinking] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  const handleClick = (e) => {
    playSound('pop');
    setIsWinking(true);
    setShowBubble(true);
    setTimeout(() => setIsWinking(false), 800);
    setTimeout(() => setShowBubble(false), 2500);
    if (onClick) onClick(e);
  };

  return (
    <div className="relative inline-block select-none cursor-pointer" onClick={handleClick}>
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-full text-xs font-bold text-rose-500 shadow-md border-2 border-pink-300 whitespace-nowrap z-20 pointer-events-none"
          >
            {isSecret ? "🌟 Secret Unlocked! Bestie Hug! 🧸" : "Hug me! 🧸💕"}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        {/* Cute Ribbon Banner badge if secret */}
        {isSecret && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow border border-yellow-200 z-10 animate-bounce">
            CLICK ME! ✨
          </span>
        )}

        <svg
          viewBox="0 0 160 180"
          className="w-28 h-32 md:w-36 md:h-40 drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ears */}
          <circle cx="45" cy="40" r="22" fill="#D29062" stroke="#B87343" strokeWidth="2" />
          <circle cx="45" cy="40" r="12" fill="#F4C2A3" />

          <circle cx="115" cy="40" r="22" fill="#D29062" stroke="#B87343" strokeWidth="2" />
          <circle cx="115" cy="40" r="12" fill="#F4C2A3" />

          {/* Teddy Head */}
          <circle cx="80" cy="75" r="42" fill="#D29062" stroke="#B87343" strokeWidth="2" />

          {/* Teddy Body */}
          <ellipse cx="80" cy="135" rx="35" ry="32" fill="#D29062" stroke="#B87343" strokeWidth="2" />
          <ellipse cx="80" cy="135" rx="20" ry="18" fill="#F4C2A3" />

          {/* Snout */}
          <ellipse cx="80" cy="83" rx="16" ry="12" fill="#FFF8F0" />
          <polygon points="80,77 73,83 87,83" fill="#793D5C" />
          <path d="M 80 83 L 80 89 Q 80 93 75 93 M 80 89 Q 80 93 85 93" stroke="#793D5C" strokeWidth="2" strokeLinecap="round" />

          {/* Rosy Cheeks */}
          <circle cx="56" cy="85" r="6" fill="#FF75AA" fillOpacity="0.5" />
          <circle cx="104" cy="85" r="6" fill="#FF75AA" fillOpacity="0.5" />

          {/* Eyes */}
          {isWinking ? (
            <>
              <path d="M 58 72 Q 64 78 70 72" stroke="#793D5C" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="96" cy="72" rx="4" ry="6" fill="#793D5C" />
            </>
          ) : (
            <>
              <ellipse cx="64" cy="72" rx="4" ry="6" fill="#793D5C" />
              <ellipse cx="96" cy="72" rx="4" ry="6" fill="#793D5C" />
              <circle cx="63" cy="70" r="1.5" fill="#FFFFFF" />
              <circle cx="95" cy="70" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Satin Bow Tie */}
          <path d="M 80 108 L 65 98 L 65 118 Z" fill="#FF75AA" />
          <path d="M 80 108 L 95 98 L 95 118 Z" fill="#FF75AA" />
          <circle cx="80" cy="108" r="4" fill="#FFFFFF" />

          {/* Paws */}
          <ellipse cx="40" cy="135" rx="10" ry="8" fill="#F4C2A3" />
          <ellipse cx="120" cy="135" rx="10" ry="8" fill="#F4C2A3" />
        </svg>

        {label && (
          <p className="text-center font-bold text-xs text-rose-700 mt-1 bg-white/80 px-2 py-0.5 rounded-full border border-pink-200">
            {label}
          </p>
        )}
      </motion.div>
    </div>
  );
}
