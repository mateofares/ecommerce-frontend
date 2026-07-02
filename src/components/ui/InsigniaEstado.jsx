export default function InsigniaEstado({ children, status = 'neutral' }) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {children}
    </span>
  )
}
