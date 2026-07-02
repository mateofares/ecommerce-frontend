import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RutaAdmin({ children }) {
  const { token, rol, loading } = useSelector((state) => state.auth)

  if (loading) return <div className="page-shell">Cargando...</div>
  if (!token) return <Navigate to="/login" replace />
  if (rol !== 'ADMINISTRADOR') return <Navigate to="/" replace />
  return children
}
