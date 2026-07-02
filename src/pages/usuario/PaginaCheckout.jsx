import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDirecciones } from '../../redux/direccionSlice'
import { getCarrito,comprarCarrito } from '../../redux/carritoSlice'
import { pagarOrden } from '../../redux/pagoSlice'





const metodosPago = [
  { label: 'Tarjeta', value: 'TARJETA' },
  { label: 'Transferencia', value: 'TRANSFERENCIA' },
  { label: 'Mercado Pago', value: 'MERCADOPAGO' },
]

export default function PaginaCheckout() {


  const dispatch = useDispatch()

  const {items,total,loading: loadingCarrito,error: errorCarrito} = useSelector((state)=>state.carrito)
  const {direcciones} = useSelector((state)=>state.direccion)
  const { loading: loadingPago, error: errorPago } = useSelector(state => state.pagos)


  const navigate = useNavigate()
 
  const [direccionId, setDireccionId] = useState('')
  const [metodo, setMetodo] = useState('TARJETA')

  useEffect(() => {
    dispatch(fetchDirecciones())
    dispatch(getCarrito())
  }, [dispatch])

  const confirmarPago = async () => {
    const id = direccionId || (direcciones.find(d => d.predeterminada) ?? direcciones[0])?.id
    if (!id) return
    try {
      const orden = await dispatch(comprarCarrito({ direccionId: Number(id) })).unwrap()
      await dispatch(pagarOrden({ ordenId: orden.id, metodo })).unwrap()
      navigate('/compras')
    } catch {
      // el error ya quedó en state.carrito.error o state.pagos.error
    }
  }


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
            {direcciones.length === 0 ? (
              <p className="home__text">
                No tenes direcciones cargadas. <Link to="/perfil">Agregar una en tu perfil</Link>.
              </p>
            ) : (
              <div className="selector">
                <select value={direccionId} onChange={(e) => setDireccionId(e.target.value)}>
                  {direcciones.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.calle} {d.numero}, {d.ciudad} ({d.provincia})
                      {d.predeterminada ? ' — Predeterminada' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </section>

        <section className="checkout-step">
          <span>02</span>
          <div>
            <h2>Metodo de pago</h2>
            <div className="selector">
              <div className="selector__options selector__options--wide">
                {metodosPago.map((m) => (
                  <button
                    key={m.value}
                    className={metodo === m.value ? 'selector__option selector__option--active' : 'selector__option'}
                    type="button"
                    onClick={() => setMetodo(m.value)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      <aside className="summary-panel">
        <p className="selector__label">Pedido visible</p>
        <div className="summary-line"><span>{items.length} articulos</span><strong>$ {total}</strong></div>
        <div className="summary-line"><span>Envio</span><strong>Gratis</strong></div>
        <div className="summary-line summary-line--total"><span>Total</span><strong>$ {total}</strong></div>
        {errorPago && <p style={{ color: '#c0392b', fontSize: '13px' }}>{errorPago}</p>}
        <button
          type="button"
          className="button button--primary"
          onClick={confirmarPago}
          disabled={loadingCarrito || loadingPago || items.length === 0}
        >
          {loadingCarrito || loadingPago ? 'Procesando...' : 'Confirmar pago'}
        </button>
      </aside>
    </main>
  )
}
