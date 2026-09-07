import type { VersionLogPageContent } from './content-types.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'
import { versionLogProductFixture } from './fixtures/version-log.ts'

export const versionLogContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED VERSION RECORD VIEW / SYNTHETIC DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 13',
    titleLines: ['VERSION', 'LOG'],
    thesis:
      '“최신 버전”을 고를 때 날짜와 함께 릴리스 상태·호환 대상·배포 주의사항을 확인하도록 기록과 검색 경로를 만들었다.',
    summary:
      '외부 작업 공간의 버전 기록을 구조화해 매일 동기화합니다. 조건별 DB 조회와 출처를 남기는 검색이 같은 릴리스 기록을 사용합니다.',
    problemLabel: 'PROBLEM / LATEST IS A FILTERED SET, NOT MAX(DATE)',
    problem:
      '같은 날 목적이 다른 빌드가 함께 나오고, 이름에 Release가 있어도 개발 전용일 수 있었습니다. 날짜나 이름만으로 고르면 적용할 수 없는 버전을 공식 릴리스로 답할 수 있습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / RELEASE LEDGER',
    title: 'Same date. Different purpose. Explicit release state.',
    instruction:
      '릴리스 상태 · 같은 날짜의 빌드 · 호환 대상 · 배포 주의사항 · 출처',
    defaultAnnotation: {
      index: '00',
      label: 'LEDGER GUIDE',
      title: '버전 이름보다 구조화된 상태와 적용 범위를 먼저 읽는다.',
      body: '릴리스 상태와 제품·호환 조건으로 대상을 좁힙니다. 같은 날짜의 여러 빌드와 배포 주의사항, 사용한 원본 기록을 함께 남깁니다.',
    },
  },
  product: versionLogProductFixture,
  annotations: [
    {
      id: 'release-status',
      index: '01',
      label: 'RELEASE STATUS',
      title: '이름에 Release가 있어도, 릴리스 여부는 별도 상태 필드로 판단한다.',
      sections: [
        {
          label: 'WHY',
          body: '사람이 붙인 버전 이름에는 preview·candidate·release가 섞이고, 저장된 배포 분류와 어긋날 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: '구조화된 릴리스 상태를 필터 기준으로 두고, 날짜·제품 범위와 함께 조회했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: 'RELEASE는 버전 기록에 저장된 분류입니다. 현재 실행 상태나 실제 사용 여부는 별도 확인이 필요합니다.',
        },
      ],
      evolution: { label: 'STATUS-AWARE EVALUATION', date: '2026.07.15' },
    },
    {
      id: 'same-date-builds',
      index: '02',
      label: 'SAME-DATE BUILDS',
      title: '최근 날짜에 여러 빌드가 있으면 목적별 기록을 함께 남긴다.',
      sections: [
        {
          label: 'WHY',
          body: '제품군·작업 방식·호환 대상이 다른 빌드가 같은 날 기록될 수 있습니다. MAX(date)로 한 행만 고르면 이 차이가 사라집니다.',
        },
        {
          label: 'DECISION',
          body: '날짜별로 여러 기록을 유지하고, 질문의 제품·상태·호환 조건을 만족하는 항목을 따로 표시했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '“최신”은 질문의 목적과 적용 범위 안에서 정합니다. 같은 날 기록됐다는 이유로 빌드 사이의 우열을 정하지 않습니다.',
        },
      ],
      evolution: { label: 'AMBIGUOUS LATEST', date: '2026.07.15' },
    },
    {
      id: 'compatibility-scope',
      index: '03',
      label: 'COMPATIBILITY',
      title: '버전 번호가 높다는 이유만으로, 모든 장비에 맞는 답으로 선택하지 않는다.',
      sections: [
        {
          label: 'WHY',
          body: '릴리스 날짜가 같아도 대상 장비와 운영 목적에 따라 적용 가능한 버전이 달라집니다.',
        },
        {
          label: 'DECISION',
          body: '제품·릴리스 상태·호환 대상을 함께 필터링하고, 선택한 기록에도 지원 범위를 표시했습니다.',
        },
        {
          label: 'EVIDENCE',
          body: '실제 DB 기반 평가에는 동일 날짜 복수 버전과 목적별 호환 범위를 묻는 조건을 포함했습니다.',
        },
      ],
      evolution: { label: 'PURPOSE-AWARE LOOKUP', date: '2026.07.15' },
    },
    {
      id: 'deployment-note',
      index: '04',
      label: 'DEPLOYMENT NOTE',
      title: '변경 내용과 적용 전 확인 사항을 같은 기록 안에서 구분한다.',
      sections: [
        {
          label: 'WHY',
          body: '업데이트와 버그 수정만 읽으면 운영자가 배포 전 선행 조건이나 주의사항을 놓칠 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: '업데이트·수정·호환 대상·배포 주의사항을 별도 필드로 정리해 화면과 검색 답변이 같은 구조를 사용하게 했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '버전 기록은 릴리스·배포의 근거로 연결합니다. 요구사항을 코드가 충족하는지는 구현 근거로 별도 확인합니다.',
        },
      ],
      evolution: { label: 'DEPLOYMENT EVIDENCE AXIS', date: '2026.08.07' },
    },
    {
      id: 'source-trace',
      index: '05',
      label: 'SOURCE TRACE',
      title: '답변이 사용한 버전 기록을 다시 찾을 수 있게 했다.',
      sections: [
        {
          label: 'WHY',
          body: '검색 결과만 남으면 누락 필드나 동기화 시차가 있을 때 답의 근거와 최신성을 재검토하기 어렵습니다.',
        },
        {
          label: 'DECISION',
          body: '명시한 조건으로 DB를 먼저 조회하고 의미 검색을 보조로 붙였습니다. 결과에는 사용한 원본 기록의 참조를 남겼습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '일일 동기화와 누락 색인 보완 경로는 운영 중입니다. 데이터 최신성 SLA와 원본 누락률은 측정하지 않았습니다.',
        },
      ],
      evolution: { label: 'SEARCH + SOURCE', date: '2026.07.07' },
    },
  ],
  workflow: {
    eyebrow: 'VERSION EVIDENCE WORKFLOW',
    title: '외부 기록을 구조화하고, 조건을 좁힌 뒤, 출처와 함께 전달한다.',
    introduction: '동기화한 기록을 상태·호환 조건으로 조회하고 답변의 근거로 연결하는 흐름.',
    steps: [
      { id: 'version-flow-source', hotspotId: 'source-trace', index: '01', label: 'SOURCE', summary: '외부 작업 공간의 버전 기록 수집' },
      { id: 'version-flow-normalize', hotspotId: 'deployment-note', index: '02', label: 'NORMALIZE', summary: '상태·호환·변경·주의사항 분리' },
      { id: 'version-flow-filter', hotspotId: 'release-status', index: '03', label: 'FILTER', summary: '상태와 목적을 정한 뒤 날짜 비교' },
      { id: 'version-flow-retrieve', hotspotId: 'compatibility-scope', index: '04', label: 'RETRIEVE', summary: '조건별 DB 조회 후 의미 검색 보조' },
      { id: 'version-flow-evidence', hotspotId: 'same-date-builds', index: '05', label: 'EVIDENCE', summary: '복수 기록과 원본 참조 유지' },
    ],
    boundary: '버전 기록은 릴리스·배포 내역을 설명합니다. 요구사항·코드·QA의 연결은 Feature Validation에서 별도로 확인합니다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: 'Do not collapse release ambiguity into one convenient row.',
    items: [
      {
        statement: 'STATUS BEATS THE DISPLAY NAME.',
        explanation: '이름의 release라는 단어 대신 구조화된 상태 필드로 릴리스 대상을 좁힙니다.',
      },
      {
        statement: 'LATEST DEPENDS ON PURPOSE.',
        explanation: '같은 날짜의 여러 빌드를 보존하고, 제품과 호환 범위를 정한 뒤 질문에 맞는 버전을 선택합니다.',
      },
      {
        statement: 'RELEASE EVIDENCE ≠ IMPLEMENTATION EVIDENCE.',
        explanation: '버전 로그는 배포·릴리스 여부를 보조하지만 요구사항 충족 판정을 단독으로 만들지 않습니다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '동기화된 목록에서, 조건에 따라 달라지는 “최신” 버전의 근거로.',
    introduction: '기록 구조화에서 시작해 검색 출처, 복수 빌드, 누락값 처리, 근거의 용도를 보완했습니다.',
    scenes: [
      {
        date: '2026.07.06',
        label: 'NORMALIZED SYNC',
        visual: 'normalized-sync',
        decision: '외부 버전 기록을 제품 안에서 다시 쓸 수 있는 구조로 나눴다.',
        trigger: '버전 정보가 외부 DB에만 있어 다른 업무 데이터와 함께 조회하기 어려움',
        change: '제품·버전·날짜·상태·호환·변경·주의사항 정규화',
        currentEffect: '릴리스 목록과 검색이 같은 기록 구조를 사용',
      },
      {
        date: '2026.07.07',
        label: 'SEARCH + SOURCE',
        visual: 'search-source',
        decision: '정형 조회에 의미 검색을 보조로 붙이고 출처를 표시했다.',
        trigger: '자연어 질문에서 관련 변경과 주의사항을 함께 찾아야 함',
        change: '기존 기록의 검색 색인 보완과 버전 출처 표시',
        currentEffect: '출처 영역에 정형 조회와 검색 색인의 상태를 함께 표시',
      },
      {
        date: '2026.07.15',
        label: 'AMBIGUOUS LATEST',
        visual: 'ambiguous-latest',
        decision: '같은 날짜의 여러 빌드를 목적별 기록으로 답하게 했다.',
        trigger: '날짜·이름만으로는 개발 전용과 공식 릴리스를 구분하기 어려움',
        change: '동일 날짜·릴리스 상태·호환 조건을 평가에 추가',
        currentEffect: '날짜별 기록과 명시적인 상태를 목록의 주요 기준으로 사용',
      },
      {
        date: '2026.08.04',
        label: 'MISSING TOLERANT',
        visual: 'missing-tolerant',
        decision: '과거 기록 한 건의 빈 선택값이 전체 동기화를 멈추지 않게 했다.',
        trigger: '속성 누락을 처리하지 못한 파서의 KeyError로 일일 동기화 전체가 중단',
        change: '누락값을 허용하는 변환, 저장 후 색인 갱신, 정기 색인 보완 경로 추가',
        currentEffect: '불완전한 과거 기록도 보존하고 모르는 필드는 비워서 처리',
      },
      {
        date: '2026.08.07',
        label: 'EVIDENCE AXIS',
        visual: 'evidence-axis',
        decision: '릴리스 사실과 요구사항 충족 판정을 서로 다른 근거로 남겼다.',
        trigger: '버전 이름이 기능 구현 완료의 최종 증거처럼 읽힐 위험',
        change: '기능 검증에서 배포 근거로만 연결',
        currentEffect: '배포 주의사항 설명에 릴리스 근거의 사용 범위 명시',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / VERIFIED CONDITIONS',
    title: '운영 동기화 일정과 실제 DB로 검증한 조회 조건.',
    snapshot: '운영 일정과 실제 DB 기반 평가에서 확인한 대표 조건만 사용했습니다.',
    items: [
      {
        value: '07:00',
        label: 'DAILY SYNC / KST',
        meaning: '외부 버전 기록을 구조화된 데이터로 갱신하는 운영 일정',
        boundary: '데이터 최신성 SLA나 모든 실행의 성공률을 뜻하지 않음',
      },
      {
        value: '2',
        label: 'SAME-DATE BUILD ROLES',
        meaning: '동일 날짜의 목적이 다른 빌드를 함께 답한 평가 조건',
        boundary: '전체 버전 수나 제품군 규모를 나타내는 수치가 아님',
      },
      {
        value: '2',
        label: 'RETRIEVAL MODES',
        meaning: '조건별 DB 조회와 보조 의미 검색',
        boundary: '서로 다른 조회 경로의 수이며 정확도나 자동 검증 점수는 아닙니다.',
      },
    ],
  },
  implementationStatus: {
    state: 'DEPLOYED / ACTIVE VERSION DATA PATH',
    items: [
      '외부 버전 기록의 정규화·일일 동기화',
      '상태·날짜·호환 조건에 따른 DB 조회',
      '검색 색인과 출처를 남기는 답변 연결',
      '누락 속성 처리와 검색 색인 보완 경로',
    ],
    runtime: '동기화·검색 경로는 운영에서 활성화됐고, 실제 DB로 같은 날짜의 복수 버전 등 모호한 조건을 확인했습니다. 반복 조회 사용자 수, 조직 표준으로의 정착, 데이터 최신성 SLA는 미확인입니다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / RELEASE RECORD, NOT FEATURE COMPLETION',
    statement: '버전 기록이 설명하는 범위는 릴리스 상태와 적용 조건까지.',
    items: [
      '반복 사용량·출처별 누락률·데이터 최신성 SLA는 측정하지 않았습니다.',
      '채널 메시지에서 버전을 자동 추출하는 방안은 검토 단계이며 현재 운영 경로에 포함되지 않습니다.',
    ],
  },
  relatedSystems: [
    { title: 'FEATURE VALIDATION', relation: '릴리스·코드·QA 근거를 구분해 사람이 판정하는 제품 사례', href: '/what/feature-validation', status: 'available' },
    { title: 'RAG ASSISTANT', relation: '조건별 조회와 출처가 있는 검색을 실제 질문에 사용하는 제품 사례', href: '/what/rag-assistant', status: 'available' },
    { title: 'DOCUMENTATION SYSTEM', relation: '외부 기록의 구조와 출처를 보존해 다시 찾을 수 있게 하는 방식', href: '/how/documentation-system', status: 'available' },
  ],
} as const satisfies VersionLogPageContent
