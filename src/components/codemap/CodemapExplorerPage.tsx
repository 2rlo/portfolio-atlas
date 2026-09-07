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
        <dl className="codemap-ledger" aria-label="Codemap 상태">
          <div><dt>관리 주체</dt><dd>{content.meta.owner}</dd></div>
          <div><dt>STATE</dt><dd data-state={content.freshness.state}>{content.freshness.state}</dd></div>
          <div><dt>예시 범위</dt><dd>{content.freshness.scope}</dd></div>
          <div><dt>검토 상태</dt><dd>{content.freshness.reviewedAt}</dd></div>
        </dl>
      </section>

      <section className="codemap-explorer" aria-labelledby="codemap-explorer-title">
        <header className="codemap-section-heading">
          <p>공개용 재구성 지도</p>
          <h2 id="codemap-explorer-title">한 모듈에서 호출 관계와 검증 근거까지.</h2>
          <span>{content.freshness.rule}</span>
        </header>

        <div className="codemap-flow-controls" aria-label="탐색 흐름">
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
            <p><span>시작 조건</span>{activeFlow.trigger}</p>
            <p><span>처리 결과</span>{activeFlow.outcome}</p>
          </div>
        ) : null}

        <ol className="codemap-node-rail" aria-label="합성 모듈 경로">
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
              <p>{activeNode.kind} / 선택한 모듈</p>
              <h3>{activeNode.label}</h3>
              <span>{activeNode.role}</span>
            </header>
            <div className="codemap-relation-grid">
              {[
                ['호출자', activeNode.callers],
                ['의존성', activeNode.dependencies],
                ['테스트', activeNode.tests],
                ['근거', activeNode.evidence],
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
          <p>하나의 코드 지도, 세 가지 형식</p>
          <h2 id="codemap-contract-title">HTML로 탐색하고, JSON으로 읽고, LOCK으로 생성 기준을 확인한다.</h2>
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
        <p>공개 예시의 범위</p>
        <ul>{content.boundary.map((item) => <li key={item}>{item}</li>)}</ul>
        <Link to="/how/ai-native-engineering">AI 개발 흐름에서의 활용 <span aria-hidden="true">→</span></Link>
      </footer>
    </main>
  )
}

export default CodemapExplorerPage
