import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Info, Cpu, Zap, ShieldCheck, Box } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * ProductDetail.jsx — Vista de Detalles Premium
 * Sincronizado con tabla 'products' (Esquema real en inglés)
 */
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, loading } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (!loading) {
      const found = getProductById(id);
      setProduct(found);
      if (found) setSelectedImage(found.image_url);
    }
  }, [id, getProductById, loading]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Cargando detalles...</p>
    </div>
  );

  if (!product) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <h2 style={{ color: '#212844' }}>Producto no encontrado</h2>
      <button onClick={() => navigate('/catalog')} style={{ padding: '12px 24px', borderRadius: 99, background: '#212844', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Volver al catálogo
      </button>
    </div>
  );

  // Mapeo de campos reales
  const nombre = product.name;
  const descripcion = product.description;
  const imagen = product.image_url;
  const categoria = product.category;
  
  // Manejo de specs en formato JSONB
  const specsList = product.specs?.list || [];

  // Recopilar todas las imágenes
  const allImages = [imagen];
  if (Array.isArray(product.images) && product.images.length > 0) {
    allImages.push(...product.images);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#1d1d1f' }}>
      <Navbar />
      
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <button 
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#2997ff', fontWeight: 600, marginBottom: 40 }}
        >
          <ChevronLeft size={18} /> Volver
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 60, alignItems: 'start' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={selectedImage}
              style={{ 
                background: '#f5f5f7', 
                borderRadius: 32, 
                padding: 40, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                aspectRatio: '1/1',
                overflow: 'hidden'
              }}
            >
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedImage || imagen} 
                alt={nombre} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }} 
              />
            </motion.div>

            {/* Miniaturas */}
            {allImages.length > 1 && (
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
                {allImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 16,
                      background: '#f5f5f7',
                      padding: 8,
                      cursor: 'pointer',
                      border: selectedImage === imgUrl ? '2px solid #212844' : '2px solid transparent',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                  >
                    <img src={imgUrl} alt={`${nombre} thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2997ff', marginBottom: 12 }}>
              {categoria}
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#212844', lineHeight: 1, marginBottom: 24 }}>
              {nombre}
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(33,40,68,0.6)', marginBottom: 40 }}>
              {descripcion}
            </p>

            <div style={{ background: '#f9f9fb', borderRadius: 24, padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <Info size={20} style={{ color: '#212844' }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#212844' }}>Especificaciones Técnicas</h3>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {specsList.length > 0 ? specsList.map((spec, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ background: '#fff', padding: 8, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                      {i % 4 === 0 ? <Cpu size={16} color="#2997ff" /> : 
                       i % 4 === 1 ? <Zap size={16} color="#2997ff" /> :
                       i % 4 === 2 ? <ShieldCheck size={16} color="#2997ff" /> :
                       <Box size={16} color="#2997ff" />}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#212844', lineHeight: 1.4 }}>{spec}</span>
                  </div>
                )) : (
                  <p style={{ fontSize: 14, color: 'rgba(33,40,68,0.4)' }}>No hay especificaciones detalladas.</p>
                )}
              </div>
            </div>

            <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
              <button style={{ 
                flex: 1, padding: '16px 32px', borderRadius: 14, background: '#212844', color: '#fff', 
                fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer' 
              }}>
                Consultar Disponibilidad
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
