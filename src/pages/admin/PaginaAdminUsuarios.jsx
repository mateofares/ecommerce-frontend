import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Boton from '../../components/ui/Boton'
import TablaDatos from '../../components/ui/TablaDatos'
import TarjetaDashboard from '../../components/ui/TarjetaDashboard'
import PlantillaAdmin from '../../layouts/PlantillaAdmin'
import { fetchUsuarios, eliminarLogicoUsuario } from '../../redux/usuarioSlice'

export default function PaginaAdminUsuarios() {
  const { items: usuarios, fetched, loading: cargando } = useSelector((state) => state.usuarios)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!fetched) dispatch(fetchUsuarios())
  }, [dispatch])

  const eliminar = (id) => dispatch(eliminarLogicoUsuario(id))

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
