import SeccionProductos from '../components/SeccionProductos'
import { productos } from '../datos/datosPrueba'
import PlantillaMarketplace from '../plantillas/PlantillaMarketplace'

export default function PaginaProductos({ filtro }) {
  const filtrados = filtro ? productos.filter((producto) => producto.categoria === filtro) : productos

  return (
    <PlantillaMarketplace>
      <main className="home page-shell">
        <p className="home__eyebrow">{filtro || 'Catalogo'} // archivo activo</p>
        <h1 className="page-title">Explorar prendas</h1>
        <SeccionProductos titulo={filtro ? `Coleccion ${filtro}` : 'Todos los productos'} items={filtrados} />
      </main>
    </PlantillaMarketplace>
  )
}

