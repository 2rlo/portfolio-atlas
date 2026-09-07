import type { DeveloperStatusProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const developerStatusProductFixture = {
  productName: jadebellPublicWorld.productName,
  workspaceLabel: 'PROJECTS / DEVELOPER STATUS',
  window: '2026.08.24 — 08.28 / KST',
  people: [
    { person: jadebellPublicWorld.people.danielLee, project: 'Atlas', state: '추가 확인 필요', tone: 'partial' },
    { person: jadebellPublicWorld.people.alexSeo, project: 'Atlas', state: '근거 연결됨', tone: 'ready' },
    { person: jadebellPublicWorld.people.soraLim, project: 'Canopy', state: '일부 정보 확인됨', tone: 'partial' },
    { person: jadebellPublicWorld.people.minaKim, project: 'Cross-project', state: '근거 연결됨', tone: 'ready' },
  ],
  selected: {
    person: jadebellPublicWorld.people.danielLee,
    project: jadebellPublicWorld.projects.atlas,
    refreshedAt: 'AUG 28 · 17:42 KST',
    state: 'PARTIAL / HUMAN CHECK NEEDED',
    summary:
      '큰 요청의 시간 초과 재현 조건과 재시도 범위를 정리하고 코드 변경 묶음을 연결했습니다. UI 실패 상태는 구현 후보가 있지만 최종 반영 여부는 추가 확인이 필요합니다.',
    counts: [
      { label: 'REVIEWED WORKLOGS', value: '04' },
      { label: 'CODE EVIDENCE', value: '03' },
      { label: 'NEEDS CHECK', value: '02' },
    ],
    warnings: [
      '검토 전 AI 업무일지 초안 1건이 포함돼 있습니다.',
      '화면 상태와 코드 근거가 최종적으로 연결됐는지 확인이 필요합니다.',
    ],
    focus: [
      'API 시간 초과 재현 기준 · 요청 크기와 재시도 횟수',
      '재시도 정책 근거 · 요구사항과 코드 변경 연결',
      '실패 상태 · 최종 실패와 중간 UI 상태 차이',
    ],
    projectProgress: {
      feature: 'Partner notification retry policy',
      status: '2 / 3 REQUIREMENTS HAVE EVIDENCE',
      summary: 'R1은 사람 확인 완료, R2는 구현 근거 연결, R3은 코드 후보 확인이 남아 있습니다.',
      verified: '66%',
    },
    changes: [
      { title: 'Delivery retry boundary', date: 'AUG 27', symbols: ['RequestPolicy.apply', 'RetryWindow.limit', 'DeliveryState.fail'], state: 'LINKED' },
      { title: 'Delivery message guard', date: 'AUG 28', symbols: ['PendingDelivery.cleanup', 'RequestQueue.release'], state: 'CANDIDATE / CHECK' },
    ],
    sources: [
      { type: 'reviewed', title: 'Reviewed worklog · API timeout conditions', meta: 'AUG 28 · HUMAN REVIEWED' },
      { type: 'draft', title: 'AI draft · UI failure state check', meta: 'AUG 28 · NEEDS REVIEW' },
      { type: 'change-set', title: 'Grouped change set · Delivery retry boundary', meta: 'AUG 27 · LINKED EVIDENCE' },
    ],
  },
  cadence: {
    schedule: 'WEEKDAYS / 13:00 KST',
    window: 'ROLLING 7 DAYS',
    recovery: 'BATCH POLL / FALLBACK ON PARTIAL FAILURE',
  },
} as const satisfies DeveloperStatusProductFixture
