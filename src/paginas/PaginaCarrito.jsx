import { Link } from 'react-router-dom'
import TarjetaProducto from '../components/TarjetaProducto'
import { productos } from '../datos/datosPrueba'
import PlantillaMarketplace from '../plantillas/PlantillaMarketplace'

export default function PaginaCarrito() {
  return (
    <PlantillaMarketplace>
      <main className="home split-layout">
        <section>
          <p className="home__eyebrow">Bolsa // revision</p>
          <h1 className="page-title">Carrito de compras</h1>
          <div className="order-list">
            {productos.slice(0, 2).map((producto) => (
              <article className="cart-item" key={producto.id}>
                <div className="cart-item__image">{producto.etiquetaImagen}</div>
                <div>
                  <h3>{producto.nombre}</h3>
                  <p>Talle M / Garantia 12 meses / Reparacion disponible</p>
                  <strong>{producto.precio}</strong>
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
          <div className="summary-line"><span>Subtotal</span><strong>EUR 244.00</strong></div>
          <div className="summary-line"><span>Envio circular</span><strong>EUR 8.00</strong></div>
          <div className="summary-line summary-line--total"><span>Total</span><strong>EUR 252.00</strong></div>
          <Link to="/checkout" className="button button--primary">Finalizar compra</Link>
        </aside>
      </main>
    </PlantillaMarketplace>
  )
}

