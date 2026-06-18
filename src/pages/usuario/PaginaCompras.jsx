import TarjetaPedido from '../../components/TarjetaPedido'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function PaginaCompras() {

  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    api.get('/ordenes/mis-compras')
      .then(data => setPedidos(data))
      .catch(err => console.log('error:', err))
      .finally(() => setCargando(false))
  }, [])

  return (
    <PlantillaMarketplace>
      <main className="home page-shell">
        <p className="home__eyebrow">Mi perfil // compras</p>
        <h1 className="page-title">Historial de compras</h1>
        {cargando ? (
          <p className="home__text">Cargando...</p>
        ) : pedidos.length === 0 ? (
          <p className="home__text">Todavia no realizaste compras.</p>
        ) : (
          <div className="order-list">
            {pedidos.map((pedido) => (
              <TarjetaPedido key={pedido.id} pedido={pedido} />
            ))}
          </div>
        )}
      </main>
    </PlantillaMarketplace>
  )
}

