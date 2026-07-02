import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import { FiTrash2, FiLock, FiRefreshCw } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { eliminarItemCarrito,getCarrito,vaciarCarrito } from '../../redux/carritoSlice'


export default function PaginaCarrito() {

  const dispatch = useDispatch()
  const {items,total,loading,error,fetched} = useSelector((state)=>state.carrito)


  useEffect(() => { if (!fetched) dispatch(getCarrito()) }, [dispatch])

  const eliminarItem = (itemId) => {
    dispatch(eliminarItemCarrito(itemId))
  }

  const vaciar = () => dispatch(vaciarCarrito())



  return (
    <PlantillaMarketplace>
      <main className="home cart-layout">
        <section className="cart-main">
          <div className="cart-header">
            <h1 className="cart-header__title">TU CARRITO</h1>
            <span className="cart-header__count">{items.length} artículos</span>
          </div>
          <div className="cart-header__line" />

          {loading ? (
            <p className="home__text">Cargando...</p>
          ) : items.length === 0 ? (
            <p className="home__text">Tu carrito esta vacio. <Link to="/productos">Explorar productos</Link></p>
          ) : (
            <div className="cart-list">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-item__image">
                    {item.productoImagenUrl ? (
                      <img
                        src={item.productoImagenUrl}
                        alt={item.productoTitulo}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span className="cart-item__tag">{item.productoTitulo?.slice(0, 8)}</span>
                    )}
                  </div>
                  <div className="cart-item__info">
                    <h3 className="cart-item__name">{item.productoTitulo}</h3>
                    <button className="cart-item__remove" type="button" onClick={() => eliminarItem(item.id)}>
                      <FiTrash2 size={11} />
                      Eliminar
                    </button>
                  </div>
                  <p className="cart-item__price">$ {item.productoPrecio}</p>
                </article>
              ))}
            </div>
          )}

          <div className="cart-guarantee">
            <FiRefreshCw size={14} className="cart-guarantee__icon" />
            <p>
              No olvides: Tu garantía de "Segunda Vida" cubre estos artículos
              por 12 meses de reparaciones.
            </p>
          </div>
        </section>

        <aside className="cart-aside">
          <div className="cart-summary">
            <h2 className="cart-summary__title">RESUMEN DEL<br />PEDIDO</h2>

            <div className="cart-summary__lines">
              <div className="cart-summary__line">
                <span>Subtotal</span>
                <strong>$ {total}</strong>
              </div>
              <div className="cart-summary__line">
                <span>Envío</span>
                <strong className="cart-summary__free">Gratis</strong>
              </div>
              <div className="cart-summary__line cart-summary__line--total">
                <span>Total</span>
                <strong>$ {total}</strong>
              </div>
            </div>

            {items.length > 0 && (
              <>
                <Link to="/checkout" className="cart-summary__cta">
                  Proceder al pago
                </Link>
                <button type="button" className="cart-item__remove" style={{ marginTop: '12px' }} onClick={vaciar}>
                  <FiTrash2 size={11} /> Vaciar carrito
                </button>
              </>
            )}

            <div className="cart-summary__secure">
              <FiLock size={11} />
              <span>Encriptación underground segura</span>
            </div>
          </div>
        </aside>
      </main>
    </PlantillaMarketplace>
  )
}
