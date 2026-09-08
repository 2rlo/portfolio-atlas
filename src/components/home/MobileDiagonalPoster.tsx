import { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import type {
  ContentLane,
  HomeTrackContent,
} from '../../content/content-types.ts'
import { FeatureRain } from './FeatureRain.tsx'
import { homeEntryRecommendation } from '../../content/home.ts'
import type { EntryGuidePhase } from './useTossEntryGuide.ts'

interface MobileDiagonalPosterProps {
  readonly tracks: readonly HomeTrackContent[]
  readonly interactive: boolean
  readonly guidePhase?: EntryGuidePhase
  readonly onGuideEnd?: () => void
}

function MobileDiagonalPoster({
  tracks,
  interactive,
  guidePhase = 'idle',
  onGuideEnd,
}: MobileDiagonalPosterProps) {
  const [activeLane, setActiveLane] = useState<ContentLane | null>(null)
  const navigate = useNavigate()
  const visibleLane = interactive
    ? activeLane ?? (guidePhase === 'recommendation' ? 'how-i-build' : null)
    : null

  function activateLane(track: HomeTrackContent) {
    if (!interactive) return

    onGuideEnd?.()

    if (visibleLane === track.lane && track.href) {
      void navigate(track.href)
      return
    }

    setActiveLane((currentLane) =>
      currentLane === track.lane ? null : track.lane,
    )
  }

  return (
    <section
      className="mobile-diagonal-poster"
      data-active-lane={visibleLane ?? 'none'}
      data-interactive={interactive}
      data-entry-guide={guidePhase === 'idle' ? undefined : guidePhase}
      aria-label="Portfolio Atlas, 만든 제품과 만드는 방식"
    >
      <h1 className="visually-hidden">
        만든 제품과 만드는 방식, Portfolio Atlas
      </h1>

      <div className="mobile-poster-background" aria-hidden="true" />

      {tracks.map((track) => {
        const isActive = visibleLane === track.lane
        const hasIndex = track.items.length > 0
        const indexId = `mobile-poster-index-${track.id}`
        const titleId = `mobile-poster-title-${track.id}`

        const primaryDestination =
          track.items.find((item) => item.href === track.href)?.name ??
          track.label

        return (
          <Fragment key={track.id}>
            {interactive ? (
              <button
                className={`mobile-poster-control mobile-poster-control--${track.lane}`}
                type="button"
                aria-controls={hasIndex ? indexId : undefined}
                aria-expanded={hasIndex ? isActive : undefined}
                aria-pressed={hasIndex ? undefined : isActive}
                aria-label={
                  hasIndex
                    ? isActive && track.href
                      ? `${primaryDestination} 열기`
                      : `${track.label} 목록 ${isActive ? '접기' : '펼치기'}`
                    : `${track.label} ${isActive ? '강조 해제' : '강조'}`
                }
                onClick={() => activateLane(track)}
              />
            ) : null}

            {track.lane === 'what-i-built' ? (
              <FeatureRain
                interactive={interactive && isActive}
                variant="mobile"
              />
            ) : null}

            <article
              className={`mobile-poster-content mobile-poster-content--${track.lane}`}
              aria-labelledby={titleId}
            >
              <header className="mobile-poster-meta">
                <span>{track.index} /</span>
                <p>{track.label}</p>
              </header>

              <h2 className="mobile-poster-word" id={titleId}>
                {track.seamTitle}
              </h2>

              {hasIndex ? (
                <ol
                  className="mobile-poster-index"
                  id={indexId}
                  aria-label={`${track.label} 목록`}
                  aria-hidden={!isActive}
                >
                  {track.items.map((item, itemIndex) => (
                    <li key={item.id}>
                      <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                      {interactive && item.href ? (
                        <Link
                          className="poster-index-link"
                          tabIndex={isActive ? undefined : -1}
                          to={item.href}
                          onClick={onGuideEnd}
                          onAuxClick={onGuideEnd}
                          data-entry-recommended={
                            guidePhase === 'recommendation' &&
                            item.id === homeEntryRecommendation.itemId || undefined
                          }
                        >
                          {item.name}
                          {guidePhase === 'recommendation' &&
                          item.id === homeEntryRecommendation.itemId ? (
                            <small className="poster-recommendation-label">
                              {' '}
                              {homeEntryRecommendation.label}
                            </small>
                          ) : null}
                        </Link>
                      ) : (
                        <span>{item.name}</span>
                      )}
                    </li>
                  ))}
                </ol>
              ) : null}
            </article>
          </Fragment>
        )
      })}
    </section>
  )
}

export default MobileDiagonalPoster
