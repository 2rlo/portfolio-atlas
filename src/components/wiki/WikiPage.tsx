import { Link } from 'react-router'
import type { WikiPageContent } from '../../content/content-types.ts'
import WikiSurfaceWorkflow from './WikiSurfaceWorkflow.tsx'

function WikiPage({ content }: { readonly content: WikiPageContent }) {
  return (
    <main className="qa-page wiki-page" id="main-content">
      <section className="qa-hero" aria-labelledby="wiki-title">
        <div className="qa-hero-frame">
          <Link className="qa-back" to="/"><span aria-hidden="true">←</span> WHAT I BUILT</Link>
          <header className="qa-hero-heading">
            <div><p>{content.hero.eyebrow}</p><h1 id="wiki-title">{content.hero.titleLines.map((line) => <span key={line}>{line}</span>)}</h1></div>
            <div className="qa-hero-thesis"><strong>{content.hero.thesis}</strong><p>{content.hero.summary}</p><aside><small>{content.hero.problemLabel}</small><span>{content.hero.problem}</span></aside></div>
          </header>
        </div>
      </section>

      <WikiSurfaceWorkflow content={content} />

      <section className="qa-decisions" aria-labelledby="wiki-title-decisions">
        <header><p>{content.decisions.eyebrow}</p><h2 id="wiki-title-decisions">{content.decisions.title}</h2></header>
        <ol>{content.decisions.items.map((decision) => <li key={decision.statement}><strong>{decision.statement}</strong><p>{decision.explanation}</p></li>)}</ol>
      </section>

      <section className="qa-evidence" aria-labelledby="wiki-title-evidence">
        <header className="qa-evidence-heading">
          <p>{content.evidence.eyebrow}</p>
          <h2 id="wiki-title-evidence">{content.evidence.title}</h2>
          <span>{content.evidence.snapshot}</span>
        </header>

        <div className="qa-status"><header><span>구현한 흐름</span><strong>{content.implementationStatus.state}</strong></header><ul>{content.implementationStatus.items.map((item) => <li key={item}>{item}</li>)}</ul><p><span>운영 설계</span>{content.implementationStatus.runtime}</p>{content.implementationStatus.feedback ? <p><span>{content.implementationStatus.feedback.label}</span>{content.implementationStatus.feedback.text}</p> : null}</div>
      </section>

      <footer className="qa-boundary">
        <div className="qa-boundary-heading"><p>{content.boundary.eyebrow}</p><h2>{content.boundary.statement}</h2></div>
        <ul className="qa-boundary-list">{content.boundary.items.map((item) => <li key={item}>{item}</li>)}</ul>
        <nav className="qa-related" aria-label="Wiki와 연결된 시스템">
          <p>연결된 설계 방식</p>
          {content.relatedSystems.map((system) => system.href ? (
            <Link to={system.href} key={system.title}><span><strong>{system.title}</strong><small>{system.relation}</small></span><b aria-hidden="true">↗</b></Link>
          ) : (
            <div key={system.title}><span><strong>{system.title}</strong><small>{system.relation}</small></span><b>PAGE IN DEVELOPMENT</b></div>
          ))}
        </nav>
      </footer>
    </main>
  )
}

export default WikiPage
