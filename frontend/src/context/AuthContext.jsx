import { createContext, useContext, useState } from 'react'
import { login as loginService, logout as logoutService, getUsuarioActual } from '../services/authService'

// Crea el contexto — permite compartir el estado del login en toda la app
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(getUsuarioActual())

  // Llama al servicio de login y guarda el usuario en el estado
  const login = async (email, password) => {
    const data = await loginService(email, password)
    setUsuario(data.usuario)
    return data
  }

  // Limpia el estado y localStorage
  const logout = () => {
    logoutService()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext)