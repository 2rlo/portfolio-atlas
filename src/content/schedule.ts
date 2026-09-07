import type { SchedulePageContent } from './content-types.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'
import { scheduleProductFixture } from './fixtures/schedule.ts'

export const scheduleContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED SCHEDULE VIEW / SYNTHETIC DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 06',
    titleLines: ['SCHEDULE', 'OVERVIEW'],
    thesis:
      '흩어진 계획을 예측으로 메우지 않고, 계획·실제·변경 근거를 같은 시간축에서 검토하게 했다.',
    summary:
      'Excel 원본은 가져오기 이력으로 보존하고, 제품은 확정 계획을 읽습니다. 자연어 변경 요청은 검토 대기안으로 만들었습니다.',
    problemLabel: 'PROBLEM / DIFFERENT FILES, DIFFERENT TRUTH',
    problem:
      '제품마다 다른 일정 문서와 누락 필드 때문에 전체 지연과 차단 상태를 같은 기준으로 보기 어려웠고, 자동 추정은 운영 계획을 잘못 확정할 위험이 있었습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / PLAN + ACTUAL',
    title: '계획과 실제를 겹쳐 읽고, 변경은 따로 검토한다.',
    instruction:
      '계획·실제 · 누락값 · 검토 대기안 · 되돌리기 · 역할별 권한',
    defaultAnnotation: {
      index: '00',
      label: 'TIMELINE GUIDE',
      title: '계획을 보는 흐름과 바꾸는 흐름을 나눴습니다.',
      body: '현재 일정은 확정된 값으로 표시합니다. 변경안은 선택과 충돌 검사를 거쳐 적용하고, 조회 전용 역할에는 허용된 일정만 제공합니다.',
    },
  },
  product: scheduleProductFixture,
  annotations: [
    {
      id: 'canonical-timeline', index: '01', label: 'PLAN / ACTUAL',
      title: '계획 막대와 실제 진행선은 같은 상태가 아니다.',
      sections: [
        { label: 'WHY', body: '계획 날짜만 보면 진행 중인 작업이 어디까지 왔는지, 실제 날짜만 보면 기준 계획에서 얼마나 벗어났는지 알기 어렵습니다.' },
        { label: 'DECISION', body: '확정 계획 막대 위에 확인된 실제 시작·종료선을 겹쳤습니다. 실제 값이 없으면 진행선을 그리지 않습니다.' },
        { label: 'BOUNDARY', body: '진행률 100%나 날짜 경과만으로 검증 완료(Verified) 상태를 결정하지 않습니다.' },
      ],
      evolution: { label: 'ACTUAL LINE ADDED', date: '2026.08.24' },
    },
    {
      id: 'missing-data', index: '02', label: 'CONFIRM NEEDED',
      title: '빈 값은 예측하지 않고, 비어 있다는 사실을 보인다.',
      sections: [
        { label: 'WHY', body: '서로 다른 원본에는 담당자·시작일·완료 기준이 빠진 항목이 있었습니다. 그 값을 AI가 채우면 계획과 추정이 섞입니다.' },
        { label: 'DECISION', body: '필수 근거가 없으면 확인 필요와 NOT RECORDED를 남기고, 실제 진행선도 생략했습니다.' },
      ],
      evolution: { label: 'CANONICAL MODEL', date: '2026.07.16' },
    },
    {
      id: 'staged-changes', index: '03', label: 'STAGED CHANGE SET',
      title: '자연어 변경 요청을 검토 대기안으로 만든다.',
      sections: [
        { label: 'WHY', body: '담당자나 작업명으로 여러 일정을 바꾸는 요청은 대상을 잘못 찾거나 일부만 반영할 위험이 있습니다.' },
        { label: 'DECISION', body: '변경 전후를 별도 변경안으로 만들고, 사용자가 항목을 선택·수정한 뒤 한 번에 적용하게 했습니다. 일부만 반영되지 않도록 같은 트랜잭션으로 처리합니다.' },
        { label: 'BOUNDARY', body: 'AI가 해석한 변경안은 사람의 검토와 적용 요청 전까지 확정 계획에 반영되지 않습니다.' },
      ],
      evolution: { label: 'PROPOSAL WORKFLOW', date: '2026.07.21' },
    },
    {
      id: 'audit-revert', index: '04', label: 'AUDIT + REVERT',
      title: '되돌리기는 “과거 값 복사”가 아니라 최신 변경 확인이다.',
      sections: [
        { label: 'WHY', body: '적용 후 다른 수정이 생겼다면 이전 값을 그대로 되돌리는 순간 새 변경을 덮을 수 있습니다.' },
        { label: 'DECISION', body: '변경자·요청·변경 전후 값을 추가 전용 이력으로 남겼습니다. 같은 계획에 더 최신 적용이 없을 때만 되돌릴 수 있습니다.' },
        { label: 'EVIDENCE', body: '운영 데이터 조회에서 66개 계획에 연결된 168건의 변경 이력을 확인했습니다.' },
      ],
      evolution: { label: 'AUDIT CONNECTED', date: '2026.07.23' },
    },
    {
      id: 'role-boundary', index: '05', label: 'ROLE SCOPE',
      title: '같은 일정을 보여주되, 모든 역할에 같은 행동을 주지 않았다.',
      sections: [
        { label: 'WHY', body: '외부 협업 역할은 공개된 계획을 확인할 필요가 있지만 생성·적용 권한까지 가질 이유는 없었습니다.' },
        { label: 'DECISION', body: '항목별 공개 여부와 서버 경로의 권한을 함께 적용해, 조회 전용 역할에는 타임라인과 상세 보기만 제공했습니다.' },
        { label: 'BOUNDARY', body: '서버에서도 변경 권한을 검사합니다. 조회 전용 응답에는 이름의 원시 별칭 대신 표시 이름만 포함합니다.' },
      ],
      evolution: { label: 'READ-ONLY CONTRACT', date: '2026.07.20 → 08.27' },
    },
  ],
  workflow: {
    eyebrow: 'CHANGE WORKFLOW',
    title: '원본을 보존하고, 변경은 검토 가능한 사건으로 만든다.',
    introduction: '원본 가져오기부터 변경안 적용과 역할별 공유로 이어지는 흐름.',
    steps: [
      { id: 'schedule-flow-import', hotspotId: 'missing-data', index: '01', label: 'IMPORT', summary: '원본 이력과 누락 값을 보존' },
      { id: 'schedule-flow-plan', hotspotId: 'canonical-timeline', index: '02', label: 'CANONICAL', summary: '확인된 계획·실제를 표시' },
      { id: 'schedule-flow-propose', hotspotId: 'staged-changes', index: '03', label: 'PROPOSE', summary: '자연어 변경을 검토 대기안으로 저장' },
      { id: 'schedule-flow-apply', hotspotId: 'audit-revert', index: '04', label: 'APPLY', summary: '선택·충돌 확인 후 전체를 함께 적용' },
      { id: 'schedule-flow-share', hotspotId: 'role-boundary', index: '05', label: 'SHARE', summary: '역할에 허용된 일정만 조회' },
    ],
    boundary: '변경안과 감사 이력은 판단 근거를 남깁니다. 일정과 우선순위의 최종 결정은 사람이 맡습니다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: 'A timeline is a view. The plan remains a governed record.',
    items: [
      { statement: 'UNKNOWN STAYS EMPTY.', explanation: '근거가 없는 마일스톤과 진행률은 채우지 않고, 확인이 필요한 값으로 남겼습니다.' },
      { statement: 'PROPOSE BEFORE APPLY.', explanation: '자연어로 찾은 변경 대상과 변경 전후 값을 사람이 확인한 뒤에 반영합니다.' },
      { statement: 'READ IS NOT MUTATE.', explanation: '공개 일정 조회와 생성·수정·삭제·적용 권한을 역할별로 나눴습니다.' },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '표를 보는 화면에서, 안전하게 바꾸고 공유하는 제품으로.',
    introduction: '원본 보존, 변경안 검토, 역할별 공유, 실제 진행선, 공유 가능한 보기로 확장했습니다.',
    scenes: [
      { date: '2026.07.16', label: 'CANONICAL PLAN', visual: 'canonical', decision: '서로 다른 Excel을 하나의 계획 모델로 읽기 시작했다.', trigger: '원본 구조와 누락 필드가 프로젝트마다 달랐음', change: '가져온 원본 이력과 확정 계획 항목 분리', currentEffect: '화면은 확인된 계획만 읽고 누락 값은 비움' },
      { date: '2026.07.21', label: 'STAGED PROPOSAL', visual: 'proposal', decision: '자연어 변경을 별도의 검토 대기안으로 만들었다.', trigger: '다중 일정 오인식·부분 반영·동시 수정 위험', change: '선택 적용·낙관적 동시성 검사·되돌리기 흐름 추가', currentEffect: '검토 대기안과 최근 적용 이력을 별도로 표시' },
      { date: '2026.07.24', label: 'ROLE SCOPE', visual: 'role-scope', decision: '항목의 공개 여부와 서버 경로의 변경 권한을 나눴다.', trigger: '외부 협업자는 일부 일정만 읽어야 했음', change: '항목 공개 설정·한국어/영어·영업 역할의 조회 전용 상세', currentEffect: '같은 타임라인을 조회 전용 화면으로 제공' },
      { date: '2026.08.24', label: 'ACTUAL LINE', visual: 'actual-line', decision: '계획과 실제를 하나의 막대로 압축하지 않았다.', trigger: '계획 종료와 실제 진행을 함께 비교할 필요', change: '실제 시작부터 종료 또는 오늘까지 별도 진행선', currentEffect: '미완료·기한 초과를 계획 대비 실제로 읽음' },
      { date: '2026.08.27', label: 'SHAREABLE STATE', visual: 'share-state', decision: '같은 보기를 복원하고, 조회 전용 응답에 담는 정보는 줄였다.', trigger: '새로고침과 링크 공유 시 필터 조건이 사라짐', change: '허용 필터를 URL에 저장하고 역할별 별칭 응답을 구분', currentEffect: '보기 조건을 공유하고 원시 별칭은 편집자에게만 제공' },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / SNAPSHOT 2026.09.04',
    title: '운영 계획과 변경 이력에서 확인한 관리 범위.',
    snapshot: '읽기 전용 production snapshot의 project·plan 범위입니다.',
    items: [],
  },
  implementationStatus: {
    state: 'IMPLEMENTED / DEPLOYED / RUNTIME ACTIVE',
    items: ['계획 생성·조회·수정·삭제와 한국어·영어 상세', '계획·실제 타임라인과 기한 초과 표시', '변경안 선택 적용·감사 이력·되돌리기', 'effective permission 기반 read/write와 project registry 연동'],
    runtime: "2026.09.04 production snapshot에서 프로젝트와 계획 항목의 운영 상태를 확인했다.",
  },
  boundary: {
    eyebrow: 'BOUNDARY / CONFIRMED DATES, NOT FORECAST',
    statement: '타임라인에 표시하는 범위는 확인된 계획과 실제 기록까지.',
    items: [],
  },
  relatedSystems: [
    { title: 'PROJECT SETTING', relation: '일정과 후보가 함께 사용하는 추적 프로젝트 목록', href: '/what/project-setting', status: 'available' },
    { title: 'AI-NATIVE ENGINEERING', relation: '제안을 검증 가능한 변경으로 다루는 방식', href: '/how/ai-native-engineering', status: 'available' },
    { title: 'SECURITY & OPERATIONS', relation: '항목별 공개 여부와 서버 경로의 변경 권한', href: '/how/security-operations', status: 'available' },
  ],
} as const satisfies SchedulePageContent
