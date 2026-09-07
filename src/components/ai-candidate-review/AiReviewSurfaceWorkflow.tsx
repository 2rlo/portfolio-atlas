import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import type { AiCandidateReviewHotspotId, AiCandidateReviewPageContent } from '../../content/content-types.ts'
import { ProductInspectionFrame } from '../product-case/AnnotatedProductSurface.tsx'
import useProductInspectionState from '../product-case/useProductInspectionState.ts'
import AiCandidateReviewProductView from './AiCandidateReviewProductView.tsx'

export function AiReviewPrototypeSwitch({ isPrototype }: { readonly isPrototype: boolean }) {
  const [params] = useSearchParams()
  const isPolished = isPrototype && params.get('workflow') !== 'sticky'
  const href = (mode: string) => {
    const next = new URLSearchParams(params)
    next.set('workflow', mode)
    return `?${next.toString()}#acr-product-journey`
  }
  return (
    <nav className="acr-prototype-switch" aria-label="AI Review 레이아웃 비교">
      <span>LAYOUT STUDY</span>
      <Link to={href('sticky')} reloadDocument aria-current={isPrototype && !isPolished ? 'page' : undefined}>A · Sticky prototype</Link>
      <Link to={href('polished')} reloadDocument aria-current={isPolished ? 'page' : undefined}>B · Polished prototype</Link>
    </nav>
  )
}

type Preview = { id: AiCandidateReviewHotspotId; kind: 'pointer' | 'focus' | 'tap' } | null

