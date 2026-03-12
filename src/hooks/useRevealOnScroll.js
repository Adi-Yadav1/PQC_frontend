import { useEffect, useRef, useState } from 'react'

export function useRevealOnScroll(threshold = 0.18) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const target = ref.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

export default useRevealOnScroll
