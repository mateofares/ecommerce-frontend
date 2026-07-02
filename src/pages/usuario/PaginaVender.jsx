import { useState } from 'react'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import FormularioProducto from '../../components/FormularioProducto'

export default function PaginaVender() {
  const [imagenUrl, setImagenUrl] = useState('')

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

        <FormularioProducto imagenUrl={imagenUrl} />
      </main>
    </PlantillaMarketplace>
  )
}
