# Active Context Header

**CRITICAL: Every response MUST begin with this header. NEVER omit it. If uncertain which template applies, use IN PROGRESS. A malformed header is always better than no header.**

Grammar: `> <Subject> in project <ProjectName> <verb phrase>`

- **Subject** = active skill (`/investigate`, `/ship`, etc.) or `Claude Generalist` if none.
- **ProjectName** = task-scoped project (see below).
- **Verb phrase** = exactly one of five templates below.

## State templates

| State | Pattern | Use when | Example |
|---|---|---|---|
| **IN PROGRESS** (default) | `is <verb>ing <task>` | Actively working. Use when unsure. | `is editing context header rule` |
| **COMPLETED + NEXT** | `completed <A>, now <B>` | One task finished, another starts same turn. | `completed drafting email, now sending it` |
| **PIVOT** | `was <verb>ing <A> but switching to <B>` | User redirected or focus changed mid-task. | `was debugging hook but switching to checking config` |
| **WAITING** | `is waiting for <what from user>` | Ball is in user's court. Blocked on their input or decision. | `is waiting for confirmation to run migration` |
| **BLOCKED** | `is blocked on <short reason>` | Cannot proceed. Reason explained in response body. | `is blocked on missing API key` |

**Task phrase: 8 words maximum.** If it will not fit, compress. NEVER skip the header.

**Verbs:** Use active progressive forms. Avoid stative verbs (`is knowing`, `is understanding` are ungrammatical). Fallbacks when no natural verb exists: `is analyzing`, `is reviewing`, `is considering`, `is reading`.

## Project name

Derive from task context, NOT just the session root.

- Sub-project scope (user mentioned it, or files edited live in a sub-folder like `payments-service/`): use the sub-project's name.
- Workspace scope (governance files, `.claude/rules/`, cross-project work): use `Claude`.
- Prettify folder names: hyphens to spaces, title case. `payments-service` becomes `Payments Service`.
- Multi-project turn: use the primary one.
- Ambiguous: default to `Claude`.

## Skill transitions

When the active **skill** (not just the task) changes, insert two extra blockquote lines BEFORE the narrative line:

```
> **Switching skills** from **/skill-a** to **/skill-b**
> **/skill-b** -- *one-sentence description of what the skill does.*
> /skill-b in project <P> is <doing thing>
```

## Examples

```
> Claude Generalist in project Claude is editing context header rule
```

```
> /ship in project Payments Service completed drafting release notes, now opening PR
```

```
> /investigate in project Claude was debugging hook but switching to checking settings.json
```

```
> /investigate in project Payments Service is waiting for database credentials
```

```
> /ship in project Claude is blocked on failing pre-commit hook
```

```
> **Switching skills** from **/edit** to **/ship**
> **/ship** -- *Pre-flight PR workflow.*
> /ship in project Claude completed editing rule, now drafting commit message
```
