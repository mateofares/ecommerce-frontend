import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import InsigniaEstado from '../../components/InsigniaEstado'
import TarjetaResena from '../../components/TarjetaResena'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import { FiHeart, FiArrowRight } from 'react-icons/fi'
import '../../styles/detail.css'

const estadoMap = {
  NUEVO: { texto: 'Nuevo', status: 'success' },
  USADO: { texto: 'Usado', status: 'warning' },
}

const estadoProductoMap = {
  DISPONIBLE: { texto: 'En stock', status: 'success' },
  VENDIDO:    { texto: 'Vendido',  status: 'danger'  },
}

export default function PaginaDetalleProducto() {
  const { id } = useParams()

  const [agregado, setAgregado]     = useState(false)
  const [resenas, setResenas]       = useState([])
  const [producto, setProducto]     = useState(null)
  const [cargando, setCargando]     = useState(true)

  useEffect(() => {
    setCargando(true)
    fetch(`http://localhost:8080/productos?id=${id}`)
      .then(res => res.json())
      .then(data => setProducto(data[0] ?? null))
      .finally(() => setCargando(false))
      .catch((error) => {console.log("error:" + error)})
  }, [id])

  useEffect(() => {
    fetch(`http://localhost:8080/resenias/producto/${id}`)
      .then(res => res.json())
      .then(data => setResenas(data))
      .catch((error) => {console.log("error:" + error)})
  }, [id])

  if (cargando) return (
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

  const badge       = estadoMap[producto.estado]         ?? { texto: producto.estado,         status: 'neutral' }
  const stockBadge  = estadoProductoMap[producto.estadoProducto] ?? { texto: producto.estadoProducto, status: 'neutral' }
  const tieneDescuento = producto.precioConDescuento != null && producto.precioConDescuento < producto.precio

  const specs = [
    producto.marca     && { label: 'Marca',     valor: producto.marca },
    producto.talle     && { label: 'Talle',     valor: producto.talle },
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

          {/* ── GALERÍA ── */}
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

          {/* ── INFO ── */}
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
                onClick={() => setAgregado(true)}
                type="button"
                disabled={producto.estadoProducto === 'VENDIDO'}
              >
                {agregado ? `${producto.talle ?? ''} en bolsa ✓` : 'Añadir al carrito'}
                {!agregado && <FiArrowRight size={16} />}
              </button>

              <button className="detail-info__btn-ghost" type="button">
                <FiHeart size={15} />
                Añadir a lista de deseos
              </button>
            </div>

          </section>
        </div>

        {resenas.length > 0 && (
          <section className="resenas">
            <div className="resenas__header">
              <h2 className="resenas__titulo">Reseñas</h2>
              <span className="resenas__cantidad">{resenas.length} opiniones</span>
            </div>
            <div className="resenas__grid">
              {resenas.map(r => <TarjetaResena key={r.id} resena={r} />)}
            </div>
          </section>
        )}

      </main>
    </PlantillaMarketplace>
  )
}
