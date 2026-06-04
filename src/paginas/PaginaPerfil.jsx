import { Link } from 'react-router-dom'
import { useState } from 'react'
import PlantillaMarketplace from '../plantillas/PlantillaMarketplace'

export default function PaginaPerfil() {
  const [seccionActiva, setSeccionActiva] = useState('compras')

  return (
    <PlantillaMarketplace>
      <div className="flex min-h-screen bg-gray-100">

        {/* ── SIDEBAR ─────────────────────────── */}
        <aside className="w-52 shrink-0 border-r border-gray-300 bg-gray-100">
          <p className="px-6 pt-7 pb-5 text-xs font-bold uppercase tracking-widest text-gray-800">
            Mi Perfil
          </p>

          <nav className="flex flex-col">

            <button
              type="button"
              onClick={() => setSeccionActiva('compras')}
              className={`flex items-center gap-3 px-6 py-3.5 text-xs font-bold uppercase tracking-widest border-l-2 transition-colors text-left
                ${seccionActiva === 'compras'
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'text-gray-500 border-transparent hover:bg-gray-200 hover:text-gray-900'
                }`}
            >
              🛍 Mis compras
            </button>

            <button
              type="button"
              onClick={() => setSeccionActiva('ventas')}
              className={`flex items-center gap-3 px-6 py-3.5 text-xs font-bold uppercase tracking-widest border-l-2 transition-colors text-left
                ${seccionActiva === 'ventas'
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'text-gray-500 border-transparent hover:bg-gray-200 hover:text-gray-900'
                }`}
            >
              🏷 Mis ventas
            </button>

            <button
              type="button"
              onClick={() => setSeccionActiva('editar')}
              className={`flex items-center gap-3 px-6 py-3.5 text-xs font-bold uppercase tracking-widest border-l-2 transition-colors text-left
                ${seccionActiva === 'editar'
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'text-gray-500 border-transparent hover:bg-gray-200 hover:text-gray-900'
                }`}
            >
              ✏ Editar perfil
            </button>

            <Link
              to="/login"
              className="flex items-center gap-3 px-6 py-3.5 text-xs font-bold uppercase tracking-widest border-l-2 border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              → Cerrar sesión
            </Link>

          </nav>
        </aside>

        {/* ── CONTENIDO ───────────────────────── */}
        <main className="flex-1 p-8">

          {/* Fila superior: card perfil + stats */}
          <div className="flex gap-5 mb-6">

            {/* Card de perfil */}
            <div className="w-56 shrink-0 bg-white border border-gray-300 p-5 flex flex-col gap-4">

              {/* Avatar */}
              <div className="w-full aspect-square bg-gray-800 flex items-center justify-center">
                <span className="text-5xl font-black text-gray-500">AR</span>
              </div>

              {/* Nombre y membresía */}
              <div>
                <h1 className="text-2xl font-black uppercase leading-tight">
                  ALEX REBEL
                </h1>
                <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                  Miembro desde 2022
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest bg-emerald-700 text-emerald-100 px-3 py-1 w-fit">
                  Eco-Warrior
                </span>
                <span className="text-xs font-bold uppercase tracking-widest border border-emerald-700 text-emerald-700 px-3 py-1 w-fit">
                  Pro Seller
                </span>
              </div>

            </div>

            {/* Stats */}
            <div className="flex flex-col gap-4 flex-1">

              <div className="flex-1 bg-white border border-gray-300 px-6 flex items-center gap-4">
                <span className="text-gray-400 text-xl">🛒</span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">Ventas totales</p>
                  <p className="text-3xl font-black">$1,420</p>
                </div>
              </div>

              <div className="flex-1 bg-white border border-gray-300 px-6 flex items-center gap-4">
                <span className="text-gray-400 text-xl">♻</span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">Prendas recicladas</p>
                  <p className="text-3xl font-black">42</p>
                </div>
              </div>

              <div className="flex-1 bg-white border border-gray-300 px-6 flex items-center gap-4">
                <span className="text-gray-400 text-xl">⭐</span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">Calificación</p>
                  <p className="text-3xl font-black">4.9/5</p>
                </div>
              </div>

            </div>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white border border-gray-300 p-7">
            <h2 className="text-2xl font-black uppercase pb-2 border-b-2 border-black inline-block mb-4">
              ACTIVIDAD RECIENTE
            </h2>

            <div className="flex flex-col divide-y divide-gray-100">

              {/* Item 1 */}
              <div className="flex items-center gap-4 py-4">
                <div className="w-14 h-14 shrink-0 bg-teal-700" />
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-800">
                    VENDIDO: BOMBER JACKET 90'S
                  </p>
                  <p className="text-xs italic text-gray-400 mt-0.5">
                    Hace 2 horas a @claudia_rebel
                  </p>
                </div>
                <span className="text-sm font-bold text-emerald-600">+$85</span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-4 py-4">
                <div className="w-14 h-14 shrink-0 bg-red-900" />
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-800">
                    COMPRADO: INDUSTRIAL KICKS RED
                  </p>
                  <p className="text-xs italic text-gray-400 mt-0.5">
                    Ayer
                  </p>
                </div>
                <span className="text-sm font-bold text-red-500">-$120</span>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-4 py-4">
                <div className="w-14 h-14 shrink-0 bg-emerald-700 flex items-center justify-center">
                  <span className="text-white text-xl">+</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-800">
                    NUEVO LISTADO: PANTALÓN CARGO
                  </p>
                  <p className="text-xs italic text-gray-400 mt-0.5">
                    Hace 3 días
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  ACTIVO
                </span>
              </div>

            </div>
          </div>

          {/* Botón */}
          <div className="mt-6">
            <Link
              to="/compras"
              className="inline-block text-xs font-bold uppercase tracking-widest px-6 py-3 bg-emerald-700 text-white hover:bg-emerald-900 transition-colors"
            >
              Ver mis compras
            </Link>
          </div>

        </main>
      </div>
    </PlantillaMarketplace>
  )
}