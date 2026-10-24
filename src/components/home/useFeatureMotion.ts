import { useEffect, useState } from 'react'

const motionQuery = '(prefers-reduced-motion: reduce)'

export function useFeatureMotion() {
  const [motionEnabled, setMotionEnabled] = useState(
    () => !window.matchMedia(motionQuery).matches,
  )

  useEffect(() => {
    const preference = window.matchMedia(motionQuery)
    const followPreference = (event: MediaQueryListEvent) => {
      // The navigation changes layout. Keep keyboard focus in the same field.
      const focusedLink = document.activeElement?.closest('[data-feature-id]')
      focusedLink?.closest('.feature-navigation')
        ?.querySelector<HTMLButtonElement>('.feature-motion-toggle')?.focus()
      setMotionEnabled(!event.matches)
    }
    preference.addEventListener('change', followPreference)
    return () => preference.removeEventListener('change', followPreference)
  }, [])

  return {
    motionEnabled,
    toggleMotion: () => setMotionEnabled((enabled) => !enabled),
  }
}
