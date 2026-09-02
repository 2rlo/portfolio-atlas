import { Link } from 'react-router'
import type { DocumentationSystemContent } from '../../content/content-types.ts'
import ArtifactShelf from './ArtifactShelf.tsx'
import EvolutionTimeline from './EvolutionTimeline.tsx'
import KnowledgeMap from './KnowledgeMap.tsx'

interface DocumentationSystemPageProps {
  readonly content: DocumentationSystemContent
}

function DocumentationSystemPage({ content }: DocumentationSystemPageProps) {
  return (
    <main className="documentation-page" id="main-content">
      <section className="documentation-hero" aria-labelledby="documentation-title">
        <div className="documentation-hero-field" aria-hidden="true" />

        <div className="documentation-hero-frame">
          <header className="documentation-hero-heading">
            <Link className="documentation-breadcrumb" to="/">
              <span aria-hidden="true">←</span>
              {content.hero.eyebrow}
            </Link>

            <h1 id="documentation-title">
              {content.hero.titleLines.map((line, lineIndex) => (
                <span className={lineIndex === 1 ? 'is-offset' : undefined} key={line}>
                  {line}
                </span>
              ))}
            </h1>
          </header>

          <div className="documentation-thesis">
            <p className="documentation-supporting-label">
              {content.hero.supportingLabel}
            </p>
            <p className="documentation-thesis-copy">{content.hero.thesis}</p>
            <p className="documentation-summary">{content.hero.summary}</p>
            <aside className="documentation-scope" aria-label="Documentation system scope">
              <strong>{content.hero.scope.eyebrow}</strong>
              <p>{content.hero.scope.statement}</p>
              <ul aria-label="Included documentation artifacts">
                {content.hero.scope.artifacts.map((artifact) => (
                  <li key={artifact}>{artifact}</li>
                ))}
              </ul>
              <p>{content.hero.scope.boundary}</p>
            </aside>
          </div>

          <KnowledgeMap
            nodes={content.knowledgeMap.nodes}
            edges={content.knowledgeMap.edges}
            accessibleSummary={content.knowledgeMap.accessibleSummary}
            taxonomy={content.knowledgeMap.taxonomy}
          />
        </div>
      </section>

      <ArtifactShelf
        eyebrow={content.artifacts.eyebrow}
        title={content.artifacts.title}
        introduction={content.artifacts.introduction}
        disclosure={content.meta.disclosure}
        primaryArtifacts={content.artifacts.primaryItems}
        libraryArtifacts={content.artifacts.libraryItems}
      />

      <EvolutionTimeline
        eyebrow={content.evolution.eyebrow}
        headline={content.evolution.headline}
        introduction={content.evolution.introduction}
        takeaway={content.evolution.takeaway}
        scenes={content.evolution.scenes}
        currentRule={content.evolution.currentRule}
      />

      <section className="documentation-principle" aria-labelledby="principle-title">
        <p className="section-eyebrow">BOUNDARY / CURRENT PRACTICE</p>
        <h2 id="principle-title">{content.principle.statement}</h2>
        <p className="documentation-principle-boundary">
          {content.principle.boundary.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <p className="documentation-principle-claim">{content.principle.claimBoundary}</p>
        <details className="documentation-principle-unverified">
          <summary>NOT YET VERIFIED / AUTOMATED</summary>
          <ul>
            {content.principle.notVerified.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      </section>

      <Link
        className="documentation-next"
        to={content.nextPage.href}
        aria-labelledby="next-page-title"
      >
        <p className="section-eyebrow">{content.nextPage.eyebrow}</p>
        <h2 id="next-page-title">{content.nextPage.title}</h2>
        <p>{content.nextPage.summary}</p>
        <span>PAGE IN DEVELOPMENT</span>
      </Link>
    </main>
  )
}

export default DocumentationSystemPage
