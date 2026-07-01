export default function PerfilCard({ usuario, prendasVendidas }) {
  const iniciales = `${usuario?.nombre?.[0] ?? ''}${usuario?.apellido?.[0] ?? ''}`.toUpperCase() || 'US'
  const nombreCompleto = usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Usuario'

  return (
    <div className="w-56 shrink-0 bg-white border border-stone-300 p-5 flex flex-col gap-4">
      <div className="w-full aspect-square bg-stone-800 flex items-center justify-content-center overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center">
          <span className="font-['Bebas_Neue'] text-5xl text-stone-500 select-none">{iniciales}</span>
        </div>
      </div>

      <div>
        <h1 className="font-['Bebas_Neue'] text-2xl leading-tight text-stone-900 m-0">
          {nombreCompleto}
        </h1>
        <p className="font-['Space_Mono'] text-[9px] tracking-[0.2em] uppercase text-stone-400 mt-1 m-0">
          {usuario?.mail}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-['Space_Mono'] text-[8px] tracking-[0.14em] uppercase font-bold bg-[#1a5c3a] text-[#c8e6d0] px-3 py-1 w-fit">
          Eco-Warrior
        </span>
        {prendasVendidas > 10 && (
          <span className="font-['Space_Mono'] text-[8px] tracking-[0.14em] uppercase font-bold border border-[#1a5c3a] text-[#1a5c3a] px-3 py-1 w-fit">
            Pro Seller
          </span>
        )}
      </div>
    </div>
  )
}
