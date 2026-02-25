# Technical Documentation Hub

> **Project:** Cat Gallery — Clean Architecture Reference
> **Stack:** React 19 · Vite 7 · Redux Toolkit 2 · Tailwind CSS v4 · Framer Motion 12

This is the central index for all technical documentation. Start here.

---

## 🚀 Quick Start Path (For Students)

1. **[00-SETUP-GUIDE.md](./00-SETUP-GUIDE.md)** ← **Start here** if you are setting up from scratch.
2. **[04-ARCHITECTURE.md](./04-ARCHITECTURE.md)** — Understand where every file lives and why.
3. **[06-CONTRIBUTING.md](./06-CONTRIBUTING.md)** — Understand how to write code that fits this project.

---

## 📚 Full Documentation Index

### 0. Getting Started

| File                                     | Description                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [00-SETUP-GUIDE.md](./00-SETUP-GUIDE.md) | Install Node, pnpm, create Vite project, get API key, configure `.env`, set up Redux and Tailwind |

### 1. Project Overview

| File                                             | Description                                                                |
| ------------------------------------------------ | -------------------------------------------------------------------------- |
| [01-PROJECT-CHARTER.md](./01-PROJECT-CHARTER.md) | Project goals, team, full tech stack table, and KPIs                       |
| [02-REQUIREMENTS.md](./02-REQUIREMENTS.md)       | Functional and Non-Functional requirements with acceptance criteria tables |
| [03-USE-CASES.md](./03-USE-CASES.md)             | Detailed user interaction flows for all 5 use cases                        |

### 2. Architecture & Design

| File                                               | Description                                                            |
| -------------------------------------------------- | ---------------------------------------------------------------------- |
| [04-ARCHITECTURE.md](./04-ARCHITECTURE.md)         | FSD layers, real file tree, data flow, Redux state shape, path aliases |
| [05-UI-DESIGN-SYSTEM.md](./05-UI-DESIGN-SYSTEM.md) | Tailwind tokens, animation specs, skeleton rules, component guidelines |

### 3. Development Workflow

| File                                         | Description                                                                            |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| [06-CONTRIBUTING.md](./06-CONTRIBUTING.md)   | Naming conventions, JSDoc rules (with real examples), architecture rules, Git workflow |
| [07-SCRUM-PROCESS.md](./07-SCRUM-PROCESS.md) | DoD checklist, sprint events, issue labels, PR flow                                    |
| [08-GLOSSARY.md](./08-GLOSSARY.md)           | Definitions for all architecture, domain, and UI/UX terms used in this project         |

---

## 🛠 Maintenance Rule

This documentation is a **living artifact**. Every Pull Request that:

- Adds a new dependency → update `00-SETUP-GUIDE.md` and `01-PROJECT-CHARTER.md`.
- Changes folder structure → update `04-ARCHITECTURE.md` directory tree.
- Changes component shape → update `05-UI-DESIGN-SYSTEM.md`.
- Changes a Redux slice → update the state shape in `04-ARCHITECTURE.md`.

**PRs without documentation updates will be rejected per DoD rule #8.**
