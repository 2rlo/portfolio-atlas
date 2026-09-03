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
      '“최신 버전”을 날짜 한 줄로 고르지 않고, release status·호환 대상·배포 주의사항을 함께 확인하는 기록과 검색 경로를 만들었다.',
    summary:
      '외부 workspace의 버전 기록을 구조화해 매일 동기화하고, 결정적 필터와 source-aware 검색에서 같은 release evidence를 다시 찾도록 연결했습니다.',
    problemLabel: 'PROBLEM / LATEST IS A FILTERED SET, NOT MAX(DATE)',
    problem:
      '같은 날 목적이 다른 build가 함께 나오고 이름에 Release가 있어도 개발 전용일 수 있었습니다. 날짜나 문자열 하나로 고르면 잘못된 버전을 공식 release처럼 답할 수 있습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / RELEASE LEDGER',
    title: 'Same date. Different purpose. Explicit release state.',
    instruction:
      'release status, same-date builds, compatibility, deployment note, source trace를 선택해 “최신”을 해석하는 기준을 확인하세요.',
    defaultAnnotation: {
      index: '00',
      label: 'LEDGER GUIDE',
      title: '버전 이름보다 구조화된 상태와 적용 범위를 먼저 읽는다.',
      body: '제품명·버전·호환 장비·변경사항은 Jadebell 공개용 합성 예시입니다. 실제 release 이름이나 내부 배포 내용을 사용하지 않았습니다.',
    },
  },
  product: versionLogProductFixture,
  annotations: [
    {
      id: 'release-status',
      index: '01',
      label: 'RELEASE STATUS',
      title: '이름에 Release가 들어가도, release 여부는 별도 상태 필드로 판단한다.',
      sections: [
        {
          label: 'WHY',
          body: '사람이 붙인 version name에는 preview·candidate·release 같은 단어가 섞이고 실제 배포 분류와 어긋날 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: '문자열 추정 대신 구조화된 release status를 filter의 기준으로 두고 날짜·제품 범위와 함께 질의했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: 'RELEASE 표시는 버전 기록의 상태입니다. 현재 runtime 건강성이나 사용자 adoption을 증명하지 않습니다.',
        },
      ],
      evolution: { label: 'STATUS-AWARE EVALUATION', date: '2026.07.15' },
    },
    {
      id: 'same-date-builds',
      index: '02',
      label: 'SAME-DATE BUILDS',
      title: '가장 최근 날짜에 여러 build가 있으면 하나를 지우지 않고 목적별로 함께 보여준다.',
      sections: [
        {
          label: 'WHY',
          body: '서로 다른 제품군·작업 방식·호환 대상을 가진 build가 같은 날 기록될 수 있어 MAX(date) 한 행은 정보를 잃습니다.',
        },
        {
          label: 'DECISION',
          body: '날짜 group 안에 복수 레코드를 유지하고, 질문의 제품·상태·호환 조건을 만족하는 항목을 따로 표시했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '여러 행을 보여주는 것은 우열 판단이 아닙니다. 질문에 필요한 범위를 명시해야 “최신”의 의미가 정해집니다.',
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
          body: '같은 release date라도 대상 장비와 운영 목적이 다르면 실제로 적용 가능한 버전은 달라집니다.',
        },
        {
          label: 'DECISION',
          body: '제품·release status·호환 대상을 함께 filter하고, 선택된 record 안에서 지원 범위를 다시 확인하게 했습니다.',
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
      title: '무엇이 바뀌었는지와, 적용 전에 무엇을 확인해야 하는지를 같은 record에서 분리한다.',
      sections: [
        {
          label: 'WHY',
          body: '업데이트와 버그 수정만 읽으면 운영자가 배포 전 선행 조건이나 주의사항을 놓칠 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: 'update·fix·compatibility·deployment note를 별도 필드로 정규화해 화면과 검색 답변이 같은 구조를 사용하게 했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '배포 기록은 release evidence입니다. 요구사항을 코드가 실제로 충족했다는 구현 근거를 대신하지 않습니다.',
        },
      ],
      evolution: { label: 'DEPLOYMENT EVIDENCE AXIS', date: '2026.08.07' },
    },
    {
      id: 'source-trace',
      index: '05',
      label: 'SOURCE TRACE',
      title: '요약된 답에서 멈추지 않고, 어떤 version record를 사용했는지 다시 찾게 한다.',
      sections: [
        {
          label: 'WHY',
          body: '검색 결과만 남으면 누락 필드나 동기화 시차가 있을 때 답의 근거와 최신성을 재검토하기 어렵습니다.',
        },
        {
          label: 'DECISION',
          body: '결정적 DB filter를 먼저 사용하고 의미 검색을 보조로 붙였으며, 결과에는 source record reference를 유지했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '매일 동기화 일정과 backfill 안전망이 있어도 데이터 최신성 SLA나 source 누락률을 측정한 것은 아닙니다.',
        },
      ],
      evolution: { label: 'SEARCH + SOURCE', date: '2026.07.07' },
    },
  ],
  workflow: {
    eyebrow: 'VERSION EVIDENCE WORKFLOW',
    title: '외부 기록을 구조화하고, 조건을 먼저 좁힌 뒤, source와 함께 제품에 전달한다.',
    introduction: '위 ledger의 sync·filter·compatibility·deployment evidence가 각 단계와 연결됩니다.',
    steps: [
      { id: 'version-flow-source', hotspotId: 'source-trace', index: '01', label: 'SOURCE', summary: 'workspace version record 수집' },
      { id: 'version-flow-normalize', hotspotId: 'deployment-note', index: '02', label: 'NORMALIZE', summary: '상태·호환·update·note 분리' },
      { id: 'version-flow-filter', hotspotId: 'release-status', index: '03', label: 'FILTER', summary: 'date보다 status·purpose 우선' },
      { id: 'version-flow-retrieve', hotspotId: 'compatibility-scope', index: '04', label: 'RETRIEVE', summary: '결정적 조회 뒤 의미 검색 보조' },
      { id: 'version-flow-evidence', hotspotId: 'same-date-builds', index: '05', label: 'EVIDENCE', summary: '복수 record와 source 유지' },
    ],
    boundary: '버전 기록은 release·deployment 축을 설명합니다. requirement ↔ code ↔ QA 축은 Feature Validation에서 별도로 확인합니다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: 'Do not collapse release ambiguity into one convenient row.',
    items: [
      {
        statement: 'STATUS BEATS THE DISPLAY NAME.',
        explanation: 'release라는 문자열을 추정하지 않고 구조화된 상태 필드로 공식 분류를 좁힙니다.',
      },
      {
        statement: 'LATEST DEPENDS ON PURPOSE.',
        explanation: '같은 날짜의 복수 build를 보존하고 제품·호환 범위가 정해진 뒤에야 답을 선택합니다.',
      },
      {
        statement: 'RELEASE EVIDENCE ≠ IMPLEMENTATION EVIDENCE.',
        explanation: '버전 로그는 배포·릴리스 여부를 보조하지만 요구사항 충족 판정을 단독으로 만들지 않습니다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '동기화된 목록에서, 모호한 “최신”을 설명하는 release evidence로.',
    introduction: '현재 ledger의 status·source·missing-value 처리·evidence boundary에 남은 변화입니다.',
    scenes: [
      {
        date: '2026.07.06',
        label: 'NORMALIZED SYNC',
        visual: 'normalized-sync',
        decision: '외부 버전 기록을 제품 안에서 다시 쓸 수 있는 구조로 나눴다.',
        trigger: '버전 정보가 외부 DB에만 있어 다른 업무 데이터와 함께 조회하기 어려움',
        change: '제품·버전·날짜·상태·호환·변경·주의사항 정규화',
        currentEffect: 'release ledger와 downstream 검색이 같은 record 구조를 사용',
      },
      {
        date: '2026.07.07',
        label: 'SEARCH + SOURCE',
        visual: 'search-source',
        decision: '정형 조회 뒤 의미 검색을 보조로 붙이고 source를 표시했다.',
        trigger: '자연어 질문에서 관련 변경과 주의사항을 함께 찾아야 함',
        change: '검색 index backfill과 version source 표시',
        currentEffect: 'source trace에서 structured lookup과 search index 상태를 함께 표시',
      },
      {
        date: '2026.07.15',
        label: 'AMBIGUOUS LATEST',
        visual: 'ambiguous-latest',
        decision: '같은 날짜의 여러 build를 목적별 record로 답하게 했다.',
        trigger: '날짜·이름만으로는 개발 전용과 공식 release를 구분하지 못함',
        change: 'same-date·release status·compatibility 평가 조건 추가',
        currentEffect: 'date group과 explicit status가 ledger의 핵심 hierarchy',
      },
      {
        date: '2026.08.04',
        label: 'MISSING TOLERANT',
        visual: 'missing-tolerant',
        decision: '과거 record 한 건의 빈 선택값이 전체 동기화를 멈추지 않게 했다.',
        trigger: '누락 속성을 가정한 parser가 KeyError로 daily poll 전체를 중단',
        change: '누락값 허용 변환과 저장 후 index·정기 backfill 안전망',
        currentEffect: '불완전한 과거 record도 보존하고 모르는 필드는 비운 채 처리',
      },
      {
        date: '2026.08.07',
        label: 'EVIDENCE AXIS',
        visual: 'evidence-axis',
        decision: 'release 사실과 요구사항 충족 판정을 서로 다른 근거 축으로 남겼다.',
        trigger: '버전 이름이 기능 구현 완료의 최종 증거처럼 읽힐 위험',
        change: '기능 검증에서 deployment evidence로만 연결',
        currentEffect: 'deployment note annotation에 명시적 claim boundary 유지',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / VERIFIED CONDITIONS',
    title: '검색과 동기화의 구조이지, release 성공률이나 사용량 지표가 아니다.',
    snapshot: '운영 일정과 실제 DB 기반 평가에서 확인한 대표 조건만 사용했습니다.',
    items: [
      {
        value: '07:00',
        label: 'DAILY SYNC / KST',
        meaning: '외부 version records를 구조화된 데이터로 갱신하는 운영 일정',
        boundary: '데이터 최신성 SLA나 모든 실행의 성공률을 뜻하지 않음',
      },
      {
        value: '2',
        label: 'SAME-DATE BUILD ROLES',
        meaning: '동일 날짜의 서로 다른 목적 build를 함께 답한 평가 조건',
        boundary: '전체 버전 수나 제품군 규모를 나타내는 수치가 아님',
      },
      {
        value: '2',
        label: 'RETRIEVAL MODES',
        meaning: '결정적 구조 조회와 의미 검색 보조 경로',
        boundary: '두 결과를 자동 합의나 정확도 점수로 해석하지 않음',
      },
    ],
  },
  implementationStatus: {
    state: 'DEPLOYED / ACTIVE VERSION DATA PATH',
    items: [
      '외부 version records의 정규화·일일 동기화',
      '결정적 status·date·compatibility 조회',
      '검색 index·source-aware 답변 연결',
      '누락 속성 허용과 index backfill 안전망',
    ],
    runtime: '동기화·검색 경로는 운영에서 활성화됐고 실제 DB 기반 ambiguity 조건을 확인했습니다. 반복 조회 사용자 수·조직 표준 정착·최신성 SLA는 별도 근거가 없습니다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / RELEASE RECORD, NOT FEATURE COMPLETION',
    statement: 'A release record can place a build. It cannot prove the requirement works.',
    items: [
      'release status와 날짜는 저장된 version record의 상태이며 runtime 건강성이나 adoption이 아닙니다.',
      'version evidence만으로 requirement 구현 완료나 품질 PASS를 확정하지 않습니다.',
      '반복 사용량·source별 누락률·데이터 최신성 SLA는 측정하지 않았습니다.',
      '채널 메시지에서 version을 자동 추출하는 검토안은 현재 운영 경로로 주장하지 않습니다.',
    ],
  },
  relatedSystems: [
    { title: 'FEATURE VALIDATION', relation: 'release evidence를 code·QA 근거와 분리해 사람이 확정하는 product surface', href: '/what/feature-validation', status: 'available' },
    { title: 'RAG ASSISTANT', relation: '구조화된 조회와 source-aware 검색을 실제 질문에서 사용하는 surface', href: '/what/rag-assistant', status: 'available' },
    { title: 'DOCUMENTATION SYSTEM', relation: '외부 기록을 다시 찾을 수 있는 구조와 provenance를 설계하는 방식', href: '/how/documentation-system', status: 'available' },
  ],
} as const satisfies VersionLogPageContent
