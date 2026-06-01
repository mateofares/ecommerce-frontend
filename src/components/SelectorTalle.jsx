const talles = ['XS', 'S', 'M', 'L', 'XL']

export default function SelectorTalle({ talleSeleccionado, onSelect }) {
  return (
    <div className="selector">
      <p className="selector__label">Seleccionar talle</p>
      <div className="selector__options">
        {talles.map((talle) => (
          <button
            key={talle}
            className={talleSeleccionado === talle ?
              'selector__option selector__option--active' : 'selector__option'}
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
