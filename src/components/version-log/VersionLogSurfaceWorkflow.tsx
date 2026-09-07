import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { VersionLogHotspotId, VersionLogPageContent } from '../../content/content-types.ts'
import { ProductInspectionFrame } from '../product-case/AnnotatedProductSurface.tsx'
import useProductInspectionState from '../product-case/useProductInspectionState.ts'
import VersionLogProductView from './VersionLogProductView.tsx'

type StepId = VersionLogPageContent['workflow']['steps'][number]['id']
type Preview = { id: StepId; kind: 'pointer' | 'focus' | 'tap' } | null

function VersionLogSurfaceWorkflow({ content }: { readonly content: VersionLogPageContent }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLOListElement>(null)
  const headingRef = useRef<HTMLElement>(null)
  const readingRef = useRef({ index: 0, compact: false })
  const [compact, setCompact] = useState(false)
  const [scrollStepId, setScrollStepId] = useState<StepId>(content.workflow.steps[0].id)
  const [preview, setPreview] = useState<Preview>(null)
  const inspection = useProductInspectionState<VersionLogHotspotId>()
  const displayedStepId = compact ? preview?.id ?? scrollStepId : undefined
  const activeWorkflowStep = content.workflow.steps.find((item) => item.id === displayedStepId) ?? content.workflow.steps[0]
  const activeId = compact ? activeWorkflowStep.hotspotId : inspection.activeHotspotId
  const annotation = content.annotations.find((item) => item.id === activeId)

  useLayoutEffect(() => {
    const stage = stageRef.current
    const panel = panelRef.current
    const canvas = canvasRef.current
    if (!stage || !panel || !canvas || compact) return
    const measure = () => {
      if (stage.dataset.compact === 'true') return
      stage.style.setProperty('--vlj-expanded-height', `${panel.offsetHeight}px`)
      stage.style.setProperty('--vlj-canvas-width', `${canvas.offsetWidth}px`)
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
      const readable = items.map((item, candidate) => {
        const detail = item.querySelector('.vlj-rail-detail') ?? item.querySelector('.vlj-rail-summary')
        return headings[candidate].top < readingBottom - 48
          && (detail?.getBoundingClientRect().bottom ?? headings[candidate].bottom) > readingTop
      })
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
      setScrollStepId(content.workflow.steps[index].id)
      if (Math.abs(window.scrollY - lastY) > 2) {
        setPreview((current) => current?.kind === 'tap' ? null : current)
      }
      lastY = window.scrollY
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [compact, content.workflow.steps])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const panel = panelRef.current
    const viewport = canvas?.parentElement
    if (!canvas || !panel || !viewport || !compact) return
    const frameSurface = () => {
      const mobile = window.matchMedia('(max-width: 56rem)').matches
      const product = canvas.querySelector<HTMLElement>('.version-product')
      if (!product) return
      const scale = mobile
        ? 1
        : Math.min(1, viewport.clientWidth / canvas.offsetWidth, (window.innerHeight - 150) / product.offsetHeight)
      panel.style.setProperty('--vlj-surface-scale', String(scale))
      panel.style.setProperty('--vlj-overview-height', `${product.offsetHeight * scale}px`)
      const hotspot = canvas.querySelector<HTMLElement>(`[data-hotspot="${activeId}"]`)
      let offset = 0
      if (mobile && hotspot) {
        const start = hotspot.getBoundingClientRect().top - canvas.getBoundingClientRect().top
        const centered = start + hotspot.offsetHeight / 2 - viewport.clientHeight / 2
        offset = Math.max(0, Math.min(product.offsetHeight - viewport.clientHeight, centered, start - 12))
      }
      panel.style.setProperty('--vlj-crop-offset', `${-offset}px`)
      if (hotspot) {
        const region = hotspot.getBoundingClientRect()
        const frame = viewport.getBoundingClientRect()
        panel.style.setProperty('--vlj-marker-x', `${Math.max(4, Math.min(frame.width - 28, region.left - frame.left - 12))}px`)
        panel.style.setProperty('--vlj-marker-y', `${Math.max(4, Math.min(frame.height - 28, region.top - frame.top - 12))}px`)
      }
    }
    frameSurface()
    const observer = new ResizeObserver(frameSurface)
    observer.observe(viewport)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [activeId, compact])

  return (
    <section className="vlj-journey" id="vlj-product-journey" aria-labelledby="version-log-title-inspection">
      <div className="vlj-journey-heading">
        <header className="qa-inspection-heading">
          <p>{content.inspection.eyebrow}</p>
          <h2 id="version-log-title-inspection">{content.inspection.title}</h2>
          <span>{content.inspection.instruction}</span>
        </header>
      </div>
      <div
        className="vlj-journey-stage"
        ref={stageRef}
        data-compact={compact}
        data-scroll-step={scrollStepId}
        data-active-step={displayedStepId ?? activeWorkflowStep.id}
      >
        <div className="vlj-following-surface" ref={panelRef}>
          <div className="vlj-following-frame" inert={compact} aria-hidden={compact ? true : undefined}>
            <ProductInspectionFrame
              activeAnnotation={annotation}
              defaultAnnotation={content.inspection.defaultAnnotation}
              disclosure={content.meta.disclosure}
              surfaceLabel="버전·릴리스 기록의 공개 재구성 예시"
              evolutionTargetId="version-log-evolution"
              interactionMode={compact ? 'idle' : inspection.interactionMode}
              onPointerPreviewEnd={inspection.clearPointerPreview}
              onFocusPreviewEnd={inspection.clearFocusPreview}
            >
              <div className="vlj-surface-viewport">
                <div className="vlj-surface-canvas" ref={canvasRef}>
                  <VersionLogProductView fixture={content.product} activeId={activeId} onActivate={inspection.activateHotspot} />
                </div>
                {compact ? <span className="vlj-surface-marker" aria-hidden="true">{activeWorkflowStep.index}</span> : null}
              </div>
            </ProductInspectionFrame>
          </div>
          <div
            className="vlj-surface-caption"
            id="vlj-surface-caption"
            hidden={!compact}
            aria-live={preview && preview.kind !== 'pointer' ? 'polite' : 'off'}
            aria-atomic="true"
          >
            <span>{activeWorkflowStep.index} / {activeWorkflowStep.label}</span>
          </div>
        </div>

        <div className="vlj-reading-column">
          <header className="vlj-reading-heading" ref={headingRef}>
            <p>{content.workflow.eyebrow}</p>
            <h2 id="version-log-title-workflow">{content.workflow.title}</h2>
            <span>{content.workflow.introduction}</span>
          </header>
          <ol
            className="vlj-workflow-rail"
            ref={stepsRef}
            aria-labelledby="version-log-title-workflow"
            onKeyDown={(event) => { if (event.key === 'Escape') setPreview(null) }}
          >
            {content.workflow.steps.map((item) => {
              const note = content.annotations.find((entry) => entry.id === item.hotspotId)
              const detail = note?.sections.find((entry) => entry.label === 'DECISION')?.body
              const active = activeWorkflowStep.id === item.id
              return (
                <li key={item.id} id={`vlj-${item.id}`} data-step={item.id} data-active={active}>
                  <h3>
                    <button
                      type="button"
                      aria-current={active ? 'step' : undefined}
                      aria-controls="vlj-surface-caption"
                      aria-describedby={`vlj-summary-${item.id}`}
                      onPointerEnter={(event) => {
                        if (event.pointerType !== 'touch') setPreview({ id: item.id, kind: 'pointer' })
                      }}
                      onPointerLeave={() => setPreview((current) => current?.kind === 'pointer' ? null : current)}
                      onFocus={(event) => {
                        if (event.currentTarget.matches(':focus-visible')) setPreview({ id: item.id, kind: 'focus' })
                      }}
                      onBlur={() => setPreview(null)}
                      onClick={(event) => setPreview({ id: item.id, kind: event.detail === 0 ? 'focus' : 'tap' })}
                    >
                      <span className="vlj-rail-marker">{item.index}</span>
                      <span className="vlj-rail-label">{item.label}</span>
                      <span className="vlj-rail-indicator" aria-hidden="true">↗</span>
                    </button>
                  </h3>
                  <p className="vlj-rail-summary" id={`vlj-summary-${item.id}`}>{item.summary}</p>
                  {detail ? <p className="vlj-rail-detail">{detail}</p> : null}
                </li>
              )
            })}
          </ol>
          <p className="vlj-workflow-boundary">{content.workflow.boundary}</p>
        </div>
      </div>
    </section>
  )
}

export default VersionLogSurfaceWorkflow
