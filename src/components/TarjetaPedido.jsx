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
  const titulos = pedido.items.map(i => i.productoTitulo).join(' / ')
  const accion = accionMap[pedido.estado] ?? 'Ver detalle'
  const borderColor = borderMap[pedido.estado] ?? '#d8d8d2'

  return (
    <article className="order-card" style={{ borderLeft: `4px solid ${borderColor}` }}>
      <div>
        <p className="order-card__code">Orden: #{pedido.id}</p>
        <h3 className="order-card__title">{titulos}</h3>
        <p className="order-card__meta order-card__total">$ {pedido.total}</p>
      </div>

      <div className="order-card__actions">
        <InsigniaEstado status={pedido.tipoEstado}>{pedido.estado}</InsigniaEstado>
        {pedido.estado === 'ENTREGADA' ? (
          <Link to={`/calificar/${pedido.id}`} className="button button--ghost">
            Calificar
          </Link>
        ) : (
          <Boton variant="ghost">{accion}</Boton>
        )}
      </div>
    </article>
  )
}
