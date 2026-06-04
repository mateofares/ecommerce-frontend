import { useState } from 'react'
import Boton from '../../components/Boton'
import TablaDatos from '../../components/TablaDatos'
import TarjetaDashboard from '../../components/TarjetaDashboard'
import { usuarios } from '../../datos/datosPrueba'
import PlantillaAdmin from '../../layouts/PlantillaAdmin'

export default function PaginaAdminUsuarios() {
  const [usuariosData, setUsuariosData] = useState(usuarios)
  return (
    <PlantillaAdmin eyebrow="Administracion" title="Usuarios del sistema" text="Gestion centralizada de identidades, accesos y roles.">
      <div className="admin-metrics">
        <TarjetaDashboard titulo="Total usuarios" valor="1,284" detalle="Base completa" />
        <TarjetaDashboard titulo="Activos" valor="1,150" detalle="Cuentas habilitadas" />
        <TarjetaDashboard titulo="Inactivos" valor="134" detalle="Revision pendiente" />
      </div>
      <TablaDatos
        headers={['Nombre / perfil', 'Email', 'Rol', 'Estado', 'Acciones']}
        rows={usuariosData.map((usuario) => [
          `${usuario.nombre} - ID ${usuario.id}`,
          usuario.email,
          usuario.rol,
          usuario.estado,
          <Boton
            onClick={() => setUsuariosData(usuariosData.filter((u) => u.id !== usuario.id))}
            variant="ghost"
          >Eliminar</Boton>,
        ])}
      />
    </PlantillaAdmin>
  )
}

