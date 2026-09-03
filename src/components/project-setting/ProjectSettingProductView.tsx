import type {
  ProjectSettingHotspotId,
  ProjectSettingProductFixture,
} from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface ProjectSettingProductViewProps {
  readonly fixture: ProjectSettingProductFixture
  readonly activeId: ProjectSettingHotspotId | null
  readonly onActivate: (id: ProjectSettingHotspotId) => void
}

function ProjectSettingProductView({
  fixture,
  activeId,
  onActivate,
}: ProjectSettingProductViewProps) {
  return (
    <section
      className="ps-product"
      data-has-active={activeId ? 'true' : 'false'}
      aria-label={`${fixture.productName} project registry 공개 재구성 화면`}
    >
      <header className="ps-product-topbar" aria-hidden="true">
        <span className="ps-product-brand">J</span>
        <strong>{fixture.productName}</strong>
        <span>{fixture.workspaceLabel}</span>
        <span className="ps-product-user">
          <b>{fixture.administrator.initials}</b>
          {fixture.administrator.name}
        </span>
      </header>

      <div className="ps-product-layout">
        <nav className="ps-product-nav" aria-hidden="true">
          <p>WORKSPACE</p>
          <span>개발 운영 현황</span>
          <span>프로젝트 현황</span>
          <span>품질 관리</span>
          <span>기록</span>
          <strong>관리자 페이지</strong>
          <b>프로젝트</b>
        </nav>

        <div className="ps-product-canvas">
          <header className="ps-page-head" aria-hidden="true">
            <div>
              <small>OPERATIONS DESK</small>
              <strong>관리자 페이지</strong>
              <span>팀 접근과 product registry를 서로 다른 lifecycle로 관리합니다.</span>
            </div>
            <span>REGISTRY STATUS · TRACKED</span>
          </header>

          <div className="ps-tabs" aria-hidden="true">
            <span>팀원 및 권한</span>
            <span>API 사용</span>
            <strong>프로젝트</strong>
          </div>

          <section className="ps-registry-surface">
            <header className="ps-registry-title" aria-hidden="true">
              <div><small>PROJECT REGISTRY</small><h2>프로젝트</h2></div>
              <p>표시명과 여러 화면에서 보이는 순서를 관리합니다.</p>
            </header>

            <ProductHotspot
              id="existing-row"
              activeId={activeId}
              label="Existing project row resolution"
              className="ps-register-panel"
              onActivate={onActivate}
            >
              <span className="ps-register-heading">
                <span><small>ADD OR PROMOTE</small><strong>프로젝트 추가</strong></span>
                <em>02</em>
              </span>
              <span className="ps-register-copy">{fixture.registration.resolutionHint}</span>
              <span className="ps-register-fields" aria-hidden="true">
                <span><small>STABLE CODE</small><b>{fixture.registration.codePlaceholder}</b></span>
                <span><small>DISPLAY LABEL</small><b>{fixture.registration.labelPlaceholder}</b></span>
                <strong>확인 후 추가</strong>
              </span>
            </ProductHotspot>

            <section className="ps-tracked-list" aria-label="합성 tracked project 목록">
              <header aria-hidden="true">
                <div><strong>추적 중인 프로젝트</strong><span>{fixture.trackedProjects.length} items</span></div>
                <small>ORDER SHARED ACROSS SURFACES</small>
              </header>
              <div className="ps-list-labels" aria-hidden="true">
                <span>순서</span><span>CODE / 표시명</span><span>일정</span><span>대기 후보</span><span>상태</span>
              </div>

              {fixture.trackedProjects.map((project, index) => (
                <div className="ps-project-row" key={project.code}>
                  {index === 0 ? (
                    <ProductHotspot
                      id="shared-order"
                      activeId={activeId}
                      label="Shared project ordering"
                      className="ps-order-control"
                      onActivate={onActivate}
                    >
                      <span>{project.order}</span><b aria-hidden="true">↑ ↓</b>
                    </ProductHotspot>
                  ) : (
                    <span className="ps-order-static" aria-hidden="true">{project.order}<b>↑ ↓</b></span>
                  )}

                  {index === 0 ? (
                    <ProductHotspot
                      id="stable-identity"
                      activeId={activeId}
                      label="Stable project identity and editable label"
                      className="ps-identity-control"
                      onActivate={onActivate}
                    >
                      <code>{project.code}</code><span>{project.label}</span><small>LABEL EDITABLE</small>
                    </ProductHotspot>
                  ) : (
                    <span className="ps-identity-static" aria-hidden="true"><code>{project.code}</code><span>{project.label}</span></span>
                  )}
                  <span aria-hidden="true">{project.scheduleCount}</span>
                  <span aria-hidden="true">{project.pendingCount}</span>
                  <strong aria-hidden="true">TRACKED</strong>
                </div>
              ))}
            </section>

            <section className="ps-archive-list" aria-label="합성 archived project 상태">
              <header aria-hidden="true">
                <div><strong>보관된 프로젝트</strong><span>past references retained</span></div>
                <small>NOT EVERY UNTRACKED ROW</small>
              </header>
              <div className="ps-archive-row">
                <ProductHotspot
                  id="archive-provenance"
                  activeId={activeId}
                  label="Archive event provenance"
                  className="ps-archive-record"
                  onActivate={onActivate}
                >
                  <span className="ps-archive-index">04</span>
                  <span><code>{fixture.archivedProject.code}</code><strong>{fixture.archivedProject.label}</strong></span>
                  <span><small>RECORDED EVENT</small><b>{fixture.archivedProject.archiveEvent}</b></span>
                  <span><small>ARCHIVED AT</small><b>{fixture.archivedProject.archivedAt}</b></span>
                </ProductHotspot>
                <ProductHotspot
                  id="restore-guard"
                  activeId={activeId}
                  label="Project restore revalidation"
                  className="ps-restore-guard"
                  onActivate={onActivate}
                >
                  <span>05</span>
                  <span><small>RESTORE CHECK</small><strong>provenance · conflict · dependency</strong></span>
                  <em>{fixture.archivedProject.dependencyState}</em>
                  <b aria-hidden="true">복원 검토 →</b>
                </ProductHotspot>
              </div>
            </section>
          </section>
        </div>
      </div>
    </section>
  )
}

export default ProjectSettingProductView
