import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Boton from '../components/Boton'
import InsigniaEstado from '../components/InsigniaEstado'
import SelectorTalle from '../components/SelectorTalle'
import { productos } from '../datos/datosPrueba'
import PlantillaMarketplace from '../plantillas/PlantillaMarketplace'

export default function PaginaDetalleProducto() {
  const { id } = useParams()
  const producto = productos.find((item) => item.id === Number(id))

  const [talle, setTalle] = useState('M')
  const [agregado, setAgregado] = useState(false)

  const calificaciones = [
    { id: 1, usuario: 'Juan', comentario: 'Excelente producto, llegó rápido y en perfectas condiciones.', calificacion: 5 },
    { id: 2, usuario: 'María', comentario: 'La calidad es buena, pero el envío tardó un poco más de lo esperado.', calificacion: 4 },
    { id: 3, usuario: 'Carlos', comentario: 'No estoy satisfecho con el producto, esperaba algo mejor por el precio.', calificacion: 2 },
  ]

  if (!producto) {
    return <Navigate to="/productos" replace />
  }

  return (
    <PlantillaMarketplace>
      <main className="home detail-layout">
        <section className="detail-gallery">
          <div className="detail-gallery__main">{producto.etiquetaImagen}</div>
          <div className="detail-gallery__thumbs">
            <span>01</span>
            <span>02</span>
            <span>03</span>
          </div>
        </section>

        <section className="detail-info">
          <p className="home__eyebrow">{producto.categoria} // pieza verificada</p>
          <h1 className="page-title">{producto.nombre}</h1>
          <p className="detail-info__price">{producto.precio}</p>
          <p className="home__text">{producto.detalle}</p>
          <div className="badge-row">
            <InsigniaEstado status={producto.estadoInsignia}>{producto.insignia}</InsigniaEstado>
          </div>
          <SelectorTalle talleSeleccionado={talle} onSelect={setTalle} />
          <div className="detail-info__actions">
            <Boton onClick={() => setAgregado(true)}>
              {agregado ? `Talle ${talle} en bolsa` : 'Anadir a la bolsa'}
            </Boton>
            <Boton variant="ghost">Lista de deseos</Boton>
          </div>
        </section>

        <section className="qualifications">
          <h2 className="section-title">Calificaciones</h2>
          <div className="qualifications__list">
            {calificaciones.map((calificacion) => (
              <div key={calificacion.id} className="qualification-card">
                <p className="qualification-user">{calificacion.usuario}</p>
                <p className="qualification-comment">{calificacion.comentario}</p>
                <p className="qualification-rating">Calificación: {calificacion.calificacion} / 5</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </PlantillaMarketplace>
  )
}

