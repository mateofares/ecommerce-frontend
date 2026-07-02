import { useState } from 'react'

const etiquetas = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente']

export default function SelectorEstrellas({ calificacion, onSelect }) {
  const [hover, setHover] = useState(0)

  return (
    <div>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-btn ${(hover || calificacion) >= star ? 'star-btn--active' : ''}`}
            onClick={() => onSelect(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </button>
        ))}
      </div>
      {calificacion > 0 && (
        <p className="star-label">{etiquetas[calificacion]}</p>
      )}
    </div>
  )
}
