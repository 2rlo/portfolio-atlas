import type { ReportHotspotId, ReportProductFixture } from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface ReportProductViewProps {
  readonly fixture: ReportProductFixture
  readonly activeId: ReportHotspotId | null
  readonly onActivate: (id: ReportHotspotId) => void
}

function ReportProductView({ fixture, activeId, onActivate }: ReportProductViewProps) {
  return (
    <section
      className="report-product"
      data-has-active={activeId ? 'true' : 'false'}
      aria-label={`${fixture.productName} weekly report 공개 재구성 화면`}
    >
      <header className="report-topbar" aria-hidden="true">
        <span>J</span>
        <strong>{fixture.productName}</strong>
        <em>{fixture.workspaceLabel}</em>
        <b>WEEKLY RECORD</b>
      </header>

      <div className="report-canvas">
        <header className="report-head">
          <div aria-hidden="true">
            <small>PROJECT STATUS / WEEKLY SUMMARY</small>
            <h2>주간 요약</h2>
            <p>검토된 기록을 중심으로 성과·위험·테스트를 같은 주차에 정리합니다.</p>
          </div>
          <ProductHotspot
            id="generation-gate"
            activeId={activeId}
            label="Permissioned generation and locale quality gate"
            className="report-generation"
            onActivate={onActivate}
          >
            <span>↻</span>
            <strong>{fixture.generation.action}</strong>
            <small>{fixture.generation.automatic} · {fixture.generation.manual}</small>
            <em>{fixture.generation.locale}</em>
            <em data-gated="true">{fixture.generation.gatedLocale}</em>
          </ProductHotspot>
        </header>

        <ProductHotspot
          id="week-window"
          activeId={activeId}
          label="Canonical report week and generation metadata"
          className="report-week-window"
          onActivate={onActivate}
        >
          <span className="report-week-list">
            {fixture.weeks.map((week) => (
              <span data-state={week.state} key={week.label}>{week.label}</span>
            ))}
          </span>
          <span className="report-selected-week">
            <strong>{fixture.selectedWeek.label}</strong>
            <span>{fixture.selectedWeek.range}</span>
            <small>{fixture.selectedWeek.generatedAt}</small>
          </span>
        </ProductHotspot>

        <ProductHotspot
          id="reviewed-source"
          activeId={activeId}
          label="Reviewed-first report source state and visible fallback"
          className="report-source-state"
          onActivate={onActivate}
        >
          <span>02</span>
          <span>
            <small>SOURCE STATE</small>
            <strong>{fixture.sourceState.label}</strong>
          </span>
          <em>{fixture.sourceState.detail}</em>
          <b>{fixture.sourceState.fallbackLabel}</b>
        </ProductHotspot>

        <ProductHotspot
          id="structured-metrics"
          activeId={activeId}
          label="Structured weekly report metrics"
          className="report-metrics"
          onActivate={onActivate}
        >
          {fixture.metrics.map((metric, index) => (
            <span key={metric.label}>
              <small>0{index + 1} / {metric.label}</small>
              <strong>{metric.value}</strong>
            </span>
          ))}
        </ProductHotspot>

        <div className="report-body">
          <ProductHotspot
            id="qa-evidence"
            activeId={activeId}
            label="Same-week QA evidence separated from narrative"
            className="report-test-panel"
            onActivate={onActivate}
          >
            <span className="report-panel-title">
              <span><small>04 / QA EVIDENCE</small><strong>테스트 결과</strong></span>
              <em>총 9 TC</em>
            </span>
            <span className="report-test-ring" aria-hidden="true"><i>9</i></span>
            <span className="report-test-list">
              {fixture.tests.map((test) => (
                <span data-tone={test.tone} key={test.label}>
                  <i aria-hidden="true" />
                  <strong>{test.label}</strong>
                  <em>{test.value}건</em>
                </span>
              ))}
            </span>
            <small>같은 주차의 확인된 test record만 집계</small>
          </ProductHotspot>

          <article className="report-document" aria-hidden="true">
            {fixture.reportSections.map((section) => (
              <section key={section.label}>
                <h3>{section.label}</h3>
                {section.introduction ? <p>{section.introduction}</p> : null}
                {section.entries.length > 0 ? (
                  <ul>
                    {section.entries.map((entry) => (
                      <li key={entry.title}>
                        <p><strong>{entry.title}</strong> {entry.body}</p>
                        {entry.source ? (
                          <span className="report-source-record">
                            <b>{entry.source.record}</b>
                            <em>{entry.source.status}</em>
                            <small>{entry.source.lineage}</small>
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </div>
      </div>
    </section>
  )
}

export default ReportProductView
