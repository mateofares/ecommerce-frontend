import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function PaginaLogin() {
  const [tab, setTab] = useState('login')
  const navigate = useNavigate()

  // Login
  const [loginEmail, setLoginEmail]       = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Registro
  const [nombre, setNombre]       = useState('')
  const [apellido, setApellido]   = useState('')
  const [regEmail, setRegEmail]   = useState('')
  const [regPassword, setRegPassword] = useState('')

  function handleRegistro() {
    fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombre, apellido: apellido, mail: regEmail, contrasenia: regPassword, userRol: 'USUARIO' }),
    })
    .then(res => res.json())
    .then(data => { console.log(data); navigate('/') })
    .catch((error) => { console.log('error:' + error) })
  }

   function handleLogin() {
    fetch('http://localhost:8080/api/auth/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail: loginEmail, contrasenia: loginPassword }),
    })
    .then(res => res.json())
    .then(data => { console.log(data); navigate('/') })
    .catch((error) => { console.log('error:' + error) })
  }

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
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="rebel@eco-couture.com"
              />
            </label>
            <label>
              Contrasena
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
              />
            </label>
          </>
        ) : (
          <>
            <p className="home__eyebrow">Unete al movimiento</p>
            <h2>Crea tu cuenta en el archivo rebelde.</h2>
            <label>
              Nombre
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
              />
            </label>
            <label>
              Apellido
              <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Tu apellido"
              />
            </label>
            <label>
              Email de usuario
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="rebel@eco-couture.com"
              />
            </label>
            <label>
              Contrasena
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••"
              />
            </label>
          </>
        )}

        {tab === 'login' ? (
          <button type="button" className="button button--primary" onClick={handleLogin}>
            Identificarse y entrar
          </button>
        ) : (
          <button type="button" className="button button--primary" onClick={handleRegistro}>
            Crear cuenta
          </button>
        )}
        <p className="login-note">Al entrar, aceptas los terminos de rebellion y el protocolo de privacidad.</p>
      </section>
    </main>
  )
}
