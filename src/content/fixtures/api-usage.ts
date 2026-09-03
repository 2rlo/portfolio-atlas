import type { ApiUsageProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const apiUsageProductFixture = {
  productName: jadebellPublicWorld.productName,
  workspaceLabel: 'ADMIN / API COST',
  period: 'SYNTHETIC PERIOD · AUG 01 — AUG 28',
  syntheticSummary: [
    { label: 'TODAY', value: '$1.12', note: 'warning at $2.00', tone: 'normal' },
    { label: 'LAST 7 DAYS', value: '$18.40', note: 'recorded usage', tone: 'normal' },
    { label: 'THIS MONTH', value: '$43.20', note: '26 active days', tone: 'normal' },
    { label: 'MONTH-END', value: '$61.80', note: 'projection · not invoice', tone: 'warning' },
  ],
  guard: {
    status: 'BACKGROUND BATCH AVAILABLE',
    dailyWarning: '$2.00',
    dailyStop: '$4.00',
    monthlyProjection: '$100.00',
    keptOnline: 'Interactive chat',
    paused: 'Diff analysis · developer rollup',
  },
  workloads: [
    { name: 'Change-set analysis', model: 'Reasoning model', cost: '$31.06', share: 72, mode: 'batch' },
    { name: 'Developer rollup', model: 'Fast model', cost: '$8.41', share: 36, mode: 'batch' },
    { name: 'Assistant chat', model: 'Reasoning model', cost: '$3.24', share: 18, mode: 'standard' },
    { name: 'Candidate extraction', model: 'Fast model', cost: '$0.49', share: 8, mode: 'standard' },
  ],
  tokenLedger: [
    { label: 'INPUT', tokens: '8.42M', rate: 'MODEL RATE' },
    { label: 'OUTPUT', tokens: '2.18M', rate: 'MODEL RATE' },
    { label: 'CACHE WRITE', tokens: '3.61M', rate: 'WRITE RATE' },
    { label: 'CACHE READ', tokens: '1.42M', rate: 'READ RATE' },
    { label: 'BATCH', tokens: '812 CALLS', rate: '0.5× RATE' },
  ],
  ledgerRows: [
    { date: 'AUG 28 · 17:42', feature: 'Assistant chat', mode: 'STREAM', input: '6,094', output: '6,176', cost: '$0.07', state: 'RECORDED' },
    { date: 'AUG 28 · 16:10', feature: 'Developer rollup', mode: 'BATCH', input: '24,120', output: '3,880', cost: '$0.11', state: 'TERMINAL' },
    { date: 'AUG 28 · 14:03', feature: 'Change-set analysis', mode: 'BATCH', input: '38,441', output: '5,204', cost: '$0.19', state: 'TERMINAL' },
    { date: 'AUG 28 · 11:22', feature: 'Assistant chat', mode: 'DISCONNECT', input: '3,812', output: '1,304', cost: '$0.03', state: 'SNAPSHOT' },
  ],
  counterfactual: {
    recorded: '$43.20',
    standardNoCache: '$62.94',
    difference: '−$19.74',
    label: 'SAME SYNTHETIC TOKENS / STANDARD RATE + NO CACHE',
  },
} as const satisfies ApiUsageProductFixture
