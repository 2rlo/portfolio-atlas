import { useState } from 'react'
import { Link } from 'react-router'
import type { PublicCodemapContent, PublicCodemapNodeId } from '../../content/content-types.ts'

interface CodemapExplorerPageProps {
  readonly content: PublicCodemapContent
}

function CodemapExplorerPage({ content }: CodemapExplorerPageProps) {
  const [activeFlowId, setActiveFlowId] = useState(content.flows[0]?.id ?? '')
  const [activeNodeId, setActiveNodeId] = useState<PublicCodemapNodeId>(content.nodes[2]?.id ?? 'access')
  const activeFlow = content.flows.find((flow) => flow.id === activeFlowId) ?? content.flows[0]
  const activeNode = content.nodes.find((node) => node.id === activeNodeId) ?? content.nodes[0]
  const activeSteps = new Set(activeFlow?.steps)

  return (
    <main className="codemap-page" id="main-content">
      <section className="codemap-hero" aria-labelledby="codemap-title">
        <Link className="codemap-back" to="/how/documentation-system">
          <span aria-hidden="true">←</span> DOCUMENTATION SYSTEM
        </Link>
        <div className="codemap-hero-grid">
          <header>
            <p>{content.hero.eyebrow}</p>
            <h1 id="codemap-title">
              {content.hero.titleLines.map((line) => <span key={line}>{line}</span>)}
            </h1>
          </header>
          <div className="codemap-hero-copy">
            <strong>{content.hero.thesis}</strong>
            <p>{content.hero.summary}</p>
            <small>{content.meta.disclosure}</small>
          </div>
        </div>
        <dl className="codemap-ledger" aria-label="Codemap artifact 상태">
          <div><dt>OWNER</dt><dd>{content.meta.owner}</dd></div>
          <div><dt>STATE</dt><dd data-state={content.freshness.state}>{content.freshness.state}</dd></div>
          <div><dt>SCOPE</dt><dd>{content.freshness.scope}</dd></div>
          <div><dt>REVIEW</dt><dd>{content.freshness.reviewedAt}</dd></div>
        </dl>
      </section>

      <section className="codemap-explorer" aria-labelledby="codemap-explorer-title">
        <header className="codemap-section-heading">
          <p>INTERACTIVE / PUBLIC RECONSTRUCTION</p>
          <h2 id="codemap-explorer-title">한 모듈에서 영향 문맥까지.</h2>
          <span>{content.freshness.rule}</span>
        </header>

        <div className="codemap-flow-controls" aria-label="살펴볼 흐름">
          {content.flows.map((flow) => (
            <button
              type="button"
              aria-pressed={flow.id === activeFlow?.id}
              key={flow.id}
              onClick={() => {
                setActiveFlowId(flow.id)
                setActiveNodeId(flow.steps.at(-1) ?? 'access')
              }}
            >
              <span>{flow.id === activeFlow?.id ? '●' : '○'}</span>
              {flow.label}
            </button>
          ))}
        </div>

        {activeFlow ? (
          <div className="codemap-flow-note" aria-live="polite">
            <p><span>TRIGGER</span>{activeFlow.trigger}</p>
            <p><span>OUTCOME</span>{activeFlow.outcome}</p>
          </div>
        ) : null}

        <ol className="codemap-node-rail" aria-label="Synthetic module path">
          {content.nodes.map((node) => {
            const isInFlow = activeSteps.has(node.id)
            const isSelected = node.id === activeNode?.id
            return (
              <li data-in-flow={isInFlow} key={node.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  disabled={!isInFlow}
                  onClick={() => setActiveNodeId(node.id)}
                >
                  <span>{node.index}</span>
                  <small>{node.kind}</small>
                  <strong>{node.label}</strong>
                </button>
              </li>
            )
          })}
        </ol>

        {activeNode ? (
          <article className="codemap-inspection" aria-live="polite">
            <header>
              <p>{activeNode.kind} / SELECTED MODULE</p>
              <h3>{activeNode.label}</h3>
              <span>{activeNode.role}</span>
            </header>
            <div className="codemap-relation-grid">
              {[
                ['CALLERS', activeNode.callers],
                ['DEPENDENCIES', activeNode.dependencies],
                ['TESTS', activeNode.tests],
                ['EVIDENCE', activeNode.evidence],
              ].map(([label, items]) => (
                <section key={label as string}>
                  <h4>{label as string}</h4>
                  <ul>{(items as readonly string[]).map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              ))}
            </div>
          </article>
        ) : null}
      </section>

      <section className="codemap-contract" aria-labelledby="codemap-contract-title">
        <header>
          <p>ONE ARTIFACT / THREE SURFACES</p>
          <h2 id="codemap-contract-title">사람이 보고, 도구가 읽고, 변경이 최신성을 증명한다.</h2>
        </header>
        <ol>
          {content.contract.map((item, index) => (
            <li key={item.format}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.format}</strong>
              <small>{item.audience}</small>
              <p>{item.responsibility}</p>
            </li>
          ))}
        </ol>
      </section>

      <footer className="codemap-boundary">
        <p>BOUNDARY / PUBLIC ARTIFACT</p>
        <ul>{content.boundary.map((item) => <li key={item}>{item}</li>)}</ul>
        <Link to="/how/ai-native-engineering">AI-native workflow에서 사용되는 장면 보기 <span aria-hidden="true">→</span></Link>
      </footer>
    </main>
  )
}

export default CodemapExplorerPage
