import { Link } from 'react-router-dom'

export default function PaginaLogin() {
  return (
    <main className="login-page">
      <section className="login-art">
        <p>Segunda vida autentica</p>
        <h1>Rebel Archive</h1>
      </section>
      <section className="login-form">
        <div className="login-tabs">
          <button type="button" className="login-tabs__active">Iniciar sesion</button>
          <button type="button">Registrarse</button>
        </div>
        <p className="home__eyebrow">Bienvenido de nuevo</p>
        <h2>Ingresa tus credenciales para acceder al archivo.</h2>
        <label>Email de usuario<input defaultValue="rebel@eco-couture.com" /></label>
        <label>Contrasena<input defaultValue="********" type="password" /></label>
        <Link to="/" className="button button--primary">Identificarse y entrar</Link>
        <p className="login-note">Al entrar, aceptas los terminos de rebellion y el protocolo de privacidad.</p>
      </section>
    </main>
  )
}

