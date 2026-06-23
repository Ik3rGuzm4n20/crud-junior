import api from './api'

export const getVentas = () => api.get('/ventas')
export const getVentaById = (id) => api.get(`/ventas/${id}`)
export const createVenta = (data) => api.post('/ventas', data)
export const deleteVenta = (id) => api.delete(`/ventas/${id}`)
export const getReporte = () => api.get('/ventas/reporte')