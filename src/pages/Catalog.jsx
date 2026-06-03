import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid, Tv, Laptop, Wind, Refrigerator,
  Speaker, ChefHat, WashingMachine, Snowflake,
  ChevronLeft, ChevronRight, ChevronRight as ArrowRight,
  Loader,
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const categories = [
  { id: 'all', label: 'Todos', icon: 'LayoutGrid' },
  { id: 'Televisores', label: 'Televisores', icon: 'Tv' },
  { id: 'Computación', label: 'Computación', icon: 'Laptop' },
  { id: 'Neveras', label: 'Neveras', icon: 'Refrigerator' },
  { id: 'A/C', label: 'A/C', icon: 'Wind' },
  { id: 'Cocina', label: 'Cocina', icon: 'ChefHat' },
  { id: 'Congeladores', label: 'Congeladores', icon: 'Snowflake' },
  { id: 'Audio', label: 'Audio', icon: 'Speaker' },
  { id: 'Lavadoras', label: 'Lavadoras', icon: 'WashingMachine' },
  { id: 'Electrodomésticos', label: 'Electrodomésticos', icon: 'LayoutGrid' },
  { id: 'Oferta', label: 'Oferta', icon: 'LayoutGrid' }
];
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ICON = { LayoutGrid, Tv, Laptop, Wind, Refrigerator, Speaker, ChefHat, WashingMachine, Snowflake };
const ease = [0.16, 1, 0.3, 1];

const ProductCard = ({ product, index }) => {
  const id = product.id;
  const nombre = product.name;
  const imagen = product.image_url || product.image;
  const priceValue = product.price ?? product.price_formatted ?? product.price_display ?? product.priceValue;
  const precio = typeof priceValue === 'number'
    ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(priceValue)
    : priceValue || '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, delay: Math.min(index * 0.1, 0.6), ease }}
      style={{
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '28px 24px 32px',
        borderRadius: '28px',
        border: '1px solid rgba(15,23,42,0.08)',
        boxShadow: '0 18px 38px rgba(15,23,42,0.08)',
        minHeight: '100%',
        overflow: 'hidden',
      }}
    >
      <Link to={`/product/${id}`} style={{ display: 'block', width: '100%', textDecoration: 'none' }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
          style={{
            width: '100%',
            aspectRatio: '1/1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            overflow: 'hidden',
            borderRadius: '28px',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: '#f8fafc',
            borderRadius: '28px',
          }} />

          <img
            src={imagen}
            alt={nombre}
            style={{
              width: '92%',
              height: '92%',
              objectFit: 'contain',
              display: 'block',
              position: 'relative',
              zIndex: 1,
            }}
            loading="lazy"
          />
        </motion.div>
      </Link>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <Link to={`/product/${id}`} style={{ textDecoration: 'none', width: '100%' }}>
          <motion.h3
            style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#111827',
              lineHeight: 1.15,
              marginBottom: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            }}
          >
            {nombre}
          </motion.h3>
        </Link>

        {precio ? (
          <p style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#111827',
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            {precio}
          </p>
        ) : null}
      </div>

      <motion.div style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
        <Link
          to={`/product/${id}`}
          style={{
            padding: '12px 26px',
            borderRadius: '999px',
            background: '#111827',
            color: '#f8fafc',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            fontFamily: 'inherit',
            transition: 'all 0.24s ease',
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
        let query = supabase.from('products').select('*').order('created_at', { ascending: false });

        if (searchTerm.trim()) {
          query = query.ilike('name', `%${searchTerm}%`);
        } else if (activeCat !== 'all') {
          query = query.eq('category', activeCat);
        }

        const { data, error } = await query;
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching catalog:', err);
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px 32px', alignItems: 'stretch' }}>
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