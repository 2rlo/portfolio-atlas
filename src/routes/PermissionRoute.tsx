import PermissionPage from '../components/permission/PermissionPage.tsx'
import { permissionContent } from '../content/permission.ts'
import '../styles/qa.css'
import '../styles/permission.css'

function PermissionRoute() {
  return <PermissionPage content={permissionContent} />
}

export default PermissionRoute
