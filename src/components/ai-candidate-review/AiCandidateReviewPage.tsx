import { Link } from 'react-router'
import type {
  AiCandidateReviewPageContent,
  RecordExecutionContent,
} from '../../content/content-types.ts'
import AiReviewSurfaceWorkflow from './AiReviewSurfaceWorkflow.tsx'

interface AiCandidateReviewPageProps {
  readonly content: AiCandidateReviewPageContent
  readonly recordExecution: RecordExecutionContent
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

function AiCandidateReviewPage({ content, recordExecution }: AiCandidateReviewPageProps) {
  return (
    <main className="ai-candidate-review-page" id="main-content" data-workflow-layout="sticky">
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

        </div>
      </section>

      <AiReviewSurfaceWorkflow content={content} />

      <section className="acr-record-execution" aria-labelledby="acr-record-execution-title">
        <header className="acr-section-heading">
          <p>{recordExecution.eyebrow}</p>
          <h2 id="acr-record-execution-title">{recordExecution.title}</h2>
          <span>{recordExecution.introduction}</span>
        </header>
        <ol className="acr-record-stages">
          {recordExecution.stages.map((stage) => (
            <li key={stage.label}>
              <span>{stage.label}</span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </li>
          ))}
        </ol>
        <dl className="acr-record-guards" aria-label="계획 연결 조건">
          {recordExecution.guards.map((guard) => (
            <div key={guard.title}><dt>{guard.title}</dt><dd>{guard.body}</dd></div>
          ))}
        </dl>
        <p className="acr-record-boundary">{recordExecution.boundary}</p>
        <Link className="acr-record-related" to={recordExecution.related.href}>
          {recordExecution.related.label} <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className="acr-rules" aria-labelledby="acr-rules-title">
        <header>
          <p>{content.rules.eyebrow}</p>
          <h2 id="acr-rules-title">중복과 재추출을 막는 설계</h2>
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
                <div><dt>계기</dt><dd>{scene.trigger}</dd></div>
                <div><dt>바꾼 점</dt><dd>{scene.change}</dd></div>
                <div><dt>달라진 작업</dt><dd>{scene.currentEffect}</dd></div>
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

        <div className="acr-status">
          <header><span>구현한 흐름</span><strong>{content.implementationStatus.state}</strong></header>
          <ul>{content.implementationStatus.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <p><span>작업을 바꾼 방식</span>{content.implementationStatus.runtime}</p>
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
          <p>연결된 설계 방식</p>
          {content.relatedSystems.map((system) => system.href ? (
            <Link to={system.href} key={system.title}>
              <span><strong>{system.title}</strong><small>{system.relation}</small></span>
              <b aria-hidden="true">↗</b>
            </Link>
          ) : (
            <div key={system.title}>
              <span><strong>{system.title}</strong><small>{system.relation}</small></span>
              <b>페이지 준비 중</b>
            </div>
          ))}
        </nav>
      </footer>
    </main>
  )
}

export default AiCandidateReviewPage
