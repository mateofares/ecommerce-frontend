import Boton from "../../components/Boton"
import PlantillaMarketplace from "../../layouts/PlantillaMarketplace"
import { useEffect, useState } from "react"
import ModalEditarProducto from "../../components/ModalEditarProducto"
import api from "../../services/api"
import { useSelector } from 'react-redux'

export default function PaginaMisProductos() {
    const { usuarioId } = useSelector((state) => state.auth)
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
    const [porcentajeDescuento, setPorcentajeDescuento] = useState('')
    const [productoEditando, setProductoEditando] = useState(null)

    function cargar() {
        if (!usuario?.id) return
        setCargando(true)
        api.get(`/productos?usuarioId=${usuario.id}`)
            .then(data => setProductos(data))
            .catch(err => console.log('error:', err))
            .finally(() => setCargando(false))
    }

    useEffect(() => { cargar() }, [usuario?.id])

    function eliminar(id) {
        api.delete(`/productos?id=${id}`)
            .then(() => setProductos(prev => prev.filter(p => p.id !== id)))
            .catch(err => console.log('error:', err))
    }

    function guardarEdicion(nuevoProducto) {
        api.patch(`/productos/${nuevoProducto.id}`, {
            titulo: nuevoProducto.titulo,
            descripcion: nuevoProducto.descripcion,
            precio: nuevoProducto.precio,
            estado: nuevoProducto.estado,
            imagenUrl: nuevoProducto.imagenUrl,
        })
            .then(actualizado => {
                setProductos(prev => prev.map(p => p.id === actualizado.id ? actualizado : p))
                setProductoEditando(null)
            })
            .catch(err => console.log('error:', err))
    }

    function aplicarDescuento(id) {
        api.patch(`/productos/${id}/descuento`, { porcentaje: Number(porcentajeDescuento) })
            .then(actualizado => {
                setProductos(prev => prev.map(p => p.id === actualizado.id ? actualizado : p))
                setProductoSeleccionado(null)
                setPorcentajeDescuento('')
            })
            .catch(err => console.log('error:', err))
    }

    return (
        <PlantillaMarketplace>
            <main className="home detail-layout">
                <h1 className="page-title">Mis productos</h1>
                <p className="home__text">Aqui puedes ver y administrar los productos que has puesto a la venta en el archivo.</p>
                <section className="mis-productos-list">
                    <div className="mis-productos-card">
                        {cargando ? (
                            <p className="home__text">Cargando...</p>
                        ) : productos.length === 0 ? (
                            <p className="home__text">Todavia no publicaste productos.</p>
                        ) : productos.map((producto) => (
                            <div key={producto.id} className="mis-productos-item">
                                <div className="mis-productos-image">
                                    {producto.imagenUrl
                                        ? <img src={producto.imagenUrl} alt={producto.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        : producto.titulo?.slice(0, 8)
                                    }
                                </div>
                                <p className="mis-productos-name">{producto.titulo}</p>
                                <p className="mis-productos-price">
                                    $ {producto.precioConDescuento ?? producto.precio}
                                </p>
                                <p className="mis-productos-status">{producto.estadoProducto}</p>
                                <Boton variant="ghost" onClick={() => setProductoEditando(producto)}>Editar</Boton>
                                <Boton variant="danger" onClick={() => eliminar(producto.id)}>Eliminar</Boton>
                                <Boton variant="primary" onClick={() => setProductoSeleccionado(producto.id)}>
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
                                        <Boton variant="primary" onClick={() => aplicarDescuento(producto.id)}>
                                            Confirmar
                                        </Boton>
                                    </div>
                                )}
                            </div>
                        ))}
                        {productoEditando !== null && (
                            <ModalEditarProducto
                                producto={productoEditando}
                                onCerrar={() => setProductoEditando(null)}
                                onGuardar={guardarEdicion}
                            />
                        )}
                    </div>
                </section>
            </main>
        </PlantillaMarketplace>
    )
}
