import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Boton from './Boton'
import InsigniaEstado from './InsigniaEstado'
import { useSelector,useDispatch } from 'react-redux'
import { postCarrito } from '../redux/carritoSlice'

const estadoBadge = {
  NUEVO:  { texto: 'Nuevo',  status: 'success' },
  USADO:  { texto: 'Usado',  status: 'warning' },
}

export default function TarjetaProducto({ producto }) {
  const navigate = useNavigate()
  const [agregado, setAgregado] = useState(false)

  const badge = estadoBadge[producto.estado] ?? { texto: producto.estado, status: 'neutral' }
  const precio = producto.precioConDescuento ?? producto.precio
  const vendido = producto.estadoProducto === 'VENDIDO'

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')


  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const agregarABolsa = () => {
    if (!token) {
      navigate('/login')
      return
    }
    dispatch(postCarrito({items: [{ productoId: producto.id }] }))
  }



  return (
    <article className="product-card">
      <Link to={`/producto/${producto.id}`} className="product-card__image">
        {producto.imagenUrl && (
          <img src={producto.imagenUrl} alt={producto.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
        )}
      </Link>

      <div className="product-card__content">
        <div className="product-card__top">
          <InsigniaEstado status={badge.status}>{badge.texto}</InsigniaEstado>
          <p className="product-card__price">$ {precio}</p>
        </div>

        <h3 className="product-card__title">{producto.titulo}</h3>
        <p className="product-card__description">{producto.descripcion}</p>

        <Boton variant="secondary" onClick={agregarABolsa} disabled={cargando || agregado || vendido}>
          {vendido ? 'Vendido' : agregado ? 'En la bolsa ✓' : cargando ? 'Agregando...' : 'Anadir a la bolsa'}
        </Boton>
        {error && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '6px' }}>{error}</p>}
      </div>
    </article>
  )
}
