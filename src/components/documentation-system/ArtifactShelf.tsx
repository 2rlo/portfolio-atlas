import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import type { DocumentationArtifact } from '../../content/content-types.ts'

interface ArtifactShelfProps {
  readonly eyebrow: string
  readonly title: string
  readonly introduction: string
  readonly disclosure: string
  readonly primaryArtifacts: readonly DocumentationArtifact[]
  readonly libraryArtifacts: readonly DocumentationArtifact[]
}

interface ArtifactExcerptProps {
  readonly artifact: DocumentationArtifact
}

function ArtifactExcerpt({ artifact }: ArtifactExcerptProps) {
  return (
    <article className="artifact-excerpt" aria-labelledby="artifact-excerpt-title">
      <header className="artifact-excerpt-header">
        <div>
          <span>{artifact.index} / SELECTED EXCERPT</span>
          <h3 id="artifact-excerpt-title">{artifact.title}</h3>
        </div>
        <p>RECONSTRUCTED / PUBLIC-SAFE</p>
      </header>

      <pre aria-label={`${artifact.title}의 공개용 재구성 예시`}>
        <code>{artifact.excerpt.join('\n')}</code>
      </pre>

      <footer className="artifact-excerpt-boundary">
        <span>BOUNDARY</span>
        <p>{artifact.boundary}</p>
      </footer>
    </article>
  )
}

interface ArtifactDetailProps {
  readonly artifact: DocumentationArtifact | null
  readonly onClose: () => void
}

function ArtifactDetail({ artifact, onClose }: ArtifactDetailProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (artifact && !dialog.open) {
      dialog.showModal()
    } else if (!artifact && dialog.open) {
      dialog.close()
    }
  }, [artifact])

  return (
    <dialog
      className="artifact-detail"
      ref={dialogRef}
      aria-labelledby="artifact-detail-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onClose={onClose}
    >
      {artifact ? (
        <article className="artifact-detail-sheet">
          <header className="artifact-detail-header">
            <p>{artifact.index}</p>
            <button type="button" onClick={onClose} aria-label="문서 상세 닫기">
              CLOSE <span aria-hidden="true">×</span>
            </button>
            <h2 id="artifact-detail-title">{artifact.title}</h2>
            <p>RECONSTRUCTED / PUBLIC-SAFE</p>
          </header>

          <div className="artifact-detail-notes">
            <section>
              <h3>WHY</h3>
              <p>{artifact.why}</p>
            </section>
            <section>
              <h3>FOR</h3>
              <p>{artifact.audience.join(' / ')}</p>
            </section>
            <section>
              <h3>BOUNDARY</h3>
              <p>{artifact.boundary}</p>
            </section>
            <section>
              <h3>UPDATE</h3>
              <p>{artifact.maintenance}</p>
            </section>
          </div>

          <section className="artifact-detail-evidence" aria-labelledby="artifact-evidence-title">
            <h3 id="artifact-evidence-title">RESPONSIBILITY / EVIDENCE</h3>
            <ol>
              {artifact.evidence.map((evidence) => (
                <li key={evidence.label}>
                  <span>{evidence.label}</span>
                  {evidence.statement ? <p>{evidence.statement}</p> : null}
                  {evidence.sequence ? (
                    <ol aria-label={`${evidence.label} 흐름`}>
                      {evidence.sequence.map((item, index) => (
                        <li key={item}>
                          <strong>{item}</strong>
                          {index < evidence.sequence!.length - 1 ? (
                            <i aria-hidden="true">→</i>
                          ) : null}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  {evidence.items ? (
                    <ul>
                      {evidence.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <section className="artifact-detail-sample">
            <h3>SAMPLE / SANITIZED EXCERPT</h3>
            <pre>
              <code>{artifact.excerpt.join('\n')}</code>
            </pre>
          </section>
        </article>
      ) : null}
    </dialog>
  )
}

function ArtifactShelf({
  eyebrow,
  title,
  introduction,
  disclosure,
  primaryArtifacts,
  libraryArtifacts,
}: ArtifactShelfProps) {
  const [selectedArtifactId, setSelectedArtifactId] = useState(
    primaryArtifacts[0]?.id ?? '',
  )
  const [previewArtifactId, setPreviewArtifactId] = useState<string | null>(null)
  const [detailArtifactId, setDetailArtifactId] = useState<string | null>(null)
  const activeArtifactId = previewArtifactId ?? selectedArtifactId
  const selectedArtifact =
    primaryArtifacts.find((artifact) => artifact.id === activeArtifactId) ??
    primaryArtifacts[0]
  const detailArtifact =
    primaryArtifacts.find((artifact) => artifact.id === detailArtifactId) ??
    libraryArtifacts.find((artifact) => artifact.id === detailArtifactId) ??
    null

  function openArtifact(artifactId: string) {
    setSelectedArtifactId(artifactId)
    setPreviewArtifactId(null)
    setDetailArtifactId(artifactId)
  }

  return (
    <section className="artifact-section" aria-labelledby="artifact-section-title">
      <div className="artifact-section-header">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 id="artifact-section-title" lang="ko">{title}</h2>
        <p className="artifact-introduction">{introduction}</p>
        <p className="artifact-disclosure">{disclosure}</p>
      </div>

      <div className="artifact-workbench">
        <div className="artifact-index-column">
          <ol
            className="artifact-index"
            aria-label="대표 문서"
            onMouseLeave={() => setPreviewArtifactId(null)}
          >
            {primaryArtifacts.map((artifact) => {
              const isSelected = selectedArtifact?.id === artifact.id

              return (
                <li className={isSelected ? 'is-selected' : undefined} key={artifact.id}>
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-current={isSelected ? 'true' : undefined}
                    onBlur={() => setPreviewArtifactId(null)}
                    onClick={() => openArtifact(artifact.id)}
                    onFocus={() => setPreviewArtifactId(artifact.id)}
                    onMouseEnter={() => setPreviewArtifactId(artifact.id)}
                  >
                    <span className="artifact-index-number">{artifact.index}</span>
                    <span className="artifact-index-copy">
                      <small>{artifact.responsibility}</small>
                      <strong>{artifact.title}</strong>
                      <span>{artifact.summary}</span>
                    </span>
                    <span className="artifact-index-mark" aria-hidden="true">
                      ↗
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <details className="artifact-library">
            <summary>
              <span>DOCUMENT LIBRARY</span>
              <strong>추가 문서 {libraryArtifacts.length}개</strong>
              <span aria-hidden="true">+</span>
            </summary>
            <ol aria-label="추가 문서">
              {libraryArtifacts.map((artifact) => (
                <li key={artifact.id}>
                  {artifact.href ? (
                    <Link to={artifact.href}>
                      <span>{artifact.index}</span>
                      <strong>{artifact.title}</strong>
                      <small>{artifact.responsibility}</small>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => setDetailArtifactId(artifact.id)}
                    >
                      <span>{artifact.index}</span>
                      <strong>{artifact.title}</strong>
                      <small>{artifact.responsibility}</small>
                    </button>
                  )}
                </li>
              ))}
            </ol>
          </details>
        </div>

        {selectedArtifact ? <ArtifactExcerpt artifact={selectedArtifact} /> : null}
      </div>

      <ArtifactDetail
        artifact={detailArtifact}
        onClose={() => setDetailArtifactId(null)}
      />
    </section>
  )
}

export default ArtifactShelf
