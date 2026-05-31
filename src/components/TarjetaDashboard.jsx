export default function TarjetaDashboard({ titulo, valor, detalle }) {
  return (
    <article className="dashboard-card">
      <p className="dashboard-card__title">{titulo}</p>
      <strong className="dashboard-card__value">{valor}</strong>
      <span className="dashboard-card__detail">{detalle}</span>
    </article>
  )
}
