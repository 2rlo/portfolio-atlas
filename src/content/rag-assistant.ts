import type { RagAssistantPageContent } from './content-types.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'
import { ragAssistantProductFixture } from './fixtures/rag-assistant.ts'

export const ragAssistantContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED ASSISTANT VIEW / SYNTHETIC DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 10',
    titleLines: ['RAG', 'ASSISTANT'],
    thesis:
      '흩어진 업무 정보를 질문으로 찾고, 답변에서 원문까지 열 수 있게 했다.',
    summary:
      '날짜와 프로젝트, 상태는 DB에서 조회하고 표현이 다른 문서는 의미 검색으로 찾는다. 검색 결과의 출처와 검토 상태를 함께 보여주며, 대화에서 찾은 기록 후보는 검토함으로 보낸다.',
    problemLabel: '여러 화면을 오가던 정보 탐색',
    problem:
      '프로젝트 현황을 찾으려면 일정과 QA, 회의 기록을 각각 열어야 했다. 문서를 찾은 뒤에도 최신 상태인지, 누가 검토했는지 다시 확인해야 했다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / ANSWER + SOURCE RECEIPT',
    title: '답변과 출처를 함께 읽기',
    instruction:
      '질문에 맞는 자료를 찾고 기록으로 돌아가는 흐름',
    defaultAnnotation: {
      index: '00',
      label: 'ASSISTANT GUIDE',
      title: '질문에서 업무 기록까지',
      body: '질문에 필요한 업무 범위를 좁히고 정형 상태와 관련 문서를 조회한다. 답변에는 출처를 남기고, 근거가 부족한 판단은 필요한 자료와 함께 표시한다.',
    },
  },
  product: ragAssistantProductFixture,
  annotations: [
    {
      id: 'context-entry',
      index: '01',
      label: 'CONTEXT ENTRY',
      title: '질문에서 조회 범위 찾기',
      sections: [
        {
          label: 'WHY',
          body: '일정·보고·QA·회의 중 어떤 자료를 조회하느냐에 따라 답할 수 있는 범위가 달라진다.',
        },
        {
          label: 'DECISION',
          body: '질문의 의도와 키워드로 조회 범위를 정하고, 사용자 권한 밖의 자료는 조회 단계에서 제외했다.',
        },
      ],
      evolution: { label: 'CONTEXT ENTRY MVP', date: '2026.06.26' },
    },
    {
      id: 'deterministic-first',
      index: '02',
      label: 'DETERMINISTIC FIRST',
      title: '상태 조회를 먼저 연결',
      sections: [
        {
          label: 'WHY',
          body: '날짜·프로젝트 같은 조건은 조회 범위가 명확하다. 의미 검색 결과는 질문 표현과 검색 대상 문서에 따라 달라질 수 있다.',
        },
        {
          label: 'DECISION',
          body: '질문 의도에 따른 DB 조회를 기본으로 유지했다. RAG가 켜져 있을 때만 의미 검색 결과를 뒤에 더했다.',
        },
      ],
      evolution: { label: 'VECTOR ADDED, NOT REPLACED', date: '2026.07.07' },
    },
    {
      id: 'source-hierarchy',
      index: '03',
      label: 'SOURCE + REVIEW STATE',
      title: '출처와 검토 상태 표시',
      sections: [
        {
          label: 'WHY',
          body: '질문과 비슷한 Teams 원문도 미검토 상태일 수 있다. 일정의 승인 상태는 검색 유사도와 별도로 확인해야 한다.',
        },
        {
          label: 'DECISION',
          body: '승인된 기록을 기본 답변 근거로 사용하고 출처와 검토 상태를 함께 표시했다. 개인 대화 기억은 해당 사용자의 참고 맥락으로 따로 저장했다.',
        },
      ],
      evolution: { label: 'SOURCE STATES EXPLICIT', date: '2026.07.10' },
    },
    {
      id: 'insufficient-evidence',
      index: '04',
      label: 'CONTEXT LIMITED',
      title: '자료가 부족할 때 추가 검색',
      sections: [
        {
          label: 'WHY',
          body: '상태를 찾은 뒤에도 원인이나 관련 변경을 묻는 질문에는 추가 자료가 필요했다.',
        },
        {
          label: 'DECISION',
          body: '기본 검색이 부족할 때만 Company Context로 허용된 자료를 추가 검색했다. 그래도 근거가 없으면 필요한 자료를 명시했다.',
        },
      ],
      evolution: { label: 'LIMITED CONTEXT TOOL', date: '2026.08.14' },
    },
    {
      id: 'review-boundary',
      index: '05',
      label: 'REVIEW HANDOFF',
      title: '발견한 기록을 검토함으로',
      sections: [
        {
          label: 'WHY',
          body: '대화에서 발견한 결정과 계획을 저장하려면 원문을 대조하고 분류와 프로젝트를 고르는 검토가 필요했다.',
        },
        {
          label: 'DECISION',
          body: '기능·결정·계획 후보는 AI 기록 검토함으로 보낸다. 사람이 수정·승인·반려를 결정하고, 승인한 후보만 공식 기록에 저장한다.',
        },
      ],
      evolution: { label: 'MEMORY ≠ KNOWLEDGE', date: '2026.08.20' },
    },
  ],
  workflow: {
    eyebrow: 'RETRIEVAL WORKFLOW',
    title: '질문에 맞춰 검색 범위 넓히기',
    introduction: '각 단계와 연결된 답변 영역을 함께 강조',
    steps: [
      { id: 'rag-flow-ask', hotspotId: 'context-entry', index: '01', label: 'ASK', summary: '질문과 사용자 접근 범위 확인' },
      { id: 'rag-flow-query', hotspotId: 'deterministic-first', index: '02', label: 'QUERY', summary: '조건을 지정해 정형 상태 조회' },
      { id: 'rag-flow-retrieve', hotspotId: 'source-hierarchy', index: '03', label: 'RETRIEVE', summary: '의미 검색 결과의 출처·검토 상태 표시' },
      { id: 'rag-flow-answer', hotspotId: 'insufficient-evidence', index: '04', label: 'ANSWER', summary: '근거 범위 또는 부족 상태 표시' },
      { id: 'rag-flow-review', hotspotId: 'review-boundary', index: '05', label: 'REVIEW', summary: '공식 기록 변경은 검토함으로 연결' },
    ],
    boundary: '사용자는 답변 옆의 출처를 열어 원문을 확인하고, 저장할 내용은 검토함에서 수정한 뒤 공식 기록으로 남긴다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: '조회와 검색을 나눈 이유',
    items: [
      {
        statement: '정확한 조건은 DB 조회로',
        explanation: '조건에 따른 상태 조회를 유지하고, 표현이 다른 관련 문서는 의미 검색으로 보완한다.',
      },
      {
        statement: '자료의 상태는 답변 옆에',
        explanation: 'Teams 원문과 검토한 기록의 상태를 표시해, 사용자가 답변을 읽으며 출처의 성격까지 확인하게 했다.',
      },
      {
        statement: '부족한 자료는 추가 검색으로',
        explanation: '기본 조회로 답하기 어려운 질문은 허용된 자료를 추가 검색하고, 더 필요한 자료가 있으면 답변에 적는다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '업무 질문에 맞춰 검색을 확장',
    introduction: '현재 상태를 찾는 조회로 시작해, 표현이 다른 문서와 이전 대화까지 참고할 수 있도록 확장했다.',
    scenes: [
      {
        date: '2026.06.26',
        label: 'DETERMINISTIC CONTEXT',
        visual: 'deterministic',
        decision: '플로팅 어시스턴트에 키워드 기반 DB 조회를 먼저 연결했다.',
        trigger: '사용자가 메뉴와 데이터 구조를 알아야만 현재 상태를 찾음',
        change: '질문 의도·키워드에 따라 기본 정보·상태·작업·결정 조회',
        currentEffect: '답변 상단에 확인된 정형 상태를 별도로 표시',
      },
      {
        date: '2026.07.07',
        label: 'VECTOR SUPPORT',
        visual: 'vector-support',
        decision: '기존 조회 뒤에 pgvector 결과와 출처를 더했다.',
        trigger: '표현이 다른 관련 문서를 정형 조회 조건만으로 놓침',
        change: '업무 데이터 임베딩·기존 데이터 색인과 출처가 붙은 검색 도입',
        currentEffect: '출처 목록에 정형 조회와 의미 검색의 근거를 함께 표시',
      },
      {
        date: '2026.07.10',
        label: 'SOURCE STATES',
        visual: 'trust-order',
        decision: '유사도 점수와 출처의 역할·검토 상태를 분리했다.',
        trigger: '미검토 원문이 승인 데이터와 같은 무게로 섞일 위험',
        change: '출처별 검색 우선순위·가중치와 상태 표지 적용',
        currentEffect: '공식 기록·검토본·미검토 자료를 답변에서 구분',
      },
      {
        date: '2026.08.14',
        label: 'COMPANY CONTEXT TOOL',
        visual: 'context-tool',
        decision: '추가 검색은 자동 1차 검색이 부족할 때만 열었다.',
        trigger: '동의어와 여러 관계를 잇는 질문에 기본 자료만으로는 부족',
        change: 'QA 기록과 Teams 대화, 구현 근거의 추가 검색',
        currentEffect: '근거 부족 상태에서 추가로 필요한 자료 범위를 명시',
      },
      {
        date: '2026.08.20',
        label: 'PERSONAL MEMORY',
        visual: 'memory-boundary',
        decision: '개인 대화 기억과 승인된 지식의 저장·갱신 흐름을 분리했다.',
        trigger: '긴 대화 맥락 소실과 AI 답변 자기강화 위험',
        change: '사용자 발화만 개인 범위에 저장하고, 지식 후보는 검토 후 공식 지식으로 반영',
        currentEffect: '개인 대화 기억은 해당 사용자의 답변 참고 맥락으로 사용',
      },
    ],
  },
  evidence: {
    eyebrow: '업무에서 달라진 점',
    title: '자료 찾기와 재질문을 한곳에서',
    snapshot: '사용자는 메뉴를 찾아 이동하는 대신 질문으로 업무 자료를 찾고, 답변에 붙은 출처에서 원문을 확인한다.',
    items: [],
  },
  implementationStatus: {
    state: '조회부터 기록 검토까지 연결',
    items: [
      '날짜와 프로젝트 조건 조회에 pgvector 문서 검색 결합',
      '출처별 우선순위와 검토 상태를 답변에 표시',
      'Graph 채널 수집과 Power Automate에서 선택한 채팅 수집 연결',
      '개인 대화 기억과 검토 후 저장하는 업무 지식 분리',
    ],
    runtime: '한 검색 경로가 실패해도 다른 조회 결과를 남기고, 단계별 처리 상태를 기록해 운영 중 문제를 추적하도록 했다.',
    feedback: {
      label: '사용자 인터뷰',
      text: '필요한 정보를 허브에서 찾는 데 약 3분이 걸린다고 답했다. 담당자에게 직접 묻는 빈도는 주 3회 이상에서 약 1회로 줄었다고 회고했다.',
    },
  },
  boundary: {
    eyebrow: '설계에서 배운 점',
    statement: '질문에 맞게 검색을 조합',
    items: [
      '날짜와 상태가 분명한 질문에는 조건 조회를 쓰고, 표현이 다른 문서는 의미 검색으로 찾았다. 두 결과를 같은 답변의 출처 목록에 모았다.',
      '긴 대화의 맥락은 사용자별 기억으로 남겼다. 공식 지식은 검토함에서 승인한 뒤 검색에 반영하도록 저장과 갱신 경로를 나눴다.',
    ],
  },
  relatedSystems: [
    { title: 'AI CANDIDATE REVIEW', relation: '답변에서 발견한 후보를 공식 기록으로 저장하기 전 검토하는 흐름', href: '/what/ai-candidate-review', status: 'available' },
    { title: 'DOCUMENTATION SYSTEM', relation: '자료의 역할과 다시 찾을 수 있는 맥락을 정리하는 구조', href: '/how/documentation-system', status: 'available' },
    { title: 'API USAGE', relation: '검색·도구·스트림 호출의 비용과 연결 종료 기록', href: '/what/api-usage', status: 'available' },
  ],
} as const satisfies RagAssistantPageContent
