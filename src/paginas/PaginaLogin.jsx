import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PaginaLogin() {
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')

  return (
    <main className="flex min-h-screen">

      {/* ── PANEL IZQUIERDO (imagen decorativa) ── */}
      <section className="hidden md:flex w-1/2 bg-emerald-900 flex-col justify-between p-10">

        {/* Logo arriba */}
        <div>
          <h1 className="text-white font-bold text-4xl leading-tight uppercase">
            Rebel<br />Archive
          </h1>
          <span className="mt-4 inline-block bg-emerald-400 text-emerald-900 text-xs font-bold uppercase tracking-widest px-3 py-1">
            Sencillez sostenible
          </span>
        </div>

        {/* Frase abajo */}
        <p className="text-emerald-300 text-sm leading-relaxed">
          "La prenda más sostenible es la que ya existe".
          Únete al movimiento clandestino ético.
        </p>

      </section>

      {/* ── PANEL DERECHO (formulario) ─────────── */}
      <section className="flex-1 flex flex-col justify-center px-10 md:px-20 py-12 bg-white">

        {/* Tabs */}
        <div className="flex border border-gray-300 mb-8 max-w-lg">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors
              ${tab === 'login'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors
              ${tab === 'register'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
          >
            Registrarse
          </button>
        </div>

        {/* Título */}
        <h2 className="text-4xl font-black uppercase mb-2 max-w-lg">
          {tab === 'login' ? 'Bienvenido de nuevo' : 'Únete al movimiento'}
        </h2>
        <p className="text-sm text-gray-500 mb-8 max-w-lg">
          {tab === 'login'
            ? 'Ingresa tus credenciales para acceder al archivo.'
            : 'Crea tu cuenta en el archivo rebelde.'}
        </p>

        {/* Campos */}
        <div className="flex flex-col gap-5 max-w-lg">

          {/* Nombre (solo en registro) */}
          {tab === 'register' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-700">
                Nombre completo
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                className="border border-gray-300 px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-emerald-700"
              />
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-700">
              Email de usuario
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rebel@eco-couture.com"
              className="border border-gray-300 px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-emerald-700"
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-700">
                Contraseña
              </label>
              {tab === 'login' && (
                <span className="text-xs text-emerald-700 cursor-pointer hover:underline">
                  ¿Olvidaste tu acceso?
                </span>
              )}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-gray-300 px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-emerald-700"
            />
          </div>

          {/* Botón principal */}
          <Link
            to="/"
            className="bg-emerald-700 text-white text-sm font-black uppercase tracking-widest text-center py-5 hover:bg-emerald-900 transition-colors"
          >
            {tab === 'login' ? 'Identificarse y entrar' : 'Crear cuenta'}
          </Link>

          {/* Separador */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs uppercase tracking-widest text-gray-400">
              Verificación de archivo
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Nota legal */}
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            Al entrar, aceptas los{' '}
            <span className="text-emerald-700 font-bold uppercase">Términos de Rebellion</span>
            {' '}y el{' '}
            <span className="text-emerald-700 font-bold uppercase">Protocolo de Privacidad</span>.
          </p>

        </div>

        {/* Badge esquina inferior derecha */}
        <div className="flex justify-end mt-10 max-w-lg">
          <span className="bg-emerald-400 text-emerald-900 text-xs font-bold uppercase tracking-widest px-3 py-2 rotate-[-2deg] inline-block">
            Segunda vida auténtica
          </span>
        </div>

      </section>
    </main>
  )
}