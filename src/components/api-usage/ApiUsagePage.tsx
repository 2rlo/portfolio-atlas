import { Link } from 'react-router'
import type { ApiUsageEvolutionVisual, ApiUsagePageContent, PaidCallLifecycleContent } from '../../content/content-types.ts'
import ApiUsageInspector from './ApiUsageInspector.tsx'

function ApiUsageEvolutionFragment({ visual }: { readonly visual: ApiUsageEvolutionVisual }) {
  if (visual === 'disconnect') return <div className="qa-evolution-fragment"><span>STREAM</span><i>×</i><strong>LAST SNAPSHOT</strong></div>
  if (visual === 'dashboard') return <div className="qa-evolution-fragment"><span>LEDGER</span><i>→</i><span>VIEW</span><i>→</i><strong>GUARD</strong></div>
  if (visual === 'batch-rate') return <div className="qa-evolution-fragment"><span>STANDARD 1×</span><i>/</i><strong>BATCH 0.5×</strong></div>
  if (visual === 'retry-ledger') return <div className="qa-evolution-fragment"><span>POLL</span><i>→</i><strong>TERMINAL</strong><i>≠</i><span>RETRY</span></div>
  return <div className="qa-evolution-fragment"><span>CACHE WRITE</span><i>+</i><span>READ</span><i>→</i><strong>NET</strong></div>
}

function ApiUsagePage({ content, lifecycle }: { readonly content: ApiUsagePageContent; readonly lifecycle: PaidCallLifecycleContent }) {
  const titleId = 'api-usage-title'

  return (
    <main className="qa-page api-usage-page" id="main-content">
      <section className="qa-hero" aria-labelledby={titleId}>
        <div className="qa-hero-frame">
          <Link className="qa-back" to="/">
            <span aria-hidden="true">←</span>
            WHAT I BUILT
          </Link>
          <header className="qa-hero-heading">
            <div>
              <p>{content.hero.eyebrow}</p>
              <h1 id={titleId}>{content.hero.titleLines.map((line) => <span key={line}>{line}</span>)}</h1>
            </div>
            <div className="qa-hero-thesis">
              <strong>{content.hero.thesis}</strong>
              <p>{content.hero.summary}</p>
              <aside>
                <small>{content.hero.problemLabel}</small>
                <span>{content.hero.problem}</span>
              </aside>
            </div>
          </header>
        </div>
      </section>

      <ApiUsageInspector content={content} />

      <section className="qa-decisions" aria-labelledby={`${titleId}-decisions`}>
        <header>
          <p>{content.decisions.eyebrow}</p>
          <h2 id={`${titleId}-decisions`}>{content.decisions.title}</h2>
        </header>
        <ol>
          {content.decisions.items.map((decision) => (
            <li key={decision.statement}>
              <strong>{decision.statement}</strong>
              <p>{decision.explanation}</p>
            </li>
          ))}
        </ol>
      </section>

      {content.evolution ? (
        <section className="qa-evolution" id="api-usage-evolution" aria-labelledby={`${titleId}-evolution`}>
          <header className="qa-section-heading">
            <p>{content.evolution.eyebrow}</p>
            <h2 id={`${titleId}-evolution`}>{content.evolution.title}</h2>
            <span>{content.evolution.introduction}</span>
          </header>
          <ol className="qa-evolution-scenes">
            {content.evolution.scenes.map((scene) => (
              <li key={`${scene.date}-${scene.label}`}>
                <header>
                  <time>{scene.date}</time>
                  <span>{scene.label}</span>
                </header>
                <ApiUsageEvolutionFragment visual={scene.visual} />
                <strong>{scene.decision}</strong>
                <dl>
                  <div><dt>변경 계기</dt><dd>{scene.trigger}</dd></div>
                  <div><dt>바꾼 점</dt><dd>{scene.change}</dd></div>
                  <div><dt>현재 구조</dt><dd>{scene.currentEffect}</dd></div>
                </dl>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className="qa-evidence" aria-labelledby={`${titleId}-evidence`}>
        <header className="qa-evidence-heading">
          <p>{content.evidence.eyebrow}</p>
          <h2 id={`${titleId}-evidence`}>{content.evidence.title}</h2>
          <span>{content.evidence.snapshot}</span>
        </header>
        {content.evidence.items.length > 0 ? <dl className="qa-evidence-register">
          {content.evidence.items.map((item) => (
            <div key={item.label}>
              <dd>{item.value}</dd>
              <dt>{item.label}</dt>
              <p>{item.meaning}</p>
              {item.boundary ? <small>{item.boundary}</small> : null}
            </div>
          ))}
        </dl> : null}
        <div className="qa-status">
          <header>
            <span>달라진 업무</span>
            <strong>{content.implementationStatus.state}</strong>
          </header>
          <ul>{content.implementationStatus.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <p><span>설계가 연결된 지점</span>{content.implementationStatus.runtime}</p>
          {content.implementationStatus.feedback ? (
            <p><span>{content.implementationStatus.feedback.label}</span>{content.implementationStatus.feedback.text}</p>
          ) : null}
        </div>
      </section>

      <section className="api-paid-lifecycle" id="paid-call-lifecycle" aria-labelledby={`${titleId}-lifecycle`}>
        <header className="qa-section-heading">
          <p>{lifecycle.eyebrow}</p>
          <h2 id={`${titleId}-lifecycle`}>{lifecycle.title}</h2>
          <span>{lifecycle.introduction}</span>
        </header>
        <ol className="api-paid-stages" aria-label="유료 호출 처리 단계">
          {lifecycle.stages.map((stage) => (
            <li key={stage.label}>
              <span>{stage.label}</span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </li>
          ))}
        </ol>
        <div className="api-paid-situations">
          <h3>같은 ‘미완료’라도 다음 판단은 다르다.</h3>
          {lifecycle.situations.map((situation) => (
            <article key={situation.id} aria-labelledby={`paid-call-${situation.id}`}>
              <h4 id={`paid-call-${situation.id}`}>{situation.title}</h4>
              <dl>
                <div><dt>관측 상태</dt><dd>{situation.signal}</dd></div>
                <div><dt>다음 판단</dt><dd>{situation.action}</dd></div>
                <div><dt>판단 근거</dt><dd>{situation.reason}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <aside className="api-paid-boundary" aria-label="유료 호출 처리 원칙">
          <strong>다시 호출하지 않고 이어가는 처리</strong>
          <p>{lifecycle.boundary}</p>
          <Link to={lifecycle.related.href}>{lifecycle.related.label}<span aria-hidden="true"> ↗</span></Link>
        </aside>
      </section>

      <footer className="qa-boundary">
        <div className="qa-boundary-heading">
          <p>{content.boundary.eyebrow}</p>
          <h2>{content.boundary.statement}</h2>
        </div>
        <ul className="qa-boundary-list">{content.boundary.items.map((item) => <li key={item}>{item}</li>)}</ul>
        <nav className="qa-related" aria-label="API 사용량과 연결된 시스템">
          <p>연결된 설계 방식</p>
          {content.relatedSystems.map((system) => system.href ? (
            <Link to={system.href} key={system.title}>
              <span><strong>{system.title}</strong><small>{system.relation}</small></span>
              <b aria-hidden="true">↗</b>
            </Link>
          ) : (
            <div key={system.title}>
              <span><strong>{system.title}</strong><small>{system.relation}</small></span>
              <b>PAGE IN DEVELOPMENT</b>
            </div>
          ))}
        </nav>
      </footer>
    </main>
  )
}

export default ApiUsagePage
