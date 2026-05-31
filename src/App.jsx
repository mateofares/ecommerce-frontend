import { useState } from 'react'
import BarraBusqueda from './components/BarraBusqueda'
import BarraLateral from './components/BarraLateral'
import Footer from './components/Footer'
import Header from './components/Header'
import SelectorPago from './components/SelectorPago'
import SelectorTalle from './components/SelectorTalle'
import TarjetaDashboard from './components/TarjetaDashboard'
import TarjetaPedido from './components/TarjetaPedido'
import TarjetaProducto from './components/TarjetaProducto'

const productos = [
  {
    id: 1,
    nombre: 'Chloroform Sneakers',
    precio: 'EUR 240',
    descripcion: 'Eco-leather y caucho reciclado.',
    insignia: 'Sostenible',
    estadoInsignia: 'success',
    etiquetaImagen: 'Calzado',
  },
  {
    id: 2,
    nombre: 'Manifesto Tee V2',
    precio: 'EUR 85',
    descripcion: 'Algodon organico deadstock.',
    insignia: 'Hallazgo raro',
    estadoInsignia: 'warning',
    etiquetaImagen: 'Remera',
  },
  {
    id: 3,
    nombre: 'Tectonic Shell',
    precio: 'EUR 310',
    descripcion: 'Nylon reciclado con acabado urbano.',
    insignia: 'Poco stock',
    estadoInsignia: 'danger',
    etiquetaImagen: 'Abrigo',
  },
]

const pedidos = [
  {
    codigo: '#UR-98210',
    producto: 'Chaqueta Denim Re-Cycled',
    fecha: '14 Oct, 2023',
    talle: 'Talle L',
    total: 'EUR 124.00',
    estado: 'Entregado',
    tipoEstado: 'success',
    accion: 'Calificar',
  },
  {
    codigo: '#UR-97554',
    producto: 'Pantalon Cargo Canvas',
    fecha: '08 Oct, 2023',
    talle: 'Talle M',
    total: 'EUR 85.50',
    estado: 'Enviado',
    tipoEstado: 'warning',
    accion: 'Rastrear',
  },
]

export default function App() {
  const [busqueda, setBusqueda] = useState('')

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="app">
      <Header />

      <main className="home">
        <p className="home__eyebrow">Nueva tanda // 04</p>
        <h1 className="home__title">Coleccion consciente</h1>
        <p className="home__text">
          Esta pantalla muestra ejemplos de componentes reutilizables para empezar a armar el e-commerce.
        </p>

        <section className="component-section">
          <div className="component-section__header">
            <h2>Marketplace</h2>
            <BarraBusqueda value={busqueda} onChange={setBusqueda} />
          </div>

          <div className="product-grid">
            {productosFiltrados.map((producto) => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))}
          </div>
        </section>

        <section className="component-section">
          <h2>Componentes con estado</h2>
          <div className="demo-grid">
            <SelectorTalle />
            <SelectorPago />
          </div>
        </section>

        <section className="component-section">
          <h2>Historial de compras</h2>
          <div className="order-list">
            {pedidos.map((pedido) => (
              <TarjetaPedido key={pedido.codigo} pedido={pedido} />
            ))}
          </div>
        </section>

        <section className="component-section">
          <h2>Panel admin</h2>
          <div className="admin-preview">
            <BarraLateral />
            <div className="admin-preview__content">
              <TarjetaDashboard titulo="Ordenes pendientes" valor="842" detalle="12 urgentes hoy" />
              <TarjetaDashboard titulo="Usuarios nuevos" valor="40" detalle="Crecimiento del 8%" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
