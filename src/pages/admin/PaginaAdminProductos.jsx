import { useEffect, useState } from 'react'
import Boton from '../../components/Boton'
import TablaDatos from '../../components/TablaDatos'
import TarjetaDashboard from '../../components/TarjetaDashboard'
import InsigniaEstado from '../../components/InsigniaEstado'
import PlantillaAdmin from '../../layouts/PlantillaAdmin'
import api from '../../services/api'

export default function PaginaAdminProductos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    api.get('/productos')
      .then(data => setProductos(data))
      .catch(err => console.log('error:', err))
      .finally(() => setCargando(false))
  }, [])

  function eliminar(id) {
    api.patch(`/productos/${id}/eliminar-logico`)
      .then(() => setProductos(prev =>
        prev.map(p => p.id === id ? { ...p, estadoProducto: 'ELIMINADO' } : p)
      ))
      .catch(err => console.log('error:', err))
  }

  const productosFiltrados = productos.filter(p =>
    (p.titulo ?? '').toLowerCase().includes(busqueda.toLowerCase())
  )

  const activos = productos.filter(p => p.estadoProducto !== 'ELIMINADO').length
  const eliminados = productos.length - activos

  return (
    <PlantillaAdmin eyebrow="Administracion" title="Productos del sistema" text="Gestion y moderacion de todos los productos publicados.">
      <div className="admin-metrics">
        <TarjetaDashboard titulo="Total productos" valor={String(productos.length)} detalle="Listados en total" />
        <TarjetaDashboard titulo="Activos" valor={String(activos)} detalle="Visibles en la tienda" />
        <TarjetaDashboard titulo="Eliminados" valor={String(eliminados)} detalle="Dados de baja" />
      </div>

      <div style={{ margin: '24px 0 16px' }}>
        <input
          placeholder="Buscar por nombre de producto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #d6d3ce', width: '320px', fontFamily: 'inherit' }}
        />
        <span style={{ marginLeft: '12px', fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#78716c' }}>
          {productosFiltrados.length} resultados
        </span>
      </div>

      {cargando ? (
        <p>Cargando...</p>
      ) : productosFiltrados.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <TablaDatos
          headers={['ID', 'Titulo', 'Precio', 'Categoria', 'Estado', 'Acciones']}
          rows={productosFiltrados.map(p => [
            p.id,
            p.titulo,
            `$ ${p.precio}`,
            p.categoria ?? '—',
            <InsigniaEstado
              key={`est-${p.id}`}
              status={p.estadoProducto === 'ELIMINADO' ? 'danger' : 'success'}
            >
              {p.estadoProducto ?? 'ACTIVO'}
            </InsigniaEstado>,
            p.estadoProducto === 'ELIMINADO'
              ? <span key={`acc-${p.id}`} style={{ color: '#aaa', fontSize: '12px' }}>Eliminado</span>
              : <Boton key={`acc-${p.id}`} variant="ghost" onClick={() => eliminar(p.id)}>Eliminar</Boton>,
          ])}
        />
      )}
    </PlantillaAdmin>
  )
}
