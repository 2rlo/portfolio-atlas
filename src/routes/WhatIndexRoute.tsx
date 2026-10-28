import { Link } from 'react-router'
import { whatIndexContent } from '../content/what-index.ts'
import '../styles/what-index.css'

function WhatIndexRoute() {
  return (
    <main className="what-index-page" id="main-content">
      <Link className="what-index-back" to="/">← 홈으로</Link>
      <header className="what-index-header">
        <div>
          <p className="what-index-eyebrow">{whatIndexContent.eyebrow}</p>
          <h1>{whatIndexContent.titleLines.map((line) => <span key={line}>{line}</span>)}</h1>
        </div>
        <p className="what-index-introduction">{whatIndexContent.introduction}</p>
      </header>
      <nav className="what-index-groups" aria-label="만든 제품 전체 목록">
        {whatIndexContent.groups.map((group, groupIndex) => (
          <section key={group.id} aria-labelledby={`what-index-${group.id}`}>
            <header>
              <span aria-hidden="true">{String(groupIndex + 1).padStart(2, '0')}</span>
              <h2 id={`what-index-${group.id}`}>{group.label}</h2>
            </header>
            <ul>
              {group.features.map((feature) => (
                <li key={feature.id}>
                  <Link to={feature.href}>
                    <span>{feature.name}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </main>
  )
}

export default WhatIndexRoute
