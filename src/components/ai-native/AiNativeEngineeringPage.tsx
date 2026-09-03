import { useState } from 'react'
import { Link } from 'react-router'
import type { AiNativeEngineeringContent } from '../../content/content-types.ts'

interface AiNativeEngineeringPageProps {
  readonly content: AiNativeEngineeringContent
}

function AiNativeEngineeringPage({ content }: AiNativeEngineeringPageProps) {
  const [activeStepId, setActiveStepId] = useState('scope')
  const activeStep = content.scene.steps.find((step) => step.id === activeStepId) ?? content.scene.steps[0]

  return (
    <main className="ai-native-page" id="main-content">
      <section className="ai-native-hero" aria-labelledby="ai-native-title">
        <Link className="ai-native-back" to="/"><span aria-hidden="true">←</span> HOW I BUILD</Link>
        <div className="ai-native-hero-layout">
          <header>
            <p>{content.hero.eyebrow}</p>
            <h1 id="ai-native-title">
              {content.hero.titleLines.map((line) => <span key={line}>{line}</span>)}
            </h1>
          </header>
          <div>
            <strong>{content.hero.thesis}</strong>
            <p>{content.hero.summary}</p>
            <small>{content.meta.disclosure}</small>
          </div>
        </div>
      </section>

      <section className="ai-native-scene" aria-labelledby="ai-scene-title">
        <header>
          <p>{content.scene.eyebrow}</p>
          <h2 id="ai-scene-title">{content.scene.title}</h2>
          <span>{content.scene.situation}</span>
        </header>

        <div className="ai-native-workbench">
          <ol className="ai-native-steps" aria-label="AI-native engineering workflow">
            {content.scene.steps.map((step, index) => (
              <li data-state={step.state} key={step.id}>
                <button
                  type="button"
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

          {activeStep ? (
            <article className="ai-native-step-detail" aria-live="polite" data-state={activeStep.state}>
              <p>CURRENT STEP / {activeStep.state}</p>
              <h3>{activeStep.label}</h3>
              <strong>{activeStep.summary}</strong>
              <span>{activeStep.detail}</span>
              {activeStep.codemapUse ? (
                <aside>
                  <small>CODEMAP IN THIS STEP</small>
                  <p>{activeStep.codemapUse}</p>
                  <Link to="/how/documentation-system/artifacts/codemap">공개 Codemap 살펴보기 <span aria-hidden="true">↗</span></Link>
                </aside>
              ) : (
                <aside>
                  <small>STATE BOUNDARY</small>
                  <p>이 단계의 결과는 다음 검증 또는 사람의 판단을 통과하기 전까지 기준 맥락이 아니다.</p>
                </aside>
              )}
            </article>
          ) : null}
        </div>
      </section>

      <footer className="ai-native-boundary">
        <p>BOUNDARY / CURRENT PRACTICE</p>
        <ul>{content.boundary.map((item) => <li key={item}>{item}</li>)}</ul>
        <Link to="/how/documentation-system"><span aria-hidden="true">←</span> Codemap을 소유하는 Documentation System</Link>
      </footer>
    </main>
  )
}

export default AiNativeEngineeringPage
