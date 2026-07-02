import { NavLink } from 'react-router-dom'
import { FiShoppingBag, FiTag, FiEdit2, FiLogOut } from 'react-icons/fi'

const NAV_ITEMS = [
  { label: 'Mis compras',   path: '/compras',       icon: <FiShoppingBag size={14} /> },
  { label: 'Mis ventas',    path: '/mis-productos', icon: <FiTag size={14} /> },
  { label: 'Editar perfil', path: '/perfil',        icon: <FiEdit2 size={14} /> },
]

export default function PerfilSidebar({ onCerrarSesion }) {
  return (
    <aside className="w-52 shrink-0 border-r border-stone-300 bg-[#f0efeb]">
      <p className="px-6 pt-7 pb-5 font-['Space_Mono'] text-[10px] tracking-[0.22em] uppercase font-bold text-stone-800">
        Mi Perfil
      </p>
      <nav className="flex flex-col">
        {NAV_ITEMS.map(({ label, path, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3.5 border-l-2 font-['Space_Mono'] text-[10px] tracking-[0.14em] uppercase font-bold transition-colors
              ${isActive
                ? 'bg-[#1a5c3a] text-white border-[#1a5c3a]'
                : 'text-stone-500 border-transparent hover:text-stone-900 hover:bg-stone-200'
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={onCerrarSesion}
          className="flex items-center gap-3 px-6 py-3.5 border-l-2 border-transparent font-['Space_Mono'] text-[10px] tracking-[0.14em] uppercase font-bold text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors text-left"
        >
          <FiLogOut size={14} />
          Cerrar sesión
        </button>
      </nav>
    </aside>
  )
}
