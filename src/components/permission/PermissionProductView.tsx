import type { PermissionHotspotId, PermissionProductFixture } from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface PermissionProductViewProps {
  readonly fixture: PermissionProductFixture
  readonly activeId: PermissionHotspotId | null
  readonly onActivate: (id: PermissionHotspotId) => void
}

const permissionMarks = {
  role: 'R',
  override: '−',
  guard: 'G',
  none: '·',
} as const

function PermissionProductView({ fixture, activeId, onActivate }: PermissionProductViewProps) {
  return (
    <section
      className="permission-product"
      data-has-active={activeId ? 'true' : 'false'}
      aria-label={`${fixture.productName} effective permission 공개 재구성 화면`}
    >
      <header className="permission-topbar" aria-hidden="true">
        <span>J</span>
        <strong>{fixture.productName}</strong>
        <em>{fixture.workspaceLabel}</em>
        <b>ADMIN · ACCESS</b>
      </header>

      <div className="permission-canvas">
        <header className="permission-head" aria-hidden="true">
          <div><small>OPERATIONS DESK</small><h2>팀원 및 권한</h2><p>역할 기본값과 개인별 차이를 합성해 실제 적용 권한을 확인합니다.</p></div>
          <span>TEAM & PERMISSIONS</span>
        </header>

        <div className="permission-layout">
          <aside className="permission-member-list" aria-hidden="true">
            <header><strong>팀원 {fixture.members.length}명</strong><span>활성 / 연결 상태</span></header>
            {fixture.members.map((member) => (
              <span data-selected={member.person.id === fixture.selected.person.id ? 'true' : 'false'} key={member.person.id}>
                <b>{member.person.initials}</b>
                <span><strong>{member.person.name}</strong><small>{member.role}</small></span>
                <em data-state={member.state}>{member.state === 'active' ? '●' : '○'}</em>
              </span>
            ))}
          </aside>

          <div className="permission-detail">
            <ProductHotspot
              id="identity-link"
              activeId={activeId}
              label="Authenticated identity and application access linkage"
              className="permission-identity"
              onActivate={onActivate}
            >
              <span className="permission-avatar">{fixture.selected.person.initials}</span>
              <span className="permission-person"><strong>{fixture.selected.person.name}</strong><small>{fixture.selected.person.role}</small></span>
              <em>{fixture.selected.state}</em>
              <span className="permission-identity-meta"><small>IDENTITY GATE</small><strong>{fixture.selected.identityGate}</strong></span>
              <span className="permission-identity-meta"><small>APPLICATION LINK</small><strong>{fixture.selected.linkedState}</strong></span>
              <span className="permission-identity-meta"><small>LAST CHECKED</small><strong>{fixture.selected.lastChecked}</strong></span>
            </ProductHotspot>

            <section className="permission-equation" aria-label="Role default and personal override composition">
              <ProductHotspot
                id="role-default"
                activeId={activeId}
                label="Reusable role permission defaults including no-template state"
                className="permission-role-card"
                onActivate={onActivate}
              >
                <span>02</span><small>ROLE DEFAULT</small><strong>{fixture.roleDefault.label}</strong><p>{fixture.roleDefault.detail}</p>
                <em>{fixture.roleDefault.permissions.join(' · ')}</em>
              </ProductHotspot>
              <b aria-hidden="true">±</b>
              <ProductHotspot
                id="personal-override"
                activeId={activeId}
                label="Difference-only personal permission override"
                className="permission-override-card"
                onActivate={onActivate}
              >
                <span>03</span><small>PERSONAL OVERRIDE</small><strong>{fixture.override.label}</strong><p>{fixture.override.detail}</p>
                <em>{fixture.override.revokes.join(' · ')}</em>
              </ProductHotspot>
              <b aria-hidden="true">=</b>
              <div className="permission-effective-card" aria-hidden="true">
                <span>04</span><small>EFFECTIVE</small><strong>{fixture.effective.label}</strong><p>{fixture.effective.detail}</p>
              </div>
            </section>

            <ProductHotspot
              id="effective-permission"
              activeId={activeId}
              label="Resource by action effective permission matrix shared by UI and API"
              className="permission-matrix"
              onActivate={onActivate}
            >
              <span className="permission-matrix-title"><span><small>04 / EFFECTIVE PERMISSION</small><strong>실제 적용 권한</strong></span><em>ROLE DEFAULT ± OVERRIDE + GUARD</em></span>
              <span className="permission-matrix-legend"><i data-state="role">R</i>Role default<i data-state="override">−</i>Personal override<i data-state="guard">G</i>System guard</span>
              <span className="permission-matrix-head"><b>PRODUCT SURFACE / RESOURCE</b><b>VIEW</b><b>EDIT</b><b>DELETE</b><b>MANAGE</b><b>EFFECTIVE</b></span>
              {fixture.matrix.map((row) => (
                <span className="permission-matrix-row" key={row.resource}>
                  <span><strong>{row.resource}</strong><small>{row.scope}</small></span>
                  {row.actions.map((action) => <i data-state={action.state} key={action.label}>{permissionMarks[action.state]}</i>)}
                  <em data-result={row.result.toLowerCase()}>{row.result}</em>
                </span>
              ))}
            </ProductHotspot>

            <ProductHotspot
              id="protected-change"
              activeId={activeId}
              label="Transactional lockout and delegated escalation guard"
              className="permission-guard"
              onActivate={onActivate}
            >
              <span>05</span>
              <span><small>PROTECTED CHANGE</small><strong>{fixture.guard.label}</strong></span>
              <p>{fixture.guard.detail}</p>
              <span className="permission-blocked-list">{fixture.guard.blocked.map((item) => <b key={item}>{item}</b>)}</span>
              <em>AUDIT / {fixture.guard.audit}</em>
              <strong className="permission-save">권한 변경 저장</strong>
            </ProductHotspot>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PermissionProductView
