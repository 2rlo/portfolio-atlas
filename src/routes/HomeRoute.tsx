import { Link, useSearchParams } from 'react-router'
import SeamPosterPrototype, {
  type CoverTreatment,
  type DisplayTreatment,
} from '../components/home/SeamPosterPrototype.tsx'
import { homeContent } from '../content/home.ts'
import { useTossEntryGuide } from '../components/home/useTossEntryGuide.ts'
import '../styles/home-introduction.css'

const treatments = new Set<CoverTreatment>(['t1', 't2', 't3'])
const displayTreatments = new Set<DisplayTreatment>(['t0', 't1', 't2'])

function HomeRoute({ tossEntry = false }: { readonly tossEntry?: boolean }) {
  const [searchParams] = useSearchParams()
  const requestedStudy = searchParams.get('study')
  const requestedDisplay = searchParams.get('display')
  const isStaticStudy = treatments.has(requestedStudy as CoverTreatment)
  const isDisplayStudy = displayTreatments.has(
    requestedDisplay as DisplayTreatment,
  )
  const interactive = !isStaticStudy && !isDisplayStudy
  const guide = useTossEntryGuide(tossEntry && interactive)
  const displayTreatment = isDisplayStudy
    ? (requestedDisplay as DisplayTreatment)
    : isStaticStudy
      ? undefined
      : 't2'
  const treatment: CoverTreatment = isDisplayStudy
    ? 't3'
    : isStaticStudy
      ? (requestedStudy as CoverTreatment)
      : 't3'

  return (
    <main id="main-content">
      <SeamPosterPrototype
        tracks={homeContent.tracks}
        treatment={treatment}
        displayTreatment={displayTreatment}
        interactive={interactive}
        guidePhase={guide.phase}
        onGuideEnd={guide.dismiss}
      />
      {interactive ? (
        <section className="home-introduction" aria-labelledby="home-introduction-title">
          <header>
            <p>{homeContent.introduction.eyebrow}</p>
            <h2 id="home-introduction-title">{homeContent.introduction.title}</h2>
          </header>
          <div className="home-introduction-copy">
            <p>{homeContent.introduction.summary}</p>
            <p>{homeContent.introduction.ownership}</p>
          </div>
          <nav aria-label="경험을 살펴보는 세 가지 출발점">
            {homeContent.introduction.paths.map((path) => (
              <Link key={path.href} to={path.href}>
                <strong>{path.title}</strong>
                <span>{path.body}</span>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </nav>
        </section>
      ) : null}
    </main>
  )
}

export default HomeRoute
