import { Link } from 'react-router'
import type { OperationsPageContent } from '../../content/content-types.ts'
import OperationsDecisionSheet from './OperationsDecisionSheet.tsx'

function OperationsPage({ content }: { readonly content: OperationsPageContent }) {
  return (
    <main className="qa-page operations-page" id="main-content">
      <section className="qa-hero" aria-labelledby="operations-title">
        <div className="qa-hero-frame">
          <Link className="qa-back" to="/"><span aria-hidden="true">←</span> WHAT I BUILT</Link>
          <header className="qa-hero-heading">
            <div>
              <p>{content.hero.eyebrow}</p>
              <h1 id="operations-title">{content.hero.titleLines.map((line) => <span key={line}>{line}</span>)}</h1>
            </div>
            <div className="qa-hero-thesis">
              <strong>{content.hero.thesis}</strong>
              <p>{content.hero.summary}</p>
              <aside><small>{content.hero.problemLabel}</small><span>{content.hero.problem}</span></aside>
            </div>
          </header>
          <p className="operations-disclosure">{content.meta.disclosure}</p>
        </div>
      </section>

      <OperationsDecisionSheet content={content.inspection} />

      <section className="qa-workflow-section operations-workflow" aria-labelledby="operations-workflow-title">
        <header className="qa-section-heading"><p>{content.workflow.eyebrow}</p><h2 id="operations-workflow-title">{content.workflow.title}</h2></header>
        <ol className="operations-flow">
          {content.workflow.steps.map((step, index) => (
            <li key={step.label}><span aria-hidden="true">0{index + 1}</span><strong>{step.label}</strong><p>{step.summary}</p></li>
          ))}
        </ol>
        <p className="qa-workflow-boundary">{content.workflow.boundary}</p>
      </section>

      <section className="qa-decisions" aria-labelledby="operations-decisions-title">
        <header><p>{content.decisions.eyebrow}</p><h2 id="operations-decisions-title">{content.decisions.title}</h2></header>
        <ol>{content.decisions.items.map((item) => <li key={item.statement}><strong>{item.statement}</strong><p>{item.explanation}</p></li>)}</ol>
      </section>

      <section className="qa-evidence" aria-labelledby="operations-evidence-title">
        <header className="qa-evidence-heading"><p>{content.evidence.eyebrow}</p><h2 id="operations-evidence-title">{content.evidence.title}</h2><span>{content.evidence.snapshot}</span></header>
        {content.evidence.items.length > 0 ? <dl className="qa-evidence-register">
          {content.evidence.items.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>
                <strong>{item.value}</strong>
                <p>{item.meaning}</p>
                {item.boundary ? <small>{item.boundary}</small> : null}
              </dd>
            </div>
          ))}
        </dl> : null}
        <div className="qa-status">
          <header><span>달라진 업무</span><strong>{content.implementationStatus.state}</strong></header>
          <ul>{content.implementationStatus.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <p><span>설계가 연결된 지점</span>{content.implementationStatus.runtime}</p>
        </div>
      </section>

      <footer className="qa-boundary">
        <div className="qa-boundary-heading"><p>{content.boundary.eyebrow}</p><h2>{content.boundary.statement}</h2></div>
        <ul className="qa-boundary-list">{content.boundary.items.map((item) => <li key={item}>{item}</li>)}</ul>
        <nav className="qa-related" aria-label="운영 판단과 연결된 설계 방식">
          <p>연결된 설계 방식</p>
          {content.relatedSystems.map((system) => <Link key={system.title} to={system.href ?? '/'}><span><strong>{system.title}</strong><small>{system.relation}</small></span><b aria-hidden="true">↗</b></Link>)}
        </nav>
      </footer>
    </main>
  )
}

export default OperationsPage
