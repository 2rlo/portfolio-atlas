import { useEffect, useState } from 'react'

const sessionKey = 'atlas:toss-guide-seen'
const entranceDuration = 650

export type EntryGuidePhase = 'idle' | 'entrance' | 'recommendation'

function initialPhase(enabled: boolean): EntryGuidePhase {
  if (!enabled) return 'idle'

  try {
    if (window.sessionStorage.getItem(sessionKey) === 'true') return 'idle'
  } catch {
    // If session persistence is unavailable, keep ordinary navigation.
    return 'idle'
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'recommendation'
    : 'entrance'
}

export function useTossEntryGuide(enabled: boolean): {
  phase: EntryGuidePhase
  dismiss: () => void
} {
  // Reading is pure: StrictMode can call the initializer twice.
  const [phase, setPhase] = useState(() => initialPhase(enabled))

  useEffect(() => {
    if (!enabled || phase === 'idle') return

    try {
      // Claim the session before starting the sequence, not on completion.
      window.sessionStorage.setItem(sessionKey, 'true')
    } catch {
      setPhase('idle')
      return
    }

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const showRecommendation = () => setPhase('recommendation')
    const onMotionChange = () => {
      if (motionPreference.matches) showRecommendation()
    }
    const dismiss = () => setPhase('idle')
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) dismiss()
    }
    const timer = phase === 'entrance'
      ? window.setTimeout(showRecommendation, entranceDuration)
      : undefined

    motionPreference.addEventListener('change', onMotionChange)
    window.addEventListener('pagehide', dismiss)
    window.addEventListener('pageshow', onPageShow)
    return () => {
      window.clearTimeout(timer)
      motionPreference.removeEventListener('change', onMotionChange)
      window.removeEventListener('pagehide', dismiss)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [enabled, phase])

  return {
    phase: enabled ? phase : 'idle',
    dismiss: () => setPhase('idle'),
  }
}
