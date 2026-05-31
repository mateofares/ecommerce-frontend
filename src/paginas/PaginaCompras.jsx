import TarjetaPedido from '../components/TarjetaPedido'
import { pedidos } from '../datos/datosPrueba'
import PlantillaMarketplace from '../plantillas/PlantillaMarketplace'

export default function PaginaCompras() {
  return (
    <PlantillaMarketplace>
      <main className="home page-shell">
        <p className="home__eyebrow">Mi perfil // compras</p>
        <h1 className="page-title">Historial de compras</h1>
        <div className="order-list">
          {pedidos.map((pedido) => (
            <TarjetaPedido key={pedido.codigo} pedido={pedido} />
          ))}
        </div>
      </main>
    </PlantillaMarketplace>
  )
}

