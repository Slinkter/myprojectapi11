# Component Documentation

Welcome to the component documentation for **myprojectapi11**. This project follows **Atomic Design** principles and **Feature-Sliced Design (FSD)**.

## UI Atoms (`src/shared/ui/`)

These are pure, generic components without business logic.

- [**Button**](./Button.md) - Base button component with multiple variants.
- [**IconButton**](./IconButton.md) - Circular button optimized for icons.
- [**Select**](./Select.md) - Styled native select dropdown.
- [**Card**](./Card.md) - Generic container for content.

## Feature Components (`src/features/cats/components/`)

Components specific to the Cats feature.

- [**CatCard**](./CatCard.md) - specialized card for displaying cat images and actions.

## Shared Components (`src/shared/components/`)

Higher-level components used across features.

- [**EmptyState**](../05-UI-DESIGN-SYSTEM.md#empty-state) - Displayed when no data is available.
- [**SkeletonGrid**](../05-UI-DESIGN-SYSTEM.md#cargadores-skeleton-prevención-de-cls) - Loading state for grids.
