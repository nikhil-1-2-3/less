import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedDoll({ expression = 'happy', isWaving = true, isDancing = false, size = 'md' }) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'w-24 h-32',
    md: 'w-36 h-48',
    lg: 'w-48 h-64',
    xl: 'w-64 h-80'
  }[size] || 'w-36 h-48';

  return (
    <motion.div
      className={`relative inline-block ${sizeClasses} select-none cursor-pointer`}
      animate={isDancing ? {
        y: [0, -15, 0, -10, 0],
        rotate: [0, -5, 5, -3, 0],
      } : {
        y: [0, -6, 0],
      }}
      transition={isDancing ? {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      } : {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.05 }}
    >
      <svg
        viewBox="0 0 200 260"
        className="w-full h-full drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Shadow below doll */}
        <ellipse cx="100" cy="245" rx="55" ry="10" fill="#F28CB5" fillOpacity="0.35" />

        {/* Doll Legs */}
        <rect x="75" y="175" width="16" height="45" rx="8" fill="#FFDDEE" stroke="#FF75AA" strokeWidth="2.5" />
        <rect x="109" y="175" width="16" height="45" rx="8" fill="#FFDDEE" stroke="#FF75AA" strokeWidth="2.5" />
        {/* Shoes */}
        <ellipse cx="83" cy="220" rx="12" ry="7" fill="#FF75AA" />
        <ellipse cx="117" cy="220" rx="12" ry="7" fill="#FF75AA" />
        <path d="M 75 220 Q 83 216 91 220" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M 109 220 Q 117 216 125 220" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

        {/* Cute Princess Dress */}
        <path
          d="M 68 120 L 132 120 L 152 185 Q 100 200 48 185 Z"
          fill="url(#dressGradient)"
          stroke="#FF75AA"
          strokeWidth="3"
        />
        {/* Dress Frills */}
        <path
          d="M 48 185 Q 61 193 74 185 Q 87 193 100 185 Q 113 193 126 185 Q 139 193 152 185"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Satin Bow on Dress */}
        <ellipse cx="100" cy="125" rx="7" ry="5" fill="#FF75AA" />
        <path d="M 100 125 Q 85 115 88 130 Z" fill="#F28CB5" />
        <path d="M 100 125 Q 115 115 112 130 Z" fill="#F28CB5" />

        {/* Left Arm */}
        <motion.path
          d="M 66 122 Q 45 140 42 160"
          stroke="#FFDDEE"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Right Arm (Waving animation if active) */}
        <motion.path
          d="M 134 122 Q 155 140 158 160"
          stroke="#FFDDEE"
          strokeWidth="12"
          strokeLinecap="round"
          animate={isWaving ? {
            d: [
              "M 134 122 Q 155 130 162 110",
              "M 134 122 Q 165 125 170 100",
              "M 134 122 Q 155 130 162 110"
            ]
          } : {}}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Long Soft Pink Hair Background */}
        <path
          d="M 40 70 Q 30 140 50 170 Q 100 160 150 170 Q 170 140 160 70 Q 100 20 40 70 Z"
          fill="#FFB6D5"
        />

        {/* Head / Face */}
        <ellipse cx="100" cy="80" rx="42" ry="38" fill="#FFF8F0" stroke="#FFDDEE" strokeWidth="2" />

        {/* Hair Bangs */}
        <path d="M 58 60 Q 80 82 100 65 Q 120 82 142 60 Q 100 38 58 60 Z" fill="#FFB6D5" />

        {/* Crown on Head */}
        <path d="M 85 40 L 91 25 L 100 35 L 109 25 L 115 40 Z" fill="#FFD700" stroke="#FFA500" strokeWidth="1.5" />
        <circle cx="91" cy="23" r="2.5" fill="#FF75AA" />
        <circle cx="100" cy="33" r="2.5" fill="#E8DFFF" />
        <circle cx="109" cy="23" r="2.5" fill="#FF75AA" />

        {/* Hair Bows */}
        <circle cx="58" cy="52" r="5" fill="#FF75AA" />
        <circle cx="142" cy="52" r="5" fill="#FF75AA" />

        {/* Rosy Cheeks */}
        <ellipse cx="73" cy="90" rx="8" ry="5" fill="#FF75AA" fillOpacity="0.45" />
        <ellipse cx="127" cy="90" rx="8" ry="5" fill="#FF75AA" fillOpacity="0.45" />

        {/* Eyes (Anime style with sparkle) */}
        {isBlinking ? (
          <>
            <path d="M 72 82 Q 80 88 88 82" stroke="#793D5C" strokeWidth="3" strokeLinecap="round" />
            <path d="M 112 82 Q 120 88 128 82" stroke="#793D5C" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="80" cy="80" rx="6.5" ry="9" fill="#793D5C" />
            <ellipse cx="120" cy="80" rx="6.5" ry="9" fill="#793D5C" />
            {/* Eye Sparkles */}
            <circle cx="78" cy="76" r="2.5" fill="#FFFFFF" />
            <circle cx="118" cy="76" r="2.5" fill="#FFFFFF" />
            <circle cx="82" cy="83" r="1.5" fill="#FFFFFF" />
            <circle cx="122" cy="83" r="1.5" fill="#FFFFFF" />
          </>
        )}

        {/* Mouth Expression */}
        {expression === 'excited' || isDancing ? (
          <path d="M 92 92 Q 100 106 108 92 Z" fill="#FF75AA" />
        ) : expression === 'shy' ? (
          <path d="M 94 94 Q 100 98 106 94" stroke="#793D5C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M 92 91 Q 100 100 108 91" stroke="#793D5C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        )}

        {/* Gradients */}
        <defs>
          <linearGradient id="dressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB6D5" />
            <stop offset="50%" stopColor="#FF75AA" />
            <stop offset="100%" stopColor="#F28CB5" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
