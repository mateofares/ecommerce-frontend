import { Link, NavLink } from 'react-router-dom'
import PlantillaMarketplace from '../plantillas/PlantillaMarketplace'
import {
  FiShoppingBag,
  FiTag,
  FiEdit2,
  FiLogOut,
  FiShoppingCart,
  FiStar,
  FiRefreshCw,
  FiPlus,
} from 'react-icons/fi'

const NAV_ITEMS = [
  { label: 'Mis compras',   path: '/compras',       icon: <FiShoppingBag size={14} /> },
  { label: 'Mis ventas',    path: '/mis-productos', icon: <FiTag size={14} /> },
  { label: 'Editar perfil', path: '/perfil',        icon: <FiEdit2 size={14} /> },
  { label: 'Cerrar sesión', path: '/login',         icon: <FiLogOut size={14} /> },
]

const STATS = [
  { icon: <FiShoppingCart size={20} />, label: 'Ventas totales',     value: '$1,420' },
  { icon: <FiRefreshCw size={20} />,    label: 'Prendas recicladas',  value: '42'     },
  { icon: <FiStar size={20} />,         label: 'Calificación',        value: '4.9/5'  },
]

const ACTIVIDAD = [
  {
    titulo:   "VENDIDO: BOMBER JACKET 90'S",
    sub:      'Hace 2 horas a @claudia_rebel',
    monto:    '+$85',
    color:    'text-emerald-600',
    bg:       'bg-teal-700',
    icon:     null,
  },
  {
    titulo:   'COMPRADO: INDUSTRIAL KICKS RED',
    sub:      'Ayer',
    monto:    '-$120',
    color:    'text-red-500',
    bg:       'bg-red-900',
    icon:     null,
  },
  {
    titulo:   'NUEVO LISTADO: PANTALÓN CARGO',
    sub:      'Hace 3 días',
    monto:    'ACTIVO',
    color:    'text-stone-400 text-[9px] tracking-widest',
    bg:       'bg-emerald-700',
    icon:     <FiPlus size={18} className="text-white" />,
  },
]

export default function PaginaPerfil() {
  return (
    <PlantillaMarketplace>
      <div className="flex min-h-screen bg-[#f0efeb]">

        {/* ── SIDEBAR ───────────────────────────────── */}
        <aside className="w-52 shrink-0 border-r border-stone-300 bg-[#f0efeb]">
          <p className="px-6 pt-7 pb-5 font-['Space_Mono'] text-[10px] tracking-[0.22em] uppercase font-bold text-stone-800">
            Mi Perfil
          </p>
          <nav className="flex flex-col">
            {NAV_ITEMS.map(({ label, path, icon }) => (
              <NavLink key={path} to={path} className={({ isActive }) => `flex items-center gap-3 px-6 py-3.5 border-l-2 font-['Space_Mono'] text-[10px] tracking-[0.14em] uppercase font-bold transition-colors ${isActive ? 'bg-[#1a5c3a] text-white border-[#1a5c3a]' : 'text-stone-500 border-transparent hover:text-stone-900 hover:bg-stone-200' }`} >
                {icon}
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* ── CONTENIDO ─────────────────────────────── */}
        <main className="flex-1 p-8">

          {/* Fila: card perfil + stats */}
          <div className="flex gap-5 mb-6">

            {/* Card perfil */}
            <div className="w-56 shrink-0 bg-white border border-stone-300 p-5 flex flex-col gap-4">
              {/* Avatar */}
              <div className="w-full aspect-square bg-stone-800 flex items-center justify-content-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center">
                  <span className="font-['Bebas_Neue'] text-5xl text-stone-500 select-none">AR</span>
                </div>
              </div>

              {/* Nombre */}
              <div>
                <h1 className="font-['Bebas_Neue'] text-2xl leading-tight text-stone-900 m-0">
                  ALEX REBEL
                </h1>
                <p className="font-['Space_Mono'] text-[9px] tracking-[0.2em] uppercase text-stone-400 mt-1 m-0">
                  Miembro desde 2022
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-col gap-2">
                <span className="font-['Space_Mono'] text-[8px] tracking-[0.14em] uppercase font-bold bg-[#1a5c3a] text-[#c8e6d0] px-3 py-1 w-fit">
                  Eco-Warrior
                </span>
                <span className="font-['Space_Mono'] text-[8px] tracking-[0.14em] uppercase font-bold border border-[#1a5c3a] text-[#1a5c3a] px-3 py-1 w-fit">
                  Pro Seller
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className=" flex flex-col gap-4 flex-1">
              {STATS.map(({ icon, label, value }) => (
                <div key={label} className="flex-1 bg-white border border-stone-300 px-6 flex items-center gap-4">
                  <span className="text-stone-400">{icon}</span>
                  <div>
                    <p className="font-['Space_Mono'] text-[9px] tracking-[0.16em] uppercase text-stone-400 m-0 mb-0.5">
                      {label}
                    </p>
                    <p className="font-['Bebas_Neue'] text-3xl leading-none text-stone-900 m-0">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white border border-stone-300 p-7">
            <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-stone-900 pb-2 border-b-2 border-stone-900 inline-block m-0 mb-4">
              ACTIVIDAD RECIENTE
            </h2>

            <div className="flex flex-col divide-y divide-stone-100">
              {ACTIVIDAD.map(({ titulo, sub, monto, color, bg, icon }) => (
                <div key={titulo} className="flex items-center gap-4 py-4">
                  {/* Thumbnail */}
                  <div className={`w-14 h-14 shrink-0 ${bg} flex items-center justify-center`}>
                    {icon ?? (
                      <span className="font-['Space_Mono'] text-[7px] text-white/30 uppercase tracking-wider text-center px-1">
                        IMG
                      </span>
                    )}
                  </div>

                  {/* Texto */}
                  <div className="flex-1">
                    <p className="font-['Space_Mono'] text-[10px] tracking-[0.1em] uppercase font-bold text-stone-800 m-0">
                      {titulo}
                    </p>
                    <p className="font-['Space_Mono'] text-[9px] italic text-stone-400 mt-0.5 m-0">
                      {sub}
                    </p>
                  </div>

                  {/* Monto / estado */}
                  <span className={`font-['Space_Mono'] text-sm font-bold ${color}`}>
                    {monto}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Botón ver compras */}
          <div className="mt-6">
            <Link
              to="/compras"
              className="inline-block font-['Space_Mono'] text-[10px] tracking-[0.12em] uppercase font-bold px-6 py-3 bg-[#1a5c3a] text-white border border-[#1a5c3a] hover:bg-[#0f3d27] transition-colors"
            >
              Ver mis compras
            </Link>
          </div>

        </main>
      </div>
    </PlantillaMarketplace>
  )
}