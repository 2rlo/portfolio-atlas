import type { RagAssistantHotspotId, RagAssistantProductFixture } from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface RagAssistantProductViewProps {
  readonly fixture: RagAssistantProductFixture
  readonly activeId: RagAssistantHotspotId | null
  readonly onActivate: (id: RagAssistantHotspotId) => void
}

function RagAssistantProductView({ fixture, activeId, onActivate }: RagAssistantProductViewProps) {
  return (
    <section
      className="rag-product"
      data-has-active={activeId ? 'true' : 'false'}
      aria-label={`${fixture.assistantName} retrieval and source 공개 재구성 화면`}
    >
      <header className="rag-product-topbar" aria-hidden="true">
        <span>J</span>
        <strong>{fixture.productName}</strong>
        <em>PRODUCT WORKSPACE</em>
        <b>ASSISTANT OPEN</b>
      </header>

      <div className="rag-product-shell">
        <aside className="rag-session-rail" aria-hidden="true">
          <header><small>MY SESSIONS</small><b>+</b></header>
          <div>
            {fixture.sessions.map((session) => (
              <span data-state={session.state} key={session.label}>
                <i />
                <strong>{session.label}</strong>
                <small>{session.state === 'active' ? 'NOW' : 'HISTORY'}</small>
              </span>
            ))}
          </div>
          <p><b>{fixture.user.initials}</b><span>{fixture.user.name}<small>OWNER-SCOPED MEMORY</small></span></p>
        </aside>

        <section className="rag-assistant-panel">
          <header className="rag-assistant-head">
            <span aria-hidden="true">✦</span>
            <span><strong>{fixture.assistantName}</strong><small>{fixture.workspaceLabel}</small></span>
            <ProductHotspot
              id="context-entry"
              activeId={activeId}
              label="Intent-based context scope and server-side access boundary"
              className="rag-context-entry"
              onActivate={onActivate}
            >
              <small>CONTEXT SCOPE</small>
              <strong>{fixture.scope.label}</strong>
              <span>{fixture.scope.detail}</span>
            </ProductHotspot>
          </header>

          <div className="rag-thread">
            <div className="rag-user-message">
              <span>{fixture.user.initials}</span>
              <p><small>{fixture.user.name}</small><strong>{fixture.question}</strong></p>
            </div>

            <article className="rag-answer-card">
              <div className="rag-assistant-label" aria-hidden="true"><span>✦</span><strong>{fixture.assistantName}</strong></div>
              <ProductHotspot
                id="deterministic-first"
                activeId={activeId}
                label="Deterministic status lookup before vector retrieval"
                className="rag-deterministic-state"
                onActivate={onActivate}
              >
                <span><small>{fixture.deterministicContext.label}</small><strong>{fixture.deterministicContext.value}</strong></span>
                <em>{fixture.deterministicContext.state}</em>
              </ProductHotspot>

              <div className="rag-answer-copy" aria-hidden="true">
                <h2>{fixture.answer.headline}</h2>
                <p>{fixture.answer.body}</p>
                <div>{fixture.answer.risks.map((risk) => <span key={risk.title}><strong>{risk.title}</strong><small>{risk.detail}</small></span>)}</div>
              </div>

              <ProductHotspot
                id="source-hierarchy"
                activeId={activeId}
                label="Retrieved sources labeled by authority rather than similarity alone"
                className="rag-source-receipt"
                onActivate={onActivate}
              >
                <span className="rag-source-receipt-head"><span><small>03 / SOURCE RECEIPT</small><strong>답변에 사용한 근거</strong></span><em>{fixture.sources.length} SOURCES</em></span>
                <span className="rag-source-list">
                  {fixture.sources.map((source) => (
                    <span data-trust={source.trust} key={`${source.type}-${source.title}`}>
                      <small>{source.type}</small>
                      <strong>{source.title}</strong>
                      <em>{source.state}</em>
                    </span>
                  ))}
                </span>
              </ProductHotspot>
            </article>

            <div className="rag-user-message rag-user-message--followup">
              <span>{fixture.user.initials}</span>
              <p><small>{fixture.user.name}</small><strong>{fixture.followup.question}</strong></p>
            </div>

            <ProductHotspot
              id="insufficient-evidence"
              activeId={activeId}
              label="Insufficient relationship evidence answer state"
              className="rag-limited-answer"
              onActivate={onActivate}
            >
              <span className="rag-limited-label"><span>!</span><strong>CONTEXT LIMITED</strong><em>ADDITIONAL SEARCH CHECKED</em></span>
              <strong>{fixture.followup.headline}</strong>
              <p>{fixture.followup.body}</p>
              <span className="rag-missing-list"><small>NEEDED NEXT</small>{fixture.followup.missing.map((item) => <b key={item}>{item}</b>)}</span>
            </ProductHotspot>

            <ProductHotspot
              id="review-boundary"
              activeId={activeId}
              label="AI answer handoff to human-reviewed official write"
              className="rag-review-handoff"
              onActivate={onActivate}
            >
              <span>05</span>
              <span><small>OFFICIAL WRITE BOUNDARY</small><strong>{fixture.reviewAction.label}</strong></span>
              <p>{fixture.reviewAction.detail}</p>
              <em>{fixture.reviewAction.destination} →</em>
            </ProductHotspot>
          </div>

          <footer className="rag-composer" aria-hidden="true">
            <span className="rag-suggestions">{fixture.suggestions.map((suggestion) => <b key={suggestion}>{suggestion}</b>)}</span>
            <span className="rag-input">Jadebell Hub 업무에 대해 질문하세요 <b>→</b></span>
          </footer>
        </section>
      </div>
    </section>
  )
}

export default RagAssistantProductView
