import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Exige sesion iniciada Y rol ADMINISTRADOR. El backend valida igualmente cada endpoint;
// esto es solo para no mostrar UI de admin a quien no corresponde.
export default function RutaAdmin({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) return <div className="page-shell">Cargando...</div>
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return children
}
