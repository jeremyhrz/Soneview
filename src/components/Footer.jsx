import React from 'react';
import { Link } from 'react-router-dom';
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
  <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Logo y descripción */}
      <div className="py-12 border-b border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <img 
            src={logo} 
            alt="Soneview Logo" 
            className="h-8 w-auto"
            style={{
              filter: 'brightness(0.13) sepia(0.2) hue-rotate(180deg)',
            }}
          />
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-500">
          Tecnología que redefine el estándar. Productos premium diseñados para ofrecer la mejor experiencia en cada categoría.
        </p>
      </div>

      {/* Link columns */}
      <div className="py-12 border-b border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        {footerLinks.map(col => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-900 mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-xs text-slate-500 hover:text-slate-900 transition-colors duration-200"
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
      <div className="py-8 border-b border-slate-200">
        <div className="space-y-2 text-[11px] leading-6 text-slate-400">
          <p>
            1. Las especificaciones pueden variar según el modelo y la región. Consulta con tu distribuidor autorizado.
          </p>
          <p>
            2. Las imágenes son ilustrativas. Los productos reales pueden presentar ligeras variaciones.
          </p>
          <p>
            Soneview, el logotipo de Soneview y todos los productos relacionados son marcas comerciales de Soneview Inc.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-8 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <p className="text-[11px] text-slate-400">
          Copyright © 2026 Soneview Inc. Todos los derechos reservados.
        </p>

        <div className="flex flex-wrap gap-5">
          {['Privacidad', 'Términos', 'Aviso legal', 'Mapa del sitio'].map(item => (
            <Link
              key={item}
              to="/"
              className="text-[11px] text-slate-500 hover:text-slate-900 transition-colors duration-200"
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
