import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedDoll from '../components/AnimatedDoll';
import RoyaltyMeter from '../components/RoyaltyMeter';
import { playSound } from '../utils/soundEffects';

export default function FriendshipQuizStage({ config, onComplete, recordQuizAnswer }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', text: string }
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = config.questions;
  const currentQ = questions[currentQIndex];

  const handleSelectOption = (index, option) => {
    setSelectedOption(index);

    if (currentQ.type === 'correct_answer') {
      if (option.isCorrect) {
        playSound('correct');
        playSound('sparkle');
        setFeedback({
          type: 'success',
          text: currentQ.successMessage || "Yay! You know me so well! 💕"
        });
        if (recordQuizAnswer) recordQuizAnswer(currentQ.id, index, true);
      } else {
        playSound('wrong');
        setFeedback({
          type: 'error',
          text: currentQ.retryMessage || "Hehe, try again bestie! 🎀"
        });
        if (recordQuizAnswer) recordQuizAnswer(currentQ.id, index, false);
      }
    } else {
      // Preference question - accepts any selection
      playSound('correct');
      setFeedback({
        type: 'success',
        text: currentQ.successMessage || "Super cute choice! 💕"
      });
      if (recordQuizAnswer) recordQuizAnswer(currentQ.id, index, true);
    }
  };

  const handleNext = () => {
    if (feedback?.type !== 'success') return;

    setSelectedOption(null);
    setFeedback(null);

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      // All questions completed! Trigger bestie royalty scan sequence
      startScanSequence();
    }
  };

  const startScanSequence = () => {
    setIsScanning(true);
    playSound('sparkle');
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < config.scanSteps.length) {
        setScanStep(step);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setIsFinished(true);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] px-4 text-center select-none max-w-3xl mx-auto my-4">
      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block bg-pink-200/80 px-4 py-1.5 rounded-full text-xs md:text-sm font-extrabold text-rose-700 tracking-wider uppercase border border-pink-300 mb-4 shadow-sm"
      >
        🧸 STAGE 02 — THE BESTIE PERSONALITY TEST 💕
      </motion.div>

      {!isScanning && !isFinished ? (
        <div className="w-full">
          {/* Host & Progress Header */}
          <div className="flex items-center justify-between bg-white/70 p-4 rounded-2xl border-2 border-pink-200 mb-6 shadow-sm">
            <div className="flex items-center gap-3">
              <AnimatedDoll expression={feedback?.type === 'error' ? 'shy' : 'happy'} size="sm" />
              <div className="text-left">
                <p className="font-extrabold text-rose-800 text-sm md:text-base">
                  Bestie Quiz Host 🌸
                </p>
                <p className="text-xs text-rose-600 font-semibold">
                  Question {currentQIndex + 1} of {questions.length}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-32 md:w-44 bg-pink-100 h-3.5 rounded-full overflow-hidden border border-pink-300">
              <motion.div
                className="bg-gradient-to-r from-rose-400 to-pink-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question Title Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-6 md:p-8 rounded-3xl border-3 border-pink-300 shadow-xl mb-6 text-center"
            >
              <h2 className="font-extrabold text-xl md:text-3xl text-rose-800 font-display">
                {currentQ.question}
              </h2>

              {/* Answer Choices Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <motion.button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx, option)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`p-4 rounded-2xl font-bold text-sm md:text-base flex items-center justify-between gap-3 border-2 transition-all cursor-pointer ${
                        isSelected
                          ? feedback?.type === 'success'
                            ? 'bg-rose-500 text-white border-white shadow-lg'
                            : 'bg-rose-100 text-rose-900 border-rose-400 animate-shake'
                          : 'bg-white/80 text-rose-800 border-pink-200 hover:border-pink-400 hover:bg-pink-50'
                      }`}
                    >
                      <span className="text-left font-semibold">{option.text}</span>
                      <span className="text-2xl">{option.emoji}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback Alert */}
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-2xl font-bold text-sm md:text-base border-2 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border-rose-300 animate-shake'
                  }`}
                >
                  {feedback.text}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Next Question Button */}
          {feedback?.type === 'success' && (
            <motion.button
              type="button"
              onClick={handleNext}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="px-8 py-3.5 rounded-full font-extrabold text-base text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg pink-shadow border-2 border-white cursor-pointer"
            >
              {currentQIndex < questions.length - 1 ? "NEXT QUESTION ➔" : "RUN ROYALTY SCAN 👑"}
            </motion.button>
          )}
        </div>
      ) : isScanning ? (
        /* Fake Personality Scan Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 md:p-12 rounded-3xl border-3 border-pink-300 shadow-2xl space-y-6 w-full max-w-lg"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 border-4 border-rose-400 flex items-center justify-center text-4xl animate-spin-slow">
            💖
          </div>
          <h2 className="font-extrabold text-2xl text-rose-800 tracking-wide uppercase">
            {config.scanTitle}
          </h2>
          <motion.p
            key={scanStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-bold text-rose-600 bg-pink-100/80 px-4 py-2 rounded-full border border-pink-200 inline-block"
          >
            {config.scanSteps[scanStep]}
          </motion.p>
        </motion.div>
      ) : (
        /* Scan Result Screen with Royalty Meter */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full space-y-6"
        >
          <RoyaltyMeter score={100} />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              type="button"
              onClick={onComplete}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="px-8 py-4 rounded-full font-extrabold text-lg text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-xl pink-shadow border-2 border-white cursor-pointer flex items-center gap-2 mx-auto"
            >
              <span>ENTER MAGICAL BAKERY ROOM</span>
              <span className="text-xl">🎂</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
