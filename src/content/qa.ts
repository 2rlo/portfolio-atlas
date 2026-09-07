import type { QaPageContent } from './content-types.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'
import { qaProductFixture } from './fixtures/qa.ts'

export const qaContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED TEST REPORT / SYNTHETIC DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 05',
    titleLines: ['QA', 'RECORD'],
    thesis:
      '테스트 결과를 한 번의 문서가 아니라, 다시 실행하고 근거를 되짚을 수 있는 기록으로 만들었다.',
    summary:
      '목적과 환경, 기대·실제 결과, 첨부, 수정 이력을 한 화면에 연결해 QA 판단이 바뀐 맥락까지 남겼습니다.',
    problemLabel: 'PROBLEM / RESULT WITHOUT HISTORY',
    problem:
      '문서 버전과 언어가 나뉘면 같은 테스트의 수정·재실행·첨부를 함께 추적하기 어렵고, 최신 판정이 무엇인지 다시 확인하는 비용이 커졌습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / TEST DETAIL',
    title: '판정만 보여주지 않고, 판정이 만들어진 기록을 남긴다.',
    instruction:
      '실행 조건 · QA 판정 · 첨부 근거 · 재실행 이력 · AI 재생성',
    defaultAnnotation: {
      index: '00',
      label: 'INSPECTION GUIDE',
      title: '한 테스트 기록 안에서 근거와 변화가 이어집니다.',
      body: '기대·실제 결과에 실행 조건과 첨부를 연결하고, 다시 테스트한 이력을 남깁니다. AI 요약과 번역은 사람이 요청한 시점에 따로 갱신됩니다.',
    },
  },
  product: qaProductFixture,
  annotations: [
    {
      id: 'test-context',
      index: '01',
      label: 'TEST CONTEXT',
      title: '결과보다 먼저, 같은 조건을 다시 만들 수 있어야 했다.',
      sections: [
        {
          label: 'WHY',
          body: 'PASS와 FAIL만으로는 어떤 목적과 환경에서 나온 결과인지 알기 어렵습니다. 같은 조건을 다시 만들려면 두 정보가 함께 필요합니다.',
        },
        {
          label: 'DECISION',
          body: '테스트 목적과 실행 환경을 서로 다른 필드로 분리해, “왜”와 “어디서”를 한 문장에 섞지 않았습니다.',
        },
      ],
      evolution: { label: 'CONTEXT FIELDS SEPARATED', date: '2026.08.07' },
    },
    {
      id: 'human-result',
      index: '02',
      label: 'HUMAN RESULT',
      title: 'QA 판정은 자동 요약이 아니라 실행자가 소유한다.',
      sections: [
        {
          label: 'WHY',
          body: '기대 결과와 실제 화면이 얼마나 다른지는 실행 맥락을 본 QA가 판단해야 합니다. AI 요약과 번역은 이 판단을 대신할 수 없습니다.',
        },
        {
          label: 'BOUNDARY',
          body: 'PASS·FAIL·HOLD와 수정 필요 여부는 QA가 입력합니다. AI 평가나 번역을 갱신해도 이 상태는 유지됩니다.',
        },
      ],
      evolution: { label: 'QA-OWNED STATE', date: '2026.08.07' },
    },
    {
      id: 'attachments',
      index: '03',
      label: 'ATTACHMENTS',
      title: '설명만으로 부족한 순간을 다시 볼 수 있게 했다.',
      sections: [
        {
          label: 'WHY',
          body: '오류가 발생한 순서나 잠깐 나타난 화면 상태는 텍스트만으로 재현하기 어렵습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '이미지·영상·파일은 해당 실행에서 관찰한 근거입니다. 결함 수정 여부는 이후 테스트 결과로 따로 확인합니다.',
        },
      ],
      evolution: { label: 'ATTACHMENT UX REFINED', date: '2026.08.04' },
    },
    {
      id: 'revision-history',
      index: '04',
      label: 'RETEST HISTORY',
      title: '최신 값으로 덮기보다, 판정이 바뀐 순서를 남겼다.',
      sections: [
      {
          label: 'WHY',
          body: '재테스트 뒤 결과만 교체하면 이전 실패와 수정 확인의 연결이 사라집니다. 각 실행을 이력으로 남겨 판정이 바뀐 순서를 보존했습니다.',
        },
    ],
      evolution: { label: 'RETEST HISTORY SHIPPED', date: '2026.07.30' },
    },
    {
      id: 'ai-boundary',
      index: '05',
      label: 'AI BOUNDARY',
      title: '자동 갱신보다, 사람이 요청한 재생성을 택했다.',
      sections: [
        {
          label: 'WHY',
          body: '원문을 고칠 때 AI 평가와 번역도 자동으로 바뀌면, 사람이 검토한 문장과 새로 생성된 문장을 구분하기 어렵습니다.',
        },
        {
          label: 'DECISION',
          body: 'AI 결과는 명시적인 재생성 요청으로만 갱신합니다. 원문과 QA 판정의 수정 권한은 별도로 유지했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: 'AI 문장은 읽기 보조로 남습니다. 테스트 통과 상태와 사람이 입력한 원문을 변경하지 않습니다.',
        },
      ],
      evolution: { label: 'EXPLICIT REGENERATE', date: '2026.08.19' },
    },
  ],
  workflow: {
    eyebrow: 'PRODUCT WORKFLOW',
    title: '실행 조건에서 재테스트까지, 판단의 순서가 남는 흐름.',
    introduction:
      '각 단계는 위 제품 화면의 해당 기록과 연결됩니다.',
    steps: [
      { id: 'qa-flow-context', hotspotId: 'test-context', index: '01', label: 'CONTEXT', summary: '목적과 환경을 분리해 기록' },
      { id: 'qa-flow-execute', hotspotId: 'human-result', index: '02', label: 'EXECUTE', summary: '기대와 실제를 비교해 판정' },
      { id: 'qa-flow-attach', hotspotId: 'attachments', index: '03', label: 'ATTACH', summary: '관찰 근거를 실행에 연결' },
      { id: 'qa-flow-retest', hotspotId: 'revision-history', index: '04', label: 'RETEST', summary: '덮어쓰지 않고 이력을 추가' },
      { id: 'qa-flow-assist', hotspotId: 'ai-boundary', index: '05', label: 'ASSIST', summary: '요청할 때만 AI 결과 갱신' },
    ],
    boundary:
      '추적 범위는 실행 조건·관찰·판정·재실행 이력입니다. ',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: 'A test result is a state. A QA record is a sequence.',
    items: [
      {
        statement: 'KEEP EVERY RUN.',
        explanation: '재실행마다 판정과 관찰을 새 이력으로 보존해 이전 결과를 다시 읽을 수 있게 했습니다.',
      },
      {
        statement: 'QA OWNS THE VERDICT.',
        explanation: 'AI 평가와 번역은 읽기를 돕습니다. PASS·FAIL과 수정 필요 상태는 QA가 결정합니다.',
      },
      {
        statement: 'ATTACH TO THE OBSERVATION.',
        explanation: '파일을 보고서 끝에 모으지 않고 해당 테스트 실행과 직접 연결했습니다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '문서 복제에서, 실행 이력이 남는 운영 기록으로.',
    introduction:
      '문서 구조를 실행 기록으로 옮기고, 조회 권한·AI 갱신 시점·현재 기록의 저장 기준을 나눴습니다.',
    scenes: [
      {
        date: '2026.05.29',
        label: 'SOURCE SHAPE',
        visual: 'source-shape',
        decision: '기존 테스트 문서의 구조와 반복 패턴부터 분리했다.',
        trigger: '여러 문서 버전과 언어에서 같은 기록을 유지하기 어려웠음',
        change: '보고서·테스트 케이스·실행 근거의 기본 구조 정의',
        currentEffect: '상세 화면에서 실행 조건과 테스트 케이스를 구분',
      },
      {
        date: '2026.07.30',
        label: 'RETEST + ATTACHMENT',
        visual: 'history',
        decision: '결과를 교체하던 방식에 실행 이력과 첨부를 더했다.',
        trigger: '수정 전후 판정과 파일을 함께 추적할 필요',
        change: '보고서 생성·조회·수정·삭제, 재테스트 이력, 이미지·영상 첨부 구현',
        currentEffect: '한 상세 화면에서 수정 이력과 실행별 근거 확인',
      },
      {
        date: '2026.08.12',
        label: 'READ-ONLY ROLE',
        visual: 'role',
        decision: '보는 권한과 판정을 바꾸는 권한을 나눴다.',
        trigger: 'QA 기록은 공유하면서 수정 권한은 제한할 필요',
        change: 'QAViewer의 조회 전용 접근 추가',
        currentEffect: '열람 범위와 수정 행동을 역할별로 구분',
      },
      {
        date: '2026.08.19',
        label: 'EXPLICIT REGENERATE',
        visual: 'regenerate',
        decision: 'AI 결과의 자동 갱신을 명시적인 재생성 요청으로 바꿨다.',
        trigger: '원문 수정과 생성 결과의 변경 시점이 섞이는 문제',
        change: 'AI 평가·번역을 사용자 요청 시에만 재생성',
        currentEffect: '사람이 검토한 원문과 AI 결과를 각각 유지',
      },
      {
        date: '2026.08.20',
        label: 'OPERATING SOURCE',
        visual: 'database-source',
        decision: '현재 QA 기록의 기준을 제품 데이터베이스로 옮겼다.',
        trigger: '두 저장소를 지속 동기화할 때 생기는 최신성 모호함',
        change: '외부 문서의 주기적 조회 중단, 수동 복구 경로 유지',
        currentEffect: '현재 상태와 복구 경로의 역할이 분리됨',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / SNAPSHOT 2026.09.04',
    title: '운영 기록의 규모이지, 품질 성과 지표가 아니다.',
    snapshot:
      '읽기 전용 production snapshot의 QA 저장 범위입니다. 정확도·생산성·조직 adoption으로 해석하지 않습니다.',
    items: [],
  },
  implementationStatus: {
    state: 'IMPLEMENTED / DEPLOYED / OPERATING DATA',
    items: [
      '보고서·테스트 케이스의 생성·조회·수정·삭제·보관',
      '재실행 이력과 이미지·영상 첨부',
      '한국어·영어 번역과 명시적인 재생성',
      '보기·편집·삭제를 나눈 effective permission 경계',
    ],
    runtime:
      "2026.09.04 production snapshot에서 QA 기록과 제품 데이터베이스 authority를 확인했다.",
  },
  boundary: {
    eyebrow: "BOUNDARY / RECORD & TEST",
    statement: "첨부와 수정 이력은 관찰을, 테스트 결과는 결함 수정 여부를 남긴다.",
    items: [
      '첨부와 수정 이력은 관찰과 변경 순서를 남깁니다. 결함 수정 완료 여부는 별도 테스트 결과로 확인해야 합니다.',
    ],
  },
  relatedSystems: [
    { title: 'FEATURE VALIDATION', relation: '요구사항과 구현 근거를 사람이 대조하는 검토 경계', href: '/what/feature-validation', status: 'available' },
    { title: 'DOCUMENTATION SYSTEM', relation: '현재 기록의 기준과 복구용 문서의 역할을 구분하는 방식', href: '/how/documentation-system', status: 'available' },
    { title: 'SECURITY & OPERATIONS', relation: '현재 기록의 저장 기준 전환과 수동 복구 범위', href: '/how/security-operations', status: 'available' },
  ],
} as const satisfies QaPageContent
