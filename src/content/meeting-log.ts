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
    title: 'Meeting record → AI candidate → Human Review.',
    instruction:
      'source record, change guard, candidate group, human review, capture boundary를 선택해 기록이 공식 상태가 되는 경계를 확인하세요.',
    defaultAnnotation: {
      index: '00',
      label: 'REVIEW GUIDE',
      title: '회의록과 후보와 검토를 한 source context 안에서 읽는다.',
      body: '동기화된 회의 메모를 source로 두고 change guard, AI candidate group, human review를 따라갑니다. 이 화면은 자동 녹화·전사가 연결됐다는 뜻이 아닙니다.',
    },
  },
  product: meetingLogProductFixture,
  annotations: [
    {
      id: 'source-record',
      index: '01',
      label: 'MEETING RECORD',
      title: 'AI가 다시 쓰기 전에, 무엇을 읽었는지 돌아갈 수 있는 회의 기록을 남긴다.',
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
          body: '회의록 원문은 사실 입력이지만 그 자체를 승인된 기능 명세나 공식 결정으로 취급하지 않습니다.',
        },
      ],
      evolution: { label: 'SOURCE PATH', date: '2026.06.04' },
    },
    {
      id: 'change-guard',
      index: '02',
      label: 'CHANGE GUARD',
      title: '매일 읽더라도, 바뀌지 않은 회의록을 매일 다시 해석하지 않는다.',
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
          body: '변경 감지는 중복 실행을 막는 장치입니다. 추출 내용의 의미 정확성을 보증하는 점수는 아닙니다.',
        },
      ],
      evolution: { label: 'IDEMPOTENT EXTRACTION', date: '2026.08.13' },
    },
    {
      id: 'candidate-group',
      index: '03',
      label: 'AI CANDIDATE',
      title: '같은 회의에서 나온 후보는 함께 보되, 각각은 pending 상태로 분리한다.',
      sections: [
        {
          label: 'WHY',
          body: '긴 회의록에서 결정·이슈·요구사항이 여러 건 나오면 낱개 제목만으로는 어떤 맥락에서 함께 나왔는지 놓치기 쉽습니다.',
        },
        {
          label: 'DECISION',
          body: '같은 source의 후보를 묶고 짧은 제목·분류·근거 위치를 먼저 보여준 뒤 필요한 항목만 상세 검토하게 했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: 'pending 후보는 공식 기록도, 기본 RAG 답변의 우선 근거도 아닙니다.',
        },
      ],
      evolution: { label: 'MEETING SOURCE EXPANSION', date: '2026.08.13' },
    },
    {
      id: 'human-review',
      index: '04',
      label: 'HUMAN REVIEW',
      title: 'AI 초안을 바로 쓰지 않고, 근거를 보며 수정·승인·반려할 수 있게 했다.',
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
          body: '승인된 항목만 category별 공식 데이터로 이동합니다. AI의 제안 자체는 evidence가 아닙니다.',
        },
      ],
      evolution: { label: 'SHARED REVIEW GATE', date: '2026.08.14' },
    },
    {
      id: 'capture-boundary',
      index: '05',
      label: 'CAPTURE BOUNDARY',
      title: '구현된 downstream과 막힌 upstream을 한 개의 완료 상태로 포장하지 않는다.',
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
          body: '현재 동작하는 입력은 동기화된 회의 메모입니다. 자동 녹화·전사부터 반영까지의 end-to-end 운영은 완료되지 않았습니다.',
        },
      ],
      evolution: { label: 'UPSTREAM PAUSED', date: '2026.08.19' },
    },
  ],
  workflow: {
    eyebrow: 'MEETING TRUST WORKFLOW',
    title: '회의록에서 후보를 만들고, Human Review를 통과한 것만 공식 기록으로 남긴다.',
    introduction: '구현된 downstream의 세 단계가 위 source·candidate·review 영역과 연결됩니다.',
    steps: [
      { id: 'meeting-flow-record', hotspotId: 'source-record', index: '01', label: '회의록', summary: '원문과 의미 단위 근거 보존' },
      { id: 'meeting-flow-candidate', hotspotId: 'candidate-group', index: '02', label: 'AI 후보', summary: '결정·이슈·기능 요구를 pending으로 분리' },
      { id: 'meeting-flow-review', hotspotId: 'human-review', index: '03', label: 'HUMAN REVIEW', summary: '수정·승인·반려 뒤 공식 기록 반영' },
    ],
    boundary: '변경 감지는 회의록 단계 앞의 반복 실행 guard이고, 자동 녹화·전사는 아직 이 세 단계에 연결되지 않은 upstream입니다.',
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
        explanation: 'AI 후보는 검색 가능한 대기 상태로 남되 승인 전 canonical data와 기본 답변 근거에서 제외됩니다.',
      },
      {
        statement: 'A BLOCKER IS A PRODUCT STATE.',
        explanation: '외부 수집 조건이 맞지 않으면 자동화 완료로 표시하지 않고 현재 입력 경로와 남은 범위를 함께 보여줍니다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '요약 연결에서, 검토 가능한 기록 흐름과 명시적인 upstream 경계로.',
    introduction: '회의 source·candidate gate·capture status에 직접 남은 날짜별 변화만 추렸습니다.',
    scenes: [
      {
        date: '2026.06.04',
        label: 'TRANSCRIPT PATH',
        visual: 'transcript-path',
        decision: '회의 대본을 읽고 주간보고의 회의 섹션으로 연결하는 초기 경로를 만들었다.',
        trigger: '회의 결정과 후속 업무가 대화·녹화물 안에만 남음',
        change: 'transcript 읽기 코드와 LLM 요약 연결 설계',
        currentEffect: '회의 source를 downstream 기록으로 넘기는 최초 입력 경로',
      },
      {
        date: '2026.08.13',
        label: 'CANDIDATE GATE',
        visual: 'candidate-gate',
        decision: '회의록에서 후보를 만들되 같은 Human Review 대기열을 통과하게 했다.',
        trigger: '회의록을 동기화해도 공식 결정·이슈로 안전하게 승격할 경로가 없음',
        change: '결정·이슈·기능 요구 후보 추출과 미변경 회의록 재추출 방지',
        currentEffect: 'source record → pending candidate → review가 현재 downstream의 중심',
      },
      {
        date: '2026.08.19',
        label: 'CAPTURE PAUSED',
        visual: 'capture-paused',
        decision: '회사 회의를 가져오지 못하는 계정 제약을 발견하고 upstream을 완료 처리하지 않았다.',
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
        change: '매일 07:00 KST meeting sync와 upstream 남은 범위를 구분',
        currentEffect: '현재 downstream 입력과 upstream blocker를 서로 다른 상태로 보존',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / READ-ONLY SNAPSHOT 2026.08.26',
    title: '과거 downstream snapshot이지, 9월 4일 자동화 완료 근거가 아니다.',
    snapshot: '2026.08.26에 확인한 historical snapshot이며 current 수치로 합치지 않습니다.',
    items: [
      {
        value: '20',
        label: 'OFFICIAL MEETINGS',
        meaning: '읽기 전용 운영 snapshot의 meetings 데이터 규모',
        boundary: '자동 녹화·전사 경로로 생성된 수나 반복 이용자 수가 아님',
      },
      {
        value: '07:00',
        label: 'DAILY SYNC / KST',
        meaning: '동기화된 회의록을 meetings와 검색 데이터로 보내는 실행 시각',
        boundary: '실행 스케줄은 end-to-end 수집 성공을 의미하지 않음',
      },
      {
        value: '3',
        label: 'MEETING CANDIDATE TYPES',
        meaning: '회의 source에서 분리하는 결정·이슈·기능 요구 범주',
        boundary: '후보 정확도·승인율·자동화 효과 점수가 아님',
      },
    ],
  },
  implementationStatus: {
    state: 'PARTIAL / DOWNSTREAM IMPLEMENTED — TRANSCRIPT UPSTREAM BLOCKED',
    items: [
      '동기화된 회의 메모와 검색 데이터 연결',
      '후보 추출·검토·공식 기록 반영 구조',
      '회사 회의 transcript upstream blocker',
      '자동 녹화·전사·원문 확보의 end-to-end 검증 미완료',
    ],
    runtime: 'downstream review 구조는 구현되어 있다. 2026.09.04에는 회사 회의 transcript upstream이 막혀 있어 production end-to-end 자동화로 주장하지 않는다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / A REVIEW PIPELINE, NOT AN E2E CAPTURE CLAIM',
    statement: 'The downstream design exists. The capture path is blocked.',
    items: [
      '20건은 8월 26일 historical snapshot이며 9월 4일 current 자동 수집량이나 adoption이 아닙니다.',
      '자동 녹화·전사·참석자 수집·외부 API 연결의 end-to-end 운영 검증은 완료되지 않았습니다.',
      '후보 정확도·승인율·회의 정리 시간 절감·반복 열람 사용자는 측정하지 않았습니다.',
      '수집 도구·비용·관리자 권한의 최종 선택은 구현자가 단독으로 결정한 범위가 아닙니다.',
    ],
  },
  relatedSystems: [
    { title: 'AI CANDIDATE REVIEW', relation: '회의 source에서 나온 pending 후보를 공식 기록으로 승격하는 gate', href: '/what/ai-candidate-review', status: 'available' },
    { title: 'REPORT', relation: 'historical meeting source와 current report authority를 구분하는 product surface', href: '/what/report', status: 'available' },
    { title: 'RAG ASSISTANT', relation: '검토된 기록과 낮은 신뢰의 raw source를 구분해 검색하는 surface', href: '/what/rag-assistant', status: 'available' },
  ],
} as const satisfies MeetingLogPageContent
