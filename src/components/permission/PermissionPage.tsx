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
      surfaceLabel="Effective permission calculation inspection"
      workflowLabel="Identity to effective permission authorization workflow"
      evolutionTargetId="permission-evolution"
      relatedLabel="Permission related systems"
      renderProduct={({ fixture, activeId, onActivate }) => (
        <PermissionProductView fixture={fixture} activeId={activeId} onActivate={onActivate} />
      )}
      renderEvolutionFragment={(visual) => <PermissionEvolutionFragment visual={visual} />}
    />
  )
}

export default PermissionPage
