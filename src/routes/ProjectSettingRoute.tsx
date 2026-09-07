import ProjectSettingPage from '../components/project-setting/ProjectSettingPage.tsx'
import { projectSettingContent } from '../content/project-setting.ts'
import '../styles/project-setting.css'

function ProjectSettingRoute() {
  return <ProjectSettingPage content={projectSettingContent} />
}

export default ProjectSettingRoute
