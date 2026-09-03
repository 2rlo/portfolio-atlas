import { useState } from 'react'
import { Link } from 'react-router'
import type {
  AiNativeEngineeringContent,
  AiNativeWorkflowStep,
} from '../../content/content-types.ts'

interface AiNativeEngineeringPageProps {
  readonly content: AiNativeEngineeringContent
}

interface WorkflowDetailProps {
  readonly step: AiNativeWorkflowStep
}

function WorkflowDetail({ step }: WorkflowDetailProps) {
  return (
    <article
      className="ai-native-step-detail"
      id="ai-native-step-panel"
      aria-labelledby={`ai-native-step-${step.id}`}
      aria-live="polite"
      data-step={step.id}
      data-state={step.state}
    >
      <header className="ai-native-step-heading">
        <p>
          CURRENT STEP <span>/ {step.state}</span>
        </p>
        <h3>{step.label}</h3>
        <strong>{step.summary}</strong>
      </header>

      <div className="ai-native-step-evidence">
        <section>
          <h4>ACTION</h4>
          <p>{step.action}</p>
        </section>
        <section>
          <h4>PROOF</h4>
          <p>{step.proof}</p>
        </section>
        <section>
          <h4>EXIT RULE</h4>
          <p>{step.exitRule}</p>
        </section>
      </div>

      {step.codemapUse ? (
        <aside className="ai-native-step-context">
          <div>
            <small>CODEMAP IN THIS STEP</small>
            <p>{step.codemapUse}</p>
          </div>
          <Link to="/how/documentation-system/artifacts/codemap">
            공개 Codemap 살펴보기 <span aria-hidden="true">↗</span>
          </Link>
        </aside>
      ) : (
        <aside className="ai-native-step-context">
          <div>
            <small>STATE BOUNDARY</small>
            <p>다음 검증 또는 사람의 판단을 통과하기 전까지 이 결과는 기준 맥락이 아니다.</p>
          </div>
        </aside>
      )}
    </article>
  )
}

