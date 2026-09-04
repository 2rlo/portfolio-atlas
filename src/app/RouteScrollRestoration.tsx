import { useLayoutEffect, useRef } from 'react'
import { ScrollRestoration, useLocation, useNavigationType } from 'react-router'

function RouteScrollRestoration() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const initialLocationKey = useRef(location.key)

  useLayoutEffect(() => {
    if (
      location.key === initialLocationKey.current
      || navigationType === 'POP'
      || location.hash
    ) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      // Keep smooth scrolling for in-page anchors, not full route changes.
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [location.hash, location.key, navigationType])

  return <ScrollRestoration />
}

export default RouteScrollRestoration
