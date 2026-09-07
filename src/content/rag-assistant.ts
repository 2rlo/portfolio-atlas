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
      '날짜·프로젝트·상태는 조건으로 조회하고, 관련 문서는 의미 검색으로 보완했다. 답변에는 출처와 검토 상태를 함께 남겼다.',
    summary:
      '기본 조회와 의미 검색 뒤에도 근거가 부족하면 제한된 추가 검색을 수행한다. 개인 대화 기억과 공식 기록은 구분해 사용한다.',
    problemLabel: 'PROBLEM / RELEVANCE IS NOT AUTHORITY',
    problem:
      '프로젝트·일정·QA·회의가 여러 화면에 흩어져 있었다. 의미 유사도만으로 검색하면 미검토 원문과 승인된 기록을 구별하기 어려웠다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / ANSWER + SOURCE RECEIPT',
    title: '답변 옆에 남긴 출처와 확인할 조건',
    instruction:
      '조회 범위·출처·근거 부족·검토 연결의 설계 이유',
    defaultAnnotation: {
      index: '00',
      label: 'ASSISTANT GUIDE',
      title: '어떤 자료와 상태를 근거로 답했는가',
      body: '질문에 필요한 업무 범위를 좁히고 정형 상태와 관련 문서를 조회한다. 답변에는 출처를 남기고, 근거가 부족한 판단은 필요한 자료와 함께 표시한다.',
    },
  },
  product: ragAssistantProductFixture,
  annotations: [
    {
      id: 'context-entry',
      index: '01',
      label: 'CONTEXT ENTRY',
      title: '사용자가 데이터 구조를 몰라도, 질문에서 필요한 업무 범위를 먼저 좁힌다.',
      sections: [
        {
          label: 'WHY',
          body: '일정·보고·QA·회의 중 어떤 자료를 조회하느냐에 따라 답할 수 있는 범위가 달라진다.',
        },
        {
          label: 'DECISION',
          body: '질문의 의도와 키워드로 조회 범위를 정하고, 사용자 권한 밖의 자료는 조회 단계에서 제외했다.',
        },
        {
          label: 'BOUNDARY',
          body: '세션·도구·자료 조회의 접근 범위는 서버에서 제한한다. 화면의 범위 표시는 권한을 부여하지 않는다.',
        },
      ],
      evolution: { label: 'CONTEXT ENTRY MVP', date: '2026.06.26' },
    },
    {
      id: 'deterministic-first',
      index: '02',
      label: 'DETERMINISTIC FIRST',
      title: '날짜·프로젝트·상태는 조건을 지정해 먼저 조회했다.',
      sections: [
        {
          label: 'WHY',
          body: '날짜·프로젝트 같은 조건은 조회 범위가 명확하다. 의미 검색 결과는 질문 표현과 검색 대상 문서에 따라 달라질 수 있다.',
        },
        {
          label: 'DECISION',
          body: '질문 의도에 따른 DB 조회를 기본으로 유지했다. RAG가 켜져 있을 때만 의미 검색 결과를 뒤에 더했다.',
        },
        {
          label: 'BOUNDARY',
          body: '정형 상태가 확인돼도 원인·영향·우선순위까지 자동으로 확정되는 것은 아닙니다.',
        },
      ],
      evolution: { label: 'VECTOR ADDED, NOT REPLACED', date: '2026.07.07' },
    },
    {
      id: 'source-hierarchy',
      index: '03',
      label: 'SOURCE + REVIEW STATE',
      title: '검색 유사도와 자료의 검토 상태를 따로 표시했다.',
      sections: [
        {
          label: 'WHY',
          body: '질문과 비슷한 Teams 원문도 미검토 상태일 수 있다. 일정의 승인 상태는 검색 유사도와 별도로 확인해야 한다.',
        },
        {
          label: 'DECISION',
          body: '공식 데이터 → 검토된 요약 → 개발 근거 → 미검토 후보·원문 순으로 우선순위와 label을 유지했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '답변은 연결된 자료가 설명하는 범위 안에서만 근거를 가진다. 출처 수가 많다고 정확한 답변인 것은 아니다.',
        },
      ],
      evolution: { label: 'SOURCE STATES EXPLICIT', date: '2026.07.10' },
    },
    {
      id: 'insufficient-evidence',
      index: '04',
      label: 'CONTEXT LIMITED',
      title: '관계 근거가 부족하면, 확정할 수 없는 판단을 명시했다.',
      sections: [
        {
          label: 'WHY',
          body: '상태 값 하나를 찾았다는 이유로 영향도와 우선순위를 추론하면 검색 결과가 의사결정처럼 보일 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: '기본 검색이 부족할 때만 Company Context로 허용된 자료를 추가 검색했다. 그래도 근거가 없으면 필요한 자료를 명시했다.',
        },
        {
          label: 'BOUNDARY',
          body: '요구사항·QA·릴리스의 관계를 연결하는 Current State 모델과 검색 품질 자동 평가는 후속 범위다.',
        },
      ],
      evolution: { label: 'LIMITED CONTEXT TOOL', date: '2026.08.14' },
    },
    {
      id: 'review-boundary',
      index: '05',
      label: 'REVIEW HANDOFF',
      title: '변경 제안은 별도 검토함에서 사람이 결정한다.',
      sections: [
        {
          label: 'WHY',
          body: '대화가 자연스러울수록 AI 제안이 이미 확정된 사실처럼 보이기 쉽습니다.',
        },
        {
          label: 'DECISION',
          body: '기능·결정·계획 후보는 AI 기록 검토함으로 보낸다. 사람이 수정·승인·반려를 결정하고, 승인한 후보만 공식 기록에 저장한다.',
        },
        {
          label: 'BOUNDARY',
          body: 'Conversation Memory는 개인 대화의 참고 맥락으로만 사용한다. AI 답변은 v1 색인과 공식 지식에서 제외했다.',
        },
      ],
      evolution: { label: 'MEMORY ≠ KNOWLEDGE', date: '2026.08.20' },
    },
  ],
  workflow: {
    eyebrow: 'RETRIEVAL WORKFLOW',
    title: '정형 상태 조회 → 의미 검색 보완 → 필요한 경우 추가 검색',
    introduction: '각 단계와 연결된 답변 영역을 함께 강조',
    steps: [
      { id: 'rag-flow-ask', hotspotId: 'context-entry', index: '01', label: 'ASK', summary: '질문과 사용자 접근 범위 확인' },
      { id: 'rag-flow-query', hotspotId: 'deterministic-first', index: '02', label: 'QUERY', summary: '조건을 지정해 정형 상태 조회' },
      { id: 'rag-flow-retrieve', hotspotId: 'source-hierarchy', index: '03', label: 'RETRIEVE', summary: '의미 검색 결과의 출처·검토 상태 표시' },
      { id: 'rag-flow-answer', hotspotId: 'insufficient-evidence', index: '04', label: 'ANSWER', summary: '근거 범위 또는 부족 상태 표시' },
      { id: 'rag-flow-review', hotspotId: 'review-boundary', index: '05', label: 'REVIEW', summary: '공식 기록 변경은 검토함으로 연결' },
    ],
    boundary: 'AI는 연결된 자료로 답변을 구성한다. 영향도·우선순위·공식 상태의 확정은 별도 판단으로 남긴다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: 'Deterministic first. Relevance second. Authority always visible.',
    items: [
      {
        statement: 'RAG AUGMENTS. IT DOES NOT REPLACE.',
        explanation: '조건에 따른 상태 조회를 유지하고, 표현이 다른 관련 문서는 의미 검색으로 보완한다.',
      },
      {
        statement: 'RAW IS NOT CANONICAL.',
        explanation: 'Teams 원문과 개인 대화 기억은 참고 자료로 표시하고 공식 기록과 구분한다.',
      },
      {
        statement: 'NO SOURCE, NO CERTAINTY.',
        explanation: '추가 검색 뒤에도 관계 근거가 없으면, 판단에 필요한 자료를 명시한다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '상태 조회에 문서 검색과 출처 표시를 더한 과정',
    introduction: '정형 조회, pgvector 보완, 출처 상태 표시, 추가 검색, 개인 대화 기억의 분리.',
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
        change: 'QA·Teams·구현 근거의 제한적 재검색',
        currentEffect: '근거 부족 상태에서 추가로 필요한 자료 범위를 명시',
      },
      {
        date: '2026.08.20',
        label: 'MEMORY BOUNDARY',
        visual: 'memory-boundary',
        decision: '개인 대화 기억과 승인된 지식의 저장·갱신 흐름을 분리했다.',
        trigger: '긴 대화 맥락 소실과 AI 답변 자기강화 위험',
        change: '사용자 발화만 개인 범위에 저장하고, 지식 후보는 검토 후 공식 지식으로 반영',
        currentEffect: '개인 대화 기억은 해당 사용자의 답변 참고 맥락으로 사용',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / 2026.09.04 SNAPSHOT',
    title: '대화·출력의 제한과 운영에서 확인한 경로',
    snapshot: '채널과 채팅의 서로 다른 수집 경로에서 저장된 context 범위입니다.',
    items: [
      { value: '5 / 1,962', label: 'GRAPH CHANNELS / RAW', meaning: 'Microsoft Graph polling으로 저장된 채널과 원문', boundary: '모든 Teams 대화나 검색 정확도를 뜻하지 않음' },
      { value: '493 / 565', label: 'THREADS / CHUNKS', meaning: '채널 원문에서 정규화·색인한 context', boundary: '답변 품질이나 retrieval 성공률이 아님' },
      { value: '2 / 1,834', label: 'PA GROUP CHATS / MESSAGES', meaning: 'Power Automate가 선택한 그룹 채팅 수집 범위', boundary: '접근 가능한 전체 채팅이나 Graph chat polling이 아님' },
      { value: '0', label: 'ONE-ON-ONE / SELECTED SCOPE', meaning: '해당 snapshot의 Power Automate 대상 선택 결과', boundary: '앱 코드가 1:1 chat을 차단했다는 뜻이 아님' },
    ],
  },
  implementationStatus: {
    state: 'DEPLOYED / ACTIVE / LIMITED OBSERVATION',
    items: [
      '질문 의도에 따른 정형 조회와 pgvector 보조 검색',
      '출처별 검색 우선순위·출처 표시·검색 실패 격리',
      'Graph 채널과 Power Automate 선택 채팅의 분리된 수집 경로',
      '사용자별 Conversation Memory와 검토 후 지식 반영',
    ],
    runtime: 'deterministic lookup과 provenance-aware RAG 경로는 운영 구성에 있다. 채널은 Graph, 선택 채팅은 Power Automate로 수집하며 검색 정확도·응답시간·반복 사용·조직 정착은 측정하지 않았다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / RETRIEVAL, NOT TRUTH ENGINE',
    statement: '연결된 자료가 설명하는 범위 안에서 답한다.',
    items: [
      'AI 답변과 미검토 원문을 승인된 공식 기록처럼 취급하지 않습니다.',
      'source·thread·chunk 수와 vector score를 답변 정확도나 adoption으로 해석하지 않습니다.',
      'oneOnOne 0건은 Power Automate 대상 선택 결과이며 application privacy restriction이 아닙니다.',
      '관측 로그에는 질문·답변·검색어 원문 없이 단계별 상태 정보만 기록했다.',
      '관계 기반 Current State, 자동 검색 평가셋, 채팅 요청 급증 차단은 후속 범위다.',
    ],
  },
  relatedSystems: [
    { title: 'AI CANDIDATE REVIEW', relation: '답변에서 발견한 후보를 공식 기록으로 저장하기 전 검토하는 흐름', href: '/what/ai-candidate-review', status: 'available' },
    { title: 'DOCUMENTATION SYSTEM', relation: '자료의 역할과 다시 찾을 수 있는 맥락을 정리하는 구조', href: '/how/documentation-system', status: 'available' },
    { title: 'API USAGE', relation: '검색·도구·스트림 호출의 비용과 연결 종료 기록', href: '/what/api-usage', status: 'available' },
  ],
} as const satisfies RagAssistantPageContent
