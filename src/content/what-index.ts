import type { WhatFeatureGroupId, WhatIndexPageContent } from './content-types.ts'
import { whatFeatureGroups } from './what-features.ts'

const groupLabels = {
  workflow: '기록과 업무 흐름',
  evidence: '검증과 변경 이력',
  'ai-knowledge': 'AI와 지식 활용',
  platform: '설정과 운영 관리',
} as const satisfies Record<WhatFeatureGroupId, string>

export const whatIndexContent = {
  eyebrow: '01 / WHAT I BUILT',
  titleLines: ['WHAT', 'I BUILT'],
  introduction: '제품과 업무 흐름을 사례별로 살펴보세요. 각 사례에서 화면과 설계 판단을 함께 볼 수 있습니다.',
  groups: whatFeatureGroups.map((group) => ({ ...group, label: groupLabels[group.id] })),
} as const satisfies WhatIndexPageContent
