import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const opcionesBarraLateral = [
  { label: 'Dashboard',            path: '/admin' },
  { label: 'Control de envios',    path: '/admin/envios' },
  { label: 'Auditoria de facturas',path: '/admin/facturas' },
  { label: 'Usuarios del sistema', path: '/admin/usuarios' },
  { label: 'Productos',            path: '/admin/productos' },
]

export default function BarraLateral() {
  const { usuarioId } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  function cerrarSesion() {
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div>
        <p className="sidebar__eyebrow">Administracion</p>
        <h2 className="sidebar__title">Urban Re-Cycle</h2>
      </div>

      <nav className="sidebar__nav">
        {opcionesBarraLateral.map((opcion) => (
          <NavLink
            key={opcion.path}
            to={opcion.path}
            end={opcion.path === '/admin'}
            className={({ isActive }) =>
              isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
            }
          >
            {opcion.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__user">
        <strong>Admin</strong>
        <span style={{ fontSize: '11px', color: '#a8a29e' }}>ID: {usuarioId}</span>
        <button
          type="button"
          onClick={cerrarSesion}
          className="sidebar__link"
          style={{ marginTop: '8px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', color: '#c0392b' }}
        >
          Cerrar sesion
        </button>
      </div>
    </aside>
  )
}
