import type { ApiUsageHotspotId, ApiUsageProductFixture } from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface ApiUsageProductViewProps {
  readonly fixture: ApiUsageProductFixture
  readonly activeId: ApiUsageHotspotId | null
  readonly onActivate: (id: ApiUsageHotspotId) => void
}

function ApiUsageProductView({ fixture, activeId, onActivate }: ApiUsageProductViewProps) {
  return (
    <section className="api-usage-product" data-has-active={activeId ? 'true' : 'false'} aria-label={`${fixture.productName} API usage 공개 재구성 화면`}>
      <header className="api-usage-topbar" aria-hidden="true"><span>J</span><strong>{fixture.productName}</strong><em>{fixture.workspaceLabel}</em><b>ADMIN COST · MANAGE</b></header>
      <div className="api-usage-canvas">
        <header className="api-usage-head" aria-hidden="true"><div><small>OPERATIONS DESK / ADMIN</small><h2>API 비용</h2><p>AI workload의 사용량, 계산 비용과 budget state를 추적합니다.</p></div><span>{fixture.period}</span></header>
        <nav className="api-usage-tabs" aria-hidden="true"><span>TEAM & PERMISSIONS</span><strong>API COST</strong><span>PROJECTS</span></nav>

        <ProductHotspot id="budget-guard" activeId={activeId} label="Workload-specific background budget guard" className="api-budget-guard" onActivate={onActivate}>
          <span>04</span><span><small>{fixture.guard.status}</small><strong>Interactive path stays available; background work pauses by threshold.</strong></span><span><small>WARNING / STOP / PROJECTION</small><b>{fixture.guard.dailyWarning} · {fixture.guard.dailyStop} · {fixture.guard.monthlyProjection}</b></span><span><small>KEPT ONLINE</small><b>{fixture.guard.keptOnline}</b></span><span><small>PAUSED WHEN EXCEEDED</small><b>{fixture.guard.paused}</b></span>
        </ProductHotspot>

        <section className="api-summary" aria-hidden="true">{fixture.syntheticSummary.map((item) => <div data-tone={item.tone} key={item.label}><small>{item.label}</small><strong>{item.value}</strong><span>{item.note}</span></div>)}</section>

        <div className="api-breakdown-grid">
          <ProductHotspot id="workload-split" activeId={activeId} label="Cost attribution by workload and call mode" className="api-workloads" onActivate={onActivate}>
            <span className="api-panel-head"><span><small>03 / COST BY WORKLOAD</small><strong>WHERE THE COST COMES FROM</strong></span><em>30 DAYS</em></span>
            <span className="api-workload-list">{fixture.workloads.map((workload) => <span key={workload.name}><span><strong>{workload.name}</strong><small>{workload.model} · {workload.mode.toUpperCase()}</small></span><em>{workload.cost}</em><span className="api-meter"><i style={{ width: `${workload.share}%` }} /></span></span>)}</span>
          </ProductHotspot>

          <ProductHotspot id="pricing-dimensions" activeId={activeId} label="Normalized token pricing dimensions" className="api-token-ledger" onActivate={onActivate}>
            <span className="api-panel-head"><span><small>02 / PRICING DIMENSIONS</small><strong>TOKEN CLASSES</strong></span><em>RATE-AWARE</em></span>
            <span className="api-token-list">{fixture.tokenLedger.map((item) => <span key={item.label}><small>{item.label}</small><strong>{item.tokens}</strong><em>{item.rate}</em></span>)}</span>
          </ProductHotspot>
        </div>

        <ProductHotspot id="usage-ledger" activeId={activeId} label="Call-level usage and disconnect ledger" className="api-event-ledger" onActivate={onActivate}>
          <span className="api-panel-head"><span><small>01 / CALL-LEVEL LEDGER</small><strong>RECENT USAGE EVENTS</strong></span><em>NORMAL + DISCONNECT</em></span>
          <span className="api-ledger-head"><b>TIME</b><b>FEATURE</b><b>MODE</b><b>INPUT</b><b>OUTPUT</b><b>COST</b><b>STATE</b></span>
          {fixture.ledgerRows.map((row) => <span className="api-ledger-row" data-state={row.state.toLowerCase()} key={`${row.date}-${row.feature}`}><span>{row.date}</span><strong>{row.feature}</strong><em>{row.mode}</em><span>{row.input}</span><span>{row.output}</span><b>{row.cost}</b><i>{row.state}</i></span>)}
        </ProductHotspot>

        <ProductHotspot id="counterfactual" activeId={activeId} label="Recorded cost versus counterfactual estimate" className="api-counterfactual" onActivate={onActivate}>
          <span>05</span><span><small>RECORDED LEDGER</small><strong>{fixture.counterfactual.recorded}</strong></span><span><small>{fixture.counterfactual.label}</small><strong>{fixture.counterfactual.standardNoCache}</strong></span><span><small>CALCULATED DIFFERENCE</small><strong>{fixture.counterfactual.difference}</strong></span><em>ESTIMATE / NOT INVOICE</em>
        </ProductHotspot>
      </div>
    </section>
  )
}

export default ApiUsageProductView
