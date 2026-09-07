import type { PermissionEvolutionVisual, PermissionPageContent } from '../../content/content-types.ts'
import ReusableWhatCasePage from '../product-case/ReusableWhatCasePage.tsx'
import PermissionProductView from './PermissionProductView.tsx'

function PermissionEvolutionFragment({ visual }: { readonly visual: PermissionEvolutionVisual }) {
  const fragments: Record<PermissionEvolutionVisual, readonly string[]> = {
    'read-only-need': ['SALES', '→', 'SCHEDULE', 'VIEW ONLY'],
    'oidc-role': ['IDENTITY', '→', 'SESSION', '→', 'ROLE'],
    'resource-action': ['RESOURCE', '×', 'VIEW / EDIT / DELETE / MANAGE'],
    'admin-surface': ['INVITE', '+', 'ROLE', '±', 'OVERRIDE'],
    'authority-split': ['ENTRA / SIGN-IN', '≠', 'DB / AUTHORIZATION'],
  }

  return (
    <div className="permission-evolution-fragment" data-visual={visual} aria-hidden="true">
      {fragments[visual].map((fragment, index) => <span key={`${fragment}-${index}`}>{fragment}</span>)}
    </div>
  )
}

function PermissionPage({ content }: { readonly content: PermissionPageContent }) {
  return (
    <ReusableWhatCasePage
      content={content}
      pageClassName="permission-page"
      titleId="permission-title"
      surfaceLabel="최종 권한 계산의 공개 재구성 예시"
      workflowLabel="계정 확인부터 최종 권한 적용까지"
      evolutionTargetId="permission-evolution"
      relatedLabel="권한 관리와 연결된 사례와 시스템"
      renderProduct={({ fixture, activeId, onActivate }) => (
        <PermissionProductView fixture={fixture} activeId={activeId} onActivate={onActivate} />
      )}
      renderEvolutionFragment={(visual) => <PermissionEvolutionFragment visual={visual} />}
    />
  )
}

export default PermissionPage
