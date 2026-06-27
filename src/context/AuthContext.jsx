import { createContext, useContext, useEffect, useState } from 'react'
import api, { setToken, getToken } from '../services/api'

// Crea el "cajón global" donde se guarda la sesión.
// Cualquier componente de la app puede leer de acá con useAuth().
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // usuario: los datos del que está logueado (nombre, rol, id, etc.) o null si no hay sesión.
  const [usuario, setUsuario] = useState(null)

  // loading: true mientras no sabemos si hay sesión activa (evita mostrar pantallas incorrectas al arrancar).
  const [loading, setLoading] = useState(true)

  // Al montar la app (o recargar con F5): si hay un token guardado en localStorage,
  // le pregunta al backend quién es ese usuario con GET /api/auth/me.
  // Si el token venció o es inválido, lo borra y deja usuario = null.
  // Sin esto, al recargar la página siempre habría que volver a loguearse.
  useEffect(() => {
    let activo = true
    async function rehidratar() {
      if (!getToken()) {
        // No hay token guardado → no hay sesión, listo.
        setLoading(false)
        return
      }
      try {
        const me = await api.get('/api/auth/me')
        if (activo) setUsuario(me)
      } catch {
        // El token existe pero el backend lo rechazó → se borra.
        setToken(null)
        if (activo) setUsuario(null)
      } finally {
        if (activo) setLoading(false)
      }
    }
    rehidratar()
    // Cleanup: si el componente se desmonta antes de que termine el fetch,
    // no actualizamos estado en un componente que ya no existe.
    return () => { activo = false }
  }, [])

  // Escucha el evento 'auth:logout' que dispara api.js cuando recibe un 401.
  // Un 401 significa que el token venció en medio de la sesión.
  // Al recibirlo, limpiamos el usuario → la app reacciona y manda al login.
  useEffect(() => {
    const handler = () => setUsuario(null)
    window.addEventListener('auth:logout', handler)
    return () => window.removeEventListener('auth:logout', handler)
  }, [])

  // Llama al backend para autenticar, guarda el token recibido,
  // y luego trae los datos completos del usuario con /me.
  async function login(mail, contrasenia) {
    const data = await api.post('/api/auth/authenticate', { mail, contrasenia })
    setToken(data.access_token)
    const me = await api.get('/api/auth/me')
    setUsuario(me)
    return me
  }

  // Igual que login pero primero crea la cuenta en el backend.
  async function register({ nombre, apellido, mail, contrasenia, userRol = 'USUARIO' }) {
    const data = await api.post('/api/auth/register', { nombre, apellido, mail, contrasenia, userRol })
    setToken(data.access_token)
    const me = await api.get('/api/auth/me')
    setUsuario(me)
    return me
  }

  // Borra el token de localStorage y limpia el usuario del estado.
  // La app detecta que usuario = null y redirige al login.
  function logout() {
    setToken(null)
    setUsuario(null)
  }

  // Todo lo que los componentes pueden leer/usar desde useAuth().
  const value = {
    usuario,                                    // objeto con los datos del usuario logueado
    rol: usuario?.userRol ?? null,              // 'USUARIO' o 'ADMINISTRADOR' (o null)
    isAuthenticated: !!usuario,                 // true si hay alguien logueado
    isAdmin: usuario?.userRol === 'ADMINISTRADOR',
    loading,                                    // true mientras verifica la sesión al arrancar
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook que usan los componentes para acceder a la sesión.
// Si se usa fuera de <AuthProvider> explota con un mensaje claro.
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
