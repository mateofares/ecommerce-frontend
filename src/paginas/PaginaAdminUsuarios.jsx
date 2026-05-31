import TablaDatos from '../components/TablaDatos'
import TarjetaDashboard from '../components/TarjetaDashboard'
import { usuarios } from '../datos/datosPrueba'
import PlantillaAdmin from '../plantillas/PlantillaAdmin'

export default function PaginaAdminUsuarios() {
  return (
    <PlantillaAdmin eyebrow="Administracion" title="Usuarios del sistema" text="Gestion centralizada de identidades, accesos y roles.">
      <div className="admin-metrics">
        <TarjetaDashboard titulo="Total usuarios" valor="1,284" detalle="Base completa" />
        <TarjetaDashboard titulo="Activos" valor="1,150" detalle="Cuentas habilitadas" />
        <TarjetaDashboard titulo="Inactivos" valor="134" detalle="Revision pendiente" />
      </div>
      <TablaDatos
        headers={['Nombre / perfil', 'Email', 'Rol', 'Estado', 'Acciones']}
        rows={usuarios.map((usuario) => [
          `${usuario.nombre} - ID ${usuario.id}`,
          usuario.email,
          usuario.rol,
          usuario.estado,
          'Editar',
        ])}
      />
    </PlantillaAdmin>
  )
}

