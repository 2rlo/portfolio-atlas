import type { DeveloperStatusPageContent } from './content-types.ts'
import { developerStatusProductFixture } from './fixtures/developer-status.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'

export const developerStatusContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED STATUS VIEW / SYNTHETIC DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 07',
    titleLines: ['DEVELOPER', 'STATUS'],
    thesis:
      '최근 7일의 업무와 코드 변경을 구성원별로 모아 읽게 했다.',
    summary:
      '업무일지와 여러 Git 계정을 연결해 최근 작업을 요약한다. 검토한 기록을 우선 사용하고, 분석 실패나 오래된 결과도 화면에서 구분해 필요한 원문을 바로 열 수 있게 했다.',
    problemLabel: '흩어진 사람별 업무 기록',
    problem:
      '한 구성원의 업무가 일지와 개인 계정, 조직 계정에 나뉘어 있었다. PR 제목과 커밋 목록을 일일이 대조해야 최근 어떤 작업을 했는지 파악할 수 있었다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / EVIDENCE ROLLUP',
    title: '사람별 최근 업무와 원문',
    instruction: '구성원을 선택해 업무 요약과 코드 변경, 처리 상태를 함께 확인',
    defaultAnnotation: {
      index: '00', label: 'ROLLUP GUIDE', title: '최근 업무를 한곳에서 읽기',
      body: '최근 업무를 요약에서 읽고 관련 업무일지와 코드 변경을 연다. 일부 분석이 실패하면 수집한 자료와 처리 상태를 함께 남긴다.',
    },
  },
  product: developerStatusProductFixture,
  annotations: [
    {
      id: 'identity-scope', index: '01', label: 'IDENTITY SCOPE', title: '구성원과 Git 계정을 직접 연결',
      sections: [
        { label: 'WHY', body: '조직 계정과 개인 계정, 서비스 계정이 섞여 있어 변경 작성자 문자열만으로는 구성원을 찾기 어려웠다.' },
        { label: 'DECISION', body: '활성 팀원과 허용 계정을 직접 연결했다. 공동 변경은 참여자의 자료로 연결하고 서비스 계정은 개인 집계에서 제외했다.' },
      ],
      evolution: { label: 'IDENTITY MAPPING', date: '2026.07.14 → 08.10' },
    },
    {
      id: 'source-hierarchy', index: '02', label: 'SOURCE / REVIEW STATE', title: '검토한 업무일지를 우선 사용',
      sections: [
        { label: 'WHY', body: '같은 업무의 AI 초안과 사람이 검토한 일지가 함께 남아 있었다. 요약할 때 어떤 기록을 먼저 읽을지 정해야 했다.' },
        { label: 'DECISION', body: '같은 원문에 연결된 검토본을 우선했다. 검토본이 없는 초안은 보조로 사용하고 출처와 경고를 함께 표시했다.' },
      ],
    },
    {
      id: 'grouped-evidence', index: '03', label: 'GROUPED CHANGE SET', title: '변경을 묶어 최근 작업 요약',
      sections: [
      { label: 'WHY', body: 'PR 제목만으로 작업 내용을 읽기 어려웠고, 긴 코드 차이를 한 번에 요약하면 맥락이 빠질 수 있었다.' },
      { label: 'DECISION', body: '코드 차이와 심벌을 변경 묶음으로 정리했다. 묶음별 중간 요약을 최근 7일 현황으로 합치고, 원문으로 돌아가는 연결을 유지했다.' },
    ],
      evolution: { label: 'HIERARCHICAL ROLLUP', date: '2026.07.14' },
    },
    {
      id: 'partial-state', index: '04', label: 'PARTIAL STATE', title: '실패해도 수집한 자료는 보존',
      sections: [
        { label: 'WHY', body: '일부 분석이 실패했을 때 전체 화면을 비우면, 정상적으로 수집한 다른 구성원의 기록까지 볼 수 없었다.' },
        { label: 'DECISION', body: '정상과 부분 결과, 오래된 결과, 오류를 구분했다. 실패한 묶음은 대체 요약과 실패 상태를 남기고 다음 실행에서 재시도했다.' },
      ],
      evolution: { label: 'STATE UX ADDED', date: '2026.08.07' },
    },
    {
      id: 'refresh-cadence', index: '05', label: 'REFRESH CADENCE', title: '기록 도착에 맞춘 갱신 시각',
      sections: [
        { label: 'WHY', body: '한 push가 여러 이벤트로 나뉘면 같은 현황을 반복 생성했다. 이른 시각의 집계에서는 해외 구성원의 업무일지도 빠졌다.' },
        { label: 'DECISION', body: '평일 KST 13:00에 최근 7일 현황을 생성하도록 바꿨다. 즉시 응답이 필요 없는 일일 생성은 Message Batch로 처리하고 결과를 주기적으로 회수한다.' },
      ],
      evolution: { label: 'DAILY CADENCE', date: '2026.08.20' },
    },
  ],
  workflow: {
    eyebrow: 'ROLLUP WORKFLOW', title: '구성원별 현황을 만드는 순서', introduction: '계정을 연결하고 업무 기록과 코드 변경을 모아, 정해진 시각에 최근 현황을 갱신한다.',
    steps: [
      { id: 'dev-flow-map', hotspotId: 'identity-scope', index: '01', label: 'MAP', summary: '활성 구성원과 허용 계정 연결' },
      { id: 'dev-flow-source', hotspotId: 'source-hierarchy', index: '02', label: 'SOURCE', summary: '검토본과 AI 초안을 구분' },
      { id: 'dev-flow-group', hotspotId: 'grouped-evidence', index: '03', label: 'GROUP', summary: '코드 차이를 변경 묶음으로 정리' },
      { id: 'dev-flow-rollup', hotspotId: 'partial-state', index: '04', label: 'ROLL UP', summary: '부분 실패 상태를 보존' },
      { id: 'dev-flow-refresh', hotspotId: 'refresh-cadence', index: '05', label: 'REFRESH', summary: '평일 13:00에 최근 7일 현황 생성' },
    ],
    boundary: '요약에서 최근 작업 흐름을 읽고 필요한 업무일지와 코드 변경을 바로 연다. 처리 상태를 함께 표시해 다시 확인할 항목을 고를 수 있다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS', title: '업무 기록에 맞춘 집계 설계',
    items: [
      { statement: '계정은 직접 연결', explanation: '활성 구성원에 허용 계정을 연결해 개인 계정과 조직 계정의 작업을 함께 읽는다.' },
      { statement: '실패한 부분도 표시', explanation: '일부 분석이 실패해도 수집한 자료를 보존하고 대체 요약에 처리 상태를 표시한다.' },
      { statement: '요약에서 원문으로 이동', explanation: '중간 요약과 최종 현황에 원본 연결을 유지해, 작업 내용과 완료 기록을 직접 열어볼 수 있게 했다.' },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION', title: '실제 기록 흐름에 맞춰 집계 개선', introduction: '해외 구성원의 기록 누락과 중복 생성을 겪으며, 갱신 시각과 배치 처리 방식을 바꿨다.',
    scenes: [
      { date: '2026.07.14', label: 'IDENTITY + 7 DAYS', visual: 'identity', decision: '계정 연결 관계와 최근 7일의 업무 자료를 한 화면에서 확인하게 했다.', trigger: '업무일지와 여러 Git 계정이 흩어짐', change: '검토된 업무일지·코드 차이·변경 묶음 기반 현황 집계', currentEffect: '구성원별 요약에서 원본 근거로 이동' },
      { date: '2026.07.31', label: 'TIME WINDOW', visual: 'time-window', decision: '실제 기록 도착 시각에 맞춰 전체 갱신을 늦췄다.', trigger: '해외 구성원의 업무일지가 이른 집계에서 누락', change: 'KST 07:30에서 13:00으로 이동', currentEffect: '기록 도착 패턴을 반영한 갱신 시각' },
      { date: '2026.08.03', label: 'MESSAGE BATCH', visual: 'batch', decision: '즉시 응답이 필요 없는 일일 현황 생성을 배치 경로로 분리했다.', trigger: '긴 코드 차이의 처리 비용과 즉시 응답이 필요 없는 작업 특성', change: '일일 생성은 배치 처리, API/CLI의 동기 응답 계약은 유지', currentEffect: '정기 생성과 대화형 생성의 응답 방식 분리' },
      { date: '2026.08.07', label: 'PARTIAL / STALE', visual: 'partial', decision: '실패와 오래된 결과를 화면 상태로 드러냈다.', trigger: '일부 분석 장애가 빈 화면이나 ready 오인으로 이어짐', change: '초기·부분 결과·오래된 결과·대체 요약·재시도 상태 표시', currentEffect: '상세에 경고와 출처별 처리 상태 표시' },
      { date: '2026.08.20', label: 'DAILY ONLY', visual: 'daily', decision: '이벤트별 갱신을 없애고 일일 현황 생성으로 단순화했다.', trigger: '한 push가 중복 생성과 비용을 유발', change: '평일 13:00 생성 + 5분 간격 배치 결과 조회', currentEffect: '정해진 시각에 최근 7일 현황을 생성' },
    ],
  },
  evidence: {
    eyebrow: '운영에서 바꾼 점',
    title: '기록 도착과 처리 비용에 맞춘 갱신',
    snapshot: '이벤트마다 다시 만들던 현황을 일일 생성으로 바꾸고, 해외 구성원의 업무일지가 도착하는 시각을 반영했다.',
    items: [],
  },
  implementationStatus: {
    state: '평일 13:00, 최근 7일 현황',
    items: [
      'KST 07:30 집계를 13:00으로 이동',
      '묶음별 중간 요약과 캐시로 긴 코드 차이 처리',
      '일일 생성은 Message Batch로 처리하고 5분마다 결과 회수',
      '실패한 묶음은 대체 요약을 남기고 다음 실행에서 재시도',
    ],
    runtime: '정기 생성은 배치로 처리하고 API와 CLI의 동기 응답은 유지했다. 호출 방식에 맞춰 결과를 받는 경로를 나눴다.',
  },
  boundary: {
    eyebrow: '설계에서 배운 점',
    statement: '집계 시각도 제품 동작의 일부였다.',
    items: [
      '해외 구성원의 기록이 빠진 이유는 수집 조건보다 집계 시각에 있었다. 실제 도착 패턴을 보고 일일 갱신을 늦췄다.',
      '부분 실패를 빈 화면으로 처리하지 않고 수집한 자료와 함께 남겼다. 운영자는 재시도할 지점을 확인하고 사용자는 나머지 업무를 계속 읽을 수 있다.',
    ],
  },
  relatedSystems: [
    { title: 'WORKLOG REVIEW', relation: '날짜별 검토 완료 기록과 AI 초안의 사용 규칙', href: '/what/worklog-review', status: 'available' },
    { title: 'FEATURE VALIDATION', relation: '요구사항의 구현 여부를 근거와 대조하는 별도 검토 화면', href: '/what/feature-validation', status: 'available' },
    { title: 'AI-NATIVE ENGINEERING', relation: '중간 요약 캐시·배치·부분 실패를 관리하는 작업 흐름', href: '/how/ai-native-engineering', status: 'available' },
  ],
} as const satisfies DeveloperStatusPageContent
