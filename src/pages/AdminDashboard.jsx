import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Search, X, Loader2, Package, BarChart3, Users,
  Lock, LogOut, LayoutTemplate, ShoppingBag
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import Navbar from '../components/Navbar';

const ADMIN_PASSWORD = 'admin'; // Contraseña por defecto

export default function AdminDashboard() {
  const { products, loading, addProduct, updateProduct, deleteProduct, refreshProducts, homeConfig, updateHomeConfig } = useProducts();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('soneview_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Tabs state
  const [activeTab, setActiveTab] = useState('catalog');

  // Home Editor state
  const [homeEditor, setHomeEditor] = useState(homeConfig || {});
  
  useEffect(() => {
    if (homeConfig) setHomeEditor(homeConfig);
  }, [homeConfig]);

  const saveHomeConfig = () => {
    updateHomeConfig(homeEditor);
    alert('¡Configuración de Inicio guardada correctamente!');
  };

  // Dashboard state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen_url: '',
    categoria: 'tv',
    especificaciones: ''
  });

  const categories = [
    { id: 'tv', label: 'Smart TVs' },
    { id: 'computing', label: 'Computación' },
    { id: 'air', label: 'Aire Acondicionado' },
    { id: 'audio', label: 'Audio' },
    { id: 'appliances', label: 'Línea Blanca' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('soneview_admin_auth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('soneview_admin_auth');
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        nombre: product.name || '',
        descripcion: product.description || '',
        imagen_url: product.image_url || '',
        categoria: product.category || 'tv',
        especificaciones: product.specs?.list?.join(', ') || ''
      });
    } else {
      setCurrentProduct(null);
      setFormData({
        nombre: '',
        descripcion: '',
        imagen_url: '',
        categoria: 'tv',
        especificaciones: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (currentProduct) {
        await updateProduct(currentProduct.id, formData);
      } else {
        await addProduct(formData);
      }
      setIsModalOpen(false);
      await refreshProducts();
    } catch (error) {
      console.error('Error detallado:', error);
      alert('Error al guardar el producto: ' + (error.message || 'Error desconocido'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
        await refreshProducts();
      } catch (error) {
        alert('Error al eliminar');
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f7' }}>
        <Navbar />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: '#fff',
            padding: '48px',
            borderRadius: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center'
          }}
        >
          <div style={{ display: 'inline-flex', padding: '16px', background: '#f0f7ff', borderRadius: '20px', color: '#007aff', marginBottom: '24px' }}>
            <Lock size={32} />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Acceso Restringido</h2>
          <p style={{ fontSize: '15px', color: '#86868b', marginBottom: '32px' }}>Ingresa la contraseña para acceder al Panel de Administración.</p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-5 py-4 rounded-2xl border text-[16px] transition-all duration-300 outline-none focus:bg-white focus:ring-4 placeholder:text-slate-400 ${loginError ? 'border-red-500 bg-red-50/30 focus:ring-red-100' : 'bg-slate-50 border-slate-200 focus:ring-slate-100 focus:border-slate-300'}`}
              autoFocus
            />
            {loginError && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ff3b30', fontSize: '13px', fontWeight: 500, textAlign: 'left', marginTop: '-8px' }}>
                Contraseña incorrecta. Inténtalo de nuevo.
              </motion.span>
            )}
            <button 
              type="submit"
              style={{
                padding: '16px',
                borderRadius: '16px',
                background: '#1d1d1f',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                marginTop: '8px',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Iniciar Sesión
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f7', paddingBottom: 100 }}>
      <Navbar />
      
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: '#212844', marginBottom: 8 }}>Panel de Administración</h1>
            <p style={{ color: 'rgba(33,40,68,0.5)' }}>Gestiona tu tienda premium</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl mr-4">
               <button onClick={() => setActiveTab('catalog')} className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'catalog' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}>
                 <ShoppingBag size={16}/> Catálogo
               </button>
               <button onClick={() => setActiveTab('home')} className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'home' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}>
                 <LayoutTemplate size={16}/> Inicio
               </button>
            </div>

            {activeTab === 'catalog' && (
              <button 
                onClick={() => handleOpenModal()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-black hover:shadow-md transition-all duration-300"
              >
                <Plus size={18} /> Nuevo Producto
              </button>
            )}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 hover:text-slate-900 transition-all duration-300"
            >
              <LogOut size={18} /> Salir
            </button>
          </div>
        </div>

        {activeTab === 'catalog' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 48 }}>
          <StatCard icon={<Package color="#2997ff" />} label="Total Productos" value={products.length} />
          <StatCard icon={<BarChart3 color="#10b981" />} label="Categorías" value={categories.length} />
          <StatCard icon={<Users color="#f59e0b" />} label="Visibilidad" value="Pública" />
        </div>

        <div style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div style={{ position: 'relative', marginBottom: 32 }}>
            <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(33,40,68,0.3)' }} size={20} />
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', padding: '16px 16px 16px 52px', borderRadius: 14, border: '1px solid rgba(33,40,68,0.1)', 
                fontSize: 16, outline: 'none', background: '#f9f9fb' 
              }}
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e8e8ed' }}>
                  <th style={{ padding: '16px 8px', color: 'rgba(33,40,68,0.4)', fontWeight: 600 }}>Producto</th>
                  <th style={{ padding: '16px 8px', color: 'rgba(33,40,68,0.4)', fontWeight: 600 }}>Categoría</th>
                  <th style={{ padding: '16px 8px', color: 'rgba(33,40,68,0.4)', fontWeight: 600, textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #e8e8ed' }}>
                    <td style={{ padding: '16px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img src={product.image_url} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', background: '#f5f5f7' }} />
                        <span style={{ fontWeight: 600, color: '#212844' }}>{product.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      <span className="px-3 py-1.5 rounded-full border border-[#e8e8ed] text-[10px] font-bold tracking-widest uppercase text-slate-500 bg-transparent">
                        {product.category}
                      </span>
                    </td>
                    <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <button onClick={() => handleOpenModal(product)} className="p-2 rounded-lg transition-colors bg-transparent text-slate-400 hover:text-slate-900 hover:bg-slate-100"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 rounded-lg transition-colors bg-transparent text-slate-400 hover:text-slate-900 hover:bg-slate-100"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </motion.div>
        )}

        {activeTab === 'home' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderBottom: '1px solid #e8e8ed', paddingBottom: 16 }}>
               <h2 style={{ fontSize: 22, fontWeight: 700 }}>Configuración del Slider Principal</h2>
             </div>
             
             {homeEditor.heroSlides?.map((slide, index) => (
                <div key={index} style={{ marginBottom: 32, padding: 24, background: '#f9f9fb', borderRadius: 16 }}>
                   <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Slide {index + 1}</h3>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(33,40,68,0.5)', display: 'block', marginBottom: 4 }}>Título Principal</label>
                        <input value={slide.title} onChange={e => { const newS = [...homeEditor.heroSlides]; newS[index].title = e.target.value; setHomeEditor({...homeEditor, heroSlides: newS}) }} className={inputClasses} />
                      </div>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(33,40,68,0.5)', display: 'block', marginBottom: 4 }}>Título Destacado (Color)</label>
                        <input value={slide.titleAccent} onChange={e => { const newS = [...homeEditor.heroSlides]; newS[index].titleAccent = e.target.value; setHomeEditor({...homeEditor, heroSlides: newS}) }} className={inputClasses} />
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(33,40,68,0.5)', display: 'block', marginBottom: 4 }}>Subtítulo</label>
                        <input value={slide.subtitle} onChange={e => { const newS = [...homeEditor.heroSlides]; newS[index].subtitle = e.target.value; setHomeEditor({...homeEditor, heroSlides: newS}) }} className={inputClasses} />
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(33,40,68,0.5)', display: 'block', marginBottom: 4 }}>URL de Imagen del Producto</label>
                        <input value={slide.image} onChange={e => { const newS = [...homeEditor.heroSlides]; newS[index].image = e.target.value; setHomeEditor({...homeEditor, heroSlides: newS}) }} className={inputClasses} placeholder="https://..." />
                        {slide.image && (
                          <div className="mt-3 overflow-hidden rounded-xl bg-slate-100 border border-[#e8e8ed] inline-flex items-center justify-center h-24 w-auto max-w-[200px]">
                            <img src={slide.image} alt="Preview" className="h-full w-full object-cover" />
                          </div>
                        )}
                      </div>
                   </div>
                </div>
             ))}

             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 48, marginBottom: 24, borderBottom: '1px solid #e8e8ed', paddingBottom: 16 }}>
               <h2 style={{ fontSize: 22, fontWeight: 700 }}>Títulos de Categorías</h2>
             </div>

             {homeEditor.sections?.map((sec, index) => (
                <div key={index} style={{ marginBottom: 24, padding: 24, background: '#f9f9fb', borderRadius: 16 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                     <span className="px-3 py-1.5 rounded-full border border-slate-200 text-[10px] font-bold tracking-widest uppercase text-slate-500 bg-transparent">
                       {sec.cat}
                     </span>
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(33,40,68,0.5)', display: 'block', marginBottom: 4 }}>Etiqueta (Tagline)</label>
                        <input value={sec.eyebrow} onChange={e => { const newS = [...homeEditor.sections]; newS[index].eyebrow = e.target.value; setHomeEditor({...homeEditor, sections: newS}) }} className={inputClasses} placeholder="Ej: Smart TVs" />
                      </div>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(33,40,68,0.5)', display: 'block', marginBottom: 4 }}>Título Principal</label>
                        <input value={sec.title} onChange={e => { const newS = [...homeEditor.sections]; newS[index].title = e.target.value; setHomeEditor({...homeEditor, sections: newS}) }} className={inputClasses} placeholder="Ej: Una nueva visión." />
                      </div>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(33,40,68,0.5)', display: 'block', marginBottom: 4 }}>Descripción Corta</label>
                        <input value={sec.body} onChange={e => { const newS = [...homeEditor.sections]; newS[index].body = e.target.value; setHomeEditor({...homeEditor, sections: newS}) }} className={inputClasses} />
                      </div>
                   </div>
                </div>
             ))}

             <button 
               onClick={saveHomeConfig}
               className="w-full mt-6 py-4 rounded-2xl bg-slate-900 text-white font-bold transition-all duration-300 hover:bg-black hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
             >
               Guardar Configuración del Inicio
             </button>
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(33,40,68,0.4)', backdropFilter: 'blur(8px)' }} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} style={{ position: 'relative', width: '100%', maxWidth: 600, background: '#fff', borderRadius: 32, padding: 40, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700 }}>{currentProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(33,40,68,0.5)' }}>Nombre del Producto</label>
                  <input required value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} className={inputClasses} placeholder="Ej: Smart TV 55 pulg 4K QLED" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(33,40,68,0.5)' }}>Categoría</label>
                  <select value={formData.categoria} onChange={(e) => setFormData({...formData, categoria: e.target.value})} className={inputClasses}>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(33,40,68,0.5)' }}>URL de la Imagen</label>
                  <div className="flex gap-4">
                    <input required value={formData.imagen_url} onChange={(e) => setFormData({...formData, imagen_url: e.target.value})} className={`${inputClasses} flex-1`} placeholder="https://ejemplo.com/imagen.jpg" />
                    {formData.imagen_url && (
                      <div className="w-16 h-[52px] shrink-0 rounded-xl overflow-hidden bg-slate-50 border border-[#e8e8ed]">
                        <img src={formData.imagen_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} onLoad={(e) => e.target.style.display = 'block'} />
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(33,40,68,0.5)' }}>Descripción</label>
                  <textarea required value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} className={`${inputClasses} min-h-[80px] resize-y`} placeholder="Descripción del producto..." />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(33,40,68,0.5)' }}>Especificaciones Técnicas</label>
                  <textarea value={formData.especificaciones} onChange={(e) => setFormData({...formData, especificaciones: e.target.value})} className={`${inputClasses} min-h-[120px] resize-y`} placeholder="Separadas por comas..." />
                </div>
                <button disabled={isSubmitting} type="submit" style={{ marginTop: 12, padding: '16px', borderRadius: 16, background: '#212844', color: '#fff', fontSize: 16, fontWeight: 700, border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : currentProduct ? 'Actualizar Producto' : 'Subir Producto'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ background: '#f5f5f7', padding: 12, borderRadius: 12 }}>{icon}</div>
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(33,40,68,0.4)', textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>
        <p style={{ fontSize: 24, fontWeight: 700, color: '#212844' }}>{value}</p>
      </div>
    </div>
  );
}

const inputClasses = "w-full px-4 py-3.5 rounded-2xl bg-slate-50/50 border border-slate-200 text-slate-900 text-[15px] transition-all duration-300 outline-none focus:bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-300 placeholder:text-slate-400";
const inputStyle = {};