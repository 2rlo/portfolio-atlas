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
      '사람을 점수화하지 않고, 최근 업무와 코드 근거가 어디까지 연결됐는지 보여주는 7일 롤업.',
    summary:
      '검토된 업무일지와 change set을 우선하고, AI draft·부분 실패·오래된 결과는 경고 상태로 남겨 원문으로 돌아갈 수 있게 했습니다.',
    problemLabel: 'PROBLEM / ACTIVITY IS NOT DELIVERY',
    problem:
      '업무일지·개인/조직 계정·PR·commit·diff가 흩어져 있었고, commit 수나 제목만으로 구현 완료와 배포를 판단하면 사람과 결과를 잘못 연결할 수 있었습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / EVIDENCE ROLLUP',
    title: '요약은 끝점이 아니라 근거로 돌아가는 입구.',
    instruction: 'identity, source hierarchy, grouped evidence, partial state, cadence를 선택해 집계의 설계 경계를 확인하세요.',
    defaultAnnotation: {
      index: '00', label: 'ROLLUP GUIDE', title: '이 화면은 개인 평가표가 아닙니다.',
      body: '최근 7일의 업무 흐름과 연결된 근거, 아직 확인해야 할 지점을 한 사람 단위로 펼쳐봅니다. 수치의 크기를 구성원 비교에 사용하지 않습니다.',
    },
  },
  product: developerStatusProductFixture,
  annotations: [
    {
      id: 'identity-scope', index: '01', label: 'IDENTITY SCOPE', title: '사람과 계정을 추측으로 연결하지 않았다.',
      sections: [
        { label: 'WHY', body: '조직·개인 계정, 조직 이전 저장소, 서비스 계정, 공동 작업을 잘못 묶으면 다른 사람의 변경이 개인 현황으로 들어갑니다.' },
        { label: 'DECISION', body: '활성 팀원과 허용된 login을 명시적으로 매핑하고 서비스 계정과 미매핑 변경은 개인 rollup에서 제외했습니다.' },
        { label: 'BOUNDARY', body: '공동 change set은 특정 개인의 단독 성과를 뜻하지 않습니다.' },
      ],
      evolution: { label: 'IDENTITY MAPPING', date: '2026.07.14 → 08.10' },
    },
    {
      id: 'source-hierarchy', index: '02', label: 'SOURCE HIERARCHY', title: '검토된 기록과 AI 초안을 같은 사실로 섞지 않았다.',
      sections: [
        { label: 'WHY', body: 'AI draft에는 생략된 맥락과 모호한 표현이 남을 수 있습니다. 깔끔한 요약 문장만 보면 검토 여부를 잃습니다.' },
        { label: 'DECISION', body: '검토 완료 업무일지를 우선하고, 없는 날짜의 draft만 보조로 사용하면서 source type과 warning을 유지했습니다.' },
        { label: 'BOUNDARY', body: 'draft가 포함된 요약은 ready 상태로 보이지 않습니다.' },
      ],
    },
    {
      id: 'grouped-evidence', index: '03', label: 'GROUPED CHANGE SET', title: '커밋 수보다, 어떤 변경이 어떤 주장에 연결되는지를 보여준다.',
      sections: [
        { label: 'WHY', body: 'PR 제목이나 commit 개수는 구현 범위·공동 작업·배포 상태를 설명하지 못합니다.' },
        { label: 'DECISION', body: 'diff와 symbol을 change set으로 묶고 evidence id를 유지한 채 6건 단위 digest를 거쳐 7일 rollup으로 합쳤습니다.' },
        { label: 'EVIDENCE', body: '기반 파이프라인 snapshot에는 1,052개 change set과 23,866개 file change가 있었습니다.' },
      ],
      evolution: { label: 'HIERARCHICAL ROLLUP', date: '2026.07.14' },
    },
    {
      id: 'partial-state', index: '04', label: 'PARTIAL STATE', title: '생성 실패가 이미 수집된 근거를 지우지 않게 했다.',
      sections: [
        { label: 'WHY', body: '일부 diff나 AI 분석이 실패해도 다른 구성원의 근거와 이미 수집된 change set은 유효할 수 있습니다.' },
        { label: 'DECISION', body: 'ready·partial·stale·error를 분리하고 실패 묶음은 fallback 요약으로 남겨 다음 실행에서 재시도했습니다.' },
        { label: 'BOUNDARY', body: 'fallback은 성공한 AI 분석처럼 표시하지 않습니다.' },
      ],
      evolution: { label: 'STATE UX ADDED', date: '2026.08.07' },
    },
    {
      id: 'refresh-cadence', index: '05', label: 'REFRESH CADENCE', title: '실시간처럼 보이는 것보다, 누락 없이 예측 가능한 갱신을 택했다.',
      sections: [
        { label: 'WHY', body: '한 push가 여러 이벤트로 fan-out되면 같은 현황과 AI 비용이 반복됐고, 이른 갱신은 해외 구성원의 기록을 놓쳤습니다.' },
        { label: 'DECISION', body: '평일 KST 13:00의 최근 7일 일일 생성으로 단순화하고 Message Batch 결과는 별도 polling으로 회수했습니다.' },
        { label: 'BOUNDARY', body: '이 화면은 실시간 activity feed가 아닙니다.' },
      ],
      evolution: { label: 'DAILY CADENCE', date: '2026.08.20' },
    },
  ],
  workflow: {
    eyebrow: 'ROLLUP WORKFLOW', title: 'Identity부터 상태까지, 근거의 신뢰도를 버리지 않는 집계.', introduction: '단계마다 위 detail surface의 관련 영역이 함께 강조됩니다.',
    steps: [
      { id: 'dev-flow-map', hotspotId: 'identity-scope', index: '01', label: 'MAP', summary: '활성 사람과 허용 계정 연결' },
      { id: 'dev-flow-source', hotspotId: 'source-hierarchy', index: '02', label: 'SOURCE', summary: '검토본과 draft를 구분' },
      { id: 'dev-flow-group', hotspotId: 'grouped-evidence', index: '03', label: 'GROUP', summary: 'diff를 change set으로 묶음' },
      { id: 'dev-flow-rollup', hotspotId: 'partial-state', index: '04', label: 'ROLL UP', summary: '부분 실패 상태를 보존' },
      { id: 'dev-flow-refresh', hotspotId: 'refresh-cadence', index: '05', label: 'REFRESH', summary: '평일 13:00 snapshot' },
    ],
    boundary: '요약은 최근 흐름을 찾는 navigation입니다. 완료·배포·개인 생산성 평가의 최종 근거가 아닙니다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS', title: 'Describe the work. Never score the person.',
    items: [
      { statement: 'IDENTITY MUST BE EXPLICIT.', explanation: '이름 유사도나 commit author 문자열만으로 개인에게 변경을 귀속하지 않습니다.' },
      { statement: 'DEGRADED IS A VALID STATE.', explanation: '일부 분석 실패를 숨기지 않고 수집 근거와 fallback의 범위를 함께 표시합니다.' },
      { statement: 'EVIDENCE BEFORE COMPLETION.', explanation: '완료·배포 문장은 업무일지나 change metadata의 명시적 근거가 있을 때만 유지합니다.' },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION', title: '더 빠른 갱신보다, 더 정확한 사람·시간·상태 경계로.', introduction: '현재 roster, warning, cadence component에 남은 변화입니다.',
    scenes: [
      { date: '2026.07.14', label: 'IDENTITY + 7 DAYS', visual: 'identity', decision: '명시적 계정 매핑과 최근 7일 근거를 한 화면에 연결했다.', trigger: '업무일지와 여러 Git identity가 흩어짐', change: 'reviewed worklog·diff·change set 기반 rollup', currentEffect: '구성원별 summary에서 source detail로 이동' },
      { date: '2026.07.31', label: 'TIME WINDOW', visual: 'time-window', decision: '실제 기록 도착 시각에 맞춰 전체 갱신을 늦췄다.', trigger: '해외 구성원의 업무일지가 이른 집계에서 누락', change: 'KST 07:30에서 13:00으로 이동', currentEffect: '화면 freshness 기준이 운영 패턴을 반영' },
      { date: '2026.08.03', label: 'MESSAGE BATCH', visual: 'batch', decision: '지연 가능한 일일 rollup을 batch 경로로 분리했다.', trigger: '긴 diff 처리 비용과 즉시 응답 불필요', change: '일일 생성은 batch, API/CLI는 동기 계약 유지', currentEffect: 'cadence와 interactive generation의 SLA 분리' },
      { date: '2026.08.07', label: 'PARTIAL / STALE', visual: 'partial', decision: '실패와 오래된 결과를 화면 상태로 드러냈다.', trigger: '일부 분석 장애가 빈 화면이나 ready 오인으로 이어짐', change: 'initial·partial·stale·fallback·retry UX', currentEffect: '경고와 source별 상태가 detail에 남음' },
      { date: '2026.08.20', label: 'DAILY ONLY', visual: 'daily', decision: 'event fan-out 갱신을 없애고 일일 snapshot으로 단순화했다.', trigger: '한 push가 중복 생성과 비용을 유발', change: '평일 13:00 생성 + 5분 batch polling', currentEffect: '예측 가능한 7일 rollup으로 운영' },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / SNAPSHOT 2026.08.26', title: '수집·처리 이력이지, 개인 개발량이 아니다.', snapshot: '서로 다른 기간과 재처리가 섞인 pipeline snapshot입니다.',
    items: [
      { value: '1,052', label: 'CHANGE SETS', meaning: '화면이 참조할 수 있는 수집 변경 묶음', boundary: '특정 개인의 산출량이 아님' },
      { value: '23,866', label: 'FILE CHANGES', meaning: 'change set에 포함된 파일 변경 기록', boundary: '코드 품질·생산성 지표가 아님' },
      { value: '255', label: 'READY ROLLUPS', meaning: '운영 DB에 기록된 성공 결과 이력', boundary: '고유 사용자나 화면 조회 수가 아님' },
      { value: '104 / 32', label: 'PARTIAL / ERROR', meaning: '부분 결과와 영구 오류 처리 이력', boundary: '같은 기간의 성공률로 환산하지 않음' },
    ],
  },
  implementationStatus: {
    state: 'IMPLEMENTED / DEPLOYED / SCHEDULED',
    items: ['활성 구성원·Git identity 명시 매핑', 'reviewed worklog·all-branch change evidence', 'hierarchical digest·cache·Message Batch', 'partial·stale·fallback·retry 상태'],
    runtime: '평일 KST 13:00에 최근 7일 snapshot을 생성하고 batch 결과를 회수합니다. 반복 생성은 확인됐지만 실제 열람자 수·의사결정 변화·생산성 향상은 측정하지 않았습니다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / STATUS, NOT PERFORMANCE', statement: 'Evidence can describe recent work. It cannot rank a person.',
    items: ['commit·PR·diff 수를 개인 생산성 점수로 사용하지 않습니다.', '공동 change set을 한 사람의 단독 성과로 단정하지 않습니다.', 'AI 요약만으로 구현 완료·production 배포를 확정하지 않습니다.', '반복 생성과 조직 adoption·실제 열람을 동일시하지 않습니다.'],
  },
  relatedSystems: [
    { title: 'WORKLOG REVIEW', relation: '검토 완료 기록과 draft의 source hierarchy', href: '/what/worklog-review', status: 'available' },
    { title: 'FEATURE VALIDATION', relation: '상세 구현 판정은 별도 canonical surface에서 확인', href: '/what/feature-validation', status: 'available' },
    { title: 'AI-NATIVE ENGINEERING', relation: 'digest cache·batch·partial failure를 관리하는 workflow', href: '/how/ai-native-engineering', status: 'available' },
  ],
} as const satisfies DeveloperStatusPageContent
