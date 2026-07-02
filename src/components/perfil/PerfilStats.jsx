export default function PerfilStats({ stats }) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      {stats.map(({ icon, label, value }) => (
        <div key={label} className="flex-1 bg-white border border-stone-300 px-6 flex items-center gap-4">
          <span className="text-stone-400">{icon}</span>
          <div>
            <p className="font-['Space_Mono'] text-[9px] tracking-[0.16em] uppercase text-stone-400 m-0 mb-0.5">
              {label}
            </p>
            <p className="font-['Bebas_Neue'] text-3xl leading-none text-stone-900 m-0">
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
