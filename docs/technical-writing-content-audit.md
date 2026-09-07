# Technical Writing Content Audit

- Status: Implementation contract
- Updated: 2026-09-04
- Scope: `HOW I BUILD → Technical Writing`
- Public boundary: reconstructed and sanitized content only

This audit records how dated private evidence becomes a concise public page. The
application never reads the source files at runtime, and the public samples do not
preserve private names, paths, endpoints, identifiers, or one-to-one source prose.

## 1. Source audit

| Sample | Audience | Purpose | Writing decision | Structure | Evolution | Boundary | Public-safe excerpt | Missing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Role-specific quality guide pair | A person who can change a quality record / a person who can only read it | Help each reader complete the next action available to them | Keep the screen context shared, but change the verbs, warnings, and hand-off path with the effective permission | First task → permission range → action sequence → exception | Snapshot before the combined guide | It does not prove faster onboarding, fewer questions, or higher understanding | `OPEN → EDIT → REGENERATE → CONFIRM` / `READ → CHECK → REQUEST` | No measured reader outcome |
| Unified user guide | Readers whose access comes from a role template plus individual grants or removals | Explain common product flows without pretending that every person with one role label sees the same controls | Explain visible controls through effective permission, then retain representative template ranges as orientation | Shared boundary → common entry → template range → feature flows → troubleshooting | Fixed role guides → template and individual override model → one guide with permission caveats | A code-based guide does not prove deployment, data, provider, or account state | `TEMPLATE + INDIVIDUAL OVERRIDE → EFFECTIVE ACCESS` | No usability study of the combined guide |
| Internal API reference | A developer maintaining the current implementation | Preserve route coverage and the conditions, outputs, and exceptions needed to reason about a call | Put shared authentication and request rules before the route index; expand complex calls with request, response, and behavior semantics | Common rules → complete route index → detailed contract → exception meaning | Current implementation snapshot with a dated code basis | It is not external partner documentation, an SDK guide, or proof of runtime availability | Reconstructed event intake contract with `accepted`, `ignored`, and unchanged-result semantics | Endpoint sections are not fully normalized; no shared error model or quickstart |
| Deployment and recovery runbooks | An operator preparing or responding to a risky change | Make the order, evidence, and stop conditions explicit before commands are executed | Put preconditions and read-only observation before mutation; say what each signal proves and does not prove; separate application rollback from data rollback | Preconditions → observe → act → verify → stop or return | Deployment and recovery remain paired responsibilities | Draft runbooks do not prove repeated deployment success, automated recovery, or a full restore drill | `PROCESS / READINESS / PUBLIC TARGET` verification meanings | Current host state, recent successful execution, backup policy, and restore drill remain separately verifiable |

## 2. Supported claims

- The same quality-record screen was explained differently to a writer and a
  read-only viewer because their available actions and hand-off paths differed.
- When the product moved from fixed role snapshots to role templates plus individual
  overrides, the guide changed to explain effective permission alongside the shared
  product flow.
- The internal API reference records common authorization and request conditions,
  route coverage, examples, and the meaning of non-success or no-change states.
- Deployment and recovery writing puts prerequisites and read-only checks before
  mutation, distinguishes verification signals, and retains explicit stop boundaries.
- The recurring writing pattern is reader → purpose → action → evidence → boundary.

## 3. Claims intentionally excluded

- Reduced onboarding time, support questions, or training cost.
- Improved user understanding, adoption, productivity, or documentation quality score.
- External SDK documentation, a developer portal, or partner-facing API ownership.
- Repeated production deployment success, automatic end-to-end rollback, completed
  disaster recovery, or a verified restore drill.
- A formal organization-wide writing style guide, documentation KPI, template
  governance program, or AI writing evaluation pipeline.

## 4. Storyboard

1. **Hero / reader lens** — one sentence thesis and the four coordinates used to frame
   every sample: audience, purpose, action, boundary.
2. **Writing for the reader** — one shared quality-record context split into a writer
   guide and a viewer guide, with one proof mark per decisive sentence.
3. **Audience model evolution** — role-specific snapshots → permission model change →
   one guide that explains shared flows and effective access together.
4. **Writing for implementation** — a reconstructed internal event API excerpt and a
   margin annotation about response-state meaning.
5. **Writing for safe action** — paired deployment/recovery artifacts, ordered action
   grammar, verification meaning matrix, and application/data rollback boundary.
6. **Writing principles** — only the four patterns repeated across the reviewed
   evidence.
7. **Boundary / next** — explicit non-claims and a route to AI-native Engineering.

## 5. Interaction contract

- The page uses one repeated interaction: a native `details` disclosure styled as an
  editorial margin proof mark.
- The marked sentence, summary control, and annotation stay adjacent in DOM order.
- Hover is supplementary; keyboard focus and mobile tap expose the same note.
- Reader guides are separate labelled articles. On mobile they stack in writer then
  viewer order rather than shrinking into a two-column miniature.
- API and verification layouts become linear definition structures without horizontal
  overflow.
