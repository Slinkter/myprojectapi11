# System Requirements & Use Cases

## 1. Functional Requirements (FR)

### FR-01: Cat Browsing
*   **Description:** The system must display a grid of random cat images fetched from an external API.
*   **Acceptance Criteria:**
    *   Load 10 images on initial render.
    *   Show a loading skeleton while fetching.
    *   Handle API errors with a visible retry mechanism.

### FR-02: Favorites Management
*   **Description:** Users must be able to save cats to a "Favorites" list and remove them.
*   **Acceptance Criteria:**
    *   Clicking 'Heart' icon saves the cat.
    *   Clicking 'Trash' icon in the Favorites section removes the cat.
    *   Visual feedback (Toast notification) on success/failure.
    *   Prevent adding the same cat twice (Memoized check).

### FR-03: Theme Customization
*   **Description:** Users can toggle between Light and Dark modes.
*   **Acceptance Criteria:**
    *   Persist preference in LocalStorage.
    *   Apply correct Tailwind classes (`dark`) to the HTML root.

### FR-04: Typography Customization
*   **Description:** Users can select a font family from a predefined list.
*   **Acceptance Criteria:**
    *   Instant application of font across the entire UI.
    *   Persist preference in LocalStorage.

## 2. Non-Functional Requirements (NFR)

### NFR-01: Performance
*   **FCP (First Contentful Paint):** < 1.5s on 4G networks.
*   **Optimizations:** Use `React.lazy` for heavy components and `React.memo` for list items.

### NFR-02: Usability
*   **Responsive:** Fully functional on Mobile (320px+), Tablet, and Desktop.
*   **Accessibility:** All interactive elements must have `aria-label` and handle keyboard navigation.

### NFR-03: Code Quality
*   **Architecture:** Strict adherence to Feature-Sliced Design. No direct API calls in UI components.
*   **Style:** Tailwind CSS for styling. No CSS-in-JS libraries.

## 3. Use Cases (Examples)

### UC-1: Save a Cat
1.  **Actor:** User
2.  **Precondition:** Random list is loaded.
3.  **Flow:**
    *   User hovers over a cat image.
    *   Overlay appears with "Heart" button.
    *   User clicks "Heart".
    *   System sends request to API.
    *   System adds cat to "Favorites" store slice.
    *   System displays "Success" toast.
4.  **Postcondition:** Cat appears in "Favourite Kittens" section.

### UC-2: Change Theme
1.  **Actor:** User
2.  **Flow:**
    *   User clicks the Sun/Moon icon in the header.
    *   System toggles the `theme` state in Redux.
    *   `useAppearance` hook updates the DOM class.
    *   UI colors invert immediately.
