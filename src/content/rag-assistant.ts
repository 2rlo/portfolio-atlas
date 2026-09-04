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
      '가까운 문서를 곧바로 사실로 쓰지 않고, 정확한 조회 뒤에 의미 검색을 더해 답변의 근거와 신뢰 상태를 함께 보여줬다.',
    summary:
      '정형 context, vector retrieval, 제한된 추가 검색을 순서대로 연결하고 미검토 원문·개인 memory·공식 기록의 authority를 구분했습니다.',
    problemLabel: 'PROBLEM / RELEVANCE IS NOT AUTHORITY',
    problem:
      '프로젝트·일정·QA·회의가 여러 화면에 흩어졌지만, vector 유사도만으로는 미검토 원문과 승인된 기록이 같은 무게로 섞일 수 있었습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / ANSWER + SOURCE RECEIPT',
    title: 'The answer is short. Its trust boundary stays visible.',
    instruction:
      'context scope, deterministic state, source hierarchy, insufficient evidence, review handoff를 선택해 답변이 어떻게 근거를 제한하는지 확인하세요.',
    defaultAnnotation: {
      index: '00',
      label: 'ASSISTANT GUIDE',
      title: '답을 먼저 믿게 하지 않고, 어떤 종류의 source가 연결됐는지 남긴다.',
      body: '질문의 context를 먼저 좁히고, 결정적 조회와 source hierarchy, insufficient evidence, review handoff 순서로 답변의 신뢰 범위를 읽습니다.',
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
          body: '같은 질문도 일정·보고·QA·회의 중 어떤 source를 봐야 하는지에 따라 답변 가능한 context가 달라집니다.',
        },
        {
          label: 'DECISION',
          body: '질문의 intent와 키워드로 기본 context 범위를 정하고, 사용자 권한 밖 source는 조회 단계부터 제외했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '화면에서 scope를 보이는 것만으로 권한이 생기지 않습니다. session·tool·source 조회도 서버 범위를 따릅니다.',
        },
      ],
      evolution: { label: 'CONTEXT ENTRY MVP', date: '2026.06.26' },
    },
    {
      id: 'deterministic-first',
      index: '02',
      label: 'DETERMINISTIC FIRST',
      title: '날짜·프로젝트·상태처럼 정확히 조회할 수 있는 값은 vector 검색에 맡기지 않았다.',
      sections: [
        {
          label: 'WHY',
          body: '정형 조건은 동일 질문에 같은 범위를 재현하기 쉽지만, vector 유사도는 표현과 corpus에 따라 결과가 달라질 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: 'intent 기반 DB 조회를 기본으로 유지하고 RAG가 켜진 경우에만 그 뒤에 의미 검색 결과를 보조로 더했습니다.',
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
      label: 'SOURCE HIERARCHY',
      title: '검색 점수와 사실로 확정된 정도를 같은 숫자로 압축하지 않았다.',
      sections: [
        {
          label: 'WHY',
          body: '질문과 가까운 Teams 원문도 미검토 상태일 수 있고, 승인된 일정은 표현이 멀어도 더 높은 authority를 가집니다.',
        },
        {
          label: 'DECISION',
          body: '공식 데이터 → 검토된 요약 → 개발 근거 → 미검토 후보·원문 순으로 우선순위와 label을 유지했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '출처가 표시된 답변도 source의 내용 범위까지만 근거가 됩니다. source 수가 정확도를 뜻하지 않습니다.',
        },
      ],
      evolution: { label: 'TRUST ORDER EXPLICIT', date: '2026.07.10' },
    },
    {
      id: 'insufficient-evidence',
      index: '04',
      label: 'CONTEXT LIMITED',
      title: '관련 문서가 없거나 관계 근거가 부족하면, 그 부족함 자체를 답변 상태로 남겼다.',
      sections: [
        {
          label: 'WHY',
          body: '상태 값 하나를 찾았다는 이유로 영향도와 우선순위를 추론하면 검색 결과가 의사결정처럼 보일 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: '자동 1차 검색이 부족할 때만 Company Context로 제한된 source를 재검색하고, 그래도 없으면 필요한 근거를 명시했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: 'Requirement·QA·Release 관계를 조립하는 Current State 모델과 검색 품질 자동 평가는 후속 범위입니다.',
        },
      ],
      evolution: { label: 'LIMITED CONTEXT TOOL', date: '2026.08.14' },
    },
    {
      id: 'review-boundary',
      index: '05',
      label: 'REVIEW HANDOFF',
      title: '답변에서 발견한 변경점은 공식 기록으로 바로 쓰지 않는다.',
      sections: [
        {
          label: 'WHY',
          body: '대화가 자연스러울수록 AI 제안이 이미 확정된 사실처럼 보이기 쉽습니다.',
        },
        {
          label: 'DECISION',
          body: '기능·결정·계획 후보는 별도 AI 기록 검토함으로 보내 사람이 수정·승인·반려한 뒤에만 canonical data로 이동합니다.',
        },
        {
          label: 'BOUNDARY',
          body: 'Conversation Memory도 개인 저신뢰 context이며, assistant 답변 자체는 v1 색인 대상과 공식 knowledge에서 제외했습니다.',
        },
      ],
      evolution: { label: 'MEMORY ≠ KNOWLEDGE', date: '2026.08.20' },
    },
  ],
  workflow: {
    eyebrow: 'RETRIEVAL WORKFLOW',
    title: '정확히 찾을 수 있는 것은 먼저 찾고, 의미 검색은 빈틈을 보조한다.',
    introduction: 'workflow step에 focus하면 assistant surface의 관련 state가 함께 강조됩니다.',
    steps: [
      { id: 'rag-flow-ask', hotspotId: 'context-entry', index: '01', label: 'ASK', summary: '질문과 사용자 scope 확인' },
      { id: 'rag-flow-query', hotspotId: 'deterministic-first', index: '02', label: 'QUERY', summary: '정형 상태를 결정적으로 조회' },
      { id: 'rag-flow-retrieve', hotspotId: 'source-hierarchy', index: '03', label: 'RETRIEVE', summary: 'vector 결과에 source authority 유지' },
      { id: 'rag-flow-answer', hotspotId: 'insufficient-evidence', index: '04', label: 'ANSWER', summary: '근거 범위 또는 부족 상태 표시' },
      { id: 'rag-flow-review', hotspotId: 'review-boundary', index: '05', label: 'REVIEW', summary: '공식 write는 검토함으로 분리' },
    ],
    boundary: '검색과 답변은 사실을 찾는 보조 경로입니다. 영향도·우선순위·공식 상태를 AI가 단독 확정하는 workflow가 아닙니다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: 'Deterministic first. Relevance second. Authority always visible.',
    items: [
      {
        statement: 'RAG AUGMENTS. IT DOES NOT REPLACE.',
        explanation: '정확한 filter와 상태 조회를 유지한 채 표현 차이가 큰 문서만 vector 검색으로 보완합니다.',
      },
      {
        statement: 'RAW IS NOT CANONICAL.',
        explanation: 'Teams 원문과 개인 memory는 낮은 신뢰 label을 유지하고 답변 안에서 공식 기록과 구분합니다.',
      },
      {
        statement: 'NO SOURCE, NO CERTAINTY.',
        explanation: '추가 검색 뒤에도 관계 근거가 없으면 확정형 문장 대신 필요한 source를 알려줍니다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '질문에 답하는 panel에서, source authority를 다루는 업무 surface로.',
    introduction: '현재 assistant의 retrieval·source receipt·review handoff에 직접 남은 변화입니다.',
    scenes: [
      {
        date: '2026.06.26',
        label: 'DETERMINISTIC CONTEXT',
        visual: 'deterministic',
        decision: '플로팅 assistant 뒤에 keyword 기반 DB context를 먼저 연결했다.',
        trigger: '사용자가 메뉴와 데이터 구조를 알아야만 현재 상태를 찾음',
        change: 'intent·keyword별 core/status/task/decision 조회',
        currentEffect: '답변 상단에 확인된 정형 상태를 별도로 표시',
      },
      {
        date: '2026.07.07',
        label: 'VECTOR SUPPORT',
        visual: 'vector-support',
        decision: '기존 조회 뒤에 pgvector 결과와 출처를 더했다.',
        trigger: '다른 표현으로 기록된 관련 문서를 정형 filter만으로 놓침',
        change: '업무 데이터 embedding·backfill과 cited retrieval',
        currentEffect: 'source receipt에서 정형·의미 검색 근거를 함께 확인',
      },
      {
        date: '2026.07.10',
        label: 'TRUST ORDER',
        visual: 'trust-order',
        decision: '유사도와 source authority를 분리했다.',
        trigger: '미검토 원문이 승인 데이터와 같은 무게로 섞일 위험',
        change: 'source별 priority·multiplier·상태 label',
        currentEffect: 'canonical·reviewed·unreviewed가 답변에서 구분됨',
      },
      {
        date: '2026.08.14',
        label: 'COMPANY CONTEXT TOOL',
        visual: 'context-tool',
        decision: '추가 검색은 자동 1차 검색이 부족할 때만 열었다.',
        trigger: '동의어·multi-hop 질문에 기본 context가 부족함',
        change: 'QA·Teams·구현 근거의 제한적 재검색',
        currentEffect: 'context limited 상태에서 필요한 source 범위를 안내',
      },
      {
        date: '2026.08.20',
        label: 'MEMORY BOUNDARY',
        visual: 'memory-boundary',
        decision: '개인 memory와 승인된 knowledge를 다른 lifecycle로 분리했다.',
        trigger: '긴 대화 맥락 소실과 AI 답변 자기강화 위험',
        change: 'human-only owner-scoped memory, reviewed knowledge promotion',
        currentEffect: '답변은 memory를 낮은 신뢰 context로만 사용',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / 2026.09.04 SNAPSHOT',
    title: '구현·운영 확인은 있지만 검색 정확도 수치는 없다.',
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
      'intent 기반 deterministic context와 pgvector 보조 검색',
      'source 신뢰도 우선순위·출처 표시·검색 실패 격리',
      'Graph 채널과 Power Automate 선택 채팅의 분리된 수집 경로',
      'owner-scoped Conversation Memory와 reviewed Knowledge 승격',
    ],
    runtime: 'deterministic lookup과 provenance-aware RAG 경로는 운영 구성에 있다. 채널은 Graph, 선택 채팅은 Power Automate로 수집하며 검색 정확도·응답시간·반복 사용·조직 정착은 측정하지 않았다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / RETRIEVAL, NOT TRUTH ENGINE',
    statement: 'A relevant source can support an answer. It cannot certify the world.',
    items: [
      'AI 답변과 미검토 원문을 승인된 공식 기록처럼 취급하지 않습니다.',
      'source·thread·chunk 수와 vector score를 답변 정확도나 adoption으로 해석하지 않습니다.',
      'oneOnOne 0건은 Power Automate 대상 선택 결과이며 application privacy restriction이 아닙니다.',
      '질문·답변·검색어 원문은 관측 로그에 저장하지 않고 단계 metadata만 기록했습니다.',
      '관계 기반 Current State, 자동 검색 평가셋, chat spike breaker는 후속 범위입니다.',
    ],
  },
  relatedSystems: [
    { title: 'AI CANDIDATE REVIEW', relation: '답변에서 발견한 후보를 공식 기록 전 검토하는 gate', href: '/what/ai-candidate-review', status: 'available' },
    { title: 'DOCUMENTATION SYSTEM', relation: 'source authority와 다시 찾을 수 있는 context의 구조', href: '/how/documentation-system', status: 'available' },
    { title: 'API USAGE', relation: '검색·tool·stream 호출의 비용과 disconnect 기록', href: '/what/api-usage', status: 'available' },
  ],
} as const satisfies RagAssistantPageContent
