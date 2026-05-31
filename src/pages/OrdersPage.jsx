import TarjetaPedido from '../components/TarjetaPedido'
import { pedidos } from '../data/mockData'
import MarketplaceLayout from '../layouts/MarketplaceLayout'

export default function OrdersPage() {
  return (
    <MarketplaceLayout>
      <main className="home page-shell">
        <p className="home__eyebrow">Mi perfil // compras</p>
        <h1 className="page-title">Historial de compras</h1>
        <div className="order-list">
          {pedidos.map((pedido) => (
            <TarjetaPedido key={pedido.codigo} pedido={pedido} />
          ))}
        </div>
      </main>
    </MarketplaceLayout>
  )
}
