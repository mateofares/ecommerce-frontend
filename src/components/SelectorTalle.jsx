const OPCIONES_DEFAULT = [
  { value: 'XS', label: 'XS' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' },
]

// Acepta:
//  - opciones: lista plana [{value,label}] (default), o
//  - grupos: [{titulo, opciones:[{value,label}]}] para renderizar varias filas (ej: Hombre / Mujer)
export default function SelectorTalle({ talleSeleccionado, onSelect, opciones = OPCIONES_DEFAULT, grupos = null }) {
  function boton({ value, label }) {
    return (
      <button
        key={value}
        className={talleSeleccionado === value
          ? 'selector__option selector__option--active'
          : 'selector__option'}
        type="button"
        onClick={() => onSelect(value)}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="selector">
      <div className="selector__header">
        <p className="selector__label">Seleccionar talle</p>
        <button className="selector__guia" type="button">Guía de talles</button>
      </div>

      {grupos ? (
        grupos.map((g) => (
          <div key={g.titulo} style={{ marginBottom: '10px' }}>
            <p className="selector__label" style={{ fontSize: '11px', opacity: 0.7, marginBottom: '4px' }}>{g.titulo}</p>
            <div className="selector__options">
              {g.opciones.map(boton)}
            </div>
          </div>
        ))
      ) : (
        <div className="selector__options">
          {opciones.map(boton)}
        </div>
      )}
    </div>
  )
}
