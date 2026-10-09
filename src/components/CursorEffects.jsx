import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CursorEffects() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    let lastTime = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 90) return; // Limit particle count for performance
      lastTime = now;

      const symbols = ['💖', '✨', '🌸', '🎀', '⭐'];
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];

      const newParticle = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        symbol: randomSymbol,
        size: Math.floor(Math.random() * 8) + 12
      };

      setParticles(prev => [...prev.slice(-12), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1, x: p.x - 10, y: p.y - 10 }}
            animate={{ opacity: 0, scale: 0.3, y: p.y - 35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute select-none font-bold drop-shadow-sm"
            style={{ fontSize: `${p.size}px` }}
          >
            {p.symbol}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
