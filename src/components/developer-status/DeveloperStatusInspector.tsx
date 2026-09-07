import { useRef, useState } from 'react'
import type { DeveloperStatusHotspotId, DeveloperStatusPageContent } from '../../content/content-types.ts'
import type { ProductActivationIntent } from '../product-case/AnnotatedProductSurface.tsx'
import DeveloperStatusProductView from './DeveloperStatusProductView.tsx'

function DeveloperStatusInspector({ content }: { readonly content: DeveloperStatusPageContent }) {
  const [selectedId, setSelectedId] = useState<DeveloperStatusHotspotId | null>('partial-state')
  const viewportRef = useRef<HTMLDivElement>(null)
  const annotation = content.annotations.find((item) => item.id === selectedId)
  const fallback = content.inspection.defaultAnnotation

  function select(id: DeveloperStatusHotspotId | null) {
    if (id === selectedId) return
    setSelectedId(id)
    if (viewportRef.current) viewportRef.current.scrollTop = 0
  }

  function activateHotspot(id: DeveloperStatusHotspotId, intent?: ProductActivationIntent) {
    if (intent !== 'pointer') select(id)
  }

  return (
    <section
      className="dev-lens-section"
      aria-labelledby="developer-status-title-inspection"
      data-selected={selectedId ?? 'overview'}
      onKeyDown={(event) => {
        if (event.key === 'Escape') select(null)
      }}
    >
      <header className="qa-section-heading dev-lens-heading">
        <p>{content.inspection.eyebrow}</p>
        <h2 id="developer-status-title-inspection">{content.inspection.title}</h2>
        <span>{content.inspection.instruction}</span>
      </header>

      <header className="dev-lens-workflow-heading">
        <p>{content.workflow.eyebrow}</p>
        <h2 id="developer-status-title-workflow">{content.workflow.title}</h2>
        <span>{content.workflow.introduction}</span>
      </header>

      <div className="dev-lens-grid">
        <div className="dev-lens-visual">
          <p className="product-inspection-disclosure">{content.meta.disclosure}</p>
          <div className="dev-lens-viewport" ref={viewportRef} tabIndex={0} role="region" aria-label="개발자 현황 공개 재구성 화면">
            <DeveloperStatusProductView fixture={content.product} activeId={selectedId} onActivate={activateHotspot} />
          </div>
          <p className="dev-lens-context"><strong>{content.product.selected.person.name}</strong><span>{content.product.selected.state}</span></p>
        </div>

        <div className="dev-lens-reading">
          <div className="dev-lens-controls" role="group" aria-label="개발자 현황 집계 흐름" aria-describedby="developer-status-title-workflow">
            <button className="dev-lens-overview" type="button" aria-pressed={selectedId === null} aria-controls="product-editorial-note" onClick={() => select(null)} onFocus={() => select(null)}>전체 화면</button>
            <ol>
              {content.workflow.steps.map((step) => (
                <li key={step.id}>
                  <button type="button" data-lens={step.hotspotId} aria-pressed={selectedId === step.hotspotId} aria-controls="product-editorial-note" aria-label={`${step.label}: ${step.summary}`} onClick={() => select(step.hotspotId)} onFocus={() => select(step.hotspotId)}>
                    <span>{step.index}</span><strong>{step.label}</strong><small>{step.summary}</small>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <aside className="product-editorial-note dev-lens-note" id="product-editorial-note" aria-live="polite" aria-atomic="true">
            <div className="product-editorial-heading"><span>{annotation?.index ?? fallback.index}</span><p>{annotation?.label ?? fallback.label}</p></div>
            <h3>{annotation?.title ?? fallback.title}</h3>
            {annotation ? (
              <dl className="product-editorial-sections">
                {annotation.sections.map((section) => <div key={section.label}><dt>{section.label}</dt><dd>{section.body}</dd></div>)}
              </dl>
            ) : <p className="product-editorial-prompt">{fallback.body}</p>}
            {annotation?.evolution ? <a className="product-editorial-evolution" href="#developer-status-evolution"><span>{annotation.evolution.label}</span><strong>{annotation.evolution.date} ↓</strong></a> : null}
          </aside>
        </div>
      </div>
      <p className="qa-workflow-boundary dev-lens-boundary">{content.workflow.boundary}</p>
    </section>
  )
}

export default DeveloperStatusInspector
