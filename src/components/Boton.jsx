export default function Boton({ children, variant = 'primary', type = 'button', onClick }) {
  return (
    <button className={`button button--${variant}`} type={type} onClick={onClick}>
      {children}
    </button>
  )
}
