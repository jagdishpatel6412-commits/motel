import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroSplashProps {
  onComplete?: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Elegant, short 750ms transition
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 750);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-splash"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#332D29] flex flex-col items-center justify-center pointer-events-none text-white select-none px-4"
        >
          {/* Central Luxury Emblem */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center space-y-3"
          >
            {/* Pine Crest Icon with Warm Terracotta Accent */}
            <div className="w-14 h-14 rounded-2xl bg-[#8C6239] flex items-center justify-center text-white shadow-xl border border-[#EAE4D9]/20">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L4 12h3l-3 6h6v4h4v-4h6l-3-6h3L12 2z" />
              </svg>
            </div>

            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-white">
                THE PINECREST
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#EAE4D9]/80 font-light">
                MOTEL &amp; SUITES • BEND, OR
              </div>
            </div>

            {/* Subtle Shimmer Progress Line */}
            <div className="w-24 h-0.5 bg-[#EAE4D9]/20 rounded-full overflow-hidden mt-3">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="w-full h-full bg-[#8C6239]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
