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
      '최근 7일의 업무와 코드 근거를 사람별로 연결하고, 아직 확인하지 못한 상태까지 남긴 현황 요약.',
    summary:
      '검토된 업무일지와 change set을 우선하고, AI draft·부분 실패·오래된 결과는 경고 상태로 남겨 원문으로 돌아갈 수 있게 했습니다.',
    problemLabel: 'PROBLEM / ACTIVITY IS NOT DELIVERY',
    problem:
      '업무일지·개인/조직 계정·PR·커밋·코드 차이가 흩어져 있었습니다. 변경 건수나 제목만으로 구현 완료와 배포를 판단하면 사람과 결과를 잘못 연결할 수 있었습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / EVIDENCE ROLLUP',
    title: '요약은 끝점이 아니라 근거로 돌아가는 입구.',
    instruction: '사람·계정 연결 · 기록의 종류와 검토 상태 · 변경 근거 · 부분 결과 · 갱신 주기',
    defaultAnnotation: {
      index: '00', label: 'ROLLUP GUIDE', title: '사람별로 연결된 최근 업무와 확인할 지점을 모았습니다.',
      body: '업무일지와 코드 변경에서 최근 흐름을 찾고, 검토 상태와 남은 확인 항목을 함께 읽습니다. 표시된 건수는 구성원 평가 점수가 아닙니다.',
    },
  },
  product: developerStatusProductFixture,
  annotations: [
    {
      id: 'identity-scope', index: '01', label: 'IDENTITY SCOPE', title: '사람과 계정을 추측으로 연결하지 않았다.',
      sections: [
        { label: 'WHY', body: '조직·개인 계정, 조직 이전 저장소, 서비스 계정, 공동 작업을 잘못 묶으면 다른 사람의 변경이 개인 현황으로 들어갑니다.' },
        { label: 'DECISION', body: '활성 팀원과 허용 계정을 명시적으로 연결했습니다. 서비스 계정과 연결되지 않은 변경은 개인별 집계에서 제외했습니다.' },
        { label: 'BOUNDARY', body: '공동 변경 묶음은 참여자의 근거로 연결하며, 한 사람의 단독 성과로 귀속하지 않습니다.' },
      ],
      evolution: { label: 'IDENTITY MAPPING', date: '2026.07.14 → 08.10' },
    },
    {
      id: 'source-hierarchy', index: '02', label: 'SOURCE / REVIEW STATE', title: '검토된 기록과 AI 초안을 같은 사실로 섞지 않았다.',
      sections: [
        { label: 'WHY', body: 'AI 초안에는 빠진 맥락과 모호한 표현이 남을 수 있습니다. 요약 문장만 읽으면 사람이 검토한 기록인지 구분하기 어렵습니다.' },
        { label: 'DECISION', body: '같은 원문에 연결된 검토본을 우선하고, 연결되지 않은 draft만 보조로 사용하면서 source type과 warning을 유지했습니다.' },
        { label: 'BOUNDARY', body: 'AI 초안이 포함된 요약은 ready로 표시하지 않습니다.' },
      ],
    },
    {
      id: 'grouped-evidence', index: '03', label: 'GROUPED CHANGE SET', title: '커밋 수보다, 어떤 변경이 어떤 주장에 연결되는지를 보여준다.',
      sections: [
        { label: 'WHY', body: 'PR 제목이나 커밋 개수만으로는 구현 범위·공동 작업·배포 상태를 알 수 없습니다.' },
        { label: 'DECISION', body: '코드 차이와 심벌을 변경 묶음으로 정리하고 근거 ID를 유지했습니다. 6건씩 중간 요약한 뒤 최근 7일 현황으로 합칩니다.' },
        { label: 'EVIDENCE', body: '기반 수집·처리 경로의 데이터 조회에서 변경 묶음 1,052개와 파일 변경 23,866개를 확인했습니다.' },
      ],
      evolution: { label: 'HIERARCHICAL ROLLUP', date: '2026.07.14' },
    },
    {
      id: 'partial-state', index: '04', label: 'PARTIAL STATE', title: '생성 실패가 이미 수집된 근거를 지우지 않게 했다.',
      sections: [
        { label: 'WHY', body: '일부 코드 차이나 AI 분석이 실패해도 다른 구성원의 근거와 이미 수집한 변경 묶음은 남아 있을 수 있습니다.' },
        { label: 'DECISION', body: 'ready·partial·stale·error를 구분했습니다. 실패한 묶음은 대체 요약으로 남기고 다음 실행에서 다시 시도했습니다.' },
        { label: 'BOUNDARY', body: '대체 요약에는 실패 상태를 유지해, 완료된 AI 분석과 구분합니다.' },
      ],
      evolution: { label: 'STATE UX ADDED', date: '2026.08.07' },
    },
    {
      id: 'refresh-cadence', index: '05', label: 'REFRESH CADENCE', title: '기록 도착 시각에 맞춰 갱신 주기를 고정했다.',
      sections: [
        { label: 'WHY', body: '한 push가 여러 이벤트로 나뉘면 같은 현황을 반복 생성해 AI 비용이 늘었습니다. 이른 갱신에서는 해외 구성원의 기록도 빠졌습니다.' },
        { label: 'DECISION', body: '평일 KST 13:00에 최근 7일 현황을 생성하도록 단순화하고, Message Batch 결과는 별도 주기적 조회로 회수했습니다.' },
        { label: 'BOUNDARY', body: '현황은 정해진 시점의 최근 7일 기록을 반영합니다. 실시간 활동 목록은 아닙니다.' },
      ],
      evolution: { label: 'DAILY CADENCE', date: '2026.08.20' },
    },
  ],
  workflow: {
    eyebrow: 'ROLLUP WORKFLOW', title: '계정을 연결하고, 기록 종류와 처리 상태를 남기며 집계한다.', introduction: '사람·계정 매핑에서 근거 묶음, 부분 결과, 정기 갱신으로 이어지는 흐름.',
    steps: [
      { id: 'dev-flow-map', hotspotId: 'identity-scope', index: '01', label: 'MAP', summary: '활성 사람과 허용 계정 연결' },
      { id: 'dev-flow-source', hotspotId: 'source-hierarchy', index: '02', label: 'SOURCE', summary: '검토본과 AI 초안을 구분' },
      { id: 'dev-flow-group', hotspotId: 'grouped-evidence', index: '03', label: 'GROUP', summary: '코드 차이를 변경 묶음으로 정리' },
      { id: 'dev-flow-rollup', hotspotId: 'partial-state', index: '04', label: 'ROLL UP', summary: '부분 실패 상태를 보존' },
      { id: 'dev-flow-refresh', hotspotId: 'refresh-cadence', index: '05', label: 'REFRESH', summary: '평일 13:00에 최근 7일 현황 생성' },
    ],
    boundary: '요약은 최근 업무의 근거를 찾는 진입점입니다. 완료와 배포는 명시적인 기록으로 별도 확인하며, 개인 생산성 평가에는 사용하지 않습니다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS', title: 'Describe the work. Never score the person.',
    items: [
      { statement: 'IDENTITY MUST BE EXPLICIT.', explanation: '이름 유사도나 커밋 작성자 문자열만으로 변경을 개인에게 귀속하지 않습니다.' },
      { statement: 'DEGRADED IS A VALID STATE.', explanation: '일부 분석이 실패하면 수집한 근거와 대체 요약의 범위를 함께 표시합니다.' },
      { statement: 'EVIDENCE BEFORE COMPLETION.', explanation: '완료·배포 문장은 업무일지나 변경 메타데이터에 명시적인 근거가 있을 때만 유지합니다.' },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION', title: '사람·집계 시점·처리 상태를 차례로 분리했다.', introduction: '명시적 계정 연결에 기록 도착 시각, 배치 처리, 실패 상태, 일일 갱신 규칙을 더했습니다.',
    scenes: [
      { date: '2026.07.14', label: 'IDENTITY + 7 DAYS', visual: 'identity', decision: '명시적 계정 매핑과 최근 7일 근거를 한 화면에 연결했다.', trigger: '업무일지와 여러 Git 계정이 흩어짐', change: '검토된 업무일지·코드 차이·변경 묶음 기반 현황 집계', currentEffect: '구성원별 요약에서 원본 근거로 이동' },
      { date: '2026.07.31', label: 'TIME WINDOW', visual: 'time-window', decision: '실제 기록 도착 시각에 맞춰 전체 갱신을 늦췄다.', trigger: '해외 구성원의 업무일지가 이른 집계에서 누락', change: 'KST 07:30에서 13:00으로 이동', currentEffect: '기록 도착 패턴을 반영한 갱신 시각' },
      { date: '2026.08.03', label: 'MESSAGE BATCH', visual: 'batch', decision: '즉시 응답이 필요 없는 일일 현황 생성을 배치 경로로 분리했다.', trigger: '긴 코드 차이의 처리 비용과 즉시 응답이 필요 없는 작업 특성', change: '일일 생성은 배치 처리, API/CLI의 동기 응답 계약은 유지', currentEffect: '정기 생성과 대화형 생성의 응답 방식 분리' },
      { date: '2026.08.07', label: 'PARTIAL / STALE', visual: 'partial', decision: '실패와 오래된 결과를 화면 상태로 드러냈다.', trigger: '일부 분석 장애가 빈 화면이나 ready 오인으로 이어짐', change: '초기·부분 결과·오래된 결과·대체 요약·재시도 상태 표시', currentEffect: '상세에 경고와 출처별 처리 상태 표시' },
      { date: '2026.08.20', label: 'DAILY ONLY', visual: 'daily', decision: '이벤트별 갱신을 없애고 일일 현황 생성으로 단순화했다.', trigger: '한 push가 중복 생성과 비용을 유발', change: '평일 13:00 생성 + 5분 간격 배치 결과 조회', currentEffect: '정해진 시각에 최근 7일 현황을 생성' },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / SNAPSHOT 2026.09.04', title: '연결된 evidence corpus이지, 개인 개발량이 아니다.', snapshot: '읽기 전용 production snapshot에 저장된 GitHub evidence corpus입니다.',
    items: [
      { value: '25', label: 'REPOSITORIES', meaning: 'evidence corpus에 연결된 repository record', boundary: '조직 전체 저장소나 개인 소유 수가 아님' },
      { value: '3,401', label: 'COMMIT RECORDS', meaning: 'corpus에 저장된 commit record', boundary: '개인 생산성이나 배포 횟수가 아님' },
      { value: '707', label: 'PR RECORDS', meaning: 'corpus에 저장된 pull request record', boundary: '한 사람의 성과나 merge 성공률이 아님' },
      { value: '12,543', label: 'IMPLEMENTATION CLAIMS', meaning: 'change evidence에서 추출해 저장한 구현 주장', boundary: '사람이 확정한 완료 verdict가 아님' },
    ],
  },
  implementationStatus: {
    state: 'IMPLEMENTED / DEPLOYED / SCHEDULED',
    items: ['활성 구성원과 Git 계정의 명시적 연결', 'web-reviewed worklog·all-branch change evidence', '단계별 요약·캐시·Message Batch', '부분 결과·오래된 결과·대체 요약·재시도 상태'],
    runtime: '예약·worker 코드와 production evidence corpus는 확인했다. worker heartbeat와 job별 success rate, 실제 열람·의사결정 변화·생산성 향상은 측정하지 않았다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / STATUS, NOT PERFORMANCE', statement: '확인된 운영 범위는 최근 업무의 근거 연결과 정기 생성까지.',
    items: ['커밋·PR·코드 차이의 수는 연결된 근거의 규모이며 개인 생산성 점수가 아닙니다.',   '반복 생성은 확인했지만 실제 열람과 조직 전체 활용 여부는 미확인입니다.'],
  },
  relatedSystems: [
    { title: 'WORKLOG REVIEW', relation: '날짜별 검토 완료 기록과 AI 초안의 사용 규칙', href: '/what/worklog-review', status: 'available' },
    { title: 'FEATURE VALIDATION', relation: '요구사항의 구현 여부를 근거와 대조하는 별도 검토 화면', href: '/what/feature-validation', status: 'available' },
    { title: 'AI-NATIVE ENGINEERING', relation: '중간 요약 캐시·배치·부분 실패를 관리하는 작업 흐름', href: '/how/ai-native-engineering', status: 'available' },
  ],
} as const satisfies DeveloperStatusPageContent
