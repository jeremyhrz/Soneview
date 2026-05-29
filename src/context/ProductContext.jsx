import React, { createContext, useState, useContext, useEffect } from 'react';
import { productService } from '../lib/supabaseClient';
import { heroSlides as defaultHeroSlides } from '../data/mockData';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const defaultHomeConfig = {
  heroSlides: defaultHeroSlides,
  sections: [
    { cat: 'tv', eyebrow: 'Smart TVs', title: 'Una nueva visión.', body: 'Desde 4K QLED hasta 8K Ultra Elite.' },
    { cat: 'computing', eyebrow: 'Computación', title: 'Potencia sin concesiones.', body: 'Laptops y monitores para los que exigen más.' },
    { cat: 'audio', eyebrow: 'Audio', title: 'El sonido que se siente.', body: 'Dolby Atmos, DTS:X y potencia real.' }
  ]
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Home Config State
  const [homeConfig, setHomeConfig] = useState(() => {
    const saved = localStorage.getItem('soneview_home_config');
    return saved ? JSON.parse(saved) : defaultHomeConfig;
  });

  const updateHomeConfig = (newConfig) => {
    setHomeConfig(newConfig);
    localStorage.setItem('soneview_home_config', JSON.stringify(newConfig));
  };

  // Sincronización Inicial con esquema real ('products')
  const refreshProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data || []);
    } catch (error) {
      console.error('Error sincronizando con Supabase:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      await productService.addProduct(product);
      await refreshProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      await productService.updateProduct(id, updatedProduct);
      await refreshProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      await refreshProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const filterProducts = (term) => {
    if (!term.trim()) return products;
    const searchTermLower = term.toLowerCase();
    return products.filter(product => 
      product.name?.toLowerCase().includes(searchTermLower) ||
      product.category?.toLowerCase().includes(searchTermLower) ||
      product.description?.toLowerCase().includes(searchTermLower)
    );
  };

  const getProductById = (id) => {
    return products.find(product => String(product.id) === String(id));
  };

  const value = {
    products,
    loading,
    searchTerm,
    setSearchTerm,
    addProduct,
    updateProduct,
    deleteProduct,
    filterProducts,
    getProductById,
    refreshProducts,
    homeConfig,
    updateHomeConfig
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};