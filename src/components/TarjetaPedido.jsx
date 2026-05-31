import Boton from './Boton'
import InsigniaEstado from './InsigniaEstado'

export default function TarjetaPedido({ pedido }) {
  return (
    <article className="order-card">
      <div>
        <p className="order-card__code">Orden: {pedido.codigo}</p>
        <h3 className="order-card__title">{pedido.producto}</h3>
        <p className="order-card__meta">{pedido.fecha} / {pedido.talle} / {pedido.total}</p>
      </div>

      <div className="order-card__actions">
        <InsigniaEstado status={pedido.tipoEstado}>{pedido.estado}</InsigniaEstado>
        <Boton variant="ghost">{pedido.accion}</Boton>
      </div>
    </article>
  )
}
