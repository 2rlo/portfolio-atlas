import { Link } from 'react-router'
import type { ReportEvolutionVisual, ReportPageContent } from '../../content/content-types.ts'
import ReportSurfaceWorkflow from './ReportSurfaceWorkflow.tsx'

function ReportEvolutionFragment({ visual }: { readonly visual: ReportEvolutionVisual }) {
  const fragments: Record<ReportEvolutionVisual, readonly string[]> = {
    'multi-source': ['WORKLOG', '+', 'QA', '→', 'WEEK'],
    'reviewed-first': ['AI DRAFT', '→', 'REVIEW', '→', 'SOURCE'],
    'visible-fallback': ['0 REVIEWED', '→', 'DRAFT + LABEL'],
    'date-window': ['MESSAGE DATE', '≠', 'RECEIVED AT'],
    'manual-locale': ['AUTO / MANUAL', '·', 'KO ON', '·', 'EN GATED'],
  }

  return (
    <div className="report-evolution-fragment" data-visual={visual} aria-hidden="true">
      {fragments[visual].map((fragment, index) => <span key={`${fragment}-${index}`}>{fragment}</span>)}
    </div>
  )
}

function ReportPage({ content }: { readonly content: ReportPageContent }) {
  const titleId = 'report-title'

  return (
    <main className="qa-page report-page" id="main-content">
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

      <ReportSurfaceWorkflow content={content} />

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
        <section className="qa-evolution" id="report-evolution" aria-labelledby={`${titleId}-evolution`}>
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
                <ReportEvolutionFragment visual={scene.visual} />
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
        {content.evidence.items.length > 0 ? <><header className="qa-evidence-heading">
          <p>{content.evidence.eyebrow}</p>
          <h2 id={`${titleId}-evidence`}>{content.evidence.title}</h2>
          <span>{content.evidence.snapshot}</span>
        </header>
        <dl className="qa-evidence-register">
          {content.evidence.items.map((item) => (
            <div key={item.label}>
              <dd>{item.value}</dd>
              <dt>{item.label}</dt>
              <p>{item.meaning}</p>
              <small>{item.boundary}</small>
            </div>
          ))}
        </dl></> : <h2 className="visually-hidden" id={`${titleId}-evidence`}>구현·운영 상태</h2>}
        <div className="qa-status">
          <header>
            <span>구현·운영 상태</span>
            <strong>{content.implementationStatus.state}</strong>
          </header>
          <ul>{content.implementationStatus.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <p><span>확인한 운영 범위</span>{content.implementationStatus.runtime}</p>
          {content.implementationStatus.feedback ? (
            <p><span>{content.implementationStatus.feedback.label}</span>{content.implementationStatus.feedback.text}</p>
          ) : null}
        </div>
      </section>

      <footer className="qa-boundary">
        <div className="qa-boundary-heading">
          <p>{content.boundary.eyebrow}</p>
          <h2>{content.boundary.statement}</h2>
        </div>
        <ul className="qa-boundary-list">{content.boundary.items.map((item) => <li key={item}>{item}</li>)}</ul>
        <nav className="qa-related" aria-label="주간보고와 연결된 시스템">
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

export default ReportPage
