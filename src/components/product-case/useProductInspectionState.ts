import { useCallback, useEffect, useState } from 'react'
import type {
  ProductActivationIntent,
  ProductInteractionMode,
} from './AnnotatedProductSurface.tsx'

function useProductInspectionState<Id extends string>() {
  const [hoveredId, setHoveredId] = useState<Id | null>(null)
  const [focusedId, setFocusedId] = useState<Id | null>(null)
  const [pinnedId, setPinnedId] = useState<Id | null>(null)
  const [latestPreview, setLatestPreview] = useState<'pointer' | 'focus' | null>(null)

  let previewId: Id | null = null
  let previewMode: ProductInteractionMode = 'idle'

  if (latestPreview === 'pointer' && hoveredId) {
    previewId = hoveredId
    previewMode = 'pointer'
  } else if (latestPreview === 'focus' && focusedId) {
    previewId = focusedId
    previewMode = 'focus'
  } else if (focusedId) {
    previewId = focusedId
    previewMode = 'focus'
  } else if (hoveredId) {
    previewId = hoveredId
    previewMode = 'pointer'
  }

  const activeHotspotId = previewId ?? pinnedId
  let interactionMode: ProductInteractionMode = 'idle'

  if (activeHotspotId && activeHotspotId === pinnedId) {
    interactionMode = 'pinned'
  } else if (previewId) {
    interactionMode = previewMode
  }

  const activateHotspot = useCallback((id: Id, intent: ProductActivationIntent = 'press') => {
    if (intent === 'pointer') {
      setHoveredId(id)
      setLatestPreview('pointer')
      return
    }

    if (intent === 'focus') {
      setFocusedId(id)
      setLatestPreview('focus')
      return
    }

    setPinnedId((currentId) => currentId === id ? null : id)
  }, [])

  const clearPointerPreview = useCallback(() => setHoveredId(null), [])
  const clearFocusPreview = useCallback(() => setFocusedId(null), [])
  const resetInspection = useCallback(() => {
    setHoveredId(null)
    setFocusedId(null)
    setPinnedId(null)
    setLatestPreview(null)
  }, [])

  useEffect(() => {
    if (!activeHotspotId) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') resetInspection()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [activeHotspotId, resetInspection])

  return {
    activeHotspotId,
    interactionMode,
    activateHotspot,
    clearPointerPreview,
    clearFocusPreview,
  }
}

export default useProductInspectionState
