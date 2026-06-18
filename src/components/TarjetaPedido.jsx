import { useState } from 'react'
import { Link } from 'react-router-dom'
import Boton from './Boton'
import InsigniaEstado from './InsigniaEstado'

const accionMap = {
  ENTREGADA:   'Calificar',
  ENVIADA:     'Rastrear',
  CONFIRMADA:  'Ver detalle',
  PENDIENTE:   'Factura PDF',
}

const borderMap = {
  ENTREGADA:  '#1a6b4a',
  ENVIADA:    '#f59e0b',
  CONFIRMADA: '#3ddc97',
  PENDIENTE:  '#d8d8d2',
}

export default function TarjetaPedido({ pedido }) {
  const [modalAbierto, setModalAbierto] = useState(false)
  const titulos = pedido.items.map(i => i.productoTitulo).join(' / ')
  const accion = accionMap[pedido.estado] ?? 'Ver detalle'
  const borderColor = borderMap[pedido.estado] ?? '#d8d8d2'

  return (
    <>
      <article className="order-card" style={{ borderLeft: `4px solid ${borderColor}` }}>
        <div>
          <p className="order-card__code">Orden: #{pedido.id}</p>
          <h3 className="order-card__title">{titulos}</h3>
          <p className="order-card__meta order-card__total">$ {pedido.total}</p>
        </div>

        <div className="order-card__actions">
          <InsigniaEstado status={pedido.tipoEstado}>{pedido.estado}</InsigniaEstado>
          {pedido.estadoEnvio === 'ENTREGADO' ? (
            <Link to={`/calificar/${pedido.id}`} className="button button--ghost">
              Calificar
            </Link>
          ) : (
            <Boton variant="ghost" onClick={() => setModalAbierto(true)}>Ver detalle</Boton>
          )}
        </div>
      </article>

      {modalAbierto && (
        <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px', padding: '32px', borderRadius: 0, border: '1px solid #d6d3ce', background: '#f0efeb' }}>

            {/* Header */}
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

            {/* Estado + meta */}
            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <InsigniaEstado status={pedido.tipoEstado}>{pedido.estado}</InsigniaEstado>
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

            {/* Productos */}
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

            {/* Descuento */}
            {pedido.descuentoAplicado > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', textTransform: 'uppercase', color: '#78716c' }}>Descuento</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>-${pedido.descuentoAplicado}</span>
              </div>
            )}

            {/* Total */}
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
