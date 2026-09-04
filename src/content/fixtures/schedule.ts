import type { ScheduleProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const scheduleProductFixture = {
  productName: jadebellPublicWorld.productName,
  workspaceLabel: 'PROJECTS / SCHEDULE',
  editor: jadebellPublicWorld.people.minaKim,
  viewer: jadebellPublicWorld.people.juliaHan,
  days: ['8/24 MON', '8/25 TUE', '8/26 WED', '8/27 THU', '8/28 FRI'],
  timeline: [
    {
      project: 'Atlas',
      items: [
        { title: 'Release risk review', start: 1, span: 2, actualSpan: 2, tone: 'normal' },
        { title: 'Rollback rehearsal', start: 3, span: 2, actualSpan: 3, tone: 'warning' },
      ],
    },
    {
      project: 'Canopy',
      items: [
        { title: 'Partner onboarding validation', start: 2, span: 3, tone: 'normal' },
      ],
    },
    {
      project: 'Harbor',
      items: [
        { title: 'Search index refresh', start: 1, span: 2, actualSpan: 2, tone: 'normal' },
        { title: 'Release approval', start: 4, span: 2, actualSpan: 2, tone: 'overdue' },
      ],
    },
  ],
  plans: [
    { project: 'Atlas', title: 'Release risk review', status: 'IN PROGRESS', period: '8/24–8/26', owner: 'Mina Kim', actual: '8/24–' },
    { project: 'Atlas', title: 'Rollback rehearsal', status: 'REVIEW', period: '8/26–8/27', owner: 'Daniel Lee', actual: '8/26–', needsReview: true },
    { project: 'Canopy', title: 'Partner onboarding validation', status: 'IN PROGRESS', period: '8/25–8/28', owner: 'Julia Han', actual: 'NOT RECORDED', needsReview: true },
    { project: 'Harbor', title: 'Release approval', status: 'WAITING', period: '8/27–8/28', owner: 'Mina Kim', actual: '8/27–' },
  ],
  changes: [
    { project: 'Atlas', title: 'Extend rollback rehearsal by 2 hours', proposedBy: 'Daniel Lee · 8/27', state: 'REVIEW' },
    { project: 'Harbor', title: 'Move release approval to 16:00', proposedBy: 'Mina Kim · 8/28', state: 'WAITING' },
    { project: 'Canopy', title: 'Assign partner walkthrough owner', proposedBy: 'Julia Han', state: 'INFO' },
  ],
  recentApply: {
    title: 'Canopy walkthrough owner updated',
    actor: 'Mina Kim · 15:12',
    state: 'REVERT AVAILABLE',
    rule: 'Only while no newer apply touches the same plan',
  },
  readOnlyScope: {
    label: 'SHARED SCHEDULE / READ-ONLY',
    person: 'Julia Han · Partner Manager',
    visible: ['Timeline', 'Plan detail', 'Public schedule items'],
    restricted: ['Create', 'Edit', 'Delete', 'Apply proposal'],
  },
} as const satisfies ScheduleProductFixture
