import { Link } from 'react-router'
import type {
  FeatureValidationPageContent,
  FeatureValidationHotspotId,
} from '../../content/content-types.ts'
import {
  ProductInspectionFrame,
  ProductWorkflow,
} from '../product-case/AnnotatedProductSurface.tsx'
import useProductInspectionState from '../product-case/useProductInspectionState.ts'
import FeatureValidationProductView from './FeatureValidationProductView.tsx'

interface FeatureValidationPageProps {
  readonly content: FeatureValidationPageContent
}

function EvolutionFragment({
  visual,
}: {
  readonly visual: FeatureValidationPageContent['evolution']['scenes'][number]['visual']
}) {
  switch (visual) {
    case 'read-only':
      return (
        <div className="fv-evolution-fragment" data-visual={visual} aria-hidden="true">
          <span>SPEC</span>
          <i />
          <span>EVIDENCE</span>
          <strong>VIEW ONLY</strong>
        </div>
      )
    case 'unknown':
      return (
        <div className="fv-evolution-fragment" data-visual={visual} aria-hidden="true">
          <span>MISSING?</span>
          <i>→</i>
          <strong>UNKNOWN</strong>
        </div>
      )
    case 'human-link':
      return (
        <div className="fv-evolution-fragment" data-visual={visual} aria-hidden="true">
          <span>AI CANDIDATE</span>
          <i />
          <b>REJECT</b>
          <strong>CONFIRM</strong>
        </div>
      )
    case 'review-ui':
      return (
        <div className="fv-evolution-fragment" data-visual={visual} aria-hidden="true">
          <span>SEARCH</span>
          <i>+</i>
          <span>GROUP</span>
          <i>→</i>
          <strong>CONFIRM</strong>
        </div>
      )
  }
}

