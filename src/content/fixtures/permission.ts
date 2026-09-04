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
    detail: '공유 업무 surface의 기본 접근',
    permissions: ['Shared Schedule · View', 'Project summary · View'],
  },
  override: {
    label: 'Shared Schedule only',
    detail: '달라진 surface와 action만 기록',
    grants: [],
    revokes: ['Weekly Report · View', 'Executive QA · View'],
  },
  effective: {
    label: 'Schedule read-only',
    detail: 'role default와 override, protected guard를 합성한 현재 결과',
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
    detail: '권한 변경은 저장 직전 현재 effective admin을 다시 계산합니다.',
    blocked: ['last admin removal', 'delegated self-escalation', 'protected role reassignment'],
    audit: 'actor · before · after · result',
  },
} as const satisfies PermissionProductFixture
