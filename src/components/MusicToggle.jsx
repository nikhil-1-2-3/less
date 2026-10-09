import React from 'react';
import { motion } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';

export default function MusicToggle({ isPlaying, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-5 right-5 z-40 p-3.5 rounded-full shadow-xl border-2 transition-all flex items-center gap-2 cursor-pointer ${
        isPlaying
          ? 'bg-rose-500 text-white border-pink-200 shadow-rose-300'
          : 'bg-white text-rose-600 border-pink-300 shadow-pink-200'
      }`}
      title={isPlaying ? "Mute Background Music" : "Play Birthday Lullaby Music"}
    >
      {isPlaying ? (
        <>
          <Music className="w-5 h-5 animate-spin-slow" />
          <span className="flex items-center gap-0.5 h-4">
            <span className="w-1 bg-white rounded-full animate-bounce h-2" style={{ animationDelay: '0s' }}></span>
            <span className="w-1 bg-white rounded-full animate-bounce h-4" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-1 bg-white rounded-full animate-bounce h-3" style={{ animationDelay: '0.4s' }}></span>
          </span>
        </>
      ) : (
        <VolumeX className="w-5 h-5 opacity-70" />
      )}
    </motion.button>
  );
}
