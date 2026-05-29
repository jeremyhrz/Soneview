import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import logo from '../logo/logo.png';

/**
 * Navbar.jsx — Navbar Apple Style con buscador funcional
 * Senior Frontend Engineer - Soneview Catálogo Puro
 * 
 * Características:
 * 1. Logo importado correctamente desde src/logo/logo.png
 * 2. Buscador funcional que filtra productos
 * 3. Glassmorphism Apple perfecto
 * 4. Responsive completo
 */

const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Catálogo', to: '/catalog' },
  { label: 'Smart TVs', to: '/catalog?cat=tv' },
  { label: 'Laptops', to: '/catalog?cat=computing' },
  { label: 'A/C', to: '/catalog?cat=air' },
  { label: 'Audio', to: '/catalog?cat=audio' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Efecto para scroll - Apple style
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para cerrar menú al cambiar ruta
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Efecto para overflow del body
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (to) => {
    const path = to.split('?')[0];
    return path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
  };

  // Función para manejar búsqueda
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Si estamos en /catalog, actualizamos el parámetro de búsqueda en la URL
    if (location.pathname === '/catalog') {
      if (value.trim()) {
        navigate(`/catalog?search=${encodeURIComponent(value.trim())}`);
      } else {
        navigate('/catalog');
      }
    }
  };

  // Función para enviar búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm('');
    }
  };

  // Función para búsqueda en móvil
  const handleMobileSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(value.trim())}`);
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Navbar Principal - Apple Style */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: '44px',
          background: scrolled ? 'rgba(33, 40, 68, 0.88)' : '#212844',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
        }}
      >
        <div style={{
          maxWidth: '980px',
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 22px',
        }}>
          {/* Logo Soneview - Izquierda */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <img 
              src={logo} 
              alt="Soneview Logo" 
              style={{
                height: '34px',
                width: 'auto',
                filter: 'brightness(0) invert(1)',
              }}
            />
          </Link>

          {/* Navegación Desktop - Centro */}
          <nav className="hidden lg:flex" style={{
            gap: 0,
            alignItems: 'center',
          }}>
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                  padding: '0 10px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '12px',
                  fontWeight: 400,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  color: isActive(to) ? '#ffffff' : 'rgba(240, 231, 213, 0.7)',
                  transition: 'color 0.15s ease',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => {
                  if (!isActive(to)) e.currentTarget.style.color = 'rgba(240, 231, 213, 0.7)';
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Acciones Derecha - Buscador y Menú */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Buscador */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(240, 231, 213, 0.7)',
                display: 'flex',
                alignItems: 'center',
                padding: '6px',
                borderRadius: '50%',
                transition: 'all 0.2s ease',
              }}
              aria-label="Buscar"
              className="hover:bg-white/10"
            >
              {searchOpen ? <X size={16} /> : <Search size={16} strokeWidth={1.5} />}
            </button>

            {/* Menú Móvil */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#f0e7d5',
                display: 'flex',
                alignItems: 'center',
                padding: '6px',
                borderRadius: '50%',
                transition: 'all 0.2s ease',
                '@media (min-width: 834px)': { display: 'none' },
              }}
              aria-label="Menú"
              className="hover:bg-white/10"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Overlay de Búsqueda - Funcional */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'cubic-bezier(0.42, 0, 0.58, 1)' }}
              style={{
                background: 'rgba(33, 40, 68, 0.96)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div style={{ maxWidth: '980px', margin: '0 auto', padding: '12px 22px' }}>
                <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
                  <Search style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255, 255, 255, 0.3)',
                    width: '15px',
                    height: '15px',
                  }} />
                  <input
                    autoFocus
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Buscar productos por nombre o categoría…"
                    style={{
                      width: '100%',
                      paddingLeft: '36px',
                      paddingRight: '14px',
                      paddingTop: '9px',
                      paddingBottom: '9px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      transition: 'all 0.2s ease',
                    }}
                    className="focus:border-white/20 focus:bg-white/12"
                  />
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Menú Móvil Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 8000,
              background: 'rgba(33, 40, 68, 0.98)',
              paddingTop: '44px',
              display: 'flex',
              flexDirection: 'column',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Búsqueda Móvil */}
            <div style={{ padding: '16px 22px', borderBottom: '1px solid rgba(255, 255, 255, 0.07)' }}>
              <div style={{ position: 'relative' }}>
                <Search style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.3)',
                  width: '15px',
                  height: '15px',
                }} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleMobileSearch}
                  placeholder="Buscar productos…"
                  style={{
                    width: '100%',
                    paddingLeft: '36px',
                    paddingRight: '14px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>

            {/* Navegación Móvil */}
            <nav style={{ flex: 1, overflowY: 'auto' }}>
              {NAV_LINKS.map(({ label, to }, index) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
                >
                  <Link
                    to={to}
                    onClick={() => {
                      setMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '15px 22px',
                      fontSize: '17px',
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: isActive(to) ? '#ffffff' : 'rgba(240, 231, 213, 0.65)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    }}
                  >
                    {label}
                    <span style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: '18px' }}>›</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer para navbar fija */}
      <div style={{ height: '44px' }} />
    </>
  );
}