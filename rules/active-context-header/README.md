# Active Context Header

A communication rule for Claude Code that adds a structured status line to every response — showing the active skill, the project in scope, and exactly what Claude is doing right now.

Unlike a simple "what mode is Claude in?" label, this rule encodes **task state**. You can tell at a glance whether Claude is actively working, waiting on you, blocked on a missing dependency, pivoting to a new task, or completing one thing and starting another — all in a single blockquote line above the response.

## Format

```
> <Subject> in project <ProjectName> <verb phrase>
```

- **Subject** — the active skill (`/investigate`, `/ship`, etc.) or `Claude Generalist` if none.
- **ProjectName** — the project in scope, derived from task context (not just the session root).
- **Verb phrase** — one of five state templates below.

## The five states

| State | Pattern | Use when |
|---|---|---|
| **IN PROGRESS** | `is <verb>ing <task>` | Actively working. The default. |
| **COMPLETED + NEXT** | `completed <A>, now <B>` | One task finished, another starts in the same turn. |
| **PIVOT** | `was <verb>ing <A> but switching to <B>` | User redirected or focus changed mid-task. |
| **WAITING** | `is waiting for <what from user>` | Ball is in your court. Claude is blocked on your input. |
| **BLOCKED** | `is blocked on <short reason>` | Cannot proceed. Reason explained in the response body. |

The verb phrase is capped at **8 words** to keep the header scannable.

## Install

Copy `active-context-header.md` into your project's `.claude/rules/` directory:

```bash
mkdir -p .claude/rules
cp active-context-header.md .claude/rules/
```

Or copy it to your user-level rules for all projects:

```bash
mkdir -p ~/.claude/rules
cp active-context-header.md ~/.claude/rules/
```

## What it looks like

### In progress (the default)

```
> Claude Generalist in project Payments Service is editing checkout validator

Here's the updated validator with the new currency check...
```

### Completed + next

```
> /ship in project Payments Service completed drafting release notes, now opening PR

Drafting the PR body now...
```

### Pivot

```
> /investigate in project Payments Service was debugging hook but switching to checking settings.json

You're right — the settings file is the more likely culprit...
```

### Waiting on you

```
> /investigate in project Payments Service is waiting for database credentials

I can't reach the replica without the read-only creds. Can you drop them in .env.local?
```

### Blocked

```
> /ship in project Claude is blocked on failing pre-commit hook

The ruff check is failing on three files I didn't touch. Details below.
```

### Skill transition

When the active skill changes, two extra blockquote lines appear above the narrative line — one marking the switch, one describing the new skill:

```
> **Switching skills** from **/edit** to **/ship**
> **/ship** -- *Pre-flight PR workflow.*
> /ship in project Claude completed editing rule, now drafting commit message

Starting with the diff...
```

## Why the project name?

During a long session you might touch multiple repos, sub-projects, or governance files. The project name is derived from **task context**, not the session root:

- **Sub-project scope** — if files live in a sub-folder like `payments-service/`, the project is `Payments Service`.
- **Workspace scope** — governance files, `.claude/rules/`, or cross-project work uses `Claude`.
- **Multi-project turn** — use the primary one.
- **Ambiguous** — default to `Claude`.

This makes it obvious when Claude has drifted into a different project than you expected.

## Works with

- Claude Code skills and plugins — the subject auto-switches when a skill activates
- Any workflow that uses `/ship`, `/investigate`, `/review`, `/debug`, etc.
- Base Claude (shows `Claude Generalist` when no skill is active)

## Customization

- Change the default subject label (`Claude Generalist` → `Base`, `General`, etc.)
- Adjust the blockquote format or add a second line for extra context
- Add new state templates — just keep them active-progressive and under 8 words
