import type { QaProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const qaProductFixture = {
  productName: jadebellPublicWorld.productName,
  workspaceLabel: 'QUALITY / TEST REPORT',
  author: jadebellPublicWorld.people.alexSeo,
  project: jadebellPublicWorld.projects.atlas,
  report: {
    title: 'Retry behavior under large request payload',
    date: '2026.08.28',
    revision: 'REVISION 03',
    purpose:
      '큰 요청이 일시적으로 실패할 때 재시도 횟수, 최종 실패 상태, 중복 실행 여부를 함께 확인합니다.',
    environment: ['Staging mirror', 'Atlas 08-28', 'Large payload'],
    assessment:
      '제한 안의 재시도는 완료됐지만 timeout 이후 목록과 상세의 상태가 어긋납니다. 이 문장은 검토 보조 요약이며 QA 판정이 아닙니다.',
    resultSummary: [
      { label: 'PASS', value: '01' },
      { label: 'FAIL', value: '01' },
      { label: 'TOTAL', value: '02' },
    ],
  },
  testCases: [
    {
      id: 'TC-001',
      title: 'Retry succeeds within the allowed limit',
      result: 'PASS',
      precondition: '8 MB 요청 · 일시 전송 실패 2회',
      expected: '허용 횟수 안에서 완료되고 중복 이벤트가 생기지 않음',
      actual: '2회 재시도 뒤 정상 완료 · 중복 이벤트 없음',
      attachments: [
        { name: 'retry-log.txt', type: 'file' },
        { name: 'request-state.png', type: 'image' },
        { name: 'event-trace.json', type: 'file' },
      ],
    },
    {
      id: 'TC-002',
      title: 'Timeout leaves a clear final failure state',
      result: 'FAIL',
      precondition: '16 MB 요청 · 강제 timeout',
      expected: '목록과 상세가 같은 최종 실패 상태를 표시함',
      actual: '상세는 실패로 바뀌지만 목록은 처리 중 상태를 유지함',
      discussion: '목록 갱신 시점과 재실행 버튼 노출 조건을 다시 확인해야 합니다.',
      attachments: [
        { name: 'timeout-state.png', type: 'image' },
        { name: 'ui-sequence.mp4', type: 'video' },
      ],
    },
  ],
  revisions: [
    {
      revision: '03',
      author: 'Alex Seo',
      time: '17:42',
      change: 'FAIL 논의 지점과 화면 순서 영상 추가',
    },
    {
      revision: '02',
      author: 'Alex Seo',
      time: '15:18',
      change: 'TC-001 실제 결과 문구와 첨부 갱신',
    },
    {
      revision: '01',
      author: 'Daniel Lee',
      time: '11:06',
      change: '초기 테스트 기록 작성',
    },
  ],
} as const satisfies QaProductFixture
