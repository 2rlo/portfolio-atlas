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
    thesis: '팀 문서를 모으고 다시 찾는 공유 Wiki를 도입했다.',
    summary:
      'Outline을 공유 Wiki로 사용하고, 읽는 목적에 맞춰 컬렉션을 구성했다. 처음 찾는 문서는 검색으로, 다시 읽을 문서는 최근 문서 목록으로 들어간다.',
    problemLabel: 'PROBLEM',
    problem:
      '개발·운영 문서가 늘어날수록 내용을 아는 사람만 경로를 기억했다. 독자와 목적에 맞춰 문서로 돌아가는 별도의 입구가 필요했다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / OUTLINE',
    title: '문서를 찾는 여러 입구',
    instruction:
      '컬렉션과 검색, 최근 문서에서 본문으로 들어가는 흐름',
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
      title: '위치를 몰라도 검색으로 시작',
      sections: [
        {
          label: 'WHY',
          body: '컬렉션 경로를 기억하지 못해도 문서 탐색을 시작할 수 있어야 한다. 전역 검색은 컬렉션과 나란히 놓인 진입점이다.',
        },
      ],
    },
    {
      id: 'collection-structure',
      index: '02',
      label: 'COLLECTION ROUTES',
      title: '읽는 목적에 맞춘 컬렉션',
      sections: [
        {
          label: 'DECISION',
          body: '시작 안내, 협업, 제품, 엔지니어링, 파트너 운영처럼 읽는 목적에 가까운 단위로 진입점을 구분했다.',
        },
      ],
    },
    {
      id: 'return-views',
      index: '03',
      label: 'RETURN VIEWS',
      title: '최근 본 문서로 돌아가기',
      sections: [
        {
          label: 'WHY',
          body: '최근 본 문서, 최근 바뀐 문서, 내가 만든 문서는 다시 찾는 기준이 다르다. 홈은 각 기준을 별도 보기로 제공한다.',
        },
      ],
    },
    {
      id: 'document-metadata',
      index: '04',
      label: 'DOCUMENT CONTEXT',
      title: '목록에서 수정 정보 확인',
      sections: [
        {
          label: 'WHY',
          body: '제목 옆에서 수정자·수정 시각·컬렉션·최근 조회 정보를 확인할 수 있다.',
        },
      ],
    },
  ],
  workflow: {
    eyebrow: 'PRODUCT WORKFLOW',
    title: '문서 목록에서 본문까지',
    introduction:
      'Wiki 홈에서 문서를 찾고 문서 정보를 확인한 뒤 본문을 연다.',
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
        summary: '최근 본 문서, 업데이트된 문서, 내가 만든 문서를 다시 연다.',
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
      '컬렉션을 따라 찾거나 검색으로 바로 들어가고, 최근 본 문서 목록으로 읽던 내용을 다시 연다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: '문서를 찾는 기준을 나누다',
    items: [
      {
        statement: '처음 찾는 사람의 진입점',
        explanation: '공유 Wiki에 컬렉션과 검색을 함께 두어, 문서 위치를 아는 사람과 모르는 사람 모두 탐색을 시작하게 했다.',
      },
      {
        statement: '목적별로 나눈 컬렉션',
        explanation: '시작 안내와 협업, 제품, 엔지니어링처럼 독자가 읽으려는 목적에 맞춰 문서 입구를 구분했다.',
      },
      {
        statement: '다시 읽는 사람의 단서',
        explanation: '최근 본 문서와 업데이트된 문서를 구분해, 읽던 문서로 돌아가거나 새로 바뀐 내용을 찾도록 했다.',
      },
    ],
  },
  evidence: {
    eyebrow: '공유 도구 선택',
    title: 'Outline으로 문서 탐색을 통합',
    snapshot: '공유 Wiki 도입과 컬렉션 구성에 집중하고, 검색과 최근 문서 등 Outline의 탐색 기능을 함께 사용했다.',
    items: [],
  },
  implementationStatus: {
    state: '검색과 컬렉션을 함께 사용',
    items: [
      '읽는 목적별 컬렉션에서 문서 탐색',
      '위치를 기억하지 못하는 문서는 전역 검색',
      '최근 조회와 업데이트 목록에서 문서 다시 열기',
    ],
    runtime: '팀 문서를 읽는 입구를 공유 Wiki에 모으고, 제목 옆의 수정자와 수정 시각, 컬렉션 정보로 열어볼 문서를 고르게 했다.',
  },
  boundary: {
    eyebrow: '문서 체계와 연결',
    statement: '찾은 문서가 어떤 역할을 하는지 확인한다.',
    items: [
      'Wiki는 문서를 찾고 읽는 입구다. Documentation System에서는 현재 상태와 결정, 운영 안내를 나눠 각 문서가 맡을 역할을 정리했다.',
    ],
  },
  relatedSystems: [
    {
      title: 'DOCUMENTATION SYSTEM',
      relation: '현재·미래·결정·운영에 따라 문서 역할을 나누는 방식',
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
