import type { ReportProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const reportProductFixture = {
  productName: jadebellPublicWorld.productName,
  workspaceLabel: 'PROJECT STATUS / WEEKLY SUMMARY',
  weeks: [
    { label: '8월 4주', state: 'current' },
    { label: '8월 3주', state: 'fallback' },
    { label: '8월 2주', state: 'history' },
    { label: '8월 1주', state: 'history' },
    { label: '7월 4주', state: 'history' },
  ],
  selectedWeek: {
    label: '8월 4주',
    range: '2026년 8월 24일 – 8월 28일',
    generatedAt: '생성 2026. 8. 28. 오후 5:40',
  },
  sourceState: {
    label: '검토완료 기록 기반',
    detail: 'reviewed worklogs · QA records · confirmed meetings',
    fallbackLabel: '8월 3주 · 미검토 초안 포함',
  },
  generation: {
    action: '주간 요약 생성',
    automatic: '월요일 자동 생성',
    manual: '권한 보유자 수동 생성',
    locale: 'KO ACTIVE',
    gatedLocale: 'EN QUALITY GATE',
  },
  metrics: [
    { label: '완료 작업', value: '12' },
    { label: '위험 건수', value: '3' },
    { label: '회의', value: '2' },
    { label: '참여 인원', value: '5' },
    { label: '업무일지 수', value: '18' },
  ],
  tests: [
    { label: 'PASS', value: '6', tone: 'pass' },
    { label: 'FAIL', value: '2', tone: 'fail' },
    { label: 'HOLD', value: '1', tone: 'hold' },
  ],
  reportSections: [
    {
      label: '한 줄 요약',
      introduction:
        'Atlas 릴리스 준비에서 복구 경로를 확인했고, Canopy 파트너 범위와 Harbor 배포 순서를 정리했습니다.',
      entries: [],
    },
    {
      label: '주요 성과',
      entries: [
        {
          title: 'Atlas · 인증 롤백 준비',
          body: '출시 전 복구 경로와 담당자 확인을 마치고 실패 시점별 대응 순서를 정리했습니다.',
        },
        {
          title: 'Atlas · API timeout 재현 기준',
          body: '세 번째 재시도 뒤 timeout이 발생하는 조건을 확인하고 다음 검증 기준을 확정했습니다.',
          source: {
            record: 'JB-WL-ATLAS-042',
            status: '검토 완료 source',
            lineage: 'Daniel Lee → Mina Kim',
          },
        },
        {
          title: 'Canopy · 파트너 접근 정리',
          body: '온보딩 단계별 조회 범위와 담당자 확인 일정을 공유 일정에 반영했습니다.',
        },
      ],
    },
    {
      label: '진행 중 / 주의 필요',
      entries: [
        {
          title: 'Harbor · 검색 색인 갱신',
          body: '승인 이후 모니터링과 복구 확인이 남아 있어 완료 상태로 올리지 않았습니다.',
        },
      ],
    },
  ],
} as const satisfies ReportProductFixture
