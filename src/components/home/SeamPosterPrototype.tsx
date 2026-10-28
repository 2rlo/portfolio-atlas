import { useRef, useState } from 'react'
import { Link } from 'react-router'
import type { HomeTrackContent } from '../../content/content-types.ts'
import { homeEntryRecommendation } from '../../content/home.ts'
import { FeatureNavigation } from './FeatureNavigation.tsx'
import { useFeatureMotion } from './useFeatureMotion.ts'
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
  const { motionEnabled, toggleMotion } = useFeatureMotion()
  const [howHovered, setHowHovered] = useState(false)
  const [howFocused, setHowFocused] = useState(false)
  const [howOpenOverride, setHowOpenOverride] = useState<boolean | null>(null)
  const howControlRef = useRef<HTMLButtonElement>(null)
  const howOpenAtPointerDown = useRef(false)
  const howExpanded = howOpenOverride ?? (
    howHovered || howFocused || guidePhase === 'recommendation'
  )
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
        data-feature-motion={motionEnabled ? 'rain' : 'index'}
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
            data-index-expanded={track.lane === 'how-i-build' ? howExpanded : undefined}
            tabIndex={
              interactive && track.lane === 'what-i-built' ? 0 : undefined
            }
            onMouseEnter={track.lane === 'how-i-build' ? () => {
              if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                setHowHovered(true)
                setHowOpenOverride(null)
              }
            } : undefined}
            onMouseLeave={track.lane === 'how-i-build' ? (event) => {
              setHowHovered(false)
              if (!event.currentTarget.contains(document.activeElement)) setHowOpenOverride(null)
            } : undefined}
            onFocus={track.lane === 'how-i-build' ? () => setHowFocused(true) : undefined}
            onBlur={track.lane === 'how-i-build' ? (event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setHowFocused(false)
                setHowOpenOverride(null)
              }
            } : undefined}
            onKeyDown={track.lane === 'how-i-build' ? (event) => {
              if (event.key === 'Escape') {
                event.preventDefault()
                setHowOpenOverride(false)
                onGuideEnd?.()
                howControlRef.current?.focus()
              }
            } : undefined}
          >
            {interactive && track.href ? (
              <button
                ref={howControlRef}
                type="button"
                aria-label={`${track.label} 목록 ${howExpanded ? '접기' : '펼치기'}`}
                aria-controls={`poster-index-${track.id}`}
                aria-expanded={howExpanded}
                className="poster-field-background-link"
                onPointerDown={() => { howOpenAtPointerDown.current = howExpanded }}
                onClick={(event) => {
                  setHowOpenOverride(!(event.detail > 0 ? howOpenAtPointerDown.current : howExpanded))
                  onGuideEnd?.()
                }}
              />
            ) : null}

            {track.lane === 'what-i-built' ? (
              <FeatureNavigation
                interactive={interactive}
                variant="desktop"
                motionEnabled={motionEnabled}
                onMotionToggle={toggleMotion}
              />
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
                id={`poster-index-${track.id}`}
                aria-label={`${track.label} 목록`}
                aria-hidden={!howExpanded}
              >
                {track.items.map((item, itemIndex) => (
                  <li key={item.id}>
                    <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                    {interactive && item.href ? (
                      <Link
                        className="poster-index-link"
                        tabIndex={howExpanded ? undefined : -1}
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
        motionEnabled={motionEnabled}
        onMotionToggle={toggleMotion}
        guidePhase={guidePhase}
        onGuideEnd={onGuideEnd}
      />
    </>
  )
}

export default SeamPosterPrototype
