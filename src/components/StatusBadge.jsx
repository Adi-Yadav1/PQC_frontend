import '../styles/components.css'

export function StatusBadge({ status, text }) {
  const statusClass = status === 'valid' ? 'badge-success' : 
                     status === 'invalid' ? 'badge-error' :
                     status === 'pending' ? 'badge-warning' : 'badge-default'
  
  return (
    <span className={`badge ${statusClass}`}>
      {text || status}
    </span>
  )
}

export default StatusBadge
