import type { WikiProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const wikiFixture = {
  productName: 'Jadebell Wiki',
  platformLabel: 'OUTLINE WORKSPACE',
  workspaceLabel: jadebellPublicWorld.organizationName,
  actor: jadebellPublicWorld.people.minaKim,
  searchPlaceholder: '문서 검색…',
  createLabel: '새 문서',
  primaryNavigation: [
    { symbol: '⌂', label: '홈', active: true },
    { symbol: '⌕', label: '검색', active: false },
    { symbol: '□', label: '임시 보관함', active: false },
  ],
  collections: [
    { symbol: '01', label: 'Start here' },
    { symbol: 'JB', label: 'Jadebell handbook' },
    { symbol: 'PC', label: 'People & collaboration' },
    { symbol: 'PP', label: 'Product playbook' },
    { symbol: 'EN', label: 'Engineering' },
    { symbol: 'PO', label: 'Partner operations' },
    { symbol: 'RE', label: 'Reliability' },
    { symbol: 'W', label: 'Welcome' },
  ],
  tabs: [
    { label: '최근 본 문서', active: true },
    { label: '인기', active: false },
    { label: '최근 업데이트', active: false },
    { label: '내가 만든 문서', active: false },
  ],
  documents: [
    {
      title: '함께 일하는 방식',
      editedBy: jadebellPublicWorld.people.minaKim,
      updated: '12일 전 수정',
      collection: 'Start here',
      viewed: '오늘 조회',
    },
    {
      title: '릴리스 준비 기준',
      editedBy: jadebellPublicWorld.people.danielLee,
      updated: '13일 전 수정',
      collection: 'Product playbook',
      viewed: '어제 조회',
    },
    {
      title: '결정을 기록하는 법',
      editedBy: jadebellPublicWorld.people.soraLim,
      updated: '14일 전 수정',
      collection: 'Jadebell handbook',
      viewed: '3일 전 조회',
    },
    {
      title: '파트너 인계 체크리스트',
      editedBy: jadebellPublicWorld.people.juliaHan,
      updated: '14일 전 수정',
      collection: 'Partner operations',
      viewed: '5일 전 조회',
    },
    {
      title: '접근 권한 검토 가이드',
      editedBy: jadebellPublicWorld.people.minaKim,
      updated: '15일 전 수정',
      collection: 'Reliability',
      viewed: '6일 전 조회',
    },
    {
      title: '검색 인덱스 운영 노트',
      editedBy: jadebellPublicWorld.people.danielLee,
      updated: '16일 전 수정',
      collection: 'Engineering',
      viewed: '8일 전 조회',
    },
    {
      title: '새 팀원을 위한 시작 안내',
      editedBy: jadebellPublicWorld.people.soraLim,
      updated: '16일 전 수정',
      collection: 'Welcome',
      viewed: '9일 전 조회',
    },
  ],
} as const satisfies WikiProductFixture
