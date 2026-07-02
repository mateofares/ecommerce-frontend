import { useState } from 'react'

const metodosPago = ['Tarjeta', 'Transferencia', 'Mercado Pago']

export default function SelectorPago() {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState('Tarjeta')

  return (
    <div className="selector">
      <p className="selector__label">Metodo de pago</p>
      <div className="selector__options selector__options--wide">
        {metodosPago.map((metodo) => (
          <button
            key={metodo}
            className={metodoSeleccionado === metodo ? 'selector__option selector__option--active' : 'selector__option'}
            type="button"
            onClick={() => setMetodoSeleccionado(metodo)}
          >
            {metodo}
          </button>
        ))}
      </div>
    </div>
  )
}
