---
name: doc-sync
description: Keeps project documentation (README.md, src/docs/*.md) perfectly synchronized with the actual source code. Extracts ground truth from package.json, vite.config.js, and the real file tree before writing anything. Use when asked to update docs, the README, or when you suspect version info is stale.
---

# doc-sync Skill

## When to activate

Activate this skill **before writing any documentation** when:

- User asks to update the README
- User asks to update `src/docs/*.md`
- User asks about what libraries the project uses
- Docs appear to have outdated version numbers
- A student asks how to set up the project from scratch

---

## Step 1 — Extract Ground Truth (MANDATORY)

Run these read-only checks **every time** before writing a single word of documentation.

### 1a. Read package.json for exact versions

```
view_file package.json
```

Extract:

- `react` version → use in README and docs
- All `dependencies` with their **exact semver**
- All `devDependencies`
- Deploy scripts (look for `gh-pages`, `deploy`, etc.)

### 1b. Read vite.config.js for aliases and base URL

```
view_file vite.config.js
```

Extract:

- `base` field → the GitHub Pages deployment URL
- `resolve.alias` map → document ALL path aliases (`@features`, `@shared`, `@app`, `@config`)

### 1c. Read env.js for required environment variables

```
view_file src/config/env.js
```

Extract the `required` array → list all `VITE_` keys the project needs.

### 1d. Read store.js for Redux shape

```
view_file src/app/store.js
```

Extract the keys in `reducer: { ... }` → that's the full Redux state shape.

### 1e. Get the real file tree

```
run_command: cmd.exe /c tree src /A /F
```

Use this output verbatim in any "Project Structure" section. Never guess or make up the tree.

---

## Step 2 — Validation Checklist

Before writing, answer YES or NO to each:

| Check                            | Source                             |
| -------------------------------- | ---------------------------------- |
| React version correct?           | `package.json` → `"react"`         |
| All dependencies listed?         | `package.json` → `dependencies`    |
| All devDependencies listed?      | `package.json` → `devDependencies` |
| Path aliases listed?             | `vite.config.js` → `resolve.alias` |
| Env vars listed?                 | `src/config/env.js`                |
| Redux slices listed?             | `src/app/store.js`                 |
| File tree matches `tree` output? | CMD tree output                    |
| Deploy URL correct?              | `vite.config.js` → `base`          |

Only proceed if **all answers are YES**.

---

## Step 3 — Library Documentation Format

When listing libraries, always use this table format:

```markdown
| Library | Version | Role         |
| ------- | ------- | ------------ |
| react   | ^19.2.3 | UI framework |
| ...     | ...     | ...          |
```

Role descriptions should explain **why** the project uses it (e.g. "Async state management for server data"), not just what it is.

---

## Step 4 — Files to Update

Update these files in this priority order:

1. `src/docs/00-SETUP-GUIDE.md` — from-scratch student guide
2. `README.md` — top-level project summary
3. `src/docs/01-PROJECT-CHARTER.md`
4. `src/docs/02-REQUIREMENTS.md`
5. `src/docs/03-USE-CASES.md`
6. `src/docs/04-ARCHITECTURE.md`
7. `src/docs/05-UI-DESIGN-SYSTEM.md`
8. `src/docs/06-CONTRIBUTING.md`
9. `src/docs/07-SCRUM-PROCESS.md`
10. `src/docs/08-GLOSSARY.md`
11. `src/docs/DOCUMENTATION.md`

---

## Step 5 — Quality Rules

- **NEVER** write a version number without reading it from `package.json` first.
- **NEVER** write a folder structure without reading it from the `tree` output.
- **NEVER** mention "React 18" in any doc — this project uses **React 19**.
- **ALWAYS** describe why each library was chosen for this specific project.
- **ALWAYS** include the `.env` setup steps in any "getting started" section.
- Use **Markdown tables** for lists of libraries, dependencies, or API routes.
- Code blocks must specify language: ` ```bash `, ` ```javascript `, ` ```json `.

---

## Common Mistakes to Avoid

| Mistake                           | Correct approach            |
| --------------------------------- | --------------------------- |
| Copying React version from memory | Always read `package.json`  |
| Writing a folder tree from memory | Always run `tree src /A /F` |
| Saying "install with npm"         | This project uses **pnpm**  |
| Using Tab indent in .env example  | .env uses no indent         |
| Forgetting framer-motion          | It IS a runtime dependency  |
| Listing Tailwind as a dependency  | It is a **devDependency**   |
