import type {
  FeatureValidationHotspotId,
  FeatureValidationProductFixture,
  FeatureValidationRequirementFixture,
} from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface FeatureValidationProductViewProps {
  readonly fixture: FeatureValidationProductFixture
  readonly activeId: FeatureValidationHotspotId | null
  readonly onActivate: (id: FeatureValidationHotspotId) => void
}

interface RequirementProps {
  readonly requirement: FeatureValidationRequirementFixture
  readonly activeId: FeatureValidationHotspotId | null
  readonly onActivate: (id: FeatureValidationHotspotId) => void
}

function StatusPill({
  tone,
  children,
}: {
  readonly tone: 'confirmed' | 'linked' | 'unknown'
  readonly children: string
}) {
  return <span className="fv-product-status" data-tone={tone}>{children}</span>
}

function RequirementHeading({
  requirement,
  activeId,
  onActivate,
}: RequirementProps) {
  const heading = (
    <span className="fv-product-requirement-heading-inner">
      <span>
        <strong>{requirement.statement}</strong>
        <small>{requirement.sourceLabel}</small>
      </span>
      <StatusPill tone={requirement.state}>{requirement.statusLabel}</StatusPill>
    </span>
  )

  return requirement.statementHotspotId ? (
    <ProductHotspot
      id={requirement.statementHotspotId}
      activeId={activeId}
      label={`${requirement.id} Requirement`}
      className="fv-product-requirement-heading"
      onActivate={onActivate}
    >
      {heading}
    </ProductHotspot>
  ) : (
    <div className="fv-product-requirement-heading" aria-hidden="true">
      {heading}
    </div>
  )
}

function Requirement({
  requirement,
  activeId,
  onActivate,
}: RequirementProps) {
  return (
    <article
      className="fv-product-requirement"
      data-state={requirement.state}
    >
      <span className="fv-product-requirement-index" aria-hidden="true">
        {requirement.id}
      </span>

      <div className="fv-product-requirement-body">
        <RequirementHeading
          requirement={requirement}
          activeId={activeId}
          onActivate={onActivate}
        />

        <ProductHotspot
          id={requirement.evidenceHotspotId}
          activeId={activeId}
          label={`${requirement.id} ${requirement.evidence.eyebrow}`}
          className="fv-product-evidence"
          onActivate={onActivate}
        >
          <span className="fv-product-evidence-main">
            <small>{requirement.evidence.eyebrow}</small>
            <strong>{requirement.evidence.title}</strong>
            <span>{requirement.evidence.summary}</span>
          </span>

          <span className="fv-product-evidence-tokens" aria-hidden="true">
            <small>
              {requirement.evidence.companion?.eyebrow ?? 'SOURCE EVIDENCE'}
            </small>
            {requirement.evidence.companion ? (
              <span>{requirement.evidence.companion.body}</span>
            ) : (
              <span>
                {requirement.evidence.tokens.map((token) => (
                  <code key={token}>{token}</code>
                ))}
              </span>
            )}
          </span>
        </ProductHotspot>

        <p className="fv-product-signal" data-state={requirement.state} aria-hidden="true">
          {requirement.signal}
        </p>

        {requirement.reviewer ? (
          <p className="fv-product-reviewer" aria-hidden="true">
            <span>{requirement.reviewer.initials}</span>
            <strong>{requirement.reviewer.name}</strong>
            <span>{requirement.reviewer.note}</span>
            <time>{requirement.reviewer.time}</time>
          </p>
        ) : null}
      </div>
    </article>
  )
}

