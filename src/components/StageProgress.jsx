import React from 'react';
import { motion } from 'framer-motion';

const STAGES = [
  { num: 1, name: "Envelope", icon: "💌" },
  { num: 2, name: "Quiz", icon: "🧸" },
  { num: 3, name: "Bakery", icon: "🎂" },
  { num: 4, name: "Gallery", icon: "📸" },
  { num: 5, name: "Gifts", icon: "🎁" },
  { num: 6, name: "Universe", icon: "👑" },
];

export default function StageProgress({ currentStage, unlockedStage, onSelectStage }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
      <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-1.5 md:gap-3 shadow-lg border-2 border-pink-200">
        {STAGES.map((s) => {
          const isCurrent = currentStage === s.num;
          const isUnlocked = s.num <= unlockedStage;

          return (
            <motion.button
              key={s.num}
              type="button"
              onClick={() => isUnlocked && onSelectStage(s.num)}
              disabled={!isUnlocked}
              whileHover={isUnlocked ? { scale: 1.1 } : {}}
              whileTap={isUnlocked ? { scale: 0.95 } : {}}
              className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs md:text-sm font-bold transition-all ${
                isCurrent
                  ? 'bg-rose-500 text-white shadow-md'
                  : isUnlocked
                  ? 'bg-pink-100 text-rose-700 hover:bg-pink-200'
                  : 'bg-gray-100 text-gray-400 opacity-60 cursor-not-allowed'
              }`}
            >
              <span className="text-sm md:text-base">{s.icon}</span>
              <span className="hidden sm:inline font-semibold">{s.name}</span>

              {isCurrent && (
                <motion.div
                  layoutId="activeStageDot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-500 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
