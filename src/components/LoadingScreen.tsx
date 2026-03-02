import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-luxury-black flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 border-2 border-gold-500/20 border-t-gold-500 rounded-full gold-glow mb-8"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <span className="text-3xl font-serif font-bold gold-text-gradient tracking-[0.3em] uppercase mb-2">
          Kohinoor
        </span>
        <span className="text-white/30 text-xs uppercase tracking-[0.5em] font-medium">
          Gorakhpur's Royalty
        </span>
      </motion.div>
    </motion.div>
  );
}
