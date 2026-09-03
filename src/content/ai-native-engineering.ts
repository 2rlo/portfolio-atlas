import type { AiNativeEngineeringContent } from './content-types.ts'

export const aiNativeEngineeringContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: '실제 업무 데이터와 식별정보 없이 개발 판단 구조만 재구성했습니다.',
  },
  hero: {
    eyebrow: 'HOW I BUILD / 02',
    titleLines: ['AI-NATIVE', 'ENGINEERING'],
    thesis: 'AI가 더 많이 만드는 환경보다, 틀렸을 때 더 빨리 알아차리는 환경을 설계했다.',
    summary:
      '외부화된 프로젝트 맥락으로 범위를 정하고, 후보와 근거와 사람의 결정을 분리한 뒤 확인된 변경만 다시 기준 맥락에 반영한다.',
  },
  scene: {
    eyebrow: 'ONE APPLIED SCENE / BOUNDED CHANGE',
    title: '하나의 권한 경계를 바꾸는 동안 Codemap은 어디에서 쓰이는가?',
    situation:
      '요청 경계 하나를 수정하더라도 화면, 정책, 서비스, 저장 계약과 테스트가 함께 영향을 받을 수 있다.',
    steps: [
      { id: 'context', label: 'CONTEXT', summary: '현재 기준부터 읽는다.', detail: 'Project Map과 현재 상태 문서에서 작업 전제와 아직 확인되지 않은 경계를 찾는다.', codemapUse: 'LOCK의 생성 범위와 freshness를 먼저 확인한다.', state: 'context' },
      { id: 'scope', label: 'SCOPE', summary: '영향 범위를 좁힌다.', detail: '요청과 직접 연결된 정책, 서비스, 저장 계약을 식별하고 작업 밖의 영역을 명시한다.', codemapUse: '호출자, 의존성, 관련 테스트와 근거 심볼을 따라간다.', state: 'context' },
      { id: 'isolate', label: 'ISOLATE', summary: '변경 경계를 고정한다.', detail: '독립된 변경 단위와 검증 가능한 작은 목표를 만들고, 확인되지 않은 운영 가정은 포함하지 않는다.', state: 'candidate' },
      { id: 'build', label: 'BUILD', summary: '구현 후보를 만든다.', detail: 'AI가 코드와 테스트 후보를 만들지만 이 단계의 결과는 아직 canonical 사실이 아니다.', state: 'candidate' },
      { id: 'verify', label: 'VERIFY', summary: '근거로 반박한다.', detail: '관련 테스트, 코드 diff와 필요한 실제 상태를 확인해 초기 가설이 틀렸는지 찾는다.', codemapUse: '처음 식별한 영향 경로에서 검증 누락이 없는지 다시 대조한다.', state: 'evidence' },
      { id: 'decision', label: 'HUMAN DECISION', summary: '채택 여부를 판단한다.', detail: '근거를 바탕으로 채택, 수정 또는 보류를 결정한다. 생성됐다는 사실만으로 승인하지 않는다.', state: 'decision' },
      { id: 'canonicalize', label: 'CANONICALIZE', summary: '확인된 것만 기준으로 남긴다.', detail: '사람이 확인한 변경이 구조나 경계를 바꿨다면 관련 문서와 코드 수준 맥락을 같은 변경에서 갱신한다.', codemapUse: 'Codemap을 다시 생성하고 새 LOCK과 변경 범위를 확인한다.', state: 'canonical' },
    ],
  },
  boundary: [
    'AI candidate, 검증 evidence, human-confirmed decision과 canonical context를 서로 다른 상태로 유지한다.',
    '구현과 테스트 통과는 배포, runtime 사용 또는 adoption을 의미하지 않는다.',
  ],
} as const satisfies AiNativeEngineeringContent
