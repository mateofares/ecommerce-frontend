import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import TarjetaProducto from '../../components/productos/TarjetaProducto'
import BarraBusqueda from '../../components/ui/BarraBusqueda'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import '../../styles/catalogo.css'
import { useDispatch,useSelector } from 'react-redux'
import { fetchProductos } from '../../redux/productoSlice'

// Muestra T8 -> 8, T8M -> 8M, etc.; el resto (XS, M...) queda igual.
const formatTalle = (t) => (t ? t.replace(/^T(\d+[MW]?)$/, '$1') : t)

const FILTROS_VACIOS = { categoria: '', marca: '', color: '', talle: '', precioMin: '', precioMax: '' }

// filtro: 'Nuevo' | 'Usado' (rutas /nuevo y /usado) -> enum Estado NUEVO/USADO
export default function PaginaProductos({ filtro }) {
  const [searchParams] = useSearchParams()
  const [busqueda, setBusqueda] = useState('')
  const [f, setF] = useState({ ...FILTROS_VACIOS, categoria: searchParams.get('categoria') ?? '' })
  const {items,error,loading} = useSelector((state)=>state.productos) //me suscribo a productos del store
  const dispatch = useDispatch()

  useEffect(()=>{
    if (items.length===0) dispatch(fetchProductos())
  },[dispatch])

  const unicos = (campo) => [...new Set(items.map(p => p[campo]).filter(Boolean))].sort()
  const opciones = {
    categorias: unicos('categoria'),
    marcas: unicos('marca'),
    colores: unicos('color'),
    talles: unicos('talle'),
  }

  const filtrados = items.filter(p => {
    const precio = p.precioConDescuento ?? p.precio ?? 0
    if (busqueda && !(p.titulo ?? '').toLowerCase().includes(busqueda.toLowerCase())) return false
    if (f.categoria && p.categoria !== f.categoria) return false
    if (f.marca && p.marca !== f.marca) return false
    if (f.color && p.color !== f.color) return false
    if (f.talle && p.talle !== f.talle) return false
    if (f.precioMin && precio < Number(f.precioMin)) return false
    if (f.precioMax && precio > Number(f.precioMax)) return false
    return true
  })

  const set = (campo) => (e) => setF(prev => ({ ...prev, [campo]: e.target.value }))
  const limpiar = () => { setF(FILTROS_VACIOS); setBusqueda('') }

  if(loading) return <p>Cargando Productos</p>
  if (error) return <p>Error al cargar los productos: {error}</p>
  return (
    <PlantillaMarketplace>
      <main className="home page-shell">
        <p className="home__eyebrow">{filtro || 'Catalogo'} // archivo activo</p>
        <h1 className="page-title">Explorar prendas</h1>

        <div className="catalogo">
          {/* ── Filtros ── */}
          <aside className="catalogo__filtros">
            <p className="catalogo__filtros-titulo">Filtros</p>

            <BarraBusqueda value={busqueda} onChange={setBusqueda} />

            <div className="filtro-grupo">
              <span className="filtro-grupo__label">Categoria</span>
              <select value={f.categoria} onChange={set('categoria')}>
                <option value="">Todas</option>
                {opciones.categorias.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="filtro-grupo">
              <span className="filtro-grupo__label">Marca</span>
              <select value={f.marca} onChange={set('marca')}>
                <option value="">Todas</option>
                {opciones.marcas.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="filtro-grupo">
              <span className="filtro-grupo__label">Color</span>
              <select value={f.color} onChange={set('color')}>
                <option value="">Todos</option>
                {opciones.colores.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="filtro-grupo">
              <span className="filtro-grupo__label">Talle</span>
              <select value={f.talle} onChange={set('talle')}>
                <option value="">Todos</option>
                {opciones.talles.map(t => <option key={t} value={t}>{formatTalle(t)}</option>)}
              </select>
            </div>

            <div className="filtro-grupo">
              <span className="filtro-grupo__label">Precio</span>
              <div className="filtro-precio">
                <input type="number" placeholder="Min" value={f.precioMin} onChange={set('precioMin')} />
                <input type="number" placeholder="Max" value={f.precioMax} onChange={set('precioMax')} />
              </div>
            </div>

            <button type="button" className="filtro-limpiar" onClick={limpiar}>Limpiar filtros</button>
          </aside>

          {/* ── Resultados ── */}
          <section className="catalogo__resultados">
            {(
              <>
                <p className="component-section__count">{filtrados.length} productos encontrados</p>
                {filtrados.length === 0 ? (
                  <p className="home__text">No hay productos que coincidan con los filtros.</p>
                ) : (
                  <div className="product-grid">
                    {filtrados.map(p => <TarjetaProducto key={p.id} producto={p} />)}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>
    </PlantillaMarketplace>
  )
}
