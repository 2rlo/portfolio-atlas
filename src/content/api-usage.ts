import type { ApiUsagePageContent } from './content-types.ts'
import { apiUsageProductFixture } from './fixtures/api-usage.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'

export const apiUsageContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED COST LEDGER / SYNTHETIC UI DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 08',
    titleLines: ['API', 'USAGE'],
    thesis:
      'AI 비용을 월말 청구액이 아니라, 어떤 workload가 어떤 과금 규칙으로 만든 호출인지 추적하는 원장으로 바꿨다.',
    summary:
      'stream 중단 snapshot, cache write/read, batch multiplier를 호출 단위로 기록하고, 핵심 채팅과 중단 가능한 background 작업의 예산 정책을 분리했습니다.',
    problemLabel: 'PROBLEM / TOTAL BILL HIDES THE CAUSE',
    problem:
      '기능과 호출 방식이 늘수록 전체 청구액만으로는 비용 원인을 찾기 어려웠고, 연결이 끊긴 stream과 batch retry는 사용량 누락·중복 집계 위험을 만들었습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / COST LEDGER',
    title: 'Cost is an operational state, not a decorative KPI.',
    instruction: 'ledger, pricing dimensions, workload split, guard, counterfactual을 선택해 비용 판단의 근거와 한계를 확인하세요.',
    defaultAnnotation: {
      index: '00', label: 'LEDGER GUIDE', title: '합계보다 먼저, 빠지거나 중복된 호출이 없는지 본다.',
      body: '사용량 원장, 과금 차원, workload 분리, budget guard를 따라가면 합계가 어떤 호출과 운영 정책에서 만들어졌는지 다시 확인할 수 있습니다.',
    },
  },
  product: apiUsageProductFixture,
  annotations: [
    {
      id: 'usage-ledger', index: '01', label: 'USAGE LEDGER', title: '정상 종료되지 않은 stream도 원장에서 빠지지 않게 했다.',
      sections: [
        { label: 'WHY', body: '탭 종료나 연결 중단 뒤 provider의 최종 usage 블록을 받지 못하면 실제 소비 토큰이 집계에서 사라질 수 있습니다.' },
        { label: 'DECISION', body: 'disconnect 직전까지 관측한 누적 token snapshot을 stable event로 확정하고 정상 종료와 구분해 기록했습니다.' },
        { label: 'BOUNDARY', body: 'snapshot은 관측 가능한 마지막 값이며 provider invoice 자체가 아닙니다.' },
      ],
      evolution: { label: 'DISCONNECT SNAPSHOT', date: '2026.07.03' },
    },
    {
      id: 'pricing-dimensions', index: '02', label: 'PRICING DIMENSIONS', title: '토큰 하나를 하나의 단가로 계산하지 않았다.',
      sections: [
        { label: 'WHY', body: '모델별 input/output, cache creation/read, batch 호출은 서로 다른 가격을 가집니다.' },
        { label: 'DECISION', body: '기능·모델·token class·batch 여부를 같은 event schema로 정규화하고 당시 단가표를 적용했습니다.' },
        { label: 'BOUNDARY', body: 'cache hit rate만 높다고 비용 효과가 확정되는 것은 아닙니다. write 비용을 함께 봅니다.' },
      ],
    },
    {
      id: 'workload-split', index: '03', label: 'WORKLOAD SPLIT', title: '모델보다 먼저, 비용을 만드는 기능을 찾았다.',
      sections: [
        { label: 'WHY', body: '채팅·diff 분석·rollup·후보 추출은 입력 크기와 latency 요구가 다릅니다. 전체 비용 하나로는 대응 방식을 고를 수 없습니다.' },
        { label: 'DECISION', body: '기능과 모델, standard/batch mode를 함께 집계해 즉시성이 필요 없는 큰 workload만 batch로 옮겼습니다.' },
        { label: 'EVIDENCE', body: '운영 snapshot에서 diff 분석과 developer rollup이 기록 비용의 주요 경로였습니다.' },
      ],
      evolution: { label: 'FUNCTION BREAKDOWN', date: '2026.07.27' },
    },
    {
      id: 'budget-guard', index: '04', label: 'BUDGET GUARD', title: '예산 초과가 사용자 채팅 전체 중단으로 번지지 않게 했다.',
      sections: [
        { label: 'WHY', body: '같은 kill switch로 모든 AI 기능을 막으면 일일 한도 초과 뒤 핵심 interactive 경험도 멈춥니다.' },
        { label: 'DECISION', body: '경고·일 중단·월말 예상 기준을 두되 채팅은 유지하고 diff 분석·rollup 같은 비필수 background batch만 멈췄습니다.' },
        { label: 'BOUNDARY', body: 'chat spike breaker와 전역 incident 제어는 이 guard의 구현 범위가 아닙니다.' },
      ],
      evolution: { label: 'BACKGROUND GUARD', date: '2026.07.28' },
    },
    {
      id: 'counterfactual', index: '05', label: 'COUNTERFACTUAL', title: '기록 비용과 “그렇게 하지 않았다면”을 같은 금액으로 말하지 않았다.',
      sections: [
        { label: 'WHY', body: 'batch·cache 효과를 보려면 같은 실제 토큰에 다른 단가를 다시 적용해야 하지만, 그 결과는 실제 청구서가 아닙니다.' },
        { label: 'DECISION', body: 'recorded ledger와 standard/no-cache 계산을 나란히 두고 차이를 counterfactual estimate로 표시했습니다.' },
        { label: 'BOUNDARY', body: '차이는 공급자 환급액이나 확정 절감액이 아닙니다.' },
      ],
      evolution: { label: 'WORKLOAD EFFECT CHECKED', date: '2026.08.26' },
    },
  ],
  workflow: {
    eyebrow: 'OBSERVABILITY WORKFLOW', title: '호출을 기록하고, 가격을 정규화한 뒤에만 제어한다.', introduction: '각 단계는 위 ledger surface의 component와 연결됩니다.',
    steps: [
      { id: 'cost-flow-capture', hotspotId: 'usage-ledger', index: '01', label: 'CAPTURE', summary: '정상·disconnect usage 보존' },
      { id: 'cost-flow-price', hotspotId: 'pricing-dimensions', index: '02', label: 'NORMALIZE', summary: 'token class별 단가 적용' },
      { id: 'cost-flow-group', hotspotId: 'workload-split', index: '03', label: 'ATTRIBUTE', summary: '기능·모델·mode로 집계' },
      { id: 'cost-flow-compare', hotspotId: 'counterfactual', index: '04', label: 'COMPARE', summary: '기록과 반사실 분리' },
      { id: 'cost-flow-guard', hotspotId: 'budget-guard', index: '05', label: 'GUARD', summary: 'background만 선택 중단' },
    ],
    boundary: '비용 원장은 의사결정 근거를 제공하지만 예산 임계값과 회사 지출의 최종 승인권을 자동화하지 않습니다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS', title: 'Measure every pricing dimension. Guard by workload.',
    items: [
      { statement: 'DISCONNECT IS STILL USAGE.', explanation: '정상 종료가 아니어도 마지막으로 관측한 token snapshot을 별도 상태로 기록합니다.' },
      { statement: 'CACHE IS NOT AUTOMATIC SAVINGS.', explanation: 'cache write와 read를 분리해 workload별 순효과를 다시 계산합니다.' },
      { statement: 'KEEP INTERACTIVE PATHS ALIVE.', explanation: '예산 제어는 지연 허용 background workload에 우선 적용합니다.' },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION', title: '합계 표시에서, 비용과 신뢰성을 함께 다루는 원장으로.', introduction: '현재 ledger·breakdown·guard에 직접 남은 변화입니다.',
    scenes: [
      { date: '2026.07.03', label: 'DISCONNECT SNAPSHOT', visual: 'disconnect', decision: '중단된 stream의 마지막 관측 token을 보존했다.', trigger: '최종 usage 전에 연결이 끊기면 비용이 빠짐', change: 'disconnect snapshot event 기록', currentEffect: 'ledger에서 정상 종료와 snapshot을 구분' },
      { date: '2026.07.28', label: 'DASHBOARD + GUARD', visual: 'dashboard', decision: '기능별 비용을 보자마자 background guard와 연결했다.', trigger: '전체 청구액만으로 비용 원인과 중단 대상을 못 찾음', change: '기간·기능·모델 breakdown과 예산 기준', currentEffect: '관리 surface에서 비용과 guard 상태를 함께 확인' },
      { date: '2026.08.03', label: 'BATCH RATE', visual: 'batch-rate', decision: '지연 가능한 rollup을 batch 요율로 분리했다.', trigger: '긴 입력이지만 즉시 응답은 필요하지 않음', change: 'custom id 기반 batch 제출·결과 연결', currentEffect: 'event마다 standard/batch mode와 multiplier 기록' },
      { date: '2026.08.19', label: 'RETRY LEDGER', visual: 'retry-ledger', decision: '낮은 단가보다 terminal state와 중복 방지를 먼저 고쳤다.', trigger: '완료 요청 재시도·누락·lease 오류가 비용 신뢰성을 훼손', change: 'terminal/retry/idempotent 기록 규칙 보완', currentEffect: '끝난 batch를 다시 비용으로 만들지 않음' },
      { date: '2026.08.26', label: 'WORKLOAD EFFECT', visual: 'workload-effect', decision: '전체 hit rate 대신 workload별 cache 순효과를 봤다.', trigger: 'cache가 항상 이득이라는 가정', change: 'write/read와 no-cache counterfactual 재계산', currentEffect: '채팅과 rollup의 cache 정책을 분리해 재검토' },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / 2026.07.29 — 08.25', title: '26개 활성일의 원장 snapshot, 확정 절감액이 아니다.', snapshot: '운영 token ledger와 저장된 단가 정의로 재계산한 범위입니다.',
    items: [
      { value: '4,502', label: 'USAGE EVENTS', meaning: '기능·모델·호출 방식이 기록된 event', boundary: '사용자 수나 성공 요청 수가 아님' },
      { value: '$113.89', label: 'RECORDED COST', meaning: '원장 단가표로 계산된 분석 기간 비용', boundary: 'provider invoice와 별도 정의' },
      { value: '1,624', label: 'BATCH-RATED EVENTS', meaning: '50% batch multiplier가 적용된 event', boundary: '모든 batch 요청의 성공을 뜻하지 않음' },
      { value: '9.0%', label: 'CACHE READ SHARE', meaning: '대시보드 정의의 전체 cache hit rate', boundary: 'workload별 순절감과 같지 않음' },
    ],
  },
  implementationStatus: {
    state: 'LEDGER + DASHBOARD + GUARD ACTIVE',
    items: ['호출 단위 usage·cost 원장', 'cache write/read·batch multiplier 정규화', '기능·모델별 비용 dashboard', '비필수 background batch budget guard'],
    runtime: '원장과 기존 dashboard·guard는 운영 활성 상태였습니다. 8월 27일 관리자 탭 통합은 코드 근거만 확인됐고 변경 후 production·반복 사용은 미확인입니다. provider 중단으로 8월 26일 cache 수정 후 효과도 아직 재측정하지 못했습니다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / LEDGER, NOT INVOICE', statement: 'A calculated difference is not a guaranteed saving.',
    items: ['$51.95·31.3% 차이는 같은 실제 token에 다른 단가를 적용한 counterfactual입니다.', 'cache hit rate 하나로 비용 효과를 판단하지 않습니다.', '질문·답변·검색어 원문은 비용 관측 로그에 저장하지 않습니다.', '영구 실패 알림·infra health·global incident·chat spike breaker는 남은 범위입니다.'],
  },
  relatedSystems: [
    { title: 'DEVELOPER STATUS', relation: '지연 허용 Message Batch의 대표 workload', href: '/what/developer-status', status: 'available' },
    { title: 'AI-NATIVE ENGINEERING', relation: 'cache·batch·retry·budget을 운영 정책으로 연결', href: '/how/ai-native-engineering', status: 'available' },
    { title: 'OPERATIONS / RELIABILITY', relation: 'provider·worker·incident 관측의 남은 범위', status: 'in-development' },
  ],
} as const satisfies ApiUsagePageContent
