import { Link } from 'react-router'
import type { ProjectSettingPageContent } from '../../content/content-types.ts'
import ProjectSettingSurfaceWorkflow from './ProjectSettingSurfaceWorkflow.tsx'

interface ProjectSettingPageProps {
  readonly content: ProjectSettingPageContent
}

function EvolutionFragment({
  visual,
}: {
  readonly visual: ProjectSettingPageContent['evolution']['scenes'][number]['visual']
}) {
  const fragments = {
    separate: ['PROJECT DATA', '≠', 'ACCESS'],
    registry: ['STRING LISTS', '→', 'REGISTRY'],
    consumers: ['REGISTRY', '→', '5 SURFACES'],
    provenance: ['STATE', '+', 'EVENT'],
  } as const

  return (
    <div className="ps-evolution-fragment" data-visual={visual} aria-hidden="true">
      <span>{fragments[visual][0]}</span><i>{fragments[visual][1]}</i><strong>{fragments[visual][2]}</strong>
    </div>
  )
}

function ProjectSettingPage({ content }: ProjectSettingPageProps) {
  return (
    <main className="project-setting-page" id="main-content">
      <section className="ps-hero" aria-labelledby="project-setting-title">
        <div className="ps-hero-frame">
          <Link className="ps-back" to="/"><span aria-hidden="true">←</span> WHAT I BUILT</Link>
          <header className="ps-hero-heading">
            <div>
              <p>{content.hero.eyebrow}</p>
              <h1 id="project-setting-title">
                {content.hero.titleLines.map((line) => <span key={line}>{line}</span>)}
              </h1>
            </div>
            <div className="ps-hero-thesis">
              <strong>{content.hero.thesis}</strong>
              <p>{content.hero.summary}</p>
              <aside><small>{content.hero.problemLabel}</small><span>{content.hero.problem}</span></aside>
            </div>
          </header>

        </div>
      </section>

      <ProjectSettingSurfaceWorkflow content={content} />

      <section className="ps-rules" aria-labelledby="ps-rules-title">
        <header><p>{content.rules.eyebrow}</p><h2 id="ps-rules-title">{content.rules.title}</h2></header>
        <ol>
          {content.rules.items.map((rule) => (
            <li key={rule.statement}><strong>{rule.statement}</strong><p>{rule.explanation}</p></li>
          ))}
        </ol>
      </section>

      <section className="ps-evolution" id="project-setting-evolution" aria-labelledby="ps-evolution-title">
        <header className="ps-section-heading">
          <p>{content.evolution.eyebrow}</p>
          <h2 id="ps-evolution-title">{content.evolution.title}</h2>
          <span>{content.evolution.introduction}</span>
        </header>
        <ol className="ps-evolution-scenes">
          {content.evolution.scenes.map((scene) => (
            <li key={`${scene.date}-${scene.label}`}>
              <header><time>{scene.date}</time><span>{scene.label}</span></header>
              <EvolutionFragment visual={scene.visual} />
              <strong>{scene.decision}</strong>
              <dl>
                <div><dt>TRIGGER</dt><dd>{scene.trigger}</dd></div>
                <div><dt>CHANGE</dt><dd>{scene.change}</dd></div>
                <div><dt>CURRENT EFFECT</dt><dd>{scene.currentEffect}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="ps-evidence" aria-labelledby="ps-evidence-title">
        {content.evidence.items.length > 0 ? <><header className="ps-evidence-heading">
          <p>{content.evidence.eyebrow}</p>
          <h2 id="ps-evidence-title">{content.evidence.title}</h2>
          <span>{content.evidence.snapshot}</span>
        </header>
        <dl className="ps-evidence-register">
          {content.evidence.items.map((item) => (
            <div key={item.label}><dd>{item.value}</dd><dt>{item.label}</dt><p>{item.meaning}</p><small>{item.boundary}</small></div>
          ))}
        </dl></> : <h2 className="visually-hidden" id="ps-evidence-title">구현·운영 상태</h2>}
        <div className="ps-status">
          <header><span>CURRENT STATUS</span><strong>{content.implementationStatus.state}</strong></header>
          <ul>{content.implementationStatus.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <p><span>RUNTIME / USE BOUNDARY</span>{content.implementationStatus.runtime}</p>
        </div>
      </section>

      <footer className="ps-boundary">
        <div className="ps-boundary-heading"><p>{content.boundary.eyebrow}</p><h2>{content.boundary.statement}</h2></div>
        <ul className="ps-boundary-list">{content.boundary.items.map((item) => <li key={item}>{item}</li>)}</ul>
        <nav className="ps-related" aria-label="프로젝트 설정과 연결된 시스템">
          <p>RELATED SYSTEMS</p>
          {content.relatedSystems.map((system) => system.href ? (
            <Link to={system.href} key={system.title}>
              <span><strong>{system.title}</strong><small>{system.relation}</small></span><b aria-hidden="true">↗</b>
            </Link>
          ) : (
            <div key={system.title}>
              <span><strong>{system.title}</strong><small>{system.relation}</small></span><b>PAGE IN DEVELOPMENT</b>
            </div>
          ))}
        </nav>
      </footer>
    </main>
  )
}

export default ProjectSettingPage
