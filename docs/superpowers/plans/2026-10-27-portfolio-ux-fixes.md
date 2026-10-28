# Portfolio UX fixes through P2

> Execution: parallel implementation with scoped file ownership, followed by integrated Chrome review and deployment. The user approved all P1/P2 recommendations in the 2026-10-27 design review and requested deployment.

**Goal:** Resolve the twelve P1/P2 findings while preserving approved copy, the editorial design, and public-safe fixtures.

**Architecture:** Keep the existing React/React Router application. Fix shared layout rules at their source; use accessible explicit controls for mobile selections and history-aware document previews. No new runtime dependencies.

**Scope:** F01–F12 only. P3 navigation/cover redesign suggestions remain outside this change.

## Constraints

- Preserve the approved content edits already in the working tree, including the fixed Home sentence.
- Preserve reduced-motion preferences and existing motion opt-in behavior.
- Keep all fifteen products and four HOW pages accessible; do not invent content.
- Keep the two-track layout, colors, type identity and public-safety rules.
- Do not modify or commit unrelated local audit/source material.

## Tasks

- [x] Shared layout (root): F01 responsive title bounds, F02 header/back-link separation, F04 non-obscuring desktop notice, F05 keyboard skip link. Verify all product title lines at 390/768/1024/1440 and header hit regions.
- [x] Home/index: F03 landscape HOW index, F11 consistent repeat activation, F12 working WHAT index using existing public content. Preserve 15-link mobile/desktop navigation and motion controls.
- [x] Selection context: F06 mobile explanation adjacent to or reachable from selected items in product surfaces, AI-native, Security and Codemap; F07 readable surrounding product context. Preserve keyboard focus and allow comparing states without forced long scroll jumps.
- [x] Detail/public controls: F08 persistent document close and history-aware return with deep-linkable detail state; F09 remove public layout study controls; F10 label overview reset clearly and improve topic legibility.
- [x] Verification: targeted regression tests for navigation/history/keyboard state, typecheck, lint, existing full test suite and production build. Actual Chrome visual verification of original reproductions, representative interactions, links and public-safe content.
- [ ] Review and release: independent diff review, commit approved copy and UX fixes, create a conventional PR, verify CI, merge and confirm deployment plus live representative screens. Clean up task-owned local sessions.

## Review focus

- Reduced-motion on/off, hover, focus and touch-style repeated activation must not trap or unexpectedly navigate.
- Title ink must stay in its column after web fonts load, even if scrollWidth reports no overflow.
- Closing a document detail and browser Back must return to the original reading context, including direct URLs.
- First/middle/last mobile selection must expose feedback without duplicate ids or hidden focus targets.
- Existing related links, direct route entry and public artifact paths must still work in the static deployment.
