import { createClient } from '@supabase/supabase-js';

// Credenciales Oficiales de Soneview
const supabaseUrl = 'https://nqpexejimgxysfqculen.supabase.co';
const supabaseAnonKey = 'sb_publishable_OH-jsBnUda5QC9w8zWekFg_xF5lxOUT';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Servicio de Productos Sincronizado con el Esquema Real
 * Tabla: 'products'
 * Columnas: id, name, description, image_url, category, specs, created_at
 */
export const productService = {
  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getProductsByCategory(category) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async searchProducts(term) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${term}%,description.ilike.%${term}%,category.ilike.%${term}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async addProduct(product) {
    // Mapeo al esquema real de la base de datos
    const dbProduct = {
      name: product.nombre,
      description: product.descripcion,
      image_url: product.imagen_url,
      category: product.categoria,
      specs: product.especificaciones ? { list: product.especificaciones.split(/[,\n]/).map(s => s.trim()).filter(Boolean) } : {}
    };

    const { data, error } = await supabase
      .from('products')
      .insert([dbProduct])
      .select();

    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
  },

  async updateProduct(id, updates) {
    const dbUpdates = {};
    if (updates.nombre) dbUpdates.name = updates.nombre;
    if (updates.descripcion) dbUpdates.description = updates.descripcion;
    if (updates.imagen_url) dbUpdates.image_url = updates.imagen_url;
    if (updates.categoria) dbUpdates.category = updates.categoria;
    if (updates.especificaciones) dbUpdates.specs = { list: updates.especificaciones.split(/[,\n]/).map(s => s.trim()).filter(Boolean) };

    const { data, error } = await supabase
      .from('products')
      .update(dbUpdates)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
  },

  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};