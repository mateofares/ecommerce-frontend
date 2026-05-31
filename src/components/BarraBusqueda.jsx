export default function BarraBusqueda({ value, onChange, placeholder = 'Buscar prendas...' }) {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
