import DeveloperStatusPage from '../components/developer-status/DeveloperStatusPage.tsx'
import { developerStatusContent } from '../content/developer-status.ts'
import '../styles/qa.css'
import '../styles/developer-status.css'

function DeveloperStatusRoute() {
  return <DeveloperStatusPage content={developerStatusContent} />
}

export default DeveloperStatusRoute
