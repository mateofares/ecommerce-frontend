export default function ActividadReciente({ actividad, loading }) {
  return (
    <div className="bg-white border border-stone-300 p-7">
      <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-stone-900 pb-2 border-b-2 border-stone-900 inline-block m-0 mb-4">
        ACTIVIDAD RECIENTE
      </h2>
      <div className="flex flex-col divide-y divide-stone-100">
        {loading ? (
          [1,2,3].map(i => (
            <div key={i} className="flex items-center gap-4 py-4 animate-pulse">
              <div className="w-14 h-14 shrink-0 bg-stone-200" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-2.5 bg-stone-200 rounded w-3/4" />
                <div className="h-2 bg-stone-100 rounded w-1/3" />
              </div>
              <div className="h-3 bg-stone-200 rounded w-12" />
            </div>
          ))
        ) : actividad.length === 0 ? (
          <p className="font-['Space_Mono'] text-[10px] text-stone-400" style={{ padding: '16px 0' }}>Sin actividad reciente.</p>
        ) : actividad.map(({ id, titulo, sub, monto, color, bg }) => (
          <div key={id} className="flex items-center gap-4 py-4">
            <div className={`w-14 h-14 shrink-0 ${bg} flex items-center justify-center`}>
              <span className="font-['Space_Mono'] text-[7px] text-white/30 uppercase tracking-wider text-center px-1">
                IMG
              </span>
            </div>
            <div className="flex-1">
              <p className="font-['Space_Mono'] text-[10px] tracking-[0.1em] uppercase font-bold text-stone-800 m-0">
                {titulo}
              </p>
              <p className="font-['Space_Mono'] text-[9px] italic text-stone-400 mt-0.5 m-0">
                {sub}
              </p>
            </div>
            <span className={`font-['Space_Mono'] text-sm font-bold ${color}`}>
              {monto}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
