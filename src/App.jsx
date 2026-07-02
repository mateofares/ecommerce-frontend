import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import PaginaAdminDashboard from './pages/admin/PaginaAdminDashboard'
import PaginaAdminEnvios from './pages/admin/PaginaAdminEnvios'
import PaginaAdminFacturas from './pages/admin/PaginaAdminFacturas'
import PaginaAdminUsuarios from './pages/admin/PaginaAdminUsuarios'
import PaginaAdminProductos from './pages/admin/PaginaAdminProductos'
import PaginaCalificar from './pages/usuario/PaginaCalificar'
import PaginaCarrito from './pages/usuario/PaginaCarrito'
import PaginaCheckout from './pages/usuario/PaginaCheckout'
import PaginaCompras from './pages/usuario/PaginaCompras'
import PaginaDetalleProducto from './pages/usuario/PaginaDetalleProducto'
import PaginaInicio from './pages/usuario/PaginaInicio'
import PaginaLogin from './pages/usuario/PaginaLogin'
import PaginaPerfil from './pages/usuario/PaginaPerfil'
import PaginaProductos from './pages/usuario/PaginaProductos'
import PaginaVender from './pages/usuario/PaginaVender'
import PaginaMisProductos from './pages/usuario/PaginaMisProductos'
import RutaProtegida from './components/auth/RutaProtegida'
import RutaAdmin from './components/auth/RutaAdmin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Publicas */}
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/productos" element={<PaginaProductos />} />
        <Route path="/nuevo" element={<PaginaProductos filtro="Nuevo" />} />
        <Route path="/usado" element={<PaginaProductos filtro="Usado" />} />
        <Route path="/producto/:id" element={<PaginaDetalleProducto />} />

        {/* Requieren sesion */}
        <Route path="/carrito" element={<RutaProtegida><PaginaCarrito /></RutaProtegida>} />
        <Route path="/checkout" element={<RutaProtegida><PaginaCheckout /></RutaProtegida>} />
        <Route path="/compras" element={<RutaProtegida><PaginaCompras /></RutaProtegida>} />
        <Route path="/calificar/:ordenId/:productoId" element={<RutaProtegida><PaginaCalificar /></RutaProtegida>} />
        <Route path="/vender" element={<RutaProtegida><PaginaVender /></RutaProtegida>} />
        <Route path="/mis-productos" element={<RutaProtegida><PaginaMisProductos /></RutaProtegida>} />
        <Route path="/perfil" element={<RutaProtegida><PaginaPerfil /></RutaProtegida>} />

        {/* Solo administradores */}
        <Route path="/admin" element={<RutaAdmin><PaginaAdminDashboard /></RutaAdmin>} />
        <Route path="/admin/envios" element={<RutaAdmin><PaginaAdminEnvios /></RutaAdmin>} />
        <Route path="/admin/usuarios" element={<RutaAdmin><PaginaAdminUsuarios /></RutaAdmin>} />
        <Route path="/admin/facturas" element={<RutaAdmin><PaginaAdminFacturas /></RutaAdmin>} />
        <Route path="/admin/productos" element={<RutaAdmin><PaginaAdminProductos /></RutaAdmin>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
