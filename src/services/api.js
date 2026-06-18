// Cliente HTTP central sobre fetch.
// - Antepone la URL base (VITE_API_URL).
// - Inyecta automaticamente el header Authorization: Bearer <token>.
// - Serializa/parsea JSON y normaliza el manejo de errores del backend.
//
// El token se guarda en localStorage en un unico lugar (clave 'token').
// Ante un 401 se limpia la sesion y se emite el evento 'auth:logout',
// que AuthContext escucha para redirigir al login.

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'
const TOKEN_KEY = 'token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

async function request(method, path, body, options = {}) {
  const headers = { ...(options.headers ?? {}) }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const init = { method, headers }
  if (body !== undefined && body !== null) {
    headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(body)
  }

  const res = await fetch(`${BASE_URL}${path}`, init)

  // 204 No Content u otras respuestas sin cuerpo
  let data = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    if (res.status === 401) {
      setToken(null)
      window.dispatchEvent(new CustomEvent('auth:logout'))
    }
    const message =
      (data && (data.message || data.error)) || `Error ${res.status}`
    throw new ApiError(message, res.status, data)
  }

  return data
}

export const api = {
  get: (path, options) => request('GET', path, undefined, options),
  post: (path, body, options) => request('POST', path, body, options),
  patch: (path, body, options) => request('PATCH', path, body, options),
  put: (path, body, options) => request('PUT', path, body, options),
  delete: (path, body, options) => request('DELETE', path, body, options),
}

export default api
