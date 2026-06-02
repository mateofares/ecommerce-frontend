import Boton from "../components/Boton"
import PlantillaMarketplace from "../plantillas/PlantillaMarketplace"
import { useState } from "react"


export default function PaginaMisProductos() {
    const [productos, setProductos] = useState([
        { id: 1, nombre: 'Vestido vintage', precio: '$50', estado: 'En venta',etiquetaImagen: 'Vestido' },
        { id: 2, nombre: 'Chaqueta de cuero', precio: '$80', estado: 'En venta', etiquetaImagen: 'Chaqueta' },
        { id: 3, nombre: 'Pantalones de mezclilla', precio: '$30', estado: 'Vendido', etiquetaImagen: 'Pantalones' },
    ])
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
    const [porcentajeDescuento, setPorcentajeDescuento] = useState('')
  return (    
    <PlantillaMarketplace>
      <main className="home detail-layout">
        <h1 className="page-title">Mis productos</h1>
        <p className="home__text">Aqui puedes ver y administrar los productos que has puesto a la venta en el archivo.</p>  
        <section className="mis-productos-list">
            <div className="mis-productos-card">
                {productos.map((producto) => (
                    <div key={producto.id} className="mis-productos-item">
                        <div className="mis-productos-image">{producto.etiquetaImagen}</div>
                        <p className="mis-productos-name">{producto.nombre}</p>
                        <p className="mis-productos-price">{producto.precio}</p>
                        <p className="mis-productos-status">{producto.estado}</p>
                        <Boton variant="ghost"
                        Link to={`/editar-producto/${producto.id}`}
                        >Editar</Boton>
                        <Boton variant="danger"
                        
                        onClick={() => setProductos(productos.filter((p) => p.id !== producto.id))}

                        
                        >Eliminar</Boton>
                        <Boton
                            variant="primary"
                            onClick={() => setProductoSeleccionado(producto.id)}
                            
                        >
                            Aplicar Descuento
                        </Boton>
                        {productoSeleccionado === producto.id && (
                            <div className="descuento-form">
                                <input
                                    type="number"
                                    placeholder="Porcentaje de descuento"
                                    value={porcentajeDescuento}
                                    onChange={(e) => setPorcentajeDescuento(e.target.value)}
                                />
                                <Boton
                                    variant="primary"
                                    onClick={() => {
                                        
                                        {productos.map((prod) => {
                                            if (prod.id === productoSeleccionado) {
                                                const descuento = (parseFloat(prod.precio.replace('$', '')) * parseFloat(porcentajeDescuento)) / 100
                                                const nuevoPrecio = parseFloat(prod.precio.replace('$', '')) - descuento
                                                producto.precio = nuevoPrecio.toLocaleString()
                                            }
                                        })}
                                        setProductoSeleccionado(null)
                                        setPorcentajeDescuento('')
                                    }}
                                >
                                    Confirmar
                                </Boton>
                            </div>
                        )}
                    </div>
                ))}
                
            </div>
        </section>
      </main>
    </PlantillaMarketplace>
  )}