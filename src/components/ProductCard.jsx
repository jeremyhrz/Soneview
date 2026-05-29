import React from 'react';
import { Link }                    from 'react-router-dom';
import { motion }                  from 'framer-motion';
import { categories }              from '../data/mockData';

/**
 * ProductCard.jsx — Lujo Extremo Apple Style
 * ─────────────────────────────────────────────────
 * El producto FLOTA sobre el fondo crema con sombra sutil.
 * NO hay tarjetas con bordes. El producto es el protagonista.
 *
 * Estructura Apple Premium:
 *   1. Imagen con object-contain y filtro premium
 *   2. Badge minimalista
 *   3. Nombre masivo con tracking-tighter
 *   4. Descripción corta - gris sutil
 *   5. CTAs cápsula refinadas
 *
 * El "container" es transparente — la tarjeta ES el producto.
 */

const ACCENT = {
  tv:        '#0ea5e9',
  computing: '#8b5cf6',
  air:       '#10b981',
  fridge:    '#06b6d4',
  audio:     '#ec4899',
  kitchen:   '#f59e0b',
  washer:    '#6366f1',
  freezer:   '#3b82f6',
};

const BADGE_STYLE = {
  'Flagship':    { color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.08)' },
  'Elite':       { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)' },
  'Best Seller': { color: '#10b981', bg: 'rgba(16, 185, 129, 0.08)' },
  'Nuevo':       { color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.08)' },
  'Eficiente':   { color: '#10b981', bg: 'rgba(16, 185, 129, 0.08)' },
};

export default function ProductCard({ product, index = 0, large = false }) {
  const accent   = ACCENT[product.category] || '#2997ff';
  const badge    = BADGE_STYLE[product.badge] || null;
  const catLabel = categories.find(c => c.id === product.category)?.label || product.category;

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{
        duration: 1.2,
        delay: Math.min(index * 0.1, 0.6),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
      style={{
        /* ─── Producto flotante con sombra sutil ─── */
        background:   'transparent',
        display:      'flex',
        flexDirection: 'column',
        alignItems:   'center',
        textAlign:    'center',
        cursor:       'pointer',
        padding:      large ? '0 0 32px' : '0 0 24px',
        filter:       'drop-shadow(0 2px 4px rgba(0,0,0,0.01)) drop-shadow(0 8px 32px rgba(0,0,0,0.04))',
      }}
    >
      {/* ── Product image — anti-gravity effect ── */}
      <Link to={`/product/${product.id}`} className="block w-full no-underline">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
          className="relative"
          style={{
            width:          '100%',
            aspectRatio:    large ? '4/3' : '1/1',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            marginBottom:   large ? 40 : 32,
            overflow:       'hidden',
            borderRadius:   '3rem',
            animation:      'anti-gravity 8s ease-in-out infinite',
          }}
        >
          {/* Fondo sutil para imágenes con fondo */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(240,231,213,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            borderRadius: '3rem',
          }} />
          
          <img
            src={product.image}
            alt={product.displayName || product.name}
            style={{
              width:      '90%',
              height:     '90%',
              objectFit:  'contain',
              display:    'block',
              filter:     'brightness(1.02) contrast(1.05) saturate(1.1)',
              mixBlendMode: 'multiply',
              position:   'relative',
              zIndex:     1,
            }}
            loading="lazy"
            className="transition-all duration-700 group-hover:scale-105"
          />
        </motion.div>
      </Link>

      {/* ── Badge — minimalista Apple style ── */}
      {badge && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize:      10,
            fontWeight:    700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color:         badge.color,
            background:    badge.bg,
            padding:       '4px 12px',
            borderRadius:  '99px',
            marginBottom:  12,
            fontFamily:    'inherit',
          }}
        >
          {product.badge}
        </motion.p>
      )}

      {/* ── Product name — masivo con tracking-tighter ── */}
      <Link to={`/product/${product.id}`} className="no-underline">
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize:      large ? '2rem' : '1.5rem',
            fontWeight:    700,
            letterSpacing: '-0.05em',
            color:         '#212844',
            lineHeight:    1.1,
            marginBottom:  12,
            fontFamily:    'inherit',
          }}
          className="tracking-tighter"
        >
          {product.displayName || product.name.replace('\n', ' ')}
        </motion.h3>
      </Link>

      {/* ── Short description — gris sutil Apple ── */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          fontSize:      large ? 15 : 14,
          fontWeight:    400,
          color:         'rgba(33,40,68,0.6)',
          lineHeight:    1.6,
          maxWidth:      280,
          marginBottom:  large ? 24 : 20,
          fontFamily:    'inherit',
        }}
        className="tracking-tight"
      >
        {product.shortDesc}
      </motion.p>

      {/* ── CTAs — cápsula refinada Apple ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Link to={`/product/${product.id}`} style={{
          padding:        '10px 24px',
          borderRadius:   '99px',
          background:     '#212844',
          color:          '#f0e7d5',
          fontSize:       14,
          fontWeight:     600,
          textDecoration: 'none',
          fontFamily:     'inherit',
          whiteSpace:     'nowrap',
          border:         '1px solid rgba(33,40,68,0.1)',
          transition:     'all 0.3s ease',
        }}
        className="hover:bg-[#1a1f36] hover:scale-105"
        >
          Comprar
        </Link>
        <Link to={`/product/${product.id}`} style={{
          fontSize:       14,
          fontWeight:     500,
          color:          '#212844',
          textDecoration: 'none',
          fontFamily:     'inherit',
          display:        'flex',
          alignItems:     'center',
          gap:            4,
          whiteSpace:     'nowrap',
          opacity:        0.8,
          transition:     'all 0.3s ease',
        }}
        className="hover:opacity-100 hover:gap-6"
        >
          Más información <span style={{ fontSize: 16, transition: 'all 0.3s ease' }} className="group-hover:translate-x-1">›</span>
        </Link>
      </motion.div>
    </motion.article>
  );
}
