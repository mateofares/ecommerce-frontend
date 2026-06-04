import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Boton from '../../components/Boton'
import InsigniaEstado from '../../components/InsigniaEstado'
import { pedidos, productos } from '../../datos/datosPrueba'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'

const etiquetas = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente']

export default function PaginaCalificar() {
  const { productId } = useParams()
  const pedido = pedidos.find((p) => p.productId === Number(productId))
  const producto = productos.find((p) => p.id === Number(productId))

  const [calificacion, setCalificacion] = useState(0)
  const [hover, setHover] = useState(0)
  const [titulo, setTitulo] = useState('')
  const [resena, setResena] = useState('')
  const [enviado, setEnviado] = useState(false)

  if (!pedido || !producto) {
    return <Navigate to="/compras" replace />
  }

  if (enviado) {
    return (
      <PlantillaMarketplace>
        <main className="home page-shell review-confirmation">
          <InsigniaEstado status="success">Resena publicada</InsigniaEstado>
          <h1 className="page-title">Gracias por calificar</h1>
          <p className="home__text">
            Tu resena de <strong>{producto.nombre}</strong> ayuda a otros compradores
            a descubrir piezas autenticas del archivo.
          </p>
          <div className="hero__actions">
            <Link to="/compras" className="button button--primary">Ver mis compras</Link>
            <Link to="/productos" className="button button--ghost">Seguir explorando</Link>
          </div>
        </main>
      </PlantillaMarketplace>
    )
  }

  return (
    <PlantillaMarketplace>
      <main className="home review-layout">
        <section className="review-product">
          <p className="home__eyebrow">Calificar compra</p>
          <div className="review-product__card">
            <div className="review-product__image">{producto.etiquetaImagen}</div>
            <div className="review-product__info">
              <InsigniaEstado status={producto.estadoInsignia}>{producto.insignia}</InsigniaEstado>
              <h2 className="review-product__nombre">{producto.nombre}</h2>
              <p className="detail-info__price">{producto.precio}</p>
              <p className="review-product__descripcion">{producto.descripcion}</p>
            </div>
          </div>
          <div className="review-order-meta">
            <span className="order-card__code">Orden: {pedido.codigo}</span>
            <span className="review-order-meta__detail">{pedido.fecha} / {pedido.talle} / {pedido.total}</span>
          </div>
        </section>

        <section className="review-form">
          <p className="selector__label">Tu valoracion</p>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn ${(hover || calificacion) >= star ? 'star-btn--active' : ''}`}
                onClick={() => setCalificacion(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </button>
            ))}
          </div>
          {calificacion > 0 && (
            <p className="star-label">{etiquetas[calificacion]}</p>
          )}

          <label className="review-label">
            Titulo de la resena
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Resume tu experiencia en una frase"
            />
          </label>

          <label className="review-label">
            Resena detallada
            <textarea
              value={resena}
              onChange={(e) => setResena(e.target.value)}
              placeholder="Contanos sobre el estado de la prenda, el vendedor, el envio..."
            />
          </label>

          <div className="detail-info__actions">
            <Boton
              disabled={calificacion === 0}
              onClick={() => setEnviado(true)}
            >
              Publicar resena
            </Boton>
            <Link to="/compras" className="button button--ghost">Cancelar</Link>
          </div>
          {calificacion === 0 && (
            <p className="review-hint">Selecciona una calificacion para continuar</p>
          )}
        </section>
      </main>
    </PlantillaMarketplace>
  )
}
