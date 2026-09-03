import type { DeveloperStatusHotspotId, DeveloperStatusProductFixture } from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface DeveloperStatusProductViewProps {
  readonly fixture: DeveloperStatusProductFixture
  readonly activeId: DeveloperStatusHotspotId | null
  readonly onActivate: (id: DeveloperStatusHotspotId) => void
}

function DeveloperStatusProductView({ fixture, activeId, onActivate }: DeveloperStatusProductViewProps) {
  const selected = fixture.selected

  return (
    <section className="dev-status-product" data-has-active={activeId ? 'true' : 'false'} aria-label={`${fixture.productName} developer status 공개 재구성 화면`}>
      <header className="dev-status-topbar" aria-hidden="true"><span>J</span><strong>{fixture.productName}</strong><em>{fixture.workspaceLabel}</em><b>{fixture.window}</b></header>
      <div className="dev-status-layout">
        <ProductHotspot id="identity-scope" activeId={activeId} label="Explicit person and account scope" className="dev-roster" onActivate={onActivate}>
          <span className="dev-panel-head"><span><small>01 / ACTIVE PEOPLE</small><strong>RECENT 7 DAYS</strong></span><em>IDENTITY MAP</em></span>
          <span className="dev-roster-list">
            {fixture.people.map((item) => (
              <span className={item.person.id === selected.person.id ? 'is-selected' : ''} key={item.person.id}>
                <b>{item.person.initials}</b><span><strong>{item.person.name}</strong><small>{item.person.role} · {item.project}</small></span><em data-tone={item.tone}>{item.state}</em>
              </span>
            ))}
          </span>
          <span className="dev-evaluation-note">NOT A PERFORMANCE RANKING</span>
        </ProductHotspot>

        <article className="dev-detail">
          <header className="dev-detail-head" aria-hidden="true">
            <span className="dev-person-avatar">{selected.person.initials}</span>
            <span><small>{selected.project.name} / CURRENT STATUS</small><h2>{selected.person.name}</h2><p>{selected.person.role} · {selected.refreshedAt}</p></span>
            <span className="dev-counts">{selected.counts.map((count) => <span key={count.label}><small>{count.label}</small><strong>{count.value}</strong></span>)}</span>
          </header>
          <p className="dev-summary">{selected.summary}</p>

          <ProductHotspot id="partial-state" activeId={activeId} label="Visible partial and human-check state" className="dev-warning" onActivate={onActivate}>
            <span>04</span><span><small>{selected.state}</small>{selected.warnings.map((warning) => <strong key={warning}>{warning}</strong>)}</span><em>HUMAN CHECK</em>
          </ProductHotspot>

          <div className="dev-detail-grid">
            <section className="dev-focus" aria-hidden="true">
              <header><small>CURRENT FOCUS</small><strong>WORKLOG + EVIDENCE</strong></header>
              <ol>{selected.focus.map((item) => <li key={item}>{item}</li>)}</ol>
              <div><span><small>{selected.project.name}</small><strong>{selected.projectProgress.feature}</strong></span><em>{selected.projectProgress.status}</em><p>{selected.projectProgress.summary}</p><span className="dev-progress"><i style={{ width: selected.projectProgress.verified }} /><b>{selected.projectProgress.verified}</b></span></div>
            </section>

            <ProductHotspot id="grouped-evidence" activeId={activeId} label="Grouped diff and symbol evidence" className="dev-changes" onActivate={onActivate}>
              <span className="dev-panel-head"><span><small>03 / CODE EVIDENCE</small><strong>GROUPED CHANGE SETS</strong></span><em>{selected.changes.length}</em></span>
              {selected.changes.map((change) => (
                <span className="dev-change" key={change.title}><span><strong>{change.title}</strong><small>{change.date}</small></span><em>{change.state}</em><span>{change.symbols.map((symbol) => <b key={symbol}>{symbol}</b>)}</span></span>
              ))}
            </ProductHotspot>
          </div>

          <ProductHotspot id="source-hierarchy" activeId={activeId} label="Reviewed draft and change-set source hierarchy" className="dev-sources" onActivate={onActivate}>
            <span className="dev-panel-head"><span><small>02 / SOURCE RECORDS</small><strong>TRACE BACK TO EVIDENCE</strong></span><em>3 TYPES</em></span>
            <span className="dev-source-list">{selected.sources.map((source) => <span data-type={source.type} key={source.title}><em>{source.type.toUpperCase()}</em><strong>{source.title}</strong><small>{source.meta}</small></span>)}</span>
          </ProductHotspot>

          <ProductHotspot id="refresh-cadence" activeId={activeId} label="Predictable snapshot refresh cadence" className="dev-cadence" onActivate={onActivate}>
            <span>05</span><span><small>SNAPSHOT CADENCE</small><strong>{fixture.cadence.schedule}</strong></span><span><small>WINDOW</small><strong>{fixture.cadence.window}</strong></span><span><small>RECOVERY</small><strong>{fixture.cadence.recovery}</strong></span>
          </ProductHotspot>
        </article>
      </div>
    </section>
  )
}

export default DeveloperStatusProductView
