import api from './api'

// Llama al endpoint de login y guarda token en localStorage
export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password })
  localStorage.setItem('token', data.token)
  localStorage.setItem('usuario', JSON.stringify(data.usuario))
  return data
}

// Elimina el token y datos del usuario
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
}

// Verifica si hay un usuario logueado
export const getUsuarioActual = () => {
  const usuario = localStorage.getItem('usuario')
  return usuario ? JSON.parse(usuario) : null
}