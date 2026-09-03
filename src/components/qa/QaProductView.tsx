import type { QaHotspotId, QaProductFixture } from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface QaProductViewProps {
  readonly fixture: QaProductFixture
  readonly activeId: QaHotspotId | null
  readonly onActivate: (id: QaHotspotId) => void
}

const attachmentIcon = {
  image: 'IMG',
  video: 'VID',
  file: 'DOC',
} as const

function QaProductView({ fixture, activeId, onActivate }: QaProductViewProps) {
  return (
    <section
      className="qa-product"
      data-has-active={activeId ? 'true' : 'false'}
      aria-label={`${fixture.productName} QA test detail 공개 재구성 화면`}
    >
      <header className="qa-product-topbar" aria-hidden="true">
        <span className="qa-product-brand">J</span>
        <strong>{fixture.productName}</strong>
        <span>{fixture.workspaceLabel}</span>
        <span className="qa-product-user">
          <b>{fixture.author.initials}</b>
          {fixture.author.name}
        </span>
      </header>

      <div className="qa-product-layout">
        <nav className="qa-product-nav" aria-hidden="true">
          <p>QUALITY</p>
          <span>Dashboard</span>
          <strong>Test reports</strong>
          <span>Archived</span>
          <p>WORKSPACE</p>
          <span>Projects</span>
          <span>Members</span>
        </nav>

        <article className="qa-product-canvas">
          <header className="qa-report-head" aria-hidden="true">
            <div>
              <small>{fixture.project.name} / TEST REPORT</small>
              <h2>{fixture.report.title}</h2>
              <p>{fixture.report.date} · {fixture.author.name} · {fixture.report.revision}</p>
            </div>
            <div className="qa-result-summary">
              {fixture.report.resultSummary.map((result) => (
                <span key={result.label} data-result={result.label.toLowerCase()}>
                  <small>{result.label}</small>
                  <strong>{result.value}</strong>
                </span>
              ))}
            </div>
          </header>

          <ProductHotspot
            id="ai-boundary"
            activeId={activeId}
            label="AI assessment regeneration boundary"
            className="qa-ai-assessment"
            onActivate={onActivate}
          >
            <span className="qa-hotspot-index">05</span>
            <span>
              <small>AI ASSESSMENT / REVIEW AID</small>
              <strong>{fixture.report.assessment}</strong>
            </span>
            <em>REGENERATE</em>
          </ProductHotspot>

          <div className="qa-record-grid">
            <div className="qa-record-main">
              <ProductHotspot
                id="test-context"
                activeId={activeId}
                label="Separated test purpose and environment"
                className="qa-context"
                onActivate={onActivate}
              >
                <span className="qa-hotspot-index">01</span>
                <span className="qa-context-purpose">
                  <small>PURPOSE</small>
                  <strong>{fixture.report.purpose}</strong>
                </span>
                <span className="qa-context-environment">
                  <small>ENVIRONMENT</small>
                  <span>
                    {fixture.report.environment.map((item) => <b key={item}>{item}</b>)}
                  </span>
                </span>
              </ProductHotspot>

              <ProductHotspot
                id="human-result"
                activeId={activeId}
                label="QA-owned expected and actual result"
                className="qa-case-stack"
                onActivate={onActivate}
              >
                <span className="qa-section-label"><b>02</b> TEST CASES / HUMAN RESULT</span>
                {fixture.testCases.map((testCase) => (
                  <span className="qa-test-case" key={testCase.id}>
                    <span className="qa-test-case-head">
                      <span><small>{testCase.id}</small><strong>{testCase.title}</strong></span>
                      <em data-result={testCase.result.toLowerCase()}>{testCase.result}</em>
                    </span>
                    <span className="qa-precondition"><small>PRECONDITION</small><b>{testCase.precondition}</b></span>
                    <span className="qa-result-compare">
                      <span><small>EXPECTED</small><b>{testCase.expected}</b></span>
                      <span><small>ACTUAL</small><b>{testCase.actual}</b></span>
                    </span>
                    {testCase.discussion ? (
                      <span className="qa-discussion"><small>DISCUSSION</small><b>{testCase.discussion}</b></span>
                    ) : null}
                  </span>
                ))}
              </ProductHotspot>

              <ProductHotspot
                id="attachments"
                activeId={activeId}
                label="Execution-linked attachments"
                className="qa-attachments"
                onActivate={onActivate}
              >
                <span className="qa-section-label"><b>03</b> EXECUTION ATTACHMENTS</span>
                <span className="qa-attachment-list">
                  {fixture.testCases.flatMap((testCase) =>
                    testCase.attachments.map((attachment) => (
                      <span key={`${testCase.id}-${attachment.name}`}>
                        <em>{attachmentIcon[attachment.type]}</em>
                        <b>{attachment.name}</b>
                        <small>{testCase.id}</small>
                      </span>
                    )),
                  )}
                </span>
              </ProductHotspot>
            </div>

            <ProductHotspot
              id="revision-history"
              activeId={activeId}
              label="Retest and revision history"
              className="qa-revisions"
              onActivate={onActivate}
            >
              <span className="qa-section-label"><b>04</b> REVISION HISTORY</span>
              <span className="qa-revision-list">
                {fixture.revisions.map((revision) => (
                  <span key={revision.revision}>
                    <em>R{revision.revision}</em>
                    <span><strong>{revision.change}</strong><small>{revision.author} · {revision.time}</small></span>
                  </span>
                ))}
              </span>
              <span className="qa-revision-rule"><small>RETENTION RULE</small><strong>Previous runs remain readable</strong></span>
            </ProductHotspot>
          </div>
        </article>
      </div>
    </section>
  )
}

export default QaProductView
