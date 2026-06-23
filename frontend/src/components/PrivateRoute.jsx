import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Si no hay usuario logueado redirige al login
const PrivateRoute = ({ children }) => {
  const { usuario } = useAuth()
  return usuario ? children : <Navigate to="/login" />
}

export default PrivateRoute