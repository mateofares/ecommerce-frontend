import { useEffect, useState } from 'react'
import TarjetaDashboard from '../../components/TarjetaDashboard'
import PlantillaAdmin from '../../layouts/PlantillaAdmin'
import api from '../../services/api'

export default function PaginaAdminDashboard() {
  const [usuarios, setUsuarios] = useState([])
  const [envios, setEnvios] = useState([])

  useEffect(() => {
    api.get('/usuarios').then(setUsuarios).catch(err => console.log('error:', err))
    api.get('/envios').then(setEnvios).catch(err => console.log('error:', err))
  }, [])

  const enviosPendientes = envios.filter(e => e.estado === 'PENDIENTE').length
  const enviosEntregados = envios.filter(e => e.estado === 'ENTREGADO').length

  return (
    <PlantillaAdmin eyebrow="Administracion" title="Dashboard de operaciones" text="Resumen general del estado de operaciones.">
      <div className="admin-metrics">
        <TarjetaDashboard titulo="Usuarios totales" valor={String(usuarios.length)} detalle="Base registrada" />
        <TarjetaDashboard titulo="Envios pendientes" valor={String(enviosPendientes)} detalle="Requieren accion" />
        <TarjetaDashboard titulo="Envios entregados" valor={String(enviosEntregados)} detalle="Completados" />
      </div>
      <div className="admin-grid">
        <section className="chart-card">
          <h2>Estado de envios</h2>
          <div className="bar-chart">
            {['PENDIENTE', 'EN_TRANSITO', 'ENTREGADO', 'CANCELADO'].map((estado) => {
              const total = envios.length || 1
              const count = envios.filter(e => e.estado === estado).length
              return <span key={estado} style={{ height: `${Math.max(8, (count / total) * 100)}%` }} title={`${estado}: ${count}`} />
            })}
          </div>
        </section>
        <section className="activity-feed">
          <h2>Resumen</h2>
          <p>Usuarios <span>{usuarios.length}</span></p>
          <p>Envios totales <span>{envios.length}</span></p>
          <p>Administradores <span>{usuarios.filter(u => u.userRol === 'ADMINISTRADOR').length}</span></p>
        </section>
      </div>
    </PlantillaAdmin>
  )
}
