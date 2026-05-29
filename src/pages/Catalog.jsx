import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid, Tv, Laptop, Wind, Refrigerator,
  Speaker, ChefHat, WashingMachine, Snowflake,
  ChevronLeft, ChevronRight, ChevronRight as ArrowRight,
  Loader,
} from 'lucide-react';
import { categories } from '../data/mockData';
import { productService } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ICON = { LayoutGrid, Tv, Laptop, Wind, Refrigerator, Speaker, ChefHat, WashingMachine, Snowflake };
const ease = [0.16, 1, 0.3, 1];

const ProductCard = ({ product, index }) => {
  // Mapeo al esquema real (English)
  const id = product.id;
  const nombre = product.name;
  const descripcion = product.description;
  const imagen = product.image_url;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, delay: Math.min(index * 0.1, 0.6), ease }}
      style={{
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 0 48px',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.01)) drop-shadow(0 8px 32px rgba(0,0,0,0.04))',
      }}
    >
      <Link to={`/product/${id}`} style={{ display: 'block', width: '100%', textDecoration: 'none' }}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
          style={{
            width: '100%',
            aspectRatio: '1/1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            overflow: 'hidden',
            borderRadius: '2.5rem',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: '#f9f9fb',
            borderRadius: '2.5rem',
          }} />
          
          <img
            src={imagen}
            alt={nombre}
            style={{
              width: '90%',
              height: '90%',
              objectFit: 'contain',
              display: 'block',
              filter: 'brightness(1.02) contrast(1.05) saturate(1.1)',
              mixBlendMode: 'multiply',
              position: 'relative',
              zIndex: 1,
            }}
            loading="lazy"
          />
        </motion.div>
      </Link>

      <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
        <motion.h3
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '-0.05em',
            color: '#212844',
            lineHeight: 1.1,
            marginBottom: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          }}
        >
          {nombre}
        </motion.h3>
      </Link>

      <motion.p
        style={{
          fontSize: '15px',
          fontWeight: 400,
          color: 'rgba(33,40,68,0.6)',
          lineHeight: 1.6,
          maxWidth: '300px',
          marginBottom: '32px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
      >
        {descripcion}
      </motion.p>

      <motion.div style={{ display: 'flex', alignItems: 'center', gap: '24px', justifyContent: 'center' }}>
        <Link 
          to={`/product/${id}`} 
          style={{
            padding: '12px 28px',
            borderRadius: '99px',
            background: '#212844',
            color: '#f0e7d5',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            fontFamily: 'inherit',
            transition: 'all 0.3s ease',
          }}
        >
          Ver detalles
        </Link>
      </motion.div>
    </motion.article>
  );
};

export default function Catalog() {
  const [searchParams, useSearchParams] = [new URLSearchParams(window.location.search), (p) => {}]; // Simplified for update
  const [activeCat, setActiveCat] = useState(searchParams.get('cat') || 'all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data;
        if (searchTerm.trim()) {
          data = await productService.searchProducts(searchTerm);
        } else if (activeCat !== 'all') {
          data = await productService.getProductsByCategory(activeCat);
        } else {
          data = await productService.getAllProducts();
        }
        setProducts(data || []);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCat, searchTerm]);

  const selectCat = (id) => {
    setActiveCat(id);
    const params = new URLSearchParams(window.location.search);
    if (id === 'all') params.delete('cat'); else params.set('cat', id);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayed = products;
  const catLabel = categories.find(c => c.id === activeCat)?.label || 'Todos los productos';

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#1d1d1f' }}>
      <Navbar />
      
      <div style={{ paddingTop: '96px', paddingBottom: '64px', maxWidth: '980px', margin: '0 auto', paddingLeft: '22px', paddingRight: '22px' }}>
        <motion.p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(33,40,68,0.5)', textTransform: 'uppercase', marginBottom: '12px' }}>Catálogo Soneview</motion.p>
        <motion.h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 700, letterSpacing: '-0.06em', color: '#212844', lineHeight: 1 }}>
          {activeCat === 'all' ? 'Todo el catálogo.' : `${catLabel}.`}
        </motion.h1>
      </div>

      <div style={{ position: 'sticky', top: '44px', zIndex: 100, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '12px 0' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', gap: '12px', overflowX: 'auto', padding: '0 22px', scrollbarWidth: 'none' }}>
          {categories.map((cat) => {
            const Icon = ICON[cat.icon] || LayoutGrid;
            const isActive = cat.id === activeCat;
            return (
              <button
                key={cat.id}
                onClick={() => selectCat(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '12px',
                  border: isActive ? 'none' : '1px solid rgba(33,40,68,0.1)',
                  background: isActive ? '#212844' : 'transparent',
                  color: isActive ? '#f0e7d5' : '#212844',
                  cursor: 'pointer', fontSize: '14px', fontWeight: 500, whiteSpace: 'nowrap'
                }}
              >
                <Icon size={18} /> {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <main style={{ padding: '80px 22px', maxWidth: '980px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <Loader className="animate-spin" size={48} style={{ color: '#212844', opacity: 0.3 }} />
            <p style={{ marginTop: '20px', color: 'rgba(33,40,68,0.5)' }}>Cargando catálogo premium...</p>
          </div>
        ) : displayed.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '64px 32px' }}>
            {displayed.map((product, i) => <ProductCard key={product.id || i} product={product} index={i} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'rgba(33,40,68,0.4)' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Próximamente nuevos productos</h3>
            <button onClick={() => selectCat('all')} style={{ padding: '12px 24px', borderRadius: '99px', background: '#212844', color: '#f0e7d5', border: 'none', cursor: 'pointer' }}>Ver todo el catálogo</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}