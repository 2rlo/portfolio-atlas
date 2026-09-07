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
      '공유 Wiki로 Outline을 사용했다. 홈의 컬렉션·검색·최근 문서가 원문으로 돌아가는 입구를 맡는다.',
    problemLabel: 'PROBLEM',
    problem:
      '개발·운영 문서가 늘어날수록 내용을 아는 사람만 경로를 기억했다. 독자와 목적에 맞춰 문서로 돌아가는 별도의 입구가 필요했다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / OUTLINE',
    title: '어디에 있는지 몰라도, 다시 찾게 하는 화면.',
    instruction:
      '검색·컬렉션·다시 찾기·문서 정보의 설계 맥락',
    defaultAnnotation: {
      index: '00',
      label: 'WIKI HOME',
      title: '검색, 컬렉션, 최근 문서로 시작하는 탐색',
      body: '경로를 아는 문서는 컬렉션에서, 기억나지 않는 문서는 검색과 최근 문서 목록에서 찾을 수 있다.',
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
          body: '컬렉션 경로를 기억하지 못해도 문서 탐색을 시작할 수 있어야 한다. 전역 검색은 컬렉션과 나란히 놓인 진입점이다.',
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
      title: '읽는 목적에 따라 나뉜 컬렉션 입구',
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
          body: '최근 본 문서, 최근 바뀐 문서, 내가 만든 문서는 다시 찾는 기준이 다르다. 홈은 각 기준을 별도 보기로 제공한다.',
        },
        {
          label: 'BOUNDARY',
          body: '인기와 최근 조회는 문서를 다시 찾는 단서다. 내용의 권위나 승인 상태를 뜻하지 않는다.',
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
          body: '제목 옆에서 수정자·수정 시각·컬렉션·최근 조회 정보를 확인할 수 있다.',
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
      'Wiki 홈은 문서를 발견하고, 문서 정보를 확인한 뒤 본문으로 들어가는 입구다.',
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
      '공개 재구성 범위는 홈의 탐색 흐름까지다. 검색 순위·편집기 동작·권한 모델·저장 방식은 확인 범위 밖이다.',
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
        explanation: '컬렉션은 문서를 찾는 기준을 제공한다. 내용의 확정 상태는 문서와 근거에서 별도로 확인해야 한다.',
      },
      {
        statement: 'FRESHNESS STAYS VISIBLE.',
        explanation: '문서 제목과 함께 최근 수정·조회 시점을 표시한다. 현재 내용인지는 문서에서 다시 확인해야 한다.',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / CLAIM BOUNDARY',
    title: 'Outline 사용과 홈 화면에서 확인한 범위',
    snapshot: '제공된 제품 화면과 사용자 확인을 기준으로 한 범위',
    items: [
      {
        value: 'OUTLINE',
        label: 'PRODUCT SURFACE',
        meaning: '공유 Wiki로 Outline을 사용한 사실',
        boundary: 'Outline 자체 UI를 직접 설계·구현했다는 의미가 아니다.',
      },
      {
        value: '08',
        label: 'VISIBLE COLLECTIONS',
        meaning: '원본 홈 화면에서 확인한 컬렉션 진입점 8개',
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
    ],
    runtime:
      '현재 근거로는 호스팅·인증 연동·세부 권한·문서 구성·편집 내용 저장·검색 품질·반복 사용량을 확정할 수 없다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY',
    statement: '확인된 기여 범위: Outline 사용과 공개 홈 화면 재구성',
    items: [
      '공개 예시에는 원본 화면과 실제 조직·문서·사용자 이름을 포함하지 않았다.',
      '검색 순위·편집기·보관·복원 동작은 홈 화면만으로 확인하지 않았다.',
      '컬렉션 구조가 문서의 최신성·정확성·승인 상태를 보증한다고 주장하지 않는다.',
      'Wiki 화면의 존재만으로 조직 내 정착이나 신규 구성원 적응 효과를 판단할 수 없다.',
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
      relation: '검색 관련성과 자료의 역할·검토 상태를 구분하는 방식',
      href: '/what/rag-assistant',
      status: 'available',
    },
    {
      title: 'PERMISSION',
      relation: '화면 노출과 실제 접근 권한을 구분하는 방식',
      href: '/what/permission',
      status: 'available',
    },
  ],
} as const satisfies WikiPageContent
