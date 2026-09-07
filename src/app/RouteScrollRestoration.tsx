import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router'

function RouteScrollRestoration() {
  const { hash, pathname } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      return
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [hash, pathname])

  return null
}

export default RouteScrollRestoration
