import { createBrowserRouter } from 'react-router'
import App from '../App.tsx'
import AiCandidateReviewRoute from '../routes/AiCandidateReviewRoute.tsx'
import AiNativeEngineeringRoute from '../routes/AiNativeEngineeringRoute.tsx'
import CodemapExplorerRoute from '../routes/CodemapExplorerRoute.tsx'
import DocumentationSystemRoute from '../routes/DocumentationSystemRoute.tsx'
import FeatureValidationRoute from '../routes/FeatureValidationRoute.tsx'
import HomeRoute from '../routes/HomeRoute.tsx'
import ProjectSettingRoute from '../routes/ProjectSettingRoute.tsx'
import WorklogReviewRoute from '../routes/WorklogReviewRoute.tsx'
import WorkInProgressRoute from '../routes/WorkInProgressRoute.tsx'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: HomeRoute,
      },
      {
        path: 'how/documentation-system',
        Component: DocumentationSystemRoute,
      },
      {
        path: 'how/documentation-system/artifacts/codemap',
        Component: CodemapExplorerRoute,
      },
      {
        path: 'how/ai-native-engineering',
        Component: AiNativeEngineeringRoute,
      },
      {
        path: 'how/technical-writing',
        Component: WorkInProgressRoute,
      },
      {
        path: 'how/security-operations',
        Component: WorkInProgressRoute,
      },
      {
        path: 'what',
        Component: WorkInProgressRoute,
      },
      {
        path: 'what/feature-validation',
        Component: FeatureValidationRoute,
      },
      {
        path: 'what/worklog-review',
        Component: WorklogReviewRoute,
      },
      {
        path: 'what/ai-candidate-review',
        Component: AiCandidateReviewRoute,
      },
      {
        path: 'what/project-setting',
        Component: ProjectSettingRoute,
      },
      {
        path: 'what/:featureId',
        Component: WorkInProgressRoute,
      },
    ],
  },
], {
  basename,
})
