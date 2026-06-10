import { Navigate, Route, Routes } from 'react-router-dom'
import PaginaAdminDashboard from './pages/admin/PaginaAdminDashboard'
import PaginaAdminEnvios from './pages/admin/PaginaAdminEnvios'
import PaginaAdminFacturas from './pages/admin/PaginaAdminFacturas'
import PaginaAdminUsuarios from './pages/admin/PaginaAdminUsuarios'
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/login" element={<PaginaLogin />} />
      <Route path="/productos" element={<PaginaProductos />} />
      <Route path="/nuevo" element={<PaginaProductos filtro="Nuevo" />} />
      <Route path="/usado" element={<PaginaProductos filtro="Usado" />} />
      <Route path="/producto/:id" element={<PaginaDetalleProducto />} />
      <Route path="/carrito" element={<PaginaCarrito />} />
      <Route path="/checkout" element={<PaginaCheckout />} />
      <Route path="/compras" element={<PaginaCompras />} />
      <Route path="/calificar/:ordenId" element={<PaginaCalificar />} />
      <Route path="/vender" element={<PaginaVender />} />
      <Route path="/mis-productos" element={<PaginaMisProductos />} />
      <Route path="/perfil" element={<PaginaPerfil />} />
      <Route path="/admin" element={<PaginaAdminDashboard />} />
      <Route path="/admin/envios" element={<PaginaAdminEnvios />} />
      <Route path="/admin/usuarios" element={<PaginaAdminUsuarios />} />
      <Route path="/admin/facturas" element={<PaginaAdminFacturas />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
