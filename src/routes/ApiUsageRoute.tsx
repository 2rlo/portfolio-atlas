import ApiUsagePage from '../components/api-usage/ApiUsagePage.tsx'
import { apiUsageContent, paidCallLifecycleContent } from '../content/api-usage.ts'
import '../styles/qa.css'
import '../styles/api-usage.css'

function ApiUsageRoute() {
  return <ApiUsagePage content={apiUsageContent} lifecycle={paidCallLifecycleContent} />
}

export default ApiUsageRoute
