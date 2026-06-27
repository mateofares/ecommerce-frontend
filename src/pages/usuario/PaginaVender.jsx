import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Boton from '../../components/Boton'
import SelectorTalle from '../../components/SelectorTalle'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import api from '../../services/api'

const CATEGORIAS = ['PANTALONES', 'CAMISETAS', 'ZAPATILLAS', 'CAMPERAS', 'ACCESORIOS', 'OTRO']
const MARCAS = ['NIKE', 'ADIDAS', 'REEBOK', 'PUMA', 'CONVERSE']
const COLORES = ['ROJO', 'VERDE', 'AZUL', 'AMARILLO', 'NEGRO', 'BLANCO']
const ESTADOS = ['NUEVO', 'USADO']

const NUMEROS_CALZADO = [6, 7, 8, 9, 10, 11, 12]
const TALLES_ROPA = ['XS', 'S', 'M', 'L', 'XL'].map(t => ({ value: t, label: t }))
const TALLES_CALZADO_GRUPOS = [
  { titulo: 'Hombre', opciones: NUMEROS_CALZADO.map(n => ({ value: `T${n}M`, label: `${n}M` })) },
  { titulo: 'Mujer', opciones: NUMEROS_CALZADO.map(n => ({ value: `T${n}W`, label: `${n}W` })) },
]
const talleDefault = (categoria) => categoria === 'ZAPATILLAS' ? 'T8M' : 'M'

export default function PaginaVender() {
  const navigate = useNavigate()
  const [talle, setTalle] = useState('M')
  const [titulo, setTitulo] = useState('')
  const [marca, setMarca] = useState('NIKE')
  const [categoria, setCategoria] = useState('OTRO')
  const [color, setColor] = useState('NEGRO')
  const [estado, setEstado] = useState('USADO')
  const [precio, setPrecio] = useState('')
  const [imagenUrl, setImagenUrl] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  function cambiarCategoria(nuevaCategoria) {
    setCategoria(nuevaCategoria)
    setTalle(talleDefault(nuevaCategoria))
  }

  const esCalzado = categoria === 'ZAPATILLAS'

  async function publicar() {
    setError('')
    if (!titulo || !precio) {
      setError('Titulo y precio son obligatorios')
      return
    }
    setEnviando(true)
    try {
      await api.post('/productos', {
        titulo,
        descripcion,
        precio: Number(precio),
        categoria,
        marca,
        talle,
        color,
        estado,
        imagenUrl,
      })
      navigate('/mis-productos')
    } catch (err) {
      setError(err.message || 'No se pudo publicar el producto')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <PlantillaMarketplace>
      <main className="home publish-layout">
        <section className="upload-panel">
          <p className="home__eyebrow">Nuevo drop</p>
          <h1 className="page-title">Publicar prenda</h1>
          <p>Pega la URL de la imagen del producto.</p>

          <input
            type="url"
            placeholder="https://i.imgur.com/ejemplo.jpg"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            style={{ width: '100%', marginTop: '12px', marginBottom: '12px' }}
          />

          {imagenUrl && (
            <div className="upload-box" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
              <img
                src={imagenUrl}
                alt="preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none' }}
                onLoad={(e) => { e.target.style.display = 'block' }}
              />
            </div>
          )}
        </section>

        <section className="publish-form">
          <p className="selector__label">Descripcion del articulo</p>
          <div className="form-grid">
            <input
              placeholder="Titulo del producto"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <input
              placeholder="Precio (ARS)"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
            <select value={marca} onChange={(e) => setMarca(e.target.value)}>
              {MARCAS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={categoria} onChange={(e) => cambiarCategoria(e.target.value)}>
              {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              {COLORES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
              {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <textarea
            placeholder="Cuenta su historia, desgaste y estado actual..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          {esCalzado
            ? <SelectorTalle talleSeleccionado={talle} onSelect={setTalle} grupos={TALLES_CALZADO_GRUPOS} />
            : <SelectorTalle talleSeleccionado={talle} onSelect={setTalle} opciones={TALLES_ROPA} />
          }
          {error && <p style={{ color: '#c0392b', fontSize: '13px' }}>{error}</p>}
          <div className="detail-info__actions">
            <Boton onClick={publicar} disabled={enviando}>
              {enviando ? 'Publicando...' : 'Publicar en el archivo'}
            </Boton>
          </div>
        </section>
      </main>
    </PlantillaMarketplace>
  )
}
