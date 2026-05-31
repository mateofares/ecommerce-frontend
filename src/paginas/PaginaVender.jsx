import Boton from '../components/Boton'
import SelectorTalle from '../components/SelectorTalle'
import PlantillaMarketplace from '../plantillas/PlantillaMarketplace'

export default function PaginaVender() {
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
            <input placeholder="Nombre del producto" />
            <input placeholder="Marca" />
            <input placeholder="Categoria" />
            <input placeholder="Precio sugerido (EUR)" />
          </div>
          <textarea placeholder="Cuenta su historia, desgaste y estado actual..." />
          <SelectorTalle />
          <div className="detail-info__actions">
            <Boton variant="ghost">Borrador guardado</Boton>
            <Boton>Publicar en el archivo</Boton>
          </div>
        </section>
      </main>
    </PlantillaMarketplace>
  )
}

