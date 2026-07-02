import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RutaProtegida({ children }) {
  const { token, loading } = useSelector((state) => state.auth)

  if (loading) return <div className="page-shell">Cargando...</div>
  if (!token) return <Navigate to="/login" replace />
  return children
}
