import QaPage from '../components/qa/QaPage.tsx'
import { qaContent } from '../content/qa.ts'
import '../styles/qa.css'

function QaRoute() {
  return <QaPage content={qaContent} />
}

export default QaRoute
