import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CakeSvg from '../components/CakeSvg';
import AnimatedDoll from '../components/AnimatedDoll';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export default function CakeStage({ config, cakeState, updateCake, onComplete }) {
  const [flavor, setFlavor] = useState(cakeState.flavor || 'strawberry');
  const [decoration, setDecoration] = useState(cakeState.decoration || 'strawberries');
  const [candleColor, setCandleColor] = useState(cakeState.candleColor || 'rosegold');
  const [isLit, setIsLit] = useState(cakeState.isLit || false);
  const [wish, setWish] = useState(cakeState.wish || '');
  const [isBlownOut, setIsBlownOut] = useState(cakeState.isBlownOut || false);

  const handleLightCandles = () => {
    playSound('sparkle');
    setIsLit(true);
    updateCake({ isLit: true });
  };

  const handleBlowCandles = () => {
    if (!isLit) return;
    playSound('blow');
    setIsBlownOut(true);
    updateCake({ isBlownOut: true });

    // Trigger confetti explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF75AA', '#FFB6D5', '#FFD700', '#E8DFFF']
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] px-4 text-center select-none max-w-4xl mx-auto my-4">
      {/* Stage Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block bg-pink-200/80 px-4 py-1.5 rounded-full text-xs md:text-sm font-extrabold text-rose-700 tracking-wider uppercase border border-pink-300 mb-2 shadow-sm"
      >
        🎂 STAGE 03 — THE MAGICAL CAKE ROOM 🧁
      </motion.div>

      <h2 className="font-extrabold text-3xl md:text-5xl text-rose-800 font-display mb-2">
        {config.title}
      </h2>
      <p className="text-sm md:text-base text-rose-700 font-semibold max-w-lg mb-6">
        {config.subtitle}
      </p>

      {/* Main Bakery Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
        {/* Left Side: Customization Controls Panel */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-3xl border-2 border-pink-300 shadow-lg text-left space-y-4">
          <h3 className="font-extrabold text-lg text-rose-800 border-b border-pink-200 pb-2 flex items-center gap-2">
            <span>🎨</span> Bakery Kitchen
          </h3>

          {/* 1. Flavor Selector */}
          <div>
            <label className="block text-xs font-bold text-rose-700 uppercase mb-1.5">
              1. Cake Flavor
            </label>
            <div className="grid grid-cols-2 gap-2">
              {config.flavors.map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => { playSound('pop'); setFlavor(f.id); updateCake({ flavor: f.id }); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    flavor === f.id
                      ? 'bg-rose-500 text-white border-white shadow'
                      : 'bg-white/80 text-rose-800 border-pink-200 hover:bg-pink-100'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Decoration Selector */}
          <div>
            <label className="block text-xs font-bold text-rose-700 uppercase mb-1.5">
              2. Topping Decoration
            </label>
            <div className="grid grid-cols-2 gap-2">
              {config.decorations.map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => { playSound('pop'); setDecoration(d.id); updateCake({ decoration: d.id }); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    decoration === d.id
                      ? 'bg-rose-500 text-white border-white shadow'
                      : 'bg-white/80 text-rose-800 border-pink-200 hover:bg-pink-100'
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Candle Color */}
          <div>
            <label className="block text-xs font-bold text-rose-700 uppercase mb-1.5">
              3. Candle Magic
            </label>
            <div className="grid grid-cols-2 gap-2">
              {config.candleColors.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => { playSound('pop'); setCandleColor(c.id); updateCake({ candleColor: c.id }); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    candleColor === c.id
                      ? 'bg-rose-500 text-white border-white shadow'
                      : 'bg-white/80 text-rose-800 border-pink-200 hover:bg-pink-100'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Interactive Cake Display */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <CakeSvg
            flavor={flavor}
            decoration={decoration}
            candleColor={candleColor}
            isLit={isLit}
            isBlownOut={isBlownOut}
            onClickCandle={handleBlowCandles}
          />

          {!isLit ? (
            <motion.button
              type="button"
              onClick={handleLightCandles}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="px-6 py-3 rounded-full font-extrabold text-base text-white bg-gradient-to-r from-amber-400 to-rose-500 shadow-lg border-2 border-white cursor-pointer mt-2 flex items-center gap-2"
            >
              <span>LIGHT THE CANDLES 🕯️🔥</span>
            </motion.button>
          ) : !isBlownOut ? (
            <motion.button
              type="button"
              onClick={handleBlowCandles}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="px-6 py-3 rounded-full font-extrabold text-base text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg border-2 border-white cursor-pointer mt-2 flex items-center gap-2 animate-pulse"
            >
              <span>MAKE A WISH & BLOW CANDLES 💨✨</span>
            </motion.button>
          ) : (
            <div className="bg-emerald-100 border-2 border-emerald-300 text-emerald-800 font-extrabold px-5 py-2 rounded-full text-sm shadow mt-2">
              🎉 CANDLES BLOWN OUT! WISH IS SEALED! 🎉
            </div>
          )}
        </div>

        {/* Right Side: Secret Wish Box & Host */}
        <div className="lg:col-span-3 flex flex-col items-center space-y-4">
          <AnimatedDoll expression={isBlownOut ? 'excited' : 'happy'} isDancing={isBlownOut} size="md" />

          {/* Secret Wish Input */}
          <div className="w-full glass-panel p-4 rounded-3xl border-2 border-pink-300 text-left shadow-sm">
            <label className="block text-xs font-bold text-rose-800 mb-1.5">
              ✨ Your Birthday Wish:
            </label>
            <textarea
              rows={3}
              value={wish}
              onChange={(e) => { setWish(e.target.value); updateCake({ wish: e.target.value }); }}
              placeholder={config.wishPlaceholder}
              className="w-full p-2.5 rounded-xl border border-pink-300 text-xs font-medium text-rose-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Reveal Wish Message Card when candles blown out */}
      <AnimatePresence>
        {isBlownOut && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-panel p-6 md:p-8 rounded-3xl border-3 border-pink-300 shadow-2xl mt-8 max-w-xl w-full"
          >
            <h3 className="font-extrabold text-xl md:text-2xl text-rose-800 mb-2">
              "Close your eyes, make a wish, and keep it in your heart. ✨"
            </h3>
            {wish && (
              <p className="text-sm font-bold text-rose-700 italic bg-pink-100/80 p-3 rounded-2xl border border-pink-200 my-3">
                "{wish}"
              </p>
            )}
            <p className="text-xs text-rose-600 font-semibold mb-6">
              May every star in the sky align to make your wish come true today! 🌟💖
            </p>

            <motion.button
              type="button"
              onClick={onComplete}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="px-8 py-4 rounded-full font-extrabold text-lg text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-xl pink-shadow border-2 border-white cursor-pointer flex items-center gap-2 mx-auto"
            >
              <span>ENTER FRIENDSHIP SCRAPBOOK</span>
              <span className="text-xl">📸</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
