import { Link } from 'react-router-dom'
import Boton from './Boton'
import InsigniaEstado from './InsigniaEstado'

const estadoBadge = {
  NUEVO:  { texto: 'Nuevo',  status: 'success' },
  USADO:  { texto: 'Usado',  status: 'warning' },
}

export default function TarjetaProducto({ producto }) {
  const badge = estadoBadge[producto.estado] ?? { texto: producto.estado, status: 'neutral' }
  const precio = producto.precioConDescuento ?? producto.precio

  return (
    <article className="product-card">
      <Link to={`/producto/${producto.id}`} className="product-card__image">
        {producto.imagenUrl && (
          <img src={producto.imagenUrl} alt={producto.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
        )}
      </Link>

      <div className="product-card__content">
        <div className="product-card__top">
          <InsigniaEstado status={badge.status}>{badge.texto}</InsigniaEstado>
          <p className="product-card__price">$ {precio}</p>
        </div>

        <h3 className="product-card__title">{producto.titulo}</h3>
        <p className="product-card__description">{producto.descripcion}</p>

        <Boton variant="secondary">Anadir a la bolsa</Boton>
      </div>
    </article>
  )
}
