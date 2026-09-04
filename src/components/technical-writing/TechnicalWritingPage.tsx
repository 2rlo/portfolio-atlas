import { Link } from 'react-router'
import type {
  TechnicalWritingAnnotation,
  TechnicalWritingContent,
  TechnicalWritingReaderGuide,
} from '../../content/content-types.ts'

interface TechnicalWritingPageProps {
  readonly content: TechnicalWritingContent
}

interface EditorialAnnotationProps {
  readonly annotation: TechnicalWritingAnnotation
}

function EditorialAnnotation({ annotation }: EditorialAnnotationProps) {
  return (
    <details className="tw-annotation">
      <summary>
        <span aria-hidden="true">{annotation.marker}</span>
        <strong>WHY THIS LINE</strong>
      </summary>
      <aside className="tw-annotation-panel">
        <p>{annotation.label}</p>
        <h4>{annotation.title}</h4>
        <p>{annotation.body}</p>
      </aside>
    </details>
  )
}

interface ReaderGuideProps {
  readonly guide: TechnicalWritingReaderGuide
}

function ReaderGuide({ guide }: ReaderGuideProps) {
  const titleId = `tw-${guide.id}-title`

  return (
    <article
      className="tw-reader-guide"
      data-reader={guide.id}
      aria-labelledby={titleId}
    >
      <header className="tw-reader-guide-header">
        <div className="tw-reader-guide-index" aria-hidden="true">
          {guide.index}
        </div>
        <div>
          <p>{guide.label}</p>
          <h3 id={titleId}>{guide.role}</h3>
          <span>{guide.purpose}</span>
        </div>
      </header>

      <p className="tw-reader-permission">{guide.permission}</p>

      <ol className="tw-reader-steps">
        {guide.steps.map((step) => (
          <li data-annotated={Boolean(step.annotation)} key={step.index}>
            <span className="tw-step-index">{step.index}</span>
            <div className="tw-step-copy">
              <strong>{step.action}</strong>
              <p>{step.detail}</p>
              {step.annotation ? (
                <EditorialAnnotation annotation={step.annotation} />
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <footer>
        <span>HAND-OFF</span>
        <p>{guide.handoff}</p>
      </footer>
    </article>
  )
}

interface SectionHeadingProps {
  readonly id: string
  readonly eyebrow: string
  readonly title: string
  readonly summary?: string
}

function SectionHeading({ id, eyebrow, title, summary }: SectionHeadingProps) {
  return (
    <header className="tw-section-heading">
      <p>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {summary ? <span>{summary}</span> : null}
    </header>
  )
}

function TechnicalWritingPage({ content }: TechnicalWritingPageProps) {
  return (
    <main className="technical-writing-page" id="main-content">
      <section className="tw-hero" aria-labelledby="technical-writing-title">
        <div className="tw-hero-proof-rail" aria-hidden="true">
          <span>READ</span>
          <span>DECIDE</span>
          <span>ACT</span>
        </div>

        <Link className="tw-back" to="/">
          <span aria-hidden="true">←</span> HOW I BUILD
        </Link>

        <div className="tw-hero-title-block">
          <p>{content.hero.eyebrow}</p>
          <h1 id="technical-writing-title">
            {content.hero.titleLines.map((line, index) => (
              <span className={index === 1 ? 'is-offset' : undefined} key={line}>
                {line}
              </span>
            ))}
          </h1>
        </div>

        <div className="tw-hero-thesis">
          <p>
            {content.hero.thesis.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <small>{content.meta.disclosure}</small>
        </div>

        <dl className="tw-hero-coordinates">
          {content.hero.coordinates.map((coordinate, index) => (
            <div key={coordinate.label}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <dt>{coordinate.label}</dt>
              <dd>{coordinate.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="tw-reader-section" aria-labelledby="tw-reader-title">
        <div className="tw-section-frame">
          <header className="tw-reader-intro">
            <div>
              <p>{content.reader.eyebrow}</p>
              <h2 id="tw-reader-title">{content.reader.title}</h2>
            </div>
            <div>
              <span>{content.reader.question}</span>
              <strong>{content.reader.decision}</strong>
            </div>
          </header>

          <div className="tw-reader-spread" aria-label="작성 권한과 열람 권한 안내 비교">
            <div className="tw-shared-context">
              <span>SAME FEATURE</span>
              <strong>{content.reader.commonContext}</strong>
              <span>DIFFERENT ACTION</span>
            </div>

            <div className="tw-reader-guides">
              {content.reader.guides.map((guide) => (
                <ReaderGuide guide={guide} key={guide.id} />
              ))}
            </div>
          </div>

          <aside className="tw-action-structure" aria-label="행동 중심 사용자 시나리오 구조">
            <p>SECONDARY PATTERN / ACTION SCENARIO</p>
            <ol>
              {content.reader.actionStructure.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
            <span>독자가 끝내야 할 행동과 예외를 같은 순서 안에 둔다.</span>
          </aside>

          <section className="tw-reader-evolution" aria-labelledby="tw-evolution-title">
            <header>
              <p>AUDIENCE MODEL / EVOLUTION</p>
              <h3 id="tw-evolution-title">
                제품의 권한 모델이 바뀌자, 문서의 독자 모델도 다시 설계했다.
              </h3>
            </header>

            <ol>
              <li>
                <span>01</span>
                <p>{content.reader.evolution.before.label}</p>
                <strong>{content.reader.evolution.before.title}</strong>
                <small>{content.reader.evolution.before.description}</small>
              </li>
              <li className="is-pressure">
                <span>02</span>
                <p>{content.reader.evolution.pressure.label}</p>
                <strong>{content.reader.evolution.pressure.title}</strong>
                <ul>
                  {content.reader.evolution.pressure.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
              <li>
                <span>03</span>
                <p>{content.reader.evolution.after.label}</p>
                <strong>{content.reader.evolution.after.title}</strong>
                <small>{content.reader.evolution.after.description}</small>
              </li>
            </ol>

            <p className="tw-evolution-takeaway">
              {content.reader.evolution.takeaway}
            </p>
          </section>
        </div>
      </section>

      <section
        className="tw-implementation-section"
        aria-labelledby="tw-implementation-title"
      >
        <div className="tw-section-frame">
          <SectionHeading
            id="tw-implementation-title"
            eyebrow={content.implementation.eyebrow}
            title={content.implementation.title}
            summary={content.implementation.summary}
          />

          <div className="tw-api-layout">
            <article className="tw-api-document" aria-labelledby="tw-api-title">
              <header>
                <p>{content.implementation.artifact.label}</p>
                <span>RECONSTRUCTED / PUBLIC-SAFE</span>
              </header>

              <div className="tw-api-endpoint">
                <span>{content.implementation.artifact.method}</span>
                <h3 id="tw-api-title">{content.implementation.artifact.path}</h3>
                <small>{content.implementation.artifact.title}</small>
              </div>

              <dl className="tw-api-purpose">
                <div>
                  <dt>PURPOSE</dt>
                  <dd>{content.implementation.artifact.purpose}</dd>
                </div>
                <div>
                  <dt>AUTHORIZATION</dt>
                  <dd>{content.implementation.artifact.authorization}</dd>
                </div>
              </dl>

              <section className="tw-api-request" aria-labelledby="tw-api-request-title">
                <h4 id="tw-api-request-title">REQUEST</h4>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Field</th>
                      <th scope="col">Type</th>
                      <th scope="col">Required</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.implementation.artifact.request.map((field) => (
                      <tr key={field.field}>
                        <th scope="row">{field.field}</th>
                        <td data-label="Type">{field.type}</td>
                        <td data-label="Required">{field.required}</td>
                        <td data-label="Description">{field.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section className="tw-api-response" aria-labelledby="tw-api-response-title">
                <h4 id="tw-api-response-title">RESPONSE / BEHAVIOR</h4>
                <dl>
                  {content.implementation.artifact.outcomes.map((outcome) => (
                    <div key={outcome.status}>
                      <dt>{outcome.status}</dt>
                      <dd>
                        <code>{outcome.changed}</code>
                        <span>{outcome.meaning}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <p>{content.implementation.artifact.behavior}</p>
                <EditorialAnnotation
                  annotation={content.implementation.artifact.annotation}
                />
              </section>
            </article>

            <aside className="tw-api-notes" aria-label="Internal API Reference 작성 판단">
              <dl>
                {content.implementation.notes.map((note) => (
                  <div key={note.label}>
                    <dt>{note.label}</dt>
                    <dd>{note.value}</dd>
                  </div>
                ))}
              </dl>

              <details className="tw-not-formalized">
                <summary>NOT FORMALIZED</summary>
                <ul>
                  {content.implementation.notFormalized.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            </aside>
          </div>
        </div>
      </section>

      <section className="tw-operations-section" aria-labelledby="tw-operations-title">
        <div className="tw-section-frame">
          <SectionHeading
            id="tw-operations-title"
            eyebrow={content.operations.eyebrow}
            title={content.operations.title}
            summary={content.operations.summary}
          />

          <div className="tw-runbook-pair" aria-label="Deployment와 Recovery 책임 비교">
            {content.operations.artifacts.map((artifact, index) => (
              <article key={artifact.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{artifact.label}</p>
                <h3>{artifact.title}</h3>
                <strong>{artifact.responsibility}</strong>
              </article>
            ))}
            <span className="tw-runbook-link" aria-hidden="true">
              ↔
            </span>
          </div>

          <ol className="tw-safe-flow" aria-label="위험한 기술 절차의 작성 순서">
            {content.operations.flow.map((step) => (
              <li data-tone={step.tone} key={step.index}>
                <span>{step.index}</span>
                <p>{step.label}</p>
                <strong>{step.title}</strong>
                <small>{step.description}</small>
              </li>
            ))}
          </ol>

          <section className="tw-verification" aria-labelledby="tw-verification-title">
            <header>
              <p>VERIFICATION MEANING</p>
              <h3 id="tw-verification-title">
                신호가 말하는 것과, 말하지 않는 것.
              </h3>
            </header>

            <div className="tw-verification-head" aria-hidden="true">
              <span>SIGNAL</span>
              <span>증명하는 것</span>
              <span>증명하지 않는 것</span>
            </div>
            <dl>
              {content.operations.verification.map((item) => (
                <div key={item.signal}>
                  <dt>{item.signal}</dt>
                  <dd>
                    <span>증명</span>
                    {item.proves}
                  </dd>
                  <dd>
                    <span>보장하지 않음</span>
                    {item.doesNotProve}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <aside className="tw-rollback-boundary">
            <p>BOUNDARY / STOP RULE</p>
            <h3>{content.operations.rollbackBoundary.title}</h3>
            <strong>{content.operations.rollbackBoundary.statement}</strong>
            <span>{content.operations.rollbackBoundary.stopRule}</span>
          </aside>
        </div>
      </section>

      <section className="tw-principles-section" aria-labelledby="tw-principles-title">
        <div className="tw-section-frame">
          <SectionHeading
            id="tw-principles-title"
            eyebrow={content.principles.eyebrow}
            title={content.principles.title}
          />

          <ol className="tw-principles-list">
            {content.principles.items.map((principle) => (
              <li key={principle.index}>
                <span>{principle.index}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.statement}</p>
                </div>
                <small>{principle.evidence}</small>
              </li>
            ))}
          </ol>

          <section className="tw-boundary" aria-labelledby="tw-boundary-title">
            <header>
              <p>{content.boundary.eyebrow}</p>
              <h2 id="tw-boundary-title">{content.boundary.title}</h2>
            </header>
            <ul className="tw-boundary-statements">
              {content.boundary.statements.map((statement) => (
                <li key={statement}>{statement}</li>
              ))}
            </ul>
            <aside>
              <p>NOT CLAIMED</p>
              <ul>
                {content.boundary.notClaimed.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </section>
        </div>
      </section>

      <Link className="tw-next" to={content.nextPage.href}>
        <p>{content.nextPage.eyebrow}</p>
        <h2>{content.nextPage.title}</h2>
        <span>{content.nextPage.summary}</span>
        <strong>PAGE OPEN <span aria-hidden="true">→</span></strong>
      </Link>
    </main>
  )
}

export default TechnicalWritingPage
