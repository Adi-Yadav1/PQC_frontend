import '../styles/components.css'

export function Card({ children, className = '', title = '' }) {
  return (
    <div className={`card ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      {children}
    </div>
  )
}

export default Card
