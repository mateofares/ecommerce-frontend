import { useEffect, useState } from 'react'
import Boton from '../../components/Boton'
import TablaDatos from '../../components/TablaDatos'
import TarjetaDashboard from '../../components/TarjetaDashboard'
import PlantillaAdmin from '../../layouts/PlantillaAdmin'
import api from '../../services/api'

export default function PaginaAdminUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)

  function cargar() {
    setCargando(true)
    api.get('/usuarios')
      .then(data => setUsuarios(data))
      .catch(err => console.log('error:', err))
      .finally(() => setCargando(false))
  }

  useEffect(() => { cargar() }, [])

  function eliminar(id) {
    api.patch(`/usuarios/${id}/eliminar-logico`)
      .then(() => setUsuarios(prev => prev.filter(u => u.id !== id)))
      .catch(err => console.log('error:', err))
  }

  const admins = usuarios.filter(u => u.userRol === 'ADMINISTRADOR').length

  return (
    <PlantillaAdmin eyebrow="Administracion" title="Usuarios del sistema" text="Gestion centralizada de identidades, accesos y roles.">
      <div className="admin-metrics">
        <TarjetaDashboard titulo="Total usuarios" valor={String(usuarios.length)} detalle="Base completa" />
        <TarjetaDashboard titulo="Administradores" valor={String(admins)} detalle="Con permisos elevados" />
        <TarjetaDashboard titulo="Usuarios" valor={String(usuarios.length - admins)} detalle="Compradores / vendedores" />
      </div>
      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <TablaDatos
          headers={['Nombre / perfil', 'Email', 'Rol', 'Acciones']}
          rows={usuarios.map((usuario) => [
            `${usuario.nombre} ${usuario.apellido} - ID ${usuario.id}`,
            usuario.mail,
            usuario.userRol,
            <Boton key={`del-${usuario.id}`} onClick={() => eliminar(usuario.id)} variant="ghost">Eliminar</Boton>,
          ])}
        />
      )}
    </PlantillaAdmin>
  )
}
