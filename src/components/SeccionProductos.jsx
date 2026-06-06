import BarraBusqueda from './BarraBusqueda'
import TarjetaProducto from './TarjetaProducto'
import { useState } from 'react'
import Boton from './Boton'

export default function SeccionProductos({ titulo, items }) {
  const [categoria, SetCategoria] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const itemsFiltrados = items.filter((item) =>
    (item.titulo ?? '').toLowerCase().includes(busqueda.toLowerCase()) &&
    (categoria ? item.estado === categoria : true)
  )
  return (
    <section className="component-section">
      <div className="component-section__header">
        <h2>{titulo}</h2>
        <BarraBusqueda value={busqueda} onChange={setBusqueda} />
        <div className="filtros-categoria">
          <button
            className={`filtro-btn ${categoria === 'NUEVO' ? 'filtro-btn--activo' : ''}`}
            onClick={() => SetCategoria('NUEVO')}
          >Nuevo</button>
          <button
            className={`filtro-btn ${categoria === 'USADO' ? 'filtro-btn--activo' : ''}`}
            onClick={() => SetCategoria('USADO')}
          >Usado</button>
          <button
            className={`filtro-btn ${categoria === '' ? 'filtro-btn--activo' : ''}`}
            onClick={() => SetCategoria('')}
          >Todos</button>
        </div>
      </div>
      <p className="component-section__count">{itemsFiltrados.length} productos encontrados</p>
      <div className="product-grid">
        {itemsFiltrados.map((item) => (
           <TarjetaProducto key={item.id} producto={item} />
        ))}
      </div>
    </section>
  )
}

