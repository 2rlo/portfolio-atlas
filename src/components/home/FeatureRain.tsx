import type { WhatFeatureItem } from '../../content/content-types.ts'
import { whatFeatureGroups } from '../../content/what-features.ts'

type FeatureRainVariant = 'desktop' | 'mobile'

interface FeatureRainProps {
  readonly variant: FeatureRainVariant
}

interface FeatureRainLane {
  readonly id: string
  readonly features: readonly WhatFeatureItem[]
}

const desktopLanes: readonly FeatureRainLane[] = whatFeatureGroups

const mobileLanes: readonly FeatureRainLane[] = ([1, 2] as const).map(
  (laneNumber) => ({
    id: `mobile-${laneNumber}`,
    features: whatFeatureGroups.flatMap((group) =>
      group.features.filter((feature) => feature.mobileLane === laneNumber),
    ),
  }),
)

const sequenceCopies = [0, 1] as const

function getLengthClass(name: string) {
  if (name.length <= 4) return 'feature-rain-item--short'
  if (name.length >= 16) return 'feature-rain-item--long'
  return 'feature-rain-item--medium'
}

export function FeatureRain({ variant }: FeatureRainProps) {
  const lanes = variant === 'desktop' ? desktopLanes : mobileLanes

  return (
    <div
      className={`feature-rain feature-rain--${variant}`}
      data-feature-rain={variant}
      aria-hidden="true"
    >
      {lanes.map((lane) => (
        <div
          className="feature-rain-lane"
          data-rain-lane={lane.id}
          key={lane.id}
        >
          <div className="feature-rain-track">
            {sequenceCopies.map((copyIndex) => (
              <div
                className="feature-rain-sequence"
                data-rain-copy={copyIndex}
                key={copyIndex}
              >
                {lane.features.map((feature) => (
                  <span
                    className={`feature-rain-item ${getLengthClass(feature.name)}`}
                    data-feature-id={feature.id}
                    key={feature.id}
                  >
                    {feature.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
