import type { VersionLogHotspotId, VersionLogProductFixture } from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface VersionLogProductViewProps {
  readonly fixture: VersionLogProductFixture
  readonly activeId: VersionLogHotspotId | null
  readonly onActivate: (id: VersionLogHotspotId) => void
}

function VersionLogProductView({ fixture, activeId, onActivate }: VersionLogProductViewProps) {
  const [latestGroup, ...olderGroups] = fixture.groups

  return (
    <section
      className="version-product"
      data-has-active={activeId ? 'true' : 'false'}
      aria-label={`${fixture.productName} 버전·릴리스 목록 공개 재구성 화면`}
    >
      <header className="version-product-topbar" aria-hidden="true">
        <span>J</span>
        <strong>{fixture.productName}</strong>
        <em>{fixture.workspaceLabel}</em>
        <b>RECORDS · VERSIONS</b>
      </header>

      <div className="version-product-canvas">
        <header className="version-product-heading" aria-hidden="true">
          <span><small>PROJECT / {fixture.project.name}</small><strong>버전 및 릴리스 기록</strong></span>
          <span>UPDATED BY DAILY SYNC</span>
        </header>

        <ProductHotspot
          id="release-status"
          activeId={activeId}
          label="명시적인 릴리스 상태 필터"
          className="version-query-bar"
          onActivate={onActivate}
        >
          <span className="version-filter-list">
            {fixture.filters.map((filter) => <b data-active={filter.active ? 'true' : 'false'} key={filter.label}>{filter.label}</b>)}
          </span>
          <span className="version-query-copy"><small>{fixture.query.label}</small><strong>{fixture.query.value}</strong></span>
          <em>{fixture.query.result}</em>
        </ProductHotspot>

        <div className="version-product-layout">
          <section className="version-ledger" aria-label="날짜별 버전 기록">
            <header aria-hidden="true"><small>RELEASE LEDGER</small><span>PRODUCT</span><span>VERSION</span><span>STATUS</span><span>COMPATIBILITY</span></header>

            {latestGroup && (
              <ProductHotspot
                id="same-date-builds"
                activeId={activeId}
                label="같은 날짜에 기록된 목적별 빌드"
                className="version-date-group version-date-group--latest"
                onActivate={onActivate}
              >
                <span className="version-date-label"><time>{latestGroup.date}</time><b>{latestGroup.records.length} BUILDS · SAME DATE</b></span>
                {latestGroup.records.map((record) => (
                  <span className="version-record-row" data-selected={record.selected ? 'true' : 'false'} key={`${record.product}-${record.version}`}>
                    <span><strong>{record.product}</strong><small>{record.displayName}</small></span>
                    <b>{record.version}</b>
                    <em data-status={record.releaseStatus.toLowerCase()}>{record.releaseStatus}</em>
                    <span><strong>{record.compatibility}</strong><small>{record.selected ? 'QUERY MATCH' : 'DIFFERENT PURPOSE'}</small></span>
                  </span>
                ))}
              </ProductHotspot>
            )}

            <div className="version-older-groups" aria-hidden="true">
              {olderGroups.map((group) => (
                <span className="version-date-group" key={group.date}>
                  <span className="version-date-label"><time>{group.date}</time><b>{group.records.length} BUILD</b></span>
                  {group.records.map((record) => (
                    <span className="version-record-row" key={`${record.product}-${record.version}`}>
                      <span><strong>{record.product}</strong><small>{record.displayName}</small></span>
                      <b>{record.version}</b>
                      <em data-status={record.releaseStatus.toLowerCase()}>{record.releaseStatus}</em>
                      <span><strong>{record.compatibility}</strong><small>HISTORICAL RECORD</small></span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </section>

          <aside className="version-detail" aria-label="선택한 릴리스 기록">
            <header aria-hidden="true">
              <span><small>SELECTED RELEASE</small><strong>{fixture.selected.product}</strong></span>
              <em>{fixture.selected.releaseStatus}</em>
              <h2>{fixture.selected.version}</h2>
              <p>{fixture.selected.displayName} · {fixture.selected.releaseDate}</p>
            </header>

            <ProductHotspot
              id="compatibility-scope"
              activeId={activeId}
              label="최신 릴리스 조회에 사용하는 제품과 호환 범위"
              className="version-compatibility"
              onActivate={onActivate}
            >
              <span><small>03 / COMPATIBILITY</small><strong>적용 가능한 대상</strong></span>
              <span>{fixture.selected.compatibility.map((item) => <b key={item}>{item}</b>)}</span>
            </ProductHotspot>

            <section className="version-change-detail" aria-label="릴리스 업데이트와 수정 내역">
              <span><small>UPDATES</small>{fixture.selected.updates.map((item) => <strong key={item}>{item}</strong>)}</span>
              <span><small>FIXES</small>{fixture.selected.fixes.map((item) => <strong key={item}>{item}</strong>)}</span>
            </section>

            <ProductHotspot
              id="deployment-note"
              activeId={activeId}
              label="업데이트와 구분한 배포 주의사항"
              className="version-deployment-note"
              onActivate={onActivate}
            >
              <span>04</span>
              <span><small>DEPLOYMENT NOTE</small><strong>적용 전 확인</strong></span>
              <p>{fixture.selected.deploymentNote}</p>
              <em>RELEASE EVIDENCE · NOT REQUIREMENT PASS</em>
            </ProductHotspot>
          </aside>
        </div>

        <ProductHotspot
          id="source-trace"
          activeId={activeId}
          label="매일 동기화하는 버전 기록과 정형·의미 검색 상태"
          className="version-source-trace"
          onActivate={onActivate}
        >
          <span>05</span>
          <span><small>SOURCE TRACE</small><strong>{fixture.sourceTrace.source}</strong></span>
          <b>{fixture.sourceTrace.sync}</b>
          <b>{fixture.sourceTrace.structuredLookup}</b>
          <b>{fixture.sourceTrace.semanticIndex}</b>
          <em>{fixture.sourceTrace.reference}</em>
        </ProductHotspot>
      </div>
    </section>
  )
}

export default VersionLogProductView
