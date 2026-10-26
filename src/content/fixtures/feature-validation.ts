import type { FeatureValidationProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const featureValidationProductFixture = {
  productName: jadebellPublicWorld.productName,
  workspaceLabel: 'EVIDENCE WORKSPACE',
  project: {
    id: jadebellPublicWorld.projects.atlas.id,
    name: jadebellPublicWorld.projects.atlas.name,
  },
  reviewer: jadebellPublicWorld.people.minaKim,
  featureList: [
    {
      id: 'partner-notification-retry',
      name: 'Partner notification retry policy',
      meta: '요구사항 3 · 변경 묶음 3',
      status: '확인 필요',
      tone: 'unknown',
    },
    {
      id: 'release-failure-visibility',
      name: 'Release failure state visibility',
      meta: '요구사항 4 · 변경 묶음 2',
      status: '근거 연결됨',
      tone: 'linked',
    },
    {
      id: 'duplicate-request-protection',
      name: 'Duplicate request protection',
      meta: '요구사항 2 · 후보 2',
      status: '일부 연결',
      tone: 'unknown',
    },
    {
      id: 'delivery-status-timeline',
      name: 'Delivery status timeline',
      meta: '요구사항 3 · 변경 묶음 2',
      status: '사람 확인 완료',
      tone: 'confirmed',
    },
  ],
  selectedFeature: {
    name: 'Partner notification retry policy',
    summary:
      '파트너 알림 실패 뒤 재시도 범위와 사용자에게 보이는 최종 상태를 명세와 변경 근거로 함께 검토합니다.',
    status: '확인 필요',
    lastReviewed: '8월 28일 16:20',
    requirements: [
      {
        id: 'R1',
        statement: '실패 요청은 최대 3회까지만 재시도한다.',
        sourceLabel: '사람이 확정한 당시 명세',
        state: 'confirmed',
        statusLabel: '사람 확인 완료',
        statementHotspotId: 'requirement',
        evidenceHotspotId: 'evidence',
        evidence: {
          eyebrow: 'GROUPED CHANGE SET',
          title: 'Delivery retry boundary · 08-27',
          summary:
            '실패 유형별 횟수 제한과 backoff 상태 변경을 하나의 검토 단위로 묶었습니다.',
          tokens: [
            'RequestPolicy.apply',
            'RetryWindow.limit',
            'DeliveryState.fail',
          ],
        },
        signal: '사람이 연결을 확정한 구현 근거',
        reviewer: {
          initials: jadebellPublicWorld.people.minaKim.initials,
          name: jadebellPublicWorld.people.minaKim.name,
          note: '명세의 제한 횟수를 3회로 확정',
          time: '16:05',
        },
      },
      {
        id: 'R2',
        statement: '재시도 이후 최종 실패와 다음 행동을 구분해 보여준다.',
        sourceLabel: '검토 중인 명세 초안',
        state: 'linked',
        statusLabel: '근거 연결됨',
        evidenceHotspotId: 'ai-assessment',
        evidence: {
          eyebrow: 'AI-SUGGESTED MATCH',
          title: 'Failure state visibility',
          summary:
            '실패 상태를 표시하는 변경을 관련 후보로 찾았습니다. 검토자는 화면 문구와 명세를 대조해 연결을 확정합니다.',
          tokens: ['FailureNotice.render', 'RetryState.exhausted'],
        },
        signal: 'AI 추천 · 문구와 연결 범위 확인 필요',
      },
      {
        id: 'R3',
        statement: '동일 요청을 중복 실행하지 않는다.',
        sourceLabel: '사람이 확정한 당시 명세',
        state: 'unknown',
        statusLabel: 'UNKNOWN',
        evidenceHotspotId: 'unknown',
        evidence: {
          eyebrow: 'CANDIDATE EVIDENCE',
          title: 'Delivery message guard',
          summary:
            '요청 키를 재사용하는 변경을 후보로 찾았습니다. 중복 실행을 막는 범위를 검토한 뒤 기능에 연결합니다.',
          tokens: ['RequestQueue.release', 'PendingDelivery.guard'],
          companion: {
            eyebrow: 'WHY UNCERTAIN',
            body: '재시도 흐름과 별도 처리 경로가 같은 변경 묶음에 있어 중복 실행 방지 범위를 사람이 확인해야 합니다.',
          },
        },
        signal: '근거 부족 · 사람 확인 전',
      },
    ],
    unlinkedCandidate: {
      title: 'Retry state cleanup',
      label: '연결을 검토할 구현 후보',
      summary:
        '재시도 종료 뒤 남은 상태를 정리하지만 R2와 R3 중 어느 요구사항의 근거인지 확인이 필요합니다.',
      tokens: ['RetrySession.close', 'PendingDelivery.cleanup'],
    },
  },
} as const satisfies FeatureValidationProductFixture
