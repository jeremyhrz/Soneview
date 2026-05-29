import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/mockData';

/**
 * HeroSlider.jsx
 * Full-screen Apple-style hero carousel.
 * Auto-advances every 6 s. Gradient bg transitions per slide.
 */
const INTERVAL_MS = 6000;

const textVariants = {
  enter:  (d) => ({ opacity: 0, x: d > 0 ? 50 : -50 }),
  center: { opacity: 1, x: 0 },
  exit:   (d) => ({ opacity: 0, x: d > 0 ? -50 : 50 }),
};

const imgVariants = {
  enter:  (d) => ({ opacity: 0, x: d > 0 ? 80 : -80, scale: 0.96 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit:   (d) => ({ opacity: 0, x: d > 0 ? -80 : 80, scale: 0.96 }),
};

const HeroSlider = () => {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((idx) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  }, [active]);

  const next = useCallback(() => {
    setDirection(1);
    setActive(p => (p + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive(p => (p - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, INTERVAL_MS);
    return () => clearInterval(t);
  }, [next]);

  const slide = heroSlides[active];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" aria-label="Hero principal">

      {/* — Animated gradient background — */}
      <motion.div
        key={`bg-${active}`}
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85 }}
        style={{
          background: `linear-gradient(155deg, ${slide.bgFrom} 0%, ${slide.bgTo} 55%, #ffffff 100%)`,
        }}
      />

      {/* — Main content — */}
      <div className="flex-1 flex items-center max-w-[1400px] mx-auto w-full px-6 sm:px-10 lg:px-16 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 w-full items-center">

          {/* Text block */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`text-${active}`}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start"
            >
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-5"
                style={{ color: slide.accentColor }}
              >
                {slide.eyebrow}
              </p>

              <h1 className="text-[clamp(2.8rem,6.5vw,5.5rem)] font-extrabold tracking-[-0.04em] text-sv-blue leading-[1.02] mb-6">
                {slide.title}
                <br />
                <span style={{ color: slide.accentColor }}>{slide.titleAccent}</span>
              </h1>

              <p className="text-[clamp(1rem,1.4vw,1.2rem)] text-sv-blue/58 font-medium leading-relaxed max-w-[420px] mb-10">
                {slide.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={`/product/${slide.productId}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 hover:opacity-90 hover:shadow-xl active:scale-[0.97]"
                  style={{
                    backgroundColor: slide.accentColor,
                    boxShadow: `0 6px 20px ${slide.accentColor}44`,
                  }}
                >
                  {slide.cta}
                </Link>
                <Link
                  to={`/product/${slide.productId}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-sv-blue/65 hover:text-sv-blue transition-all group"
                >
                  {slide.ctaSecondary}
                  <span className="text-lg leading-none transition-transform group-hover:translate-x-1">›</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Product image */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`img-${active}`}
              custom={direction}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full max-w-[520px]"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full object-cover rounded-[2rem] shadow-[0_32px_80px_rgba(0,0,0,0.18)]"
                  style={{ aspectRatio: '4/3' }}
                  loading="eager"
                />
                {/* Color glow overlay */}
                <div
                  className="absolute inset-0 rounded-[2rem] pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top center, ${slide.accentColor}20 0%, transparent 65%)`,
                  }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* — Bottom controls bar — */}
      <div className="flex items-center justify-between max-w-[1400px] mx-auto w-full px-6 sm:px-10 lg:px-16 pb-10">

        {/* Progress dots */}
        <div className="flex items-center gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 bg-sv-blue/15"
              style={{ width: i === active ? 28 : 6 }}
            >
              {i === active && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-sv-blue"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
                  style={{ originX: 0 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm border border-sv-blue/12 flex items-center justify-center text-sv-blue/50 hover:text-sv-blue hover:border-sv-blue/25 transition-all"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm border border-sv-blue/12 flex items-center justify-center text-sv-blue/50 hover:text-sv-blue hover:border-sv-blue/25 transition-all"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
