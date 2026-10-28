import type { OperationsPageContent } from './content-types.ts'

export const operationsContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED DECISION SHEET / LOCAL DEMO',
    evidenceDate: '2026-09-30',
    boundary: {
      dataOrigin: 'independently-authored-synthetic',
      privateSourceRuntimeDependency: false,
      containsRealIdentifiers: false,
      oneToOneInternalMapping: false,
    },
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 15',
    titleLines: ['OPERATIONS'],
    thesis: "실패한 작업을 찾고, 재시도할 대상과 담당자에게 넘길 대상을 화면에서 구분하게 했습니다.",
    summary: "운영자가 작업 상태와 마지막 점검, 비용 영향을 함께 보고 다음 행동을 정하도록 만들었습니다. 새 작업을 멈춰도 이미 받은 결과의 처리는 이어갈 수 있게 나눴습니다.",
    problemLabel: "실패를 놓치지 않으려면",
    problem: 'worker가 살아 있고 AI 호출이 허용돼도 개별 작업은 실패할 수 있습니다. 최근 성공 하나만으로 이전의 미해결 실패를 지우면 확인해야 할 일을 놓칠 수 있습니다.',
  },
  inspection: {
    eyebrow: 'OPERATOR DECISION SHEET',
    title: '같은 신호라도 다음 행동은 다릅니다.',
    instruction: "사례를 고르면 점검 신호와 다음 행동을 비교할 수 있습니다. 재시도 가능한 실패에서는 판단을 미리보고 기록해 보세요.",
    localBoundary: "공개용으로 재구성한 체험 화면입니다. 선택과 기록은 이 화면 안에서만 유지됩니다.",
    cases: [
      {
        id: 'known-failure',
        label: '재시도 가능한 실패',
        state: 'SELECTED FAILURE / RETRY ELIGIBLE',
        title: '새 성공이 있어도 남은 실패는 별도로 확인.',
        summary: "실패 원인과 현재 상태를 확인한 작업을 선택해 재시도하는 흐름입니다.",
        signals: [
          { label: '점검 근거', value: '최근 점검 있음 · 선택한 실패가 아직 미해결', tone: 'attention' },
          { label: '더 최근의 성공', value: '있음 · 이전 실패 해소의 근거는 아님', tone: 'known' },
          { label: '수동 재시도', value: "선택한 실패 작업의 재시도 경로 연결", tone: 'known' },
          { label: 'worker / AI 호출', value: '정상 / 허용 · 개별 작업 성공과 별도', tone: 'known' },
        ],
        decision: {
          title: '선택 범위 안에서 재시도 판단',
          reason: "선택한 작업의 실패 원인과 현재 상태, 추가 호출 비용을 먼저 보여줍니다. 운영자가 실행 범위를 알고 재시도를 결정할 수 있게 했습니다.",
          nextAction: "대상과 현재 상태를 다시 확인한 뒤 선택한 작업을 재시도합니다.",
          stopCondition: '상태가 바뀌었거나 재시도 지원 근거가 없으면 실행을 멈추고 담당자에게 확인합니다.',
        },
        retryPreview: {
          scope: '선택한 알려진 실패만 재시도 대상으로 기록',
          preserves: '다른 미해결 실패와 기존 성공 기록은 그대로 유지',
          requires: '실제 실행 전 추가 유료 호출 가능성과 비용 영향 확인 · 실행 후 별도 점검으로 결과 확인',
        },
      },
      {
        id: 'incomplete-evidence',
        label: '누락되거나 오래된 근거',
        state: 'UNKNOWN / HAND OFF',
        title: '확인하지 못한 상태를 정상으로 바꾸지 않습니다.',
        summary: '점검이 없거나 오래돼 현재 작업 상태를 판단할 수 없는 예시. unknown을 0건이나 정상으로 표시하지 않습니다.',
        signals: [
          { label: '점검 근거', value: '누락 또는 오래됨 · 현재 상태 unknown', tone: 'unknown' },
          { label: '실패 / 대기 / 멈춤', value: 'unknown · 0건으로 표시하지 않음', tone: 'unknown' },
          { label: '대상 없음 판정', value: '불가 · 최근 점검과 미해결 항목 확인 필요', tone: 'attention' },
          { label: '수동 재시도', value: '지원 여부 미확인 · 복구 행동 보류', tone: 'unknown' },
        ],
        decision: {
          title: '최신 점검을 요청하고 인계',
          reason: '관측 근거 없이 재시도하면 원래 작업의 결과나 중복 실행 여부를 놓칠 수 있습니다.',
          nextAction: '담당자에게 마지막 점검 시점, 미해결 실패·대기·멈춤 항목, 재시도 가능 여부를 확인하도록 전달합니다.',
          stopCondition: "최신 점검 결과와 실행 경로가 확인될 때까지 재시도를 보류합니다.",
        },
        retryPreview: null,
      },
      {
        id: 'processing-paused',
        label: '새 작업 중단 · 정산 대기',
        state: 'DISPATCH PAUSED / SETTLEMENT PENDING',
        title: '새 호출을 멈춰도 기존 결과의 처리는 남습니다.',
        summary: '새 백그라운드 작업은 중단됐지만 이미 저장된 결과가 정산을 기다리는 예시입니다.',
        signals: [
          { label: '새 작업', value: '중단 · 새 AI 호출을 보내지 않음', tone: 'attention' },
          { label: '기존 결과', value: '저장됨 · 정산 대기', tone: 'attention' },
          { label: '다음 처리', value: '저장 결과로 정산 · 추가 공급자 호출 불필요', tone: 'known' },
          { label: '공개 권한', value: '공개 직전에 현재 권한 별도 확인', tone: 'unknown' },
        ],
        decision: {
          title: '새 작업 중단과 기존 결과 정산을 분리',
          reason: "이미 받은 결과를 다시 생성하면 비용이 중복될 수 있습니다. 저장된 결과의 정산을 이어가고, 공개할 때 현재 권한을 확인합니다.",
          nextAction: 'API Usage의 호출·정산·공개 경계를 따라 저장 결과의 처리 상태와 현재 권한을 확인합니다.',
          stopCondition: '기존 결과나 정산 상태가 불명확하면 다시 호출하지 않습니다. 권한 확인 전에는 공개하지 않습니다.',
        },
        retryPreview: null,
      },
    ],
    controls: {
      preview: '재시도 판단 미리보기',
      confirm: '로컬 판단 기록',
      reset: '현재 사례 판단 초기화',
    },
    status: {
  "inspect": "점검 신호를 읽고 다음 행동을 선택하세요.",
  "preview": "선택한 대상과 비용 영향을 확인하세요.",
  "recorded": "이 사례에 대한 판단을 기록했습니다."
},
    noTargetRule: '최근 점검에서 실패·대기·멈춤 항목이 모두 없다고 확인했을 때만 대상 없음으로 판단합니다. 점검 누락이나 unknown을 대상 없음으로 바꾸지 않습니다.',
  },
  workflow: {
    eyebrow: 'OPERATION WORKFLOW',
    title: "상태 확인에서 다음 점검까지 연결했습니다.",
    steps: [
      { label: 'OBSERVE', summary: '점검 시점과 미해결 작업 확인' },
      { label: 'SCOPE', summary: '재시도 지원 범위와 중단 조건 확인' },
      { label: 'DECIDE', summary: '가능한 판단을 미리보거나 인계' },
      { label: 'VERIFY', summary: '실행 여부와 실제 결과는 별도 점검' },
    ],
    boundary: "최근 성공이 있어도 남은 실패는 계속 표시합니다. 운영자는 해결할 대상을 선택하고, 실행 뒤 점검 결과로 처리를 마칩니다.",
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: '복구 버튼보다 먼저 판단 조건을 보여줍니다.',
    items: [
      { statement: "빈 결과와 점검 누락을 구분", explanation: '점검 누락과 오래된 결과를 0건·정상으로 축약하지 않습니다. 최근 성공과 이전 미해결 실패를 함께 남깁니다.' },
      { statement: "재시도 전에 대상과 비용 확인", explanation: "실패한 작업 중 재시도할 대상을 선택하고 실행 범위와 추가 호출 가능성을 미리 보여줍니다. 다른 실패와 기존 성공 기록은 유지합니다." },
      { statement: "중단 이후의 처리도 설계", explanation: '새 작업 중단, 저장 결과 정산, 현재 권한에 따른 공개는 각각 판단합니다. worker가 정상이고 AI 호출이 허용돼도 작업 성공 여부는 따로 확인해야 합니다.' },
    ],
  },
  evidence: {
  "eyebrow": "WORKFLOW CHANGE",
  "title": "운영 화면에서 다음 행동을 정할 수 있게 됐습니다.",
  "snapshot": "작업이 돌아가는지 확인하고, 다시 실행할 대상과 먼저 점검할 대상을 판단할 수 있게 했습니다.",
  "items": []
},
  implementationStatus: {
  "state": "상태 확인에서 복구 판단으로",
  "items": [
    "미해결 실패와 마지막 점검을 함께 보고 조치 대상을 찾습니다.",
    "선택한 실패의 재시도 범위와 추가 호출 비용을 실행 전에 확인합니다.",
    "점검이 필요한 사례는 확인할 항목을 정리해 담당자에게 전달합니다."
  ],
  "runtime": "새 호출을 중단한 동안에도 저장된 결과의 정산과 권한 확인을 이어갈 수 있도록 처리 단계를 분리했습니다."
},
  boundary: {
  "eyebrow": "DESIGN TAKEAWAY",
  "statement": "운영자가 알아야 할 것은 상태와 다음 행동입니다.",
  "items": [
    "점검 신호와 재시도 조건, 중단 조건을 같은 화면에 배치했습니다."
  ]
},
  relatedSystems: [
    { title: 'SECURITY & OPERATIONS', relation: '이 제품 판단을 뒷받침하는 권한·관측·변경·복구의 설계 방식', href: '/how/security-operations', status: 'available' },
    { title: 'TECHNICAL WRITING', relation: '운영자와 개발자가 다음 행동과 중단 조건을 다르게 읽는 인계 안내', href: '/how/technical-writing', status: 'available' },
    { title: 'API USAGE', relation: '새 호출·기존 결과 정산·공개 권한을 분리하는 처리 경계', href: '/what/api-usage', status: 'available' },
  ],
} as const satisfies OperationsPageContent
