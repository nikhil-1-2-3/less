import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="glass-panel w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl relative border-3 border-pink-300 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-4 border-b border-pink-200 pb-3">
            {title && (
              <h3 className="font-extrabold text-xl md:text-2xl text-rose-800 flex items-center gap-2">
                {title}
              </h3>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-pink-100 text-rose-700 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer ml-auto"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-rose-900">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
