import type { PublicProductFixture } from '../content-types.ts'

export const jadebellPublicWorld = {
  productName: 'Jadebell Hub',
  organizationName: 'Jadebell Systems',
  projects: {
    atlas: {
      id: 'atlas',
      name: 'Atlas',
      description:
        '접근 정책과 출시 준비 상태를 함께 살펴보는 공개 데모 프로젝트입니다.',
    },
    canopy: {
      id: 'canopy',
      name: 'Canopy',
      description:
        '파트너 준비 상태와 운영 인계를 살펴보는 공개 데모 프로젝트입니다.',
    },
    harbor: {
      id: 'harbor',
      name: 'Harbor',
      description:
        '검색과 배포 흐름의 운영 상태를 살펴보는 공개 데모 프로젝트입니다.',
    },
    meadow: {
      id: 'meadow',
      name: 'Meadow',
      description:
        '과거 참조를 보존한 보관·복원 흐름을 설명하는 공개 데모 프로젝트입니다.',
    },
  },
  people: {
    minaKim: {
      id: 'mina-kim',
      name: 'Mina Kim',
      role: 'Product Lead',
      initials: 'MK',
    },
    danielLee: {
      id: 'daniel-lee',
      name: 'Daniel Lee',
      role: 'Product Engineer',
      initials: 'DL',
    },
  },
} as const

export const jadebellPublicFixture = {
  meta: {
    id: 'jadebell-public-minimum',
    version: '1.3.0',
    productName: jadebellPublicWorld.productName,
    organizationName: jadebellPublicWorld.organizationName,
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
    jadebellPublicWorld.projects.atlas,
    jadebellPublicWorld.projects.canopy,
    jadebellPublicWorld.projects.harbor,
    jadebellPublicWorld.projects.meadow,
  ],
  features: [
    {
      id: 'release-readiness',
      projectId: 'atlas',
      name: 'Release Readiness',
      summary:
        '단계 확대 전에 확인 항목과 근거의 준비 상태를 검토하는 합성 기능입니다.',
    },
    {
      id: 'partner-notification-retry',
      projectId: 'atlas',
      name: 'Partner notification retry policy',
      summary:
        '알림 실패 뒤 재시도 범위와 사용자에게 보이는 최종 상태를 검토하는 합성 기능입니다.',
    },
  ],
  people: [
    jadebellPublicWorld.people.minaKim,
    jadebellPublicWorld.people.danielLee,
  ],
} as const satisfies PublicProductFixture
