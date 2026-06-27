import BarraBusqueda from './BarraBusqueda'
import TarjetaProducto from './TarjetaProducto'
import { useEffect, useState } from 'react'
import Boton from './Boton'
import { useDispatch,useSelector } from 'react-redux'
import { fetchProductos } from '../redux/productoSlice'

export default function SeccionProductos({ titulo}) {
  const [categoria, SetCategoria] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const {items,loading,error} = useSelector((state)=>state.productos)
  const dispatch = useDispatch()
  
  const itemsFiltrados = items.filter((item) =>
    (item.titulo ?? '').toLowerCase().includes(busqueda.toLowerCase()) &&
    (categoria ? item.estado === categoria : true)
  )
  
  useEffect(()=>{
    if (items.length===0) dispatch(fetchProductos())
  },[dispatch])

  if(loading) return <p>Cargando Productos</p>
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
      <p className="component-section__count">{itemsFiltrados.length} productos encontrados</p>
      <div className="product-grid">
        {itemsFiltrados.map((item) => (
           <TarjetaProducto key={item.id} producto={item} />
        ))}
      </div>
    </section>
  )
}