function AiNativeEngineeringPage({ content }: AiNativeEngineeringPageProps) {
  const [activeStepId, setActiveStepId] = useState(
    () => content.scene.steps[0]?.id ?? '',
  )
  const activeStep =
    content.scene.steps.find((step) => step.id === activeStepId) ??
    content.scene.steps[0]

  return (
    <main className="ai-native-page" id="main-content">
      <section className="ai-native-hero" aria-labelledby="ai-native-title">
        <Link className="ai-native-back" to="/">
          <span aria-hidden="true">←</span> HOW I BUILD
        </Link>

        <div className="ai-native-hero-layout">
          <header className="ai-native-hero-heading">
            <p>{content.hero.eyebrow}</p>
            <h1 id="ai-native-title">
              {content.hero.titleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <div className="ai-native-thesis">
              <strong>{content.hero.thesis}</strong>
              <p>{content.hero.summary}</p>
              <small>{content.meta.disclosure}</small>
            </div>
          </header>

          <aside className="ai-native-manifest" aria-label="AI 작업 전 context manifest">
            <header>
              <p>{content.hero.manifest.eyebrow}</p>
              <h2>{content.hero.manifest.title}</h2>
            </header>
            <ol>
              {content.hero.manifest.items.map((item) => (
                <li key={item.index}>
                  <span>{item.index}</span>
                  <div>
                    <small>{item.label}</small>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <ul aria-label={`${item.title}이 제공하는 맥락`}>
                      {item.signals.map((signal) => (
                        <li key={signal}>{signal}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
            <footer>
              <span>{content.hero.manifest.statusLabel}</span>
              <strong>{content.hero.manifest.status}</strong>
            </footer>
          </aside>
        </div>
      </section>

      <section className="ai-native-scene" aria-labelledby="ai-scene-title">
        <header className="ai-native-section-heading">
          <p>{content.scene.eyebrow}</p>
          <h2 id="ai-scene-title">{content.scene.title}</h2>
          <span>{content.scene.situation}</span>
        </header>

        <aside className="ai-native-tool-rule">
          <p>TOOL SELECTION / TASK FIRST</p>
          <strong>{content.scene.toolRule}</strong>
        </aside>

        <div className="ai-native-state-legend" aria-label="작업 결과의 상태 구분">
          {content.scene.stateLegend.map((item) => (
            <span data-state={item.state} key={item.state}>
              {item.label}
            </span>
          ))}
        </div>

        <div className="ai-native-workbench">
          <ol className="ai-native-steps" aria-label="AI-native engineering workflow">
            {content.scene.steps.map((step, index) => (
              <li data-state={step.state} key={step.id}>
                <button
                  type="button"
                  id={`ai-native-step-${step.id}`}
                  aria-controls="ai-native-step-panel"
                  aria-pressed={step.id === activeStep?.id}
                  onClick={() => setActiveStepId(step.id)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step.label}</strong>
                  <small>{step.summary}</small>
                </button>
              </li>
            ))}
          </ol>

          {activeStep ? <WorkflowDetail step={activeStep} /> : null}
        </div>
      </section>

      <section className="ai-native-incident" aria-labelledby="ai-incident-title">
        <div className="ai-native-incident-inner">
          <header className="ai-native-incident-heading">
            <p>{content.incident.eyebrow}</p>
            <h2 id="ai-incident-title">{content.incident.title}</h2>
            <span>{content.incident.summary}</span>
          </header>

          <div className="ai-native-incident-record">
            <section className="ai-native-hypotheses" aria-labelledby="incident-symptom-title">
              <p id="incident-symptom-title">SYMPTOM</p>
              <strong>{content.incident.symptom}</strong>
              <p>COMPETING HYPOTHESES</p>
              <ol>
                {content.incident.hypotheses.map((hypothesis, index) => (
                  <li key={hypothesis}>
                    <span>{String.fromCharCode(65 + index)}</span>
                    {hypothesis}
                  </li>
                ))}
              </ol>
            </section>

            <div className="ai-native-baseline-comparison" aria-label="격리 worktree와 clean baseline 비교">
              {content.incident.comparison.map((item) => (
                <article data-baseline={item.id} key={item.id}>
                  <header>
                    <p>{item.label}</p>
                    <strong>{item.state}</strong>
                  </header>
                  <p>{item.observation}</p>
                </article>
              ))}
            </div>

            <dl className="ai-native-incident-findings">
              <div>
                <dt>EVIDENCE</dt>
                <dd>{content.incident.evidence}</dd>
              </div>
              <div>
                <dt>DECISION</dt>
                <dd>{content.incident.decision}</dd>
              </div>
            </dl>

            <p className="ai-native-incident-rule">
              {content.incident.rule.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="ai-native-artifacts" aria-labelledby="ai-artifacts-title">
        <header className="ai-native-artifacts-heading">
          <p>{content.artifacts.eyebrow}</p>
          <h2 id="ai-artifacts-title">{content.artifacts.title}</h2>
          <span>{content.artifacts.introduction}</span>
        </header>

        <ol className="ai-native-artifact-register">
          {content.artifacts.items.map((artifact) => (
            <li key={artifact.index}>
              <div className="ai-native-artifact-index">
                <span>{artifact.index}</span>
                <small>{artifact.label}</small>
              </div>
              <div className="ai-native-artifact-copy">
                <h3>{artifact.title}</h3>
                <strong>{artifact.question}</strong>
                <p>{artifact.responsibility}</p>
                {artifact.fields ? (
                  <ul aria-label={`${artifact.title}의 공개 필드`}>
                    {artifact.fields.map((field) => (
                      <li key={field}>{field}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="ai-native-artifact-maintenance">
                <small>UPDATE WHEN</small>
                <p>{artifact.maintenance}</p>
                {artifact.href ? (
                  <Link to={artifact.href}>
                    Artifact 열기 <span aria-hidden="true">↗</span>
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="ai-native-boundary">
        <div className="ai-native-boundary-heading">
          <p>{content.principle.eyebrow}</p>
          <h2>{content.principle.statement}</h2>
          <span>{content.principle.explanation}</span>
        </div>

        <aside className="ai-native-current-rule">
          <p>{content.principle.maintenanceRule.label}</p>
          <strong>{content.principle.maintenanceRule.statement}</strong>
          <span>{content.principle.maintenanceRule.detail}</span>
        </aside>

        <ul className="ai-native-boundary-list">
          {content.principle.boundary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="ai-native-applied-boundary">
          <p>APPLIED IN / ROUTE BOUNDARY</p>
          <span>{content.principle.appliedIn}</span>
        </div>

        <nav className="ai-native-cross-links" aria-label="연결된 HOW I BUILD 페이지">
          <Link to="/how/documentation-system">
            <span aria-hidden="true">←</span> Documentation System
          </Link>
          <Link to="/how/documentation-system/artifacts/codemap">
            Codemap artifact <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </footer>
    </main>
  )
}

export default AiNativeEngineeringPage
