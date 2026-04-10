# Copilot and Claude instruction loading test

This workspace is a small test repository for comparing how **GitHub Copilot** and **Claude Code** load shared and conditional instructions.

The goal is to keep the **instruction bodies in `.github/`** and let **Claude** reference them from `.claude/`.

## What is being tested

The instructions are intentionally non-functional. They only ask the agent to prepend emojis so loading behavior is easy to verify.

- General instruction: 👋
- Frontend conditional instruction: 🎨
- Backend conditional instruction: ⚙️

Expected behavior:

- General context only -> response starts with 👋
- Frontend file context -> response starts with 👋 🎨
- Backend file context -> response starts with 👋 ⚙️

## Repository structure

```text
.github/
  copilot-instructions.md
  instructions/
    frontend.instructions.md
    backend.instructions.md

.claude/
  CLAUDE.md
  rules/
    frontend.md
    backend.md

apps/
  frontend/
    src/
      App.tsx
      features/users/UserList.tsx
      services/usersApi.ts
  backend/
    src/SampleApi/
      Program.cs
      Controllers/UsersController.cs
```

## How the instructions are wired

### Copilot

- `.github/copilot-instructions.md` provides the general rule
- `.github/instructions/frontend.instructions.md` applies to frontend files
- `.github/instructions/backend.instructions.md` applies to backend files

### Claude

- `.claude/CLAUDE.md` imports the general instruction from `.github/copilot-instructions.md`
- `.claude/rules/frontend.md` adds a `paths` condition and references `.github/instructions/frontend.instructions.md`
- `.claude/rules/backend.md` adds a `paths` condition and references `.github/instructions/backend.instructions.md`

## Important note

This setup is an experiment. Importing `.github` files from `CLAUDE.md` is aligned with Claude's documented `@path` behavior, but using `@...` references inside `.claude/rules/*.md` is the specific part being tested here.

## Sample app layout

The repository includes a minimal app split so path-scoped rules have something to match:

- `apps/frontend` -> TypeScript React sample
- `apps/backend` -> .NET sample API

These files exist only to provide realistic frontend/backend paths for instruction loading tests.
