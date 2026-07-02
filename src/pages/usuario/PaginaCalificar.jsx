import { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Boton from '../../components/ui/Boton'
import InsigniaEstado from '../../components/ui/InsigniaEstado'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import SelectorEstrellas from '../../components/resenias/SelectorEstrellas'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMisCompras } from '../../redux/ordenSlice'
import { postResenia } from '../../redux/reseniaSlice'

export default function PaginaCalificar() {
  const { ordenId, productoId } = useParams()
  const [calificacion, setCalificacion] = useState(0)
  const [resena, setResena] = useState('')
  const [enviado, setEnviado] = useState(false)
  const dispatch = useDispatch()

  const { items: compras, fetched, loading } = useSelector(state => state.ordenes)

  useEffect(() => {
    if (!fetched) dispatch(fetchMisCompras())
  }, [dispatch])

  const orden = compras.find(o => String(o.id) === String(ordenId)) ?? null
  const item = orden?.items.find(i => String(i.productoId) === String(productoId)) ?? null

  const calificar = () => {
    dispatch(postResenia({
      productoId: item.productoId,
      ordenId: orden.id,
      calificacion,
      comentarios: resena,
      verificado: true
    }))
    setEnviado(true)
  }

  if (loading) return (
    <PlantillaMarketplace>
      <main className="home" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ fontFamily: 'var(--font-titulo)', letterSpacing: '3px', fontSize: '12px' }}>CARGANDO...</p>
      </main>
    </PlantillaMarketplace>
  )

  if (!orden || !item) return <Navigate to="/compras" replace />

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
              {item.imagenUrl
                ? <img src={item.imagenUrl} alt={item.productoTitulo} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                : item.productoTitulo?.slice(0, 2).toUpperCase()
              }
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
          <SelectorEstrellas calificacion={calificacion} onSelect={setCalificacion} />

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
