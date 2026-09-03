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
      'Excel 원본은 import 이력으로 보존하고, 제품은 canonical 계획을 읽습니다. 자연어 변경은 바로 쓰지 않고 proposal로 stage했습니다.',
    problemLabel: 'PROBLEM / DIFFERENT FILES, DIFFERENT TRUTH',
    problem:
      '제품마다 다른 일정 문서와 누락 필드 때문에 전체 지연과 차단 상태를 같은 기준으로 보기 어려웠고, 자동 추정은 운영 계획을 잘못 확정할 위험이 있었습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / PLAN + ACTUAL',
    title: '같은 타임라인, 다른 authority.',
    instruction:
      '계획·실제, 확인 필요, 변경 proposal, 되돌리기, role scope를 hover·focus·tap해 설계 경계를 살펴보세요.',
    defaultAnnotation: {
      index: '00',
      label: 'TIMELINE GUIDE',
      title: '일정은 막대보다 변경 규칙이 더 중요합니다.',
      body: '현재 계획을 보는 surface와 계획을 바꾸는 workflow를 분리했습니다. 아래 비교 strip은 동일 데이터를 보는 read-only 역할의 범위를 함께 보여줍니다.',
    },
  },
  product: scheduleProductFixture,
  annotations: [
    {
      id: 'canonical-timeline', index: '01', label: 'PLAN / ACTUAL',
      title: '계획 막대와 실제 진행선은 같은 상태가 아니다.',
      sections: [
        { label: 'WHY', body: '계획 날짜만 보면 진행 중인 작업이 어디까지 왔는지, 실제 날짜만 보면 기준 계획에서 얼마나 벗어났는지 알기 어렵습니다.' },
        { label: 'DECISION', body: 'canonical 계획 막대와 확인된 실제 시작·종료선을 겹쳐 보여주되, 실제 값이 없으면 선을 그리지 않았습니다.' },
        { label: 'BOUNDARY', body: '진행률 100이나 날짜 경과만으로 Verified를 자동 결정하지 않습니다.' },
      ],
      evolution: { label: 'ACTUAL LINE ADDED', date: '2026.08.24' },
    },
    {
      id: 'missing-data', index: '02', label: 'CONFIRM NEEDED',
      title: '빈 값은 예측하지 않고, 비어 있다는 사실을 보인다.',
      sections: [
        { label: 'WHY', body: '서로 다른 원본에는 담당자·시작일·완료 기준이 빠진 항목이 있었습니다. 그 값을 AI가 채우면 계획과 추정이 섞입니다.' },
        { label: 'DECISION', body: '필수 근거가 없으면 `확인 필요`와 `NOT RECORDED`를 남기고, 실제 진행선도 생략했습니다.' },
      ],
      evolution: { label: 'CANONICAL MODEL', date: '2026.07.16' },
    },
    {
      id: 'staged-changes', index: '03', label: 'STAGED CHANGE SET',
      title: '자연어 요청은 계획 수정이 아니라 검토할 proposal이다.',
      sections: [
        { label: 'WHY', body: '담당자나 작업명으로 여러 일정을 바꾸는 요청은 대상을 잘못 찾거나 일부만 반영할 위험이 있습니다.' },
        { label: 'DECISION', body: '변경 전후를 별도 change set으로 만들고, 사용자가 항목을 선택·수정한 뒤 원자적으로 적용하게 했습니다.' },
        { label: 'BOUNDARY', body: 'AI 해석만으로 canonical plan을 직접 변경하지 않습니다.' },
      ],
      evolution: { label: 'PROPOSAL WORKFLOW', date: '2026.07.21' },
    },
    {
      id: 'audit-revert', index: '04', label: 'AUDIT + REVERT',
      title: '되돌리기는 “과거 값 복사”가 아니라 최신 변경 확인이다.',
      sections: [
        { label: 'WHY', body: '적용 후 다른 수정이 생겼다면 이전 값을 그대로 되돌리는 순간 새 변경을 덮을 수 있습니다.' },
        { label: 'DECISION', body: 'actor·request·before/after를 append-only로 남기고, 같은 계획에 더 최신 apply가 없을 때만 revert를 허용했습니다.' },
        { label: 'EVIDENCE', body: '운영 snapshot에는 66개 계획에 연결된 168건의 변경 이력이 있었습니다.' },
      ],
      evolution: { label: 'AUDIT CONNECTED', date: '2026.07.23' },
    },
    {
      id: 'role-boundary', index: '05', label: 'ROLE SCOPE',
      title: '같은 일정을 보여주되, 모든 역할에 같은 행동을 주지 않았다.',
      sections: [
        { label: 'WHY', body: '외부 협업 역할은 공개된 계획을 확인할 필요가 있지만 생성·적용 권한까지 가질 이유는 없었습니다.' },
        { label: 'DECISION', body: '항목별 공개 flag와 backend route 권한을 함께 적용해 read-only 역할에는 timeline·detail만 제공했습니다.' },
        { label: 'BOUNDARY', body: '버튼 숨김만으로 권한을 구현하지 않았고, 읽기 응답에는 표시 이름만 남겼습니다.' },
      ],
      evolution: { label: 'READ-ONLY CONTRACT', date: '2026.07.20 → 08.27' },
    },
  ],
  workflow: {
    eyebrow: 'CHANGE WORKFLOW',
    title: '원본을 보존하고, 변경은 검토 가능한 사건으로 만든다.',
    introduction: '각 단계는 제품 화면의 현재 component와 연결됩니다.',
    steps: [
      { id: 'schedule-flow-import', hotspotId: 'missing-data', index: '01', label: 'IMPORT', summary: '원본 이력과 누락 값을 보존' },
      { id: 'schedule-flow-plan', hotspotId: 'canonical-timeline', index: '02', label: 'CANONICAL', summary: '확인된 계획·실제를 표시' },
      { id: 'schedule-flow-propose', hotspotId: 'staged-changes', index: '03', label: 'PROPOSE', summary: '자연어 변경을 stage' },
      { id: 'schedule-flow-apply', hotspotId: 'audit-revert', index: '04', label: 'APPLY', summary: '선택·충돌 확인 후 원자 적용' },
      { id: 'schedule-flow-share', hotspotId: 'role-boundary', index: '05', label: 'SHARE', summary: '역할에 맞는 view만 제공' },
    ],
    boundary: '변경 proposal과 audit trail은 의사결정 근거를 보존하지만, 제품 일정과 우선순위의 최종 결정권을 자동화하지 않습니다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: 'A timeline is a view. The plan remains a governed record.',
    items: [
      { statement: 'UNKNOWN STAYS EMPTY.', explanation: '근거 없는 milestone·progress는 만들지 않고 확인이 필요한 값으로 남겼습니다.' },
      { statement: 'PROPOSE BEFORE APPLY.', explanation: '자연어로 찾은 변경 대상과 before/after를 사람이 확인한 뒤에만 반영합니다.' },
      { statement: 'READ IS NOT MUTATE.', explanation: '공개 가능한 일정 조회와 생성·수정·삭제·적용 authority를 역할별로 분리했습니다.' },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '표를 보는 화면에서, 안전하게 바꾸고 공유하는 제품으로.',
    introduction: '현재 timeline·proposal·role component에 남아 있는 변화만 골랐습니다.',
    scenes: [
      { date: '2026.07.16', label: 'CANONICAL PLAN', visual: 'canonical', decision: '서로 다른 Excel을 하나의 계획 모델로 읽기 시작했다.', trigger: '원본 구조와 누락 필드가 프로젝트마다 달랐음', change: 'import history와 canonical plan item 분리', currentEffect: '화면은 확인된 계획만 읽고 누락 값은 비움' },
      { date: '2026.07.21', label: 'STAGED PROPOSAL', visual: 'proposal', decision: '자연어 변경을 곧바로 쓰지 않고 change set으로 만들었다.', trigger: '다중 일정 오인식·부분 반영·동시 수정 위험', change: '선택 적용·optimistic conflict·revert 흐름 추가', currentEffect: 'pending proposal rail과 최근 적용 이력으로 남음' },
      { date: '2026.07.24', label: 'ROLE SCOPE', visual: 'role-scope', decision: '공개 여부와 mutation 권한을 항목·route에서 나눴다.', trigger: '외부 협업자는 일부 일정만 읽어야 했음', change: '공개 flag·KO/EN·Sales read-only detail', currentEffect: '동일 timeline의 read-only surface 제공' },
      { date: '2026.08.24', label: 'ACTUAL LINE', visual: 'actual-line', decision: '계획과 실제를 하나의 막대로 압축하지 않았다.', trigger: '계획 종료와 실제 진행을 함께 비교할 필요', change: '실제 시작부터 종료 또는 오늘까지 별도 진행선', currentEffect: '미완료·기한 초과를 계획 대비 실제로 읽음' },
      { date: '2026.08.27', label: 'SHAREABLE STATE', visual: 'share-state', decision: '같은 보기를 복원하되 read-only 응답은 최소화했다.', trigger: '새로고침·공유 링크에서 filter context가 사라짐', change: '허용 filter의 URL state와 역할별 alias 응답 분리', currentEffect: '보기는 공유 가능, raw alias는 편집자에 한정' },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / SNAPSHOT 2026.08.26',
    title: '관리 범위의 기록이지, 납기 성과가 아니다.',
    snapshot: '운영 DB와 audit snapshot의 의미를 좁게 유지합니다.',
    items: [
      { value: '4', label: 'TRACKED PROJECTS', meaning: '일정 화면이 참조한 당시 project 범위', boundary: '프로젝트 성과 비교 수치가 아님' },
      { value: '74', label: 'CANONICAL PLANS', meaning: '운영 데이터베이스의 계획 항목', boundary: '일정 준수율 분모가 아님' },
      { value: '168', label: 'CHANGE HISTORIES', meaning: '66개 계획에 연결된 변경 이력', boundary: '효율이나 자동화 성공률이 아님' },
      { value: '122', label: 'RECORDED WEB WRITES', meaning: '생성·수정·적용 등 성공한 web write', boundary: '조회는 미측정 · 서비스 성공률 아님' },
    ],
  },
  implementationStatus: {
    state: 'IMPLEMENTED / DEPLOYED / RUNTIME ACTIVE',
    items: ['계획 CRUD와 KO/EN detail', '계획·실제 timeline과 overdue 표현', 'proposal 선택 적용·audit·revert', 'role-based read/write와 project registry 연동'],
    runtime: '제한된 팀 사용과 일부 역할의 반복 사용은 확인됐지만, 일정 화면 자체의 역할별 조회 빈도와 영업 사용은 측정되지 않았습니다. 8월 27일 URL state 확장의 production 반영은 별도 검증이 필요합니다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / CONFIRMED DATES, NOT FORECAST',
    statement: 'The timeline does not predict what the source did not say.',
    items: ['누락된 날짜·담당자·진행률을 AI로 추정하지 않습니다.', '날짜 경과나 progress 100만으로 완료 상태를 결정하지 않습니다.', '122회 write를 일정 준수율·납기 단축·업무시간 절감으로 해석하지 않습니다.', 'limited-team use를 역할별 반복 조회나 조직 adoption으로 확대하지 않습니다.'],
  },
  relatedSystems: [
    { title: 'PROJECT SETTING', relation: '일정·후보가 함께 읽는 tracked project registry', href: '/what/project-setting', status: 'available' },
    { title: 'AI-NATIVE ENGINEERING', relation: 'proposal을 검증 가능한 변경으로 다루는 방식', href: '/how/ai-native-engineering', status: 'available' },
    { title: 'SECURITY / GOVERNANCE', relation: '항목 공개 flag와 route-level mutation boundary', status: 'in-development' },
  ],
} as const satisfies SchedulePageContent
