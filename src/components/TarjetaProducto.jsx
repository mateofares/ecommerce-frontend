import { Link } from 'react-router-dom'
import Boton from './Boton'
import InsigniaEstado from './InsigniaEstado'

export default function TarjetaProducto({ producto }) {
  return (
    <article className="product-card">
      <Link to={`/producto/${producto.id}`} className="product-card__image">
        {producto.imagen && (
          <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
        )}
        
      </Link>

      <div className="product-card__content">
        <div className="product-card__top">
          <InsigniaEstado status={producto.estadoInsignia}>{producto.insignia}</InsigniaEstado>
          <p className="product-card__price">{producto.precio}</p>
        </div>

        <h3 className="product-card__title">{producto.nombre}</h3>
        <p className="product-card__description">{producto.descripcion}</p>

        <Boton variant="secondary">Anadir a la bolsa</Boton>
      </div>
    </article>
  )
}
