import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../logo/logo.png';

/**
 * Footer.jsx — Apple Premium Footer
 * Con logo Soneview y diseño limpio
 */
const footerLinks = [
  {
    title: 'Productos',
    links: [
      { label: 'Smart TVs',         to: '/catalog?cat=tv' },
      { label: 'Computación',       to: '/catalog?cat=computing' },
      { label: 'A/C Inverter',      to: '/catalog?cat=air' },
      { label: 'Audio Premium',     to: '/catalog?cat=audio' },
      { label: 'Línea Blanca',      to: '/catalog?cat=fridge' },
      { label: 'Cocina',            to: '/catalog?cat=kitchen' },
    ],
  },
  {
    title: 'Servicios',
    links: [
      { label: 'Soporte Técnico',   to: '/' },
      { label: 'Garantía',          to: '/' },
      { label: 'Manuales',          to: '/' },
      { label: 'Actualizaciones',   to: '/' },
    ],
  },
  {
    title: 'Distribuidores',
    links: [
      { label: 'Encuentra uno',     to: '/' },
      { label: 'Corporativo',       to: '/' },
      { label: 'Mayoristas',        to: '/' },
      { label: 'Internacional',     to: '/' },
    ],
  },
  {
    title: 'Soneview',
    links: [
      { label: 'Nuestra Historia',  to: '/' },
      { label: 'Sustentabilidad',   to: '/' },
      { label: 'Empleos',           to: '/' },
      { label: 'Contacto',          to: '/' },
    ],
  },
];

const Footer = () => (
  <footer style={{
    background: '#fff',
    borderTop: '1px solid rgba(33,40,68,0.08)',
    color: 'rgba(33,40,68,0.6)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    fontSize: '12px',
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>

      {/* Logo y descripción */}
      <div style={{ padding: '48px 0', borderBottom: '1px solid rgba(33,40,68,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <img 
            src={logo} 
            alt="Soneview Logo" 
            style={{
              height: '34px',
              width: 'auto',
              filter: 'brightness(0.13) sepia(0.2) hue-rotate(180deg)',
            }}
          />
        </div>
        <p style={{ 
          fontSize: 14, 
          lineHeight: 1.6, 
          color: 'rgba(33,40,68,0.6)',
          maxWidth: '600px',
        }}>
          Tecnología que redefine el estándar. Productos premium diseñados para ofrecer la mejor experiencia en cada categoría.
        </p>
      </div>

      {/* Link columns */}
      <div style={{ 
        padding: '48px 0', 
        borderBottom: '1px solid rgba(33,40,68,0.08)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 48,
      }}>
        {footerLinks.map(col => (
          <div key={col.title}>
            <h4 style={{ 
              color: '#212844', 
              fontWeight: 600, 
              fontSize: 13, 
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}>
              {col.title}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {col.links.map(({ label, to }) => (
                <li key={label} style={{ marginBottom: 12 }}>
                  <Link
                    to={to}
                    style={{
                      color: 'rgba(33,40,68,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    className="hover:text-[#212844]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal notes */}
      <div style={{ padding: '32px 0', borderBottom: '1px solid rgba(33,40,68,0.08)' }}>
        <div style={{ 
          fontSize: 11, 
          lineHeight: 1.6, 
          color: 'rgba(33,40,68,0.4)',
        }}>
          <p style={{ marginBottom: 8 }}>
            1. Las especificaciones pueden variar según el modelo y la región. Consulta con tu distribuidor autorizado.
          </p>
          <p style={{ marginBottom: 8 }}>
            2. Las imágenes son ilustrativas. Los productos reales pueden presentar ligeras variaciones.
          </p>
          <p>
            Soneview, el logotipo de Soneview y todos los productos relacionados son marcas comerciales de Soneview Inc.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ 
        padding: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        '@media (min-width: 768px)': {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }
      }}>
        <p style={{ 
          color: 'rgba(33,40,68,0.4)',
          fontSize: 11,
        }}>
          Copyright © 2026 Soneview Inc. Todos los derechos reservados.
        </p>
        
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          {['Privacidad', 'Términos', 'Aviso legal', 'Mapa del sitio'].map(item => (
            <Link
              key={item}
              to="/"
              style={{
                color: 'rgba(33,40,68,0.6)',
                textDecoration: 'none',
                fontSize: 11,
                transition: 'color 0.2s ease',
              }}
              className="hover:text-[#212844]"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
