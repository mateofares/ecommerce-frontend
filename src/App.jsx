import { Navigate, Route, Routes } from 'react-router-dom'
import PaginaAdminDashboard from './paginas/PaginaAdminDashboard'
import PaginaAdminEnvios from './paginas/PaginaAdminEnvios'
import PaginaAdminFacturas from './paginas/PaginaAdminFacturas'
import PaginaAdminUsuarios from './paginas/PaginaAdminUsuarios'
import PaginaCarrito from './paginas/PaginaCarrito'
import PaginaCheckout from './paginas/PaginaCheckout'
import PaginaCompras from './paginas/PaginaCompras'
import PaginaDetalleProducto from './paginas/PaginaDetalleProducto'
import PaginaInicio from './paginas/PaginaInicio'
import PaginaLogin from './paginas/PaginaLogin'
import PaginaPerfil from './paginas/PaginaPerfil'
import PaginaProductos from './paginas/PaginaProductos'
import PaginaVender from './paginas/PaginaVender'

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
      <Route path="/vender" element={<PaginaVender />} />
      <Route path="/perfil" element={<PaginaPerfil />} />
      <Route path="/admin" element={<PaginaAdminDashboard />} />
      <Route path="/admin/envios" element={<PaginaAdminEnvios />} />
      <Route path="/admin/usuarios" element={<PaginaAdminUsuarios />} />
      <Route path="/admin/facturas" element={<PaginaAdminFacturas />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
