# CLAUDE.md

This project is Block, a TypeScript React dashboard app built with Vite for tracking training plans and progress. The product is currently oriented around triathlon training, but it should be designed to support other endurance events and personal performance plans.

## Product intent
- Block is a training-planning dashboard that helps users monitor their upcoming plan, weekly structure, and progress.
- The first focus is triathlon training, but the UI and data models should remain flexible enough for cycling, running, swimming, and future event types.
- Dashboard design should prioritize clarity, motivation, and actionable planning over complex or crowded interfaces.

## Project structure
- App entry: `src/main.tsx`
- Main dashboard UI: `src/App.tsx`
- Global styles: `src/index.css`
- Component-specific styles: `src/App.css`
- Build config: `vite.config.ts`, `tsconfig*.json`
- Scripts and deps: `package.json`
- Project docs: `README.md`

## Commands
Run from the project root:
- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and build for production
- `npm run lint` — run the repository linter
- `npm run preview` — preview the production build

## Dashboard conventions
- Treat the app as a single-page dashboard with strong hierarchy, readable spacing, and fast scanning.
- Prefer reusable presentational components for cards, tables, training blocks, KPIs, filters, summaries, and session breakdowns.
- Model training data explicitly with TypeScript interfaces/types for concepts like event, phase, week, workout, load, focus area, and athlete metrics.
- Keep state close to the feature that needs it; avoid over-centralizing logic for simple dashboard views.
- Favor deterministic, explicit data handling over hidden side effects or complex derived state.
- When designing UI, think in terms of an athlete dashboard: overview, upcoming workouts, totals, readiness, and weekly structure.

## Training and athlete-domain guidance
- Use triathlon-first language in the UI and data structures where appropriate, but avoid hardcoding assumptions that prevent extension to other events.
- Common concepts to model cleanly: event type, training phase, weekly plan, workout sessions, swim/bike/run focus, intensity, volume, and progress.
- Keep workout and plan data easy to reason about: simple, typed objects are better than deeply nested, hard-to-debug structures.
- Design for future flexibility by separating event-specific presentation from general training-plan logic.

## React and TypeScript guidance
- Use functional components and hooks.
- Favor typed props and local state over `any`.
- Keep component logic readable and avoid unnecessary abstraction.
- Use descriptive names for dashboard widgets and data fields, such as `TrainingWeekCard`, `WorkoutSummary`, or `EventFocusPanel`.
- Prefer local component composition over complex shared state patterns unless a feature truly requires them.
- Keep styling localized when possible, but use global design tokens or CSS variables where consistent dashboard theming is needed.

## Code quality expectations
- Make the smallest valid change.
- Preserve existing architecture unless the task clearly requires a refactor.
- Validate with the relevant command after edits, especially `npm run build` or `npm run lint`.
- Do not add unrelated libraries or UI frameworks without explicit approval.
- Favor clarity and maintainability over cleverness when working with training-plan logic.

## Working style for agents
- Inspect the current dashboard structure before editing major sections.
- Prefer modular UI components and data-driven rendering for plan views, stats widgets, and training lists.
- If a feature expands across multiple dashboard panels, split it into focused components instead of a single large component.
- Match the current styling and spacing patterns before introducing new design conventions.
- Treat the app as a product with a clear user outcome: helping athletes understand and execute their training plan.

## Notes
- This repo is intentionally lightweight and does not currently include a test framework.
- Use Vite conventions as the default approach; avoid custom build tooling unless required.
- The app should remain event-agnostic in architecture even while triathlon is the current default focus.
