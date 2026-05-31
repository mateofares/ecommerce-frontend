import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__grid">
          <section className="footer__brand-section">
            <h2 className="footer__title">Rebel Archive</h2>
            <p className="footer__text">
              Sosteniendo el underground a traves de la costura de segunda vida.
              Creemos en el valor de la reparacion y la belleza de las narrativas
              recicladas.
            </p>

            <div className="footer__socials">
              <a href="#" className="footer__social-link">IG</a>
              <a href="#" className="footer__social-link">TW</a>
              <a href="#" className="footer__social-link">TT</a>
            </div>
          </section>

          <section>
            <h3 className="footer__subtitle">El movimiento</h3>
            <ul className="footer__list">
              <li><Link to="/sostenibilidad">Reporte de sostenibilidad</Link></li>
              <li><Link to="/guias">Guias de comunidad</Link></li>
              <li><Link to="/reparacion">Programa de reparacion</Link></li>
            </ul>
          </section>

          <section>
            <h3 className="footer__subtitle">Colecciones</h3>
            <ul className="footer__list">
              <li><Link to="/lanzamientos">Calendario de lanzamientos</Link></li>
              <li><Link to="/archivo">Nucleo del archivo</Link></li>
              <li><Link to="/giftcards">Tarjetas de regalo</Link></li>
            </ul>
          </section>
        </div>

        <div className="footer__bottom">
          <p>(c) {new Date().getFullYear()} Urban Re-Cycle. Todos los derechos reservados.</p>
          <div className="footer__legal">
            <Link to="/privacidad">Privacidad</Link>
            <Link to="/terminos">Terminos y condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
