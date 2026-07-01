export default function ResenasRecibidas({ resenias }) {
  if (resenias.length === 0) return null

  return (
    <div className="bg-white border border-stone-300 p-7 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-stone-900 pb-2 border-b-2 border-stone-900 inline-block m-0">
          RESEÑAS RECIBIDAS
        </h2>
        <span className="font-['Space_Mono'] text-[9px] tracking-[0.2em] uppercase text-stone-400">
          {resenias.length} opiniones · promedio{' '}
          {(resenias.reduce((acc, r) => acc + r.calificacion, 0) / resenias.length).toFixed(1)} ★
        </span>
      </div>
      <div className="resenas__grid">
        {resenias.map(r => (
          <article key={r.id} className="resena-card">
            <div className="resena-card__header">
              <div className="resena-card__meta">
                <span className="resena-card__nombre">{r.compradorNombre ?? 'Usuario'}</span>
                <span className="resena-card__fecha">
                  {r.fecha ? new Date(r.fecha).toLocaleDateString('es-AR', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                </span>
              </div>
              <div className="resena-card__estrellas">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < r.calificacion ? 'resena-card__estrella--activa' : 'resena-card__estrella--vacia'}>★</span>
                ))}
              </div>
            </div>
            {r.comentarios && <p className="resena-card__comentario">{r.comentarios}</p>}
          </article>
        ))}
      </div>
    </div>
  )
}
