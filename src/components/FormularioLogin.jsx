import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { loginUsuario } from '../redux/authSlice'

export default function FormularioLogin() {
  const [tab, setTab] = useState('login')
  const navigate = useNavigate()


  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const dispatch = useDispatch()
  const {usuario,token,rol,loading,error} = useSelector((state)=>state.auth)

  const [resultado, setResultado] = useState('')

  const handleRegistro = (e)=>{
    
  }


  const handleLogin = () => {
    dispatch(loginUsuario({ mail: loginEmail, contrasenia: loginPassword }))
    setResultado("logueado")
  }

  if (resultado === "logueado"){
    if (token) navigate(rol === 'ADMINISTRADOR' ? '/admin' : '/')
  }


  return (
    <section className="login-form">
      <form onSubmit={(e) => { e.preventDefault(); tab === 'login' ? handleLogin() : handleRegistro() }}>
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
        <button type="submit" className="button button--primary" disabled={loading}>
          {loading ? 'Ingresando...' : 'Identificarse y entrar'}
        </button>
      ) : (
        <button type="submit" className="button button--primary" disabled={loading}>
          {loading ? 'Creando...' : 'Crear cuenta'}
        </button>
      )}
      <p className="login-note">Al entrar, aceptas los terminos de rebellion y el protocolo de privacidad.</p>
      </form>
    </section>
  )
}
