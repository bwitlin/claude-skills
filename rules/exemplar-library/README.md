# Exemplar Library

A companion pack of **10 before/after pairs** that teach Claude Code how to handle two common failure modes by showing concrete examples instead of abstract rules.

## What it is

A single markdown file loaded into Claude's session context via the `@path` import syntax in `CLAUDE.md`. It contains 10 paired examples — 5 per pattern — of how Claude should handle situations where it commonly gets the shape of the response wrong.

Anthropic's prompt-engineering guidance recommends examples and multishot prompting as one of the most effective ways to shape model behavior. The same principle applies here — a concrete "bad turn → good turn" pair changes behavior more reliably than a long prose rule explanation.

## What it fixes

| Pattern | Failure mode | Example |
|---|---|---|
| **Question-theatre** | Asking permission before already-authorized work | Claude: "Want me to read the spec?" after you already said "let's go" |
| **UX-instruction recall** | Hallucinating outdated UX paths for external tools | Claude giving a wrong Figma/Vercel/Cursor menu path from training data instead of current docs |

## Why pairs instead of prose

A rule tells Claude what not to do. An exemplar shows what to do. Both are load-bearing — rules without examples get interpreted creatively, examples without rules have no generalizing principle. This library is the positive-guidance half of the equation.

## Install

This file is an importable context file, not a rule — it lives alongside your `CLAUDE.md` and gets pulled in via an `@path` import.

Copy it to either your user-level or project-level Claude directory:

```bash
# User-level (all projects)
mkdir -p ~/.claude
cp rules/exemplar-library/exemplar-library.md ~/.claude/

# Or project-level
mkdir -p .claude
cp rules/exemplar-library/exemplar-library.md .claude/
```

Then add this line to your `CLAUDE.md`:

```markdown
@~/.claude/exemplar-library.md
```

Or for project-level:

```markdown
@.claude/exemplar-library.md
```

### Optional: keep it loaded after conversation compaction

For long sessions where context gets compacted, add a `SessionStart` hook with `matcher: "compact"` to re-inject the exemplars. This counters "Lost-in-the-Middle" context decay.

## Pairs with

- [`question-theatre`](../question-theatre/) — rule that blocks the default failure mode from Pattern 1
- [`ux-instruction-recall`](../ux-instruction-recall/) — rule that forces web search before writing UX steps

The library teaches the *shape* of the right response; the rules explain the *why*.

## Expanding it

When you catch Claude in a new failure mode, write the bad/good pair and add it to your local copy. The pair is the fix — no rule-writing ceremony required.

## License

MIT
