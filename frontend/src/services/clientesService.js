import api from './api'

export const getClientes = () => api.get('/clientes')
export const getClienteById = (id) => api.get(`/clientes/${id}`)
export const createCliente = (data) => api.post('/clientes', data)
export const updateCliente = (id, data) => api.put(`/clientes/${id}`, data)
export const deleteCliente = (id) => api.delete(`/clientes/${id}`)
export const searchClientes = (q) => api.get(`/clientes/search?q=${q}`)