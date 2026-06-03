import React, { useState, useEffect } from 'react';
import { productService, supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';

const ADMIN_PASSWORD = 'admin';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('soneview_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('catalog');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen_url: '',
    categoria: 'Televisores',
    precio: '',
    especificaciones: '',
    imagenes_extra: ''
  });

  const categories = [
    { id: 'Televisores', label: 'Televisores' },
    { id: 'Computación', label: 'Computación' },
    { id: 'Neveras', label: 'Neveras' },
    { id: 'A/C', label: 'A/C' },
    { id: 'Cocina', label: 'Cocina' },
    { id: 'Congeladores', label: 'Congeladores' },
    { id: 'Audio', label: 'Audio' },
    { id: 'Lavadoras', label: 'Lavadoras' },
    { id: 'Electrodomésticos', label: 'Electrodomésticos' },
    { id: 'Oferta', label: 'Oferta' }
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        const data = await productService.getAllProducts();
        setProducts(data || []);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setFetchError('Hubo un problema al contactar la base de datos.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem('soneview_admin_auth', 'true');
      } catch (e) {}
      setLoginError(false);
    } else {
      setLoginError(true);
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('soneview_admin_auth');
    } catch (e) {}
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        nombre: product.name || '',
        descripcion: product.description || '',
        imagen_url: product.image_url || '',
        categoria: product.category || 'Televisores',
        precio: product.price ? product.price.toString() : '',
        especificaciones: product.specs && product.specs.list ? product.specs.list.join(', ') : '',
        imagenes_extra: Array.isArray(product.images) ? product.images.join(', ') : ''
      });
    } else {
      setCurrentProduct(null);
      setFormData({
        nombre: '',
        descripcion: '',
        imagen_url: '',
        categoria: 'Televisores',
        precio: '',
        especificaciones: '',
        imagenes_extra: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const productData = {
        name: formData.nombre || 'Sin Nombre',
        description: formData.descripcion || '',
        image_url: formData.imagen_url || 'https://via.placeholder.com/150',
        category: formData.categoria || 'Televisores',
        price: parseFloat(formData.precio) || 0,
        specs: { 
          list: (formData.especificaciones || '').split(',').map(s => s.trim()).filter(s => s.length > 0) 
        },
        images: (formData.imagenes_extra || '').split(',').map(s => s.trim()).filter(s => s.length > 0)
      };

      if (currentProduct && currentProduct.id) {
        const { data, error } = await supabase
          .from('products')
          .update({
            ...productData,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentProduct.id)
          .select()
          .single();
          
        if (error) throw error;

        setProducts(prev => prev.map(p => p.id === currentProduct.id ? { ...p, ...data } : p));
        showNotification('Producto actualizado correctamente');
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single();

        if (error) throw error;
        
        if (data) {
          setProducts(prev => [data, ...prev]);
        }
        showNotification('Producto añadido al catálogo');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Detalle completo del error:", error);
      const errorMsg = error.message || JSON.stringify(error);
      showNotification(`Error: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.')) {
      try {
        await productService.deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
        showNotification('Producto eliminado correctamente');
      } catch (error) {
        showNotification(`Error: ${error.message || 'No se pudo eliminar'}`);
      }
    }
  };

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 4000);
  };

  try {
    const safeProducts = Array.isArray(products) ? products : [];
    const filteredProducts = safeProducts.filter(p => {
      const pName = typeof p?.name === 'string' ? p.name : '';
      const pCat = typeof p?.category === 'string' ? p.category : '';
      const term = typeof searchTerm === 'string' ? searchTerm : '';
      return pName.toLowerCase().includes(term.toLowerCase()) || pCat.toLowerCase().includes(term.toLowerCase());
    });

    if (!isAuthenticated) {
      return (
        <div style={{ minHeight: '100vh', background: '#f5f5f7' }}>
          <Navbar />
          <div style={{ padding: '60px 24px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: '#fff', padding: '48px', borderRadius: '16px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h2>Acceso Restringido</h2>
              <p style={{ color: '#666', marginBottom: '24px' }}>Ingresa la contraseña para acceder al Panel de Administración.</p>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input 
                  type="password" 
                  placeholder="Contraseña" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                  autoFocus
                />
                {loginError && <span style={{ color: 'red', fontSize: '12px' }}>Contraseña incorrecta.</span>}
                <button type="submit" style={{ padding: '12px', borderRadius: '8px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>
                  Iniciar Sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f7', paddingBottom: 100, fontFamily: 'system-ui, sans-serif' }}>
        <Navbar />
        
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '28px' }}>Panel de Administración</h1>
              <p style={{ margin: '4px 0 0 0', color: '#666' }}>Modo Seguro</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {!loading && (
                <button 
                  onClick={() => handleOpenModal()}
                  style={{ padding: '10px 16px', background: '#000', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ➕ Nuevo Producto
                </button>
              )}
              <button 
                onClick={handleLogout}
                style={{ padding: '10px 16px', background: '#e0e0e0', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                Salir
              </button>
            </div>
          </div>

          {notification.show && (
            <div style={{ background: '#333', color: '#fff', padding: '12px 20px', borderRadius: '8px', marginBottom: '24px' }}>
              {notification.message}
            </div>
          )}

          {loading ? (
            <div style={{ background: '#fff', padding: '60px', textAlign: 'center', borderRadius: '12px' }}>
              <h3>Cargando datos...</h3>
            </div>
          ) : fetchError ? (
            <div style={{ background: '#ffebee', color: '#c62828', padding: '60px', textAlign: 'center', borderRadius: '12px' }}>
              <h3>Error de Conexión</h3>
              <p>{fetchError}</p>
            </div>
          ) : safeProducts.length === 0 ? (
            <div style={{ background: '#fff', padding: '60px', textAlign: 'center', borderRadius: '12px', border: '2px dashed #ccc' }}>
              <h3>¡Base de datos limpia y lista!</h3>
              <p style={{ color: '#666' }}>No hay productos en el catálogo todavía.</p>
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <input 
                type="text" 
                placeholder="Buscar productos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '24px', boxSizing: 'border-box' }}
              />

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #eee' }}>
                      <th style={{ padding: '12px' }}>Producto</th>
                      <th style={{ padding: '12px' }}>Categoría</th>
                      <th style={{ padding: '12px' }}>Precio</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product?.id || Math.random()} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img 
                            src={product?.image_url || ''} 
                            alt={product?.name || ''} 
                            style={{ width: 40, height: 40, borderRadius: '4px', objectFit: 'cover', background: '#eee' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <span>{product?.name || 'Sin Nombre'}</span>
                        </td>
                        <td style={{ padding: '12px' }}>{product?.category || ''}</td>
                        <td style={{ padding: '12px' }}>${product?.price || '0.00'}</td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <button onClick={() => handleOpenModal(product)} style={{ padding: '6px 12px', marginRight: '8px', background: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            ✏️ Editar
                          </button>
                          <button onClick={() => handleDelete(product?.id)} style={{ padding: '6px 12px', background: '#fee', color: 'red', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            🗑️ Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {isModalOpen && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 9999 }}>
              <div style={{ background: '#fff', width: '100%', maxWidth: '500px', borderRadius: '12px', padding: '32px', maxHeight: '90vh', overflowY: 'auto', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ margin: 0 }}>{currentProduct ? '✏️ Editar Producto' : '➕ Nuevo Producto'}</h2>
                  <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>❌</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Nombre</label>
                    <input type="text" required value={formData?.nombre || ''} onChange={e => setFormData(prev => ({...prev, nombre: e.target.value}))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Categoría</label>
                    <select required value={formData?.categoria || ''} onChange={e => setFormData(prev => ({...prev, categoria: e.target.value}))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}>
                      <option value="" disabled>Selecciona...</option>
                      {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Precio (USD)</label>
                    <input type="number" step="0.01" required value={formData?.precio || ''} onChange={e => setFormData(prev => ({...prev, precio: e.target.value}))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>URL de Imagen</label>
                    <input type="url" required value={formData?.imagen_url || ''} onChange={e => setFormData(prev => ({...prev, imagen_url: e.target.value}))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Descripción</label>
                    <textarea required value={formData?.descripcion || ''} onChange={e => setFormData(prev => ({...prev, descripcion: e.target.value}))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', minHeight: '80px', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Imágenes Secundarias (separar URLs por coma)</label>
                    <textarea value={formData?.imagenes_extra || ''} onChange={e => setFormData(prev => ({...prev, imagenes_extra: e.target.value}))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', minHeight: '60px', boxSizing: 'border-box' }} placeholder="https://..., https://..." />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Especificaciones (separadas por coma)</label>
                    <textarea value={formData?.especificaciones || ''} onChange={e => setFormData(prev => ({...prev, especificaciones: e.target.value}))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', minHeight: '60px', boxSizing: 'border-box' }} />
                  </div>

                  <button disabled={isSubmitting} type="submit" style={{ marginTop: '16px', padding: '14px', background: '#000', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer', width: '100%' }}>
                    {isSubmitting ? '⏳ Guardando...' : '💾 Guardar Producto'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  } catch (e) {
    console.error("Critical Render Error:", e);
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: 'red' }}>Error Crítico en el Renderizado</h1>
        <p>El componente falló al construirse. Revisa la consola para más detalles.</p>
        <button onClick={() => window.location.reload()} style={{ padding: '10px 20px' }}>Recargar</button>
      </div>
    );
  }
}