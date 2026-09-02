import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import type {
  ContentLane,
  HomeTrackContent,
} from '../../content/content-types.ts'
import { FeatureRain } from './FeatureRain.tsx'

interface MobileDiagonalPosterProps {
  readonly tracks: readonly HomeTrackContent[]
  readonly interactive: boolean
}

function MobileDiagonalPoster({
  tracks,
  interactive,
}: MobileDiagonalPosterProps) {
  const [activeLane, setActiveLane] = useState<ContentLane | null>(null)
  const navigate = useNavigate()
  const visibleLane = interactive ? activeLane : null

  function activateLane(track: HomeTrackContent) {
    if (!interactive) return

    if (activeLane === track.lane && track.href) {
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
      aria-label="Portfolio Atlas, WHAT I BUILT and HOW I BUILD"
    >
      <h1 className="visually-hidden">
        WHAT I BUILT and HOW I BUILD, Portfolio Atlas
      </h1>

      <div className="mobile-poster-background" aria-hidden="true" />
      <FeatureRain interactive={interactive} variant="mobile" />

      {tracks.map((track) => {
        const isActive = visibleLane === track.lane
        const hasIndex = track.items.length > 0
        const indexId = `mobile-poster-index-${track.id}`
        const titleId = `mobile-poster-title-${track.id}`

        return (
          <article
            className={`mobile-poster-content mobile-poster-content--${track.lane}`}
            aria-labelledby={titleId}
            key={track.id}
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
                aria-label={`${track.label} index`}
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
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </li>
                ))}
              </ol>
            ) : null}
          </article>
        )
      })}

      {interactive
          ? tracks.map((track) => {
              const isActive = visibleLane === track.lane
              const hasIndex = track.items.length > 0
              const indexId = `mobile-poster-index-${track.id}`
              const primaryDestination =
                track.items.find((item) => item.href === track.href)?.name ??
                track.label

              return (
                <button
                  className={`mobile-poster-control mobile-poster-control--${track.lane}`}
                  type="button"
                  aria-controls={hasIndex ? indexId : undefined}
                  aria-expanded={hasIndex ? isActive : undefined}
                  aria-pressed={hasIndex ? undefined : isActive}
                  aria-label={
                    hasIndex
                      ? isActive && track.href
                        ? `Open ${primaryDestination}`
                        : `${isActive ? 'Hide' : 'Show'} ${track.label} index`
                      : `${isActive ? 'Reset' : 'Focus'} ${track.label}`
                  }
                  key={track.id}
                  onClick={() => activateLane(track)}
                />
              )
          })
        : null}
    </section>
  )
}

export default MobileDiagonalPoster
