import { useEffect, useState } from 'react'
import Boton from '../../components/Boton'
import InsigniaEstado from '../../components/InsigniaEstado'
import PlantillaAdmin from '../../layouts/PlantillaAdmin'
import api from '../../services/api'

const ESTADOS = ['PENDIENTE', 'EN_TRANSITO', 'ENTREGADO', 'CANCELADO']

const estadoStatus = {
  PENDIENTE: 'neutral',
  EN_TRANSITO: 'warning',
  ENTREGADO: 'success',
  CANCELADO: 'danger',
}

export default function PaginaAdminEnvios() {
  const [envios, setEnvios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [seleccion, setSeleccion] = useState({})

  function cargar() {
    setCargando(true)
    api.get('/envios')
      .then(data => setEnvios(data))
      .catch(err => console.log('error:', err))
      .finally(() => setCargando(false))
  }

  useEffect(() => { cargar() }, [])

  function actualizarEstado(id) {
    const nuevoEstado = seleccion[id]
    if (!nuevoEstado) return
    api.patch(`/envios/${id}/estado?nuevoEstado=${nuevoEstado}`)
      .then(actualizado => setEnvios(prev => prev.map(e => e.id === actualizado.id ? actualizado : e)))
      .catch(err => console.log('error:', err))
  }

  function entregar(id) {
    api.patch(`/envios/${id}/entregar`)
      .then(actualizado => setEnvios(prev => prev.map(e => e.id === actualizado.id ? actualizado : e)))
      .catch(err => console.log('error:', err))
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
