# SCRUM Process & Workflow

## 1. Roles

| Role              | Responsibility                                                          |
| ----------------- | ----------------------------------------------------------------------- |
| **Product Owner** | Defines features, writes acceptance criteria (see `02-REQUIREMENTS.md`) |
| **Scrum Master**  | Removes technical blockers (build errors, architectural blockers)       |
| **Developer**     | Implementation, testing, JSDoc documentation                            |

---

## 2. Definition of Done (DoD)

A feature or task is only "Done" when **all** of these are true:

| #   | Criteria                                                           | Tool / Evidence |
| --- | ------------------------------------------------------------------ | --------------- |
| 1   | Code written and formatted                                         | Prettier        |
| 2   | ESLint passes with **0 warnings**                                  | `pnpm run lint` |
| 3   | Feature meets all Acceptance Criteria from `02-REQUIREMENTS.md`    | Manual QA       |
| 4   | All exported members have JSDoc with typed `@param` and `@returns` | Code review     |
| 5   | Domain data typed via domain entity `@typedef` (e.g., `CatEntity`) | Code review     |
| 6   | Skeleton loaders match final component dimensions                  | Visual test     |
| 7   | Builds without error: `pnpm run build`                             | CI              |
| 8   | Code merged to `develop` with no conflicts                         | Git             |

---

## 3. Event Structure

### Sprint Planning

- Select items from Product Backlog, estimate complexity.
- Confirm items meet **Entry Criteria**: acceptance criteria written in `02-REQUIREMENTS.md`.

### Daily Stand-up

1. What did I complete?
2. What will I work on next?
3. Any blockers?

### Sprint Review & Demo

- Demo working software in browser.
- Verify Lighthouse score > 90 on demo build.

### Sprint Retrospective

- What went well?
- What should improve?
- Action items assigned to next sprint.

---

## 4. Issue Labels (GitHub Issues)

| Label      | Meaning                              |
| ---------- | ------------------------------------ |
| `feat`     | New functionality                    |
| `fix`      | Bug fix                              |
| `refactor` | Code improvement, no behavior change |
| `docs`     | Documentation update                 |
| `chore`    | Build config, dependencies           |
| `blocked`  | Cannot proceed, needs external input |

---

## 5. Branch & PR Flow

```
feature/cat-tagging
    ↓ PR to
develop
    ↓ PR to (after review)
main
    ↓ auto-deploy
GitHub Pages
```

PR checklist:

- [ ] Linting passes.
- [ ] JSDoc complete on changed files.
- [ ] Docs updated if API or architecture changed.
- [ ] CLS test: skeleton visually matches loaded content.
