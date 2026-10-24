# Home motion index

The user selected the index layout and an explicit motion control on 2026-10-24.

- Keep the WHAT / HOW identity and existing rain in ordinary motion environments.
- With reduced motion, show a legible two-column index when WHAT is opened. Use all 14 existing public feature destinations in canonical order, without title overlap.
- A stable `움직임 켜기` / `움직임 끄기` button switches between index and rain. Opting in affects only feature rain, not other reduced-motion behavior.
- Desktop and mobile share state. Reload uses the system preference again; no storage. A changed OS preference resets the current choice.
- Keyboard activation of the motion button starts animation without losing focus. Keyboard navigation of moving links retains the existing pause behavior.
- On hover-capable desktop devices, a pointer click on the motion control releases button focus. Moving the pointer outside the cover restores the neutral WHAT / HOW composition while retaining the chosen motion mode. Keyboard and touch interaction keep focus and their open navigation.
- On mobile, keep both tracks available; allow the expanded index to take the space it needs. Links must remain reachable on short screens.

## Approaches

Selected: an aligned index with a motion control. It makes all destinations immediately readable. A scattered typographic poster was considered but preserves more layout complexity and gives less predictable navigation on narrow screens.

## Boundaries

No new content claims, colors, routes, dependencies at runtime, deployment, or system preference changes. Existing tokens and React content contracts remain authoritative.
