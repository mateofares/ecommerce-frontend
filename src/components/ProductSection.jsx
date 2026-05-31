import BarraBusqueda from './BarraBusqueda'
import TarjetaProducto from './TarjetaProducto'

export default function ProductSection({ titulo, items }) {
  return (
    <section className="component-section">
      <div className="component-section__header">
        <h2>{titulo}</h2>
        <BarraBusqueda value="" onChange={() => {}} />
      </div>
      <div className="product-grid">
        {items.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  )
}
