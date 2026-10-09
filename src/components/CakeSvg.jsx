import React from 'react';
import { motion } from 'framer-motion';

export default function CakeSvg({
  flavor = 'strawberry',
  decoration = 'strawberries',
  candleColor = 'rosegold',
  isLit = false,
  isBlownOut = false,
  onClickCandle
}) {
  const flavorColors = {
    strawberry: { base: '#FF75AA', top: '#FFB6D5', icing: '#FFFFFF', inner: '#F28CB5' },
    vanilla: { base: '#FFF8F0', top: '#FFDDEE', icing: '#F28CB5', inner: '#FFE5EC' },
    chocolate: { base: '#793D5C', top: '#F28CB5', icing: '#FF75AA', inner: '#5C2D44' },
    matcha: { base: '#B5E2FA', top: '#E8DFFF', icing: '#FFFFFF', inner: '#A0C4FF' },
    lavender: { base: '#E8DFFF', top: '#F28CB5', icing: '#FFF8F0', inner: '#C8B6FF' },
  }[flavor] || { base: '#FF75AA', top: '#FFB6D5', icing: '#FFFFFF', inner: '#F28CB5' };

  const candlePaints = {
    rosegold: '#F28CB5',
    lavender: '#E8DFFF',
    strawberry: '#FF75AA',
    rainbow: '#FFD700'
  }[candleColor] || '#F28CB5';

  return (
    <div className="relative w-64 h-72 md:w-80 md:h-88 mx-auto my-4 select-none">
      {/* Smoke particles when candles are blown out */}
      {isBlownOut && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex gap-4">
          <motion.div
            initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -40, scale: 2 }}
            transition={{ duration: 1.5 }}
            className="text-2xl"
          >
            💨
          </motion.div>
          <motion.div
            initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -50, scale: 2.5 }}
            transition={{ duration: 1.8, delay: 0.2 }}
            className="text-2xl"
          >
            ✨
          </motion.div>
        </div>
      )}

      <svg
        viewBox="0 0 300 340"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Glowing Cake Stand */}
        <ellipse cx="150" cy="315" rx="125" ry="18" fill="#FFDDEE" stroke="#FF75AA" strokeWidth="3" />
        <path d="M 125 315 L 120 335 L 180 335 L 175 315 Z" fill="#FFF8F0" stroke="#FF75AA" strokeWidth="3" />
        <ellipse cx="150" cy="335" rx="35" ry="5" fill="#FFB6D5" />

        {/* BOTTOM TIER CAKE */}
        <path
          d="M 50 210 L 50 285 Q 150 325 250 285 L 250 210 Z"
          fill={flavorColors.base}
          stroke="#793D5C"
          strokeWidth="3"
        />
        <ellipse cx="150" cy="210" rx="100" ry="25" fill={flavorColors.top} stroke="#793D5C" strokeWidth="3" />

        {/* Bottom Tier Icing Drippings */}
        <path
          d="M 50 210 Q 75 240 100 210 Q 125 245 150 210 Q 175 240 200 210 Q 225 245 250 210 Q 150 235 50 210 Z"
          fill={flavorColors.icing}
        />

        {/* TOP TIER CAKE */}
        <path
          d="M 80 135 L 80 195 Q 150 225 220 195 L 220 135 Z"
          fill={flavorColors.inner}
          stroke="#793D5C"
          strokeWidth="3"
        />
        <ellipse cx="150" cy="135" rx="70" ry="20" fill={flavorColors.top} stroke="#793D5C" strokeWidth="3" />

        {/* Top Tier Icing Drippings */}
        <path
          d="M 80 135 Q 100 160 115 135 Q 135 165 150 135 Q 170 160 185 135 Q 205 160 220 135 Q 150 155 80 135 Z"
          fill={flavorColors.icing}
        />

        {/* TOPPING DECORATIONS */}
        {decoration === 'strawberries' && (
          <g>
            <circle cx="115" cy="125" r="9" fill="#FF4D6D" />
            <circle cx="150" cy="122" r="11" fill="#FF4D6D" />
            <circle cx="185" cy="125" r="9" fill="#FF4D6D" />
            <circle cx="113" cy="122" r="2" fill="#FFFFFF" />
            <circle cx="148" cy="118" r="2.5" fill="#FFFFFF" />
            <circle cx="183" cy="122" r="2" fill="#FFFFFF" />
          </g>
        )}

        {decoration === 'sprinkles' && (
          <g>
            <path d="M 100 145 C 95 135 105 130 110 140 Z" fill="#FF75AA" />
            <path d="M 135 140 C 130 130 140 125 145 135 Z" fill="#E8DFFF" />
            <path d="M 165 142 C 160 132 170 127 175 137 Z" fill="#FFD700" />
            <path d="M 190 148 C 185 138 195 133 200 143 Z" fill="#FFB6D5" />
          </g>
        )}

        {decoration === 'bows' && (
          <g>
            <path d="M 150 132 Q 135 120 138 135 Z" fill="#FF75AA" />
            <path d="M 150 132 Q 165 120 162 135 Z" fill="#FF75AA" />
            <circle cx="150" cy="132" r="4" fill="#FFFFFF" />
          </g>
        )}

        {decoration === 'stars' && (
          <g>
            <path d="M 115 125 L 118 118 L 125 118 L 120 122 L 122 128 L 115 124 L 108 128 L 110 122 L 105 118 L 112 118 Z" fill="#FFD700" />
            <path d="M 150 120 L 153 113 L 160 113 L 155 117 L 157 123 L 150 119 L 143 123 L 145 117 L 140 113 L 147 113 Z" fill="#FFD700" />
            <path d="M 185 125 L 188 118 L 195 118 L 190 122 L 192 128 L 185 124 L 178 128 L 180 122 L 175 118 L 182 118 Z" fill="#FFD700" />
          </g>
        )}

        {decoration === 'bunnies' && (
          <g>
            <ellipse cx="150" cy="120" rx="10" ry="8" fill="#FFFFFF" />
            <ellipse cx="145" cy="108" rx="3" ry="8" fill="#FFFFFF" />
            <ellipse cx="155" cy="108" rx="3" ry="8" fill="#FFFFFF" />
            <circle cx="147" cy="119" r="1.5" fill="#793D5C" />
            <circle cx="153" cy="119" r="1.5" fill="#793D5C" />
          </g>
        )}

        {/* CANDLES */}
        {/* Candle 1 */}
        <rect x="110" y="75" width="10" height="48" rx="4" fill={candlePaints} stroke="#793D5C" strokeWidth="1.5" />
        <rect x="110" y="80" width="10" height="4" fill="#FFFFFF" />
        <rect x="110" y="96" width="10" height="4" fill="#FFFFFF" />
        <line x1="115" y1="75" x2="115" y2="67" stroke="#793D5C" strokeWidth="2" />

        {/* Candle 2 (Center Big Candle) */}
        <rect x="145" y="60" width="10" height="63" rx="4" fill={candlePaints} stroke="#793D5C" strokeWidth="1.5" />
        <rect x="145" y="68" width="10" height="4" fill="#FFFFFF" />
        <rect x="145" y="86" width="10" height="4" fill="#FFFFFF" />
        <line x1="150" y1="60" x2="150" y2="52" stroke="#793D5C" strokeWidth="2" />

        {/* Candle 3 */}
        <rect x="180" y="75" width="10" height="48" rx="4" fill={candlePaints} stroke="#793D5C" strokeWidth="1.5" />
        <rect x="180" y="80" width="10" height="4" fill="#FFFFFF" />
        <rect x="180" y="96" width="10" height="4" fill="#FFFFFF" />
        <line x1="185" y1="75" x2="185" y2="67" stroke="#793D5C" strokeWidth="2" />

        {/* FLAMES (Shown when lit & not blown out) */}
        {isLit && !isBlownOut && (
          <g className="cursor-pointer" onClick={onClickCandle}>
            {/* Flame 1 */}
            <motion.path
              d="M 115 67 C 108 55 115 45 115 45 C 115 45 122 55 115 67 Z"
              fill="#FFA500"
              animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx="115" cy="60" r="3" fill="#FFD700" />

            {/* Flame 2 */}
            <motion.path
              d="M 150 52 C 141 38 150 28 150 28 C 150 28 159 38 150 52 Z"
              fill="#FFA500"
              animate={{ scale: [1, 1.25, 1], y: [0, -3, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx="150" cy="44" r="4" fill="#FFD700" />

            {/* Flame 3 */}
            <motion.path
              d="M 185 67 C 178 55 185 45 185 45 C 185 45 192 55 185 67 Z"
              fill="#FFA500"
              animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx="185" cy="60" r="3" fill="#FFD700" />
          </g>
        )}
      </svg>
    </div>
  );
}
