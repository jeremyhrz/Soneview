import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  React.useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, search, hash]);

  return null;
};

/**
 * App.jsx — Raíz de la aplicación Soneview
 * Catálogo Puro con estado compartido entre componentes
 * 
 * Rutas:
 *   /             → Home (Hero Apple Style)
 *   /catalog      → Catálogo con productos flotantes y buscador
 *   /product/:id  → Detalle del producto
 *   /admin        → Panel Administrativo CRUD
 */

export default function App() {
  return (
    <ProductProvider>  
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}