export default function TarjetaResena({ resena }) {
  return (
    <article className="resena-card">
      <div className="resena-card__header">
        <div className="resena-card__avatar" style={{ backgroundColor: resena.color }}>
          {resena.iniciales}
        </div>
        <div className="resena-card__meta">
          <span className="resena-card__nombre">{resena.usuario}</span>
          <span className="resena-card__fecha">{resena.fecha}</span>
        </div>
        <div className="resena-card__estrellas">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < resena.estrellas ? 'resena-card__estrella--activa' : 'resena-card__estrella--vacia'}>
              ★
            </span>
          ))}
        </div>
      </div>
      <p className="resena-card__comentario">{resena.comentario}</p>
    </article>
  )
}
