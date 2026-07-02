import BarraBusqueda from '../ui/BarraBusqueda'
import TarjetaProducto from './TarjetaProducto'
import { useEffect, useState } from 'react'
import Boton from '../ui/Boton'
import { useDispatch,useSelector } from 'react-redux'
import { fetchProductos } from '../../redux/productoSlice'

export default function SeccionProductos({ titulo}) {
  const [categoria, SetCategoria] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const {items,loading,error,fetched} = useSelector((state)=>state.productos)
  const dispatch = useDispatch()
  
  const itemsFiltrados = items.filter((item) =>
    (item.titulo ?? '').toLowerCase().includes(busqueda.toLowerCase()) &&
    (categoria ? item.estado === categoria : true)
  )
  
  useEffect(()=>{
    if(!fetched) dispatch(fetchProductos())
  },[dispatch])

  if (error) return <p>Error al cargar los productos: {error}</p>
  return (
    <section className="component-section">
      <div className="component-section__header">
        <h2>{titulo}</h2>
        <BarraBusqueda value={busqueda} onChange={setBusqueda} />
        <div className="filtros-categoria">
          <button
            className={`filtro-btn ${categoria === 'NUEVO' ? 'filtro-btn--activo' : ''}`}
            onClick={() => SetCategoria('NUEVO')}
          >Nuevo</button>
          <button
            className={`filtro-btn ${categoria === 'USADO' ? 'filtro-btn--activo' : ''}`}
            onClick={() => SetCategoria('USADO')}
          >Usado</button>
          <button
            className={`filtro-btn ${categoria === '' ? 'filtro-btn--activo' : ''}`}
            onClick={() => SetCategoria('')}
          >Todos</button>
        </div>
      </div>
      {loading ? (
        <div className="product-grid">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="product-card animate-pulse">
              <div style={{ minHeight: '220px', backgroundColor: '#1c1c1a', opacity: 0.12 }} />
              <div className="product-card__content" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ height: '20px', width: '60px', backgroundColor: '#e5e2dc', borderRadius: '2px' }} />
                  <div style={{ height: '20px', width: '70px', backgroundColor: '#e5e2dc', borderRadius: '2px' }} />
                </div>
                <div style={{ height: '22px', width: '80%', backgroundColor: '#e5e2dc', borderRadius: '2px' }} />
                <div style={{ height: '14px', width: '100%', backgroundColor: '#f0efeb', borderRadius: '2px' }} />
                <div style={{ height: '14px', width: '65%', backgroundColor: '#f0efeb', borderRadius: '2px' }} />
                <div style={{ height: '40px', width: '100%', backgroundColor: '#e5e2dc', borderRadius: '2px', marginTop: '6px' }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="component-section__count">{itemsFiltrados.length} productos encontrados</p>
          <div className="product-grid">
            {itemsFiltrados.map((item) => (
              <TarjetaProducto key={item.id} producto={item} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

