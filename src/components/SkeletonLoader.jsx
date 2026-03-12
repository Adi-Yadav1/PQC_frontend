import '../styles/components.css'

export function SkeletonLoader({ rows = 5 }) {
  return (
    <div className="skeleton-list" role="status" aria-live="polite" aria-label="Loading content">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="skeleton-line" />
      ))}
    </div>
  )
}

export default SkeletonLoader
