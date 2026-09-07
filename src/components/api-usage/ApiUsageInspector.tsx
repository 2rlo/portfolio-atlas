import { useRef, useState } from 'react'
import type { ApiUsageHotspotId, ApiUsagePageContent } from '../../content/content-types.ts'
import type { ProductActivationIntent } from '../product-case/AnnotatedProductSurface.tsx'
import ApiUsageProductView from './ApiUsageProductView.tsx'

function ApiUsageInspector({ content }: { readonly content: ApiUsagePageContent }) {
  const [selectedId, setSelectedId] = useState<ApiUsageHotspotId | null>('usage-ledger')
  const viewportRef = useRef<HTMLDivElement>(null)
  const annotation = content.annotations.find((item) => item.id === selectedId)
  const fallback = content.inspection.defaultAnnotation

  function select(id: ApiUsageHotspotId | null) {
    if (id === selectedId) return
    setSelectedId(id)
    if (viewportRef.current) viewportRef.current.scrollTop = 0
  }

  function activateHotspot(id: ApiUsageHotspotId, intent?: ProductActivationIntent) {
    if (intent !== 'pointer') select(id)
  }

  return (
    <section
      className="api-lens-section"
      aria-labelledby="api-usage-title-inspection"
      data-selected={selectedId ?? 'overview'}
      onKeyDown={(event) => {
        if (event.key === 'Escape') select(null)
      }}
    >
      <header className="qa-section-heading api-lens-heading">
        <p>{content.inspection.eyebrow}</p>
        <h2 id="api-usage-title-inspection">{content.inspection.title}</h2>
        <span>{content.inspection.instruction}</span>
      </header>

      <div className="api-lens-grid">
        <div className="api-lens-visual">
          <p className="product-inspection-disclosure">{content.meta.disclosure}</p>
          <div className="api-lens-viewport" ref={viewportRef} role="region" tabIndex={0} aria-label="API 사용량·비용 원장의 공개 재구성 화면">
            <ApiUsageProductView fixture={content.product} activeId={selectedId} onActivate={activateHotspot} />
          </div>
          <p className="api-lens-context">{content.product.period}</p>
        </div>

        <div className="api-lens-reading">
          <div className="api-lens-controls" role="group" aria-label="API 비용 화면의 설계 설명">
            <button className="api-lens-overview" type="button" aria-pressed={selectedId === null} aria-controls="product-editorial-note" onClick={() => select(null)} onFocus={() => select(null)}>전체 화면</button>
            <ol>
              {content.annotations.map((item) => (
                <li key={item.id}>
                  <button type="button" data-lens={item.id} aria-pressed={selectedId === item.id} aria-controls="product-editorial-note" aria-label={`${item.label}: ${item.title}`} onClick={() => select(item.id)} onFocus={() => select(item.id)}>
                    <span>{item.index}</span>
                    <strong>{item.label}</strong>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <aside className="product-editorial-note api-lens-note" id="product-editorial-note" aria-live="polite" aria-atomic="true">
            <div className="product-editorial-heading"><span>{annotation?.index ?? fallback.index}</span><p>{annotation?.label ?? fallback.label}</p></div>
            <h3>{annotation?.title ?? fallback.title}</h3>
            {annotation ? (
              <dl className="product-editorial-sections">
                {annotation.sections.map((section) => <div key={section.label}><dt>{section.label}</dt><dd>{section.body}</dd></div>)}
              </dl>
            ) : <p className="product-editorial-prompt">{fallback.body}</p>}
            {annotation?.evolution ? <a className="product-editorial-evolution" href="#api-usage-evolution"><span>{annotation.evolution.label}</span><strong>{annotation.evolution.date} ↓</strong></a> : null}
          </aside>
        </div>
      </div>

      <section className="api-lens-workflow" aria-labelledby="api-usage-title-workflow">
        <header className="qa-section-heading">
          <p>{content.workflow.eyebrow}</p>
          <h2 id="api-usage-title-workflow">{content.workflow.title}</h2>
          <span>{content.workflow.introduction}</span>
        </header>
        <ol className="api-lens-flow" aria-label="AI 사용량 기록·비용 계산·예산 제어 흐름">
          {content.workflow.steps.map((step) => <li key={step.id}><span>{step.index}</span><strong>{step.label}</strong><small>{step.summary}</small></li>)}
        </ol>
        <p className="qa-workflow-boundary">{content.workflow.boundary}</p>
      </section>
    </section>
  )
}

export default ApiUsageInspector
