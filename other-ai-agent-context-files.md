# Other AI agent context files

This repository now covers three shared AI customization surfaces:

1. **Instructions / rules**
2. **Skills**
3. **Custom agents**

This file summarizes what is already implemented here and which adjacent context-file types still exist outside the current repository pattern.

## What this repository already covers

### 1. Instructions / rules

This repository uses a **`.github` as source of truth** pattern for instructions:

- `.github/copilot-instructions.md`
- `.github/instructions/*.instructions.md`
- `.claude/CLAUDE.md`
- `.claude/rules/*.md`

Authoring guide:

- `instructions-authoring-guide.md`

### 2. Skills

This repository uses a **shared skills** pattern in `.claude/skills/`:

- `.claude/skills/<skill-name>/SKILL.md`

Authoring guide:

- `skills-authoring-guide.md`

### 3. Custom agents

This repository now uses a **shared custom agent** pattern in `.claude/agents/`:

- `.claude/agents/<agent-name>.md`

Authoring guide:

- `custom-agents-authoring-guide.md`

Current example:

- `.claude/agents/pizza-reassurer.md`

## Current repository architecture

The repository intentionally uses **different source-of-truth patterns** depending on the customization type:

| Type | Source of truth | Claude surface | Copilot surface | Guide |
| --- | --- | --- | --- | --- |
| Instructions | `.github` | `.claude/CLAUDE.md`, `.claude/rules/*.md` wrappers | `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md` | `instructions-authoring-guide.md` |
| Skills | `.claude/skills/` | Native | Shared | `skills-authoring-guide.md` |
| Custom agents | `.claude/agents/` | Native | Shared in this repository setup | `custom-agents-authoring-guide.md` |

## Other context-file types not covered by the current guides

The main adjacent categories are:

1. **Prompt files**
2. **Claude output styles**
3. **Claude settings and hooks**
4. **`AGENTS.md`**

## 1. Prompt files

For Copilot and VS Code, prompt files are reusable prompt templates stored in:

```text
.github/prompts/*.prompt.md
```

These are useful for:

- repeatable one-off workflows
- slash-command style task templates
- lightweight reusable prompts without creating a full agent

This repository does **not** currently define a prompt-files pattern.

## 2. Claude output styles

Claude has a separate customization surface for changing the assistant's overall style:

```text
.claude/output-styles/*.md
```

These are different from:

- instructions
- skills
- custom agents

They shape the main assistant behavior rather than define a specific specialist role.

This repository does **not** currently define an output-styles pattern.

## 3. Claude settings and hooks

Claude also has configuration files for execution policy and automation:

```text
.claude/settings.json
.claude/settings.local.json
```

These can control things such as:

- hooks
- permissions
- local overrides
- behavior configuration

This repository does **not** currently define a shared settings/hooks pattern.

## 4. `AGENTS.md`

Another adjacent option is a repository-level:

```text
AGENTS.md
```

This is conceptually different from the shared custom-agent files used here:

- `AGENTS.md` is a broad repository instruction surface
- `.claude/agents/*.md` defines individual specialist agents

This repository does **not** currently use `AGENTS.md` as a primary pattern.

## What remains outside the current repository decision

If the goal is to keep this repository focused and comparable, the remaining undocumented categories are:

| Category | Main file shape | Current status |
| --- | --- | --- |
| Prompt files | `.github/prompts/*.prompt.md` | Not yet standardized here |
| Output styles | `.claude/output-styles/*.md` | Not yet standardized here |
| Settings/hooks | `.claude/settings.json` | Not yet standardized here |
| Repo agent brief | `AGENTS.md` | Not used as a primary pattern here |

## Recommendation

Treat the current repository structure as covering:

1. shared instructions
2. shared skills
3. shared custom agents

Anything beyond those should be introduced as a separate design decision with its own authoring guide, rather than folded implicitly into the existing patterns.

## Data sources

- Official: VS Code Docs - Prompt files - https://code.visualstudio.com/docs/copilot/customization/prompt-files
- Official: VS Code Docs - Custom agents - https://code.visualstudio.com/docs/copilot/customization/custom-agents
- Official: GitHub Docs - About agent skills - https://docs.github.com/en/copilot/concepts/agents/about-agent-skills
- Official: GitHub Docs - Creating agent skills for GitHub Copilot CLI - https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-skills
- Official: GitHub Blog - How to write a great agents.md - https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/
- Official: Claude Code Docs - How Claude remembers your project - https://code.claude.com/docs/en/memory
- Official: Claude Code Docs - Create custom subagents - https://code.claude.com/docs/en/sub-agents
- Official: Claude Code Docs - Output styles - https://code.claude.com/docs/en/output-styles
- Official: Claude Code Docs - Settings - https://code.claude.com/docs/en/settings
- Official: Claude Code Docs - Hooks reference - https://code.claude.com/docs/en/hooks
- Official: Local file `instructions-authoring-guide.md` - file:///home/nikita/source/repos/ai-traning-session-workspace/instructions-authoring-guide.md
- Official: Local file `skills-authoring-guide.md` - file:///home/nikita/source/repos/ai-traning-session-workspace/skills-authoring-guide.md
- Official: Local file `custom-agents-authoring-guide.md` - file:///home/nikita/source/repos/ai-traning-session-workspace/custom-agents-authoring-guide.md
