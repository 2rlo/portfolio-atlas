import FeatureValidationPage from '../components/feature-validation/FeatureValidationPage.tsx'
import { featureValidationContent } from '../content/feature-validation.ts'
import '../styles/product-case.css'
import '../styles/feature-validation.css'

function FeatureValidationRoute() {
  return <FeatureValidationPage content={featureValidationContent} />
}

export default FeatureValidationRoute
