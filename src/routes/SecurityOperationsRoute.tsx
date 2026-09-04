import { SecurityOperationsPage } from '../components/security-operations/SecurityOperationsPage.tsx'
import { securityOperationsContent } from '../content/security-operations.ts'
import '../styles/security-operations.css'

function SecurityOperationsRoute() {
  return <SecurityOperationsPage content={securityOperationsContent} />
}

export default SecurityOperationsRoute
