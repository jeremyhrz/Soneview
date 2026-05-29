import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reveal.jsx
 * Scroll-triggered fade-in + slide-up animation wrapper.
 * Usage: <Reveal delay={0.1}><YourComponent /></Reveal>
 */
const Reveal = ({
  children,
  delay    = 0,
  duration = 0.8,
  y        = 36,
  once     = true,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
