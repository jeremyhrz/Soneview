import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { heroSlides } from '../data/mockData';
import { useProducts } from '../context/ProductContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * Home.jsx — Landing Page · Nivel Apple
 * ──────────────────────────────────────
 * • Hero Slider full-screen con gradientes animados
 * • Bento Grid de productos destacados
 * • Secciones de categoría con tipografía masiva
 * • Brand strip
 * • export default garantizado
 */

/* ─── HERO SLIDER ──────────────────────────────────── */
const INTERVAL = 6000;

function HeroSlider() {
  const { homeConfig } = useProducts();
  const heroSlides = homeConfig.heroSlides;
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const slide = heroSlides[idx] || heroSlides[0];

  const next = useCallback(() => { setDir(1); setIdx(p => (p + 1) % heroSlides.length); }, []);
  const prev = useCallback(() => { setDir(-1); setIdx(p => (p - 1 + heroSlides.length) % heroSlides.length); }, []);
  const goTo = useCallback((i) => { setDir(i > idx ? 1 : -1); setIdx(i); }, [idx]);

  useEffect(() => { const t = setInterval(next, INTERVAL); return () => clearInterval(t); }, [next]);

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -50 : 50 }),
  };

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* BG gradient */}
      <motion.div
        key={`bg-${idx}`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', inset: 0, zIndex: -1, background: `linear-gradient(155deg, ${slide.bgFrom} 0%, ${slide.bgTo} 55%, #fff 100%)` }}
      />

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', maxWidth: 1400, margin: '0 auto', width: '100%', padding: '100px 48px 40px', gap: 48 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, width: '100%', alignItems: 'center' }}>

          {/* Text */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={`t-${idx}`} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: slide.accentColor, marginBottom: 20 }}>
                {slide.eyebrow}
              </p>
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#212844', lineHeight: 1.02, marginBottom: 24 }}>
                {slide.title}<br />
                <span style={{ color: slide.accentColor }}>{slide.titleAccent}</span>
              </h1>
              <p style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', fontWeight: 500, color: 'rgba(33,40,68,0.55)', lineHeight: 1.6, maxWidth: 400, marginBottom: 36 }}>
                {slide.subtitle}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <Link to={`/product/${slide.productId}`} style={{
                  display: 'inline-flex', alignItems: 'center', padding: '12px 28px', borderRadius: 99,
                  background: slide.accentColor, color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none',
                  boxShadow: `0 6px 20px ${slide.accentColor}44`,
                }}>
                  {slide.cta}
                </Link>
                <Link to={`/product/${slide.productId}#specs`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: 600, color: 'rgba(33,40,68,0.6)', textDecoration: 'none' }}>
                  {slide.ctaSecondary} <span style={{ fontSize: 17 }}>→</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Image */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={`i-${idx}`} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} style={{ maxWidth: 500, width: '100%' }}>
                <img src={slide.image} alt={slide.title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 28, boxShadow: '0 32px 72px rgba(0,0,0,0.16)' }} loading="eager" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1400, margin: '0 auto', width: '100%', padding: '0 48px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} style={{
              height: 5, borderRadius: 99, border: 'none', cursor: 'pointer', transition: 'all 0.3s',
              width: i === idx ? 28 : 6, background: i === idx ? '#212844' : 'rgba(33,40,68,0.18)',
              overflow: 'hidden', position: 'relative', padding: 0,
            }}>
              {i === idx && (
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                  style={{ position: 'absolute', inset: 0, background: '#212844', borderRadius: 99, transformOrigin: 'left' }} />
              )}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[{ fn: prev, icon: <ChevronLeft size={15} /> }, { fn: next, icon: <ChevronRight size={15} /> }].map((btn, i) => (
            <button key={i} onClick={btn.fn} style={{
              width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(33,40,68,0.12)',
              background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(33,40,68,0.5)',
            }}>
              {btn.icon}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURED CARD ────────────────────────────────── */
function FeaturedCard({ product, featured = false, delay = 0 }) {
  if (!product) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      style={{
        background: '#fff', borderRadius: 28, overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.03), 0 12px 40px rgba(0,0,0,0.05)',
        border: '1px solid rgba(0,0,0,0.035)', gridColumn: featured ? 'span 2' : undefined,
      }}
    >
      <div style={{ aspectRatio: featured ? '16/9' : '4/3', overflow: 'hidden', background: '#f5f5f7' }}>
        <img src={product.image_url || product.imagen_url} alt={product.name || product.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>
      <div style={{ padding: 28 }}>
        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#2997ff', marginBottom: 8 }}>{product.category || product.categoria}</p>
        <h3 style={{ fontSize: featured ? 26 : 20, fontWeight: 800, letterSpacing: '-0.03em', color: '#212844', marginBottom: 10, lineHeight: 1.2 }}>{product.name || product.nombre}</h3>
        <p style={{ fontSize: 13, color: 'rgba(33,40,68,0.50)', lineHeight: 1.55, marginBottom: 20 }}>{product.description || product.descripcion}</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link to={`/product/${product.id}`} style={{ padding: '10px 22px', borderRadius: 99, background: '#2997ff', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Ver detalles</Link>
          <Link to={`/product/${product.id}#info`} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: '#2997ff', textDecoration: 'none' }}>Más información <span style={{ fontSize: 16 }}>→</span></Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── REVEAL WRAPPER ───────────────────────────────── */
function Reveal({ children, delay = 0, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  const { products, homeConfig } = useProducts();
  
  // Encontrar productos usando el catálogo en vez de IDs fijos (previene que aparezcan vacíos)
  const featured = products[0] || null;
  const laptop = products.find(p => p.category === 'computing') || products[1] || null;
  const soundbar = products.find(p => p.category === 'audio') || products[2] || null;
  const ac = products.find(p => p.category === 'air') || products[3] || null;
  const fridge = products.find(p => p.category === 'appliances') || products[4] || null;

  const sections = homeConfig.sections.map(sec => ({
    ...sec,
    items: products.filter(p => p.category === sec.cat).slice(0, 3),
    bg: sec.cat === 'tv' ? '#f0e7d5' : sec.cat === 'computing' ? '#ffffff' : '#f0e7d5'
  }));

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, -apple-system, sans-serif', background: '#fff' }}>
      <Navbar />
      <HeroSlider />

      {/* ── BENTO GRID ──────────────────────────────── */}
      <section style={{ padding: '120px 48px', background: '#f0e7d5' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(33,40,68,0.38)', marginBottom: 14 }}>Destacados</p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#212844', lineHeight: 1, marginBottom: 16 }}>Lo mejor de Soneview.</h2>
            <p style={{ fontSize: 18, fontWeight: 500, color: 'rgba(33,40,68,0.50)', maxWidth: 480, margin: '0 auto' }}>Tecnología que se integra perfectamente a tu vida.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            <FeaturedCard product={featured} featured delay={0} />
            <FeaturedCard product={laptop} delay={0.08} />
            <FeaturedCard product={soundbar} delay={0.14} />
            <FeaturedCard product={ac} delay={0.20} />
            <FeaturedCard product={fridge} delay={0.26} />
          </div>
          <Reveal delay={0.3} style={{ textAlign: 'center', marginTop: 56 }}>
            <Link to="/catalog" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 32px', borderRadius: 99, border: '1.5px solid rgba(33,40,68,0.18)',
              background: 'transparent', color: '#212844', fontSize: 15, fontWeight: 700, textDecoration: 'none',
              transition: 'all 0.3s',
            }}>
              Ver catálogo completo <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── CATEGORY SECTIONS ───────────────────────── */}
      {sections.map((sec) => (
        <section key={sec.cat} style={{ padding: '120px 48px', background: sec.bg }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <Reveal style={{ marginBottom: 56 }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2997ff', marginBottom: 14 }}>{sec.eyebrow}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
                <div>
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.035em', color: '#212844', lineHeight: 1.05, marginBottom: 12 }}>{sec.title}</h2>
                  <p style={{ fontSize: 16, fontWeight: 500, color: 'rgba(33,40,68,0.50)', maxWidth: 380 }}>{sec.body}</p>
                </div>
                <Link to={`/catalog?cat=${sec.cat}`} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: 600, color: '#2997ff', textDecoration: 'none' }}>
                  Ver todos <span style={{ fontSize: 16 }}>→</span>
                </Link>
              </div>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(sec.items.length, 3)}, 1fr)`, gap: 20 }}>
              {sec.items.map((p, i) => <FeaturedCard key={p.id} product={p} delay={i * 0.08} />)}
            </div>
          </div>
        </section>
      ))}

      {/* ── BRAND STRIP ─────────────────────────────── */}
      <section style={{ padding: '80px 48px', background: '#212844' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 28 }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,231,213,0.35)' }}>Tecnología que confías</p>
        </Reveal>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {['4K QLED', 'Inverter Gold', 'Dolby Atmos', 'WiFi 6E', 'DDR5', 'RTX 4070', 'HEPA H13'].map(tag => (
            <Reveal key={tag}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(240,231,213,0.45)', letterSpacing: '0.05em' }}>{tag}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
