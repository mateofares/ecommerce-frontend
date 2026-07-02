const COLORES = ['#b45309', '#1a5c3a', '#1e3a5f', '#7c3aed', '#be185d', '#0f766e']

function iniciales(nombre) {
  if (!nombre) return '?'
  const partes = nombre.trim().split(' ')
  return partes.length >= 2
    ? (partes[0][0] + partes[1][0]).toUpperCase()
    : nombre.slice(0, 2).toUpperCase()
}

function colorAvatar(id) {
  return COLORES[(id ?? 0) % COLORES.length]
}

function formatFecha(fecha) {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-AR', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function TarjetaResena({ resena }) {
  return (
    <article className="resena-card">
      <div className="resena-card__header">
        <div className="resena-card__avatar" style={{ backgroundColor: colorAvatar(resena.compradorId) }}>
          {iniciales(resena.compradorNombre)}
        </div>
        <div className="resena-card__meta">
          <span className="resena-card__nombre">{resena.compradorNombre ?? 'Usuario'}</span>
          <span className="resena-card__fecha">{formatFecha(resena.fecha)}</span>
        </div>
        <div className="resena-card__estrellas">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < resena.calificacion ? 'resena-card__estrella--activa' : 'resena-card__estrella--vacia'}>
              ★
            </span>
          ))}
        </div>
      </div>
      {resena.productoTitulo && (
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#78716c', margin: '0 0 6px' }}>
          Compró: {resena.productoTitulo}
        </p>
      )}
      {resena.comentarios && <p className="resena-card__comentario">{resena.comentarios}</p>}
    </article>
  )
}
