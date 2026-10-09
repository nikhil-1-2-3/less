import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ToastMessages({ messages = [] }) {
  const [currentToast, setCurrentToast] = useState(null);

  useEffect(() => {
    if (!messages || messages.length === 0) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      const text = messages[randomIndex];
      setCurrentToast(text);

      setTimeout(() => {
        setCurrentToast(null);
      }, 4000);
    }, 18000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {currentToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="glass-panel px-4 py-2.5 rounded-2xl shadow-lg border-2 border-pink-300 flex items-center gap-2 text-xs md:text-sm font-bold text-rose-700 pointer-events-auto"
          >
            <span>✨</span>
            <span>{currentToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