function FeatureValidationPage({ content }: FeatureValidationPageProps) {
  const {
    activeHotspotId,
    interactionMode,
    activateHotspot,
    clearPointerPreview,
    clearFocusPreview,
  } = useProductInspectionState<FeatureValidationHotspotId>()
  const activeAnnotation = content.annotations.find(
    (annotation) => annotation.id === activeHotspotId,
  )

  return (
    <main className="feature-validation-page" id="main-content">
      <section className="fv-hero" aria-labelledby="feature-validation-title">
        <div className="fv-hero-frame">
          <Link className="fv-back" to="/">
            <span aria-hidden="true">←</span> WHAT I BUILT
          </Link>

          <header className="fv-hero-heading">
            <div>
              <p>{content.hero.eyebrow}</p>
              <h1 id="feature-validation-title">
                {content.hero.titleLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
            </div>

            <div className="fv-hero-thesis">
              <strong>{content.hero.thesis}</strong>
              <p>{content.hero.summary}</p>
              <aside>
                <small>{content.hero.problemLabel}</small>
                <span>{content.hero.problem}</span>
              </aside>
            </div>
          </header>

          <section
            className="fv-inspection"
            id="product-inspection"
            aria-labelledby="product-inspection-title"
          >
            <header className="fv-inspection-heading">
              <p>{content.inspection.eyebrow}</p>
              <h2 id="product-inspection-title">{content.inspection.title}</h2>
              <span>{content.inspection.instruction}</span>
            </header>

            <ProductInspectionFrame
              activeAnnotation={activeAnnotation}
              defaultAnnotation={content.inspection.defaultAnnotation}
              disclosure={content.meta.disclosure}
              surfaceLabel="Feature Validation 재구성 제품 화면과 editorial annotation"
              evolutionTargetId="feature-validation-evolution"
              interactionMode={interactionMode}
              onPointerPreviewEnd={clearPointerPreview}
              onFocusPreviewEnd={clearFocusPreview}
            >
              <FeatureValidationProductView
                fixture={content.product}
                activeId={activeHotspotId}
                onActivate={activateHotspot}
              />
            </ProductInspectionFrame>
          </section>
        </div>
      </section>

      <section className="fv-workflow-section" aria-labelledby="fv-workflow-title">
        <header className="fv-section-heading">
          <p>{content.workflow.eyebrow}</p>
          <h2 id="fv-workflow-title">{content.workflow.title}</h2>
          <span>{content.workflow.introduction}</span>
        </header>

        <ProductWorkflow
          steps={content.workflow.steps}
          activeId={activeHotspotId}
          onActivate={activateHotspot}
          onPointerPreviewEnd={clearPointerPreview}
          onFocusPreviewEnd={clearFocusPreview}
        />

        <p className="fv-workflow-boundary">{content.workflow.boundary}</p>
      </section>

      <section className="fv-decisions" aria-labelledby="fv-decisions-title">
        <div className="fv-decisions-heading">
          <p>{content.decisions.eyebrow}</p>
          <h2 id="fv-decisions-title">판정을 늘리는 대신, 판정할 수 있는 조건을 좁혔다.</h2>
        </div>

        <ol>
          {content.decisions.items.map((decision) => (
            <li key={decision.statement}>
              <strong>{decision.statement}</strong>
              <p>{decision.explanation}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="fv-evolution"
        id="feature-validation-evolution"
        aria-labelledby="fv-evolution-title"
      >
        <header className="fv-section-heading">
          <p>{content.evolution.eyebrow}</p>
          <h2 id="fv-evolution-title">{content.evolution.title}</h2>
          <span>{content.evolution.introduction}</span>
        </header>

        <ol className="fv-evolution-scenes">
          {content.evolution.scenes.map((scene) => (
            <li key={`${scene.date}-${scene.label}`}>
              <header>
                <time>{scene.date}</time>
                <span>{scene.label}</span>
              </header>
              <EvolutionFragment visual={scene.visual} />
              <strong>{scene.decision}</strong>
              <dl>
                <div>
                  <dt>TRIGGER</dt>
                  <dd>{scene.trigger}</dd>
                </div>
                <div>
                  <dt>CHANGE</dt>
                  <dd>{scene.change}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="fv-evidence" aria-labelledby="fv-evidence-title">
        <div className="fv-evidence-heading">
          <p>{content.evidence.eyebrow}</p>
          <h2 id="fv-evidence-title">{content.evidence.title}</h2>
          <span>{content.evidence.snapshot}</span>
        </div>

        <dl className="fv-evidence-register">
          {content.evidence.items.map((item) => (
            <div key={item.label}>
              <dd>{item.value}</dd>
              <dt>{item.label}</dt>
              <p>{item.meaning}</p>
              <small>{item.boundary}</small>
            </div>
          ))}
        </dl>

        <div className="fv-status-grid">
          <section>
            <header>
              <span>{content.implementationStatus.implemented.label}</span>
              <strong>{content.implementationStatus.implemented.phase}</strong>
            </header>
            <ul>
              {content.implementationStatus.implemented.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <header>
              <span>{content.implementationStatus.remaining.label}</span>
              <strong>{content.implementationStatus.remaining.phase}</strong>
            </header>
            <ul>
              {content.implementationStatus.remaining.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <p className="fv-runtime-boundary">
          <span>RUNTIME / USE BOUNDARY</span>
          {content.implementationStatus.runtime}
        </p>
      </section>

      <footer className="fv-boundary">
        <div className="fv-boundary-heading">
          <p>{content.boundary.eyebrow}</p>
          <h2>{content.boundary.statement}</h2>
        </div>

        <ul className="fv-boundary-list">
          {content.boundary.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <nav className="fv-related" aria-label="Feature Validation과 연결된 시스템">
          <p>RELATED SYSTEMS</p>
          {content.relatedSystems.map((system) =>
            system.href ? (
              <Link to={system.href} key={system.title}>
                <span>
                  <strong>{system.title}</strong>
                  <small>{system.relation}</small>
                </span>
                <b aria-hidden="true">↗</b>
              </Link>
            ) : (
              <div key={system.title}>
                <span>
                  <strong>{system.title}</strong>
                  <small>{system.relation}</small>
                </span>
                <b>PAGE IN DEVELOPMENT</b>
              </div>
            ),
          )}
        </nav>
      </footer>
    </main>
  )
}

export default FeatureValidationPage
