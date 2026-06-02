import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'INICIO', path: '/' },
  { label: 'VENDER', path: '/vender' },
  { label: 'NUEVO', path: '/nuevo' },
  { label: 'USADO', path: '/usado' },
]

export default function Header() {
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
        </nav>

        <div className="header__actions">
          <NavLink to="/perfil" className="header__action-link">
            Perfil
          </NavLink>
          <NavLink to="/carrito" className="header__cart-link">
            Bolsa <span className="header__cart-count">4</span>
          </NavLink>
        </div>
      </div>
    </header>
  )
}
