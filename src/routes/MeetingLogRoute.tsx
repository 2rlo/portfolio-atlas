import MeetingLogPage from '../components/meeting-log/MeetingLogPage.tsx'
import { meetingLogContent } from '../content/meeting-log.ts'
import '../styles/qa.css'
import '../styles/meeting-log.css'

function MeetingLogRoute() {
  return <MeetingLogPage content={meetingLogContent} />
}

export default MeetingLogRoute
