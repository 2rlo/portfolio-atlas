import type { PublicCodemapContent } from '../content-types.ts'

export const publicCodemapContent = {
  meta: {
    classification: 'reconstructed-public-example',
    owner: 'Documentation System',
    disclosure:
      '코드 탐색 방식과 갱신 규칙을 설명하기 위해 독립적으로 재구성한 예시입니다.',
  },
  hero: {
    eyebrow: 'DOCUMENTATION SYSTEM / ARTIFACT 10',
    titleLines: ['CODE', 'MAP'],
    thesis: '코드의 위치와 관계를 다시 찾을 수 있게 만든 지도.',
    summary:
      '호출자·의존성·테스트·근거를 코드 위치와 연결한다.',
  },
  freshness: {
    state: 'FRESH',
    reviewedAt: '공개 예시 검토됨',
    scope: '합성 모듈 5개 / 흐름 2개',
    rule: '구조가 바뀌면 코드와 같은 변경에서 다시 생성하고 LOCK을 확인한다.',
  },
  nodes: [
    {
      id: 'workspace', index: '01', label: 'WORKSPACE', kind: 'ENTRY',
      role: '사용자가 변경을 요청하는 진입 화면.',
      callers: ['직접 사용자 동작'], dependencies: ['Interface Route'],
      tests: ['workspace navigation'], evidence: ['route declaration', 'interaction entry'],
    },
    {
      id: 'interface', index: '02', label: 'INTERFACE ROUTE', kind: 'CLIENT',
      role: '입력을 요청 계약으로 바꾸고 결과 상태를 다시 표시한다.',
      callers: ['Workspace'], dependencies: ['Access Gate'],
      tests: ['request state', 'error boundary'], evidence: ['typed request', 'route binding'],
    },
    {
      id: 'access', index: '03', label: 'ACCESS GATE', kind: 'POLICY',
      role: '요청 주체와 작업 범위를 확인한 뒤 허용된 경로만 연다.',
      callers: ['Interface Route'], dependencies: ['Domain Service'],
      tests: ['allowed scope', 'denied scope'], evidence: ['policy contract', 'decision branch'],
    },
    {
      id: 'service', index: '04', label: 'DOMAIN SERVICE', kind: 'SERVICE',
      role: '업무 규칙을 적용하고 저장 변경과 처리 결과를 조율한다.',
      callers: ['Access Gate'], dependencies: ['Record Store'],
      tests: ['rule transition', 'failure isolation'], evidence: ['service boundary', 'state transition'],
    },
    {
      id: 'store', index: '05', label: 'RECORD STORE', kind: 'DATA',
      role: '확인된 변경을 저장하고 다시 읽을 수 있는 현재 상태를 제공한다.',
      callers: ['Domain Service'], dependencies: ['관리형 데이터 경계'],
      tests: ['write contract', 'read-after-write'], evidence: ['repository contract', 'schema boundary'],
    },
  ],
  flows: [
    {
      id: 'bounded-change', label: '허용된 변경',
      trigger: '사용자가 범위가 정해진 변경을 요청한다.',
      outcome: '정책 확인을 통과한 변경만 저장되고 검증 가능한 상태가 반환된다.',
      steps: ['workspace', 'interface', 'access', 'service', 'store'],
    },
    {
      id: 'denied-change', label: '거부된 변경',
      trigger: '현재 주체의 범위를 벗어난 요청이 들어온다.',
      outcome: 'Access Gate에서 중단되고 저장 계층에는 변경이 전달되지 않는다.',
      steps: ['workspace', 'interface', 'access'],
    },
  ],
  contract: [
    { format: 'HTML', audience: '사람', responsibility: '모듈의 관계와 처리 흐름을 탐색한다.' },
    { format: 'JSON', audience: '개발 에이전트', responsibility: '역할, 진입점, 테스트와 근거를 구조적으로 읽는다.' },
    { format: 'LOCK', audience: '변경 검토자', responsibility: '생성 기준·스캔 범위·모듈 지문으로 코드와 지도의 일치 여부를 확인한다.' },
  ],
  boundary: [
    '모듈과 관계는 공개 목적에 맞게 독립적으로 재구성했다. 실제 저장소 식별정보와 내부 구조는 담지 않았다.',
    'Codemap은 코드의 위치와 관계를 찾는 자료다. 배포·실행 상태·반복 사용은 각각의 운영 근거로 확인한다.',
  ],
} as const satisfies PublicCodemapContent
