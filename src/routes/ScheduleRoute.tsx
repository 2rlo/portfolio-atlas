import SchedulePage from '../components/schedule/SchedulePage.tsx'
import { scheduleContent } from '../content/schedule.ts'
import '../styles/qa.css'
import '../styles/schedule.css'

function ScheduleRoute() {
  return <SchedulePage content={scheduleContent} />
}

export default ScheduleRoute
