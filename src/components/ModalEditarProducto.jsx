import { useState } from 'react'
import Boton from './Boton'

export default function ModalEditarProducto({ producto, onCerrar, onGuardar }) {
    const [formulario, setFormulario] = useState({
        nombre: producto.nombre,
        precio: producto.precio,
        estado: producto.estado,
        etiquetaImagen: producto.etiquetaImagen,
    })

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <Boton onClick={onCerrar}>X</Boton>
                <h2>Editar Producto</h2>
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={formulario.nombre}
                        onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                    />
                </label>
                <label>
                    Precio:
                    <input
                        type="text"
                        value={formulario.precio}
                        onChange={(e) => setFormulario({ ...formulario, precio: e.target.value })}
                    />
                </label>
                <label>
                    Estado:
                    <select
                        value={formulario.estado}
                        onChange={(e) => setFormulario({ ...formulario, estado: e.target.value })}
                    >
                        <option value="En venta">En venta</option>
                        <option value="Agotado">Vendido</option>
                    </select>
                </label>
                <label>
                    Etiqueta de Imagen:
                    <input
                        type="text"
                        value={formulario.etiquetaImagen}
                        onChange={(e) => setFormulario({ ...formulario, etiquetaImagen: e.target.value })}
                    />
                </label>
                <Boton onClick={() => onGuardar({ ...producto, ...formulario })}>
                    Guardar cambios
                </Boton>
            </div>
        </div>
    )
}
