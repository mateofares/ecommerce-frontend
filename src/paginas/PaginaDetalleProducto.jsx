import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import InsigniaEstado from '../components/InsigniaEstado'
import SelectorTalle from '../components/SelectorTalle'
import { productos, resenas } from '../datos/datosPrueba'
import TarjetaResena from '../components/TarjetaResena'
import PlantillaMarketplace from '../plantillas/PlantillaMarketplace'
import { FiHeart, FiArrowRight } from 'react-icons/fi'
import '../styles/detail.css'

export default function PaginaDetalleProducto() {
  const { id } = useParams()
  const producto = productos.find((item) => item.id === Number(id))

  const [talle, setTalle] = useState('S')
  const [agregado, setAgregado] = useState(false)
  const [thumbActiva, setThumbActiva] = useState(0)

  if (!producto) return <Navigate to="/productos" replace />

  const thumbs = [
    producto.etiquetaImagen,
    'Detalle',
    'Espalda',
    '▶',
  ]

  return (
    <PlantillaMarketplace>
      <main className="home">

        {/* Breadcrumb */}
        <nav className="detail-breadcrumb">
          <Link to="/productos">Tienda</Link>
          <span>›</span>
          <Link to="/productos">{producto.categoria}</Link>
          <span>›</span>
          <span className="detail-breadcrumb__current">{producto.nombre}</span>
        </nav>

        {/* Grid principal */}
        <div className="detail-layout">

          {/* ── GALERÍA ──────────────────────────────── */}
          <section className="detail-gallery">
            {/* Imagen principal */}
            <div className="detail-gallery__main">
              <span className="detail-gallery__badge">
                {producto.insignia}
              </span>
              <div className="detail-gallery__placeholder">
                <span>{thumbs[thumbActiva]}</span>
              </div>
            </div>

            {/* Miniaturas */}
            <div className="detail-gallery__thumbs">
              {thumbs.map((t, i) => (
                <button
                  key={i}
                  className={`detail-gallery__thumb ${thumbActiva === i ? 'detail-gallery__thumb--active' : ''}`}
                  onClick={() => setThumbActiva(i)}
                  type="button"
                >
                  {t}
                </button>
              ))}
            </div>
          </section>

          {/* ── INFO ─────────────────────────────────── */}
          <section className="detail-info">

            {/* Nombre */}
            <h1 className="detail-info__title">{producto.nombre}</h1>

            {/* Precio + stock */}
            <div className="detail-info__price-row">
              <span className="detail-info__price">{producto.precio}</span>
              <span className="detail-info__stock">En stock</span>
            </div>

            {/* Badges */}
            <div className="detail-info__badges">
              <InsigniaEstado status={producto.estadoInsignia}>
                {producto.insignia}
              </InsigniaEstado>
              {producto.categoria === 'Nuevo' && (
                <InsigniaEstado status="success">Opción sostenible</InsigniaEstado>
              )}
            </div>

            {/* Descripción */}
            <p className="detail-info__desc">{producto.detalle}</p>

            {/* Selector de talle */}
            <SelectorTalle talleSeleccionado={talle} onSelect={setTalle} />

            {/* Acciones */}
            <div className="detail-info__actions">
              <button
                className="detail-info__btn-primary"
                onClick={() => setAgregado(true)}
                type="button"
              >
                {agregado ? `Talle ${talle} en bolsa ✓` : 'Añadir al carrito'}
                {!agregado && <FiArrowRight size={16} />}
              </button>

              <button className="detail-info__btn-ghost" type="button">
                <FiHeart size={15} />
                Añadir a lista de deseos
              </button>
            </div>

          </section>
        </div>

        {/* Reseñas */}
        {(() => {
          const resenasProducto = resenas.filter(r => r.productId === producto.id)
          if (resenasProducto.length === 0) return null
          return (
            <section className="resenas">
              <div className="resenas__header">
                <h2 className="resenas__titulo">Reseñas</h2>
                <span className="resenas__cantidad">{resenasProducto.length} opiniones</span>
              </div>
              <div className="resenas__grid">
                {resenasProducto.map(r => <TarjetaResena key={r.id} resena={r} />)}
              </div>
            </section>
          )
        })()}

      </main>
    </PlantillaMarketplace>
  )
}