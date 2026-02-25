# Use Case Specifications

This document details the interaction flows for general users of the Cat Gallery.

## Actors
*   **User:** A visitor who wants to browse and save cat images.

## Use Case Diagrams (Textual)

### UC-01: Browse Random Cats
**Goal:** View new random cat images.
**Trigger:** Application load or User clicks "Retry".
**Main Flow:**
1.  User opens application.
2.  System requests 10 random images from API.
3.  System displays "Loading..." skeletons.
4.  API returns data.
5.  System renders `RandomCatList`.
**Alternate Flow (Error):**
4a. API fails (500/Network Error).
5a. System displays Error Banner.
6a. User clicks "Retry".
7a. Return to Step 2.

### UC-02: Toggle Favorite
**Goal:** Save or Remove a cat from local favorites.
**Trigger:** User clicks "Heart" or "Trash" icon.
**Main Flow:**
1.  User hovers over `CatCard`.
2.  Overlay appears with action button.
3.  User clicks button.
4.  **IF** (Action is Save):
    *   System checks if already saved (O(1) check).
    *   System dispatches `saveCat` action.
    *   System shows "Saved!" toast.
5.  **IF** (Action is Delete):
    *   System dispatches `deleteCat` action.
    *   System removes Item from `FavouriteCatList`.
    *   System shows "Removed!" toast.

### UC-03: Customize Appearance
**Goal:** Adjust visual settings for comfort.
**Trigger:** User interacts with Header controls.
**Main Flow (Theme):**
1.  User clicks Sun/Moon icon.
2.  System toggles theme state.
3.  System updates CSS class on `html`.
4.  System saves preference to LocalStorage.
**Main Flow (Font):**
1.  User selects "Inter" from dropdown.
2.  System updates CSS variable `--font-family`.
3.  System saves preference to LocalStorage.
