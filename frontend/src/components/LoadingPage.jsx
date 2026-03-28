import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const text = "PRINT MODULE";

// Bouncing bubble variant
const bubbleVariants = {
  animate: {
    y: [0, -20, 20, 0],
    scale: [1, 1.1, 0.9, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Text animation variants
const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const generateBubbles = (count) => {
  return Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * 60 + 40; // 40px to 100px
    const top = Math.random() * 90; // percentage
    const left = Math.random() * 90;
    const delay = Math.random() * 2;

    return (
      <motion.div
        key={i}
        variants={bubbleVariants}
        animate="animate"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
        }}
        className="absolute rounded-full bg-blue-600 opacity-30"
      />
    );
  });
};

const LoadingPage = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[999] bg-blue-400 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          {/* Animated bubbles */}
          {generateBubbles(10)}

          {/* Animated text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex gap-1 sm:gap-2 flex-wrap justify-center z-10"
          >
            {text.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className="text-3xl sm:text-5xl font-serif tracking-widest text-[#3B2A1A]"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingPage;
