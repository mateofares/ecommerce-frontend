import { Link } from 'react-router-dom'
import TarjetaProducto from '../components/TarjetaProducto'
import { carrito, productos, resumenCarrito } from '../datos/datosPrueba'
import PlantillaMarketplace from '../plantillas/PlantillaMarketplace'

export default function PaginaCarrito() {
  return (
    <PlantillaMarketplace>
      <main className="home split-layout">
        <section>
          <p className="home__eyebrow">Bolsa // revision</p>
          <h1 className="page-title">Carrito de compras</h1>
          <div className="order-list">
            {carrito.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item__image">{item.etiquetaImagen}</div>
                <div>
                  <h3>{item.nombre}</h3>
                  <p>
                    Talle {item.talle} / Garantia {item.garantia}
                    {item.reparacion ? ' / Reparacion disponible' : ''}
                  </p>
                  <strong>{item.precio}</strong>
                </div>
              </article>
            ))}
          </div>
          <section className="mini-section">
            <h2>Podrias necesitar</h2>
            <div className="compact-grid">
              <TarjetaProducto producto={productos[2]} />
              <TarjetaProducto producto={productos[3]} />
            </div>
          </section>
        </section>

        <aside className="summary-panel">
          <p className="selector__label">Resumen del pedido</p>
          <div className="summary-line"><span>Subtotal</span><strong>{resumenCarrito.subtotal}</strong></div>
          <div className="summary-line"><span>Envio circular</span><strong>{resumenCarrito.envio}</strong></div>
          <div className="summary-line summary-line--total"><span>Total</span><strong>{resumenCarrito.total}</strong></div>
          <Link to="/checkout" className="button button--primary">Finalizar compra</Link>
        </aside>
      </main>
    </PlantillaMarketplace>
  )
}

