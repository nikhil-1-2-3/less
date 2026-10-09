import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function PlayfulButton({ text = "Not ready for surprise? 🙈", onClick }) {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    // Only dodge up to 4 times, disabled on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    if (dodgeCount < 4) {
      const randomX = (Math.random() - 0.5) * 160;
      const randomY = (Math.random() - 0.5) * 120;
      setPosition({ x: randomX, y: randomY });
      setDodgeCount(prev => prev + 1);
    }
  };

  const getDodgeLabel = () => {
    if (dodgeCount === 0) return text;
    if (dodgeCount === 1) return "Too slow! Hehe 😜";
    if (dodgeCount === 2) return "Nice try bestie! 🌸";
    if (dodgeCount === 3) return "Almost got me! 🎀";
    return "Okay okay, you win! 💕";
  };

  return (
    <motion.button
      type="button"
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 18 }}
      whileTap={{ scale: 0.92 }}
      className="px-5 py-2.5 rounded-full text-sm font-bold text-rose-700 bg-pink-100/90 hover:bg-pink-200 border-2 border-pink-300 shadow-sm transition-colors cursor-pointer select-none"
    >
      {getDodgeLabel()}
    </motion.button>
  );
}
