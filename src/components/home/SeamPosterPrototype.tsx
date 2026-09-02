import { Link } from 'react-router'
import type { HomeTrackContent } from '../../content/content-types.ts'
import { FeatureRain } from './FeatureRain.tsx'
import MobileDiagonalPoster from './MobileDiagonalPoster.tsx'

export type CoverTreatment = 't1' | 't2' | 't3'
export type DisplayTreatment = 't0' | 't1' | 't2'

interface SeamPosterPrototypeProps {
  readonly tracks: readonly HomeTrackContent[]
  readonly treatment: CoverTreatment
  readonly displayTreatment?: DisplayTreatment
  readonly interactive: boolean
}

function SeamPosterPrototype({
  tracks,
  treatment,
  displayTreatment,
  interactive,
}: SeamPosterPrototypeProps) {
  const displayClassName = displayTreatment
    ? ` display-treatment--${displayTreatment}`
    : ''

  return (
    <>
      <section
        className={`seam-poster seam-poster--${treatment}${displayClassName}`}
        data-treatment={treatment}
        data-display-treatment={displayTreatment}
        data-interactive={interactive}
        aria-label="Portfolio Atlas, WHAT I BUILT and HOW I BUILD"
      >
        <h1 className="visually-hidden">
          WHAT I BUILT and HOW I BUILD, Portfolio Atlas
        </h1>

        {tracks.map((track) => (
          <article
            className={`poster-field poster-field--${track.lane}`}
            id={track.id}
            aria-labelledby={`poster-title-${track.id}`}
            key={track.id}
            tabIndex={
              interactive && track.lane === 'what-i-built' ? 0 : undefined
            }
          >
            {interactive && track.href ? (
              <Link
                aria-label={`Open ${track.items[0]?.name ?? track.label}`}
                className="poster-field-background-link"
                to={track.href}
              />
            ) : null}

            {track.lane === 'what-i-built' ? (
              <FeatureRain interactive={interactive} variant="desktop" />
            ) : null}

            <header className="poster-meta">
              <span>{track.index} /</span>
              <p>{track.label}</p>
            </header>

            <h2 className="poster-word" id={`poster-title-${track.id}`}>
              {track.seamTitle}
            </h2>

            {track.items.length > 0 ? (
              <ol
                className="poster-index-list"
                aria-label={`${track.label} index`}
              >
                {track.items.map((item, itemIndex) => (
                  <li key={item.id}>
                    <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                    {interactive && item.href ? (
                      <Link className="poster-index-link" to={item.href}>
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
        ))}
      </section>

      <MobileDiagonalPoster tracks={tracks} interactive={interactive} />
    </>
  )
}

export default SeamPosterPrototype
