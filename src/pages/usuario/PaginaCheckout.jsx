import { Link } from 'react-router-dom'
import Boton from '../../components/Boton'
import SelectorPago from '../../components/SelectorPago'
import { resumenCheckout } from '../../datos/datosPrueba'

export default function PaginaCheckout() {
  return (
    <main className="checkout-page split-layout">
      <section>
        <Link to="/" className="checkout-logo">Urban Re-Cycle</Link>
        <p className="home__eyebrow">Finalizar compra</p>
        <h1 className="page-title">Checkout</h1>

        <section className="checkout-step">
          <span>01</span>
          <div>
            <h2>Direccion de envio</h2>
            <div className="form-grid">
              <input placeholder="Nombre completo" />
              <input placeholder="Ciudad" />
              <input placeholder="Direccion" />
              <input placeholder="Codigo postal" />
            </div>
          </div>
        </section>

        <section className="checkout-step">
          <span>02</span>
          <div>
            <h2>Metodo de pago</h2>
            <SelectorPago />
          </div>
        </section>
      </section>

      <aside className="summary-panel">
        <p className="selector__label">Pedido visible</p>
        <div className="summary-line"><span>{resumenCheckout.articulos} articulos</span><strong>{resumenCheckout.subtotal}</strong></div>
        <div className="summary-line"><span>Envio</span><strong>{resumenCheckout.envio}</strong></div>
        <div className="summary-line summary-line--total"><span>Total</span><strong>{resumenCheckout.total}</strong></div>
        <Link to="/confirmar-pago" className="button button--primary">Confirmar pago</Link>
      </aside>
    </main>
  )
}

