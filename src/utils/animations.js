// Reusable Framer Motion variants for Pink Dreamland

export const fadeInSpring = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 260, damping: 20 } 
  },
  exit: { opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.25 } }
};

export const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const itemSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 220, damping: 18 } 
  }
};

export const floatingVariants = {
  animate: {
    y: [-6, 6, -6],
    rotate: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const pulseScale = {
  hover: { scale: 1.06, transition: { type: 'spring', stiffness: 400, damping: 10 } },
  tap: { scale: 0.94 }
};

export const giftBoxVariants = {
  idle: { y: 0, rotate: 0 },
  hover: { y: -8, rotate: [0, -3, 3, -2, 0], transition: { duration: 0.4 } },
  open: { 
    scale: [1, 1.15, 0.95, 1], 
    rotate: [0, -10, 10, 0],
    transition: { duration: 0.6 }
  }
};

export const envelopeVariants = {
  closed: { scale: 1, rotateY: 0 },
  opening: { scale: 1.05, rotateY: 180, transition: { duration: 0.6 } }
};
