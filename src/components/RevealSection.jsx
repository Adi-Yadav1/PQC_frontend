import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export function RevealSection({ children, className = '', ...rest }) {
  const { ref, isVisible } = useRevealOnScroll()

  return (
    <section
      ref={ref}
      {...rest}
      className={`reveal-section ${isVisible ? 'visible' : ''} ${className}`.trim()}
    >
      {children}
    </section>
  )
}

export default RevealSection
