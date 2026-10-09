import { useState, useEffect } from 'react';

const STORAGE_KEY = 'pink_dreamland_progress_v1';

export function useBirthdayProgress() {
  const [currentStage, setCurrentStage] = useState(1); // Stages 1 to 6
  const [unlockedStage, setUnlockedStage] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [isQuizPassed, setIsQuizPassed] = useState(false);
  const [cakeCustomization, setCakeCustomization] = useState({
    flavor: 'strawberry',
    decoration: 'strawberries',
    candleColor: 'rosegold',
    isLit: false,
    wish: '',
    isBlownOut: false,
  });
  const [selectedMemoryId, setSelectedMemoryId] = useState(null);
  const [openedGifts, setOpenedGifts] = useState([]);
  const [isSecretGiftFound, setIsSecretGiftFound] = useState(false);
  const [isSecretGiftOpened, setIsSecretGiftOpened] = useState(false);

  // Restore state from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.unlockedStage) setUnlockedStage(data.unlockedStage);
        if (data.currentStage) setCurrentStage(data.currentStage);
        if (data.quizAnswers) setQuizAnswers(data.quizAnswers);
        if (data.isQuizPassed) setIsQuizPassed(data.isQuizPassed);
        if (data.cakeCustomization) setCakeCustomization(data.cakeCustomization);
        if (data.selectedMemoryId) setSelectedMemoryId(data.selectedMemoryId);
        if (data.openedGifts) setOpenedGifts(data.openedGifts);
        if (data.isSecretGiftFound) setIsSecretGiftFound(data.isSecretGiftFound);
        if (data.isSecretGiftOpened) setIsSecretGiftOpened(data.isSecretGiftOpened);
      }
    } catch (e) {
      console.warn("Error loading saved state:", e);
    }
  }, []);

  // Save progress
  const saveProgress = (updates) => {
    try {
      const stateToSave = {
        currentStage,
        unlockedStage,
        quizAnswers,
        isQuizPassed,
        cakeCustomization,
        selectedMemoryId,
        openedGifts,
        isSecretGiftFound,
        isSecretGiftOpened,
        ...updates
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn("Error saving progress:", e);
    }
  };

  const unlockNextStage = (nextStageNum) => {
    if (nextStageNum > unlockedStage) {
      setUnlockedStage(nextStageNum);
      setCurrentStage(nextStageNum);
      saveProgress({ unlockedStage: nextStageNum, currentStage: nextStageNum });
    } else {
      setCurrentStage(nextStageNum);
      saveProgress({ currentStage: nextStageNum });
    }
  };

  const goToStage = (stageNum) => {
    if (stageNum <= unlockedStage) {
      setCurrentStage(stageNum);
      saveProgress({ currentStage: stageNum });
    }
  };

  const recordQuizAnswer = (qId, optionIdx, isCorrect) => {
    const updatedAnswers = { ...quizAnswers, [qId]: { optionIdx, isCorrect } };
    setQuizAnswers(updatedAnswers);
    saveProgress({ quizAnswers: updatedAnswers });
  };

  const updateCake = (updates) => {
    const updatedCake = { ...cakeCustomization, ...updates };
    setCakeCustomization(updatedCake);
    saveProgress({ cakeCustomization: updatedCake });
  };

  const openGift = (giftId) => {
    if (!openedGifts.includes(giftId)) {
      const updatedGifts = [...openedGifts, giftId];
      setOpenedGifts(updatedGifts);
      saveProgress({ openedGifts: updatedGifts });
    }
  };

  const discoverSecretGift = () => {
    setIsSecretGiftFound(true);
    saveProgress({ isSecretGiftFound: true });
  };

  const resetExperience = () => {
    setCurrentStage(1);
    setUnlockedStage(1);
    setQuizAnswers({});
    setIsQuizPassed(false);
    setCakeCustomization({
      flavor: 'strawberry',
      decoration: 'strawberries',
      candleColor: 'rosegold',
      isLit: false,
      wish: '',
      isBlownOut: false,
    });
    setSelectedMemoryId(null);
    setOpenedGifts([]);
    setIsSecretGiftFound(false);
    setIsSecretGiftOpened(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    currentStage,
    unlockedStage,
    quizAnswers,
    isQuizPassed,
    setIsQuizPassed,
    cakeCustomization,
    selectedMemoryId,
    setSelectedMemoryId,
    openedGifts,
    isSecretGiftFound,
    isSecretGiftOpened,
    setIsSecretGiftOpened,
    unlockNextStage,
    goToStage,
    recordQuizAnswer,
    updateCake,
    openGift,
    discoverSecretGift,
    resetExperience
  };
}
