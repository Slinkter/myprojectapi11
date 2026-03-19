# Naming Guide Refactoring - Phase 1

This document summarizes the changes made during Phase 1: Naming & Clean Code to improve codebase consistency and readability.

## Naming Changes

| Category | Original Name | Refactored Name | File(s) Affected | Reason |
| :--- | :--- | :--- | :--- | :--- |
| **Utility Utilities** | `cn` | `classNames` | `src/shared/utils/classNames.js`, Multiple UI components | Better clarity and consistency with standard naming. |
| **Constants** | `fonts` | `AVAILABLE_FONTS` | `src/features/font/redux/fontConstants.js`, `fontSlice.js` | Follows SCREAMING_SNAKE_CASE for global constants. |
| **API Parameters** | `image_id` | `imageId` | `src/features/cats/api/catApi.js` | CamelCase consistency in application logic. |
| **API Parameters** | `sub_id` | `subId` | `src/features/cats/api/catApi.js` | CamelCase consistency in application logic. |

## Refactored Logic

| Function | Change | File | Benefit |
| :--- | :--- | :--- | :--- |
| `mapToCatEntity` | Destructuring `rawCat` | `src/features/cats/adapters/catMapper.js` | Improved readability and cleaner property access. |

---
*Updated: $(date)*
