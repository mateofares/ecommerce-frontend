import { Link } from 'react-router-dom'
import Boton from './Boton'
import InsigniaEstado from './InsigniaEstado'

export default function TarjetaProducto({ producto }) {
  return (
    <article className="product-card">
      <Link to={`/producto/${producto.id}`} className="product-card__image">
        <span>{producto.etiquetaImagen}</span>
      </Link>

      <div className="product-card__content">
        <div className="product-card__top">
          <InsigniaEstado status={producto.estadoInsignia}>{producto.insignia}</InsigniaEstado>
          <p className="product-card__price">{producto.precio}</p>
        </div>

        <h3 className="product-card__title">{producto.nombre}</h3>
        <p className="product-card__description">{producto.descripcion}</p>

        <Boton variant="secondary">Añadir a la bolsa</Boton>
      </div>
    </article>
  )
}
