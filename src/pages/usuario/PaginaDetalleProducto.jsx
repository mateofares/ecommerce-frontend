import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import InsigniaEstado from '../../components/ui/InsigniaEstado'
import TarjetaResena from '../../components/resenias/TarjetaResena'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import { FiArrowRight } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import '../../styles/detail.css'
import { postCarrito } from '../../redux/carritoSlice'
import { fetchReseniasByVendedor } from '../../redux/reseniaSlice'

const estadoMap = {
  NUEVO: { texto: 'Nuevo', status: 'success' },
  USADO: { texto: 'Usado', status: 'warning' },
}

const estadoProductoMap = {
  DISPONIBLE: { texto: 'En stock', status: 'success' },
  VENDIDO:    { texto: 'Vendido',  status: 'danger'  },
}

const formatTalle = (t) => (t ? t.replace(/^T(\d+[MW]?)$/, '$1') : t)

export default function PaginaDetalleProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [agregado, setAgregado] = useState(false)
  const [errorCarrito, setErrorCarrito] = useState('')

  const { items: productos, fetched, loading } = useSelector(state => state.productos)
  const { items: resenias, loading: loadingResenias } = useSelector(state => state.resenias)
  const token = useSelector(state => state.auth.token)

  const producto = productos.find(p => String(p.id) === String(id)) ?? null

  useEffect(() => {
    dispatch(fetchReseniasByVendedor(producto?.usuarioId))
  }, [dispatch])

  const agregarACarrito = () => {
    if (!token) { navigate('/login'); return }
    dispatch(postCarrito({ items: [{ productoId: producto.id }] }))
  }

  if (loading) return (
    <PlantillaMarketplace>
      <main className="home" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ fontFamily: 'var(--font-titulo)', letterSpacing: '3px', fontSize: '12px' }}>CARGANDO...</p>
      </main>
    </PlantillaMarketplace>
  )

  if (!producto) return (
    <PlantillaMarketplace>
      <main className="home" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ fontFamily: 'var(--font-titulo)', letterSpacing: '3px', fontSize: '12px' }}>PRODUCTO NO ENCONTRADO</p>
      </main>
    </PlantillaMarketplace>
  )

  const badge      = estadoMap[producto.estado]                ?? { texto: producto.estado,         status: 'neutral' }
  const stockBadge = estadoProductoMap[producto.estadoProducto] ?? { texto: producto.estadoProducto, status: 'neutral' }
  const tieneDescuento = producto.precioConDescuento != null && producto.precioConDescuento < producto.precio

  const specs = [
    producto.marca     && { label: 'Marca',     valor: producto.marca },
    producto.talle     && { label: 'Talle',     valor: formatTalle(producto.talle) },
    producto.color     && { label: 'Color',     valor: producto.color },
    producto.categoria && { label: 'Categoría', valor: producto.categoria },
    producto.estado    && { label: 'Condición', valor: badge.texto },
  ].filter(Boolean)

  return (
    <PlantillaMarketplace>
      <main className="home">

        <nav className="detail-breadcrumb">
          <Link to="/productos">Tienda</Link>
          <span>›</span>
          <Link to="/productos">{producto.categoria}</Link>
          <span>›</span>
          <span className="detail-breadcrumb__current">{producto.titulo}</span>
        </nav>

        <div className="detail-layout">

          <section className="detail-gallery">
            <div className="detail-gallery__main">
              <span className="detail-gallery__badge">{badge.texto}</span>
              <div className="detail-gallery__placeholder">
                {producto.imagenUrl
                  ? <img src={producto.imagenUrl} alt={producto.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                  : <span>{producto.titulo?.slice(0, 2).toUpperCase()}</span>
                }
              </div>
            </div>
          </section>

          <section className="detail-info">

            <div className="detail-info__badges">
              <InsigniaEstado status={badge.status}>{badge.texto}</InsigniaEstado>
              <InsigniaEstado status={stockBadge.status}>{stockBadge.texto}</InsigniaEstado>
            </div>

            <h1 className="detail-info__title">{producto.titulo}</h1>

            <div className="detail-info__price-row">
              {tieneDescuento ? (
                <>
                  <span className="detail-info__price">$ {producto.precioConDescuento.toFixed(2)}</span>
                  <span className="detail-info__price-original">$ {producto.precio}</span>
                </>
              ) : (
                <span className="detail-info__price">$ {producto.precio}</span>
              )}
            </div>

            {producto.descripcion && (
              <p className="detail-info__desc">{producto.descripcion}</p>
            )}

            {specs.length > 0 && (
              <div className="detail-info__specs">
                {specs.map(({ label, valor }) => (
                  <div key={label} className="detail-info__spec-item">
                    <span className="detail-info__spec-label">{label}</span>
                    <span className="detail-info__spec-valor">{valor}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="detail-info__actions">
              <button
                className="detail-info__btn-primary"
                onClick={agregarACarrito}
                type="button"
                disabled={producto.estadoProducto === 'VENDIDO' || agregado}
              >
                {agregado ? `${formatTalle(producto.talle) ?? ''} en bolsa ✓` : 'Añadir al carrito'}
                {!agregado && <FiArrowRight size={16} />}
              </button>
            </div>

            {errorCarrito && (
              <p style={{ color: '#c0392b', fontSize: '13px', marginTop: '10px' }}>{errorCarrito}</p>
            )}

            <div style={{ marginTop: '32px', borderTop: '2px solid #1c1c1a', paddingTop: '24px' }}>
              <div className="resenas__header" style={{ marginBottom: '16px' }}>
                <h2 className="resenas__titulo">Reseñas del vendedor</h2>
                {resenias.length > 0 && (
                  <span className="resenas__cantidad">{resenias.length} opiniones</span>
                )}
              </div>
              {loadingResenias ? (
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CARGANDO RESEÑAS...</p>
              ) : resenias.length === 0 ? (
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Este vendedor aún no tiene reseñas.
                </p>
              ) : (
                <div className="resenas__grid">
                  {resenias.map(r => <TarjetaResena key={r.id} resena={r} />)}
                </div>
              )}
            </div>

          </section>
        </div>

      </main>
    </PlantillaMarketplace>
  )
}
