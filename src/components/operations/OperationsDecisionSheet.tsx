import { useState } from 'react'
import type { OperationsCaseId, OperationsPageContent } from '../../content/content-types.ts'

type DecisionPhase = 'inspect' | 'preview' | 'recorded'

function OperationsDecisionSheet({ content }: { readonly content: OperationsPageContent['inspection'] }) {
  const [selectedId, setSelectedId] = useState<OperationsCaseId>('known-failure')
  const [phase, setPhase] = useState<DecisionPhase>('inspect')
  const selectedCase = content.cases.find((item) => item.id === selectedId) ?? content.cases[0]

  if (!selectedCase) return null

  function selectCase(id: OperationsCaseId) {
    setSelectedId(id)
    setPhase('inspect')
  }

  return (
    <section className="operations-inspection" aria-labelledby="operations-inspection-title">
      <header className="qa-section-heading">
        <p>{content.eyebrow}</p>
        <h2 id="operations-inspection-title">{content.title}</h2>
        <span>{content.instruction}</span>
      </header>
      <p className="operations-local-boundary">{content.localBoundary}</p>
      <div className="operations-sheet">
        <div className="operations-case-controls" role="group" aria-label="운영 판단 사례 선택">
          {content.cases.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-pressed={selectedCase.id === item.id}
              aria-controls="operations-case-detail"
              onClick={() => selectCase(item.id)}
            >
              <strong>{item.label}</strong>
              <small>{item.state}</small>
            </button>
          ))}
        </div>
        <section id="operations-case-detail" className="operations-case-detail" aria-labelledby="operations-case-title">
          <header className="operations-case-heading">
            <p>{selectedCase.state}</p>
            <h3 id="operations-case-title">{selectedCase.title}</h3>
            <span>{selectedCase.summary}</span>
          </header>
          <div className="operations-review-grid">
            <div className="operations-signals">
              <h4>관측 근거</h4>
              <dl>
                {selectedCase.signals.map((signal) => (
                  <div key={signal.label} data-tone={signal.tone}>
                    <dt>{signal.label}</dt>
                    <dd>{signal.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="operations-decision">
              <h4>{selectedCase.decision.title}</h4>
              <p>{selectedCase.decision.reason}</p>
              <dl>
                <div><dt>다음 행동</dt><dd>{selectedCase.decision.nextAction}</dd></div>
                <div><dt>중단 조건</dt><dd>{selectedCase.decision.stopCondition}</dd></div>
              </dl>
              {selectedCase.retryPreview ? (
                <div className="operations-actions">
                  <button type="button" disabled={phase !== 'inspect'} onClick={() => setPhase('preview')}>
                    {content.controls.preview}
                  </button>
                  {phase !== 'inspect' ? (
                    <section className="operations-preview" aria-label="로컬 재시도 판단 미리보기">
                      <h5>판단 범위</h5>
                      <ul>
                        <li>{selectedCase.retryPreview.scope}</li>
                        <li>{selectedCase.retryPreview.preserves}</li>
                        <li>{selectedCase.retryPreview.requires}</li>
                      </ul>
                      <button type="button" disabled={phase === 'recorded'} onClick={() => setPhase('recorded')}>
                        {content.controls.confirm}
                      </button>
                    </section>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          <div className="operations-local-status">
            <p role="status" aria-live="polite" aria-atomic="true">{content.status[phase]}</p>
            <button type="button" onClick={() => setPhase('inspect')}>{content.controls.reset}</button>
          </div>
        </section>
        <p className="operations-no-target-rule">{content.noTargetRule}</p>
      </div>
    </section>
  )
}

export default OperationsDecisionSheet
