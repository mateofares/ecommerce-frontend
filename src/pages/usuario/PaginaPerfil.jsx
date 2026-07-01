import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import { useSelector, useDispatch } from 'react-redux'
import { FiShoppingCart, FiStar, FiRefreshCw, FiLogOut } from 'react-icons/fi'
import { fetchDirecciones } from '../../redux/direccionSlice'
import { fetchMisCompras, fetchMisVentas } from '../../redux/ordenSlice'
import { fetchReseniasByVendedor } from '../../redux/reseniaSlice'
import { logout } from '../../redux/authSlice'
import PerfilSidebar from '../../components/perfil/PerfilSidebar'
import PerfilCard from '../../components/perfil/PerfilCard'
import PerfilStats from '../../components/perfil/PerfilStats'
import ActividadReciente from '../../components/perfil/ActividadReciente'
import MisDirecciones from '../../components/perfil/MisDirecciones'
import ResenasRecibidas from '../../components/perfil/ResenasRecibidas'

export default function PaginaPerfil() {
  const { usuario } = useSelector((state) => state.auth)
  const { items: compras, ventas, fetched: fetchedOrdenes, loading: loadingOrdenes } = useSelector((state) => state.ordenes)
  const { items: resenias } = useSelector((state) => state.resenias)
  const { direcciones } = useSelector((state) => state.direccion)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!fetchedOrdenes)     { dispatch(fetchMisVentas()); dispatch(fetchMisCompras()) }
    if (!direcciones.length) dispatch(fetchDirecciones())
    if (usuario && !resenias.length) dispatch(fetchReseniasByVendedor(usuario))
  }, [dispatch])

  const ventasTotales = ventas.length
  const prendasVendidas = ventas.reduce((acc, o) => acc + o.compras.length, 0)

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

  const cerrarSesion = () => {
    dispatch(logout())
    navigate('/')
}

  return (
    <PlantillaMarketplace>
      <div className="flex min-h-screen bg-[#f0efeb]">

        <PerfilSidebar onCerrarSesion={cerrarSesion} />

        <main className="flex-1 p-8">

          <div className="flex gap-5 mb-6">
            <PerfilCard usuario={usuario} prendasVendidas={prendasVendidas} />
            <PerfilStats stats={stats} />
          </div>

          <ActividadReciente actividad={actividad} loading={loadingOrdenes} />
          <MisDirecciones />
          <ResenasRecibidas resenias={resenias} />

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
