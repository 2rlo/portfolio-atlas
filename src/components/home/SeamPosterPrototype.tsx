import { Link } from 'react-router'
import type { HomeTrackContent } from '../../content/content-types.ts'
import { homeEntryRecommendation } from '../../content/home.ts'
import { FeatureRain } from './FeatureRain.tsx'
import MobileDiagonalPoster from './MobileDiagonalPoster.tsx'
import type { EntryGuidePhase } from './useTossEntryGuide.ts'

export type CoverTreatment = 't1' | 't2' | 't3'
export type DisplayTreatment = 't0' | 't1' | 't2'

interface SeamPosterPrototypeProps {
  readonly tracks: readonly HomeTrackContent[]
  readonly treatment: CoverTreatment
  readonly displayTreatment?: DisplayTreatment
  readonly interactive: boolean
  readonly guidePhase?: EntryGuidePhase
  readonly onGuideEnd?: () => void
}

function SeamPosterPrototype({
  tracks,
  treatment,
  displayTreatment,
  interactive,
  guidePhase = 'idle',
  onGuideEnd,
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
        data-entry-guide={guidePhase === 'idle' ? undefined : guidePhase}
        aria-label="Portfolio Atlas, 만든 제품과 만드는 방식"
      >
        <h1 className="visually-hidden">
          만든 제품과 만드는 방식, Portfolio Atlas
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
                aria-label={`${track.items[0]?.name ?? track.label} 열기`}
                className="poster-field-background-link"
                to={track.href}
                onClick={onGuideEnd}
                onAuxClick={onGuideEnd}
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
                aria-label={`${track.label} 목록`}
              >
                {track.items.map((item, itemIndex) => (
                  <li key={item.id}>
                    <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                    {interactive && item.href ? (
                      <Link
                        className="poster-index-link"
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
        ))}
      </section>

      <MobileDiagonalPoster
        tracks={tracks}
        interactive={interactive}
        guidePhase={guidePhase}
        onGuideEnd={onGuideEnd}
      />
    </>
  )
}

export default SeamPosterPrototype
