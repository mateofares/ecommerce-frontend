import { Link } from 'react-router-dom'
import SeccionProductos from '../../components/SeccionProductos'
import PlantillaMarketplace from '../../layouts/PlantillaMarketplace'
import '../../styles/home.css'
import { useEffect, useState } from 'react'

const CATEGORIAS = [
  {
    valor: 'PANTALONES',
    label: 'Pantalones',
    foto: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop&auto=format',
  },
  {
    valor: 'CAMISETAS',
    label: 'Camisetas',
    foto: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&auto=format',
  },
  {
    valor: 'ZAPATILLAS',
    label: 'Zapatillas',
    foto: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&auto=format',
  },
  {
    valor: 'CAMPERAS',
    label: 'Camperas',
    foto: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop&auto=format',
  },
  {
    valor: 'ACCESORIOS',
    label: 'Accesorios',
    foto: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&h=300&fit=crop&auto=format',
  },
  {
    valor: 'OTRO',
    label: 'Otros',
    foto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&auto=format',
  },
]

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
          <div className="hero__visual" />
        </section>

        <section className="category-strip" aria-label="Categorias">
          {CATEGORIAS.map((cat) => (
            <Link key={cat.valor} to={`/productos?categoria=${cat.valor}`} className="category-pill">
              <img src={cat.foto} alt={cat.label} />
              {cat.label}
            </Link>
          ))}
        </section>

        <section className="curated-banner">
          <p>Seleccion curada</p>
          <h2>Prendas con trazabilidad, reparacion y garantia de archivo.</h2>
        </section>

        <SeccionProductos titulo="Nucleo del archivo"/>
      </main>
    </PlantillaMarketplace>
  )
}
  
