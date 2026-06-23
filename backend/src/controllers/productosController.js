import supabase from '../database/supabase.js'

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' })
  }
}

// Obtener un producto por id
export const getProductoById = async (req, res) => {
  const { id } = req.params
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto' })
  }
}

// Crear producto
export const createProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock, categoria } = req.body
  try {
    const { data, error } = await supabase
      .from('productos')
      .insert({ nombre, descripcion, precio, stock, categoria })
      .select()

    if (error) throw error
    res.status(201).json(data[0])
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto' })
  }
}

// Actualizar producto
export const updateProducto = async (req, res) => {
  const { id } = req.params
  const { nombre, descripcion, precio, stock, categoria } = req.body
  try {
    const { data, error } = await supabase
      .from('productos')
      .update({ nombre, descripcion, precio, stock, categoria, updated_at: new Date() })
      .eq('id', id)
      .select()

    if (error) throw error
    res.json(data[0])
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto' })
  }
}

// Eliminar producto
export const deleteProducto = async (req, res) => {
  const { id } = req.params
  try {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id)

    if (error) throw error
    res.json({ message: 'Producto eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto' })
  }
}

// Buscar productos
export const searchProductos = async (req, res) => {
  const { q } = req.query
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .ilike('nombre', `%${q}%`)

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar productos' })
  }
}