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
      'AI 비용을 호출별 원장으로 추적해, 어떤 기능과 과금 규칙에서 비용이 발생했는지 연결했다.',
    summary:
      '연결 중단 시점의 사용량, 캐시 쓰기·읽기, 배치 요율을 호출 단위로 기록했습니다. 사용자 채팅과 중단 가능한 백그라운드 작업에는 서로 다른 예산 정책을 적용합니다.',
    problemLabel: 'PROBLEM / TOTAL BILL HIDES THE CAUSE',
    problem:
      '기능과 호출 방식이 늘자 전체 청구액만으로는 비용 원인을 찾기 어려웠습니다. 연결이 끊긴 스트림과 배치 재시도는 사용량 누락·중복 집계 위험도 만들었습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / COST LEDGER',
    title: 'Cost is an operational state, not a decorative KPI.',
    instruction: '호출 원장 · 토큰별 요율 · 기능별 비용 · 예산 제어 · 가정별 비용 비교',
    defaultAnnotation: {
      index: '00', label: 'LEDGER GUIDE', title: '합계보다 먼저, 빠지거나 중복된 호출이 없는지 본다.',
      body: '호출별 사용량에 토큰 종류와 호출 방식의 단가를 적용합니다. 기능별 비용과 예산 상태를 연결하고, 다른 요율을 가정한 계산은 원장 금액과 구분합니다.',
    },
  },
  product: apiUsageProductFixture,
  annotations: [
    {
      id: 'usage-ledger', index: '01', label: 'USAGE LEDGER', title: '연결이 중단된 스트림도 마지막 관측 사용량을 남긴다.',
      sections: [
        { label: 'WHY', body: '탭을 닫거나 연결이 끊겨 공급자의 최종 사용량 블록을 받지 못하면 소비한 토큰이 집계에서 빠질 수 있습니다.' },
        { label: 'DECISION', body: '연결 중단 전까지 관측한 누적 토큰을 하나의 사용량 기록으로 확정하고, 정상 종료와 구분했습니다.' },
        { label: 'BOUNDARY', body: '중단 기록은 마지막으로 관측한 사용량입니다. 공급자의 최종 청구 내역과는 다를 수 있습니다.' },
      ],
      evolution: { label: 'DISCONNECT SNAPSHOT', date: '2026.07.03' },
    },
    {
      id: 'pricing-dimensions', index: '02', label: 'PRICING DIMENSIONS', title: '토큰 하나를 하나의 단가로 계산하지 않았다.',
      sections: [
        { label: 'WHY', body: '모델별 입력·출력, 캐시 쓰기·읽기, 배치 호출에는 서로 다른 단가가 적용됩니다.' },
        { label: 'DECISION', body: '기능·모델·토큰 종류·배치 여부를 공통 기록 형식으로 정리하고 당시 단가표를 적용했습니다.' },
        { label: 'BOUNDARY', body: '캐시의 비용 효과는 읽기 비용과 쓰기 비용을 함께 계산합니다. 적중률만으로 순효과를 판단하지 않습니다.' },
      ],
    },
    {
      id: 'workload-split', index: '03', label: 'WORKLOAD SPLIT', title: '모델보다 먼저, 비용을 만드는 기능을 찾았다.',
      sections: [
        { label: 'WHY', body: '채팅·코드 차이 분석·현황 요약·후보 추출은 입력 크기와 응답 시간 요구가 다릅니다. 전체 비용만으로는 어떤 작업을 바꿀지 정하기 어렵습니다.' },
        { label: 'DECISION', body: '기능·모델·일반/배치 호출별로 집계하고, 즉시 응답이 필요 없는 대규모 작업을 배치로 옮겼습니다.' },
        { label: 'EVIDENCE', body: '운영 원장 조회에서 코드 차이 분석과 개발자 현황 요약이 주요 비용 발생 기능이었습니다.' },
      ],
      evolution: { label: 'FUNCTION BREAKDOWN', date: '2026.07.27' },
    },
    {
      id: 'budget-guard', index: '04', label: 'BUDGET GUARD', title: '예산 초과가 사용자 채팅 전체 중단으로 번지지 않게 했다.',
      sections: [
        { label: 'WHY', body: '모든 AI 기능에 같은 중단 기준을 적용하면 일일 한도를 넘을 때 사용자 채팅도 멈춥니다.' },
        { label: 'DECISION', body: '경고·일일 중단·월말 예상 비용 기준을 두었습니다. 채팅은 유지하고 코드 차이 분석·현황 요약처럼 지연 가능한 백그라운드 배치만 중단합니다.' },
        { label: 'BOUNDARY', body: '이 제어는 백그라운드 작업 예산에 적용합니다. 채팅 사용량 급증 차단과 전역 장애 제어는 구현 범위 밖입니다.' },
      ],
      evolution: { label: 'BACKGROUND GUARD', date: '2026.07.28' },
    },
    {
      id: 'counterfactual', index: '05', label: 'COUNTERFACTUAL', title: '원장 계산액과, 다른 요율을 가정한 금액을 구분했다.',
      sections: [
        { label: 'WHY', body: '배치·캐시의 영향을 비교하려면 같은 사용 토큰에 다른 단가를 적용해야 합니다. 이 계산은 실제로 발생한 청구액과 다릅니다.' },
        { label: 'DECISION', body: '원장 계산액과 일반 요율·캐시 미사용 가정의 계산액을 나란히 두고, 차이를 가정에 따른 추정치로 표시했습니다.' },
        { label: 'BOUNDARY', body: '계산 차이는 공급자 환급액이나 확정 절감액으로 사용하지 않습니다.' },
      ],
      evolution: { label: 'WORKLOAD EFFECT CHECKED', date: '2026.08.26' },
    },
  ],
  workflow: {
    eyebrow: 'OBSERVABILITY WORKFLOW', title: '호출을 기록하고, 가격을 정규화한 뒤에만 제어한다.', introduction: '사용량 기록에서 단가 적용·기능별 집계·비교·예산 제어로 이어지는 흐름.',
    steps: [
      { id: 'cost-flow-capture', hotspotId: 'usage-ledger', index: '01', label: 'CAPTURE', summary: '정상 종료·연결 중단 사용량 보존' },
      { id: 'cost-flow-price', hotspotId: 'pricing-dimensions', index: '02', label: 'NORMALIZE', summary: '토큰 종류별 단가 적용' },
      { id: 'cost-flow-group', hotspotId: 'workload-split', index: '03', label: 'ATTRIBUTE', summary: '기능·모델·호출 방식별 집계' },
      { id: 'cost-flow-compare', hotspotId: 'counterfactual', index: '04', label: 'COMPARE', summary: '원장 금액과 가정별 계산 구분' },
      { id: 'cost-flow-guard', hotspotId: 'budget-guard', index: '05', label: 'GUARD', summary: '백그라운드 작업만 선택 중단' },
    ],
    boundary: '원장은 비용 판단의 근거를 제공합니다. 예산 임계값 설정과 지출의 최종 승인은 사람이 맡습니다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS', title: 'Measure every pricing dimension. Guard by workload.',
    items: [
      { statement: 'DISCONNECT IS STILL USAGE.', explanation: '정상 종료되지 않아도 마지막 관측 토큰을 별도 상태의 기록으로 남깁니다.' },
      { statement: 'CACHE IS NOT AUTOMATIC SAVINGS.', explanation: '캐시 쓰기와 읽기 비용을 나눠 기능별 순효과를 다시 계산합니다.' },
      { statement: 'KEEP INTERACTIVE PATHS ALIVE.', explanation: '예산 제어는 지연을 허용하는 백그라운드 작업에 적용합니다.' },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION', title: '합계 표시에서, 비용과 신뢰성을 함께 다루는 원장으로.', introduction: '누락 사용량 보존에서 기능별 집계, 배치 요율, 중복 집계 방지, 캐시 비용 비교로 확장했습니다.',
    scenes: [
      { date: '2026.07.03', label: 'DISCONNECT SNAPSHOT', visual: 'disconnect', decision: '중단된 스트림의 마지막 관측 토큰을 보존했다.', trigger: '최종 사용량을 받기 전에 연결이 끊기면 비용 집계에서 누락', change: '연결 중단 시점의 관측 사용량 기록', currentEffect: '원장에서 정상 종료와 중단 관측값을 구분' },
      { date: '2026.07.28', label: 'DASHBOARD + GUARD', visual: 'dashboard', decision: '기능별 비용 집계를 백그라운드 작업의 예산 제어로 연결했다.', trigger: '전체 청구액만으로 비용 원인과 중단 대상을 못 찾음', change: '기간·기능·모델별 비용 집계와 예산 기준', currentEffect: '관리 화면에 비용과 예산 제어 상태를 함께 표시' },
      { date: '2026.08.03', label: 'BATCH RATE', visual: 'batch-rate', decision: '즉시 응답이 필요 없는 현황 요약에 배치 요율을 적용했다.', trigger: '긴 입력이지만 즉시 응답은 필요하지 않음', change: '요청별 고유 ID로 배치 제출과 결과 연결', currentEffect: '호출마다 일반/배치 방식과 요율 배수 기록' },
      { date: '2026.08.19', label: 'RETRY LEDGER', visual: 'retry-ledger', decision: '배치 완료 처리와 재시도의 기록 규칙을 보완했다.', trigger: '완료 요청의 재시도·누락·작업 점유 오류가 사용량 기록의 일관성을 훼손', change: '완료 상태와 재시도를 구분하고 같은 사용량의 중복 기록 방지', currentEffect: '완료된 배치 사용량을 재시도로 중복 집계하지 않음' },
      { date: '2026.08.26', label: 'WORKLOAD EFFECT', visual: 'workload-effect', decision: '전체 적중률과 함께 기능별 캐시 순효과를 계산했다.', trigger: '캐시가 항상 비용을 낮춘다는 가정', change: '캐시 쓰기·읽기 비용과 미사용 가정의 비용 재계산', currentEffect: '채팅과 현황 요약의 캐시 정책을 각각 재검토' },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / 2026.07.29 — 08.25', title: "호출 기록과 단가표로 계산한 비용.", snapshot: '2026년 7월 29일–8월 25일의 운영 토큰 원장과 저장된 단가를 기준으로 재계산했습니다.',
    items: [
      { value: '$113.89', label: 'RECORDED COST', meaning: '원장 단가표로 계산된 분석 기간 비용', boundary: '공급자 청구서와 별도로 계산한 금액입니다.' },
      { value: '9.0%', label: 'CACHE READ SHARE', meaning: '대시보드의 정의로 계산한 전체 캐시 적중률', boundary: '기능별 캐시 순절감액과는 다른 지표입니다.' },
    ],
  },
  implementationStatus: {
    state: 'LEDGER + DASHBOARD + GUARD ACTIVE',
    items: ['호출별 사용량·비용 원장', '캐시 쓰기·읽기와 배치 요율 구분', '기능·모델별 비용 화면', '지연 가능한 백그라운드 배치의 예산 제어'],
    runtime: '원장과 기존 비용 화면·예산 제어는 운영에서 활성화된 상태였습니다. 8월 27일 관리자 탭 통합은 코드에서만 확인했으며, 변경 후 운영 반영은 미확인입니다. 공급자 서비스 중단으로 8월 26일 캐시 수정 후 효과도 재측정하지 못했습니다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / LEDGER, NOT INVOICE', statement: '원장 비용과 가정별 계산은 확인했으며, 수정 후 효과는 재측정 전입니다.',
    items: ['$51.95·31.3%는 같은 실제 토큰에 다른 단가를 적용한 계산 차이입니다. 확정 절감액이 아닙니다.',  '질문·답변·검색어 원문은 비용 관측 로그에 저장하지 않습니다.', '영구 실패 알림·인프라 상태·전역 장애·채팅 사용량 급증 차단은 남은 구현 범위입니다.'],
  },
  relatedSystems: [
    { title: 'DEVELOPER STATUS', relation: 'Message Batch로 처리하는 개발자 현황 요약', href: '/what/developer-status', status: 'available' },
    { title: 'AI-NATIVE ENGINEERING', relation: '캐시·배치·재시도·예산을 운영 정책으로 연결한 방식', href: '/how/ai-native-engineering', status: 'available' },
    { title: 'SECURITY & OPERATIONS', relation: 'provider·worker·incident 관측의 현재 경계와 남은 범위', href: '/how/security-operations', status: 'available' },
  ],
} as const satisfies ApiUsagePageContent
