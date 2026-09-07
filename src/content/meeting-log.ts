import type { MeetingLogPageContent } from './content-types.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'
import { meetingLogProductFixture } from './fixtures/meeting-log.ts'

export const meetingLogContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED MEETING REVIEW VIEW / SYNTHETIC DATA',
    currentStatus: 'partial-transcript-upstream-blocked',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 12',
    titleLines: ['MEETING', 'LOG'],
    thesis:
      '동기화된 회의 메모는 검토 가능한 기록으로 연결했지만, transcript upstream은 아직 연결되지 않았다.',
    summary:
      '회의 메모의 동기화·후보 추출·review·공식 기록 반영은 구현했습니다. 회사 회의의 자동 녹화·전사·원문 확보는 upstream 제약으로 막혀 있어 end-to-end 자동화는 planned / blocked로 남아 있습니다.',
    problemLabel: 'PROBLEM / A MEETING IS NOT YET A DECISION RECORD',
    problem:
      '결정·이슈·요구사항이 대화와 녹화물에만 남으면 다시 찾기 어렵지만, AI가 정리했다는 이유만으로 공식 기록에 쓰면 해석 오류와 잘못된 연결도 함께 굳어집니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / SOURCE TO REVIEW',
    title: '회의록 → AI 후보 → 사람 검토',
    instruction:
      '원문·변경 감지·후보 묶음·사람 검토·수집 범위의 설계 이유',
    defaultAnnotation: {
      index: '00',
      label: 'REVIEW GUIDE',
      title: '같은 회의의 원문과 후보를 함께 검토',
      body: '동기화된 회의 메모를 source로 두고 change guard, AI candidate group, human review를 따라갑니다. 이 화면은 자동 녹화·전사가 연결됐다는 뜻이 아닙니다.',
    },
  },
  product: meetingLogProductFixture,
  annotations: [
    {
      id: 'source-record',
      index: '01',
      label: 'MEETING RECORD',
      title: '후보를 만든 회의 구간으로 돌아갈 수 있게 했다.',
      sections: [
        {
          label: 'WHY',
          body: '요약된 제목만 남으면 결정의 조건과 미확정 표현이 사라져 검토자가 원래 맥락을 다시 판단할 수 없습니다.',
        },
        {
          label: 'DECISION',
          body: '동기화된 회의 기록과 의미 단위 구간을 보존하고, 후보마다 같은 회의의 근거 위치를 연결했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '회의록은 후보를 추출하고 검토할 원문이다. 승인된 기능 명세나 공식 결정과는 구분한다.',
        },
      ],
      evolution: { label: 'SOURCE PATH', date: '2026.06.04' },
    },
    {
      id: 'change-guard',
      index: '02',
      label: 'CHANGE GUARD',
      title: '바뀐 회의록에서만 후보를 다시 추출한다.',
      sections: [
        {
          label: 'WHY',
          body: '같은 본문을 반복 추출하면 동일 후보가 쌓이고 불필요한 AI 호출과 검토 부담이 함께 늘어납니다.',
        },
        {
          label: 'DECISION',
          body: '동기화 때 내용 변경 여부를 먼저 판별하고, 변경된 회의 기록만 후보 추출과 검색 데이터 갱신 대상으로 보냈습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '변경 감지는 같은 본문의 재추출을 막는다. 추출한 후보의 내용은 별도 검토 대상이다.',
        },
      ],
      evolution: { label: 'IDEMPOTENT EXTRACTION', date: '2026.08.13' },
    },
    {
      id: 'candidate-group',
      index: '03',
      label: 'AI CANDIDATE',
      title: '같은 회의의 후보를 묶고, 각 항목의 대기 상태는 유지한다.',
      sections: [
        {
          label: 'WHY',
          body: '긴 회의록에서 결정·이슈·요구사항이 여러 건 나오면 낱개 제목만으로는 어떤 맥락에서 함께 나왔는지 놓치기 쉽습니다.',
        },
        {
          label: 'DECISION',
          body: '같은 회의의 후보를 묶어 제목·분류·근거 위치를 먼저 표시하고, 필요한 항목을 상세 검토하게 했다.',
        },
        {
          label: 'BOUNDARY',
          body: '대기 후보는 공식 기록과 기본 RAG 답변 근거에서 제외한다.',
        },
      ],
      evolution: { label: 'MEETING SOURCE EXPANSION', date: '2026.08.13' },
    },
    {
      id: 'human-review',
      index: '04',
      label: 'HUMAN REVIEW',
      title: '원문 근거 옆에서 후보를 수정·승인·반려한다.',
      sections: [
        {
          label: 'WHY',
          body: '회의 표현은 모호할 수 있고 후보 분류·프로젝트 연결·중복 판단은 업무 맥락을 가진 사람이 다시 확인해야 합니다.',
        },
        {
          label: 'DECISION',
          body: '원문 근거와 편집 가능한 필드를 함께 두고, 승인 시 필수값과 기존 공식 기록의 중복을 다시 검사했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '승인한 항목만 유형별 공식 기록으로 저장한다. AI 제안은 승인 전까지 검토 후보로 남는다.',
        },
      ],
      evolution: { label: 'SHARED REVIEW GATE', date: '2026.08.14' },
    },
    {
      id: 'capture-boundary',
      index: '05',
      label: 'CAPTURE BOUNDARY',
      title: '회의록 검토는 구현했고, 자동 수집 방식은 결정이 남았다.',
      sections: [
        {
          label: 'WHY',
          body: '회의 수집은 API 하나가 아니라 조직 계정·캘린더·녹화·전사·관리자 권한·도구 플랜이 함께 맞아야 합니다.',
        },
        {
          label: 'DECISION',
          body: '회사 회의를 가져올 수 없는 계정 제약을 확인한 뒤, 유료 플랜 유지와 수집 방식 재설계를 의사결정 항목으로 분리했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '현재 입력은 동기화된 회의 메모다. 자동 녹화·전사에서 기록 반영까지 이어지는 전체 운영 경로는 완료되지 않았다.',
        },
      ],
      evolution: { label: 'UPSTREAM PAUSED', date: '2026.08.19' },
    },
  ],
  workflow: {
    eyebrow: 'MEETING TRUST WORKFLOW',
    title: '회의록에서 후보를 만들고, 사람이 승인한 항목만 공식 기록으로 남긴다.',
    introduction: '구현된 downstream의 세 단계가 위 source·candidate·review 영역과 연결됩니다.',
    steps: [
      { id: 'meeting-flow-record', hotspotId: 'source-record', index: '01', label: '회의록', summary: '원문과 의미 단위 근거 보존' },
      { id: 'meeting-flow-candidate', hotspotId: 'candidate-group', index: '02', label: 'AI 후보', summary: '결정·이슈·기능 요구를 대기 후보로 분리' },
      { id: 'meeting-flow-review', hotspotId: 'human-review', index: '03', label: 'HUMAN REVIEW', summary: '수정·승인·반려 결정, 승인 항목만 반영' },
    ],
    boundary: '회의록 변경 감지는 같은 본문의 재추출을 막는다. 자동 녹화·전사는 아직 이 검토 흐름에 연결되지 않았다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: 'Keep the source. Queue the interpretation. Confirm the record.',
    items: [
      {
        statement: 'A MEETING IS INPUT, NOT AUTHORITY.',
        explanation: '회의 원문은 돌아갈 근거로 보존하지만 공식 결정과 기능 요구는 검토 뒤에만 만들어집니다.',
      },
      {
        statement: 'PENDING MEANS NOT OFFICIAL.',
        explanation: 'AI 후보는 검토 대기열에서 찾을 수 있지만, 승인 전에는 공식 기록과 기본 답변 근거에서 제외한다.',
      },
      {
        statement: 'A BLOCKER IS A PRODUCT STATE.',
        explanation: '외부 수집 조건이 맞지 않으면 자동화 완료로 표시하지 않고 현재 입력 경로와 남은 범위를 함께 보여줍니다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '회의록 요약에서 후보 검토로, 자동 수집은 별도 과제로',
    introduction: '초기 요약 경로, 후보 검토 도입, 수집 제약 확인, 일일 동기화 유지.',
    scenes: [
      {
        date: '2026.06.04',
        label: 'TRANSCRIPT PATH',
        visual: 'transcript-path',
        decision: '회의 대본을 읽고 주간보고의 회의 섹션으로 연결하는 초기 경로를 만들었다.',
        trigger: '회의 결정과 후속 업무가 대화·녹화물 안에만 남음',
        change: '회의 대본 읽기 코드와 LLM 요약 연결 설계',
        currentEffect: '회의 대본을 요약과 보고에 연결하는 초기 입력 경로',
      },
      {
        date: '2026.08.13',
        label: 'CANDIDATE GATE',
        visual: 'candidate-gate',
        decision: '회의록에서 추출한 후보를 공통 사람 검토 대기열로 연결했다.',
        trigger: '회의록을 동기화해도 공식 결정·이슈로 안전하게 승격할 경로가 없음',
        change: '결정·이슈·기능 요구 후보 추출과 미변경 회의록 재추출 방지',
        currentEffect: 'source record → pending candidate → review가 현재 downstream의 중심',
      },
      {
        date: '2026.08.19',
        label: 'CAPTURE PAUSED',
        visual: 'capture-paused',
        decision: '회사 회의를 가져올 수 없는 계정 제약을 확인하고 자동 수집을 미완료로 남겼다.',
        trigger: '선택한 도구의 개인용 플랜이 회사 Microsoft 365 회의를 수집하지 못함',
        change: '유료 플랜 유지안과 다른 수집·전사 방식 재설계안을 분리해 제시',
        currentEffect: 'current evidence에서는 transcript automation을 PLANNED / BLOCKED로 분류',
      },
      {
        date: '2026.08.20',
        label: 'CURRENT SYNC',
        visual: 'current-sync',
        decision: '자동 수집 결정을 기다리는 동안, 구현된 일일 회의록 동기화는 별도 경로로 유지했다.',
        trigger: '부분 구현과 전체 자동화 계획을 같은 상태로 말할 위험',
        change: '매일 07:00 KST 회의록 동기화와 미완료 자동 수집 범위 구분',
        currentEffect: '현재 downstream 입력과 upstream blocker를 서로 다른 상태로 보존',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / READ-ONLY SNAPSHOT 2026.08.26',
    title: '과거 downstream snapshot이지, 9월 4일 자동화 완료 근거가 아니다.',
    snapshot: '2026.08.26에 확인한 historical snapshot이며 current 수치로 합치지 않습니다.',
    items: [],
  },
  implementationStatus: {
    state: 'PARTIAL / DOWNSTREAM IMPLEMENTED — TRANSCRIPT UPSTREAM BLOCKED',
    items: [
      '동기화된 회의 메모와 검색 데이터 연결',
      '후보 추출·검토·공식 기록 반영 구조',
      '회사 회의 transcript upstream blocker',
      '자동 녹화·전사·원문 확보의 end-to-end 검증 미완료',
    ],
    runtime: "downstream review 구조는 구현되어 있다. 2026.09.04 현재 회사 회의 transcript upstream은 blocked 상태다.",
  },
  boundary: {
    eyebrow: "BOUNDARY / CAPTURE & REVIEW",
    statement: 'The downstream design exists. The capture path is blocked.',
    items: [
      '자동 녹화·전사·참석자 수집·외부 API 연결을 잇는 전체 운영 검증은 완료되지 않았다.',
      '수집 도구·비용·관리자 권한의 최종 선택은 구현자가 단독으로 결정한 범위가 아닙니다.',
    ],
  },
  relatedSystems: [
    { title: 'AI CANDIDATE REVIEW', relation: '회의록의 대기 후보를 검토해 공식 기록으로 저장하는 흐름', href: '/what/ai-candidate-review', status: 'available' },
    { title: 'REPORT', relation: 'historical meeting source와 current report authority를 구분하는 product surface', href: '/what/report', status: 'available' },
    { title: 'RAG ASSISTANT', relation: '검토된 기록과 미검토 원문을 구분해 검색하는 방식', href: '/what/rag-assistant', status: 'available' },
  ],
} as const satisfies MeetingLogPageContent
