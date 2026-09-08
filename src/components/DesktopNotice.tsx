import { useState } from 'react'
import './DesktopNotice.css'

const dismissalKey = 'atlas:desktop-notice-dismissed:v1'

function DesktopNotice() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return window.sessionStorage.getItem(dismissalKey) === 'true'
    } catch {
      return false
    }
  })

  function dismiss() {
    setDismissed(true)

    try {
      window.sessionStorage.setItem(dismissalKey, 'true')
    } catch {
      // The notice remains dismissible when browser storage is unavailable.
    }
  }

  if (dismissed) return null

  return (
    <aside className="desktop-notice" aria-labelledby="desktop-notice-title">
      <div className="desktop-notice-copy">
        <p className="desktop-notice-title" id="desktop-notice-title">
          데스크톱 화면에 최적화되어 있어요
        </p>
        <p className="desktop-notice-description">
          PC에서 더 편하게 둘러보세요.
        </p>
      </div>
      <button
        className="desktop-notice-dismiss"
        type="button"
        aria-label="데스크톱 이용 안내 닫기"
        onClick={dismiss}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </aside>
  )
}

export default DesktopNotice
