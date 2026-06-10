import TarjetaPedido from '../../components/TarjetaPedido'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import { useEffect, useState } from 'react'

export default function PaginaCompras() {

  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:8080/ordenes/mis-compras', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setPedidos(data))
      .catch(err => console.log('error:', err))
  }, [])

  return (
    <PlantillaMarketplace>
      <main className="home page-shell">
        <p className="home__eyebrow">Mi perfil // compras</p>
        <h1 className="page-title">Historial de compras</h1>
        <div className="order-list">
          {pedidos.map((pedido) => (
            <TarjetaPedido key={pedido.id} pedido={pedido} />
          ))}
        </div>
      </main>
    </PlantillaMarketplace>
  )
}

