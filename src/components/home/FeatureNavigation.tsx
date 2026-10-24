import { Link } from 'react-router'
import type { WhatFeatureItem } from '../../content/content-types.ts'
import { whatFeatureGroups } from '../../content/what-features.ts'
import { FeatureRain } from './FeatureRain.tsx'

const features = whatFeatureGroups.flatMap<WhatFeatureItem>((group) => group.features)

interface FeatureNavigationProps {
  readonly variant: 'desktop' | 'mobile'
  readonly interactive: boolean
  readonly motionEnabled: boolean
  readonly onMotionToggle: () => void
}

export function FeatureNavigation({
  variant,
  interactive,
  motionEnabled,
  onMotionToggle,
}: FeatureNavigationProps) {
  return (
    <div
      className={`feature-navigation feature-navigation--${variant}`}
      id={`feature-navigation-${variant}`}
    >
      {interactive ? (
        <button
          className="feature-motion-toggle"
          type="button"
          onClick={(event) => {
            onMotionToggle()
            // Hover controls the desktop reveal; pointer focus must not latch it open.
            if (
              variant === 'desktop' &&
              event.detail > 0 &&
              window.matchMedia('(hover: hover) and (pointer: fine)').matches
            ) {
              event.currentTarget.blur()
            }
          }}
        >
          <span className="feature-motion-symbol" aria-hidden="true">
            {motionEnabled ? 'Ⅱ' : '▷'}
          </span>
          움직임 {motionEnabled ? '끄기' : '켜기'}
        </button>
      ) : null}

      {motionEnabled ? (
        <FeatureRain variant={variant} interactive={interactive} />
      ) : (
        <nav
          className="feature-index"
          aria-label={interactive ? '만든 제품 목록' : undefined}
          aria-hidden={interactive ? undefined : true}
        >
          <ol>
            {features.map((feature) => (
              <li key={feature.id}>
                {interactive ? (
                  <Link
                    className="feature-index-link"
                    data-feature-id={feature.id}
                    to={feature.href}
                  >
                    <span>{feature.name}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                ) : (
                  <span className="feature-index-link">{feature.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  )
}
