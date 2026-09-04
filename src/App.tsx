import { Link, Outlet } from 'react-router'
import RouteScrollRestoration from './app/RouteScrollRestoration.tsx'
import './App.css'

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="page-shell" id="top">
        <header className="site-header">
          <Link className="wordmark" to="/" aria-label="Portfolio Atlas 홈">
            <span className="wordmark-name">JO JEONGWON</span>
            <span className="wordmark-separator" aria-hidden="true">
              {' / '}
            </span>
            <span className="wordmark-title">PORTFOLIO ATLAS</span>
          </Link>
        </header>

        <Outlet />
        <RouteScrollRestoration />
      </div>
    </>
  )
}

export default App
