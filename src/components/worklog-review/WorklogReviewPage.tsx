import { Link } from 'react-router'
import type { WorklogReviewPageContent } from '../../content/content-types.ts'
import WorklogReviewSurfaceWorkflow from './WorklogReviewSurfaceWorkflow.tsx'

interface WorklogReviewPageProps {
  readonly content: WorklogReviewPageContent
}

function EvolutionFragment({
  visual,
}: {
  readonly visual: WorklogReviewPageContent['evolution']['scenes'][number]['visual']
}) {
  const fragments = {
    'review-level': ['L1', 'L2', 'L3'],
    'readable-body': ['FIELDS', '→', 'BODY'],
    fallback: ['0 REVIEWED', '→', 'LABELED DRAFT'],
    glossary: ['RAW TERM', '+', 'GLOSSARY'],
    anomaly: ['FIX', '≠', 'OLD ROWS'],
  } as const

  return (
    <div className="wl-evolution-fragment" data-visual={visual} aria-hidden="true">
      <span>{fragments[visual][0]}</span><i>{fragments[visual][1]}</i><strong>{fragments[visual][2]}</strong>
    </div>
  )
}

function WorklogReviewPage({ content }: WorklogReviewPageProps) {
  return (
    <main className="worklog-review-page" id="main-content">
      <section className="wl-hero" aria-labelledby="worklog-review-title">
        <div className="wl-hero-frame">
          <Link className="wl-back" to="/"><span aria-hidden="true">←</span> WHAT I BUILT</Link>
          <header className="wl-hero-heading">
            <div><p>{content.hero.eyebrow}</p><h1 id="worklog-review-title">{content.hero.titleLines.map((line) => <span key={line}>{line}</span>)}</h1></div>
            <div className="wl-hero-thesis">
              <strong>{content.hero.thesis}</strong><p>{content.hero.summary}</p>
              <aside><small>{content.hero.problemLabel}</small><span>{content.hero.problem}</span></aside>
            </div>
          </header>

        </div>
      </section>

      <WorklogReviewSurfaceWorkflow content={content} />

      <section className="wl-rules" aria-labelledby="wl-rules-title">
        <header><p>{content.rules.eyebrow}</p><h2 id="wl-rules-title">{content.rules.title}</h2></header>
        <ol>{content.rules.items.map((rule) => <li key={rule.statement}><strong>{rule.statement}</strong><p>{rule.explanation}</p></li>)}</ol>
      </section>

      <section className="wl-evolution" id="worklog-review-evolution" aria-labelledby="wl-evolution-title">
        <header className="wl-section-heading"><p>{content.evolution.eyebrow}</p><h2 id="wl-evolution-title">{content.evolution.title}</h2><span>{content.evolution.introduction}</span></header>
        <ol className="wl-evolution-scenes">
          {content.evolution.scenes.map((scene) => (
            <li key={`${scene.date}-${scene.label}`}>
              <header><time>{scene.date}</time><span>{scene.label}</span></header>
              <EvolutionFragment visual={scene.visual} />
              <strong>{scene.decision}</strong>
              <dl><div><dt>TRIGGER</dt><dd>{scene.trigger}</dd></div><div><dt>CHANGE</dt><dd>{scene.change}</dd></div><div><dt>CURRENT EFFECT</dt><dd>{scene.currentEffect}</dd></div></dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="wl-evidence" aria-labelledby="wl-evidence-title">
        <header className="wl-evidence-heading"><p>{content.evidence.eyebrow}</p><h2 id="wl-evidence-title">{content.evidence.title}</h2><span>{content.evidence.snapshot}</span></header>
        <dl className="wl-evidence-register">
          {content.evidence.items.map((item) => <div key={item.label}><dd>{item.value}</dd><dt>{item.label}</dt><p>{item.meaning}</p><small>{item.boundary}</small></div>)}
        </dl>
        <div className="wl-status">
          <header><span>CURRENT STATUS</span><strong>{content.implementationStatus.state}</strong></header>
          <ul>{content.implementationStatus.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <p><span>RUNTIME / USE BOUNDARY</span>{content.implementationStatus.runtime}</p>
          {content.implementationStatus.feedback ? <p><span>{content.implementationStatus.feedback.label}</span>{content.implementationStatus.feedback.text}</p> : null}
        </div>
      </section>

      <footer className="wl-boundary">
        <div className="wl-boundary-heading"><p>{content.boundary.eyebrow}</p><h2>{content.boundary.statement}</h2></div>
        <ul className="wl-boundary-list">{content.boundary.items.map((item) => <li key={item}>{item}</li>)}</ul>
        <nav className="wl-related" aria-label="Worklog Review와 연결된 시스템">
          <p>RELATED SYSTEMS</p>
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

export default WorklogReviewPage
