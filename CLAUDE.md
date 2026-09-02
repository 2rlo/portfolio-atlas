# CLAUDE.md

Read `AGENTS.md` first.

Its rules are canonical and apply to every task.

For IA, Home, case-study, HOW I BUILD, or artifact UI work, also read
`docs/atlas-experience-strategy.md` before editing. It is the accepted
experience-strategy decision record; do not silently diverge from it.

## Project Intent

This is an engineering atlas, not a conventional portfolio gallery.

Prioritize:

1. reasoning

2. design decisions

3. evidence

4. iterations / failures

5. operational boundaries

over feature lists or decorative UI.

## Before Editing

Check:

- current route/page structure

- existing design tokens

- reusable components

- content source for the requested page

Do not invent experience or metrics.

If source evidence is insufficient,

leave a TODO / unknown rather than filling the gap.

## Repository Contract

- Register routes only in `src/app/router.tsx`; keep the router instance outside the React tree.
- Put URL-level pages in `src/routes` and shared public content contracts in `src/content/content-types.ts`.
- Add design values to `src/styles/tokens.css` before consuming them in component CSS.
- Treat `src/content/fixtures` as public output: synthetic, typed, and independent from local private files at runtime.
- Never import `LOCAL_SOURCES.md` or any path listed in it from application code.

## Content Pattern

For case-study content prefer:

Problem

→ Context

→ Decision

→ Implementation

→ Evidence

→ Iteration

→ Boundary

For HOW I BUILD pages prefer:

Why

→ System / rule

→ Artifact

→ Example

→ Failure / evolution

→ Current practice

## UI Rule

Do not create fake SaaS screens for engineering practices.

Use:

- diagrams

- timelines

- annotated artifacts

- Markdown excerpts

- architecture maps

- small interactive disclosures

Product features may use reconstructed Jadebell UI.

## Finish

Run the repository's available:

- lint

- test

- build

Report:

- what changed

- files changed

- validation performed

- unresolved issues
