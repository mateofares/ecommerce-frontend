import { createContext, useContext, useEffect, useState } from 'react'
import api, { setToken, getToken } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)

  // Rehidratacion de sesion al montar / recargar (F5)
  useEffect(() => {
    let activo = true
    async function rehidratar() {
      if (!getToken()) {
        setLoading(false)
        return
      }
      try {
        const me = await api.get('/api/auth/me')
        if (activo) setUsuario(me)
      } catch {
        setToken(null)
        if (activo) setUsuario(null)
      } finally {
        if (activo) setLoading(false)
      }
    }
    rehidratar()
    return () => { activo = false }
  }, [])

  // Logout global disparado por el cliente HTTP ante un 401
  useEffect(() => {
    const handler = () => setUsuario(null)
    window.addEventListener('auth:logout', handler)
    return () => window.removeEventListener('auth:logout', handler)
  }, [])

  async function login(mail, contrasenia) {
    const data = await api.post('/api/auth/authenticate', { mail, contrasenia })
    setToken(data.access_token)
    const me = await api.get('/api/auth/me')
    setUsuario(me)
    return me
  }

  async function register({ nombre, apellido, mail, contrasenia, userRol = 'USUARIO' }) {
    const data = await api.post('/api/auth/register', { nombre, apellido, mail, contrasenia, userRol })
    setToken(data.access_token)
    const me = await api.get('/api/auth/me')
    setUsuario(me)
    return me
  }

  function logout() {
    setToken(null)
    setUsuario(null)
  }

  const value = {
    usuario,
    rol: usuario?.userRol ?? null,
    isAuthenticated: !!usuario,
    isAdmin: usuario?.userRol === 'ADMINISTRADOR',
    loading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
