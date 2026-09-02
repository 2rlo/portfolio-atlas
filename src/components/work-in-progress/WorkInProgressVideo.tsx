import { useEffect, useState } from 'react'
import workInProgressVideo from '../../assets/Work In Progress Scene.mp4'
import workInProgressPoster from '../../assets/work-in-progress-poster.png'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function getPrefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getPrefersReducedMotion,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return prefersReducedMotion
}

function WorkInProgressVideo() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="wip-scene" aria-hidden="true">
      {prefersReducedMotion ? (
        <img
          className="wip-scene__media"
          src={workInProgressPoster}
          alt=""
          decoding="async"
        />
      ) : (
        <video
          className="wip-scene__media"
          autoPlay
          muted
          playsInline
          poster={workInProgressPoster}
          preload="auto"
        >
          <source src={workInProgressVideo} type="video/mp4" />
        </video>
      )}
    </div>
  )
}

export default WorkInProgressVideo
