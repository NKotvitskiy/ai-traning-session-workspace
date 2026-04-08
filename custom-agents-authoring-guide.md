# Custom agents authoring guide

This repository currently uses a **shared custom agent** pattern based on **Claude-format agent files** in `.claude/agents/`.

## Core rules

1. Put shared custom agents in `.claude/agents/`.
2. Use the Claude agent file format: `<agent-name>.md`.
3. Keep one file per agent.
4. Prefer a portable subset of frontmatter unless a repository-specific need requires more.
5. Do not use generators, wrappers, symlinks, or mirrored copies for agents in this repository.

## File layout

Each agent lives directly under:

```text
.claude/agents/<agent-name>.md
```

Example:

```text
.claude/agents/pizza-reassurer.md
```

## Why `.claude/agents`

For this repository, agents are authored in `.claude/agents` because:

- Claude officially supports `.claude/agents`
- Copilot is currently able to use this Claude-format agent definition in this repository
- it gives us a **single agent definition** in one place

This is different from the repository's instruction pattern. Instructions use `.github` as the source of truth with Claude wrappers. Shared agents do **not** use that wrapper pattern here.

## Required file format

Each agent file is a Markdown file with:

1. YAML frontmatter
2. a Markdown body that defines the agent behavior

Minimal example:

```md
---
name: my-agent
description: Explains what the agent does and when it should be used.
tools: Read
---

You are a specialized agent.

On every request:

1. Follow the role defined here.
2. Keep behavior consistent.
3. Respect the rules below.

Rules:

- Add the actual behavior rules here.
```

## Recommended frontmatter

Use this subset by default:

- `name` - required
- `description` - required
- `tools` - recommended
- `model` - avoid by default

Example:

```md
---
name: pizza-reassurer
description: Silly test agent that responds to any request with an absurd reassurance and recommends ordering pizza instead. Use only for testing custom agent loading.
tools: Read
---
```

Do not specify `model` unless there is a strong agent-specific reason to pin one. Let the host tool choose the model by default to keep the agent definition more portable.

## Naming rules

- File name should match the agent `name`
- Use lowercase letters and hyphens only
- Prefer short, role-based names such as `code-reviewer`, `release-notes`, `pizza-reassurer`

## Description rules

The `description` field is the main routing hint. It should explain:

1. what the agent does
2. when it should be used
3. whether it is real or test-only

Good example:

```yaml
description: Silly test agent that responds to any request with an absurd reassurance and recommends ordering pizza instead. Use only for testing custom agent loading.
```

Weak example:

```yaml
description: Test agent.
```

## Content rules

- Put the real agent behavior in the Markdown body
- State the role clearly in the first sentence
- Add short numbered behavior steps when the pattern matters
- Add explicit rules for boundaries or refusal behavior
- Keep examples short and representative

## Portability rules

For this repository, shared agents should stay close to the Claude format already proven to work.

Prefer:

- simple tool declarations
- a clear role
- explicit behavior rules
- a self-contained prompt body

Avoid by default:

- Copilot-specific fields such as `target`, `handoffs`, `user-invocable`, `disable-model-invocation`
- complex vendor-specific orchestration features
- separate duplicate agent files in `.github/agents/`

If a future agent needs tool-specific features that do not fit this shared pattern, treat that as a separate design decision.

## How to create a new agent

1. Create `.claude/agents/<agent-name>.md`
2. Add YAML frontmatter with at least `name` and `description`
3. Add the Markdown body with the agent's role and behavior rules
4. Keep the name and file name aligned
5. Keep the prompt focused on one clear persona or task

## Current repository example

- `.claude/agents/pizza-reassurer.md`

## Important note

This repository currently treats `.claude/agents/*.md` as the shared custom-agent definition surface because that pattern has been observed to work with both Claude and Copilot here. Preserve that convention unless a future compatibility issue proves otherwise.
