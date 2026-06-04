import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PaginaLogin() {
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')

  return (
    <main className="login-page">
      <section className="login-art">
        <p>Segunda vida autentica</p>
        <h1>Rebel Archive</h1>
      </section>
      <section className="login-form">
        <div className="login-tabs">
          <button
            type="button"
            className={tab === 'login' ? 'login-tabs__active' : ''}
            onClick={() => setTab('login')}
          >
            Iniciar sesion
          </button>
          <button
            type="button"
            className={tab === 'register' ? 'login-tabs__active' : ''}
            onClick={() => setTab('register')}
          >
            Registrarse
          </button>
        </div>

        {tab === 'login' ? (
          <>
            <p className="home__eyebrow">Bienvenido de nuevo</p>
            <h2>Ingresa tus credenciales para acceder al archivo.</h2>
            <label>
              Email de usuario
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rebel@eco-couture.com"
              />
            </label>
            <label>
              Contrasena
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </label>
          </>
        ) : (
          <>
            <p className="home__eyebrow">Unete al movimiento</p>
            <h2>Crea tu cuenta en el archivo rebelde.</h2>
            <label>
              Nombre completo
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
              />
            </label>
            <label>
              Email de usuario
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rebel@eco-couture.com"
              />
            </label>
            <label>
              Contrasena
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </label>
          </>
        )}

        <Link to="/" className="button button--primary">
          {tab === 'login' ? 'Identificarse y entrar' : 'Crear cuenta'}
        </Link>
        <p className="login-note">Al entrar, aceptas los terminos de rebellion y el protocolo de privacidad.</p>
      </section>
    </main>
  )
}

