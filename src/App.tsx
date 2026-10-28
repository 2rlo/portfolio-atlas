import { Link, Outlet } from 'react-router'
import RouteScrollRestoration from './app/RouteScrollRestoration.tsx'
import DesktopNotice from './components/DesktopNotice.tsx'
import './App.css'
import './styles/home-feature-navigation.css'

function App() {
  function focusMainContent() {
    const main = document.getElementById('main-content')
    if (!main) return
    main.tabIndex = -1
    main.focus({ preventScroll: true })
  }

  return (
    <>
      <a className="skip-link" href="#main-content" onClick={focusMainContent}>
        본문으로 건너뛰기
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
      <DesktopNotice />
    </>
  )
}

export default App
