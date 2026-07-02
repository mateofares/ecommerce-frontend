import BarraLateral from '../components/layout/BarraLateral'
import InsigniaEstado from '../components/ui/InsigniaEstado'

export default function PlantillaAdmin({ children, eyebrow, title, text }) {
  return (
    <main className="admin-layout">
      <BarraLateral />
      <section className="admin-main">
        <div className="admin-heading">
          <div>
            <p className="home__eyebrow">{eyebrow}</p>
            <h1 className="page-title">{title}</h1>
            {text && <p>{text}</p>}
          </div>
          <InsigniaEstado status="success">Status: online</InsigniaEstado>
        </div>
        {children}
      </section>
    </main>
  )
}

