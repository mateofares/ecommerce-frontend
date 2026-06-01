import BarraBusqueda from './BarraBusqueda'
import TarjetaProducto from './TarjetaProducto'
import { useState } from 'react'

export default function SeccionProductos({ titulo, items }) {
  const [busqueda, setBusqueda] = useState('')
  const itemsFiltrados = items.filter((item) =>
  item.nombre.toLowerCase().includes(busqueda.toLowerCase())
)
  return (
    <section className="component-section">
      <div className="component-section__header">
        <h2>{titulo}</h2>
        <BarraBusqueda value={busqueda} onChange={setBusqueda} />
      </div>
      <div className="product-grid">
        {itemsFiltrados.map((item) => (
           <TarjetaProducto key={item.id} producto={item} />
        ))}
      </div>
    </section>
  )
}

