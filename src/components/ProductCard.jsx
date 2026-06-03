import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

export default function ProductCard({ product, index = 0, large = false }) {
  const priceValue = product.price ?? product.price_formatted ?? product.price_display ?? '';
  const precio = typeof priceValue === 'number'
    ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(priceValue)
    : priceValue;

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
        background:   '#ffffff',
        display:      'flex',
        flexDirection: 'column',
        alignItems:   'center',
        textAlign:    'center',
        cursor:       'pointer',
        padding:      '28px 24px 32px',
        borderRadius: '28px',
        border:       '1px solid rgba(15,23,42,0.08)',
        boxShadow:    '0 18px 38px rgba(15,23,42,0.08)',
        minHeight:    '100%',
        overflow:     'hidden',
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

      <Link to={`/product/${product.id}`} className="no-underline" style={{ width: '100%' }}>
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize:      large ? '1.8rem' : '1.4rem',
            fontWeight:    700,
            letterSpacing: '-0.04em',
            color:         '#111827',
            lineHeight:    1.15,
            marginBottom:  12,
            fontFamily:    'inherit',
          }}
          className="tracking-tighter"
        >
          {product.displayName || product.name.replace('\n', ' ')}
        </motion.h3>
      </Link>

      {precio ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            fontSize:      15,
            fontWeight:    700,
            color:         '#111827',
            lineHeight:    1.4,
            marginBottom:  large ? 28 : 24,
            fontFamily:    'inherit',
          }}
        >
          {precio}
        </motion.p>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 'auto' }}
      >
        <Link to={`/product/${product.id}`} style={{
          padding:        '12px 26px',
          borderRadius:   '999px',
          background:     '#111827',
          color:          '#f8fafc',
          fontSize:       14,
          fontWeight:     600,
          textDecoration: 'none',
          fontFamily:     'inherit',
          transition:     'all 0.3s ease',
          border:         '1px solid rgba(17,24,39,0.1)',
        }}
        className="hover:bg-[#0f172a] hover:scale-105"
        >
          Ver detalles
        </Link>
      </motion.div>
    </motion.article>
  );
}
