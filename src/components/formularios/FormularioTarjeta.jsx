import { useState, useEffect } from 'react'

const formatNumero = (v) =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

const formatVencimiento = (v) => {
  const solo = v.replace(/\D/g, '').slice(0, 4)
  return solo.length >= 3 ? solo.slice(0, 2) + '/' + solo.slice(2) : solo
}

function Campo({ label, error, toque, ...props }) {
  return (
    <div style={{ flex: 1 }}>
      <label style={{
        display: 'block', marginBottom: '6px',
        fontFamily: "'Space Mono', monospace", fontSize: '9px',
        letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700,
        color: toque && error ? '#c0392b' : '#1a5c3a',
      }}>
        {label}
      </label>
      <input
        {...props}
        style={{
          width: '100%', padding: '12px', boxSizing: 'border-box',
          border: `1px solid ${toque && error ? '#c0392b' : '#d6d3ce'}`,
          background: toque && error ? '#fff8f8' : 'white',
          fontFamily: "'Space Mono', monospace", fontSize: '13px', outline: 'none',
        }}
      />
      {toque && error && (
        <span style={{
          display: 'block', marginTop: '4px', color: '#c0392b',
          fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.05em',
        }}>
          {error}
        </span>
      )}
    </div>
  )
}

export default function FormularioTarjeta({ onValidar }) {
  const [numero, setNumero] = useState('')
  const [nombre, setNombre] = useState('')
  const [vencimiento, setVencimiento] = useState('')
  const [cvv, setCvv] = useState('')
  const [tocados, setTocados] = useState({})

  const tocar = (campo) => setTocados(t => ({ ...t, [campo]: true }))

  const errores = {
    numero: numero.replace(/\s/g, '').length < 16 ? 'Ingresá los 16 dígitos' : null,
    nombre: nombre.trim().length < 3 ? 'Ingresá el nombre del titular' : null,
    vencimiento: vencimiento.length < 5 ? 'Ingresá la fecha (MM/AA)' : null,
    cvv: cvv.length < 3 ? 'Ingresá el CVV' : null,
  }
  const valido = !Object.values(errores).some(Boolean)

  useEffect(() => { onValidar?.(valido) }, [valido])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Visual de la tarjeta */}
      <div style={{
        background: 'linear-gradient(135deg, #1c1c1a 60%, #1a5c3a)',
        padding: '28px 24px', color: 'white',
        fontFamily: "'Space Mono', monospace",
        minHeight: '164px', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', border: '1px solid #2a2a28',
        userSelect: 'none',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3ddc97' }}>
            Urban Re-Cycle
          </span>
          <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#d4d4d8' }}>VISA</span>
        </div>
        <div>
          <p style={{ margin: '0 0 14px', fontSize: '15px', letterSpacing: '0.22em', color: 'white' }}>
            {numero || '•••• •••• •••• ••••'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '8px', letterSpacing: '0.15em', color: '#a1a1aa', display: 'block', marginBottom: '2px' }}>TITULAR</span>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {nombre || '•••• ••••'}
              </span>
            </div>
            <div>
              <span style={{ fontSize: '8px', letterSpacing: '0.15em', color: '#a1a1aa', display: 'block', marginBottom: '2px' }}>VENCE</span>
              <span style={{ fontSize: '11px', letterSpacing: '0.1em' }}>{vencimiento || '••/••'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Campo
          label="Número de tarjeta"
          value={numero}
          onChange={e => setNumero(formatNumero(e.target.value))}
          onBlur={() => tocar('numero')}
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          inputMode="numeric"
          toque={tocados.numero}
          error={errores.numero}
        />
        <Campo
          label="Nombre del titular"
          value={nombre}
          onChange={e => setNombre(e.target.value.toUpperCase())}
          onBlur={() => tocar('nombre')}
          placeholder="TAL COMO FIGURA EN LA TARJETA"
          toque={tocados.nombre}
          error={errores.nombre}
        />
        <div style={{ display: 'flex', gap: '12px' }}>
          <Campo
            label="Vencimiento"
            value={vencimiento}
            onChange={e => setVencimiento(formatVencimiento(e.target.value))}
            onBlur={() => tocar('vencimiento')}
            placeholder="MM/AA"
            maxLength={5}
            inputMode="numeric"
            toque={tocados.vencimiento}
            error={errores.vencimiento}
          />
          <Campo
            label="CVV"
            value={cvv}
            onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
            onBlur={() => tocar('cvv')}
            placeholder="•••"
            maxLength={4}
            inputMode="numeric"
            type="password"
            toque={tocados.cvv}
            error={errores.cvv}
          />
        </div>
      </div>
    </div>
  )
}
