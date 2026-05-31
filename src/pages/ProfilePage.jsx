import { Link } from 'react-router-dom'
import MarketplaceLayout from '../layouts/MarketplaceLayout'

export default function ProfilePage() {
  return (
    <MarketplaceLayout>
      <main className="home profile-layout">
        <section className="profile-card">
          <p className="home__eyebrow">Mi perfil</p>
          <h1>Alex Rebel</h1>
          <span>Miembro desde 2022</span>
          <div className="profile-stats">
            <strong>EUR 1.420<span>Ventas totales</span></strong>
            <strong>42<span>Prendas recicladas</span></strong>
            <strong>4.9/5<span>Calificacion</span></strong>
          </div>
        </section>
        <section>
          <h2 className="section-title">Actividad reciente</h2>
          <div className="activity-feed">
            <p>Vendido: Bomber Jacket 90s <span>Hace 2 horas +EUR 85</span></p>
            <p>Comprado: Industrial Kicks Red <span>Ayer -EUR 120</span></p>
            <p>Nuevo listado: Pantalon Cargo <span>Hace 3 dias</span></p>
          </div>
          <Link to="/compras" className="button button--primary">Ver mis compras</Link>
        </section>
      </main>
    </MarketplaceLayout>
  )
}
