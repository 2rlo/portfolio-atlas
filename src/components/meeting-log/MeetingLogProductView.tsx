import type { MeetingLogHotspotId, MeetingLogProductFixture } from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface MeetingLogProductViewProps {
  readonly fixture: MeetingLogProductFixture
  readonly activeId: MeetingLogHotspotId | null
  readonly onActivate: (id: MeetingLogHotspotId) => void
}

function MeetingLogProductView({ fixture, activeId, onActivate }: MeetingLogProductViewProps) {
  return (
    <section
      className="meeting-product"
      data-has-active={activeId ? 'true' : 'false'}
      aria-label={`${fixture.productName} meeting record to human review 공개 재구성 화면`}
    >
      <header className="meeting-product-topbar" aria-hidden="true">
        <span>J</span>
        <strong>{fixture.productName}</strong>
        <em>{fixture.workspaceLabel}</em>
        <b>RECORDS · MEETINGS</b>
      </header>

      <div className="meeting-product-canvas">
        <header className="meeting-product-heading" aria-hidden="true">
          <span><small>PROJECT / {fixture.project.name}</small><strong>회의 기록 검토</strong></span>
          <span><small>CURRENT INPUT</small><strong>{fixture.meeting.source}</strong></span>
          <b>{fixture.meeting.syncState}</b>
        </header>

        <div className="meeting-product-flow">
          <ProductHotspot
            id="source-record"
            activeId={activeId}
            label="Synced meeting record and source sections"
            className="meeting-source-record"
            onActivate={onActivate}
          >
            <span className="meeting-panel-index"><small>01 / MEETING RECORD</small><em>{fixture.meeting.date}</em></span>
            <span className="meeting-source-title"><strong>{fixture.meeting.title}</strong><small>{fixture.meeting.duration} · {fixture.meeting.source}</small></span>
            <span className="meeting-participants" aria-label={`${fixture.meeting.participants.length}명의 합성 참석자`}>
              {fixture.meeting.participants.map((person) => <i key={person.id}>{person.initials}</i>)}
              <b>{fixture.meeting.participants.length} PARTICIPANTS</b>
            </span>
            <span className="meeting-summary"><small>MEETING SUMMARY</small><strong>{fixture.meeting.summary}</strong></span>
            <span className="meeting-source-sections">
              {fixture.meeting.sections.map((section) => (
                <span key={`${section.time}-${section.label}`}>
                  <time>{section.time}</time>
                  <span><small>{section.label}</small><strong>{section.text}</strong></span>
                </span>
              ))}
            </span>
          </ProductHotspot>

          <span className="meeting-flow-arrow" aria-hidden="true">→</span>

          <section className="meeting-candidate-column" aria-label="AI candidate queue">
            <ProductHotspot
              id="change-guard"
              activeId={activeId}
              label="Meeting source change check before candidate extraction"
              className="meeting-change-guard"
              onActivate={onActivate}
            >
              <span><small>02 / {fixture.changeGuard.label}</small><strong>{fixture.changeGuard.state}</strong></span>
              <em>{fixture.changeGuard.checkedAt}</em>
              <b>{fixture.changeGuard.detail}</b>
            </ProductHotspot>

            <ProductHotspot
              id="candidate-group"
              activeId={activeId}
              label="Pending AI candidates grouped by the same meeting source"
              className="meeting-candidate-group"
              onActivate={onActivate}
            >
              <span className="meeting-panel-index"><small>03 / AI CANDIDATE</small><em>{fixture.candidates.length} PENDING</em></span>
              <span className="meeting-candidate-list">
                {fixture.candidates.map((candidate) => (
                  <span data-state={candidate.state} key={`${candidate.category}-${candidate.title}`}>
                    <small>{candidate.category}</small>
                    <strong>{candidate.title}</strong>
                    <em>{candidate.sourceRange}</em>
                  </span>
                ))}
              </span>
              <b className="meeting-pending-boundary">PENDING · NOT OFFICIAL</b>
            </ProductHotspot>
          </section>

          <span className="meeting-flow-arrow" aria-hidden="true">→</span>

          <ProductHotspot
            id="human-review"
            activeId={activeId}
            label="Editable candidate with source evidence and human review actions"
            className="meeting-review-panel"
            onActivate={onActivate}
          >
            <span className="meeting-panel-index"><small>04 / HUMAN REVIEW</small><em>{fixture.review.reviewer.initials} · REVIEWER</em></span>
            <span className="meeting-review-state"><small>{fixture.selectedCandidate.category}</small><b>검토 필요</b></span>
            <span className="meeting-field"><small>TITLE</small><strong>{fixture.selectedCandidate.title}</strong></span>
            <span className="meeting-field"><small>BODY</small><strong>{fixture.selectedCandidate.body}</strong></span>
            <span className="meeting-review-meta">
              <span><small>PROJECT</small><strong>{fixture.selectedCandidate.project}</strong></span>
              <span><small>DESTINATION</small><strong>{fixture.selectedCandidate.destination}</strong></span>
            </span>
            <span className="meeting-source-proof"><small>SOURCE EVIDENCE</small><strong>{fixture.selectedCandidate.sourceExcerpt}</strong></span>
            <span className="meeting-duplicate"><small>DUPLICATE CHECK</small><strong>{fixture.selectedCandidate.duplicateState}</strong></span>
            <span className="meeting-review-actions" aria-hidden="true">
              {fixture.review.actions.map((action) => <b key={action}>{action}</b>)}
            </span>
            <em className="meeting-review-notice">{fixture.review.notice}</em>
          </ProductHotspot>
        </div>

        <ProductHotspot
          id="capture-boundary"
          activeId={activeId}
          label="Implemented meeting input separated from unresolved automated capture"
          className="meeting-capture-boundary"
          onActivate={onActivate}
        >
          <span>05</span>
          <span><small>{fixture.captureBoundary.label}</small><strong>{fixture.captureBoundary.state}</strong></span>
          <b>{fixture.captureBoundary.activeInput}</b>
          <em>{fixture.captureBoundary.remaining}</em>
        </ProductHotspot>
      </div>
    </section>
  )
}

export default MeetingLogProductView
