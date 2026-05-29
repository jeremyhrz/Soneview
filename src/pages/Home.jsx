import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { heroSlides } from '../data/mockData';
import { useProducts } from '../context/ProductContext';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
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

/* ─── FEATURED CARD ────────────────────────────────── */
function FeaturedCard({ product, featured = false, delay = 0 }) {
  if (!product) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-[#f5f5f7] transition-all duration-700 ease-in-out hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.06)] hover:bg-white cursor-pointer ${featured ? 'md:col-span-2' : ''}`}
      style={{ gridColumn: featured ? 'span 2' : undefined }}
    >
      {/* Contenedor Imagen (Efecto Zoom Sutil) */}
      <div className={`relative flex items-center justify-center p-8 mix-blend-multiply ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        <img 
          src={product.image_url || product.imagen_url} 
          alt={product.name || product.nombre} 
          className="w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-[1.03]" 
          loading="lazy" 
        />
      </div>

      {/* Textos y Botón Minimalista */}
      <div className="flex flex-col flex-1 px-10 pb-10">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-3 transition-colors duration-500 group-hover:text-[#0071e3]">
          {product.category || product.categoria}
        </p>
        <h3 className={`font-bold tracking-tight text-slate-900 transition-colors duration-500 mb-6 ${featured ? 'text-3xl' : 'text-xl'}`}>
          {product.name || product.nombre}
        </h3>
        
        <div className="mt-auto pt-2">
          <Link 
            to={`/product/${product.id}`} 
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold transition-all duration-500 ease-in-out hover:bg-[#0071e3] hover:shadow-lg hover:shadow-[#0071e3]/30"
          >
            Ver detalles
            <ArrowRight size={15} />
          </Link>
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
      {sections.map((sec) => {
        if (!sec.items || sec.items.length === 0) return null;
        return (
          <section key={sec.cat} style={{ padding: '120px 48px', background: sec.bg }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              <Reveal style={{ marginBottom: 56 }}>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0071e3', marginBottom: 14 }}>{sec.eyebrow}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
                  <div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.035em', color: '#1d1d1f', lineHeight: 1.05, marginBottom: 12 }}>{sec.title}</h2>
                    <p style={{ fontSize: 16, fontWeight: 500, color: '#86868b', maxWidth: 380 }}>{sec.body}</p>
                  </div>
                  <Link to={`/catalog?cat=${sec.cat}`} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: 600, color: '#0071e3', textDecoration: 'none' }} className="hover:opacity-80 transition-opacity">
                    Ver todos <span style={{ fontSize: 16 }}>→</span>
                  </Link>
                </div>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(320px, 1fr))`, gap: 32 }}>
                {sec.items.map((p, i) => <FeaturedCard key={p.id} product={p} delay={i * 0.08} />)}
              </div>
            </div>
          </section>
        );
      })}

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
