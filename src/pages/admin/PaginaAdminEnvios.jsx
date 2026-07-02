import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Boton from '../../components/Boton'
import InsigniaEstado from '../../components/InsigniaEstado'
import PlantillaAdmin from '../../layouts/PlantillaAdmin'
import { fetchEnvios, actualizarEstadoEnvio, entregarEnvio } from '../../redux/envioSlice'

const ESTADOS = ['PENDIENTE', 'EN_TRANSITO', 'ENTREGADO', 'CANCELADO']

const estadoStatus = {
  PENDIENTE: 'neutral',
  EN_TRANSITO: 'warning',
  ENTREGADO: 'success',
  CANCELADO: 'danger',
}

export default function PaginaAdminEnvios() {
  const { items: envios, loading: cargando } = useSelector((state) => state.envios)
  const dispatch = useDispatch()
  const [seleccion, setSeleccion] = useState({})

  useEffect(() => { dispatch(fetchEnvios()) }, [dispatch])

  function actualizarEstado(id) {
    const nuevoEstado = seleccion[id]
    if (!nuevoEstado) return
    dispatch(actualizarEstadoEnvio({ id, nuevoEstado }))
  }

  function entregar(id) {
    dispatch(entregarEnvio(id))
  }

  return (
    <PlantillaAdmin eyebrow="Control logistico" title="Control de envios" text="Gestionar envios salientes y seguimiento para pedidos confirmados.">
      {cargando ? (
        <p>Cargando...</p>
      ) : envios.length === 0 ? (
        <p>No hay envios registrados.</p>
      ) : (
        <div className="logistics-grid">
          {envios.map((envio) => (
            <article className="shipping-card" key={envio.id}>
              <div className="product-card__top">
                <strong>Envio #{envio.id} · Orden #{envio.ordenId}</strong>
                <InsigniaEstado status={estadoStatus[envio.estado] ?? 'neutral'}>{envio.estado}</InsigniaEstado>
              </div>
              <p>{envio.cliente ?? envio.transportista}</p>
              <span>{envio.direccion ?? `Tracking: ${envio.numSeguimiento ?? '-'}`}</span>
              <select
                value={seleccion[envio.id] ?? envio.estado}
                onChange={(e) => setSeleccion({ ...seleccion, [envio.id]: e.target.value })}
              >
                {ESTADOS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="detail-info__actions">
                <Boton onClick={() => actualizarEstado(envio.id)}>Actualizar estado</Boton>
                <Boton variant="ghost" onClick={() => entregar(envio.id)}>Marcar entregado</Boton>
              </div>
            </article>
          ))}
        </div>
      )}
    </PlantillaAdmin>
  )
}
