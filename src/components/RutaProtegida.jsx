import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Exige sesion iniciada. Mientras se rehidrata la sesion muestra un estado de carga
// para evitar redirigir a /login en un parpadeo tras recargar la pagina.
export default function RutaProtegida({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <div className="page-shell">Cargando...</div>
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}
