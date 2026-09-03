import AiNativeEngineeringPage from '../components/ai-native/AiNativeEngineeringPage.tsx'
import { aiNativeEngineeringContent } from '../content/ai-native-engineering.ts'
import '../styles/ai-native-engineering.css'

function AiNativeEngineeringRoute() {
  return <AiNativeEngineeringPage content={aiNativeEngineeringContent} />
}

export default AiNativeEngineeringRoute
