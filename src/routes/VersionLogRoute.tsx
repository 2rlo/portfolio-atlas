import VersionLogPage from '../components/version-log/VersionLogPage.tsx'
import { versionLogContent } from '../content/version-log.ts'
import '../styles/qa.css'
import '../styles/version-log.css'

function VersionLogRoute() {
  return <VersionLogPage content={versionLogContent} />
}

export default VersionLogRoute
