import { Link } from 'react-router'
import type { ScheduleEvolutionVisual, SchedulePageContent } from '../../content/content-types.ts'
import ScheduleSurfaceWorkflow from './ScheduleSurfaceWorkflow.tsx'

function ScheduleEvolutionFragment({ visual }: { readonly visual: ScheduleEvolutionVisual }) {
  if (visual === 'canonical') return <div className="qa-evolution-fragment"><span>EXCEL</span><i>HISTORY</i><strong>PLAN</strong></div>
  if (visual === 'proposal') return <div className="qa-evolution-fragment"><span>REQUEST</span><i>→</i><strong>STAGE</strong><i>→</i><span>APPLY</span></div>
  if (visual === 'role-scope') return <div className="qa-evolution-fragment"><strong>EDITOR</strong><i>/</i><span>VIEW ONLY</span></div>
  if (visual === 'actual-line') return <div className="qa-evolution-fragment"><span>PLAN ━━━</span><strong>ACTUAL ━</strong></div>
  return <div className="qa-evolution-fragment"><span>FILTER</span><i>URL</i><strong>DISPLAY NAME</strong></div>
}

function SchedulePage({ content }: { readonly content: SchedulePageContent }) {
  const pageClassName = 'schedule-page'
  const titleId = 'schedule-title'
  const evolutionTargetId = 'schedule-evolution'
  const relatedLabel = '일정 조망과 연결된 시스템'
  const renderEvolutionFragment = (visual: ScheduleEvolutionVisual) => <ScheduleEvolutionFragment visual={visual} />

  return (
    <main className={`qa-page ${pageClassName}`} id="main-content">
      <section className="qa-hero" aria-labelledby={titleId}>
        <div className="qa-hero-frame">
          <Link className="qa-back" to="/"><span aria-hidden="true">←</span> WHAT I BUILT</Link>
          <header className="qa-hero-heading">
            <div><p>{content.hero.eyebrow}</p><h1 id={titleId}>{content.hero.titleLines.map((line) => <span key={line}>{line}</span>)}</h1></div>
            <div className="qa-hero-thesis"><strong>{content.hero.thesis}</strong><p>{content.hero.summary}</p><aside><small>{content.hero.problemLabel}</small><span>{content.hero.problem}</span></aside></div>
          </header>
        </div>
      </section>

      <ScheduleSurfaceWorkflow content={content} />

      <section className="qa-decisions" aria-labelledby={`${titleId}-decisions`}>
        <header><p>{content.decisions.eyebrow}</p><h2 id={`${titleId}-decisions`}>{content.decisions.title}</h2></header>
        <ol>{content.decisions.items.map((decision) => <li key={decision.statement}><strong>{decision.statement}</strong><p>{decision.explanation}</p></li>)}</ol>
      </section>

      {content.evolution && evolutionTargetId && renderEvolutionFragment ? (
        <section className="qa-evolution" id={evolutionTargetId} aria-labelledby={`${titleId}-evolution`}>
          <header className="qa-section-heading"><p>{content.evolution.eyebrow}</p><h2 id={`${titleId}-evolution`}>{content.evolution.title}</h2><span>{content.evolution.introduction}</span></header>
          <ol className="qa-evolution-scenes">
            {content.evolution.scenes.map((scene) => (
              <li key={`${scene.date}-${scene.label}`}>
                <header><time>{scene.date}</time><span>{scene.label}</span></header>
                {renderEvolutionFragment(scene.visual)}
                <strong>{scene.decision}</strong>
                <dl><div><dt>변경 계기</dt><dd>{scene.trigger}</dd></div><div><dt>바꾼 점</dt><dd>{scene.change}</dd></div><div><dt>현재 구조</dt><dd>{scene.currentEffect}</dd></div></dl>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className="qa-evidence" aria-labelledby={`${titleId}-evidence`}>
        {content.evidence.items.length > 0 ? <><header className="qa-evidence-heading"><p>{content.evidence.eyebrow}</p><h2 id={`${titleId}-evidence`}>{content.evidence.title}</h2><span>{content.evidence.snapshot}</span></header>
        <dl className="qa-evidence-register">{content.evidence.items.map((item) => <div key={item.label}><dd>{item.value}</dd><dt>{item.label}</dt><p>{item.meaning}</p><small>{item.boundary}</small></div>)}</dl></> : <h2 className="visually-hidden" id={`${titleId}-evidence`}>구현·운영 상태</h2>}
        <div className="qa-status"><header><span>구현·운영 상태</span><strong>{content.implementationStatus.state}</strong></header><ul>{content.implementationStatus.items.map((item) => <li key={item}>{item}</li>)}</ul><p><span>확인한 운영 범위</span>{content.implementationStatus.runtime}</p>{content.implementationStatus.feedback ? <p><span>{content.implementationStatus.feedback.label}</span>{content.implementationStatus.feedback.text}</p> : null}</div>
      </section>

      <footer className="qa-boundary">
        <div className="qa-boundary-heading"><p>{content.boundary.eyebrow}</p><h2>{content.boundary.statement}</h2></div>
        {content.boundary.items.length > 0 ? <ul className="qa-boundary-list">{content.boundary.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
        <nav className="qa-related" aria-label={relatedLabel}>
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

export default SchedulePage
