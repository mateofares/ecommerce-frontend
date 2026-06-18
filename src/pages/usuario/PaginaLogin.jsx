import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function PaginaLogin() {
  const [tab, setTab] = useState('login')
  const navigate = useNavigate()
  const { login, register } = useAuth()

  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  // Login
  const [loginEmail, setLoginEmail]       = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Registro
  const [nombre, setNombre]       = useState('')
  const [apellido, setApellido]   = useState('')
  const [regEmail, setRegEmail]   = useState('')
  const [regPassword, setRegPassword] = useState('')

  async function handleRegistro() {
    setError('')
    setEnviando(true)
    try {
      await register({ nombre, apellido, mail: regEmail, contrasenia: regPassword, userRol: 'USUARIO' })
      navigate('/')
    } catch (err) {
      setError(err.message || 'No se pudo registrar')
    } finally {
      setEnviando(false)
    }
  }

  async function handleLogin() {
    setError('')
    setEnviando(true)
    try {
      await login(loginEmail, loginPassword)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Credenciales invalidas')
    } finally {
      setEnviando(false)
    }
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

        {error && (
          <p className="login-error" style={{ color: '#c0392b', fontSize: '13px', marginTop: '8px' }}>{error}</p>
        )}

        {tab === 'login' ? (
          <button type="button" className="button button--primary" onClick={handleLogin} disabled={enviando}>
            {enviando ? 'Ingresando...' : 'Identificarse y entrar'}
          </button>
        ) : (
          <button type="button" className="button button--primary" onClick={handleRegistro} disabled={enviando}>
            {enviando ? 'Creando...' : 'Crear cuenta'}
          </button>
        )}
        <p className="login-note">Al entrar, aceptas los terminos de rebellion y el protocolo de privacidad.</p>
      </section>
    </main>
  )
}
