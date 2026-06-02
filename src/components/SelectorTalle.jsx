const talles = ['XS', 'S', 'M', 'L', 'XL']

export default function SelectorTalle({ talleSeleccionado, onSelect }) {
  return (
    <div className="selector">
      <div className="selector__header">
        <p className="selector__label">Seleccionar talle</p>
        <button className="selector__guia" type="button">Guía de talles</button>
      </div>
      <div className="selector__options">
        {talles.map((talle) => (
          <button
            key={talle}
            className={talleSeleccionado === talle
              ? 'selector__option selector__option--active'
              : 'selector__option'}
            type="button"
            onClick={() => onSelect(talle)}
        >
            {talle}
          </button>
        ))}
      </div>
    </div>
  )
}