import { useState } from 'react'
import { Link } from 'react-router-dom'
import SelectorPago from '../components/SelectorPago'
import { carrito, resumenCheckout } from '../datos/datosPrueba'
import { FiArrowLeft, FiUser } from 'react-icons/fi'

export default function PaginaCheckout() {
  const [nombre, setNombre]   = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [cp, setCp]           = useState('')
  const [ciudad, setCiudad]   = useState('')

  return (
    <main className="min-h-screen bg-gray-100">

      {/* ── HEADER ─────────────────────────────── */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link to="/carrito" className="text-gray-600 hover:text-black">
            <FiArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-black uppercase tracking-wide">
            Finalizar compra
          </h1>
        </div>
        <FiUser size={20} className="text-gray-600" />
      </header>

      {/* ── CONTENIDO ──────────────────────────── */}
      <div className="flex gap-6 px-8 py-8 max-w-6xl mx-auto items-start">

        {/* Columna izquierda — formulario */}
        <section className="flex-1 flex flex-col gap-6">

          {/* PASO 01 — Dirección */}
          <div className="bg-white border border-gray-300 p-6">

            {/* Título del paso */}
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-emerald-400 text-black text-xs font-black px-2 py-1">
                01
              </span>
              <h2 className="text-2xl font-black uppercase tracking-wide">
                Dirección de envío
              </h2>
            </div>

            {/* Campos del formulario */}
            <div className="flex flex-col gap-4">

              {/* Fila: nombre + teléfono */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Alex Rivera"
                    className="border border-gray-300 px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-black"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+34 600 000 000"
                    className="border border-gray-300 px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Dirección de calle */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Dirección de calle
                </label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Calle de la Resistencia 42, 3B"
                  className="border border-gray-300 px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-black"
                />
              </div>

              {/* Fila: código postal + ciudad */}
              <div className="flex gap-4">
                <div className="w-40 flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Código postal
                  </label>
                  <input
                    type="text"
                    value={cp}
                    onChange={(e) => setCp(e.target.value)}
                    placeholder="28001"
                    className="border border-gray-300 px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-black"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    placeholder="Madrid"
                    className="border border-gray-300 px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* PASO 02 — Método de pago */}
          <div className="bg-white border border-gray-300 p-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-emerald-400 text-black text-xs font-black px-2 py-1">
                02
              </span>
              <h2 className="text-2xl font-black uppercase tracking-wide">
                Método de pago
              </h2>
            </div>
            <SelectorPago />
          </div>

        </section>

        {/* Columna derecha — resumen */}
        <aside className="w-80 shrink-0 bg-gray-900 text-white relative overflow-hidden">

          {/* Badge esquina */}
          <div className="absolute top-0 right-0">
            <div className="bg-emerald-400 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rotate-[0deg]"
              style={{ transform: 'rotate(0deg)', transformOrigin: 'top right' }}>
              Pre-owned
            </div>
          </div>

          <div className="p-6 flex flex-col gap-4">

            {/* Título */}
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Resumen de pedido
            </p>
            <div className="h-px bg-gray-700" />

            {/* Items del carrito */}
            <div className="flex flex-col gap-4">
              {carrito.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  {/* Imagen placeholder */}
                  <div className="w-16 h-16 bg-gray-700 shrink-0 flex items-center justify-center">
                    <span className="text-[8px] text-gray-500 uppercase tracking-wide text-center">
                      {item.etiquetaImagen}
                    </span>
                  </div>
                  {/* Info */}
                  <div>
                    <p className="text-emerald-400 text-xs font-bold uppercase tracking-wide">
                      {item.nombre}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Talla: {item.talle} | Garantía {item.garantia}
                    </p>
                    <p className="text-white text-sm font-bold mt-1">
                      {item.precio}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-gray-700" />

            {/* Líneas de precio */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>{resumenCheckout.subtotal}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest">
                <span>Envío</span>
                <span>{resumenCheckout.envio}</span>
              </div>
            </div>

            <div className="h-px bg-gray-700" />

            {/* Total */}
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-black uppercase tracking-wide">Total</span>
              <span className="text-2xl font-black">{resumenCheckout.total}</span>
            </div>

            {/* Botón confirmar */}
            <Link
              to="/confirmar-pago"
              className="block bg-emerald-400 text-black text-sm font-black uppercase tracking-widest text-center py-4 hover:bg-emerald-300 transition-colors"
            >
              Confirmar pedido
            </Link>

            {/* Nota legal */}
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Al confirmar, aceptas nuestras{' '}
              <span className="underline cursor-pointer">Políticas de Impacto Cero</span>.
            </p>

          </div>
        </aside>

      </div>
    </main>
  )
}