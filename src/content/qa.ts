import type { QaPageContent } from './content-types.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'
import { qaProductFixture } from './fixtures/qa.ts'

export const qaContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED TEST REPORT / SYNTHETIC DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 05',
    titleLines: [
      'QA',
      'RECORD'
    ],
    thesis: '테스트를 다시 실행할 때 이전 실패와 수정 내용을 한 기록에서 따라갈 수 있게 했다.',
    summary: '테스트 목적과 환경, 기대 결과와 실제 결과를 한 화면에 모았습니다. 실행마다 첨부와 판정을 연결하고 재테스트 이력을 남겼습니다.',
    problemLabel: 'PROBLEM / RESULT WITHOUT HISTORY',
    problem: '문서 버전과 언어가 나뉘어 같은 테스트의 수정·재실행·첨부를 함께 추적하기 어려웠습니다. 최신 판정을 다시 확인하는 데 드는 비용도 커졌습니다.'
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / TEST DETAIL',
    title: '판정과 실행 이력을 함께 읽는다.',
    instruction: '실행 조건과 첨부, 재테스트 이력에서 설계 이유를 확인하세요.',
    defaultAnnotation: {
      index: '00',
      label: 'INSPECTION GUIDE',
      title: '한 테스트 기록 안에서 근거와 변화가 이어집니다.',
      body: '기대·실제 결과에 실행 조건과 첨부를 연결하고, 다시 테스트한 이력을 남깁니다. AI 요약과 번역은 사람이 요청한 시점에 따로 갱신됩니다.'
    }
  },
  product: qaProductFixture,
  annotations: [
    {
      id: 'test-context',
      index: '01',
      label: 'TEST CONTEXT',
      title: '같은 조건으로 다시 테스트할 수 있게 했다.',
      sections: [
        {
          label: 'WHY',
          body: 'PASS와 FAIL만으로는 어떤 목적과 환경에서 나온 결과인지 알기 어려웠습니다.'
        },
        {
          label: 'DECISION',
          body: '테스트 목적과 실행 환경을 별도 필드로 두고 기대 결과, 실제 결과와 함께 읽게 했습니다.'
        }
      ],
      evolution: {
        label: 'CONTEXT FIELDS SEPARATED',
        date: '2026.08.07'
      }
    },
    {
      id: 'human-result',
      index: '02',
      label: 'HUMAN RESULT',
      title: '실행자가 판정하고 AI는 읽기를 돕는다.',
      sections: [
        {
          label: 'WHY',
          body: '기대 결과와 실제 화면의 차이를 판단하려면 실행 조건을 본 QA의 설명이 필요했습니다.'
        },
        {
          label: 'DECISION',
          body: 'QA가 PASS, FAIL, HOLD와 수정 필요 여부를 입력합니다. AI 요약과 번역은 별도 요청으로 갱신하도록 했습니다.'
        }
      ],
      evolution: {
        label: 'QA-OWNED STATE',
        date: '2026.08.07'
      }
    },
    {
      id: 'attachments',
      index: '03',
      label: 'ATTACHMENTS',
      title: '오류가 난 장면을 실행 기록에 붙였다.',
      sections: [
        {
          label: 'WHY',
          body: '오류가 발생한 순서나 잠깐 나타난 화면은 글만으로 설명하기 어려웠습니다.'
        },
        {
          label: 'DECISION',
          body: '이미지와 영상, 파일을 해당 테스트 실행에 연결해 검토자가 관찰한 장면을 다시 볼 수 있게 했습니다.'
        }
      ],
      evolution: {
        label: 'ATTACHMENT UX REFINED',
        date: '2026.08.04'
      }
    },
    {
      id: 'revision-history',
      index: '04',
      label: 'RETEST HISTORY',
      title: '판정이 바뀐 순서를 남겼다.',
      sections: [
        {
          label: 'WHY',
          body: '재테스트 뒤 최신 결과만 남기면 이전 실패와 수정 확인의 연결이 사라졌습니다.'
        },
        {
          label: 'DECISION',
          body: '실행마다 판정과 관찰을 새 이력으로 남겨 이전 결과와 최신 결과를 같은 기록에서 비교하게 했습니다.'
        }
      ],
      evolution: {
        label: 'RETEST HISTORY SHIPPED',
        date: '2026.07.30'
      }
    },
    {
      id: 'ai-boundary',
      index: '05',
      label: 'AI REGENERATE',
      title: '필요한 시점에 AI 결과를 다시 만든다.',
      sections: [
        {
          label: 'WHY',
          body: '원문을 고칠 때 AI 평가와 번역까지 함께 바뀌면 검토한 문장과 새 문장을 구분하기 어려웠습니다.'
        },
        {
          label: 'DECISION',
          body: '사용자가 재생성을 요청할 때 AI 결과를 갱신합니다. 원문 편집과 판정, 생성 결과를 각각 관리하도록 했습니다.'
        }
      ],
      evolution: {
        label: 'EXPLICIT REGENERATE',
        date: '2026.08.19'
      }
    }
  ],
  workflow: {
    eyebrow: 'PRODUCT WORKFLOW',
    title: '실행 조건부터 재테스트까지',
    introduction: '각 단계는 위 제품 화면의 해당 기록과 연결됩니다.',
    steps: [
      {
        id: 'qa-flow-context',
        hotspotId: 'test-context',
        index: '01',
        label: 'CONTEXT',
        summary: '목적과 환경을 분리해 기록'
      },
      {
        id: 'qa-flow-execute',
        hotspotId: 'human-result',
        index: '02',
        label: 'EXECUTE',
        summary: '기대와 실제를 비교해 판정'
      },
      {
        id: 'qa-flow-attach',
        hotspotId: 'attachments',
        index: '03',
        label: 'ATTACH',
        summary: '관찰 근거를 실행에 연결'
      },
      {
        id: 'qa-flow-retest',
        hotspotId: 'revision-history',
        index: '04',
        label: 'RETEST',
        summary: '덮어쓰지 않고 이력을 추가'
      },
      {
        id: 'qa-flow-assist',
        hotspotId: 'ai-boundary',
        index: '05',
        label: 'ASSIST',
        summary: '요청할 때만 AI 결과 갱신'
      }
    ],
    boundary: '테스트를 다시 실행해도 이전 판정과 첨부가 남아, 어떤 수정 뒤 결과가 바뀌었는지 확인할 수 있습니다.'
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: '결과가 바뀐 이유를 찾도록',
    items: [
      {
        statement: '실행마다 이력 보존',
        explanation: '재실행마다 판정과 관찰을 남겨 이전 결과를 다시 읽을 수 있게 했습니다.'
      },
      {
        statement: '실행자가 판정 입력',
        explanation: 'QA가 테스트 결과와 수정 필요 여부를 결정하고, AI 요약과 번역으로 기록을 읽는 일을 돕습니다.'
      },
      {
        statement: '관찰한 실행에 첨부 연결',
        explanation: '이미지와 영상을 해당 테스트에 붙여 설명과 화면을 함께 확인하게 했습니다.'
      }
    ]
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '문서 복제에서 실행 이력 관리로',
    introduction: '문서 구조를 실행 기록으로 옮긴 뒤, 재테스트와 첨부, 역할별 조회와 AI 재생성을 더했습니다.',
    scenes: [
      {
        date: '2026.05.29',
        label: 'SOURCE SHAPE',
        visual: 'source-shape',
        decision: '기존 테스트 문서의 구조와 반복 패턴부터 분리했다.',
        trigger: '여러 문서 버전과 언어에서 같은 기록을 유지하기 어려웠음',
        change: '보고서·테스트 케이스·실행 근거의 기본 구조 정의',
        currentEffect: '상세 화면에서 실행 조건과 테스트 케이스를 구분'
      },
      {
        date: '2026.07.30',
        label: 'RETEST + ATTACHMENT',
        visual: 'history',
        decision: '결과를 교체하던 방식에 실행 이력과 첨부를 더했다.',
        trigger: '수정 전후 판정과 파일을 함께 추적할 필요',
        change: '보고서 생성·조회·수정·삭제, 재테스트 이력, 이미지·영상 첨부 구현',
        currentEffect: '한 상세 화면에서 수정 이력과 실행별 근거 확인'
      },
      {
        date: '2026.08.12',
        label: 'READ-ONLY ROLE',
        visual: 'role',
        decision: '보는 권한과 판정을 바꾸는 권한을 나눴다.',
        trigger: 'QA 기록은 공유하면서 수정 권한은 제한할 필요',
        change: 'QAViewer의 조회 전용 접근 추가',
        currentEffect: '열람 범위와 수정 행동을 역할별로 구분'
      },
      {
        date: '2026.08.19',
        label: 'EXPLICIT REGENERATE',
        visual: 'regenerate',
        decision: 'AI 결과의 자동 갱신을 명시적인 재생성 요청으로 바꿨다.',
        trigger: '원문 수정과 생성 결과의 변경 시점이 섞이는 문제',
        change: 'AI 평가·번역을 사용자 요청 시에만 재생성',
        currentEffect: '사람이 검토한 원문과 AI 결과를 각각 유지'
      },
      {
        date: '2026.08.20',
        label: 'OPERATING SOURCE',
        visual: 'database-source',
        decision: '현재 QA 기록의 기준을 제품 데이터베이스로 옮겼다.',
        trigger: '두 저장소를 지속 동기화할 때 생기는 최신성 모호함',
        change: '외부 문서의 주기적 조회 중단, 수동 복구 경로 유지',
        currentEffect: '현재 상태와 복구 경로의 역할이 분리됨'
      }
    ]
  },
  evidence: {
    eyebrow: 'WORK CHANGES',
    title: '이전 실패부터 최신 판정까지 한 기록에',
    snapshot: '문서 버전을 오가던 테스트 기록을 실행 이력으로 모았습니다.',
    items: []
  },
  implementationStatus: {
    state: '업무의 변화',
    items: [
      '테스트 보고서와 케이스 생성, 수정, 보관',
      '실행별 판정 이력과 이미지, 영상 첨부',
      '한국어와 영어 번역, 요청에 따른 AI 재생성',
      '조회와 편집, 삭제 권한 분리'
    ],
    runtime: 'QA는 이전 판정과 첨부를 보며 재테스트를 기록합니다. 조회 권한을 가진 동료도 같은 기록을 읽어 수정 전후와 현재 결과를 확인할 수 있습니다.'
  },
  boundary: {
    eyebrow: 'DESIGN TAKEAWAY',
    statement: '판정이 바뀐 과정을 남긴다.',
    items: [
      '실행 조건과 관찰, 첨부, 재테스트 결과를 연결해 판정이 바뀐 과정을 따라갈 수 있게 했습니다.'
    ]
  },
  relatedSystems: [
    {
      title: 'FEATURE VALIDATION',
      relation: '요구사항과 구현 내용을 사람이 대조하는 검토 흐름',
      href: '/what/feature-validation',
      status: 'available'
    },
    {
      title: 'DOCUMENTATION SYSTEM',
      relation: '현재 기록의 기준과 복구용 문서의 역할을 구분하는 방식',
      href: '/how/documentation-system',
      status: 'available'
    },
    {
      title: 'SECURITY & OPERATIONS',
      relation: '현재 기록의 저장 기준 전환과 수동 복구 범위',
      href: '/how/security-operations',
      status: 'available'
    }
  ],
} as const satisfies QaPageContent
