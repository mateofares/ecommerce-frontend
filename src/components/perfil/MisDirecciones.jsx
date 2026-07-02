import { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import {
  agregarDireccion as agregarDireccionThunk,
  eliminarDireccion as eliminarDireccionThunk,
  predeterminarDireccion as predeterminarDireccionThunk,
} from '../../redux/direccionSlice'

const DIRECCION_VACIA = {
  calle: '', numero: '', ciudad: '', codigoPostal: '', provincia: '', tipoDireccion: 'CASA', notas: '', predeterminada: false,
}

export default function MisDirecciones() {
  const dispatch = useDispatch()
  const { direcciones } = useSelector((state) => state.direccion)
  const [nueva, setNueva] = useState(DIRECCION_VACIA)
  const [mostrarForm, setMostrarForm] = useState(false)

  const agregarDireccion = (e) => {
    e.preventDefault()
    dispatch(agregarDireccionThunk(nueva))  
    setNueva(DIRECCION_VACIA)
    setMostrarForm(false)
  }

  const eliminarDireccion = (id) => dispatch(eliminarDireccionThunk(id))
  const predeterminar = (id) => dispatch(predeterminarDireccionThunk(id))

  return (
    <div className="bg-white border border-stone-300 p-7 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-stone-900 pb-2 border-b-2 border-stone-900 inline-block m-0">
          MIS DIRECCIONES
        </h2>
        <button
          type="button"
          onClick={() => setMostrarForm(v => !v)}
          className="font-['Space_Mono'] text-[10px] tracking-[0.12em] uppercase font-bold px-4 py-2 border border-[#1a5c3a] text-[#1a5c3a]"
        >
          {mostrarForm ? 'Cancelar' : '+ Nueva direccion'}
        </button>
      </div>

      {mostrarForm && (
        <form onSubmit={agregarDireccion} className="form-grid" style={{ marginBottom: '16px' }}>
          <input placeholder="Calle" value={nueva.calle} onChange={e => setNueva({ ...nueva, calle: e.target.value })} required />
          <input placeholder="Numero" value={nueva.numero} onChange={e => setNueva({ ...nueva, numero: e.target.value })} />
          <input placeholder="Ciudad" value={nueva.ciudad} onChange={e => setNueva({ ...nueva, ciudad: e.target.value })} />
          <input placeholder="Codigo postal" value={nueva.codigoPostal} onChange={e => setNueva({ ...nueva, codigoPostal: e.target.value })} />
          <input placeholder="Provincia" value={nueva.provincia} onChange={e => setNueva({ ...nueva, provincia: e.target.value })} />
          <input placeholder="Notas (opcional)" value={nueva.notas} onChange={e => setNueva({ ...nueva, notas: e.target.value })} />
          <button type="submit" className="button button--primary">Guardar direccion</button>
        </form>
      )}

      {direcciones.length === 0 ? (
        <p className="home__text">No tenes direcciones cargadas.</p>
      ) : (
        <div className="flex flex-col divide-y divide-stone-100">
          {direcciones.map(d => (
            <div key={d.id} className="flex items-center gap-4 py-3">
              <div className="flex-1">
                <p className="font-['Space_Mono'] text-[11px] font-bold text-stone-800 m-0">
                  {d.calle} {d.numero} {d.predeterminada && <span style={{ color: '#1a5c3a' }}>· Predeterminada</span>}
                </p>
                <p className="font-['Space_Mono'] text-[9px] text-stone-400 m-0">{d.ciudad}, {d.provincia} ({d.codigoPostal})</p>
              </div>
              {!d.predeterminada && (
                <button type="button" onClick={() => predeterminar(d.id)} className="font-['Space_Mono'] text-[9px] uppercase text-[#1a5c3a]">
                  Predeterminar
                </button>
              )}
              <button type="button" onClick={() => eliminarDireccion(d.id)} className="text-red-500">
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
