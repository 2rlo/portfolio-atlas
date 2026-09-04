import type {
  WorklogReviewHotspotId,
  WorklogReviewProductFixture,
} from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface WorklogReviewProductViewProps {
  readonly fixture: WorklogReviewProductFixture
  readonly activeId: WorklogReviewHotspotId | null
  readonly onActivate: (id: WorklogReviewHotspotId) => void
}

function WorklogReviewProductView({
  fixture,
  activeId,
  onActivate,
}: WorklogReviewProductViewProps) {
  return (
    <section
      className="wl-product"
      data-has-active={activeId ? 'true' : 'false'}
      aria-label={`${fixture.productName} worklog review 공개 재구성 화면`}
    >
      <header className="wl-product-topbar" aria-hidden="true">
        <span className="wl-product-brand">J</span>
        <strong>{fixture.productName}</strong>
        <span>{fixture.workspaceLabel}</span>
        <span className="wl-product-user"><b>{fixture.reviewer.initials}</b>{fixture.reviewer.name}</span>
      </header>

      <div className="wl-product-layout">
        <nav className="wl-product-nav" aria-hidden="true">
          <p>WORKSPACE</p>
          <span>개발 운영 현황</span>
          <span>프로젝트 현황</span>
          <span>품질 관리</span>
          <strong>기록</strong>
          <b>업무일지 검토</b>
          <span>확정 기록</span>
          <span>주간보고</span>
        </nav>

        <div className="wl-product-canvas">
          <header className="wl-page-head" aria-hidden="true">
            <div><small>JADEBELL HUB</small><strong>업무일지 검토</strong><span>AI 정규화 초안을 원문과 비교해 report source 상태를 결정합니다.</span></div>
            <span>ACTUAL REVIEW SURFACE / EXTERNAL WORKSPACE</span>
          </header>

          <div className="wl-review-workspace">
            <aside className="wl-queue" aria-label="합성 업무일지 검토 대기 목록">
              <header aria-hidden="true"><div><strong>검토 큐</strong><span>검토 대기</span></div><em>{fixture.queue.length}건</em></header>
              <div className="wl-queue-filters" aria-hidden="true"><strong>전체</strong><span>Atlas</span><span>Canopy</span></div>
              <div className="wl-queue-list" aria-hidden="true">
                {fixture.queue.map((item) => (
                  <div className={`wl-queue-item ${item.state === 'selected' ? 'is-selected' : ''}`} key={item.id}>
                    <small>{item.id}</small><strong>{item.title}</strong><span>{item.project} · {item.date}</span>
                  </div>
                ))}
              </div>
              <footer aria-hidden="true"><span>REVIEW PRIORITY</span><strong>oldest pending first</strong></footer>
            </aside>

            <article className="wl-review-detail">
              <header className="wl-detail-head" aria-hidden="true">
                <div><small>{fixture.queue[0].id} / {fixture.project.name}</small><h2>{fixture.queue[0].title}</h2><p>{fixture.author.name} · {fixture.author.role}</p></div>
                <em>NEEDS REVIEW</em>
              </header>

              <ProductHotspot
                id="source-continuity"
                activeId={activeId}
                label="Original worklog source continuity"
                className="wl-source-ribbon"
                onActivate={onActivate}
              >
                <span className="wl-step-index">01</span>
                <span><small>ORIGINAL SOURCE</small><strong>{fixture.source.type}</strong><em>{fixture.source.date}</em></span>
                <q>{fixture.source.message}</q>
                <b>PUBLIC SYNTHETIC MESSAGE</b>
              </ProductHotspot>

              <div className="wl-review-body">
                <div className="wl-draft-column">
                  <ProductHotspot
                    id="structured-draft"
                    activeId={activeId}
                    label="L3 structured AI draft"
                    className="wl-draft-panel"
                    onActivate={onActivate}
                  >
                    <span className="wl-panel-heading"><span><small>02 / AI NORMALIZED DRAFT</small><strong>L3 review shape</strong></span><em>AI DRAFT</em></span>
                    <span className="wl-draft-field"><small>작업 내용</small><b>{fixture.draft.work}</b></span>
                    <span className="wl-draft-field"><small>결과</small><b>{fixture.draft.result}</b></span>
                  </ProductHotspot>

                  <ProductHotspot
                    id="ambiguity-level"
                    activeId={activeId}
                    label="Explicit ambiguity and review question"
                    className="wl-ambiguity-panel"
                    onActivate={onActivate}
                  >
                    <span className="wl-panel-heading"><span><small>03 / ADDITIONAL CHECK</small><strong>판단이 필요한 지점</strong></span><em>L3</em></span>
                    <q>{fixture.draft.ambiguity}</q>
                    <span><small>REVIEW QUESTION</small><b>{fixture.draft.reviewQuestion}</b></span>
                  </ProductHotspot>
                </div>

                <ProductHotspot
                  id="human-correction"
                  activeId={activeId}
                  label="Human-corrected worklog record"
                  className="wl-human-panel"
                  onActivate={onActivate}
                >
                  <span className="wl-panel-heading"><span><small>04 / HUMAN REVIEW</small><strong>원문 확인 후 수정</strong></span><em>{fixture.reviewer.initials}</em></span>
                  <span className="wl-reviewer"><b>{fixture.reviewer.initials}</b><span><strong>{fixture.reviewer.name}</strong><small>{fixture.corrected.reviewedAt}</small></span></span>
                  <span className="wl-correction"><small>CORRECTED RESULT</small><b>{fixture.corrected.result}</b></span>
                  <span className="wl-correction"><small>NEXT CHECK</small><b>{fixture.corrected.nextCheck}</b></span>
                  <span className="wl-faux-actions" aria-hidden="true"><em>보류</em><em>수정</em><strong>검토 완료</strong></span>
                </ProductHotspot>
              </div>

              <ProductHotspot
                id="report-boundary"
                activeId={activeId}
                label="Weekly report source eligibility boundary"
                className="wl-report-gate"
                onActivate={onActivate}
              >
                <span>05</span>
                <span><small>REPORT-SOURCE RULE</small><strong>REVIEWED RECORD FIRST</strong><em>eligible after human correction</em></span>
                <span><small>ONLY WHEN</small><b>{fixture.fallback.condition}</b><em>{fixture.fallback.label}</em></span>
                <b aria-hidden="true">→</b>
              </ProductHotspot>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorklogReviewProductView
