# Project Charter: Cat Gallery

## 1. Project Overview
**Project Name:** Cat Gallery
**Description:** A modern Single Page Application (SPA) developed with React, Vite, and Redux that allows users to explore a collection of random cats, select their favorites, and manage their preferences (theme, typography).
**Architecture:** Feature-Sliced Design (Simplified) / Clean Architecture.

## 2. Business Objectives
*   **Demonstrate Technical Proficiency:** Serve as a flagship project for Senior Frontend capabilities (React, Redux, Architecture).
*   **User Engagement:** Provide a seamless, responsive, and aesthetically pleasing interface for browsing cat images.
*   **Scalability:** specific architecture designed to scale with new features without technical debt accumulation.

## 3. Stakeholders
*   **Product Owner / Client:** (User)
*   **Lead Architect:** (Agent/Self)
*   **Developers:** Future contributors/maintainers.

## 4. Scope
*   **In Scope:**
    *   Random cat image fetching from TheCatAPI.
    *   Favorites management (Save/Remove) with local persistence (simulated or API).
    *   Global Theme management (Dark/Light mode).
    *   Global Typography management.
    *   Responsive Design (Mobile First).
*   **Out of Scope:**
    *   User Authentication (Login/Signup) - *Current version is public access*.
    *   Social component (Sharing to social media).
    *   Backend development (Reliance on third-party API).

## 5. Key Success Indicators (KPIs)
*   **Performance:** Lighthouse score > 90 in Performance and Best Practices.
*   **Code Quality:** Strict adherence to ESLint rules and Architectural boundaries.
*   **Maintainability:** Component decoupling allowing independent testing (Facade Pattern).
