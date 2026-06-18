import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'

const metodosPago = [
  { label: 'Tarjeta', value: 'TARJETA' },
  { label: 'Transferencia', value: 'TRANSFERENCIA' },
  { label: 'Mercado Pago', value: 'MERCADOPAGO' },
]

export default function PaginaCheckout() {
  const navigate = useNavigate()

  const [carrito, setCarrito] = useState(null)
  const [direcciones, setDirecciones] = useState([])
  const [direccionId, setDireccionId] = useState('')
  const [metodo, setMetodo] = useState('TARJETA')
  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/carrito').then(setCarrito).catch(err => console.log('error:', err))
    api.get('/direcciones')
      .then(data => {
        setDirecciones(data)
        const predeterminada = data.find(d => d.predeterminada) ?? data[0]
        if (predeterminada) setDireccionId(String(predeterminada.id))
      })
      .catch(err => console.log('error:', err))
  }, [])

  async function confirmarPago() {
    setError('')
    if (!direccionId) {
      setError('Selecciona una direccion de envio')
      return
    }
    setProcesando(true)
    try {
      const orden = await api.post('/carrito/comprar', { direccionId: Number(direccionId) })
      await api.post(`/pagos/orden/${orden.id}/pagar`, { metodo })
      navigate('/compras')
    } catch (err) {
      setError(err.message || 'No se pudo procesar el pago')
    } finally {
      setProcesando(false)
    }
  }

  const items = carrito?.items ?? []
  const total = carrito?.total ?? 0

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
        {error && <p style={{ color: '#c0392b', fontSize: '13px' }}>{error}</p>}
        <button
          type="button"
          className="button button--primary"
          onClick={confirmarPago}
          disabled={procesando || items.length === 0}
        >
          {procesando ? 'Procesando...' : 'Confirmar pago'}
        </button>
      </aside>
    </main>
  )
}
