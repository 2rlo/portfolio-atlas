import { Link } from 'react-router'
import type { FeatureValidationPageContent } from '../../content/content-types.ts'
import FeatureValidationSurfaceWorkflow from './FeatureValidationSurfaceWorkflow.tsx'

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
        </div>
      </section>

      <FeatureValidationSurfaceWorkflow content={content} />

      <section className="fv-decisions" aria-labelledby="fv-decisions-title">
        <div className="fv-decisions-heading">
          <p>{content.decisions.eyebrow}</p>
          <h2 id="fv-decisions-title">판정 전에, 근거가 충분한지 확인한다.</h2>
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
                <b>페이지 준비 중</b>
              </div>
            ),
          )}
        </nav>
      </footer>
    </main>
  )
}

export default FeatureValidationPage
