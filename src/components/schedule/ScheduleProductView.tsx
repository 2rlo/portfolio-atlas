import type { ScheduleHotspotId, ScheduleProductFixture } from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface ScheduleProductViewProps {
  readonly fixture: ScheduleProductFixture
  readonly activeId: ScheduleHotspotId | null
  readonly onActivate: (id: ScheduleHotspotId) => void
}

function ScheduleProductView({ fixture, activeId, onActivate }: ScheduleProductViewProps) {
  return (
    <section className="schedule-product" data-has-active={activeId ? 'true' : 'false'} aria-label={`${fixture.productName} schedule 공개 재구성 화면`}>
      <header className="schedule-product-topbar" aria-hidden="true">
        <span className="schedule-product-brand">J</span><strong>{fixture.productName}</strong><span>{fixture.workspaceLabel}</span><span><b>{fixture.editor.initials}</b>{fixture.editor.name}</span>
      </header>
      <div className="schedule-product-layout">
        <nav className="schedule-product-nav" aria-hidden="true"><p>PROJECTS</p><span>Weekly summary</span><span>Developer status</span><strong>Schedule overview</strong><p>QUALITY</p><span>Test reports</span><span>Feature validation</span></nav>
        <div className="schedule-product-canvas">
          <header className="schedule-page-head" aria-hidden="true">
            <div><small>JADEBELL HUB</small><h2>일정 조망</h2><p>프로젝트 계획, 변경안과 적용 상태를 같은 시간축에서 검토합니다.</p></div>
            <span><em>CHANGE REVIEW</em><strong>+ ADD PLAN</strong></span>
          </header>
          <div className="schedule-toolbar" aria-hidden="true"><span className="is-active">ALL PLANS</span><span>PROPOSALS</span><span>MILESTONES</span><span>DONE</span><i>PROJECT / ALL</i><i>OWNER / ALL</i></div>

          <div className="schedule-workspace">
            <div className="schedule-main">
              <ProductHotspot id="canonical-timeline" activeId={activeId} label="Canonical plan and actual timeline" className="schedule-timeline" onActivate={onActivate}>
                <span className="schedule-panel-head"><span><small>01 / PLAN + ACTUAL</small><strong>PROJECT TIMELINE</strong></span><em>WEEK</em></span>
                <span className="schedule-timeline-head"><b>PROJECT</b>{fixture.days.map((day) => <b key={day}>{day}</b>)}</span>
                <span className="schedule-timeline-rows">
                  {fixture.timeline.map((row) => (
                    <span className="schedule-timeline-row" key={row.project}>
                      <strong>{row.project}</strong>
                      {row.items.map((item) => (
                        <span className="schedule-bar" data-tone={item.tone} style={{ gridColumn: `${item.start + 1} / span ${item.span}` }} key={item.title}>
                          <b>{item.title}</b>
                          {item.actualSpan ? <i style={{ width: `${(item.actualSpan / item.span) * 100}%` }} /> : null}
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
                <span className="schedule-timeline-legend"><i>PLAN</i><i>ACTUAL</i><b>NO LINE = NOT RECORDED</b></span>
              </ProductHotspot>

              <ProductHotspot id="missing-data" activeId={activeId} label="Explicit missing schedule data" className="schedule-plan-table" onActivate={onActivate}>
                <span className="schedule-panel-head"><span><small>02 / CANONICAL DETAIL</small><strong>PLAN ITEMS</strong></span><em>CONFIRMED VALUES ONLY</em></span>
                <span className="schedule-table-head"><b>PROJECT</b><b>PLAN</b><b>STATUS</b><b>PLANNED</b><b>ACTUAL</b></span>
                {fixture.plans.map((plan) => (
                  <span className="schedule-table-row" data-review={plan.needsReview ? 'true' : 'false'} key={`${plan.project}-${plan.title}`}>
                    <strong>{plan.project}</strong><b>{plan.title}</b><em>{plan.status}</em><span>{plan.period}</span><span>{plan.actual}</span>
                  </span>
                ))}
              </ProductHotspot>
            </div>

            <ProductHotspot id="staged-changes" activeId={activeId} label="Staged schedule change proposals" className="schedule-change-rail" onActivate={onActivate}>
              <span className="schedule-panel-head"><span><small>03 / STAGED</small><strong>CHANGES TO REVIEW</strong></span><em>{fixture.changes.length}</em></span>
              {fixture.changes.map((change) => (
                <span className="schedule-change-card" key={change.title}>
                  <span><small>{change.project}</small><em>{change.state}</em></span><strong>{change.title}</strong><p>{change.proposedBy}</p><span aria-hidden="true"><b>REVIEW</b><b>APPLY</b></span>
                </span>
              ))}
              <span className="schedule-change-rule"><small>APPLY RULE</small><strong>SELECT → CONFLICT CHECK → ATOMIC WRITE</strong></span>
            </ProductHotspot>
          </div>

          <ProductHotspot id="audit-revert" activeId={activeId} label="Append-only apply history and safe revert" className="schedule-audit-strip" onActivate={onActivate}>
            <span>04</span><span><small>RECENT APPLY</small><strong>{fixture.recentApply.title}</strong><em>{fixture.recentApply.actor}</em></span><span><small>{fixture.recentApply.state}</small><strong>{fixture.recentApply.rule}</strong></span><b aria-hidden="true">↶</b>
          </ProductHotspot>

          <ProductHotspot id="role-boundary" activeId={activeId} label="Shared Schedule read-only role boundary" className="schedule-role-strip" onActivate={onActivate}>
            <span>05</span><span><small>{fixture.readOnlyScope.label}</small><strong>{fixture.readOnlyScope.person}</strong></span><span><small>VISIBLE</small><b>{fixture.readOnlyScope.visible.join(' · ')}</b></span><span><small>RESTRICTED</small><b>{fixture.readOnlyScope.restricted.join(' · ')}</b></span><em>VIEW ONLY</em>
          </ProductHotspot>
        </div>
      </div>
    </section>
  )
}

export default ScheduleProductView
