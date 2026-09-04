import { Link } from 'react-router'
import type {
  AiCandidateReviewHotspotId,
  AiCandidateReviewPageContent,
} from '../../content/content-types.ts'
import {
  ProductInspectionFrame,
  ProductWorkflow,
} from '../product-case/AnnotatedProductSurface.tsx'
import useProductInspectionState from '../product-case/useProductInspectionState.ts'
import AiCandidateReviewProductView from './AiCandidateReviewProductView.tsx'

interface AiCandidateReviewPageProps {
  readonly content: AiCandidateReviewPageContent
}

function EvolutionFragment({
  visual,
}: {
  readonly visual: AiCandidateReviewPageContent['evolution']['scenes'][number]['visual']
}) {
  switch (visual) {
    case 'inline-card':
      return <div className="acr-evolution-fragment" data-visual={visual} aria-hidden="true"><span>CHAT</span><i>×</i><strong>QUEUE</strong></div>
    case 'target-source':
      return <div className="acr-evolution-fragment" data-visual={visual} aria-hidden="true"><span>CONTEXT</span><i>≠</i><strong>TARGET</strong></div>
    case 'multi-source':
      return <div className="acr-evolution-fragment" data-visual={visual} aria-hidden="true"><span>CHAT</span><span>TEAMS</span><span>MEETING</span><i>→</i><strong>PENDING</strong></div>
    case 'knowledge-gate':
      return <div className="acr-evolution-fragment" data-visual={visual} aria-hidden="true"><span>PENDING</span><i>⌁</i><strong>REVIEW ROLE</strong></div>
    case 'registry':
      return <div className="acr-evolution-fragment" data-visual={visual} aria-hidden="true"><span>PROJECT?</span><i>→</i><strong>REGISTRY</strong></div>
  }
}

function AiCandidateReviewPage({ content }: AiCandidateReviewPageProps) {
  const {
    activeHotspotId,
    interactionMode,
    activateHotspot,
    clearPointerPreview,
    clearFocusPreview,
  } = useProductInspectionState<AiCandidateReviewHotspotId>()
  const activeAnnotation = content.annotations.find(
    (annotation) => annotation.id === activeHotspotId,
  )

  return (
    <main className="ai-candidate-review-page" id="main-content">
      <section className="acr-hero" aria-labelledby="ai-candidate-review-title">
        <div className="acr-hero-frame">
          <Link className="acr-back" to="/">
            <span aria-hidden="true">←</span> WHAT I BUILT
          </Link>

          <header className="acr-hero-heading">
            <div>
              <p>{content.hero.eyebrow}</p>
              <h1 id="ai-candidate-review-title">
                {content.hero.titleLines.map((line) => <span key={line}>{line}</span>)}
              </h1>
            </div>
            <div className="acr-hero-thesis">
              <strong>{content.hero.thesis}</strong>
              <p>{content.hero.summary}</p>
              <aside>
                <small>{content.hero.problemLabel}</small>
                <span>{content.hero.problem}</span>
              </aside>
            </div>
          </header>

          <section className="acr-inspection" aria-labelledby="acr-inspection-title">
            <header className="acr-inspection-heading">
              <p>{content.inspection.eyebrow}</p>
              <h2 id="acr-inspection-title">{content.inspection.title}</h2>
              <span>{content.inspection.instruction}</span>
            </header>

            <ProductInspectionFrame
              activeAnnotation={activeAnnotation}
              defaultAnnotation={content.inspection.defaultAnnotation}
              disclosure={content.meta.disclosure}
              surfaceLabel="AI Candidate Review 재구성 제품 화면과 editorial annotation"
              evolutionTargetId="ai-candidate-review-evolution"
              interactionMode={interactionMode}
              onPointerPreviewEnd={clearPointerPreview}
              onFocusPreviewEnd={clearFocusPreview}
            >
              <AiCandidateReviewProductView
                fixture={content.product}
                activeId={activeHotspotId}
                onActivate={activateHotspot}
              />
            </ProductInspectionFrame>
          </section>
        </div>
      </section>

      <section className="acr-workflow-section" aria-labelledby="acr-workflow-title">
        <header className="acr-section-heading">
          <p>{content.workflow.eyebrow}</p>
          <h2 id="acr-workflow-title">{content.workflow.title}</h2>
          <span>{content.workflow.introduction}</span>
        </header>
        <ProductWorkflow
          steps={content.workflow.steps}
          activeId={activeHotspotId}
          onActivate={activateHotspot}
          onPointerPreviewEnd={clearPointerPreview}
          onFocusPreviewEnd={clearFocusPreview}
        />
        <p className="acr-workflow-boundary">{content.workflow.boundary}</p>
      </section>

      <section className="acr-rules" aria-labelledby="acr-rules-title">
        <header>
          <p>{content.rules.eyebrow}</p>
          <h2 id="acr-rules-title">자동화가 강해질수록, 후보의 지위는 더 명확해야 한다.</h2>
        </header>
        <ol>
          {content.rules.items.map((rule) => (
            <li key={rule.statement}>
              <strong>{rule.statement}</strong>
              <p>{rule.explanation}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="acr-evolution"
        id="ai-candidate-review-evolution"
        aria-labelledby="acr-evolution-title"
      >
        <header className="acr-section-heading">
          <p>{content.evolution.eyebrow}</p>
          <h2 id="acr-evolution-title">{content.evolution.title}</h2>
          <span>{content.evolution.introduction}</span>
        </header>
        <ol className="acr-evolution-scenes">
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

      <section className="acr-evidence" aria-labelledby="acr-evidence-title">
        <header className="acr-evidence-heading">
          <p>{content.evidence.eyebrow}</p>
          <h2 id="acr-evidence-title">{content.evidence.title}</h2>
          <span>{content.evidence.snapshot}</span>
        </header>
        <dl className="acr-evidence-register">
          {content.evidence.items.map((item) => (
            <div key={item.label}>
              <dd>{item.value}</dd><dt>{item.label}</dt>
              <p>{item.meaning}</p><small>{item.boundary}</small>
            </div>
          ))}
        </dl>
        <div className="acr-status">
          <header><span>CURRENT STATUS</span><strong>{content.implementationStatus.state}</strong></header>
          <ul>{content.implementationStatus.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <p><span>RUNTIME / USE BOUNDARY</span>{content.implementationStatus.runtime}</p>
        </div>
      </section>

      <footer className="acr-boundary">
        <div className="acr-boundary-heading">
          <p>{content.boundary.eyebrow}</p>
          <h2>{content.boundary.statement}</h2>
        </div>
        <ul className="acr-boundary-list">
          {content.boundary.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <nav className="acr-related" aria-label="AI Candidate Review와 연결된 시스템">
          <p>RELATED SYSTEMS</p>
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

export default AiCandidateReviewPage
