# Documentation System Content Audit

- Status: Implementation contract
- Updated: 2026-09-02
- Scope: `HOW I BUILD → Documentation System`
- Public boundary: reconstructed and sanitized content only

This audit records how the private evidence source is translated into a public page. It
does not make the application depend on the private source at runtime.

## 1. Content audit

### Supported

- The documentation system externalizes development and operations context.
- `QUESTION / AUTHORITY / UPDATE WHEN` is the annotation contract for important
  knowledge-map nodes.
- Project Map, Architecture, and Recovery represent three different documentation
  responsibilities.
- Documentation changed as product, storage, operations, and code-level questions
  changed.
- Related context is updated in the same change when structural boundaries change.
- Documentation remains context; current behavior and physical state require separate
  verification.

### Over-compressed in the previous public fixture

- `CURRENT ≠ FUTURE ≠ DECISION` was reduced to generic node descriptions.
- The three database reading levels and the distinct roles of architecture-as-code and
  Codemap were not visible.
- Production schema re-checking was reduced to generic runtime evidence language.
- Recovery was shown as a generic checklist rather than information design that
  separates routine and high-risk operations.
- Codemap did not show the distinct jobs of its interactive, structured-data, and lock
  artifacts.
- The repeated freshness backlog that led to the same-change rule was omitted.

### Missing

- A concise scope boundary between repository/operations documentation and runtime AI
  knowledge.
- Dated evolution scenes and one concrete evidence item per scene.
- The design intent of a short entry path from README to progressively deeper context.
- The distinction between the repository's canonical current Codemap and manual
  point-in-time backups outside the repository.
- Explicit boundaries for unmeasured outcomes and unverified automation.

### Unsafe to publish

- Organization, customer, person, repository, commit, endpoint, infrastructure, and
  account identifiers.
- Original internal prose, exact private file paths, and a one-to-one reconstruction of
  internal topology.
- Claims about onboarding time, incident-resolution time, organization-wide adoption,
  or repeated use by other developers.
- Claims that staleness CI, automatic schema-drift detection, migration-as-code, or a
  backup/restore drill is complete.

## 2. Evidence mapping

| Surface | Public responsibility | Concrete evidence retained | Boundary retained |
| --- | --- | --- | --- |
| Scope note | Define this page's documentation system | ERD, architecture, current state, roadmap, ADR, README, runbook, schema snapshot, architecture-as-code, Codemap | Runtime AI knowledge is separate |
| Architecture node | Explain what exists now | Architecture is current-only | Remaining scope belongs in Roadmap |
| Current-state node | Classify implementation state | Complete, partial, temporary, and risky are distinct | It is not a future plan |
| Roadmap node | Hold remaining scope and expansion conditions | Future work is removed from Architecture | It is not current behavior |
| ADR node | Preserve decision history | Superseded decisions keep follow-up relationships | It does not prove current runtime state |
| Project Map artifact | Orient and route | README → Project Map → domain context → architecture/operations → Codemap | Entry point, not implementation truth |
| Architecture artifact | Select the right resolution | System Map → Domain ERD → Physical ERD; system/container/component views; production schema re-check | Documentation tooling is separate from application build/CI |
| Recovery artifact | Control discoverability by risk | Routine read-only/idempotent operations stay near the entry; replay/reset/backfill moves behind a runbook and pre-flight checks | A runbook does not prove a recovery drill |
| Codemap evidence | Find code-level impact | role, entrypoint, caller/dependency, tests, constraints, evidence, scan scope, fingerprint | Repository version is canonical; dated external copies are backups |

## 3. Static evolution keyframes

The story takeaway is: the documentation system accumulated new responsibilities as the
system changed, until maintaining context became part of the change itself.

### Scene 01 — 2026.06 — ERD was enough, until it wasn't

- Pressure: `PRODUCT DIRECTION + STORAGE CHANGE`
- Structure: human authoring/review ↔ system aggregation/query, represented by an
  initial 11-table ERD.
- Evidence: the first ERD was marked for revision when product direction and storage
  structure changed.
- Static frame: a small two-boundary system view with the ERD marked
  `MARKED FOR REVISION`.

### Scene 02 — 2026.07.13 — Different questions needed different sources

