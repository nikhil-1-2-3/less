import React from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/soundEffects';

export default function FloatingDecorations({ onFindSecretStar, isSecretStarFound }) {
  const hearts = [
    { top: '12%', left: '8%', size: 'text-xl', delay: 0 },
    { top: '25%', left: '88%', size: 'text-2xl', delay: 1.5 },
    { top: '65%', left: '6%', size: 'text-lg', delay: 2.2 },
    { top: '78%', left: '92%', size: 'text-2xl', delay: 0.8 },
  ];

  const butterflies = [
    { top: '18%', left: '82%', delay: 0 },
    { top: '70%', left: '12%', delay: 2 },
  ];

  const handleStarClick = (e) => {
    e.stopPropagation();
    playSound('sparkle');
    if (onFindSecretStar) {
      onFindSecretStar();
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Drifting Clouds in background */}
      <motion.div
        className="absolute top-10 -left-20 w-64 h-24 bg-white/40 rounded-full blur-sm"
        animate={{ x: ['0vw', '110vw'] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-44 -left-40 w-96 h-32 bg-pink-100/50 rounded-full blur-md"
        animate={{ x: ['0vw', '110vw'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear', delay: 10 }}
      />

      {/* Floating Hearts */}
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          className={`absolute ${h.size} text-pink-400 opacity-60`}
          style={{ top: h.top, left: h.left }}
          animate={{
            y: [-8, 8, -8],
            scale: [1, 1.15, 1],
            rotate: [-10, 10, -10]
          }}
          transition={{ duration: 3.5 + i, repeat: Infinity, ease: 'easeInOut', delay: h.delay }}
        >
          💖
        </motion.div>
      ))}

      {/* Gentle Butterflies */}
      {butterflies.map((b, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none"
          style={{ top: b.top, left: b.left }}
          animate={{
            x: [-15, 15, -15],
            y: [-10, 10, -10],
            rotate: [-15, 15, -15]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        >
          🦋
        </motion.div>
      ))}

      {/* Trick E: THE HIDDEN SECRET STAR */}
      <motion.div
        className={`absolute pointer-events-auto cursor-pointer select-none transition-all z-20 ${
          isSecretStarFound ? 'top-6 right-6 scale-75 opacity-70' : 'top-14 right-16 md:top-20 md:right-32'
        }`}
        animate={isSecretStarFound ? { rotate: 360 } : {
          scale: [1, 1.3, 1],
          rotate: [0, 15, -15, 0],
          filter: [
            'drop-shadow(0 0 4px #FFD700)',
            'drop-shadow(0 0 16px #FFD700)',
            'drop-shadow(0 0 4px #FFD700)'
          ]
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleStarClick}
        title={isSecretStarFound ? "Secret Star Unlocked!" : "Psst... What is this glowing star?"}
      >
        <span className="text-3xl md:text-4xl">
          {isSecretStarFound ? "🌟" : "⭐"}
        </span>
      </motion.div>
    </div>
  );
}
