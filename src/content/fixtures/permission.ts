import type { PermissionProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const permissionProductFixture = {
  productName: jadebellPublicWorld.productName,
  workspaceLabel: 'OPERATIONS DESK / TEAM ACCESS',
  members: [
    { person: jadebellPublicWorld.people.minaKim, role: 'Workspace Admin', state: 'active' },
    { person: jadebellPublicWorld.people.danielLee, role: 'Product Engineer', state: 'active' },
    { person: jadebellPublicWorld.people.juliaHan, role: 'Partner Manager', state: 'active' },
    { person: jadebellPublicWorld.people.alexSeo, role: 'QA Engineer', state: 'active' },
    { person: jadebellPublicWorld.people.soraLim, role: 'No template', state: 'unlinked' },
  ],
  selected: {
    person: jadebellPublicWorld.people.juliaHan,
    state: 'ACTIVE',
    identityGate: 'Company sign-in group',
    linkedState: 'Identity linked · application access assigned',
    lastChecked: '8월 28일',
  },
  roleDefault: {
    label: 'Partner Manager',
    detail: '공유 업무 화면의 기본 접근 권한',
    permissions: ['Shared Schedule · View', 'Project summary · View'],
  },
  override: {
    label: 'Shared Schedule only',
    detail: '자원·행동별로 기본값과 달라진 권한만 기록',
    grants: [],
    revokes: ['Weekly Report · View', 'Executive QA · View'],
  },
  effective: {
    label: 'Schedule read-only',
    detail: '역할 기본값·개인 예외·보호 규칙을 반영한 현재 권한',
  },
  matrix: [
    {
      resource: 'Shared Schedule',
      scope: 'shared timeline',
      actions: [
        { label: 'VIEW', state: 'role' },
        { label: 'EDIT', state: 'none' },
        { label: 'DELETE', state: 'none' },
        { label: 'MANAGE', state: 'none' },
      ],
      result: 'READ-ONLY',
    },
    {
      resource: 'Weekly Report',
      scope: 'project status',
      actions: [
        { label: 'VIEW', state: 'override' },
        { label: 'EDIT', state: 'none' },
        { label: 'DELETE', state: 'none' },
        { label: 'MANAGE', state: 'none' },
      ],
      result: 'HIDDEN',
    },
    {
      resource: 'Executive QA',
      scope: 'quality record',
      actions: [
        { label: 'VIEW', state: 'override' },
        { label: 'EDIT', state: 'none' },
        { label: 'DELETE', state: 'none' },
        { label: 'MANAGE', state: 'none' },
      ],
      result: 'HIDDEN',
    },
    {
      resource: 'Permission Admin',
      scope: 'protected resource',
      actions: [
        { label: 'VIEW', state: 'none' },
        { label: 'EDIT', state: 'none' },
        { label: 'DELETE', state: 'none' },
        { label: 'MANAGE', state: 'guard' },
      ],
      result: 'GUARDED',
    },
  ],
  guard: {
    label: 'Protected action guard',
    detail: '권한 변경을 저장하기 직전, 변경 후 유효한 관리자 수를 다시 계산합니다.',
    blocked: ['last admin removal', 'delegated self-escalation', 'protected role reassignment'],
    audit: 'actor · before · after · result',
  },
} as const satisfies PermissionProductFixture
