import type {
  AiCandidateReviewHotspotId,
  AiCandidateReviewProductFixture,
} from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface AiCandidateReviewProductViewProps {
  readonly fixture: AiCandidateReviewProductFixture
  readonly activeId: AiCandidateReviewHotspotId | null
  readonly onActivate: (id: AiCandidateReviewHotspotId) => void
}

function CandidateBadge({
  tone = 'neutral',
  children,
}: {
  readonly tone?: 'neutral' | 'warning' | 'jade'
  readonly children: string
}) {
  return <span className="acr-product-badge" data-tone={tone}>{children}</span>
}

function AiCandidateReviewProductView({
  fixture,
  activeId,
  onActivate,
}: AiCandidateReviewProductViewProps) {
  const candidate = fixture.selectedCandidate

  return (
    <section
      className="acr-product"
      data-has-active={activeId ? 'true' : 'false'}
      aria-label={`${fixture.productName} AI candidate review 공개 재구성 화면`}
    >
      <header className="acr-product-topbar" aria-hidden="true">
        <span className="acr-product-brand">J</span>
        <strong>{fixture.productName}</strong>
        <span>{fixture.workspaceLabel}</span>
        <span className="acr-product-user">
          <b>{fixture.reviewer.initials}</b>
          {fixture.reviewer.name}
        </span>
      </header>

      <div className="acr-product-layout">
        <nav className="acr-product-nav" aria-hidden="true">
          <p>WORKSPACE</p>
          <span>개발 운영 현황</span>
          <span>프로젝트 현황</span>
          <span>품질 관리</span>
          <strong>기록</strong>
          <b>AI 기록 검토</b>
          <span>확정 기록</span>
          <span>주간보고</span>
        </nav>

        <div className="acr-product-canvas">
          <header className="acr-product-page-head" aria-hidden="true">
            <div>
              <small>JADEBELL HUB</small>
              <strong>AI 기록 검토</strong>
              <span>AI가 추출한 후보를 검토하고 공식 기록으로 보낼지 결정합니다.</span>
            </div>
            <span>최근 처리 이력</span>
          </header>

          <div className="acr-review-workspace">
            <aside className="acr-queue" aria-label="검토 대기 후보">
              <header aria-hidden="true">
                <div>
                  <strong>검토 대기</strong>
                  <span>3 candidates</span>
                </div>
                <CandidateBadge tone="warning">PENDING</CandidateBadge>
              </header>

              <div className="acr-queue-filters" aria-hidden="true">
                {fixture.filters.map((filter, index) => (
                  <span className={index === 0 ? 'is-active' : undefined} key={filter}>
                    {filter}
                  </span>
                ))}
              </div>

              <div className="acr-queue-list">
                {fixture.queue.map((item) => {
                  const inner = (
                    <span className="acr-queue-item-inner">
                      <span>
                        <small>{item.id}</small>
                        <CandidateBadge tone={item.state === 'recent' ? 'jade' : 'neutral'}>
                          {item.category}
                        </CandidateBadge>
                      </span>
                      <strong>{item.title}</strong>
                      <span>{item.source} · {item.age}</span>
                    </span>
                  )

                  return item.state === 'selected' ? (
                    <ProductHotspot
                      id="review-queue"
                      activeId={activeId}
                      label="Pending review queue"
                      className="acr-queue-item is-selected"
                      onActivate={onActivate}
                      key={item.id}
                    >
                      {inner}
                    </ProductHotspot>
                  ) : (
                    <div className="acr-queue-item" aria-hidden="true" key={item.id}>
                      {inner}
                    </div>
                  )
                })}
              </div>

              <footer aria-hidden="true">
                <span>RECENT DECISION</span>
                <strong>{fixture.recentDecision.title}</strong>
                <small>{fixture.recentDecision.decision} · {fixture.recentDecision.reviewer}</small>
              </footer>
            </aside>

            <article className="acr-candidate-detail">
              <header className="acr-detail-head" aria-hidden="true">
                <div>
                  <small>{candidate.id} / {candidate.category}</small>
                  <h2>{candidate.title}</h2>
                  <p>{candidate.createdAt} · {fixture.project.name}</p>
                </div>
                <CandidateBadge tone="warning">NEEDS REVIEW</CandidateBadge>
              </header>

              <div className="acr-evidence-spine">
                <ProductHotspot
                  id="source-provenance"
                  activeId={activeId}
                  label="Candidate source provenance"
                  className="acr-spine-block acr-source-block"
                  onActivate={onActivate}
                >
                  <span className="acr-spine-marker">01</span>
                  <span className="acr-spine-copy">
                    <small>ORIGINAL SOURCE</small>
                    <strong>{candidate.source.type}</strong>
                    <span>{candidate.source.context}</span>
                    <q>{candidate.source.excerpt}</q>
                    <em>{candidate.source.author} · public synthetic source</em>
                  </span>
                </ProductHotspot>

                <ProductHotspot
                  id="editable-draft"
                  activeId={activeId}
                  label="Editable AI candidate draft"
                  className="acr-spine-block acr-draft-block"
                  onActivate={onActivate}
                >
                  <span className="acr-spine-marker">02</span>
                  <span className="acr-spine-copy">
                    <span className="acr-spine-title">
                      <span>
                        <small>AI-STRUCTURED DRAFT</small>
                        <strong>{candidate.draft.title}</strong>
                      </span>
                      <CandidateBadge>EDITABLE</CandidateBadge>
                    </span>
                    <span className="acr-draft-fields">
                      <span><small>CONTENT</small><b>{candidate.draft.body}</b></span>
                      <span><small>PROJECT</small><b>{candidate.draft.project}</b></span>
                      <span><small>TYPE / RISK</small><b>{candidate.draft.category} · {candidate.draft.risk}</b></span>
                    </span>
                  </span>
                </ProductHotspot>

                <ProductHotspot
                  id="human-decision"
                  activeId={activeId}
                  label="Human approval decision"
                  className="acr-spine-block acr-decision-block"
                  onActivate={onActivate}
                >
                  <span className="acr-spine-marker">03</span>
                  <span className="acr-spine-copy">
                    <span className="acr-duplicate-check">
                      <span><small>{candidate.duplicateCheck.label}</small><strong>{candidate.duplicateCheck.result}</strong></span>
                      <b>CHECKED AGAIN ON APPROVE</b>
                    </span>
                    <span className="acr-decision-row">
                      <span>
                        <b>{fixture.reviewer.initials}</b>
                        <span><strong>Human decision</strong><small>{fixture.reviewer.name} · reviewer</small></span>
                      </span>
                      <span aria-hidden="true">
                        <em>반려</em>
                        <em>수정 후 승인</em>
                        <strong>승인</strong>
                      </span>
                    </span>
                  </span>
                </ProductHotspot>
              </div>

              <ProductHotspot
                id="trust-boundary"
                activeId={activeId}
                label="Canonical record boundary"
                className="acr-canonical-gate"
                onActivate={onActivate}
              >
                <span>04</span>
                <span>
                  <small>ONLY AFTER HUMAN DECISION</small>
                  <strong>CANONICAL RECORD</strong>
                  <em>{candidate.destination} · eligible for trusted retrieval</em>
                </span>
                <b aria-hidden="true">→</b>
              </ProductHotspot>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AiCandidateReviewProductView