export default function AiReviewSurfaceWorkflow({ content }: { readonly content: AiCandidateReviewPageContent }) {
  const [params] = useSearchParams()
  const isPolished = params.get('workflow') !== 'sticky'
  const stageRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLOListElement>(null)
  const headingRef = useRef<HTMLElement>(null)
  const readingRef = useRef({ index: 0, compact: false })
  const [compact, setCompact] = useState(false)
  const [scrollId, setScrollId] = useState(content.workflow.steps[0].hotspotId)
  const [preview, setPreview] = useState<Preview>(null)
  const inspection = useProductInspectionState<AiCandidateReviewHotspotId>()
  // One derived selection drives the rail, caption and the original product DOM.
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
      stage.style.setProperty('--acr-expanded-height', `${panel.offsetHeight}px`)
      stage.style.setProperty('--acr-canvas-width', `${canvas.offsetWidth}px`)
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
      if (isPolished) {
        // Measure the copy, not the tall rail item's mostly empty scroll zone.
        // Heading height is fixed, so preview typography cannot move the anchor.
        const headings = items.map((item) => item.querySelector('h3')!.getBoundingClientRect())
        const anchors = headings.map((rect) => rect.bottom)
        const entryLine = window.innerHeight * (mobile ? 0.7 : 0.8)
        const reverseMargin = Math.max(80, Math.min(112, window.innerHeight * 0.1))
        const reading = readingRef.current
        if (!reading.compact && anchors[0] <= entryLine) reading.compact = true
        else if (reading.compact && anchors[0] > entryLine + reverseMargin) reading.compact = false
        setCompact(reading.compact)

        // Mobile's reading band starts below the pinned crop, not behind it.
        const previewBottom = compact ? panel.getBoundingClientRect().bottom : window.innerHeight * 0.31 + 44
        const readingTop = mobile ? previewBottom + 24 : 24
        const readingBottom = window.innerHeight - 32
        const readingLine = (readingTop + readingBottom) / 2
        const distances = anchors.map((anchor) => Math.abs(anchor + 32 - readingLine))
        let index = reading.index
        const readable = items.map((item, candidate) =>
          headings[candidate].top < readingBottom - 48 &&
          item.querySelector('.acr-rail-detail')!.getBoundingClientRect().bottom > readingTop,
        )
        // A small dead band prevents boundary jitter in either direction. A step
        // concealed by the mobile preview cannot hold selection over visible copy.
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
      } else {
        // Preserve the original prototype as the A comparison.
        setCompact(heading.getBoundingClientRect().top < window.innerHeight * 0.8)
        const readingLine = mobile
          ? Math.min(window.innerHeight * 0.72, panel.getBoundingClientRect().bottom + 180)
          : window.innerHeight * 0.48
        let nearest = 0
        let distance = Infinity
        items.forEach((item, index) => {
          const rect = item.getBoundingClientRect()
          const nextDistance = Math.abs(rect.top + Math.min(rect.height / 2, 130) - readingLine)
          if (nextDistance < distance) { distance = nextDistance; nearest = index }
        })
        setScrollId(content.workflow.steps[nearest].hotspotId)
      }
      // A tap is a preview until reading resumes. Keyboard focus is retained until blur.
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
  }, [content.workflow.steps, compact, isPolished])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const panel = panelRef.current
    const viewport = canvas?.parentElement
    if (!canvas || !panel || !viewport || !compact) return
    const frameSurface = () => {
      const mobile = window.matchMedia('(max-width: 56rem)').matches
      const product = canvas.querySelector<HTMLElement>('.acr-product')
      if (!product) return
      const scale = mobile ? 1 : Math.min(1, viewport.clientWidth / canvas.offsetWidth, (window.innerHeight - 150) / product.offsetHeight)
      panel.style.setProperty('--acr-surface-scale', String(scale))
      panel.style.setProperty('--acr-overview-height', `${product.offsetHeight * scale}px`)
      const hotspot = canvas.querySelector<HTMLElement>(`[data-hotspot="${activeId}"]`)
      let offset = 0
      if (mobile && hotspot) {
        const center = hotspot.getBoundingClientRect().top - canvas.getBoundingClientRect().top + hotspot.offsetHeight / 2
        offset = Math.max(0, Math.min(product.offsetHeight - viewport.clientHeight, center - viewport.clientHeight / 2))
      }
      panel.style.setProperty('--acr-crop-offset', `${-offset}px`)
      if (hotspot && isPolished) {
        // The utility marker is outside the scaled canvas so it remains legible.
        const region = hotspot.getBoundingClientRect()
        const frame = viewport.getBoundingClientRect()
        panel.style.setProperty('--acr-marker-x', `${Math.max(4, Math.min(frame.width - 28, region.left - frame.left - 12))}px`)
        panel.style.setProperty('--acr-marker-y', `${Math.max(4, Math.min(frame.height - 28, region.top - frame.top - 12))}px`)
      }
    }
    frameSurface()
    const observer = new ResizeObserver(frameSurface)
    observer.observe(viewport)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [activeId, compact, isPolished])

  return (
    <section className="acr-journey" id="acr-product-journey" data-polished={isPolished} aria-labelledby="acr-inspection-title">
      <div className="acr-journey-heading">
        <AiReviewPrototypeSwitch isPrototype />
        <header className="acr-inspection-heading">
          <p>{content.inspection.eyebrow}</p>
          <h2 id="acr-inspection-title">{content.inspection.title}</h2>
          <span>{content.inspection.instruction}</span>
        </header>
      </div>
      <div className="acr-journey-stage" ref={stageRef} data-compact={compact} data-scroll-step={scrollId} data-active-step={activeId}>
        <div className="acr-following-surface" ref={panelRef}>
          <div className="acr-following-frame" inert={compact} aria-hidden={compact ? true : undefined}>
            <ProductInspectionFrame
              activeAnnotation={annotation}
              defaultAnnotation={content.inspection.defaultAnnotation}
              disclosure={content.meta.disclosure}
              surfaceLabel="AI Candidate Review 재구성 제품 화면과 editorial annotation"
              evolutionTargetId="ai-candidate-review-evolution"
              interactionMode={compact ? 'idle' : inspection.interactionMode}
              onPointerPreviewEnd={inspection.clearPointerPreview}
              onFocusPreviewEnd={inspection.clearFocusPreview}
            >
              <div className="acr-surface-viewport">
                <div className="acr-surface-canvas" ref={canvasRef}>
                  <AiCandidateReviewProductView fixture={content.product} activeId={activeId} onActivate={inspection.activateHotspot} />
                </div>
                {isPolished && compact && <span className="acr-surface-marker" aria-hidden="true">{activeWorkflowStep.index}</span>}
              </div>
            </ProductInspectionFrame>
          </div>
          <div className="acr-surface-caption" id="acr-surface-caption" hidden={!compact} aria-live={preview && preview.kind !== 'pointer' ? 'polite' : 'off'} aria-atomic="true">
            <span>{activeWorkflowStep.index} / {activeWorkflowStep.label}</span>
            {!isPolished && <strong>{activeWorkflowStep.summary}</strong>}
            <small>{preview ? '미리보기' : '읽는 단계'} <span aria-hidden="true">↗</span></small>
          </div>
        </div>

        <div className="acr-reading-column">
          <header className="acr-reading-heading" ref={headingRef}>
            <p>{content.workflow.eyebrow}</p>
            <h2 id="acr-workflow-title">{content.workflow.title}</h2>
            <span>{isPolished ? '각 단계가 활성화될 때, 같은 화면의 대응 지점도 함께 강조됩니다.' : '읽는 단계에 맞춰 같은 화면의 검토 지점이 강조됩니다. 다른 단계는 잠시 가리키거나 선택해 살펴보세요.'}</span>
          </header>
          <ol className="acr-workflow-rail" ref={stepsRef} aria-labelledby="acr-workflow-title" onKeyDown={(event) => { if (event.key === 'Escape') setPreview(null) }}>
            {content.workflow.steps.map((item) => {
              const note = content.annotations.find((entry) => entry.id === item.hotspotId)
              return (
                <li key={item.id} id={`acr-${item.id}`} data-step={item.hotspotId} data-active={activeId === item.hotspotId}>
                  <h3>
                    <button
                      type="button"
                      aria-current={activeId === item.hotspotId ? 'step' : undefined}
                      aria-controls="acr-surface-caption"
                      aria-describedby={`acr-summary-${item.id}`}
                      onPointerEnter={(event) => { if (event.pointerType !== 'touch') setPreview({ id: item.hotspotId, kind: 'pointer' }) }}
                      onPointerLeave={() => setPreview((current) => current?.kind === 'pointer' ? null : current)}
                      onFocus={(event) => { if (event.currentTarget.matches(':focus-visible')) setPreview({ id: item.hotspotId, kind: 'focus' }) }}
                      onBlur={() => setPreview(null)}
                      onClick={(event) => setPreview({ id: item.hotspotId, kind: event.detail === 0 ? 'focus' : 'tap' })}
                    >
                      <span className="acr-rail-marker">{item.index}</span>
                      <span className="acr-rail-label">{item.label}</span>
                      <span className="acr-rail-indicator" aria-hidden="true">↗</span>
                    </button>
                  </h3>
                  <p className="acr-rail-summary" id={`acr-summary-${item.id}`}>{item.summary}</p>
                  <p className="acr-rail-detail">{note?.sections.find((entry) => entry.label === 'DECISION')?.body}</p>
                </li>
              )
            })}
          </ol>
          <p className="acr-workflow-boundary">{content.workflow.boundary}</p>
        </div>
      </div>
    </section>
  )
}
