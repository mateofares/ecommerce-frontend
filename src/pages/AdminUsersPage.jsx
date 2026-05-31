import DataTable from '../components/DataTable'
import TarjetaDashboard from '../components/TarjetaDashboard'
import { usuarios } from '../data/mockData'
import AdminLayout from '../layouts/AdminLayout'

export default function AdminUsersPage() {
  return (
    <AdminLayout eyebrow="Administracion" title="Usuarios del sistema" text="Gestion centralizada de identidades, accesos y roles.">
      <div className="admin-metrics">
        <TarjetaDashboard titulo="Total usuarios" valor="1,284" detalle="Base completa" />
        <TarjetaDashboard titulo="Activos" valor="1,150" detalle="Cuentas habilitadas" />
        <TarjetaDashboard titulo="Inactivos" valor="134" detalle="Revision pendiente" />
      </div>
      <DataTable
        headers={['Nombre / perfil', 'Email', 'Rol', 'Estado', 'Acciones']}
        rows={usuarios.map((usuario) => [
          `${usuario.nombre} - ID ${usuario.id}`,
          usuario.email,
          usuario.rol,
          usuario.estado,
          'Editar',
        ])}
      />
    </AdminLayout>
  )
}
