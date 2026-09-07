import ReportPage from '../components/report/ReportPage.tsx'
import { reportContent } from '../content/report.ts'
import '../styles/qa.css'
import '../styles/report.css'

function ReportRoute() {
  return <ReportPage content={reportContent} />
}

export default ReportRoute
