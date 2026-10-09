import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../components/Modal';
import TeddyBear from '../components/TeddyBear';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export default function GiftStage({
  config,
  openedGifts,
  openGift,
  isSecretGiftFound,
  onDiscoverSecretGift,
  onComplete
}) {
  const [activeGiftModal, setActiveGiftModal] = useState(null);
  const [isLoadingGift, setIsLoadingGift] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const mainBoxes = config.boxes;
  const secretBox = config.secretBox;

  const loadingSteps = [
    "Preparing your happiness... 🎀",
    "Adding extra sparkle... ✨",
    "Wrapping your surprise... 🎁",
    "Almost ready, bestie! 💖"
  ];

  const handleBoxClick = (gift) => {
    playSound('sparkle');
    playSound('pop');
    openGift(gift.id);

    setIsLoadingGift(true);
    setLoadingTextIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < loadingSteps.length) {
        setLoadingTextIndex(step);
      } else {
        clearInterval(interval);
        setIsLoadingGift(false);
        setActiveGiftModal(gift);

        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#FF75AA', '#FFB6D5', '#FFD700']
        });
      }
    }, 600);
  };

  const isAllMainGiftsOpened = mainBoxes.every(b => openedGifts.includes(b.id));

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] px-4 text-center select-none max-w-4xl mx-auto my-4">
      {/* Stage Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block bg-pink-200/80 px-4 py-1.5 rounded-full text-xs md:text-sm font-extrabold text-rose-700 tracking-wider uppercase border border-pink-300 mb-2 shadow-sm"
      >
        🎁 STAGE 05 — THE SECRET GIFT LAB ✨
      </motion.div>

      <h2 className="font-extrabold text-3xl md:text-5xl text-rose-800 font-display mb-2">
        {config.title}
      </h2>
      <p className="text-sm md:text-base text-rose-700 font-semibold max-w-lg mb-8">
        {config.subtitle}
      </p>

      {/* Gift Boxes Display Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 w-full my-4">
        {mainBoxes.map((box) => {
          const isOpened = openedGifts.includes(box.id);
          return (
            <motion.div
              key={box.id}
              onClick={() => handleBoxClick(box)}
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.94 }}
              className={`glass-panel p-6 rounded-3xl border-3 flex flex-col items-center justify-center cursor-pointer shadow-xl relative transition-all ${
                isOpened
                  ? 'border-emerald-300 bg-emerald-50/70'
                  : 'border-pink-300 hover:border-pink-400'
              }`}
            >
              {isOpened && (
                <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow">
                  OPENED ✓
                </span>
              )}

              {/* 3D Illustrated Gift Box */}
              <div className="w-28 h-28 my-3 relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                  {/* Gift Box Body */}
                  <rect x="15" y="40" width="70" height="50" rx="8" fill="#FF75AA" stroke="#793D5C" strokeWidth="2.5" />
                  {/* Gift Lid */}
                  <rect x="10" y="30" width="80" height="15" rx="4" fill="#FFB6D5" stroke="#793D5C" strokeWidth="2.5" />

                  {/* Vertical Satin Ribbon */}
                  <rect x="43" y="30" width="14" height="60" fill={box.ribbonColor} />
                  {/* Horizontal Satin Ribbon */}
                  <rect x="15" y="58" width="70" height="14" fill={box.ribbonColor} />

                  {/* Ribbon Bow */}
                  <path d="M 50 30 Q 30 12 40 30 Z" fill={box.ribbonColor} />
                  <path d="M 50 30 Q 70 12 60 30 Z" fill={box.ribbonColor} />
                  <circle cx="50" cy="30" r="5" fill="#FFFFFF" />
                </svg>
              </div>

              <h3 className="font-extrabold text-base text-rose-800 mb-1">
                {box.name}
              </h3>
              <p className="text-xs font-bold text-rose-600 bg-pink-100 px-3 py-1 rounded-full border border-pink-200">
                {isOpened ? "Click to view note 💌" : "Click to unwrap 🎁"}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Secret Bonus Gift Box (Shown if secret star found or teddy clicked) */}
      <AnimatePresence>
        {isSecretGiftFound && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full my-4"
          >
            <div
              onClick={() => handleBoxClick(secretBox)}
              className="glass-panel p-6 rounded-3xl border-3 border-yellow-400 bg-yellow-50/80 flex flex-col items-center justify-center cursor-pointer shadow-2xl hover:scale-105 transition-all max-w-md mx-auto relative"
            >
              <span className="absolute -top-3 bg-yellow-400 text-yellow-950 font-extrabold text-xs px-3 py-1 rounded-full shadow border border-yellow-200 animate-bounce">
                🌟 SECRET EASTER EGG UNLOCKED! 🌟
              </span>

              <div className="text-5xl my-2">👑🎁✨</div>
              <h3 className="font-extrabold text-lg text-yellow-900">
                {secretBox.name}
              </h3>
              <p className="text-xs font-bold text-yellow-800 mt-1">
                Unwrap your secret Queen surprise! 👑
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Teddy Host (Trick B) */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <TeddyBear
          isSecret={!isSecretGiftFound}
          onClick={() => {
            if (!isSecretGiftFound && onDiscoverSecretGift) {
              onDiscoverSecretGift();
            }
          }}
          label={isSecretGiftFound ? "Secret Teddy 🧸" : "Find my secret star! 🌟"}
        />
      </div>

      {/* Unlock Finale Stage Button */}
      {isAllMainGiftsOpened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="mt-6 text-center space-y-3"
        >
          <p className="font-extrabold text-lg text-rose-800 animate-pulse">
            "One last surprise is waiting for you..." 💖✨
          </p>
          <motion.button
            type="button"
            onClick={onComplete}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="px-8 py-4 rounded-full font-extrabold text-lg text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-xl pink-shadow border-2 border-white cursor-pointer flex items-center gap-2 mx-auto"
          >
            <span>ENTER THE GRAND BIRTHDAY UNIVERSE</span>
            <span className="text-xl">👑</span>
          </motion.button>
        </motion.div>
      )}

      {/* Fake Loading Animation Overlay */}
      {isLoadingGift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-900/40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 rounded-3xl border-3 border-pink-300 shadow-2xl text-center space-y-4 max-w-sm"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 border-4 border-rose-400 flex items-center justify-center text-3xl animate-bounce">
              🎁
            </div>
            <p className="font-extrabold text-lg text-rose-800">
              {loadingSteps[loadingTextIndex]}
            </p>
          </motion.div>
        </div>
      )}

      {/* Gift Modal Content */}
      <Modal
        isOpen={!!activeGiftModal}
        onClose={() => setActiveGiftModal(null)}
        title={activeGiftModal?.title}
      >
        {activeGiftModal && (
          <div className="space-y-4 text-center">
            <div className="text-5xl my-2">
              {activeGiftModal.icon}
            </div>
            <span className="inline-block bg-rose-100 text-rose-800 font-extrabold text-xs px-3 py-1 rounded-full border border-pink-200">
              {activeGiftModal.badge}
            </span>
            <p className="text-base md:text-lg font-bold text-rose-900 bg-pink-50 p-5 rounded-2xl border border-pink-200 leading-relaxed">
              "{activeGiftModal.content}"
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
