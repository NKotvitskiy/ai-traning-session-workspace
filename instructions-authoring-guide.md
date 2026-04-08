# Instructions authoring guide

This repository uses a **`.github` as source of truth** pattern for AI instructions.

## Core rules

1. Put all instruction **content** in `.github`.
2. Use `.claude` only for **Claude loading wrappers**.
3. Do not create nested `CLAUDE.md` files.
4. Do not use generators, hooks, symlinks, or build steps.
5. Keep Copilot and Claude rule coverage aligned by path and intent.

## File layout

### Global instructions

- Copilot source: `.github/copilot-instructions.md`
- Claude wrapper: `.claude/CLAUDE.md`

`CLAUDE.md` should import the Copilot source file:

```md
@../.github/copilot-instructions.md
```

## Conditional instructions

For each conditional rule, create:

1. A **Copilot instruction body** in `.github/instructions/`
2. A matching **Claude rule wrapper** in `.claude/rules/`

Example pair:

```text
.github/instructions/frontend.instructions.md
.claude/rules/frontend.md
```

## How to create a new conditional rule

### 1. Create the Copilot instruction body

Create `.github/instructions/<name>.instructions.md` with:

- YAML frontmatter using `applyTo`
- The full instruction body

Example:

```md
---
applyTo: "apps/mobile/**/*.ts,apps/mobile/**/*.tsx"
---

# Mobile rules

- Add the actual instruction content here.
```

### 2. Create the Claude wrapper

Create `.claude/rules/<name>.md` with:

- YAML frontmatter using `paths`
- An `@` reference to the `.github` instruction file

Example:

```md
---
paths:
  - "apps/mobile/**/*.{ts,tsx}"
---

@../../.github/instructions/mobile.instructions.md
```

## Naming rules

- Use the same logical rule name in both places.
- Copilot file format: `<name>.instructions.md`
- Claude file format: `<name>.md`
- Prefer short, domain-based names such as `frontend`, `backend`, `mobile`, `api`, `tests`

## Path rules

- Keep Copilot `applyTo` and Claude `paths` semantically aligned.
- Scope rules to stable directory or file patterns.
- Prefer one rule per concern or area instead of large mixed-purpose files.

## Content rules

- Put the **real text only** in `.github`.
- Do not duplicate the body in `.claude/rules`.
- Keep instruction files focused and non-conflicting.
- If a rule is global, put it in `.github/copilot-instructions.md` instead of creating a conditional file.

## Change workflow

When adding or editing instructions:

1. Update the `.github` instruction file first.
2. Add or update the matching `.claude` wrapper if the rule is conditional.
3. Verify the wrapper path points to the correct `.github` file.
4. Verify the Copilot and Claude path conditions describe the same scope.

## Current repository examples

- Global instruction:
  - `.github/copilot-instructions.md`
  - `.claude/CLAUDE.md`
- Frontend conditional instruction:
  - `.github/instructions/frontend.instructions.md`
  - `.claude/rules/frontend.md`
- Backend conditional instruction:
  - `.github/instructions/backend.instructions.md`
  - `.claude/rules/backend.md`

## Important note

This architecture intentionally depends on Claude wrappers referencing `.github` files with `@...`. That behavior is the chosen pattern for this repository and should be preserved consistently when adding new rules.
