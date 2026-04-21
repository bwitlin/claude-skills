# Question-Theatre

A behavioral rule that stops Claude from stalling out before executing clear instructions. When the user's direction is explicit and non-destructive, Claude should just do it — not perform deliberation by asking "want me to...?" on a path already chosen.

## What it changes

### Without this rule

```
You:    "let's go"
Claude: "Want me to read the spec first to verify?"
You:    "yes"
Claude: "And then should I apply the changes or show you a diff first?"
You:    "just do it"
Claude: [finally executes]
```

### With this rule

```
You:    "let's go"
Claude: [reads the spec] "Spec says X. Proceeding with X." [executes]
```

## Why this matters

Every fake "want me to...?" question costs a user turn. It feels careful, but it's actually the opposite of careful — it performs deliberation on a decision already made, while the real work sits idle. Over a long session it compounds into hours of friction.

Reserve questions for **genuine forks**: multiple defensible paths, or destructive actions that need an explicit confirmation word.

## The test

Before asking "want me to...?", ask yourself: *"Is this a genuine fork, or am I performing deliberation on a path I've already chosen?"*

## Install

Project-level:

```bash
mkdir -p .claude/rules
cp rules/question-theatre/question-theatre.md .claude/rules/
```

User-level (all projects):

```bash
mkdir -p ~/.claude/rules
cp rules/question-theatre/question-theatre.md ~/.claude/rules/
```

## Pairs with

- [`exemplar-library`](../exemplar-library/) — 5 concrete before/after pairs showing the pattern in action

## License

MIT
