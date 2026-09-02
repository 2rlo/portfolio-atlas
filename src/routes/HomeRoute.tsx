import { useSearchParams } from 'react-router'
import SeamPosterPrototype, {
  type CoverTreatment,
  type DisplayTreatment,
} from '../components/home/SeamPosterPrototype.tsx'
import { homeContent } from '../content/home.ts'

const treatments = new Set<CoverTreatment>(['t1', 't2', 't3'])
const displayTreatments = new Set<DisplayTreatment>(['t0', 't1', 't2'])

function HomeRoute() {
  const [searchParams] = useSearchParams()
  const requestedStudy = searchParams.get('study')
  const requestedDisplay = searchParams.get('display')
  const isStaticStudy = treatments.has(requestedStudy as CoverTreatment)
  const isDisplayStudy = displayTreatments.has(
    requestedDisplay as DisplayTreatment,
  )
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
        interactive={!isStaticStudy && !isDisplayStudy}
      />
    </main>
  )
}

export default HomeRoute
