import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/soundEffects';

const INITIAL_BALLOONS = [
  { id: 1, color: '#FF75AA', left: '5%', delay: 0, size: 64, type: 'heart' },
  { id: 2, color: '#FFB6D5', left: '15%', delay: 1.2, size: 52, type: 'round' },
  { id: 3, color: '#E8DFFF', left: '28%', delay: 0.5, size: 70, type: 'heart' },
  { id: 4, color: '#F28CB5', left: '72%', delay: 1.8, size: 58, type: 'round' },
  { id: 5, color: '#FF75AA', left: '84%', delay: 0.3, size: 68, type: 'heart' },
  { id: 6, color: '#FFDDEE', left: '92%', delay: 2.2, size: 50, type: 'heart' },
];

export default function FloatingBalloons() {
  const [balloons, setBalloons] = useState(INITIAL_BALLOONS);
  const [poppedSparks, setPoppedSparks] = useState([]);

  const handlePop = (balloon, e) => {
    e.stopPropagation();
    playSound('pop');

    // Add pop particles
    const rect = e.currentTarget.getBoundingClientRect();
    const newSpark = {
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      color: balloon.color
    };
    setPoppedSparks(prev => [...prev, newSpark]);
    setTimeout(() => {
      setPoppedSparks(prev => prev.filter(s => s.id !== newSpark.id));
    }, 800);

    // Respawn balloon after 4s
    setBalloons(prev => prev.filter(b => b.id !== balloon.id));
    setTimeout(() => {
      setBalloons(prev => [...prev, { ...balloon, id: Date.now() }]);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Popped Particle Effect */}
      {poppedSparks.map(spark => (
        <motion.div
          key={spark.id}
          className="absolute z-30 pointer-events-none"
          style={{ left: spark.x, top: spark.y }}
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-2xl">💖✨🎉</div>
        </motion.div>
      ))}

      {balloons.map(b => (
        <motion.div
          key={b.id}
          className="absolute pointer-events-auto cursor-pointer select-none"
          style={{ left: b.left, width: b.size, height: b.size * 1.3 }}
          initial={{ y: '105vh', rotate: 0 }}
          animate={{
            y: '-20vh',
            rotate: [-6, 6, -6],
            x: ['-10px', '10px', '-10px']
          }}
          transition={{
            y: { duration: 18 + (b.id % 5), repeat: Infinity, ease: 'linear', delay: b.delay },
            rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            x: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
          onClick={(e) => handlePop(b, e)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-md">
            {b.type === 'heart' ? (
              <path
                d="M 50 85 C 10 50 5 15 30 10 C 45 7 50 22 50 22 C 50 22 55 7 70 10 C 95 15 90 50 50 85 Z"
                fill={b.color}
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            ) : (
              <ellipse cx="50" cy="45" rx="35" ry="42" fill={b.color} stroke="#FFFFFF" strokeWidth="1.5" />
            )}
            {/* Highlight */}
            <ellipse cx="38" cy="25" rx="6" ry="10" fill="#FFFFFF" fillOpacity="0.5" transform="rotate(-25 38 25)" />
            {/* Balloon Knot */}
            <polygon points="46,85 54,85 50,92" fill={b.color} />
            {/* String */}
            <path d="M 50 92 Q 40 105 55 120 T 45 130" fill="none" stroke="#F28CB5" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
