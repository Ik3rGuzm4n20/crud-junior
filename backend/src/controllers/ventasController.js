import supabase from '../database/supabase.js'

// Obtener todas las ventas con info del cliente
export const getVentas = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('ventas')
      .select(`
        *,
        clientes (nombre, apellido, email),
        usuarios (nombre)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ventas' })
  }
}

// Obtener una venta con su detalle
export const getVentaById = async (req, res) => {
  const { id } = req.params
  try {
    const { data: venta, error } = await supabase
      .from('ventas')
      .select(`
        *,
        clientes (nombre, apellido, email),
        usuarios (nombre),
        venta_detalle (
          cantidad,
          precio_unitario,
          productos (nombre, categoria)
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    res.json(venta)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener venta' })
  }
}

// Crear venta con su detalle
export const createVenta = async (req, res) => {
  const { cliente_id, productos } = req.body
  const usuario_id = req.user.id

  try {
    // Calcular el total sumando precio * cantidad de cada producto
    const total = productos.reduce((sum, p) => sum + (p.precio_unitario * p.cantidad), 0)

    // Crear la venta cabecera
    const { data: venta, error: ventaError } = await supabase
      .from('ventas')
      .insert({ cliente_id, usuario_id, total })
      .select()

    if (ventaError) throw ventaError

    // Crear el detalle de la venta
    const detalle = productos.map(p => ({
      venta_id: venta[0].id,
      producto_id: p.producto_id,
      cantidad: p.cantidad,
      precio_unitario: p.precio_unitario
    }))

    const { error: detalleError } = await supabase
      .from('venta_detalle')
      .insert(detalle)

    if (detalleError) throw detalleError

    // Actualizar el stock de cada producto
    for (const p of productos) {
      const { data: producto } = await supabase
        .from('productos')
        .select('stock')
        .eq('id', p.producto_id)
        .single()

      await supabase
        .from('productos')
        .update({ stock: producto.stock - p.cantidad })
        .eq('id', p.producto_id)
    }

    res.status(201).json({ message: 'Venta creada correctamente', venta: venta[0] })
  } catch (error) {
    res.status(500).json({ message: 'Error al crear venta' })
  }
}

// Eliminar venta
export const deleteVenta = async (req, res) => {
  const { id } = req.params
  try {
    // Primero eliminar el detalle
    await supabase
      .from('venta_detalle')
      .delete()
      .eq('venta_id', id)

    // Luego eliminar la venta
    const { error } = await supabase
      .from('ventas')
      .delete()
      .eq('id', id)

    if (error) throw error
    res.json({ message: 'Venta eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar venta' })
  }
}

// Reporte de ventas
export const getReporte = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('ventas')
      .select(`
        *,
        clientes (nombre, apellido),
        venta_detalle (
          cantidad,
          precio_unitario,
          productos (nombre, categoria)
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    const totalVentas = data.length
    const totalIngresos = data.reduce((sum, v) => sum + Number(v.total), 0)

    res.json({
      totalVentas,
      totalIngresos,
      ventas: data
    })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reporte' })
  }
}