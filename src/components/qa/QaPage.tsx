import { Link } from 'react-router'
import type { QaPageContent } from '../../content/content-types.ts'
import QaSurfaceWorkflow from './QaSurfaceWorkflow.tsx'

interface QaPageProps {
  readonly content: QaPageContent
}

function EvolutionFragment({ visual }: { readonly visual: QaPageContent['evolution']['scenes'][number]['visual'] }) {
  if (visual === 'source-shape') return <div className="qa-evolution-fragment"><span>REPORT</span><i>→</i><span>CASE</span><i>→</i><span>RUN</span></div>
  if (visual === 'history') return <div className="qa-evolution-fragment"><span>R1</span><i>—</i><span>R2</span><i>—</i><strong>R3</strong></div>
  if (visual === 'role') return <div className="qa-evolution-fragment"><strong>QA</strong><span>WRITE</span><i>/</i><span>VIEWER</span><span>READ</span></div>
  if (visual === 'regenerate') return <div className="qa-evolution-fragment"><span>SOURCE</span><i>≠</i><strong>REGENERATE</strong></div>
  return <div className="qa-evolution-fragment"><span>DOC</span><i>RECOVERY</i><strong>DB</strong><i>CURRENT</i></div>
}

function QaPage({ content }: QaPageProps) {
  return (
    <main className="qa-page qa-case-page" id="main-content">
      <section className="qa-hero" aria-labelledby="qa-title">
        <div className="qa-hero-frame">
          <Link className="qa-back" to="/"><span aria-hidden="true">←</span> WHAT I BUILT</Link>
          <header className="qa-hero-heading">
            <div><p>{content.hero.eyebrow}</p><h1 id="qa-title">{content.hero.titleLines.map((line) => <span key={line}>{line}</span>)}</h1></div>
            <div className="qa-hero-thesis">
              <strong>{content.hero.thesis}</strong>
              <p>{content.hero.summary}</p>
              <aside><small>{content.hero.problemLabel}</small><span>{content.hero.problem}</span></aside>
            </div>
          </header>
        </div>
      </section>

      <QaSurfaceWorkflow content={content} />

      <section className="qa-decisions" aria-labelledby="qa-decisions-title">
        <header><p>{content.decisions.eyebrow}</p><h2 id="qa-decisions-title">{content.decisions.title}</h2></header>
        <ol>{content.decisions.items.map((decision) => <li key={decision.statement}><strong>{decision.statement}</strong><p>{decision.explanation}</p></li>)}</ol>
      </section>

      <section className="qa-evolution" id="qa-evolution" aria-labelledby="qa-evolution-title">
        <header className="qa-section-heading"><p>{content.evolution.eyebrow}</p><h2 id="qa-evolution-title">{content.evolution.title}</h2><span>{content.evolution.introduction}</span></header>
        <ol className="qa-evolution-scenes">
          {content.evolution.scenes.map((scene) => (
            <li key={`${scene.date}-${scene.label}`}>
              <header><time>{scene.date}</time><span>{scene.label}</span></header>
              <EvolutionFragment visual={scene.visual} />
              <strong>{scene.decision}</strong>
              <dl><div><dt>변경 계기</dt><dd>{scene.trigger}</dd></div><div><dt>바꾼 점</dt><dd>{scene.change}</dd></div><div><dt>달라진 점</dt><dd>{scene.currentEffect}</dd></div></dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="qa-work-changes" aria-labelledby="qa-title-changes">
        <header className="qa-section-heading">
          <p>{content.evidence.eyebrow}</p>
          <h2 id="qa-title-changes">{content.evidence.title}</h2>
          <span>{content.evidence.snapshot}</span>
        </header>
        <div className="qa-work-changes-body">
          <p>{content.implementationStatus.runtime}</p>
          <ul>{content.implementationStatus.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <footer className="qa-boundary">
        <div className="qa-boundary-heading"><p>{content.boundary.eyebrow}</p><h2>{content.boundary.statement}</h2></div>
        <ul className="qa-boundary-list">{content.boundary.items.map((item) => <li key={item}>{item}</li>)}</ul>
        <nav className="qa-related" aria-label="QA와 연결된 시스템">
          <p>이어지는 사례</p>
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

export default QaPage
