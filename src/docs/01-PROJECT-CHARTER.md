# Project Charter: Cat Gallery

## 1. Project Overview

| Field            | Value                                      |
| ---------------- | ------------------------------------------ |
| **Project Name** | Cat Gallery                                |
| **Version**      | 0.0.0                                      |
| **Type**         | Single Page Application (SPA)              |
| **Architecture** | Feature-Sliced Design + Clean Architecture |
| **Live URL**     | https://slinkter.github.io/myprojectapi11  |
| **Repository**   | https://github.com/slinkter/myprojectapi11 |

**Description:** A demo SPA built with React 19, Vite 7, Redux Toolkit, and Tailwind CSS v4 that lets users explore random cat images, manage favorites, and customize theme/typography. Designed to serve as a **flagship architecture reference** for junior and mid-level developers.

---

## 2. Business Objectives

| Objective             | Description                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Architecture Demo** | Demonstrate Feature-Sliced Design, Facade Pattern, Adapter/Mapper, and strict JSDoc typing in production-like JS |
| **User Engagement**   | Provide a premium UI with hardware-accelerated animations (Framer Motion) and zero layout shift                  |
| **Student Resource**  | Serve as a guided reference for developers learning modern React architecture patterns                           |

---

## 3. Stakeholders

| Role                   | Person                                        |
| ---------------------- | --------------------------------------------- |
| Product Owner / Client | Developer (User)                              |
| Lead Architect         | AI Agent                                      |
| End Users              | Students and developers studying the codebase |

---

## 4. Tech Stack

| Layer            | Technology                  | Version        |
| ---------------- | --------------------------- | -------------- |
| UI Framework     | React                       | 19.2.3         |
| Build Tool       | Vite                        | 7.3.0          |
| State Management | Redux Toolkit + react-redux | 2.11.2 / 9.2.0 |
| API Client       | Axios                       | 1.13.2         |
| Animations       | Framer Motion               | 12.34.3        |
| Styling          | Tailwind CSS v4             | 4.1.18         |
| Notifications    | react-hot-toast             | 2.6.0          |
| Icons            | react-icons                 | 5.5.0          |
| Deployment       | GitHub Pages (gh-pages)     | 6.3.0          |

---

## 5. Scope

### In Scope

- Random cat image fetching from TheCatAPI via Anti-Corruption Mapper layer.
- Favorites management (Save / Remove) persisted via TheCatAPI.
- Dark / Light theme toggle persisted in LocalStorage.
- Dynamic typography selection persisted in LocalStorage.
- Animated card grid with entrance, exit, and layout transitions.
- Pixel-perfect Skeleton Loaders that prevent layout shift.

### Out of Scope

- User authentication (Login / Signup).
- Social features (sharing, comments).
- Server-Side Rendering (SSR).
- Backend infrastructure (depends on TheCatAPI).

---

## 6. Key Success Indicators (KPIs)

| KPI                           | Target                                |
| ----------------------------- | ------------------------------------- |
| Lighthouse Performance        | > 90                                  |
| Cumulative Layout Shift (CLS) | 0.0                                   |
| ESLint warnings               | 0                                     |
| JSDoc coverage                | 100% of exported members              |
| Component coupling            | 0 direct Redux calls in UI components |
