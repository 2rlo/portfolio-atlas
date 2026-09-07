import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { PermissionHotspotId, PermissionPageContent } from '../../content/content-types.ts'
import { ProductInspectionFrame } from '../product-case/AnnotatedProductSurface.tsx'
import useProductInspectionState from '../product-case/useProductInspectionState.ts'
import PermissionProductView from './PermissionProductView.tsx'

type Preview = { id: PermissionHotspotId; kind: 'pointer' | 'focus' | 'tap' } | null

function PermissionSurfaceWorkflow({ content }: { readonly content: PermissionPageContent }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLOListElement>(null)
  const headingRef = useRef<HTMLElement>(null)
  const readingRef = useRef({ index: 0, compact: false })
  const [compact, setCompact] = useState(false)
  const [scrollId, setScrollId] = useState(content.workflow.steps[0].hotspotId)
  const [preview, setPreview] = useState<Preview>(null)
  const inspection = useProductInspectionState<PermissionHotspotId>()
  const activeId = compact ? preview?.id ?? scrollId : inspection.activeHotspotId
  const activeWorkflowStep = content.workflow.steps.find((item) => item.hotspotId === activeId) ?? content.workflow.steps[0]
  const annotation = content.annotations.find((item) => item.id === activeId)

  useLayoutEffect(() => {
    const stage = stageRef.current
    const panel = panelRef.current
    const canvas = canvasRef.current
    if (!stage || !panel || !canvas || compact) return
    const measure = () => {
      if (stage.dataset.compact === 'true') return
      stage.style.setProperty('--permj-expanded-height', `${panel.offsetHeight}px`)
      stage.style.setProperty('--permj-canvas-width', `${canvas.offsetWidth}px`)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(panel)
    return () => observer.disconnect()
  }, [compact])

  useEffect(() => {
    let frame = 0
    let lastY = window.scrollY
    const update = () => {
      frame = 0
      const heading = headingRef.current
      const panel = panelRef.current
      const steps = stepsRef.current
      if (!heading || !panel || !steps) return
      const mobile = window.matchMedia('(max-width: 56rem)').matches
      const items = Array.from(steps.children) as HTMLLIElement[]
      const headings = items.map((item) => item.querySelector('h3')!.getBoundingClientRect())
      const anchors = headings.map((rect) => rect.bottom)
      const entryLine = window.innerHeight * (mobile ? 0.7 : 0.8)
      const reverseMargin = Math.max(80, Math.min(112, window.innerHeight * 0.1))
      const reading = readingRef.current
      if (!reading.compact && anchors[0] <= entryLine) reading.compact = true
      else if (reading.compact && anchors[0] > entryLine + reverseMargin) reading.compact = false
      setCompact(reading.compact)

      const previewBottom = compact ? panel.getBoundingClientRect().bottom : window.innerHeight * 0.4 + 44
      const readingTop = mobile ? previewBottom + 24 : 24
      const readingBottom = window.innerHeight - 32
      const readingLine = (readingTop + readingBottom) / 2
      const distances = anchors.map((anchor) => Math.abs(anchor + 32 - readingLine))
      let index = reading.index
      const readable = items.map((item, candidate) =>
        headings[candidate].top < readingBottom - 48
        && item.querySelector('.permj-rail-detail')!.getBoundingClientRect().bottom > readingTop,
      )
      let distance = readable[index] ? distances[index] : Infinity
      readable.forEach((visible, candidate) => {
        if (visible && distances[candidate] + 24 < distance) {
          index = candidate
          distance = distances[candidate]
        }
      })
      if (anchors[anchors.length - 1] < readingTop) index = anchors.length - 1
      if (!reading.compact) index = 0
      reading.index = index
      setScrollId(content.workflow.steps[index].hotspotId)
      if (Math.abs(window.scrollY - lastY) > 2) {
        setPreview((current) => current?.kind === 'tap' ? null : current)
      }
      lastY = window.scrollY
    }
    const permission = () => { if (!frame) frame = requestAnimationFrame(update) }
    permission()
    window.addEventListener('scroll', permission, { passive: true })
    window.addEventListener('resize', permission)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', permission)
      window.removeEventListener('resize', permission)
    }
  }, [compact, content.workflow.steps])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const panel = panelRef.current
    const viewport = canvas?.parentElement
    if (!canvas || !panel || !viewport || !compact) return
    const frameSurface = () => {
      const mobile = window.matchMedia('(max-width: 56rem)').matches
      const product = canvas.querySelector<HTMLElement>('.permission-product')
      if (!product) return
      const scale = mobile
        ? 1
        : Math.min(1, viewport.clientWidth / canvas.offsetWidth, (window.innerHeight - 150) / product.offsetHeight)
      panel.style.setProperty('--permj-surface-scale', String(scale))
      panel.style.setProperty('--permj-overview-height', `${product.offsetHeight * scale}px`)
      const hotspot = canvas.querySelector<HTMLElement>(`[data-hotspot="${activeId}"]`)
      let offset = 0
      if (mobile && hotspot) {
        const start = hotspot.getBoundingClientRect().top - canvas.getBoundingClientRect().top
        const centered = start + hotspot.offsetHeight / 2 - viewport.clientHeight / 2
        // A tall review panel may exceed the crop; keep its heading in view.
        offset = Math.max(0, Math.min(product.offsetHeight - viewport.clientHeight, centered, start - 12))
      }
      panel.style.setProperty('--permj-crop-offset', `${-offset}px`)
      if (hotspot) {
        const region = hotspot.getBoundingClientRect()
        const frame = viewport.getBoundingClientRect()
        panel.style.setProperty('--permj-marker-x', `${Math.max(4, Math.min(frame.width - 28, region.left - frame.left - 12))}px`)
        panel.style.setProperty('--permj-marker-y', `${Math.max(4, Math.min(frame.height - 28, region.top - frame.top - 12))}px`)
      }
    }
    frameSurface()
    const observer = new ResizeObserver(frameSurface)
    observer.observe(viewport)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [activeId, compact])

  return (
    <section className="permj-journey" id="permj-product-journey" aria-labelledby="permission-title-inspection">
      <div className="permj-journey-heading">
        <header className="qa-inspection-heading">
          <p>{content.inspection.eyebrow}</p>
          <h2 id="permission-title-inspection">{content.inspection.title}</h2>
          <span>{content.inspection.instruction}</span>
        </header>
      </div>
      <div className="permj-journey-stage" ref={stageRef} data-compact={compact} data-scroll-step={scrollId} data-active-step={activeId}>
        <div className="permj-following-surface" ref={panelRef}>
          <div className="permj-following-frame" inert={compact} aria-hidden={compact ? true : undefined}>
            <ProductInspectionFrame
              activeAnnotation={annotation}
              defaultAnnotation={content.inspection.defaultAnnotation}
              disclosure={content.meta.disclosure}
              surfaceLabel="최종 권한 계산의 공개 재구성 예시"
              evolutionTargetId="permission-evolution"
              interactionMode={compact ? 'idle' : inspection.interactionMode}
              onPointerPreviewEnd={inspection.clearPointerPreview}
              onFocusPreviewEnd={inspection.clearFocusPreview}
            >
              <div className="permj-surface-viewport">
                <div className="permj-surface-canvas" ref={canvasRef}>
                  <PermissionProductView fixture={content.product} activeId={activeId} onActivate={inspection.activateHotspot} />
                </div>
                {compact && <span className="permj-surface-marker" aria-hidden="true">{activeWorkflowStep.index}</span>}
              </div>
            </ProductInspectionFrame>
          </div>
          <div className="permj-surface-caption" id="permj-surface-caption" hidden={!compact} aria-live={preview && preview.kind !== 'pointer' ? 'polite' : 'off'} aria-atomic="true">
            <span>{activeWorkflowStep.index} / {activeWorkflowStep.label}</span>
          </div>
        </div>

        <div className="permj-reading-column">
          <header className="permj-reading-heading" ref={headingRef}>
            <p>{content.workflow.eyebrow}</p>
            <h2 id="permission-title-workflow">{content.workflow.title}</h2>
            <span>{content.workflow.introduction}</span>
          </header>
          <ol className="permj-workflow-rail" ref={stepsRef} aria-labelledby="permission-title-workflow" onKeyDown={(event) => { if (event.key === 'Escape') setPreview(null) }}>
            {content.workflow.steps.map((item) => {
              const note = content.annotations.find((entry) => entry.id === item.hotspotId)
              return (
                <li key={item.id} id={`permj-${item.id}`} data-step={item.hotspotId} data-active={activeId === item.hotspotId}>
                  <h3>
                    <button
                      type="button"
                      aria-current={activeId === item.hotspotId ? 'step' : undefined}
                      aria-controls="permj-surface-caption"
                      aria-describedby={`permj-summary-${item.id}`}
                      onPointerEnter={(event) => { if (event.pointerType !== 'touch') setPreview({ id: item.hotspotId, kind: 'pointer' }) }}
                      onPointerLeave={() => setPreview((current) => current?.kind === 'pointer' ? null : current)}
                      onFocus={(event) => { if (event.currentTarget.matches(':focus-visible')) setPreview({ id: item.hotspotId, kind: 'focus' }) }}
                      onBlur={() => setPreview(null)}
                      onClick={(event) => setPreview({ id: item.hotspotId, kind: event.detail === 0 ? 'focus' : 'tap' })}
                    >
                      <span className="permj-rail-marker">{item.index}</span>
                      <span className="permj-rail-label">{item.label}</span>
                      <span className="permj-rail-indicator" aria-hidden="true">↗</span>
                    </button>
                  </h3>
                  <p className="permj-rail-summary" id={`permj-summary-${item.id}`}>{item.summary}</p>
                  <p className="permj-rail-detail">{note?.sections.find((entry) => entry.label === 'DECISION')?.body}</p>
                </li>
              )
            })}
          </ol>
          <p className="permj-workflow-boundary">{content.workflow.boundary}</p>
        </div>
      </div>
    </section>
  )
}

export default PermissionSurfaceWorkflow