function FeatureValidationProductView({
  fixture,
  activeId,
  onActivate,
}: FeatureValidationProductViewProps) {
  const feature = fixture.selectedFeature

  return (
    <section
      className="fv-product"
      data-has-active={activeId ? 'true' : 'false'}
      aria-label={`${fixture.productName} Feature Validation 공개 재구성 화면`}
    >
      <header className="fv-product-topbar" aria-hidden="true">
        <span className="fv-product-brand-mark">J</span>
        <strong>{fixture.productName}</strong>
        <span>{fixture.workspaceLabel}</span>
        <span className="fv-product-user">
          <b>{fixture.reviewer.initials}</b>
          {fixture.reviewer.name}
        </span>
      </header>

      <div className="fv-product-layout">
        <nav className="fv-product-nav" aria-hidden="true">
          <p>WORKSPACE</p>
          <span>개발 운영 현황</span>
          <span>프로젝트 현황</span>
          <strong>품질 관리</strong>
          <b>기능 검증</b>
          <span>테스트 기록</span>
          <span>기록</span>
        </nav>

        <div className="fv-product-canvas">
          <header className="fv-product-page-head" aria-hidden="true">
            <div>
              <small>JADEBELL HUB</small>
              <strong>기능 검증</strong>
              <span>Requirement와 구현 근거를 검토하고 사람이 연결 상태를 확정합니다.</span>
            </div>
            <span>검증 이력</span>
          </header>

          <div className="fv-product-tabs" aria-hidden="true">
            <span>전체</span>
            <strong>{fixture.project.name}</strong>
            <span>Canopy</span>
            <span>Harbor</span>
            <small>{feature.lastReviewed}</small>
          </div>

          <div className="fv-product-workspace">
            <aside className="fv-product-feature-list" aria-hidden="true">
              <header>
                <strong>{fixture.project.name} 기능</strong>
                <span>4개 · 확인 필요 2</span>
              </header>
              {fixture.featureList.map((item, index) => (
                <div className={index === 0 ? 'is-selected' : undefined} key={item.id}>
                  <strong>{item.name}</strong>
                  <span>{item.meta}</span>
                  <StatusPill tone={item.tone}>{item.status}</StatusPill>
                </div>
              ))}
              <p>기능별 근거 확인 상태이며 제품 전체 완료율이 아닙니다.</p>
            </aside>

            <article className="fv-product-detail">
              <header className="fv-product-detail-head" aria-hidden="true">
                <div>
                  <small>{fixture.project.name}</small>
                  <h2>{feature.name}</h2>
                  <p>{feature.summary}</p>
                </div>
                <StatusPill tone="unknown">{feature.status}</StatusPill>
              </header>

              <ol className="fv-product-progress" aria-hidden="true">
                <li data-state="done"><span>01</span><strong>명세</strong><small>3</small></li>
                <li data-state="done"><span>02</span><strong>변경 범위</strong><small>3</small></li>
                <li data-state="active"><span>03</span><strong>구현 근거</strong><small>2 + 1</small></li>
                <li><span>04</span><strong>사람 확인</strong><small>2 / 3</small></li>
              </ol>

              <section className="fv-product-requirements" aria-label="주요 설계 판단 지점">
                <header aria-hidden="true">
                  <div>
                    <strong>Requirement와 구현 근거</strong>
                    <span>AI 추천과 사람이 확정한 연결을 구분합니다.</span>
                  </div>
                  <span>3 REQUIREMENTS</span>
                </header>

                {feature.requirements.map((requirement) => (
                  <Requirement
                    requirement={requirement}
                    activeId={activeId}
                    onActivate={onActivate}
                    key={requirement.id}
                  />
                ))}
              </section>

              <section className="fv-product-unlinked" aria-hidden="true">
                <span>↗</span>
                <div>
                  <strong>{feature.unlinkedCandidate.label}</strong>
                  <small>{feature.unlinkedCandidate.title}</small>
                </div>
                <p>{feature.unlinkedCandidate.summary}</p>
                <span>
                  {feature.unlinkedCandidate.tokens.map((token) => (
                    <code key={token}>{token}</code>
                  ))}
                </span>
              </section>

              <ProductHotspot
                id="human-review"
                activeId={activeId}
                label="Human review controls"
                className="fv-product-confirmation"
                onActivate={onActivate}
              >
                <span className="fv-product-confirmation-person">
                  <b>{fixture.reviewer.initials}</b>
                  <span>
                    <strong>Human confirmation</strong>
                    <small>3개 Requirement 중 2개 확인 · 후보 1개 남음</small>
                  </span>
                </span>
                <span className="fv-product-confirmation-actions" aria-hidden="true">
                  <em>후보 제외</em>
                  <strong>R3에 연결</strong>
                </span>
              </ProductHotspot>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureValidationProductView
