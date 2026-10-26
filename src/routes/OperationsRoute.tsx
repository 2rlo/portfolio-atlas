import OperationsPage from '../components/operations/OperationsPage.tsx'
import { operationsContent } from '../content/operations.ts'
import '../styles/qa.css'
import '../styles/operations.css'

function OperationsRoute() {
  return <OperationsPage content={operationsContent} />
}

export default OperationsRoute
