import { useState } from 'react'
import Boton from './Boton'

const ESTADOS = ['NUEVO', 'USADO']

export default function ModalEditarProducto({ producto, onCerrar, onGuardar }) {
    const [formulario, setFormulario] = useState({
        titulo: producto.titulo ?? '',
        precio: producto.precio ?? '',
        descripcion: producto.descripcion ?? '',
        estado: producto.estado ?? 'USADO',
        imagenUrl: producto.imagenUrl ?? '',
    })

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <Boton onClick={onCerrar}>X</Boton>
                <h2>Editar Producto</h2>
                <label>
                    Titulo:
                    <input
                        type="text"
                        value={formulario.titulo}
                        onChange={(e) => setFormulario({ ...formulario, titulo: e.target.value })}
                    />
                </label>
                <label>
                    Precio:
                    <input
                        type="number"
                        value={formulario.precio}
                        onChange={(e) => setFormulario({ ...formulario, precio: e.target.value })}
                    />
                </label>
                <label>
                    Descripcion:
                    <textarea
                        value={formulario.descripcion}
                        onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
                    />
                </label>
                <label>
                    Estado:
                    <select
                        value={formulario.estado}
                        onChange={(e) => setFormulario({ ...formulario, estado: e.target.value })}
                    >
                        {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </label>
                <label>
                    URL de imagen:
                    <input
                        type="text"
                        value={formulario.imagenUrl}
                        onChange={(e) => setFormulario({ ...formulario, imagenUrl: e.target.value })}
                    />
                </label>
                <Boton onClick={() => onGuardar({ ...producto, ...formulario, precio: Number(formulario.precio) })}>
                    Guardar cambios
                </Boton>
            </div>
        </div>
    )
}
