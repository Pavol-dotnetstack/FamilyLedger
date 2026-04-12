# Infrastructure

This project uses a feature-based architecture with clear boundaries between UI, state logic, and data access.
Each feature exposes a public API through its index.ts file (barrel export), and other parts of the app import only from that entry point.

## Table of Contents

- [Folder Structure (Feature-First)](#folder-structure-feature-first)
- [Architectural Choices](#architectural-choices)
- [Layer Responsibilities](#layer-responsibilities)
- [Tech Stack](#tech-stack)

## Folder Structure (Feature-First)

```text
src/
	app/                  # App bootstrap, providers, routing
	features/
		<feature-name>/
			api/              # Feature-facing API layer
			components/       # Feature UI components
			hooks/            # Feature state and UI logic
			services/         # Data operations, mapping, validation
			types/            # Feature-specific TypeScript interfaces/types
			index.ts          # Public API (barrel exports)
	components/           # Shared UI (used by 2+ features)
	hooks/                # Shared hooks (used by 2+ features)
	utils/                # Shared utilities (used by 2+ features)
	data/                 # Seed/mock data and local persistence setup
```

## Architectural Choices

This codebase combines multiple complementary patterns:

- Feature-based architecture
	Organizes code by business domain instead of file type.
- Barrel exports / public feature API
	Each feature controls what is exposed via index.ts, reducing tight coupling.
- Repository-style data access
	API/service layers hide storage details from components and hooks.
- Seed data pattern
	Initial mock data supports local development and predictable startup state.
- Layered flow
	Component -> Hook -> API/Service -> Storage

## Layer Responsibilities

- Component: UI rendering and event wiring only.
- Hook: UI-facing state logic and orchestration.
- API/Service: CRUD operations, validation, mapping, and domain rules.
- Storage: Persistence implementation (localStorage now, backend/DB later).

## Tech Stack

- React (UI)
- TypeScript (strict typing)
- Vite (build tool/dev server)
- State management:
	- Server/async state: React Query (TanStack Query) in feature hooks
	- Local UI state: React hooks (useState, useReducer, useMemo) and context where needed
- ESLint (including boundaries rules for architectural constraints)
- Tailwind CSS (utility-first styling)
