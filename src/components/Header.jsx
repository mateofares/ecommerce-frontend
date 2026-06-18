import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { label: 'INICIO', path: '/' },
  { label: 'NUEVO', path: '/nuevo' },
  { label: 'USADO', path: '/usado' },
]

export default function Header() {
  const { isAuthenticated, isAdmin, usuario, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header__ticker">
        Unete a la rebelion - Segunda vida - Sostenibilidad radical
      </div>

      <div className="header__content">
        <NavLink to="/" className="header__logo">
          <span className="header__brand">
            Urban Re-Cycle
          </span>
          <span className="header__title">
            Rebel Grit
          </span>
        </NavLink>

        <nav className="header__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink
              to="/vender"
              className={({ isActive }) =>
                isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link'
              }
            >
              VENDER
            </NavLink>
          )}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link'
              }
            >
              ADMIN
            </NavLink>
          )}
        </nav>

        <div className="header__actions">
          {isAuthenticated ? (
            <>
              <NavLink to="/perfil" className="header__action-link">
                {usuario?.nombre ?? 'Perfil'}
              </NavLink>
              <NavLink to="/carrito" className="header__cart-link">
                Bolsa
              </NavLink>
              <button type="button" className="header__action-link" onClick={handleLogout}>
                Salir
              </button>
            </>
          ) : (
            <NavLink to="/login" className="header__action-link">
              Iniciar sesion
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}
