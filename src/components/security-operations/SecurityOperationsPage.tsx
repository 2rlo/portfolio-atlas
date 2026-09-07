import { useState } from 'react'
import { Link } from 'react-router'
import type {
  SecurityOperationsAnnotation,
  SecurityOperationsAnnotationId,
  SecurityOperationsContent,
  SecurityOperationsDeployStep,
  SecurityOperationsDeployStepId,
} from '../../content/content-types.ts'

interface SecurityOperationsPageProps {
  readonly content: SecurityOperationsContent
}

interface SectionHeadingProps {
  readonly id: string
  readonly eyebrow: string
  readonly title: string
  readonly summary?: string
  readonly inverted?: boolean
}

function SectionHeading({
  id,
  eyebrow,
  title,
  summary,
  inverted = false,
}: SectionHeadingProps) {
  return (
    <header className="so-section-heading" data-inverted={inverted}>
      <p>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {summary ? <span>{summary}</span> : null}
    </header>
  )
}

type PermissionStateValue = 'base' | 'grant' | 'revoke' | 'none'

const permissionStateCopy: Record<
  PermissionStateValue,
  { readonly mark: string; readonly label: string }
> = {
  base: { mark: '●', label: '기본' },
  grant: { mark: '+', label: '허용' },
  revoke: { mark: '−', label: '회수' },
  none: { mark: '—', label: '없음' },
}

interface PermissionStateProps {
  readonly value: PermissionStateValue
}

function PermissionState({ value }: PermissionStateProps) {
  const state = permissionStateCopy[value]

  return (
    <span className="so-permission-state" data-state={value}>
      <span aria-hidden="true">{state.mark}</span>
      <small>{state.label}</small>
    </span>
  )
}

interface PermissionAnnotationControlProps {
  readonly annotation: SecurityOperationsAnnotation
  readonly active: boolean
  readonly onActivate: (id: SecurityOperationsAnnotationId) => void
}

function PermissionAnnotationControl({
  annotation,
  active,
  onActivate,
}: PermissionAnnotationControlProps) {
  const activate = () => onActivate(annotation.id)

  return (
    <button
      aria-controls="so-permission-annotation"
      aria-pressed={active}
      className="so-annotation-control"
      data-active={active}
      onClick={activate}
      onFocus={activate}
      onPointerEnter={activate}
      type="button"
    >
      <span>{annotation.index}</span>
      <strong>{annotation.label}</strong>
    </button>
  )
}

interface PermissionAnnotationPanelProps {
  readonly annotation: SecurityOperationsAnnotation
}

function PermissionAnnotationPanel({ annotation }: PermissionAnnotationPanelProps) {
  return (
    <aside
      aria-live="polite"
      className="so-annotation-panel"
      id="so-permission-annotation"
    >
      <div>
        <span>{annotation.index}</span>
        <p>설계 이유</p>
      </div>
      <strong>{annotation.title}</strong>
      <p>{annotation.body}</p>
    </aside>
  )
}

interface DeployStepControlProps {
  readonly step: SecurityOperationsDeployStep
  readonly active: boolean
  readonly onActivate: (id: SecurityOperationsDeployStepId) => void
}

function DeployStepControl({
  step,
  active,
  onActivate,
}: DeployStepControlProps) {
  const activate = () => onActivate(step.id)

  return (
    <li data-active={active} data-tone={step.tone}>
      <button
        aria-controls="so-deploy-annotation"
        aria-pressed={active}
        onClick={activate}
        onFocus={activate}
        onPointerEnter={activate}
        type="button"
      >
        <span>{step.index}</span>
        <strong>{step.label}</strong>
        <small>{step.title}</small>
      </button>
    </li>
  )
}

interface DeployAnnotationPanelProps {
  readonly step: SecurityOperationsDeployStep
}

