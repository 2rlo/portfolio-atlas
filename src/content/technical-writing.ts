import type { TechnicalWritingContent } from './content-types.ts'

export const technicalWritingContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure:
      '실제 문서의 작성 판단과 구조만 남기고, 식별정보와 원문은 공개 목적에 맞게 다시 구성했습니다.',
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
      '독자와 목적이 달라지면,',
      '같은 시스템도 같은 방식으로 설명하지 않았다.',
    ],
    coordinates: [
      { label: 'AUDIENCE', value: '누가 읽는가' },
      { label: 'PURPOSE', value: '무엇을 판단하는가' },
      { label: 'ACTION', value: '다음에 무엇을 하는가' },
      { label: 'BOUNDARY', value: '어디까지 믿을 수 있는가' },
    ],
  },
  reader: {
    eyebrow: '01 / WRITING FOR THE READER',
    title: '같은 화면, 다른 다음 행동.',
    question: '같은 기능을 권한이 다른 사람에게 어떻게 설명했는가?',
    commonContext: 'QUALITY RECORD / SAME SCREEN',
    decision:
      '같은 화면을 보더라도 할 수 있는 일이 다르면, 필요한 설명도 달랐다.',
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
            detail: '기존 기록 수정 뒤에는 명시적으로 실행.',
            annotation: {
              marker: '1',
              label: 'MARGIN NOTE 01',
              title: '자동으로 일어나지 않는 일을 행동 옆에 썼다.',
              body: '기존 내용을 바꿔도 보조 결과는 자동 갱신되지 않았다. 그래서 “수정”과 “다시 생성”을 한 단계처럼 뭉개지 않고, 독자가 직접 실행해야 할 다음 행동으로 분리했다.',
            },
          },
          {
            index: '04',
            action: '원본과 비교해 확정한다.',
            detail: '생성 결과를 근거와 대조한 뒤 문구를 다듬는다.',
          },
        ],
        handoff:
          '변경 행동의 끝은 저장이 아니라, 다시 생성된 결과를 원본과 비교하는 확인.',
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
            action: '관련 맥락을 함께 본다.',
            detail: '읽을 수 있는 일정과 시점을 대조.',
          },
          {
            index: '03',
            action: '편집 제어가 없는 상태를 이해한다.',
            detail: '숨겨진 버튼은 오류가 아니라 정상 권한 범위.',
            annotation: {
              marker: '2',
              label: 'MARGIN NOTE 02',
              title: '없는 기능도 설명의 대상이었다.',
              body: '열람자는 작성자와 같은 화면을 보지만 변경 제어를 사용할 수 없다. 버튼이 보이지 않는 상태를 오류로 오해하지 않도록, 할 수 없는 일과 그 이유를 먼저 닫았다.',
            },
          },
          {
            index: '04',
            action: '근거와 함께 변경을 요청한다.',
            detail: '대상·근거·발견 시각을 담당자에게 전달.',
          },
        ],
        handoff:
          '직접 바꿀 수 없을 때 필요한 것은 우회가 아니라, 근거를 갖춘 요청 경로.',
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
        '제품의 권한 모델이 바뀌자, 문서도 고정된 역할명이 아니라 실제 가능한 행동을 기준으로 독자를 다시 나눴다.',
    },
  },
  implementation: {
    eyebrow: '02 / WRITING FOR IMPLEMENTATION',
    title: '호출법 뒤에, 결과의 의미까지.',
    summary:
      '전체 route 범위를 먼저 남기고, 복잡한 호출은 인증·요청·응답·예외를 이어서 읽을 수 있게 풀었다.',
    artifact: {
      label: 'INTERNAL API REFERENCE / FOR A FUTURE MAINTAINER',
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
        '응답을 받았다는 사실과 기록이 바뀌었다는 사실을 분리해 읽는다. changed가 false이면 호출 성공만으로 후속 상태를 단정하지 않는다.',
      annotation: {
        marker: '3',
        label: 'MARGIN NOTE 03',
        title: '“응답 성공”과 “상태 변경”을 같은 뜻으로 쓰지 않았다.',
        body: '호출자가 status 하나만 보고 처리를 완료했다고 오해하지 않도록, route 분류와 changed 값을 함께 설명했다. 중복과 지원하지 않는 입력, 후속 저장 미완료는 같은 성공 문장으로 닫지 않았다.',
      },
    },
    notes: [
      { label: 'AUDIENCE', value: '현재 구현을 이어받는 내부 개발자' },
      {
        label: 'WRITING DECISION',
        value: '호출 조건과 결과 상태, 예외의 의미를 같은 맥락에서 기록',
      },
      {
        label: 'BOUNDARY',
        value: '외부 파트너나 SDK 사용자를 위해 검증한 문서는 아님',
      },
      {
        label: 'MAINTENANCE',
        value: 'route, request shape, authorization boundary가 바뀔 때',
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
      'Deployment와 Recovery를 성과 기록이 아니라 위험한 절차의 읽기 순서로 구성했다.',
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
        description: 'process, DB readiness, 공개 트래픽과 별도 worker·권한을 각각 검사.',
        tone: 'act',
      },
      {
        index: '05',
        label: 'STOP / ROLLBACK',
        title: '실패하면 더 진행하지 않기',
        description: '준비·전환·복원 중 하나라도 실패하면 기존 상태를 보존하고 수동 복구로 전환.',
        tone: 'stop',
      },
    ],
    verification: [
      {
        signal: 'PROCESS HEALTH',
        proves: '애플리케이션 프로세스가 응답 중',
        doesNotProve: 'DB, Redis, worker, 외부 source, 사용자 권한',
      },
      {
        signal: 'READINESS',
        proves: '새 API가 DB query를 수행할 수 있음',
        doesNotProve: 'Redis, worker, 외부 연동, migration·backfill 결과',
      },
      {
        signal: 'PUBLIC TARGET',
        proves: '공개 요청이 의도한 새 대상으로 전환됨',
        doesNotProve: '데이터 변경 성공, worker 상태, 실제 사용자 경로 전체',
      },
    ],
    rollbackBoundary: {
      title: 'APPLICATION ROLLBACK ≠ DATA ROLLBACK',
      statement:
        '애플리케이션 대상을 되돌려도 schema, data, 권한, flag와 backfill이 자동으로 돌아가지는 않는다.',
      stopRule:
        '이전 대상 복원까지 실패하면 자동 진행을 멈추고, 관측한 상태를 보존한 채 수동 복구로 전환한다.',
    },
  },
  principles: {
    eyebrow: '04 / WRITING PRINCIPLES',
    title: '앞의 문서에서 반복된 네 가지 판단.',
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
        title: '결과가 증명하는 범위를 적는다.',
        statement:
          '상태값과 검증 신호가 뜻하는 것, 뜻하지 않는 것을 한 문맥에서 닫는다.',
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
    eyebrow: 'BOUNDARY / WHAT THIS PAGE PROVES',
    title: '문서는 행동을 돕지만, 결과를 대신 증명하지 않는다.',
    statements: [
      '공개 sample은 private 원문이 아니라 작성 구조와 판단을 독립적으로 재구성한 예시다.',
      '역할별 안내, 내부 API reference와 운영 runbook을 실제 제품 변화에 맞춰 작성·갱신했다.',
      'API sample은 내부 유지보수 문맥이며 외부 developer portal이나 SDK 문서 경험으로 확장하지 않는다.',
      '운영 문서는 draft runbook이다. 명령이 적혀 있다는 사실을 반복 실행·복구 검증 완료로 바꾸지 않는다.',
    ],
    notClaimed: [
      '온보딩 시간 단축',
      '문의 감소 또는 이해도 향상',
      '반복 검증된 전체 배포·자동 복구',
      '완료된 full restore drill',
    ],
  },
  nextPage: {
    eyebrow: 'NEXT / HOW I BUILD',
    title: 'AI-NATIVE ENGINEERING',
    summary:
      '문서화된 맥락을 AI 개발 workflow가 어떻게 읽고, 검증하고, 다시 기준으로 남기는가.',
    href: '/how/ai-native-engineering',
  },
} as const satisfies TechnicalWritingContent
