import Boton from '../components/Boton'
import InsigniaEstado from '../components/InsigniaEstado'
import { envios } from '../data/mockData'
import AdminLayout from '../layouts/AdminLayout'

export default function AdminShippingPage() {
  return (
    <AdminLayout eyebrow="Control logistico" title="Control de envios" text="Gestionar envios salientes y seguimiento para pedidos confirmados.">
      <div className="logistics-grid">
        {envios.map((envio) => (
          <article className="shipping-card" key={envio.id}>
            <div className="product-card__top">
              <strong>{envio.id}</strong>
              {envio.prioridad && <InsigniaEstado status="danger">Prioridad</InsigniaEstado>}
            </div>
            <p>{envio.cliente}</p>
            <span>{envio.direccion}</span>
            <input placeholder="Ingresar # de tracking" />
            <select defaultValue="">
              <option value="" disabled>Seleccionar transportista</option>
              <option>UPS Standard</option>
              <option>Correo urbano</option>
            </select>
            <Boton>Actualizar</Boton>
          </article>
        ))}
      </div>
    </AdminLayout>
  )
}
