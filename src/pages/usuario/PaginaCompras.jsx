import TarjetaPedido from '../../components/TarjetaPedido'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMisCompras } from '../../redux/ordenSlice'

export default function PaginaCompras() {

  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)

  const dispatch = useDispatch()
  const {items, loading, error, fetched} = useSelector((state) => state.ordenes)
  useEffect(() => {
    if (!fetched) dispatch(fetchMisCompras())
  }, [dispatch])

  return (
    <PlantillaMarketplace>
      <main className="home page-shell">
        <p className="home__eyebrow">Mi perfil // compras</p>
        <h1 className="page-title">Historial de compras</h1>
        {loading ? (
          <p className="home__text">Cargando...</p>
        ) : items.length === 0 ? (
          <p className="home__text">Todavia no realizaste compras.</p>
        ) : (
          <div className="order-list">
            {items.map((pedido) => (
              <TarjetaPedido key={pedido.id} pedido={pedido} />
            ))}
          </div>
        )}
      </main>
    </PlantillaMarketplace>
  )
}

