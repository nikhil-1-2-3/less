import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedDoll from '../components/AnimatedDoll';
import PlayfulButton from '../components/PlayfulButton';
import TeddyBear from '../components/TeddyBear';
import { playSound } from '../utils/soundEffects';

export default function InvitationStage({ config, onComplete, onFindSecretStar }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    playSound('envelope');
    playSound('sparkle');
    setIsOpen(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 2200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] px-4 text-center select-none relative">
      {/* Stage Header Text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto space-y-3 z-10 mb-6"
      >
        <div className="inline-block bg-pink-200/80 px-4 py-1.5 rounded-full text-xs md:text-sm font-extrabold text-rose-700 tracking-wider uppercase border border-pink-300 shadow-sm">
          🎀 STAGE 01 — THE SECRET ENVELOPE 💌
        </div>

        <h1 className="font-extrabold text-4xl md:text-6xl text-rose-800 drop-shadow-sm font-display">
          {config.greeting}
        </h1>

        <p className="text-base md:text-xl text-rose-700/90 font-medium leading-relaxed">
          {config.subheading}
        </p>
      </motion.div>

      {/* Main Interactive Stage Area */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 my-4 z-10 max-w-4xl w-full">
        {/* Animated Doll Host */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <AnimatedDoll expression={isOpen ? 'excited' : 'happy'} isWaving={!isOpen} size="lg" />
          <p className="text-xs font-bold text-pink-600 bg-white/70 px-3 py-1 rounded-full border border-pink-200 mt-2">
            Your Birthday Host 🌸
          </p>
        </motion.div>

        {/* 3D Floating Envelope Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative perspective-1000"
        >
          <motion.div
            animate={isOpen ? { scale: 1.1, rotateY: 180 } : {
              y: [-8, 8, -8],
              rotate: [-2, 2, -2]
            }}
            transition={isOpen ? { duration: 0.6 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={!isOpen ? { scale: 1.06, rotate: 2 } : {}}
            onClick={!isOpen ? handleOpenLetter : undefined}
            className="w-72 h-48 md:w-84 md:h-56 glass-panel rounded-3xl p-4 flex flex-col items-center justify-center shadow-2xl border-3 border-pink-300 cursor-pointer relative overflow-hidden"
          >
            {/* Satin Ribbon & Heart Wax Seal */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-rose-400/40 pointer-events-none" />

            {!isOpen ? (
              <div className="flex flex-col items-center justify-center space-y-2 z-10">
                <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center text-2xl shadow-lg border-2 border-white animate-pulse">
                  💖
                </div>
                <p className="font-extrabold text-rose-800 text-base md:text-lg">
                  TO: THE BIRTHDAY QUEEN 👑
                </p>
                <span className="text-xs text-rose-600 font-bold bg-pink-100 px-3 py-1 rounded-full border border-pink-200">
                  Click envelope to unseal 💌
                </span>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center space-y-2 z-10"
              >
                <div className="text-4xl animate-bounce">✨💌✨</div>
                <h3 className="font-extrabold text-xl text-rose-800">
                  UNSEALING MAGIC...
                </h3>
                <p className="text-xs text-rose-600 font-bold">
                  Preparing your Bestie Personality Test! 🧸
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Cute Teddy Bear Companion */}
        <div className="hidden lg:block">
          <TeddyBear onClick={() => playSound('sparkle')} label="Bestie Teddy 🧸" />
        </div>
      </div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-6 z-10"
      >
        <motion.button
          type="button"
          onClick={handleOpenLetter}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="px-8 py-4 rounded-full font-extrabold text-lg text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-xl pink-shadow border-2 border-white/50 cursor-pointer flex items-center gap-2"
        >
          <span>{config.buttonText}</span>
          <span className="text-xl">💌</span>
        </motion.button>

        <PlayfulButton text={config.dodgingButtonText} onClick={handleOpenLetter} />
      </motion.div>
    </div>
  );
}
