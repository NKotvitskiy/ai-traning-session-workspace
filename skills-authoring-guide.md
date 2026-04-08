# Skills authoring guide

This repository uses a **shared Agent Skills** pattern for skills that should work in both **GitHub Copilot** and **Claude**.

## Core rules

1. Put shared skills in `.claude/skills/`.
2. Use the open **Agent Skills** core format only.
3. Keep each skill self-contained in its own folder.
4. Do not rely on Claude-only skill features in shared skills.
5. Do not use generators, hooks, symlinks, or build steps for skill mirroring.

## File layout

Each skill lives in its own lowercase, hyphenated directory:

```text
.claude/skills/<skill-name>/
  SKILL.md
  references/
  scripts/
  assets/
```

Only `SKILL.md` is required.

## Why `.claude/skills`

For this repository, shared skills live in `.claude/skills` because:

- Claude officially supports `.claude/skills`
- Copilot officially supports `.claude/skills`
- it lets us keep a **single skill definition** in one place

This is different from the repository's instruction pattern. Instructions use `.github` as the source of truth with Claude wrappers. Skills do **not** currently use that wrapper pattern here.

## Required `SKILL.md` format

`SKILL.md` must be a Markdown file with YAML frontmatter followed by the skill body.

Use this portable frontmatter subset:

- `name` - required
- `description` - required
- `license` - optional
- `compatibility` - optional
- `metadata` - optional

Example:

```md
---
name: my-skill
description: Explains what the skill does and when it should be used.
license: MIT
compatibility: Works in shared Copilot and Claude skill setups.
---

# My skill

Write the actual skill instructions here.
```

## Do not use vendor-specific fields in shared skills

Avoid these in shared skills:

- `context`
- `agent`
- `hooks`
- `paths`
- `shell`
- `disable-model-invocation`
- `user-invocable`

Also avoid undocumented import or wrapper behavior inside `SKILL.md`.

## Naming rules

- Skill directory name must match `name`
- Use lowercase letters, numbers, and hyphens only
- Prefer short, task-based names such as `ai-true-fact`, `release-notes`, `debug-ci`

## Description rules

The `description` field is the main routing signal. It should say:

1. what the skill does
2. when it should be used
3. likely trigger phrases or task shapes

Good example:

```yaml
description: Generates concise, accurate facts about artificial intelligence. Use when asked for real AI facts, educational AI trivia, or short truthful statements about AI.
```

Weak example:

```yaml
description: AI helper.
```

## Content rules

- Keep the main skill focused and easy to scan
- Put large supporting material in `references/`
- Put scripts in `scripts/` only when they are truly needed
- Keep output expectations explicit
- Prefer safe, portable instructions over tool-specific workflows

## Change workflow

When adding or editing a shared skill:

1. Create or update `.claude/skills/<skill-name>/SKILL.md`
2. Keep frontmatter limited to the shared subset
3. Add supporting files in the same skill directory if needed
4. Verify the directory name matches `name`
5. Verify the description clearly explains when the skill should activate

## Current repository examples

- `.claude/skills/ai-true-fact/SKILL.md`
- `.claude/skills/ai-false-fact/SKILL.md`

## Important note

This architecture intentionally optimizes for:

- one shared definition
- cross-tool compatibility
- predictable behavior between Copilot and Claude

If a future skill needs vendor-specific features, treat it as a separate design decision instead of extending the shared pattern by default.
