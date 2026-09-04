import { useCallback, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import type { ReusableWhatCaseContent } from '../../content/content-types.ts'
import { ProductInspectionFrame, ProductWorkflow } from './AnnotatedProductSurface.tsx'

interface ReusableWhatCasePageProps<Id extends string, Product, Visual extends string> {
  readonly content: ReusableWhatCaseContent<Id, Product, Visual>
  readonly pageClassName: string
  readonly titleId: string
  readonly surfaceLabel: string
  readonly workflowLabel: string
  readonly evolutionTargetId?: string
  readonly relatedLabel: string
  readonly renderProduct: (props: {
    readonly fixture: Product
    readonly activeId: Id | null
    readonly onActivate: (id: Id) => void
  }) => ReactNode
  readonly renderEvolutionFragment?: (visual: Visual) => ReactNode
}

function ReusableWhatCasePage<Id extends string, Product, Visual extends string>({
  content,
  pageClassName,
  titleId,
  surfaceLabel,
  workflowLabel,
  evolutionTargetId,
  relatedLabel,
  renderProduct,
  renderEvolutionFragment,
}: ReusableWhatCasePageProps<Id, Product, Visual>) {
  const [activeHotspotId, setActiveHotspotId] = useState<Id | null>(null)
  const activeAnnotation = content.annotations.find((annotation) => annotation.id === activeHotspotId)
  const activateHotspot = useCallback((id: Id) => setActiveHotspotId(id), [])

  return (
    <main className={`qa-page ${pageClassName}`} id="main-content">
      <section className="qa-hero" aria-labelledby={titleId}>
        <div className="qa-hero-frame">
          <Link className="qa-back" to="/"><span aria-hidden="true">←</span> WHAT I BUILT</Link>
          <header className="qa-hero-heading">
            <div><p>{content.hero.eyebrow}</p><h1 id={titleId}>{content.hero.titleLines.map((line) => <span key={line}>{line}</span>)}</h1></div>
            <div className="qa-hero-thesis"><strong>{content.hero.thesis}</strong><p>{content.hero.summary}</p><aside><small>{content.hero.problemLabel}</small><span>{content.hero.problem}</span></aside></div>
          </header>

          <section className="qa-inspection" aria-labelledby={`${titleId}-inspection`}>
            <header className="qa-inspection-heading"><p>{content.inspection.eyebrow}</p><h2 id={`${titleId}-inspection`}>{content.inspection.title}</h2><span>{content.inspection.instruction}</span></header>
            <ProductInspectionFrame activeAnnotation={activeAnnotation} defaultAnnotation={content.inspection.defaultAnnotation} disclosure={content.meta.disclosure} surfaceLabel={surfaceLabel} evolutionTargetId={evolutionTargetId}>
              {renderProduct({ fixture: content.product, activeId: activeHotspotId, onActivate: activateHotspot })}
            </ProductInspectionFrame>
          </section>
        </div>
      </section>

      <section className="qa-workflow-section" aria-labelledby={`${titleId}-workflow`}>
        <header className="qa-section-heading"><p>{content.workflow.eyebrow}</p><h2 id={`${titleId}-workflow`}>{content.workflow.title}</h2><span>{content.workflow.introduction}</span></header>
        <ProductWorkflow steps={content.workflow.steps} activeId={activeHotspotId} onActivate={activateHotspot} ariaLabel={workflowLabel} />
        <p className="qa-workflow-boundary">{content.workflow.boundary}</p>
      </section>

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
                <dl><div><dt>TRIGGER</dt><dd>{scene.trigger}</dd></div><div><dt>CHANGE</dt><dd>{scene.change}</dd></div><div><dt>CURRENT EFFECT</dt><dd>{scene.currentEffect}</dd></div></dl>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className="qa-evidence" aria-labelledby={`${titleId}-evidence`}>
        <header className="qa-evidence-heading"><p>{content.evidence.eyebrow}</p><h2 id={`${titleId}-evidence`}>{content.evidence.title}</h2><span>{content.evidence.snapshot}</span></header>
        <dl className="qa-evidence-register">{content.evidence.items.map((item) => <div key={item.label}><dd>{item.value}</dd><dt>{item.label}</dt><p>{item.meaning}</p><small>{item.boundary}</small></div>)}</dl>
        <div className="qa-status"><header><span>CURRENT STATUS</span><strong>{content.implementationStatus.state}</strong></header><ul>{content.implementationStatus.items.map((item) => <li key={item}>{item}</li>)}</ul><p><span>RUNTIME / USE BOUNDARY</span>{content.implementationStatus.runtime}</p></div>
      </section>

      <footer className="qa-boundary">
        <div className="qa-boundary-heading"><p>{content.boundary.eyebrow}</p><h2>{content.boundary.statement}</h2></div>
        <ul className="qa-boundary-list">{content.boundary.items.map((item) => <li key={item}>{item}</li>)}</ul>
        <nav className="qa-related" aria-label={relatedLabel}>
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

export default ReusableWhatCasePage
