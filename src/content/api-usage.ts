import type { ApiUsagePageContent, PaidCallLifecycleContent } from './content-types.ts'
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
      "어떤 업무에서 AI 비용이 발생하는지 찾고, 응답이 급하지 않은 작업부터 비용을 조정했습니다.",
    summary:
      "호출 기록을 기능과 모델, 캐시, 배치 요율로 나눠 비용 원인을 확인했습니다. 채팅은 유지하면서 지연 가능한 백그라운드 작업에 예산 기준을 적용했습니다.",
    problemLabel: "총액만으로는 찾기 어려운 비용 원인",
    problem:
      '기능과 호출 방식이 늘자 전체 청구액만으로는 비용 원인을 찾기 어려웠습니다. 연결이 끊긴 스트림과 배치 재시도는 사용량 누락·중복 집계 위험도 만들었습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / COST LEDGER',
    title: "비용을 만드는 기능부터 확인합니다.",
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
        { label: 'BOUNDARY', body: "연결이 끝나는 순간까지 관측한 사용량을 남기고, 정상 종료와 중단 기록을 구분해 비용을 추적합니다." },
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
        { label: 'BOUNDARY', body: "코드 차이 분석과 현황 요약처럼 실행을 미룰 수 있는 작업에 예산 기준을 적용했습니다. 사용자가 대화 중인 채팅 경로는 유지합니다." },
      ],
      evolution: { label: 'BACKGROUND GUARD', date: '2026.07.28' },
    },
    {
      id: 'counterfactual', index: '05', label: 'COUNTERFACTUAL', title: "같은 사용량에 요율을 바꿔 비용 차이를 비교했습니다.",
      sections: [
        { label: 'WHY', body: "기능마다 입력과 출력, 캐시 사용 비중이 달라 배치와 캐시 정책을 각각 판단할 필요가 있었습니다." },
        { label: 'DECISION', body: "같은 토큰 사용량에 일반 요율과 배치 요율, 캐시 사용 조건을 적용해 계산액을 나란히 비교했습니다." },
        { label: 'BOUNDARY', body: "전체 캐시 적중률 대신 기능별 읽기·쓰기 비용을 계산해 채팅과 현황 요약의 정책을 재검토했습니다." },
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
    eyebrow: 'DESIGN DECISIONS', title: "비용을 기록하는 데서 실행 정책을 조정하는 데로.",
    items: [
      { statement: "중단된 연결의 사용량도 보존", explanation: '정상 종료되지 않아도 마지막 관측 토큰을 별도 상태의 기록으로 남깁니다.' },
      { statement: "기능별 캐시 비용 비교", explanation: '캐시 쓰기와 읽기 비용을 나눠 기능별 순효과를 다시 계산합니다.' },
      { statement: "대화는 유지하고 배치는 조정", explanation: '예산 제어는 지연을 허용하는 백그라운드 작업에 적용합니다.' },
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
  "eyebrow": "COST COMPARISON",
  "title": "배치와 캐시의 비용 차이를 같은 사용량으로 비교했습니다.",
  "snapshot": "2026년 7월 29일–8월 25일의 토큰 사용량에 일반 요율과 배치·캐시 요율을 적용해 비교한 결과입니다.",
  "items": [
    {
      "value": "31.3%",
      "label": "요율에 따른 비용 차이",
      "meaning": "일반 요율 계산액보다 $51.95 낮은 $113.89로 계산됐습니다. 이 비교를 바탕으로 기능별 배치와 캐시 정책을 검토했습니다.",
      "boundary": ""
    }
  ]
},
  implementationStatus: {
  "state": "비용 원인을 찾아 실행 방식 조정",
  "items": [
    "코드 차이 분석과 현황 요약을 주요 비용 발생 기능으로 확인했습니다.",
    "즉시 응답이 필요 없는 현황 요약에 배치 호출과 요율을 적용했습니다.",
    "기능별 캐시 쓰기와 읽기 비용을 비교해 정책을 재검토했습니다."
  ],
  "runtime": "예산이 기준을 넘으면 지연 가능한 작업을 멈추고 채팅은 유지하도록 실행 경로를 나눴습니다."
},
  boundary: {
  "eyebrow": "DESIGN TAKEAWAY",
  "statement": "비용 제어를 업무의 응답 요구와 연결했습니다.",
  "items": [
    "사용자가 기다리는 대화와 나중에 처리해도 되는 분석을 구분해 실행 방식을 정했습니다. 비용 관측에는 사용량과 처리 상태를 남기고 질문과 답변 원문은 저장하지 않습니다."
  ]
},
  relatedSystems: [
    { title: 'DEVELOPER STATUS', relation: 'Message Batch로 처리하는 개발자 현황 요약', href: '/what/developer-status', status: 'available' },
    { title: 'AI-NATIVE ENGINEERING', relation: '캐시·배치·재시도·예산을 운영 정책으로 연결한 방식', href: '/how/ai-native-engineering', status: 'available' },
    { title: 'SECURITY & OPERATIONS', relation: "권한과 작업 상태를 확인하고 변경과 복구를 통제하는 방식", href: '/how/security-operations', status: 'available' },
  ],
} as const satisfies ApiUsagePageContent

export const paidCallLifecycleContent = {
  eyebrow: "PAID-CALL LIFECYCLE",
  title: "중복 호출을 막고, 받은 결과의 처리를 이어갑니다.",
  introduction: "유료 호출이 중간에 끊겼다고 처음부터 다시 실행하면 비용이 중복될 수 있습니다. 요청 전송, 결과 저장과 비용 확정, 사용자 공개를 나눠 각 단계에서 이어갈 작업을 판단하도록 만들었습니다.",
  stages: [
    {
      label: '01 / DISPATCH',
      title: '예약·전송',
      body: '새 유료 호출을 예약한 뒤 공급자에게 보냅니다. 전송 이후 결과가 불명확하면 실패로 단정해 같은 호출을 다시 보내지 않습니다.',
    },
    {
      label: '02 / SETTLEMENT',
      title: '결과 저장·비용 확정',
      body: '저장된 정확한 결과를 근거로 내부 비용 처리를 마칩니다. 결과가 이미 있다면 공급자를 다시 호출하지 않고 비용 확정을 이어갈 수 있습니다.',
    },
    {
      label: '03 / PUBLICATION',
      title: '권한 확인·공개',
      body: '비용 처리가 끝난 결과도 공개 직전의 권한을 다시 확인합니다. 권한이 바뀐 사용자는 현재 허용된 범위에 따라 결과를 볼 수 있습니다.',
    },
  ],
  situations: [
    {
      id: 'provider-outcome-unknown',
      title: '공급자 처리 결과를 알 수 없을 때',
      signal: '요청을 보냈지만 최종 결과를 확인할 근거가 부족한 상태.',
      action: '결과를 미확인으로 남기고 재전송을 보류합니다.',
      reason: '실패로 단정해 재전송하면 이미 처리된 유료 호출을 중복 실행할 수 있습니다.',
    },
    {
      id: 'stored-result-awaiting-settlement',
      title: '결과는 저장됐지만 비용 확정이 남았을 때',
      signal: '정확한 결과가 저장돼 있고 내부 비용 처리만 완료되지 않은 상태.',
      action: '저장된 결과로 비용 확정을 이어갑니다. 공급자 호출은 추가하지 않습니다.',
      reason: '새 호출과 이미 비용을 지불한 결과의 후속 처리는 따로 다룹니다. 신규 유료 호출을 멈춰도 기존 결과의 비용 확정·공개가 자동으로 취소되지는 않습니다.',
    },
    {
      id: 'permission-changed-before-publication',
      title: '공개 전에 권한이 바뀌었을 때',
      signal: '비용 처리는 끝났지만 현재 권한이 공개 조건을 충족하지 않는 상태.',
      action: '공개를 보류하고 현재 권한을 기준으로 판단합니다.',
      reason: '비용 확정은 공개 권한을 대신하지 않습니다. 비용 처리 완료와 사용자에게 보이는 상태를 분리해야 합니다.',
    },
  ],
  boundary: "새 호출을 멈추는 정책과 이미 받은 결과를 처리하는 정책을 나눴습니다. 저장된 결과는 다시 생성하지 않고 비용 확정을 이어가며, 공개 직전에는 현재 권한을 확인합니다.",
  related: { label: '운영 상태와 안전한 복구 판단 보기', href: '/what/operations' },
} as const satisfies PaidCallLifecycleContent
