import supabase from '../database/supabase.js'

// Obtener todos los clientes
export const getClientes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener clientes' })
  }
}

// Obtener un cliente por id
export const getClienteById = async (req, res) => {
  const { id } = req.params
  try {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cliente' })
  }
}

// Crear cliente
export const createCliente = async (req, res) => {
  const { nombre, apellido, email, telefono, direccion } = req.body
  try {
    const { data, error } = await supabase
      .from('clientes')
      .insert({ nombre, apellido, email, telefono, direccion })
      .select()

    if (error) throw error
    res.status(201).json(data[0])
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cliente' })
  }
}

// Actualizar cliente
export const updateCliente = async (req, res) => {
  const { id } = req.params
  const { nombre, apellido, email, telefono, direccion } = req.body
  try {
    const { data, error } = await supabase
      .from('clientes')
      .update({ nombre, apellido, email, telefono, direccion })
      .eq('id', id)
      .select()

    if (error) throw error
    res.json(data[0])
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cliente' })
  }
}

// Eliminar cliente
export const deleteCliente = async (req, res) => {
  const { id } = req.params
  try {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id)

    if (error) throw error
    res.json({ message: 'Cliente eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cliente' })
  }
}

// Buscar clientes
export const searchClientes = async (req, res) => {
  const { q } = req.query
  try {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .or(`nombre.ilike.%${q}%,apellido.ilike.%${q}%,email.ilike.%${q}%`)

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar clientes' })
  }
}