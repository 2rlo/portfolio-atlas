import { createBrowserRouter } from 'react-router'
import App from '../App.tsx'
import DocumentationSystemRoute from '../routes/DocumentationSystemRoute.tsx'
import HomeRoute from '../routes/HomeRoute.tsx'

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
    ],
  },
])
