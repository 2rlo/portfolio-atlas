import type { TechnicalWritingContent } from './content-types.ts'

export const technicalWritingContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure:
      '문서의 작성 판단과 구조를 바탕으로 공개용 예시를 독립적으로 재구성했습니다.',
    boundary: {
      dataOrigin: 'independently-authored-synthetic',
      privateSourceRuntimeDependency: false,
      containsRealIdentifiers: false,
      oneToOneInternalMapping: false,
    },
  },
  hero: {
    eyebrow: 'HOW I BUILD / 03',
    titleLines: ['TECHNICAL', 'WRITING'],
    thesis: [
      '독자와 목적에 맞춰,',
      '같은 시스템의 설명을 달리 썼다.',
    ],
    coordinates: [
      { label: 'AUDIENCE', value: '누가 읽는가' },
      { label: 'PURPOSE', value: '무엇을 판단하는가' },
      { label: 'ACTION', value: '다음에 무엇을 하는가' },
      { label: 'BOUNDARY', value: '어떤 판단의 근거가 되는가' },
    ],
  },
  reader: {
    eyebrow: '01 / WRITING FOR THE READER',
    title: '같은 화면, 다른 다음 행동.',
    question: '',
    commonContext: 'QUALITY RECORD / HISTORICAL ROLE SNAPSHOT (2026.08)',
    decision:
      '작성자에게는 수정·재생성을, 열람자에게는 확인·변경 요청을 중심으로 설명했다.',
    guides: [
      {
        id: 'writer',
        index: 'A',
        label: 'WRITER GUIDE',
        role: '작성 권한',
        purpose: '기록을 바꾸고 결과를 확정하는 사람',
        permission: 'READ · EDIT · REGENERATE',
        steps: [
          {
            index: '01',
            action: '대상 기록을 연다.',
            detail: '현재 결과와 첨부 근거부터 확인.',
          },
          {
            index: '02',
            action: '사실에 맞게 보완한다.',
            detail: '결과·상세·첨부를 바꾸고 저장.',
          },
          {
            index: '03',
            action: '보조 결과를 다시 생성한다.',
            detail: '기존 기록을 수정한 뒤 별도로 실행.',
            annotation: {
              marker: '1',
              label: 'MARGIN NOTE 01',
              title: '자동으로 일어나지 않는 일을 행동 옆에 썼다.',
              body: '기록을 수정해도 보조 결과는 자동으로 갱신되지 않았다. ‘수정’ 다음에 ‘다시 생성’을 별도 단계로 두어 실행 시점을 분명히 했다.',
            },
          },
          {
            index: '04',
            action: '원본과 비교해 확정한다.',
            detail: '생성 결과를 근거와 대조한 뒤 문구를 다듬는다.',
          },
        ],
        handoff:
          '저장 뒤에는 보조 결과를 다시 생성하고 원본과 대조한다.',
      },
      {
        id: 'viewer',
        index: 'B',
        label: 'VIEWER GUIDE',
        role: '열람 권한',
        purpose: '결과를 확인하고 변경을 요청하는 사람',
        permission: 'READ · CHECK · REQUEST',
        steps: [
          {
            index: '01',
            action: '결과와 근거를 읽는다.',
            detail: '상세 설명·첨부·생성된 보조 내용 확인.',
          },
          {
            index: '02',
            action: '관련 일정과 시점을 대조한다.',
            detail: '읽을 수 있는 일정과 시점을 대조.',
          },
          {
            index: '03',
            action: '변경 권한을 확인한다.',
            detail: '숨겨진 버튼은 오류가 아니라 정상 권한 범위.',
            annotation: {
              marker: '2',
              label: 'MARGIN NOTE 02',
              title: '보이지 않는 버튼의 이유도 적었다.',
              body: '열람자에게는 편집 버튼이 표시되지 않는다. 오류로 오해하지 않도록 권한에 따른 정상 상태와 변경 요청 방법을 함께 설명했다.',
            },
          },
          {
            index: '04',
            action: '근거와 함께 변경을 요청한다.',
            detail: '대상·근거·발견 시각을 담당자에게 전달.',
          },
        ],
        handoff:
          '열람자는 직접 수정하는 대신 대상과 근거를 갖춰 변경을 요청한다.',
      },
    ],
    actionStructure: ['GOAL', 'STEPS', 'CONTROL', 'EXCEPTION'],
    evolution: {
      before: {
        label: 'BEFORE / ROLE SNAPSHOT',
        title: '역할별 안내',
        description:
          '작성자와 열람자의 가능한 행동을 각각 고정된 안내로 분리했다.',
      },
      pressure: {
        label: 'PRODUCT MODEL CHANGE',
        title: '권한을 조합하는 제품',
        items: ['ROLE TEMPLATE', 'INDIVIDUAL GRANT', 'INDIVIDUAL REVOKE'],
      },
      after: {
        label: 'AFTER / EFFECTIVE ACCESS',
        title: '통합 안내 + 실제 권한 차이',
        description:
          '공통 흐름을 한 문서에 두고, 템플릿 범위와 개인별 차이를 함께 설명했다.',
      },
      takeaway:
        '고정된 역할명보다 실제 가능한 행동을 기준으로 안내를 통합했다.',
    },
  },
  implementation: {
    eyebrow: '02 / WRITING FOR IMPLEMENTATION',
    title: '호출법 뒤에, 결과의 의미까지.',
    summary:
      '전체 API 경로를 먼저 정리하고, 복잡한 호출은 인증·요청·응답·예외를 이어 읽을 수 있게 풀었다.',
    artifact: {
      label: '내부 유지보수자를 위한 API 문서',
      title: 'EVENT INTAKE',
      method: 'POST',
      path: '/events/intake',
      purpose: '외부 업무 이벤트를 받아 지원되는 기록 흐름으로 분류',
      authorization: '일반 사용자 세션과 분리된 요청 검증 필요',
      request: [
        {
          field: 'event_kind',
          type: 'string',
          required: 'required',
          description: '처리 흐름을 고르는 이벤트 유형',
        },
        {
          field: 'external_key',
          type: 'string',
          required: 'optional',
          description: '중복 수신을 판별하는 외부 키',
        },
        {
          field: 'occurred_at',
          type: 'ISO 8601',
          required: 'required',
          description: '원본 이벤트가 발생한 시각',
        },
        {
          field: 'content',
          type: 'string',
          required: 'required',
          description: '정규화 전 원문 내용',
        },
      ],
      outcomes: [
        {
          status: 'ACCEPTED',
          changed: 'changed: true',
          meaning: '지원되는 이벤트가 후속 저장 흐름에 반영됨',
        },
        {
          status: 'IGNORED',
          changed: 'changed: false',
          meaning: '지원하지 않는 유형을 수신했지만 저장하지 않음',
        },
        {
          status: 'UNCHANGED',
          changed: 'changed: false',
          meaning: '중복 수신이거나 후속 저장이 완료되지 않은 상태',
        },
      ],
      behavior:
        '응답 수신과 기록 변경을 구분한다. changed: false는 후속 상태가 바뀌었다는 뜻이 아니다.',
      annotation: {
        marker: '3',
        label: 'MARGIN NOTE 03',
        title: '“응답 성공”과 “상태 변경”을 같은 뜻으로 쓰지 않았다.',
        body: 'status와 changed를 함께 설명해 요청 처리 결과와 저장 여부를 구분했다. 중복 수신·지원하지 않는 유형·저장 미완료는 각각의 상태 의미로 남겼다.',
      },
    },
    notes: [
      { label: '독자', value: '현재 구현을 이어받는 내부 개발자' },
      {
        label: '작성 판단',
        value: '호출 조건·결과 상태·예외의 의미를 함께 기록',
      },
      {
        label: '적용 범위',
        value: '내부 유지보수용 문서이며 외부 파트너·SDK 사용자용 검증은 별도 범위',
      },
      {
        label: '갱신 시점',
        value: 'API 경로·요청 형식·접근 권한이 바뀔 때',
      },
    ],
    notFormalized: [
      'endpoint마다 완전히 같은 template을 사용하지는 않음',
      '공통 error model이 하나의 계약으로 정리되지는 않음',
      '처음 호출까지 안내하는 Quickstart가 별도로 없음',
    ],
  },
  operations: {
    eyebrow: '03 / WRITING FOR SAFE ACTION',
    title: '명령보다 먼저, 멈춰야 할 경계.',
    summary:
      'Deployment와 Recovery에 명령의 전제, 검증 순서, 실패 시 중단 조건을 먼저 배치했다.',
    artifacts: [
      {
        label: 'NORMAL CHANGE',
        title: 'DEPLOYMENT',
        responsibility: '비활성 대상을 준비하고, 검증 뒤에만 전환',
      },
      {
        label: 'FAILURE RESPONSE',
        title: 'RECOVERY',
        responsibility: '관측을 보존하고, 원인을 나눈 뒤 좁게 복구',
      },
    ],
    flow: [
      {
        index: '01',
        label: 'BEFORE ACTION',
        title: '전제와 대상을 고정',
        description: '권한, 비활성 대상, 데이터 변경과 복구 가능 범위를 먼저 확인.',
        tone: 'observe',
      },
      {
        index: '02',
        label: 'READ-ONLY OBSERVE',
        title: '현재 상태를 먼저 읽기',
        description: '활성 대상, 로그, 코드 차이와 실제 환경을 변경 없이 확인.',
        tone: 'observe',
      },
      {
        index: '03',
        label: 'ACT',
        title: '좁은 대상만 변경',
        description: '비활성 서비스 또는 승인된 복구 범위에만 명령을 실행.',
        tone: 'act',
      },
      {
        index: '04',
        label: 'VERIFY',
        title: '신호를 분리해 확인',
        description: '프로세스 응답·DB 접근·공개 트래픽·별도 작업 프로세스·권한을 각각 검사.',
        tone: 'act',
      },
      {
        index: '05',
        label: 'STOP / ROLLBACK',
        title: '실패하면 더 진행하지 않기',
        description: '준비·전환·복원 중 실패하면 자동 rollback 결과를 먼저 확인하고, 이전 대상 복원까지 실패하면 수동 복구로 전환.',
        tone: 'stop',
      },
    ],
    verification: [
      {
        signal: 'PROCESS HEALTH',
        proves: '애플리케이션 프로세스가 응답 중',
        doesNotProve: 'DB·Redis·작업 프로세스·외부 연동·사용자 권한',
      },
      {
        signal: 'READINESS',
        proves: '새 API가 DB 조회를 수행할 수 있음',
        doesNotProve: 'Redis·작업 프로세스·외부 연동·데이터 이전·소급 반영 결과',
      },
      {
        signal: 'PUBLIC TARGET',
        proves: '공개 요청이 의도한 새 대상으로 전환됨',
        doesNotProve: '데이터 변경 성공·작업 프로세스 상태·전체 사용자 경로',
      },
    ],
    rollbackBoundary: {
      title: 'APPLICATION ROLLBACK ≠ DATA ROLLBACK',
      statement:
        '애플리케이션을 이전 대상으로 되돌려도 스키마·데이터·권한·기능 플래그·소급 반영 결과는 자동으로 복원되지 않는다.',
      stopRule:
        '이전 대상 복원까지 실패하면 자동 진행을 멈추고, 관측한 상태를 보존한 채 수동 복구로 전환한다.',
    },
  },
  principles: {
    eyebrow: '04 / WRITING PRINCIPLES',
    title: '문서마다 지킨 네 가지 작성 기준',
    items: [
      {
        index: '01',
        title: '독자와 가능한 행동부터 나눈다.',
        statement:
          '같은 기능이라도 권한과 목적이 다르면, 필요한 동사와 요청 경로가 달라진다.',
        evidence: 'ROLE GUIDE / EFFECTIVE ACCESS',
      },
      {
        index: '02',
        title: '행동 전에 조건을 둔다.',
        statement:
          '변경 위험이 클수록 명령보다 전제, 대상과 읽기 전용 확인을 먼저 쓴다.',
        evidence: 'AUTHORIZATION / PRE-FLIGHT',
      },
      {
        index: '03',
        title: '결과로 확인할 수 있는 범위를 적는다.',
        statement:
          '상태값과 검증 신호로 확인한 범위, 별도 확인이 필요한 범위를 함께 적는다.',
        evidence: 'CHANGED STATE / HEALTH SIGNAL',
      },
      {
        index: '04',
        title: '현재 구현과 운영 사실을 섞지 않는다.',
        statement:
          '코드에 있는 경로, 배포된 상태와 실제 사용은 서로 다른 근거로 확인한다.',
        evidence: 'CODE BASIS / RUNTIME BOUNDARY',
      },
    ],
  },
  boundary: {
    eyebrow: '작성 경험과 검증 범위',
    title: '작성한 문서와 검증한 결과를 구분한다.',
    statements: [
      '역할별 안내·내부 API 문서·운영 절차서를 제품 변화에 맞춰 작성하고 갱신했다.',
      'API 예시는 내부 유지보수용이다. 외부 개발자 포털·SDK 문서는 별도 범위다.',
      '운영 문서는 절차를 정리한 초안이다. 반복 실행과 복구 검증 결과는 포함하지 않는다.',
    ],
    notClaimed: [
      '온보딩 시간 단축',
      '문의 감소 또는 이해도 향상',
      '반복 검증된 전체 배포·자동 복구',
      '완료된 전체 복원 훈련',
    ],
  },
  nextPage: {
    eyebrow: 'NEXT / HOW I BUILD',
    title: 'AI-NATIVE ENGINEERING',
    summary:
      'AI 개발 과정에서 문서를 참고하고, 검증한 변경을 다시 기준으로 남기는 흐름.',
    href: '/how/ai-native-engineering',
  },
} as const satisfies TechnicalWritingContent
