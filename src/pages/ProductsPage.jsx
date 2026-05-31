import ProductSection from '../components/ProductSection'
import { productos } from '../data/mockData'
import MarketplaceLayout from '../layouts/MarketplaceLayout'

export default function ProductsPage({ filtro }) {
  const filtrados = filtro ? productos.filter((producto) => producto.categoria === filtro) : productos

  return (
    <MarketplaceLayout>
      <main className="home page-shell">
        <p className="home__eyebrow">{filtro || 'Catalogo'} // archivo activo</p>
        <h1 className="page-title">Explorar prendas</h1>
        <ProductSection titulo={filtro ? `Coleccion ${filtro}` : 'Todos los productos'} items={filtrados} />
      </main>
    </MarketplaceLayout>
  )
}
