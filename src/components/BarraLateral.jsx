import { NavLink } from 'react-router-dom'

const opcionesBarraLateral = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Control de envios', path: '/admin/envios' },
  { label: 'Auditoria de facturas', path: '/admin/facturas' },
  { label: 'Usuarios del sistema', path: '/admin/usuarios' },
]

export default function BarraLateral() {
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
            className={({ isActive }) =>
              isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
            }
          >
            {opcion.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__user">
        <strong>Admin User</strong>
        <span>Status: online</span>
      </div>
    </aside>
  )
}
