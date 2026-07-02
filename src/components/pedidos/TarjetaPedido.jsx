import { useState } from 'react'
import { Link } from 'react-router-dom'
import Boton from '../ui/Boton'
import InsigniaEstado from '../ui/InsigniaEstado'

const estadoConfig = {
  PENDIENTE:   { borde: '#d8d8d2', bg: '#f9f9f7', badge: 'neutral'  },
  CONFIRMADA:  { borde: '#d8d8d2', bg: '#f9f9f7', badge: 'neutral'  },
  PAGADA:      { borde: '#3ddc97', bg: '#f0faf5', badge: 'success'  },
  ENVIADA:     { borde: '#f59e0b', bg: '#fffbeb', badge: 'warning'  },
  ENTREGADA:   { borde: '#1a5c3a', bg: '#ecf7f0', badge: 'success'  },
  CANCELADA:   { borde: '#c0392b', bg: '#fef2f2', badge: 'danger'   },
}

export default function TarjetaPedido({ pedido }) {
  const [modalAbierto, setModalAbierto] = useState(false)
  const titulos = pedido.items.map(i => i.productoTitulo).join(' / ')
  const config = estadoConfig[pedido.estado] ?? estadoConfig.CONFIRMADA

  return (
    <>
      <article
        className="order-card"
        style={{
          borderLeft: `4px solid ${config.borde}`,
          backgroundColor: config.bg,
        }}
      >
        <div>
          <p className="order-card__code">Orden: #{pedido.id}</p>
          <h3 className="order-card__title">{titulos}</h3>
          <p className="order-card__meta order-card__total">$ {pedido.total}</p>
        </div>

        <div className="order-card__actions">
          <InsigniaEstado status={config.badge}>{pedido.estado}</InsigniaEstado>

          {pedido.estado === 'ENTREGADA' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {pedido.items.map(item => (
                <Link
                  key={item.productoId}
                  to={`/calificar/${pedido.id}/${item.productoId}`}
                  className="button button--ghost"
                  style={{ borderColor: '#1a5c3a', color: '#1a5c3a' }}
                >
                  Calificar: {item.productoTitulo}
                </Link>
              ))}
            </div>
          ) : (
            <Boton variant="ghost" onClick={() => setModalAbierto(true)}>Ver detalle</Boton>
          )}
        </div>
      </article>

      {modalAbierto && (
        <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px', padding: '32px', borderRadius: 0, border: '1px solid #d6d3ce', background: '#f0efeb' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', paddingBottom: '16px', borderBottom: '2px solid #1c1c1a' }}>
              <div>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#78716c', margin: '0 0 4px' }}>
                  Detalle de orden
                </p>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', margin: 0, color: '#1c1c1a', letterSpacing: '0.04em' }}>
                  #{pedido.id}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalAbierto(false)}
                style={{ background: 'none', border: '1px solid #a8a29e', cursor: 'pointer', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#78716c', fontSize: '14px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <InsigniaEstado status={config.badge}>{pedido.estado}</InsigniaEstado>
              {pedido.fecha && (
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: '#78716c', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Fecha: {pedido.fecha.slice(0, 10)}
                </p>
              )}
              {pedido.direccionResumen && (
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: '#78716c', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Envio: {pedido.direccionResumen}
                </p>
              )}
              {pedido.metodoPago && (
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: '#78716c', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Pago: {pedido.metodoPago}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#78716c', margin: '0 0 12px' }}>
                Productos
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pedido.items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #e5e2dc' }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1c1c1a', fontWeight: 700 }}>
                      {item.productoTitulo}
                    </span>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: '#1c1c1a' }}>
                      ${item.precioUnitario}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {pedido.descuentoAplicado > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', textTransform: 'uppercase', color: '#78716c' }}>Descuento</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>-${pedido.descuentoAplicado}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '2px solid #1c1c1a' }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, color: '#1c1c1a' }}>Total</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: '#1c1c1a' }}>${pedido.total}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
