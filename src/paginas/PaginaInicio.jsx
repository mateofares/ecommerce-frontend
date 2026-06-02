import { Link } from 'react-router-dom'
import SeccionProductos from '../components/SeccionProductos'
import { productos } from '../datos/datosPrueba'
import PlantillaMarketplace from '../plantillas/PlantillaMarketplace'
import '../styles/home.css'


export default function PaginaInicio() {
  return (
    <PlantillaMarketplace>
      <main className="home">
        <section className="hero">
          <div className="hero__copy">
            <p className="home__eyebrow">Nuevo drop // segunda vida autentica</p>
            <h1 className="home__title">Rebel Archive</h1>
            <p className="home__text">
              Marketplace circular de moda urbana: prendas verificadas, drops curados y piezas con historia real.
            </p>
            <div className="hero__actions">
              <Link to="/productos" className="button button--primary">Explorar catalogo</Link>
              <Link to="/vender" className="button button--ghost">Publicar articulo</Link>
            </div>
          </div>
          <div className="hero__visual">
            <span>Urban Re-Cycle</span>
            <strong>Drop 04</strong>
          </div>
        </section>

        <section className="category-strip" aria-label="Categorias">
          {['Denim', 'Calzado', 'Abrigos', 'Grafica'].map((categoria) => (
            <Link key={categoria} to="/productos" className="category-pill">
              <span>{categoria.slice(0, 2)}</span>
              {categoria}
            </Link>
          ))}
        </section>

        <section className="curated-banner">
          <p>Seleccion curada</p>
          <h2>Prendas con trazabilidad, reparacion y garantia de archivo.</h2>
        </section>

        <SeccionProductos titulo="Nucleo del archivo" items={productos} />
      </main>
    </PlantillaMarketplace>
  )
}

