import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import api from '../../services/api'
import { useSelector } from 'react-redux'
import {
  FiShoppingBag,
  FiTag,
  FiEdit2,
  FiLogOut,
  FiShoppingCart,
  FiStar,
  FiRefreshCw,
  FiTrash2,
} from 'react-icons/fi'

const DIRECCION_VACIA = {
  calle: '', numero: '', ciudad: '', codigoPostal: '', provincia: '', tipoDireccion: 'CASA', notas: '', predeterminada: false,
}

const NAV_ITEMS = [
  { label: 'Mis compras',   path: '/compras',       icon: <FiShoppingBag size={14} /> },
  { label: 'Mis ventas',    path: '/mis-productos', icon: <FiTag size={14} /> },
  { label: 'Editar perfil', path: '/perfil',        icon: <FiEdit2 size={14} /> },
]


export default function PaginaPerfil() {
  const { usuarioId } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [direcciones, setDirecciones] = useState([])
  const [nueva, setNueva] = useState(DIRECCION_VACIA)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [ventas, setVentas] = useState([])
  const [compras, setCompras] = useState([])
  const [resenias, setResenias] = useState([])

  useEffect(() => {
    api.get('/ordenes/mis-ventas')
      .then(data => setVentas(data))
      .catch(err => console.log('error:', err))
    api.get('/ordenes/mis-compras')
      .then(data => setCompras(data))
      .catch(err => console.log('error:', err))
    if (usuario?.id) {
      api.get(`/resenias/vendedor/${usuario.id}`)
        .then(data => setResenias(data))
        .catch(err => console.log('error:', err))
    }
  }, [usuario?.id])

  const ventasTotales = ventas.reduce((acc, o) => acc + o.total, 0)
  const prendasVendidas = ventas.reduce((acc, o) => acc + o.items.length, 0)

  const stats = [
    { icon: <FiShoppingCart size={20} />, label: 'Ventas totales',    value: `$${ventasTotales.toFixed(0)}` },
    { icon: <FiRefreshCw size={20} />,    label: 'Prendas vendidas',   value: String(prendasVendidas)        },
    { icon: <FiStar size={20} />,         label: 'Compras realizadas', value: String(compras.length)         },
  ]

  const actividad = [
    ...ventas.map(o => ({
      id: `v-${o.id}`,
      titulo: `VENDIDO: ${o.items.map(i => i.productoTitulo).join(' / ')}`,
      sub: `Orden #${o.id}`,
      monto: `+$${o.total}`,
      color: 'text-emerald-600',
      bg: 'bg-teal-700',
      sortKey: o.id,
    })),
    ...compras.map(o => ({
      id: `c-${o.id}`,
      titulo: `COMPRADO: ${o.items.map(i => i.productoTitulo).join(' / ')}`,
      sub: `Orden #${o.id}`,
      monto: `-$${o.total}`,
      color: 'text-red-500',
      bg: 'bg-red-900',
      sortKey: o.id,
    })),
  ].sort((a, b) => b.sortKey - a.sortKey).slice(0, 3)

  function cargarDirecciones() {
    api.get('/direcciones')
      .then(data => setDirecciones(data))
      .catch(err => console.log('error:', err))
  }

  useEffect(() => { cargarDirecciones() }, [])

  function agregarDireccion(e) {
    e.preventDefault()
    api.post('/direcciones', nueva)
      .then(() => {
        setNueva(DIRECCION_VACIA)
        setMostrarForm(false)
        cargarDirecciones()
      })
      .catch(err => console.log('error:', err))
  }

  function eliminarDireccion(id) {
    api.delete(`/direcciones/${id}`)
      .then(() => cargarDirecciones())
      .catch(err => console.log('error:', err))
  }

  function predeterminar(id) {
    api.post(`/direcciones/${id}/predeterminada`)
      .then(() => cargarDirecciones())
      .catch(err => console.log('error:', err))
  }

  function cerrarSesion() {
    logout()
    navigate('/')
  }

  const iniciales = `${usuario?.nombre?.[0] ?? ''}${usuario?.apellido?.[0] ?? ''}`.toUpperCase() || 'US'
  const nombreCompleto = usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Usuario'

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
              onClick={cerrarSesion}
              className="flex items-center gap-3 px-6 py-3.5 border-l-2 border-transparent font-['Space_Mono'] text-[10px] tracking-[0.14em] uppercase font-bold text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors text-left"
            >
              <FiLogOut size={14} />
              Cerrar sesión
            </button>
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
                  <span className="font-['Bebas_Neue'] text-5xl text-stone-500 select-none">{iniciales}</span>
                </div>
              </div>

              {/* Nombre */}
              <div>
                <h1 className="font-['Bebas_Neue'] text-2xl leading-tight text-stone-900 m-0">
                  {nombreCompleto}
                </h1>
                <p className="font-['Space_Mono'] text-[9px] tracking-[0.2em] uppercase text-stone-400 mt-1 m-0">
                  {usuario?.mail}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-col gap-2">
                <span className="font-['Space_Mono'] text-[8px] tracking-[0.14em] uppercase font-bold bg-[#1a5c3a] text-[#c8e6d0] px-3 py-1 w-fit">
                  Eco-Warrior
                </span>
                {prendasVendidas > 10 && (
                  <span className="font-['Space_Mono'] text-[8px] tracking-[0.14em] uppercase font-bold border border-[#1a5c3a] text-[#1a5c3a] px-3 py-1 w-fit">
                    Pro Seller
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className=" flex flex-col gap-4 flex-1">
              {stats.map(({ icon, label, value }) => (
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
              {actividad.length === 0 ? (
                <p className="font-['Space_Mono'] text-[10px] text-stone-400" style={{ padding: '16px 0' }}>Sin actividad reciente.</p>
              ) : actividad.map(({ id, titulo, sub, monto, color, bg }) => (
                <div key={id} className="flex items-center gap-4 py-4">
                  <div className={`w-14 h-14 shrink-0 ${bg} flex items-center justify-center`}>
                    <span className="font-['Space_Mono'] text-[7px] text-white/30 uppercase tracking-wider text-center px-1">
                      IMG
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-['Space_Mono'] text-[10px] tracking-[0.1em] uppercase font-bold text-stone-800 m-0">
                      {titulo}
                    </p>
                    <p className="font-['Space_Mono'] text-[9px] italic text-stone-400 mt-0.5 m-0">
                      {sub}
                    </p>
                  </div>
                  <span className={`font-['Space_Mono'] text-sm font-bold ${color}`}>
                    {monto}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mis direcciones */}
          <div className="bg-white border border-stone-300 p-7 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-stone-900 pb-2 border-b-2 border-stone-900 inline-block m-0">
                MIS DIRECCIONES
              </h2>
              <button
                type="button"
                onClick={() => setMostrarForm(v => !v)}
                className="font-['Space_Mono'] text-[10px] tracking-[0.12em] uppercase font-bold px-4 py-2 border border-[#1a5c3a] text-[#1a5c3a]"
              >
                {mostrarForm ? 'Cancelar' : '+ Nueva direccion'}
              </button>
            </div>

            {mostrarForm && (
              <form onSubmit={agregarDireccion} className="form-grid" style={{ marginBottom: '16px' }}>
                <input placeholder="Calle" value={nueva.calle} onChange={e => setNueva({ ...nueva, calle: e.target.value })} required />
                <input placeholder="Numero" value={nueva.numero} onChange={e => setNueva({ ...nueva, numero: e.target.value })} />
                <input placeholder="Ciudad" value={nueva.ciudad} onChange={e => setNueva({ ...nueva, ciudad: e.target.value })} />
                <input placeholder="Codigo postal" value={nueva.codigoPostal} onChange={e => setNueva({ ...nueva, codigoPostal: e.target.value })} />
                <input placeholder="Provincia" value={nueva.provincia} onChange={e => setNueva({ ...nueva, provincia: e.target.value })} />
                <input placeholder="Notas (opcional)" value={nueva.notas} onChange={e => setNueva({ ...nueva, notas: e.target.value })} />
                <button type="submit" className="button button--primary">Guardar direccion</button>
              </form>
            )}

            {direcciones.length === 0 ? (
              <p className="home__text">No tenes direcciones cargadas.</p>
            ) : (
              <div className="flex flex-col divide-y divide-stone-100">
                {direcciones.map(d => (
                  <div key={d.id} className="flex items-center gap-4 py-3">
                    <div className="flex-1">
                      <p className="font-['Space_Mono'] text-[11px] font-bold text-stone-800 m-0">
                        {d.calle} {d.numero} {d.predeterminada && <span style={{ color: '#1a5c3a' }}>· Predeterminada</span>}
                      </p>
                      <p className="font-['Space_Mono'] text-[9px] text-stone-400 m-0">{d.ciudad}, {d.provincia} ({d.codigoPostal})</p>
                    </div>
                    {!d.predeterminada && (
                      <button type="button" onClick={() => predeterminar(d.id)} className="font-['Space_Mono'] text-[9px] uppercase text-[#1a5c3a]">
                        Predeterminar
                      </button>
                    )}
                    <button type="button" onClick={() => eliminarDireccion(d.id)} className="text-red-500">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reseñas recibidas */}
          {resenias.length > 0 && (
            <div className="bg-white border border-stone-300 p-7 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-stone-900 pb-2 border-b-2 border-stone-900 inline-block m-0">
                  RESEÑAS RECIBIDAS
                </h2>
                <span className="font-['Space_Mono'] text-[9px] tracking-[0.2em] uppercase text-stone-400">
                  {resenias.length} opiniones · promedio{' '}
                  {(resenias.reduce((acc, r) => acc + r.calificacion, 0) / resenias.length).toFixed(1)} ★
                </span>
              </div>
              <div className="resenas__grid">
                {resenias.map(r => (
                  <article key={r.id} className="resena-card">
                    <div className="resena-card__header">
                      <div className="resena-card__meta">
                        <span className="resena-card__nombre">{r.compradorNombre ?? 'Usuario'}</span>
                        <span className="resena-card__fecha">
                          {r.fecha ? new Date(r.fecha).toLocaleDateString('es-AR', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                        </span>
                      </div>
                      <div className="resena-card__estrellas">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className={i < r.calificacion ? 'resena-card__estrella--activa' : 'resena-card__estrella--vacia'}>★</span>
                        ))}
                      </div>
                    </div>
                    {r.comentarios && <p className="resena-card__comentario">{r.comentarios}</p>}
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Acciones */}
          <div className="mt-6 flex gap-3">
            <Link
              to="/compras"
              className="inline-block font-['Space_Mono'] text-[10px] tracking-[0.12em] uppercase font-bold px-6 py-3 bg-[#1a5c3a] text-white border border-[#1a5c3a] hover:bg-[#0f3d27] transition-colors"
            >
              Ver mis compras
            </Link>
            <button
              type="button"
              onClick={cerrarSesion}
              className="inline-flex items-center gap-2 font-['Space_Mono'] text-[10px] tracking-[0.12em] uppercase font-bold px-6 py-3 border border-stone-400 text-stone-700"
            >
              <FiLogOut size={13} /> Cerrar sesion
            </button>
          </div>

        </main>
      </div>
    </PlantillaMarketplace>
  )
}