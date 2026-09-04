import type { WikiPageContent } from './content-types.ts'
import { wikiFixture } from './fixtures/wiki.ts'

export const wikiContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED OUTLINE VIEW / SYNTHETIC DATA',
    currentStatus: 'confirmed-product-surface',
    boundary: {
      dataOrigin: 'independently-authored-synthetic',
      privateSourceRuntimeDependency: false,
      containsRealIdentifiers: false,
      oneToOneInternalMapping: false,
    },
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 14',
    titleLines: ['TEAM', 'WIKI'],
    thesis: '문서를 더 쌓기 전에, 다시 찾을 수 있는 입구를 열었다.',
    summary:
      'Outline을 공유 지식 표면으로 두고 컬렉션 탐색, 검색, 최근 문서 복귀를 한 화면에서 시작하게 했다.',
    problemLabel: 'PROBLEM',
    problem:
      '개발·운영 문서가 늘어날수록 내용을 아는 사람만 경로를 기억했다. 독자와 목적에 맞춰 문서로 돌아가는 별도의 입구가 필요했다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / OUTLINE',
    title: '어디에 있는지 몰라도, 다시 찾게 하는 화면.',
    instruction:
      '검색, 컬렉션, 복귀 보기, 문서 메타데이터를 hover하거나 keyboard focus해 설계 이유를 확인하세요.',
    defaultAnnotation: {
      index: '00',
      label: 'WIKI HOME',
      title: '저장 공간보다 먼저 보이는 것은 탐색 경로다.',
      body: '이 화면은 문서 본문을 과시하지 않는다. 사용자가 이미 알고 있는 경로와 기억하지 못하는 경로 모두에서 다시 시작할 수 있게 만든다.',
    },
  },
  product: wikiFixture,
  annotations: [
    {
      id: 'search-entry',
      index: '01',
      label: 'GLOBAL SEARCH',
      title: '제목과 위치를 기억하지 못해도 시작할 수 있어야 했다.',
      sections: [
        {
          label: 'WHY',
          body: '컬렉션 경로를 아는 사람만 문서를 찾을 수 있으면 Wiki는 기억력에 의존한다. 검색을 전역 입구로 남겨 탐색 경로와 병렬로 시작하게 했다.',
        },
        {
          label: 'BOUNDARY',
          body: '검색 결과에 나타났다는 사실은 문서가 최신이거나 공식이라는 뜻이 아니다. 검색은 발견만 담당한다.',
        },
      ],
    },
    {
      id: 'collection-structure',
      index: '02',
      label: 'COLLECTION ROUTES',
      title: '폴더가 아니라, 독자가 들어오는 문을 나눴다.',
      sections: [
        {
          label: 'DECISION',
          body: '시작 안내, 협업, 제품, 엔지니어링, 파트너 운영처럼 읽는 목적에 가까운 단위로 진입점을 구분했다.',
        },
        {
          label: 'BOUNDARY',
          body: '컬렉션 이름은 탐색을 돕는 정보 구조다. 접근 권한, 문서 소유권, 내용의 사실성을 대신 확정하지 않는다.',
        },
      ],
    },
    {
      id: 'return-views',
      index: '03',
      label: 'RETURN VIEWS',
      title: '다시 찾는 이유는 하나가 아니었다.',
      sections: [
        {
          label: 'WHY',
          body: '방금 보던 문서, 최근 바뀐 문서, 내가 만든 문서는 서로 다른 복귀 질문이다. 홈에서 하나의 순위로 압축하지 않았다.',
        },
        {
          label: 'BOUNDARY',
          body: '인기나 최근 조회는 권위의 순서가 아니다. 무엇을 먼저 검토할지 알려 주는 navigation signal로만 사용한다.',
        },
      ],
    },
    {
      id: 'document-metadata',
      index: '04',
      label: 'DOCUMENT CONTEXT',
      title: '제목 옆에 문서가 놓인 맥락을 남겼다.',
      sections: [
        {
          label: 'WHY',
          body: '수정 주체, 상대 시각, 컬렉션, 마지막 조회 정보를 함께 보면 문서를 열기 전에 현재성과 쓰임을 빠르게 판단할 수 있다.',
        },
        {
          label: 'BOUNDARY',
          body: '이 메타데이터는 변경 이력이나 승인 기록이 아니다. 중요한 판단은 문서 본문과 별도 근거에서 다시 확인해야 한다.',
        },
      ],
    },
  ],
  workflow: {
    eyebrow: 'PRODUCT WORKFLOW',
    title: '기억한 경로와 기억하지 못한 경로를 같은 문서로 연결한다.',
    introduction:
      'Wiki 홈은 정답을 만드는 곳이 아니라, 문서를 발견하고 맥락을 확인한 뒤 원문으로 들어가는 입구다.',
    steps: [
      {
        id: 'browse',
        hotspotId: 'collection-structure',
        index: '01',
        label: 'BROWSE',
        summary: '읽는 목적과 도메인으로 컬렉션을 좁힌다.',
      },
      {
        id: 'search',
        hotspotId: 'search-entry',
        index: '02',
        label: 'SEARCH',
        summary: '경로를 모르면 전역 검색에서 시작한다.',
      },
      {
        id: 'return',
        hotspotId: 'return-views',
        index: '03',
        label: 'RETURN',
        summary: '최근 조회·업데이트·작성 맥락으로 돌아간다.',
      },
      {
        id: 'open',
        hotspotId: 'document-metadata',
        index: '04',
        label: 'OPEN',
        summary: '메타데이터를 확인하고 원문을 연다.',
      },
    ],
    boundary:
      '공개 재구성은 홈 화면에서 확인되는 탐색 흐름까지만 보여 준다. 검색 ranking, editor 동작, 권한 모델, 저장 방식은 이 화면만으로 추정하지 않는다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: 'Wiki를 지식의 판정자가 아니라, 지식으로 돌아가는 표면으로 봤다.',
    items: [
      {
        statement: 'FINDABILITY BEFORE VOLUME.',
        explanation: '문서 개수보다 먼저, 처음 온 사람과 다시 온 사람이 각각 어디서 시작하는지 설계했다.',
      },
      {
        statement: 'COLLECTION IS A ROUTE, NOT AUTHORITY.',
        explanation: '분류는 문서를 찾는 비용을 줄이지만, 그 안의 내용이 확정 사실인지까지 보증하지 않는다.',
      },
      {
        statement: 'FRESHNESS STAYS VISIBLE.',
        explanation: '최근성 힌트를 숨기지 않아, 오래된 문서를 현재 상태로 오해하기 전에 다시 확인하게 했다.',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / CLAIM BOUNDARY',
    title: '확인된 것은 도구와 화면이다. 사용 효과는 별개의 질문이다.',
    snapshot: '제공된 제품 화면과 사용자 확인을 기준으로 한 범위',
    items: [
      {
        value: 'OUTLINE',
        label: 'PRODUCT SURFACE',
        meaning: '공유 Wiki 표면으로 사용한 제품이 확인됐다.',
        boundary: 'Outline 자체 UI를 직접 설계·구현했다는 의미가 아니다.',
      },
      {
        value: '08',
        label: 'VISIBLE COLLECTIONS',
        meaning: '원본 홈 화면에 보이는 컬렉션 진입 수를 구조 근거로 사용했다.',
        boundary: '전체 문서 수, 활성 컬렉션 수, 정보 품질을 뜻하지 않는다.',
      },
      {
        value: 'N/M',
        label: 'ADOPTION OUTCOME',
        meaning: '조직 사용량이나 검색 성공률은 측정 근거가 없다.',
        boundary: '화면 존재와 반복 사용·조직 정착을 동일시하지 않는다.',
      },
    ],
  },
  implementationStatus: {
    state: 'ADOPTED TOOL / CONFIRMED SURFACE',
    items: [
      'Outline 사용 사실과 홈 화면 구성을 확인',
      '검색·컬렉션·최근 문서·새 문서 진입을 화면에서 확인',
      '공개 화면은 Jadebell 합성 데이터로 독립 재구성',
      'component-level 날짜 변화는 근거가 없어 timeline을 생략',
    ],
    runtime:
      '호스팅 방식, 인증 연동, 세부 권한, 문서 corpus, 편집 persistence, 검색 품질, 반복 사용량은 현재 근거로 확정하지 않는다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY',
    statement: 'Outline을 사용했다. Outline을 만들었다고 주장하지 않는다.',
    items: [
      '원본 screenshot과 실제 조직·문서·사용자 이름은 공개 asset에 포함하지 않았다.',
      '보이는 홈 화면 밖의 검색 ranking, editor, 보관·복원 behavior를 추정하지 않았다.',
      '컬렉션 구조가 문서의 최신성·정확성·승인 상태를 보증한다고 주장하지 않는다.',
      'Wiki 화면의 존재를 조직 adoption이나 onboarding 효과의 증거로 해석하지 않는다.',
    ],
  },
  relatedSystems: [
    {
      title: 'DOCUMENTATION SYSTEM',
      relation: '문서가 현재·미래·결정·운영 역할을 나누는 방식',
      href: '/how/documentation-system',
      status: 'available',
    },
    {
      title: 'RAG ASSISTANT',
      relation: '검색 결과의 관련성과 source 신뢰도를 분리하는 방식',
      href: '/what/rag-assistant',
      status: 'available',
    },
    {
      title: 'PERMISSION',
      relation: '화면 노출과 effective access를 구분하는 방식',
      href: '/what/permission',
      status: 'available',
    },
  ],
} as const satisfies WikiPageContent
