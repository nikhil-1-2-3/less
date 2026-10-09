import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../components/Modal';
import { playSound } from '../utils/soundEffects';

export default function ScrapbookStage({ config, onComplete }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedChallengeIdx, setSelectedChallengeIdx] = useState(null);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);

  const memories = config.memories;
  const challenge = config.memoryChallenge;

  const handleOpenPhoto = (mem) => {
    playSound('pop');
    setSelectedPhoto(mem);
  };

  const handleSelectChallenge = (idx) => {
    playSound('correct');
    setSelectedChallengeIdx(idx);
    setIsChallengeCompleted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] px-4 text-center select-none max-w-5xl mx-auto my-4">
      {/* Stage Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block bg-pink-200/80 px-4 py-1.5 rounded-full text-xs md:text-sm font-extrabold text-rose-700 tracking-wider uppercase border border-pink-300 mb-2 shadow-sm"
      >
        📸 STAGE 04 — THE FRIENDSHIP MEMORY GARDEN 🎀
      </motion.div>

      <h2 className="font-extrabold text-3xl md:text-5xl text-rose-800 font-display mb-2">
        {config.title}
      </h2>
      <p className="text-sm md:text-base text-rose-700 font-semibold max-w-lg mb-8">
        {config.subtitle}
      </p>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-10">
        {memories.map((mem) => (
          <motion.div
            key={mem.id}
            onClick={() => handleOpenPhoto(mem)}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            style={{ transform: `rotate(${mem.rotation || 0}deg)` }}
            className="bg-white p-4 pb-6 rounded-2xl shadow-xl border-2 border-pink-200 cursor-pointer relative group transition-all"
          >
            {/* Pink Washi Tape Accent */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-pink-300/60 backdrop-blur-xs border border-pink-400/40 rotate-[-2deg] shadow-xs z-10" />

            {/* Sticker Icon */}
            <span className="absolute top-2 right-2 text-2xl z-10 drop-shadow-sm">
              {mem.sticker}
            </span>

            {/* Polaroid Photo Frame */}
            <div className="w-full h-52 bg-pink-50 rounded-xl overflow-hidden mb-3 relative">
              <img
                src={mem.image}
                alt={mem.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Handwritten Caption */}
            <h3 className="font-display font-extrabold text-lg text-rose-900 leading-tight">
              {mem.title}
            </h3>
            <p className="font-handwriting text-xl text-rose-600 mt-1">
              {mem.date}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Interactive Memory Challenge Card */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border-3 border-pink-300 shadow-2xl max-w-2xl w-full text-center my-4">
        <h3 className="font-extrabold text-xl md:text-2xl text-rose-800 mb-2 flex items-center justify-center gap-2">
          <span>💖</span> Memory Challenge
        </h3>
        <p className="text-sm font-bold text-rose-700 mb-4">
          {challenge.question}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {challenge.options.map((optionText, idx) => {
            const isSelected = selectedChallengeIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectChallenge(idx)}
                className={`p-3.5 rounded-2xl text-xs md:text-sm font-bold border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500 text-white border-white shadow-md'
                    : 'bg-white/80 text-rose-800 border-pink-200 hover:bg-pink-100'
                }`}
              >
                {optionText}
              </button>
            );
          })}
        </div>

        {isChallengeCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-800 font-extrabold text-sm"
          >
            {challenge.rewardMessage}
          </motion.div>
        )}
      </div>

      {/* Unlock Stage 5 Button */}
      <motion.button
        type="button"
        onClick={onComplete}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="px-8 py-4 rounded-full font-extrabold text-lg text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-xl pink-shadow border-2 border-white cursor-pointer flex items-center gap-2 mt-6"
      >
        <span>ENTER SECRET GIFT LAB</span>
        <span className="text-xl">🎁</span>
      </motion.button>

      {/* Polaroid Expanded Memory Modal */}
      <Modal
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        title={selectedPhoto?.title}
      >
        {selectedPhoto && (
          <div className="space-y-4 text-center">
            <div className="w-full h-72 rounded-2xl overflow-hidden shadow-md border-2 border-pink-200">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-handwriting text-3xl text-rose-700">
              {selectedPhoto.date}
            </p>
            <p className="text-base font-semibold text-rose-900 bg-pink-100/70 p-4 rounded-2xl border border-pink-200 leading-relaxed">
              "{selectedPhoto.caption}"
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
