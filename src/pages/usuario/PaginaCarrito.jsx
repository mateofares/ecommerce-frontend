import { Link } from 'react-router-dom'
import { carrito, resumenCarrito } from '../../datos/datosPrueba'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import { FiTrash2, FiLock, FiRefreshCw } from 'react-icons/fi'

const PRODUCTO_SUGERIDO = {
  nombre: 'Organic Repair Kit',
  precio: '$15.00',
  bg: 'bg-stone-700',
}

export default function PaginaCarrito() {
  return (
    <PlantillaMarketplace>
      <main className="home cart-layout">

        {/* ── COLUMNA IZQUIERDA ─────────────────── */}
        <section className="cart-main">

          {/* Título */}
          <div className="cart-header">
            <h1 className="cart-header__title">TU CARRITO</h1>
            <span className="cart-header__count">{carrito.length} artículos</span>
          </div>
          <div className="cart-header__line" />

          {/* Items */}
          <div className="cart-list">
            {carrito.map((item) => (
              <article className="cart-item" key={item.id}>
                {/* Imagen */}
                <div className="cart-item__image">
                  <span className="cart-item__tag">{item.etiquetaImagen}</span>
                </div>

                {/* Info */}
                <div className="cart-item__info">
                  <h3 className="cart-item__name">{item.nombre}</h3>
                  <p className="cart-item__meta">
                    Talle: {item.talle}&nbsp;&nbsp;|&nbsp;&nbsp;Condición: Excelente
                  </p>
                  <button className="cart-item__remove" type="button">
                    <FiTrash2 size={11} />
                    Eliminar
                  </button>
                </div>

                {/* Precio */}
                <p className="cart-item__price">{item.precio}</p>
              </article>
            ))}
          </div>

          {/* Garantía */}
          <div className="cart-guarantee">
            <FiRefreshCw size={14} className="cart-guarantee__icon" />
            <p>
              No olvides: Tu garantía de "Segunda Vida" cubre estos artículos
              por 12 meses de reparaciones.
            </p>
          </div>
        </section>

        {/* ── COLUMNA DERECHA ───────────────────── */}
        <aside className="cart-aside">

          {/* Resumen del pedido */}
          <div className="cart-summary">
            <h2 className="cart-summary__title">RESUMEN DEL<br />PEDIDO</h2>

            <div className="cart-summary__lines">
              <div className="cart-summary__line">
                <span>Subtotal</span>
                <strong>{resumenCarrito.subtotal}</strong>
              </div>
              <div className="cart-summary__line">
                <span>Envío</span>
                <strong className="cart-summary__free">Gratis</strong>
              </div>
              <div className="cart-summary__line">
                <span>Impuestos estimados</span>
                <strong>$24.40</strong>
              </div>
              <div className="cart-summary__line cart-summary__line--total">
                <span>Total</span>
                <strong>{resumenCarrito.total}</strong>
              </div>
            </div>

            <Link to="/checkout" className="cart-summary__cta">
              Proceder al pago
            </Link>

            <div className="cart-summary__secure">
              <FiLock size={11} />
              <span>Encriptación underground segura</span>
            </div>
          </div>

          {/* Podrías necesitar */}
          <div className="cart-upsell">
            <p className="cart-upsell__title">Podrías necesitar</p>
            <div className="cart-upsell__item">
              <div className="cart-upsell__img" />
              <div className="cart-upsell__info">
                <p className="cart-upsell__name">{PRODUCTO_SUGERIDO.nombre}</p>
                <p className="cart-upsell__price">{PRODUCTO_SUGERIDO.precio}</p>
                <button className="cart-upsell__add" type="button">Añadir</button>
              </div>
            </div>
          </div>

        </aside>
      </main>
    </PlantillaMarketplace>
  )
}