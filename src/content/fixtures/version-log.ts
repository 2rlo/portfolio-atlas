import type { VersionLogProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const versionLogProductFixture = {
  productName: jadebellPublicWorld.productName,
  workspaceLabel: 'VERSION & RELEASE RECORDS',
  project: jadebellPublicWorld.projects.atlas,
  filters: [
    { label: 'ALL BUILDS', active: true },
    { label: 'RELEASE ONLY', active: false },
    { label: 'DEVELOPMENT', active: false },
  ],
  query: {
    label: 'LATEST RELEASE / ATLAS BENCH',
    value: '날짜만이 아니라 release status와 호환 대상을 함께 확인',
    result: '1 MATCH · SOURCE AVAILABLE',
  },
  groups: [
    {
      date: '2026.08.24',
      records: [
        {
          product: 'Atlas Edge',
          version: '3.0.0-rc2',
          displayName: 'Atlas Edge Preview Release',
          releaseStatus: 'DEVELOPMENT',
          compatibility: 'Edge Controller · preview hardware',
          selected: false,
        },
        {
          product: 'Atlas Bench',
          version: '2.7.4',
          displayName: 'Atlas Bench Stable',
          releaseStatus: 'RELEASE',
          compatibility: 'Bench Controller v3',
          selected: true,
        },
      ],
    },
    {
      date: '2026.08.21',
      records: [
        {
          product: 'Atlas Edge',
          version: '2.9.6',
          displayName: 'Atlas Edge Stable',
          releaseStatus: 'RELEASE',
          compatibility: 'Edge Controller v2+',
          selected: false,
        },
      ],
    },
    {
      date: '2026.08.12',
      records: [
        {
          product: 'Atlas Bench',
          version: '2.7.3',
          displayName: 'Atlas Bench Maintenance',
          releaseStatus: 'RELEASE',
          compatibility: 'Bench Controller v2+',
          selected: false,
        },
      ],
    },
  ],
  selected: {
    product: 'Atlas Bench',
    version: '2.7.4',
    displayName: 'Atlas Bench Stable',
    releaseStatus: 'RELEASE',
    releaseDate: '2026.08.24',
    compatibility: ['Bench Controller v3', 'Operator Console 2+'],
    updates: ['실패 상태에서 다음 행동 표시', '복구 확인 단계의 상태 문구 정리'],
    fixes: ['간헐적 중복 알림 방지', '빈 선택값이 있는 기록의 표시 오류 보완'],
    deploymentNote: '업데이트 전 진행 중인 알림 큐를 비우고 복구 체크리스트를 확인합니다.',
  },
  sourceTrace: {
    source: 'SYNCED WORKSPACE VERSION DATABASE',
    sync: 'DAILY · 07:00 KST',
    structuredLookup: 'STATUS + DATE + COMPATIBILITY',
    semanticIndex: 'SEARCH INDEX READY',
    reference: 'SOURCE RECORD AVAILABLE',
  },
} as const satisfies VersionLogProductFixture
