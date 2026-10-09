import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedDoll from '../components/AnimatedDoll';
import TeddyBear from '../components/TeddyBear';
import Modal from '../components/Modal';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export default function FinaleStage({ config, onReplay }) {
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const fullLetter = config.typewriterLetter;

  // Trigger grand celebration confetti on load
  useEffect(() => {
    playSound('sparkle');
    playSound('correct');

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF75AA', '#FFB6D5', '#FFD700', '#E8DFFF']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF75AA', '#FFB6D5', '#FFD700', '#E8DFFF']
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleCelebrateAgain = () => {
    playSound('correct');
    playSound('sparkle');
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF75AA', '#FFB6D5', '#FFD700', '#E8DFFF', '#F28CB5']
    });
  };

  const handleOpenLetter = () => {
    playSound('envelope');
    setShowLetterModal(true);

    if (displayedText.length === 0) {
      setIsTyping(true);
      let index = 0;
      const timer = setInterval(() => {
        if (index < fullLetter.length) {
          setDisplayedText(prev => prev + fullLetter.charAt(index));
          index++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 25);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center select-none max-w-5xl mx-auto my-4 relative">
      {/* Background Dreamy Glow */}
      <div className="absolute inset-0 bg-radial from-pink-300/30 via-transparent to-transparent pointer-events-none -z-10" />

      {/* Stage Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-block bg-pink-200/90 px-5 py-2 rounded-full text-xs md:text-sm font-extrabold text-rose-800 tracking-widest uppercase border-2 border-pink-300 mb-4 shadow-md"
      >
        👑 STAGE 06 — THE GRAND BIRTHDAY UNIVERSE 🌟
      </motion.div>

      {/* Animated Staggered Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="space-y-2 mb-6"
      >
        <h1 className="font-extrabold text-4xl sm:text-6xl md:text-7xl text-rose-800 font-display tracking-tight drop-shadow-md">
          {config.title}
        </h1>
        <h2 className="font-extrabold text-4xl sm:text-6xl md:text-7xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 bg-clip-text text-transparent font-display drop-shadow-sm">
          {config.name}
        </h2>
        <p className="text-base md:text-xl font-bold text-rose-700/90 max-w-xl mx-auto mt-2">
          {config.subheading}
        </p>
      </motion.div>

      {/* Characters & Celebration Scene */}
      <div className="flex items-center justify-center gap-6 md:gap-12 my-6">
        <AnimatedDoll expression="excited" isDancing={true} size="lg" />
        <TeddyBear onClick={handleCelebrateAgain} label="Bestie Teddy 🧸" />
        <AnimatedDoll expression="happy" isDancing={true} size="lg" />
      </div>

      {/* Action Buttons Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-6 z-20"
      >
        <motion.button
          type="button"
          onClick={handleOpenLetter}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="px-8 py-4 rounded-full font-extrabold text-base md:text-lg text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-xl pink-shadow border-2 border-white cursor-pointer flex items-center gap-2"
        >
          <span>{config.readLetterText}</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={handleCelebrateAgain}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="px-6 py-4 rounded-full font-extrabold text-base md:text-lg text-rose-800 bg-white/90 hover:bg-white shadow-lg border-2 border-pink-300 cursor-pointer flex items-center gap-2"
        >
          <span>{config.confettiBurstText}</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={onReplay}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="px-6 py-4 rounded-full font-extrabold text-base md:text-lg text-rose-700 bg-pink-100 hover:bg-pink-200 shadow-md border-2 border-pink-300 cursor-pointer flex items-center gap-2"
        >
          <span>{config.replayText}</span>
        </motion.button>
      </motion.div>

      {/* Personalized Typewriter Birthday Letter Modal */}
      <Modal
        isOpen={showLetterModal}
        onClose={() => setShowLetterModal(false)}
        title="Your Secret Birthday Letter 💌"
      >
        <div className="text-left space-y-4 font-sans text-rose-950">
          <div className="bg-pink-50/90 p-6 rounded-2xl border-2 border-pink-200 shadow-inner max-h-[60vh] overflow-y-auto whitespace-pre-line text-sm md:text-base font-semibold leading-relaxed">
            {displayedText}
            {isTyping && <span className="inline-block w-2 h-5 bg-rose-500 ml-1 animate-pulse" />}
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setShowLetterModal(false);
                handleCelebrateAgain();
              }}
              className="px-6 py-2.5 rounded-full font-extrabold text-sm text-white bg-rose-500 hover:bg-rose-600 shadow border border-white cursor-pointer"
            >
              Close & Celebrate 🎉
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
