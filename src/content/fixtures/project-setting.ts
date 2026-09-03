import type { ProjectSettingProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const projectSettingProductFixture = {
  productName: jadebellPublicWorld.productName,
  workspaceLabel: 'PROJECT REGISTRY / ADMIN',
  administrator: jadebellPublicWorld.people.minaKim,
  registration: {
    codePlaceholder: '예: JB-NW',
    labelPlaceholder: '예: New workspace',
    resolutionHint:
      '같은 code의 기존 row가 있으면 새로 만들기 전에 연결 보존형 승격을 확인합니다.',
  },
  trackedProjects: [
    {
      order: 1,
      code: 'JB-AT',
      label: jadebellPublicWorld.projects.atlas.name,
      scheduleCount: 18,
      pendingCount: 2,
    },
    {
      order: 2,
      code: 'JB-CN',
      label: jadebellPublicWorld.projects.canopy.name,
      scheduleCount: 12,
      pendingCount: 0,
    },
    {
      order: 3,
      code: 'JB-HB',
      label: jadebellPublicWorld.projects.harbor.name,
      scheduleCount: 9,
      pendingCount: 1,
    },
  ],
  archivedProject: {
    code: 'JB-MD',
    label: jadebellPublicWorld.projects.meadow.name,
    archivedAt: '2026.08.27',
    archiveEvent: 'project.archive / success',
    dependencyState: 'past references retained',
  },
} as const satisfies ProjectSettingProductFixture
