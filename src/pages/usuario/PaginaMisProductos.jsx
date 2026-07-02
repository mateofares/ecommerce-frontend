import Boton from "../../components/ui/Boton"
import PlantillaMarketplace from "../../layouts/PlantillaMarketplace"
import { useEffect, useState } from "react"
import ModalEditarProducto from "../../components/productos/ModalEditarProducto"
import { useSelector, useDispatch } from 'react-redux'
import { fetchMisProductos, deleteProducto, updateProducto, aplicarDescuentoProducto } from "../../redux/productoSlice"

export default function PaginaMisProductos() {
    const { usuarioId } = useSelector((state) => state.auth)
    const { misItems: productos, loading: cargando } = useSelector((state) => state.productos)
    const dispatch = useDispatch()
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
    const [porcentajeDescuento, setPorcentajeDescuento] = useState('')
    const [productoEditando, setProductoEditando] = useState(null)

    useEffect(() => {
        if (usuarioId && productos.length === 0) dispatch(fetchMisProductos(usuarioId))
    }, [dispatch, usuarioId])

    function eliminar(id) {
        dispatch(deleteProducto(id))
    }

    function guardarEdicion(nuevoProducto) {
        dispatch(updateProducto({
            id: nuevoProducto.id,
            titulo: nuevoProducto.titulo,
            descripcion: nuevoProducto.descripcion,
            precio: nuevoProducto.precio,
            estado: nuevoProducto.estado,
            imagenUrl: nuevoProducto.imagenUrl,
        }))
        setProductoEditando(null)
    }

    function aplicarDescuento(id) {
        dispatch(aplicarDescuentoProducto({ id, porcentaje: Number(porcentajeDescuento) }))
        setProductoSeleccionado(null)
        setPorcentajeDescuento('')
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
