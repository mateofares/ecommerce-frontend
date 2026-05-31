import { Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminInvoicesPage from './pages/AdminInvoicesPage'
import AdminShippingPage from './pages/AdminShippingPage'
import AdminUsersPage from './pages/AdminUsersPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import OrdersPage from './pages/OrdersPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductsPage from './pages/ProductsPage'
import ProfilePage from './pages/ProfilePage'
import SellPage from './pages/SellPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="/nuevo" element={<ProductsPage filtro="Nuevo" />} />
      <Route path="/usado" element={<ProductsPage filtro="Usado" />} />
      <Route path="/producto/:id" element={<ProductDetailPage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/compras" element={<OrdersPage />} />
      <Route path="/vender" element={<SellPage />} />
      <Route path="/perfil" element={<ProfilePage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/envios" element={<AdminShippingPage />} />
      <Route path="/admin/usuarios" element={<AdminUsersPage />} />
      <Route path="/admin/facturas" element={<AdminInvoicesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