function DeployAnnotationPanel({ step }: DeployAnnotationPanelProps) {
  return (
    <aside aria-live="polite" className="so-deploy-annotation" id="so-deploy-annotation">
      <header>
        <span>{step.index}</span>
        <p>{step.label}</p>
      </header>
      <div>
        <strong>{step.title}</strong>
        <p>{step.summary}</p>
      </div>
      <dl>
        <div>
          <dt>확인한 범위</dt>
          <dd>{step.proves}</dd>
        </div>
        <div>
          <dt>별도 확인이 필요한 범위</dt>
          <dd>{step.doesNotProve}</dd>
        </div>
      </dl>
    </aside>
  )
}

export function SecurityOperationsPage({ content }: SecurityOperationsPageProps) {
  const [activePermissionAnnotation, setActivePermissionAnnotation] =
    useState<SecurityOperationsAnnotationId>('template')
  const [activeDeployStep, setActiveDeployStep] =
    useState<SecurityOperationsDeployStepId>('readiness')

  const permissionAnnotation =
    content.authorization.annotations.find(
      (annotation) => annotation.id === activePermissionAnnotation,
    ) ?? content.authorization.annotations[0]
  const deployStep =
    content.deployment.steps.find((step) => step.id === activeDeployStep) ??
    content.deployment.steps[0]

  return (
    <main className="security-operations-page" id="main-content">
      <section className="so-hero" aria-labelledby="security-operations-title">
        <Link className="so-back" to="/">
          <span aria-hidden="true">←</span> HOW I BUILD
        </Link>

        <div className="so-hero-index" aria-hidden="true">
          04
        </div>

        <div className="so-hero-copy">
          <p>{content.hero.eyebrow}</p>
          <h1 id="security-operations-title">
            {content.hero.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
        </div>

        <div className="so-hero-thesis">
          <p>
            {content.hero.thesis.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <small>{content.meta.disclosure}</small>
        </div>

        <dl className="so-hero-coordinates">
          {content.hero.coordinates.map((coordinate, index) => (
            <div key={coordinate.label}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <dt>{coordinate.label}</dt>
              <dd>{coordinate.value}</dd>
            </div>
          ))}
        </dl>

        <div className="so-hero-boundary" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="so-authorization" aria-labelledby="so-authorization-title">
        <div className="so-frame">
          <div className="so-authorization-intro">
            <SectionHeading
              eyebrow={content.authorization.eyebrow}
              id="so-authorization-title"
              summary={content.authorization.summary}
              title={content.authorization.title}
            />
            <p>{content.authorization.question}</p>
          </div>

          <article className="so-permission-product" aria-labelledby="so-product-title">
            <header className="so-product-header">
              <div>
                <span>공개용 재구성 화면</span>
                <strong id="so-product-title">{content.authorization.productLabel}</strong>
              </div>
              <p>공개용 합성 데이터</p>
            </header>

            <div className="so-product-grid">
              <aside className="so-member-panel" aria-labelledby="so-members-title">
                <header>
                  <p id="so-members-title">팀원</p>
                  <span>03</span>
                </header>
                <ul>
                  {content.authorization.members.map((member) => (
                    <li aria-current={member.selected ? 'true' : undefined} key={member.id}>
                      <span aria-hidden="true">{member.name.slice(0, 1)}</span>
                      <div>
                        <strong>{member.name}</strong>
                        <small>{member.role}</small>
                      </div>
                      <em>{member.state}</em>
                    </li>
                  ))}
                </ul>
              </aside>

              <section className="so-template-panel" aria-labelledby="so-template-title">
                <header>
                  <span>01</span>
                  <div>
                    <p>권한 템플릿</p>
                    <h3 id="so-template-title">권한 기본값</h3>
                  </div>
                </header>

                <ul className="so-template-list">
                  {content.authorization.templates.map((template) => (
                    <li data-selected={Boolean(template.selected)} key={template.id}>
                      <span aria-hidden="true" />
                      <div>
                        <strong>{template.title}</strong>
                        <small>{template.description}</small>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="so-delegated-permissions">
                  <header>
                    <p>위임 관리 권한</p>
                    <span>별도 권한</span>
                  </header>
                  <ul>
                    {content.authorization.delegated.map((permission) => (
                      <li key={permission.label}>
                        <span aria-hidden="true" data-enabled={permission.enabled} />
                        <div>
                          <strong>{permission.label}</strong>
                          <small>{permission.description}</small>
                        </div>
                        <em>{permission.enabled ? 'ON' : '제한됨'}</em>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="so-matrix-panel" aria-labelledby="so-matrix-title">
                <header>
                  <span>02</span>
                  <div>
                    <p>업무 대상 × 행동</p>
                    <h3 id="so-matrix-title">개인별 예외와 실제 권한</h3>
                  </div>
                </header>

                <div className="so-matrix-legend" aria-label="권한 상태 범례">
                  {(
                    [
                      ['base', '템플릿'],
                      ['grant', '개별 허용'],
                      ['revoke', '개별 회수'],
                    ] as const
                  ).map(([state, label]) => (
                    <span data-state={state} key={state}>
                      <i aria-hidden="true" /> {label}
                    </span>
                  ))}
                </div>

                <div className="so-matrix-scroll">
                  <table>
                    <caption>선택한 구성원의 업무별 행동 권한</caption>
                    <thead>
                      <tr>
                        <th scope="col">업무 대상</th>
                        <th scope="col">조회</th>
                        <th scope="col">편집</th>
                        <th scope="col">관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.authorization.permissionRows.map((row) => (
                        <tr key={`${row.group}-${row.resource}`}>
                          <th scope="row">
                            <small>{row.group}</small>
                            <strong>{row.resource}</strong>
                          </th>
                          <td>
                            <PermissionState value={row.view} />
                          </td>
                          <td>
                            <PermissionState value={row.edit} />
                          </td>
                          <td>
                            <PermissionState value={row.manage} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <ol className="so-permission-formula" aria-label="실제 권한 계산 구조">
                  {content.authorization.formula.map((item, index) => (
                    <li data-tone={item.tone} key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                      {index < content.authorization.formula.length - 1 ? (
                        <i aria-hidden="true">
                          {index === 1
                            ? '−'
                            : index === content.authorization.formula.length - 2
                              ? '='
                              : '+'}
                        </i>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <div className="so-permission-editorial">
              <div className="so-annotation-controls" aria-label="권한 설계 설명">
                {content.authorization.annotations.map((annotation) => (
                  <PermissionAnnotationControl
                    active={annotation.id === activePermissionAnnotation}
                    annotation={annotation}
                    key={annotation.id}
                    onActivate={setActivePermissionAnnotation}
                  />
                ))}
              </div>
              <PermissionAnnotationPanel annotation={permissionAnnotation} />
            </div>
          </article>

          <section className="so-authorization-evolution" aria-labelledby="so-evolution-title">
            <header>
              <p>권한 모델의 변화</p>
              <h3 id="so-evolution-title">접근 제한에서, 운영 가능한 권한 모델로.</h3>
            </header>
            <ol>
              {content.authorization.evolution.map((stage) => (
                <li data-state={stage.state} key={stage.index}>
                  <span>{stage.index}</span>
                  <p>{stage.label}</p>
                  <strong>{stage.title}</strong>
                  <small>{stage.summary}</small>
                </li>
              ))}
            </ol>
            <p>{content.authorization.takeaway}</p>
          </section>
        </div>
      </section>

      <section className="so-security" aria-labelledby="so-security-title">
        <div className="so-frame">
          <SectionHeading
            eyebrow={content.security.eyebrow}
            id="so-security-title"
            inverted
            summary={content.security.summary}
            title={content.security.title}
          />

          <ol className="so-security-decisions">
            {content.security.decisions.map((decision) => (
              <li key={decision.index}>
                <span className="so-decision-index">{decision.index}</span>
                <div data-step="risk">
                  <p>문제</p>
                  <strong>{decision.risk}</strong>
                </div>
                <i aria-hidden="true">→</i>
                <div data-step="decision">
                  <p>설계</p>
                  <strong>{decision.decision}</strong>
                </div>
                <i aria-hidden="true">→</i>
                <div data-step="boundary">
                  <p>적용 범위</p>
                  <strong>{decision.boundary}</strong>
                </div>
                <em>{decision.evidence}</em>
              </li>
            ))}
          </ol>

          <blockquote>{content.security.currentRule}</blockquote>
        </div>
      </section>

      <section className="so-deployment" aria-labelledby="so-deployment-title">
        <div className="so-frame">
          <SectionHeading
            eyebrow={content.deployment.eyebrow}
            id="so-deployment-title"
            inverted
            summary={content.deployment.summary}
            title={content.deployment.title}
          />

          <div className="so-deploy-canvas">
            <ol className="so-deploy-flow" aria-label="배포 상태 전환 단계">
              {content.deployment.steps.map((step) => (
                <DeployStepControl
                  active={step.id === activeDeployStep}
                  key={step.id}
                  onActivate={setActiveDeployStep}
                  step={step}
                />
              ))}
            </ol>
            <DeployAnnotationPanel step={deployStep} />
          </div>

          <section className="so-component-boundary" aria-labelledby="so-component-title">
            <header>
              <p>구성요소별 복구 범위</p>
              <h3 id="so-component-title">API·작업 프로세스·데이터의 복구 범위를 나눴다.</h3>
            </header>
            <dl>
              {content.deployment.components.map((component) => (
                <div data-state={component.state} key={component.label}>
                  <dt>{component.label}</dt>
                  <dd>
                    <strong>{component.mode}</strong>
                    <span>{component.boundary}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </section>

      <section className="so-recovery" aria-labelledby="so-recovery-title">
        <div className="so-frame">
          <SectionHeading
            eyebrow={content.recovery.eyebrow}
            id="so-recovery-title"
            summary={content.recovery.summary}
            title={content.recovery.title}
          />

          <ol className="so-recovery-flow" aria-label="실패에서 수동 재실행까지의 흐름">
            {content.recovery.flow.map((stage) => (
              <li data-state={stage.state} key={stage.index}>
                <span>{stage.index}</span>
                <p>{stage.label}</p>
                <strong>{stage.title}</strong>
                <small>{stage.detail}</small>
              </li>
            ))}
          </ol>

          <div className="so-recovery-modes">
            {content.recovery.modes.map((mode, index) => (
              <section key={mode.label}>
                <header>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p>{mode.label}</p>
                    <h3>{mode.title}</h3>
                  </div>
                </header>
                <ul>
                  {mode.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <aside className="so-known-boundary">
            <p>복구 방식의 적용 범위</p>
            <ul>
              {content.recovery.knownBoundary.map((boundary) => (
                <li key={boundary}>{boundary}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="so-current-boundary" aria-labelledby="so-boundary-title">
        <div className="so-frame">
          <SectionHeading
            eyebrow={content.boundary.eyebrow}
            id="so-boundary-title"
            inverted
            summary={content.boundary.summary}
            title={content.boundary.title}
          />

          <div className="so-boundary-columns">
            <section>
              <header>
                <span>01</span>
                <h3>구현한 범위</h3>
              </header>
              <ul>
                {content.boundary.built.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <header>
                <span>02</span>
                <h3>이 경험에 포함하지 않는 범위</h3>
              </header>
              <ul>
                {content.boundary.notClaimed.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <p className="so-maintenance-rule">
            <span>다시 확인하는 시점</span>
            {content.boundary.maintenanceRule}
          </p>
        </div>
      </section>

      <Link className="so-next" to={content.nextPage.href}>
        <span>{content.nextPage.eyebrow}</span>
        <strong>{content.nextPage.title}</strong>
        <p>{content.nextPage.summary}</p>
        <i aria-hidden="true">↗</i>
      </Link>
    </main>
  )
}
