import type { PublicProductFixture } from '../content-types.ts'

export const jadebellPublicFixture = {
  meta: {
    id: 'jadebell-public-minimum',
    version: '1.0.0',
    productName: 'Jadebell Hub',
    organizationName: 'Jadebell Systems',
    classification: 'synthetic-public-demo',
    locale: 'ko-KR',
    disclosure:
      '이름과 시나리오는 공개 포트폴리오를 위해 독립 작성한 합성 예시이며 실제 조직이나 운영 데이터를 나타내지 않습니다.',
    boundary: {
      dataOrigin: 'independently-authored-synthetic',
      privateSourceRuntimeDependency: false,
      containsRealIdentifiers: false,
      oneToOneInternalMapping: false,
    },
  },
  projects: [
    {
      id: 'atlas',
      name: 'Atlas',
      description:
        '접근 정책과 출시 준비 상태를 함께 살펴보는 공개 데모 프로젝트입니다.',
    },
  ],
  features: [
    {
      id: 'release-readiness',
      projectId: 'atlas',
      name: 'Release Readiness',
      summary:
        '단계 확대 전에 확인 항목과 근거의 준비 상태를 검토하는 합성 기능입니다.',
    },
  ],
} as const satisfies PublicProductFixture