- Pressure: `CURRENT ≠ FUTURE ≠ DECISION`
- Accumulation: Overview, Current-state, Roadmap, Architecture, ADR, Deployment,
  Recovery.
- Evidence: Architecture answers what exists now; Roadmap what remains; ADR why a
  choice was made; Current-state distinguishes complete, partial, temporary, and risky.
- Static frame: one project line branching into responsibilities, not a document pile.

### Scene 03 — 2026.07.23–27 — One map could not answer every question

- Pressure: `READABILITY + LEVEL OF DETAIL`
- Accumulation: System Map → Domain ERD → Physical ERD; architecture-as-code gains
  system, container, and component views.
- Evidence: the physical ERD remained useful for relationships but became too dense for
  understanding system flow.
- Static frame: two parallel resolution ladders with direct question labels.

### Scene 04 — 2026.07.31–08.11 — Documentation had to survive operations

- Pressure: `OPERATIONAL SAFETY + CODEBASE COMPLEXITY`
- Accumulation: README, Deployment, Recovery, Known Issues, production schema
  snapshot, Codemap.
- Evidence: physical schema was re-checked against observed production columns,
  constraints, and indexes; Codemap separated interactive, structured-data, and lock
  roles.
- Static frame: `LOCAL ASSUMPTION → PRODUCTION SNAPSHOT` and a compact Codemap
  artifact triplet.

### Scene 05 — 2026.08 — The problem became staleness

- Pressure: `STALE CONTEXT`
- Accumulation: structure changes now trigger related domain documentation and Codemap
  maintenance in the same change.
- Evidence: documentation freshness repeatedly remained as backlog before the working
  rule was added.
- Static frame: the repeated backlog pattern, structural change triggers, and the
  same-change context they now update. `Change → Context → Verify` follows as the
  separate `CURRENT RULE / SAME CHANGE.` conclusion.

## 4. Scrollytelling implementation contract

- Analytical job: temporal accumulation and responsibility separation.
- Artifact family: sticky side-by-side graphic sequence with five discrete scenes.
- Motion verb: accumulate and refocus; never scrub or morph continuously.
- Renderer ownership: React owns typed scene state and semantic DOM; CSS owns sticky
  positioning and restrained opacity/translate transitions; IntersectionObserver emits
  only the active scene ID.
- Instance count: one story surface and one sticky keyframe at a time.
- State: intentionally ephemeral; no URL or persistent state is needed for an authored
  linear narrative.
- Native browser contract: wheel, touch, trackpad, scrollbar, Page Up/Down, Space,
  Home/End, and arrow-key scrolling remain native.
- Desktop trigger: the scene whose text step crosses the middle reading band becomes
  active. First and final states remain deterministic during fast or reverse scrolling.
- Accessibility: all scene time, pressure, change, evidence, and boundary text remains
  in DOM order. The sticky graphic is supplementary and has a concise text summary.
- Reduced motion: sticky behavior and scene transitions are removed; all five static
  keyframes are rendered inline.
- Mobile portrait: each scene is a static keyframe in `PRESSURE → STRUCTURE CHANGE →
  EVIDENCE` order. The desktop graphic is not scaled down.
- Performance: no third-party motion package, scroll handler, canvas, or continuous
  animation loop.

## 5. Embedded visual mini-brief

| Field | Contract |
| --- | --- |
| Visual layer | Five-stage accumulated information structure |
| Story job | Show why each new documentation responsibility appeared |
| Data shape | Ordered scene data with date, pressure, structure, evidence, boundary |
| Primary specialist | Scrollytelling and parallax data visualization |
| Supporting specialists | Node-link layout, React integration, accessibility, testing |
| Encoding | Stable left-to-right/top-to-bottom hierarchy, thin rules, direct labels, one cream focal state and jade context |
| Interaction/fallback | IntersectionObserver scene selection; stacked static keyframes for mobile and reduced motion |
| Accessibility | DOM narrative, numbered scene outline, no hover-only evidence, native scroll |
| QA | First/key/final screenshots; fast/reverse scroll, resize, keyboard, mobile, reduced-motion tests |
| Fresh-pass status | Local specialist pass; no delegation requested |
