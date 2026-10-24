# Home Motion Index Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans for this small, coupled change; obtain a fresh whole-change review.

**Goal:** Make static home navigation readable and let visitors explicitly enable or disable feature rain.

**Architecture:** One home-level motion hook owns the preference. FeatureRain keeps a stable button and renders either the existing rain or a canonical feature index. Layout rules reserve space for index content independently of animation.

**Tech Stack:** Existing React, TypeScript and CSS; browser behavior checks.

**Spec:** `docs/superpowers/specs/2026-10-24-home-motion-index-design.md`

## Global Constraints

- Preserve existing design tokens, routes and public content.
- Only feature rain responds to the explicit motion choice.
- Reset preference on reload and on OS preference changes.
- Reuse the existing isolated `fix/title-ui` worktree.

## Review Focus

- Keyboard toggle focus must not suppress opted-in animation.
- All 14 index links must be clickable, readable and in visual/tab order.
- Mobile/short-screen index must avoid title overlap, clipping and hidden hit targets.
- Desktop/mobile viewport changes must retain the chosen mode.
- OS preference updates must stop motion and avoid losing navigation focus.

## Task 1: Implement and verify the home index and motion control

**Files:** `src/components/home/{FeatureRain,SeamPosterPrototype,MobileDiagonalPoster}.tsx`, `src/components/home/useFeatureMotion.ts`, `src/App.css`, `docs/atlas-experience-strategy.md`, browser regression tests.

**Interface:** `useFeatureMotion()` returns `{ motionEnabled: boolean, toggleMotion: () => void }`. Both posters expose `data-feature-motion="rain|index"`; FeatureRain receives `motionEnabled` and `onMotionToggle`.

- [x] Reproduce missing index/control under reduced motion with a browser behavior check.
- [x] Add shared preference state, stable control and canonical static links.
- [x] Make animation depend on explicit state, and add responsive index layouts.
- [x] Verify normal/reduced modes, click and keyboard toggling, real time-dependent transform, all routes, viewport changes and system preference changes.
- [x] Run typecheck, lint and build; inspect desktop/mobile screenshots.
- [x] Review the final diff independently and resolve material findings.

## Execution notes

The selected design and implementation are approved. After the pointer-focus follow-up, the user authorized commit, push, merge and deployment.

Fixed pointer focus retaining the expanded cover after motion toggle. Confirmed the regression failed before the fix, then verified mouseleave returns the neutral cover while keyboard and coarse-touch navigation stay open.

Final validation: Chrome channel, 15 browser tests passed (54.7s); typecheck, lint and build passed. Desktop and mobile renders inspected. Independent review findings resolved and public-safety review completed. Deployment is pending the release workflow; runtime deployment verification is separate from these local checks.
