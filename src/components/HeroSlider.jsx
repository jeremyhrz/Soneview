import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const INTERVAL_MS = 6000;

const textVariants = {
  enter: (d) => ({ opacity: 0, y: 20 }),
  center: { opacity: 1, y: 0 },
  exit: (d) => ({ opacity: 0, y: -20 })
};

const imgVariants = {
  enter: (d) => ({ opacity: 0, scale: 0.95, y: 20, filter: 'blur(10px)' }),
  center: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' },
  exit: (d) => ({ opacity: 0, scale: 0.95, y: -20, filter: 'blur(10px)' })
};

export default function HeroSlider() {
  const { homeConfig } = useProducts();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  // Mapeamos los slides desde la configuración del panel de inicio
  const slides = homeConfig?.heroSlides?.filter(s => s.title || s.image) || [];

  const next = useCallback(() => {
    if(slides.length <= 1) return;
    setDirection(1);
    setActive((p) => (p + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    if(slides.length <= 1) return;
    setDirection(-1);
    setActive((p) => (p - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goTo = useCallback((idx) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  }, [active]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(next, INTERVAL_MS);
    return () => clearInterval(t);
  }, [next, slides.length]);

  if (slides.length === 0) {
    return (
      <section className="min-h-[85vh] lg:h-screen w-full bg-sv-light flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-4xl rounded-[2.5rem] bg-gradient-to-b from-[#f5f5f7] to-white border border-black/[0.02] flex flex-col items-center justify-center text-center p-16 md:p-24 shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)]">
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Diseño que inspira.<br/>
            <span className="text-slate-400">Próximamente.</span>
          </h3>
          <p className="text-slate-500 font-medium max-w-md mx-auto">
            Estamos preparando nuestra nueva colección para brindarte lo último en tecnología.
          </p>
        </div>
      </section>
    );
  }

  const slide = slides[active];
  
  // Usamos los campos exactos del formulario del AdminDashboard
  const titleMain = slide.title || '';
  const titleAccent = slide.titleAccent || '';
  const subtitle = slide.subtitle || '';
  const imageUrl = slide.image || '';

  return (
    <section className="relative min-h-[85vh] lg:h-screen w-full bg-sv-light flex flex-col overflow-hidden">
      
      {/* Fondo: Glow Sutil Premium */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <motion.div 
          key={`glow-${active}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-[50vw] h-[50vw] bg-[#0071e3] rounded-full blur-[120px]"
        />
      </div>

      <div className="flex-1 flex items-center max-w-[1400px] mx-auto w-full px-6 sm:px-12 lg:px-16 z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          
          {/* Izquierda: Textos Dinámicos */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`text-${active}`}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start"
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#0071e3] mb-4">
                Destacado
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-slate-900 leading-[1.05] mb-6">
                {titleMain} <br />
                <span className="text-[#0071e3]">{titleAccent}</span>
              </h1>

              <p className="text-lg lg:text-xl text-slate-500 font-normal tracking-normal max-w-md mb-10 leading-relaxed line-clamp-3">
                {subtitle}
              </p>

              {/* Botones de Acción Minimalistas */}
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  to="/catalog"
                  className="bg-sv-blue text-white rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-500 ease-in-out hover:bg-black hover:scale-[1.02] hover:shadow-xl hover:shadow-sv-blue/20"
                >
                  Ver Catálogo
                </Link>
                <Link
                  to="/catalog"
                  className="group flex items-center gap-2 text-sm font-semibold text-slate-900 transition-all duration-500 ease-in-out hover:text-[#0071e3]"
                >
                  Explorar todo 
                  <ArrowRight size={16} className="transition-transform duration-500 ease-in-out group-hover:translate-x-1" strokeWidth={2} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Derecha: Imagen del Producto Flotante */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`img-${active}`}
              custom={direction}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center items-center"
            >
              <motion.img
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                src={imageUrl}
                alt={titleMain}
                className="w-full max-w-[450px] lg:max-w-[550px] object-contain drop-shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Controles Inferiores */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 pb-12 z-10 flex items-center justify-between">
        
        {/* Indicadores */}
        <div className="flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500 ease-in-out bg-slate-200"
              style={{ width: i === active ? 32 : 8 }}
            >
              {i === active && (
                <motion.div
                  className="absolute inset-0 bg-slate-900"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
                  style={{ originX: 0 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Flechas Nav */}
        <div className="flex gap-3">
          <button 
            onClick={prev}
            aria-label="Anterior"
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-white transition-all duration-500 ease-in-out"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={next}
            aria-label="Siguiente"
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-white transition-all duration-500 ease-in-out"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
