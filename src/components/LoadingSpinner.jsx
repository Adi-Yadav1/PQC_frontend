import '../styles/components.css'

export function LoadingSpinner({ message = 'Loading...', size = 'md' }) {
  return (
    <div className="spinner-container" role="status" aria-live="polite" aria-label={message}>
      <div className={`spinner spinner-${size}`}></div>
      <p>{message}</p>
    </div>
  )
}

export default LoadingSpinner
