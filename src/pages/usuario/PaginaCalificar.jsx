import { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Boton from '../../components/Boton'
import InsigniaEstado from '../../components/InsigniaEstado'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'

const etiquetas = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente']

export default function PaginaCalificar() {
  const { ordenId } = useParams()
  const [orden, setOrden] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [calificacion, setCalificacion] = useState(0)
  const [hover, setHover] = useState(0)
  const [resena, setResena] = useState('')
  const [enviado, setEnviado] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:8080/ordenes/${ordenId}`, {
      credentials: 'include'
    })
      .then(r => r.json())
      .then(data => setOrden(data))
      .finally(() => setCargando(false))
      .catch(err => console.log('error:', err))
  }, [ordenId])

  function calificar() {
    const item = orden.items[0]
    fetch('http://localhost:8080/resenias', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productoId: item.productoId,
        ordenId: orden.id,
        calificacion,
        comentarios: resena,
        verificado: true
      })
    })
      .then(() => setEnviado(true))
      .catch(err => console.log('error:', err))
  }

  if (cargando) return (
    <PlantillaMarketplace>
      <main className="home" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ fontFamily: 'var(--font-titulo)', letterSpacing: '3px', fontSize: '12px' }}>CARGANDO...</p>
      </main>
    </PlantillaMarketplace>
  )

  if (!orden) return <Navigate to="/compras" replace />

  const item = orden.items[0]

  if (enviado) {
    return (
      <PlantillaMarketplace>
        <main className="home page-shell review-confirmation">
          <InsigniaEstado status="success">Resena publicada</InsigniaEstado>
          <h1 className="page-title">Gracias por calificar</h1>
          <p className="home__text">
            Tu resena de <strong>{item.productoTitulo}</strong> ayuda a otros compradores
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
            <div className="review-product__image">
              {item.productoTitulo?.slice(0, 2).toUpperCase()}
            </div>
            <div className="review-product__info">
              <InsigniaEstado status="success">{orden.estado}</InsigniaEstado>
              <h2 className="review-product__nombre">{item.productoTitulo}</h2>
              <p className="detail-info__price">$ {item.precioUnitario}</p>
            </div>
          </div>
          <div className="review-order-meta">
            <span className="order-card__code">Orden: #{orden.id}</span>
            <span className="review-order-meta__detail">Total: $ {orden.total}</span>
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
              onClick={calificar}
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
