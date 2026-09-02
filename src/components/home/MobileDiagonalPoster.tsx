import { useState } from 'react'
import { Link } from 'react-router'
import type {
  ContentLane,
  HomeTrackContent,
} from '../../content/content-types.ts'

interface MobileDiagonalPosterProps {
  readonly tracks: readonly HomeTrackContent[]
  readonly interactive: boolean
}

function MobileDiagonalPoster({
  tracks,
  interactive,
}: MobileDiagonalPosterProps) {
  const [activeLane, setActiveLane] = useState<ContentLane | null>(null)
  const visibleLane = interactive ? activeLane : null

  function toggleLane(lane: ContentLane) {
    if (!interactive) return

    setActiveLane((currentLane) => (currentLane === lane ? null : lane))
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

      {tracks.map((track) => {
        const isActive = visibleLane === track.lane
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

            <ol
              className="mobile-poster-index"
              id={indexId}
              aria-label={`${track.label} index`}
              aria-hidden={!isActive}
            >
              {track.items.map((item, itemIndex) => (
                <li key={item.id}>
                  <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                  {item.href ? (
                    <Link className="poster-index-link" to={item.href}>
                      {item.name}
                    </Link>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </article>
        )
      })}

      {interactive
        ? tracks.map((track) => {
            const isActive = visibleLane === track.lane
            const indexId = `mobile-poster-index-${track.id}`

            return (
              <button
                className={`mobile-poster-control mobile-poster-control--${track.lane}`}
                type="button"
                aria-controls={indexId}
                aria-expanded={isActive}
                aria-label={`${isActive ? 'Hide' : 'Show'} ${track.label} index`}
                key={track.id}
                onClick={() => toggleLane(track.lane)}
              />
            )
          })
        : null}
    </section>
  )
}

export default MobileDiagonalPoster
