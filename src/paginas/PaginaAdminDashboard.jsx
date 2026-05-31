import TarjetaDashboard from '../components/TarjetaDashboard'
import PlantillaAdmin from '../plantillas/PlantillaAdmin'

export default function PaginaAdminDashboard() {
  return (
    <PlantillaAdmin eyebrow="Administracion" title="Dashboard de operaciones" text="Resumen general del estado de operaciones este mes.">
      <div className="admin-metrics">
        <TarjetaDashboard titulo="Ordenes pendientes" valor="842" detalle="12 urgentes hoy" />
        <TarjetaDashboard titulo="Usuarios nuevos" valor="40" detalle="Crecimiento del 8%" />
        <TarjetaDashboard titulo="Impacto semanal" valor="+1.2" detalle="Ventas y ordenes activas" />
      </div>
      <div className="admin-grid">
        <section className="chart-card">
          <h2>Rendimiento semanal</h2>
          <div className="bar-chart">
            {[42, 70, 54, 86, 62, 92].map((h) => <span key={h} style={{ height: `${h}%` }} />)}
          </div>
        </section>
        <section className="activity-feed">
          <h2>Actividad en vivo</h2>
          <p>#ORD-5542 Nueva recoleccion: CDMX <span>2 min</span></p>
          <p>#USR-992 Registro: Juan Perez <span>15 min</span></p>
          <p>#STK-221 Stock actualizado <span>42 min</span></p>
        </section>
      </div>
    </PlantillaAdmin>
  )
}

