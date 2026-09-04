import type { WorklogReviewProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const worklogReviewProductFixture = {
  productName: jadebellPublicWorld.productName,
  workspaceLabel: 'WORKLOG REVIEW / RECONSTRUCTED',
  author: jadebellPublicWorld.people.danielLee,
  reviewer: jadebellPublicWorld.people.minaKim,
  project: jadebellPublicWorld.projects.atlas,
  queue: [
    {
      id: 'JB-WL-ATLAS-042',
      title: 'API timeout 재현 조건 점검',
      project: 'Atlas',
      date: '8월 27일',
      state: 'selected',
    },
    {
      id: 'JB-WL-CANOPY-018',
      title: '파트너 온보딩 체크',
      project: 'Canopy',
      date: '8월 27일',
      state: 'waiting',
    },
    {
      id: 'JB-WL-HARBOR-011',
      title: '검색 인덱스 갱신 확인',
      project: 'Harbor',
      date: '8월 26일',
      state: 'waiting',
    },
  ],
  source: {
    type: 'Teams worklog message',
    date: '2026.08.27 · 16:30',
    message:
      '대용량 요청에서 간헐 timeout을 재현했습니다. retry 횟수와 요청 크기 조건을 다시 확인해야 합니다.',
  },
  draft: {
    work: 'API timeout 조건을 재현하고 원인 후보를 정리함',
    result: '대용량 요청에서 간헐 timeout을 재현함',
    ambiguity: '“간헐”의 기준과 retry 횟수가 불명확합니다.',
    reviewQuestion: 'retry 횟수와 요청 크기 기준을 확인해 주세요.',
  },
  corrected: {
    result:
      '대용량 요청에서 3회 retry 뒤 timeout을 재현했습니다. 요청 크기와 retry log를 다음 검증 기준으로 확정했습니다.',
    nextCheck: '동일 조건에서 rollback 처리 결과 비교',
    reviewedAt: '2026.08.28 · 10:12',
  },
  fallback: {
    condition: 'reviewed records = 0',
    label: 'UNREVIEWED SOURCE INCLUDED',
  },
} as const satisfies WorklogReviewProductFixture
