import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { birthdayConfig } from './data/birthdayConfig';
import { useBirthdayProgress } from './hooks/useBirthdayProgress';
import { useAudioPlayer } from './hooks/useAudioPlayer';

import StageProgress from './components/StageProgress';
import MusicToggle from './components/MusicToggle';
import FloatingBalloons from './components/FloatingBalloons';
import FloatingDecorations from './components/FloatingDecorations';
import CursorEffects from './components/CursorEffects';
import ToastMessages from './components/ToastMessages';

import InvitationStage from './stages/InvitationStage';
import FriendshipQuizStage from './stages/FriendshipQuizStage';
import CakeStage from './stages/CakeStage';
import ScrapbookStage from './stages/ScrapbookStage';
import GiftStage from './stages/GiftStage';
import FinaleStage from './stages/FinaleStage';

export default function App() {
  const {
    currentStage,
    unlockedStage,
    recordQuizAnswer,
    cakeCustomization,
    updateCake,
    openedGifts,
    openGift,
    isSecretGiftFound,
    discoverSecretGift,
    unlockNextStage,
    goToStage,
    resetExperience
  } = useBirthdayProgress();

  const { isPlaying, startMusic, toggleMusic } = useAudioPlayer(birthdayConfig.audio.bgmUrl);

  const handleStageComplete = (nextStageNum) => {
    // Start music automatically on user interaction if not started yet
    if (!isPlaying) {
      startMusic();
    }
    unlockNextStage(nextStageNum);
  };

  const handleReplay = () => {
    resetExperience();
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#793D5C] relative overflow-hidden select-none">
      {/* Background Paper Texture & Ambient Gradient */}
      <div className="fixed inset-0 paper-texture pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-pink-100/60 via-transparent to-pink-200/40 pointer-events-none z-0" />

      {/* Floating Interactive Balloons */}
      <FloatingBalloons />

      {/* Floating Sparkles, Butterflies, Clouds & Secret Star Easter Egg */}
      <FloatingDecorations
        onFindSecretStar={discoverSecretGift}
        isSecretStarFound={isSecretGiftFound}
      />

      {/* Cursor Sparkle Trail (Desktop) */}
      <CursorEffects />

      {/* Top Pill Stage Progress Navigation */}
      <StageProgress
        currentStage={currentStage}
        unlockedStage={unlockedStage}
        onSelectStage={goToStage}
      />

      {/* Bottom Floating Ambient Music Control Toggle */}
      <MusicToggle
        isPlaying={isPlaying}
        onToggle={toggleMusic}
      />

      {/* Random Cute Toast Notifications */}
      <ToastMessages messages={birthdayConfig.toastMessages} />

      {/* Main Stage Content Container with Smooth Transitions */}
      <main className="relative z-10 pt-20 pb-16 min-h-screen flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentStage === 1 && (
            <motion.div
              key="stage1"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
            >
              <InvitationStage
                config={birthdayConfig.stage01}
                onComplete={() => handleStageComplete(2)}
                onFindSecretStar={discoverSecretGift}
              />
            </motion.div>
          )}

          {currentStage === 2 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
            >
              <FriendshipQuizStage
                config={birthdayConfig.stage02}
                recordQuizAnswer={recordQuizAnswer}
                onComplete={() => handleStageComplete(3)}
              />
            </motion.div>
          )}

          {currentStage === 3 && (
            <motion.div
              key="stage3"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
            >
              <CakeStage
                config={birthdayConfig.stage03}
                cakeState={cakeCustomization}
                updateCake={updateCake}
                onComplete={() => handleStageComplete(4)}
              />
            </motion.div>
          )}

          {currentStage === 4 && (
            <motion.div
              key="stage4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
            >
              <ScrapbookStage
                config={birthdayConfig.stage04}
                onComplete={() => handleStageComplete(5)}
              />
            </motion.div>
          )}

          {currentStage === 5 && (
            <motion.div
              key="stage5"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
            >
              <GiftStage
                config={birthdayConfig.stage05}
                openedGifts={openedGifts}
                openGift={openGift}
                isSecretGiftFound={isSecretGiftFound}
                onDiscoverSecretGift={discoverSecretGift}
                onComplete={() => handleStageComplete(6)}
              />
            </motion.div>
          )}

          {currentStage === 6 && (
            <motion.div
              key="stage6"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
            >
              <FinaleStage
                config={birthdayConfig.stage06}
                onReplay={handleReplay}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
