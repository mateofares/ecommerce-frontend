import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Boton from '../../components/Boton'
import SelectorTalle from '../../components/SelectorTalle'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import api from '../../services/api'

const CATEGORIAS = ['PANTALONES', 'CAMISETAS', 'ZAPATILLAS', 'CAMPERAS', 'ACCESORIOS', 'OTRO']
const MARCAS = ['NIKE', 'ADIDAS', 'REEBOK', 'PUMA', 'CONVERSE']
const COLORES = ['ROJO', 'VERDE', 'AZUL', 'AMARILLO', 'NEGRO', 'BLANCO']
const ESTADOS = ['NUEVO', 'USADO']

// Talles de indumentaria (letras) y de calzado (6 a 12), separados en Hombre (M) y Mujer (W).
// El value coincide con el enum Talle del backend (calzado con prefijo T: T6M, T6W, etc.).
const NUMEROS_CALZADO = [6, 7, 8, 9, 10, 11, 12]
const TALLES_ROPA = ['XS', 'S', 'M', 'L', 'XL'].map(t => ({ value: t, label: t }))
const TALLES_CALZADO_GRUPOS = [
  { titulo: 'Hombre', opciones: NUMEROS_CALZADO.map(n => ({ value: `T${n}M`, label: `${n}M` })) },
  { titulo: 'Mujer', opciones: NUMEROS_CALZADO.map(n => ({ value: `T${n}W`, label: `${n}W` })) },
]
const talleDefault = (categoria) => categoria === 'ZAPATILLAS' ? 'T8M' : 'M'

// Reescala la imagen a un maximo de 800px y la devuelve como data URL (base64) JPEG,
// para que el string que se guarda en la BD no sea gigante.
function archivoADataUrl(file, maxLado = 800, calidad = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Archivo de imagen invalido'))
      img.onload = () => {
        const escala = Math.min(1, maxLado / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * escala)
        canvas.height = Math.round(img.height * escala)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', calidad))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

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
  const [arrastrando, setArrastrando] = useState(false)
  const inputFileRef = useRef(null)

  async function procesarArchivo(file) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen')
      return
    }
    setError('')
    try {
      const dataUrl = await archivoADataUrl(file)
      setImagenUrl(dataUrl)
    } catch (err) {
      setError(err.message || 'No se pudo procesar la imagen')
    }
  }

  function onDrop(e) {
    e.preventDefault()
    setArrastrando(false)
    procesarArchivo(e.dataTransfer.files?.[0])
  }

  // Al cambiar de categoria, ajusta las opciones de talle y resetea a un valor valido.
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
      // usuarioId lo asigna el backend desde el token; no se envia.
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
          <p>Arrastra una imagen o hace click para seleccionarla.</p>

          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => procesarArchivo(e.target.files?.[0])}
          />

          {imagenUrl ? (
            <div className="upload-box" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
              <img src={imagenUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                type="button"
                onClick={() => setImagenUrl('')}
                style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', padding: '4px 8px', cursor: 'pointer', fontSize: 12 }}
              >
                Quitar
              </button>
            </div>
          ) : (
            <div
              className="upload-box"
              onClick={() => inputFileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setArrastrando(true) }}
              onDragLeave={() => setArrastrando(false)}
              onDrop={onDrop}
              style={{
                cursor: 'pointer',
                border: `2px dashed ${arrastrando ? '#1a5c3a' : '#bbb'}`,
                background: arrastrando ? 'rgba(26,92,58,0.08)' : 'transparent',
              }}
            >
              {arrastrando ? 'Solta la imagen aca' : 'Arrastra imagenes'}
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
