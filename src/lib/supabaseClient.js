import { createClient } from '@supabase/supabase-js';

// 1. LECTURA DIRECTA DE VARIABLES
// Usamos el string exacto para que el bundler de Vite pueda reemplazarlo en tiempo de compilación.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 2. LOGS DE DIAGNÓSTICO (Como solicitaste, para ver en F12)
console.log("=== DIAGNÓSTICO DE SUPABASE ===");
console.log("URL Detectada:", supabaseUrl);
console.log("KEY Detectada:", supabaseAnonKey ? "Existe (OK)" : "Vacía (Undefined)");
console.log("===============================");

// Si falta alguna variable, usamos un fallback dummy solo para que no tire error de "URL is required" al hacer import
const safeUrl = supabaseUrl || 'https://placeholder.supabase.co';
const safeKey = supabaseAnonKey || 'placeholder_key';

// 3. EXPORTACIÓN LIMPIA DEL CLIENTE
export const supabase = createClient(safeUrl, safeKey);

// 4. MANTENEMOS EL CRUD AISLADO POR SI SE USA EN OTROS COMPONENTES
export const productService = {
  async getAllProducts() {
    try {
      if (safeUrl === 'https://placeholder.supabase.co') return [];
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error supabase.getAllProducts:', error);
        return [];
      }
      return data || [];
    } catch (e) {
      console.error("Fetch Exception en getAllProducts:", e);
      return []; 
    }
  },

  async createProduct(productData) {
    if (safeUrl === 'https://placeholder.supabase.co') throw new Error("Sin conexión a base de datos real (URL es placeholder)");
    
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: productData.name,
        description: productData.description || null,
        image_url: productData.image_url,
        category: productData.category,
        price: productData.price,
        specs: productData.specs
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProduct(id, updates) {
    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
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