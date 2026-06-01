import { useState } from 'react'
import Boton from '../components/Boton'
import SelectorTalle from '../components/SelectorTalle'
import PlantillaMarketplace from '../plantillas/PlantillaMarketplace'

export default function PaginaVender() {
  const [talle, setTalle] = useState('M')
  const [nombre, setNombre] = useState('')
  const [marca, setMarca] = useState('')
  const [categoria, setCategoria] = useState('')
  const [precio, setPrecio] = useState('')
  const [historia, setHistoria] = useState('')

  return (
    <PlantillaMarketplace>
      <main className="home publish-layout">
        <section className="upload-panel">
          <p className="home__eyebrow">Nuevo drop</p>
          <h1 className="page-title">Subir fotos</h1>
          <p>Muestra el alma de tu prenda. Minimo 3 fotos.</p>
          <div className="upload-box">Arrastra imagenes</div>
        </section>
        <section className="publish-form">
          <p className="selector__label">Descripcion del articulo</p>
          <div className="form-grid">
            <input
              placeholder="Nombre del producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              placeholder="Marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
            <input
              placeholder="Categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
            <input
              placeholder="Precio sugerido (EUR)"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>
          <textarea
            placeholder="Cuenta su historia, desgaste y estado actual..."
            value={historia}
            onChange={(e) => setHistoria(e.target.value)}
          />
          <SelectorTalle talleSeleccionado={talle} onSelect={setTalle} />
          <div className="detail-info__actions">
            <Boton variant="ghost">Borrador guardado</Boton>
            <Boton>Publicar en el archivo</Boton>
          </div>
        </section>
      </main>
    </PlantillaMarketplace>
  )
}

